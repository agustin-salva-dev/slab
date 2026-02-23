"use server";

import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { db } from "@/server/db";
import type { CreateLinkInput } from "@/server/schemas/link";
import { LinkStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface CreateLinkResult {
  error?: string;
  linkId?: string;
  success: boolean;
}

export const createLink = async (
  values: CreateLinkInput,
): Promise<CreateLinkResult> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    console.error("Not authenticated.");
    return { success: false, error: "You must log in." };
  }

  const result = await db.link.create({
    data: {
      originalUrl: values.originalUrl,
      shortSlug: values.shortSlug || Math.random().toString(36).substring(2, 8),
      description: values.description,
      userId: session.user.id,
      status: LinkStatus.PENDING,
    },
  });

  revalidatePath("/dashboard");

  return { success: true, linkId: result.id };
};
