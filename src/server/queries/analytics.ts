"use server";

import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { db } from "@/server/db";
import type { LinkClickStat } from "@/types/analytics";

// Prisma groupBy doesn't support relation includes, so we enrich
// the top-5 link IDs with a second query.
export async function getTopLinksBetween(
  from?: Date,
  to?: Date,
): Promise<LinkClickStat[]> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return [];

  try {
    const grouped = await db.click.groupBy({
      by: ["linkId"],
      where: {
        link: { userId: session.user.id },
        timestamp: from || to ? { gte: from, lte: to } : undefined,
      },
      _count: { linkId: true },
      orderBy: { _count: { linkId: "desc" } },
      take: 5,
    });

    if (grouped.length === 0) return [];

    const linkIds = grouped.map((g) => g.linkId);

    const links = await db.link.findMany({
      where: { id: { in: linkIds } },
      select: { id: true, title: true, shortSlug: true },
    });

    const linkMap = new Map(links.map((l) => [l.id, l]));

    return grouped.map((g) => {
      const link = linkMap.get(g.linkId);
      return {
        title: link?.title || link?.shortSlug || g.linkId,
        shortSlug: link?.shortSlug ?? "",
        clickCount: g._count.linkId,
      };
    });
  } catch {
    throw new Error(
      "A database error occurred while trying to load your top links' statistics. Please ensure your connection is stable and try again.",
    );
  }
}
