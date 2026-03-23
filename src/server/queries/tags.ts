"use server";

import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { headers } from "next/headers";

export async function getUserTags() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, data: null, error: "Unauthorized" };
  }

  try {
    const tags = await db.tag.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        name: "asc",
      },
      select: {
        id: true,
        name: true,
        color: true,
        createdAt: true,
      },
    });

    return { success: true, data: tags, error: null };
  } catch (error) {
    console.error("[PRISMA_GET_TAGS_ERROR] Failed to fetch tags:", error);
    return {
      success: false,
      data: null,
      error: "An error occurred while loading tags.",
    };
  }
}
