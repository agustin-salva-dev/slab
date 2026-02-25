"use server";

import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { headers } from "next/headers";

export async function getUserLinks() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return [];
  }

  return await db.link.findMany({
    where: {
      userId: session.user.id,
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      shortSlug: true,
      originalUrl: true,
      description: true,
      createdAt: true,
      clickCount: true,
    },
  });
}
