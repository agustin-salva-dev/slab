// Analytics queries — consumed by Server Components only.
// For Client Components, use the Server Action at @/server/actions/analytics.

import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { db } from "@/server/db";
import { Prisma } from "@prisma/client";
import type { LinkClickStat } from "@/types/analytics";
import { cache } from "react";

export const getCachedSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

// ─── Public Queries ──────────────────────────────────────────────────────────

// Top N most-clicked links, filterable by time range, device, or country
export async function getTopLinksBetween(options?: {
  from?: Date;
  to?: Date;
  device?: string;
  country?: string;
  limit?: number;
}): Promise<LinkClickStat[]> {
  const session = await getCachedSession();
  if (!session) return [];

  try {
    const groupedClicks = await fetchGroupedClicks(session.user.id, options);
    if (groupedClicks.length === 0) return [];

    const linkIds = groupedClicks.map((g) => g.linkId);
    const linksMap = await fetchLinkDetailsMap(linkIds);

    return assembleLinkStats(groupedClicks, linksMap);
  } catch (error) {
    console.error("[PRISMA_GROUPBY_ERROR] Failed to getTopLinksBetween", error);
    throw new Error(
      "A database error occurred while trying to load your top links' statistics. Please ensure your connection is stable and try again.",
    );
  }
}

export type CountryWithLinks = {
  country: string;
  totalCountryClicks: number;
  topLinks: LinkClickStat[];
};

// Top N countries by clicks, each with their own top links
export async function getTopCountriesStats(options?: {
  from?: Date;
  to?: Date;
  countryLimit?: number;
  linkLimitPerCountry?: number;
}): Promise<CountryWithLinks[]> {
  const session = await getCachedSession();
  if (!session) return [];

  try {
    const topCountries = await fetchTopCountries(session.user.id, options);
    if (topCountries.length === 0) return [];

    const countryCodes = topCountries.map((c) => c.country);
    const rankedLinks = await fetchRankedLinksByCountry(
      session.user.id,
      countryCodes,
      options,
    );

    return assembleCountryStats(topCountries, rankedLinks);
  } catch (error) {
    console.error("[PRISMA_RAW_ERROR] Failed to getTopCountriesStats", error);
    throw new Error(
      "A database error occurred while trying to load the country statistics. Please try again.",
    );
  }
}

// ─── Private Data Layer ──────────────────────────────────────────────────────

// Groups clicks by linkId, uses composite indexes [linkId, timestamp/device/country]
async function fetchGroupedClicks(
  userId: string,
  options?: {
    from?: Date;
    to?: Date;
    device?: string;
    country?: string;
    limit?: number;
  },
) {
  const { from, to, device, country, limit = 5 } = options || {};
  return await db.click.groupBy({
    by: ["linkId"],
    where: {
      link: { userId },
      timestamp: from || to ? { gte: from, lte: to } : undefined,
      device,
      country,
    },
    _count: { linkId: true },
    orderBy: { _count: { linkId: "desc" } },
    take: limit,
  });
}

// Fetches link metadata (title, slug) as a Map for O(1) lookups
async function fetchLinkDetailsMap(linkIds: string[]) {
  const links = await db.link.findMany({
    where: { id: { in: linkIds } },
    select: { id: true, title: true, shortSlug: true },
  });
  return new Map(links.map((l) => [l.id, l]));
}

// Merges click counts with link metadata into the response shape
function assembleLinkStats(
  groupedClicks: { linkId: string; _count: { linkId: number } }[],
  linksMap: Map<
    string,
    { id: string; title: string | null; shortSlug: string | null }
  >,
): LinkClickStat[] {
  return groupedClicks.map((g) => {
    const link = linksMap.get(g.linkId);
    return {
      title: link?.title || link?.shortSlug || g.linkId,
      shortSlug: link?.shortSlug ?? "",
      clickCount: g._count.linkId,
    };
  });
}

// Groups clicks by country to find the N countries with most clicks
async function fetchTopCountries(
  userId: string,
  options?: {
    from?: Date;
    to?: Date;
    countryLimit?: number;
  },
) {
  const { from, to, countryLimit = 4 } = options || {};
  const query = await db.click.groupBy({
    by: ["country"],
    where: {
      link: { userId },
      timestamp: from || to ? { gte: from, lte: to } : undefined,
    },
    _count: { country: true },
    orderBy: { _count: { country: "desc" } },
    take: countryLimit,
  });

  return query.map((g) => ({
    country: g.country,
    clickCount: g._count.country,
  }));
}

// Raw SQL
// Returns bigint for clicks — must convert with Number() in the assembly step
async function fetchRankedLinksByCountry(
  userId: string,
  countryCodes: string[],
  options?: {
    from?: Date;
    to?: Date;
    linkLimitPerCountry?: number;
  },
) {
  const { from, to, linkLimitPerCountry = 5 } = options || {};
  return await db.$queryRaw<
    {
      country: string;
      linkId: string;
      title: string | null;
      shortSlug: string | null;
      clicks: bigint;
    }[]
  >(Prisma.sql`
    WITH RankedClicks AS (
      SELECT 
          C.country,
          C."linkId",
          L.title,
          L."shortSlug",
          COUNT(C.id) as clicks,
          ROW_NUMBER() OVER(PARTITION BY C.country ORDER BY COUNT(C.id) DESC) as rn
      FROM "Click" C
      JOIN "Link" L ON C."linkId" = L.id
      WHERE L."userId" = ${userId}
      AND C.country IN (${Prisma.join(countryCodes)})
      ${from ? Prisma.sql`AND C.timestamp >= ${from}` : Prisma.empty}
      ${to ? Prisma.sql`AND C.timestamp <= ${to}` : Prisma.empty}
      GROUP BY C.country, C."linkId", L.title, L."shortSlug"
    )
    SELECT country, "linkId", title, "shortSlug", clicks
    FROM RankedClicks
    WHERE rn <= ${linkLimitPerCountry}
    ORDER BY country, clicks DESC;
  `);
}

// Merges country totals with the ranked links from the raw SQL query
function assembleCountryStats(
  topCountries: { country: string; clickCount: number }[],
  rankedLinks: {
    country: string;
    linkId: string;
    title: string | null;
    shortSlug: string | null;
    clicks: bigint;
  }[],
): CountryWithLinks[] {
  return topCountries.map((countryData) => {
    const linksForCountry = rankedLinks.filter(
      (q) => q.country === countryData.country,
    );

    return {
      country: countryData.country,
      totalCountryClicks: countryData.clickCount,
      topLinks: linksForCountry.map((link) => ({
        title: link.title || link.shortSlug || link.linkId,
        shortSlug: link.shortSlug ?? "",
        clickCount: Number(link.clicks),
      })),
    };
  });
}
