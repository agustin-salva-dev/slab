// Server Action wrapper — needed because Client Components can't import queries directly
"use server";

import { getTopLinksBetween } from "@/server/queries/analytics";
import type { LinkClickStat } from "@/types/analytics";

export async function fetchTopLinksAction(options?: {
  from?: Date;
  to?: Date;
  device?: string;
  country?: string;
  limit?: number;
}): Promise<LinkClickStat[]> {
  return getTopLinksBetween(options);
}
