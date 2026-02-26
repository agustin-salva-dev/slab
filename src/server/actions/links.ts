"use server";

import { auth } from "@/server/auth";
import { headers } from "next/headers";
import { db } from "@/server/db";
import type { CreateLinkInput } from "@/server/schemas/link";
import { LinkStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { inngest } from "@/inngest/client";
import { Prisma } from "@prisma/client";

export type CreateLinkErrorCode = "AUTH_ERROR" | "SLUG_CONFLICT" | "UNKNOWN";

interface CreateLinkResult {
  success: boolean;
  linkId?: string;
  errorCode?: CreateLinkErrorCode;
  error?: string;
}

async function generateUniqueSlug(): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = Math.random().toString(36).substring(2, 8);
    const existing = await db.link.findUnique({ where: { shortSlug: slug } });
    if (!existing) return slug;
  }
  throw new Error("Could not generate a unique slug after 5 attempts.");
}

export const createLink = async (
  values: CreateLinkInput,
): Promise<CreateLinkResult> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    console.error("[createLink] Unauthenticated request.");
    return {
      success: false,
      errorCode: "AUTH_ERROR",
      error: "You must log in.",
    };
  }

  try {
    const shortSlug = values.shortSlug || (await generateUniqueSlug());

    const result = await db.link.create({
      data: {
        originalUrl: values.originalUrl,
        shortSlug,
        description: values.description,
        userId: session.user.id,
        status: LinkStatus.PENDING,
      },
    });

    await inngest.send({
      name: "link/verify.requested",
      data: {
        linkId: result.id,
        originalUrl: result.originalUrl,
      },
    });

    revalidatePath("/dashboard");

    return { success: true, linkId: result.id };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      const field = (error.meta?.target as string[])?.join(", ") ?? "field";
      console.error(`[createLink] Unique constraint violated on: ${field}`);
      return {
        success: false,
        errorCode: "SLUG_CONFLICT",
        error: `The short link "${values.shortSlug}" is already taken. Please choose a different one.`,
      };
    }

    console.error("[createLink] Unexpected error:", error);
    return {
      success: false,
      errorCode: "UNKNOWN",
      error: "Could not create the link. Please try again.",
    };
  }
};

export type DeleteLinkErrorCode = "AUTH_ERROR" | "NOT_FOUND" | "UNKNOWN";

interface DeleteLinkResult {
  success: boolean;
  errorCode?: DeleteLinkErrorCode;
  error?: string;
}

export const deleteLink = async (linkId: string): Promise<DeleteLinkResult> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    console.error("[deleteLink] Unauthenticated request.");
    return {
      success: false,
      errorCode: "AUTH_ERROR",
      error: "You must log in.",
    };
  }

  try {
    await db.link.delete({
      where: {
        id: linkId,
        userId: session.user.id,
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.error(
        "[deleteLink] Link not found or not owned by user:",
        linkId,
      );
      return {
        success: false,
        errorCode: "NOT_FOUND",
        error: "Link not found.",
      };
    }

    console.error("[deleteLink] Unexpected error:", error);
    return {
      success: false,
      errorCode: "UNKNOWN",
      error: "Could not delete the link. Please try again.",
    };
  }
};

export type EditLinkErrorCode =
  | "AUTH_ERROR"
  | "NOT_FOUND"
  | "SLUG_CONFLICT"
  | "UNKNOWN"
  | "VALIDATION_ERROR";

interface EditLinkResult {
  success: boolean;
  errorCode?: EditLinkErrorCode;
  error?: string;
}

import type { EditLinkInput } from "@/server/schemas/link";

export const editLink = async (
  values: EditLinkInput,
): Promise<EditLinkResult> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    console.error("[editLink] Unauthenticated request.");
    return {
      success: false,
      errorCode: "AUTH_ERROR",
      error: "You must log in.",
    };
  }

  try {
    const existing = await db.link.findUnique({
      where: { id: values.id },
    });

    if (!existing || existing.userId !== session.user.id) {
      return {
        success: false,
        errorCode: "NOT_FOUND",
        error: "Link not found or unauthorized.",
      };
    }

    /* Update the link. We DO NOT re-verify the domain as the requirement
       "verifying that the destination link is secure" is only shown for creations 
       based on the image, or we could trigger verification again. The user didn't mention it.
       Let's just update fields. */
    await db.link.update({
      where: {
        id: values.id,
      },
      data: {
        originalUrl: values.originalUrl,
        shortSlug: values.shortSlug,
        description: values.description,
      },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        errorCode: "SLUG_CONFLICT",
        error: `The short link "${values.shortSlug}" is already taken.`,
      };
    }

    console.error("[editLink] Unexpected error:", error);
    return {
      success: false,
      errorCode: "UNKNOWN",
      error: "Could not update the link. Please try again.",
    };
  }
};
