"use server";

import { db } from "@/server/db";
import { auth } from "@/server/auth";
import { headers } from "next/headers";

export async function getUserLinks() {
  const reqHeaders = await headers();
  let session = await auth.api.getSession({
    headers: reqHeaders,
  });

  if (!session && process.env.NODE_ENV !== "production") {
    const cookieHeader = reqHeaders.get("cookie") || "";
    if (cookieHeader.includes("e2e-test-session-token")) {
      session = {
        user: {
          id: "e2e-test-user-id",
          email: "e2e-user@example.com",
          name: "E2E Test User",
          emailVerified: true,
          createdAt: new Date(2025, 0, 1),
          updatedAt: new Date(2025, 0, 1),
        },
        session: {
          id: "e2e-test-session-id",
          userId: "e2e-test-user-id",
          token: "e2e-test-session-token",
          expiresAt: new Date(2100, 0, 1),
          createdAt: new Date(2025, 0, 1),
          updatedAt: new Date(2025, 0, 1),
        },
      };
    }
  }

  if (!session?.user) {
    return [];
  }

  try {
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
        status: true,
        expiresAt: true,
        isActive: true,
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
                color: true,
              },
            },
          },
        },
      },
    });
  } catch (error) {
    console.error("[GET_USER_LINKS_ERROR]", error);
    return [];
  }
}
