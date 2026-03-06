"use server";

import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { db } from "@/server/db";
import type { LinkClickStat } from "@/types/analytics";

export async function getTopLinksBetween(options?: {
  from?: Date;
  to?: Date;
  device?: string;
  limit?: number;
}): Promise<LinkClickStat[]> {
  const { from, to, device, limit = 5 } = options || {};

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
        device: device,
      },
      _count: { linkId: true },
      orderBy: { _count: { linkId: "desc" } },
      take: limit,
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
