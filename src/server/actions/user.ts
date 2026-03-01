"use server";

import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";

export type ActionResponse<T = unknown> = {
  success: boolean;
  error?: string;
  data?: T;
};

export async function updateUserName(newName: string): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  if (!newName || newName.trim().length < 2) {
    return {
      success: false,
      error: "Name must be at least 2 characters long.",
    };
  }

  try {
    await db.user.update({
      where: { id: session.user.id },
      data: { name: newName.trim() },
    });

    revalidatePath("/dashboard/settings");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("[updateUserName]", error);
    return { success: false, error: "Failed to update profile." };
  }
}

export async function revokeSessionByToken(
  sessionToken: string,
): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await auth.api.revokeSession({
      body: { token: sessionToken },
      headers: await headers(),
    });

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    console.error("[revokeSessionByToken]", error);
    return { success: false, error: "Failed to revoke session." };
  }
}

export async function revokeOtherSessions(): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await auth.api.revokeOtherSessions({
      headers: await headers(),
    });

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error) {
    console.error("[revokeOtherSessions]", error);
    return { success: false, error: "Failed to revoke other sessions." };
  }
}

export async function deleteUserAccount(): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db.link.deleteMany({
      where: { userId: session.user.id },
    });
    await auth.api.deleteUser({
      body: {},
      headers: await headers(),
    });

    return { success: true };
  } catch (error) {
    console.error("[deleteUserAccount]", error);
    return {
      success: false,
      error: "Failed to delete account. Please try again.",
    };
  }
}

export async function exportUserData(): Promise<ActionResponse<string>> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const userLinks = await db.link.findMany({
      where: { userId: session.user.id },
      select: {
        shortSlug: true,
        originalUrl: true,
        description: true,
        status: true,
        clickCount: true,
        createdAt: true,
      },
    });

    const jsonStr = JSON.stringify(userLinks, null, 2);

    return { success: true, data: jsonStr };
  } catch (error) {
    console.error("[exportUserData]", error);
    return { success: false, error: "Failed to export data." };
  }
}
