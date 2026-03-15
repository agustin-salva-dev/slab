"use server";

import { auth } from "@/server/auth";
import { headers } from "next/headers";
import type { CreateLinkInput, EditLinkInput } from "@/server/schemas/link";
import { revalidatePath } from "next/cache";
import { inngest } from "@/inngest/client";
import { Prisma } from "@prisma/client";
import { LinksService } from "@/server/services/links";

//* -- SHARED AUTH HELPER --
async function getAuthenticatedSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    console.error("[AUTH_ERROR] Unauthenticated request.");
  }
  return session;
}

const AUTH_ERROR_RESULT = {
  success: false as const,
  errorCode: "AUTH_ERROR" as const,
  error: "You must log in.",
};

//* -- CREATE LINK --

export type CreateLinkErrorCode = "AUTH_ERROR" | "SLUG_CONFLICT" | "UNKNOWN";

interface CreateLinkResult {
  success: boolean;
  linkId?: string;
  errorCode?: CreateLinkErrorCode;
  error?: string;
}

export const createLink = async (
  values: CreateLinkInput,
): Promise<CreateLinkResult> => {
  const session = await getAuthenticatedSession();
  if (!session) return AUTH_ERROR_RESULT;

  try {
    const result = await LinksService.createLink(session.user.id, values);

    // Inngest events
    const events: Parameters<typeof inngest.send>[0] = [
      {
        name: "link/verify.requested",
        data: { linkId: result.id, originalUrl: result.originalUrl },
      },
    ];

    if (values.expiresAt) {
      events.push({
        name: "link/expiration.scheduled",
        data: { linkId: result.id, expiresAt: values.expiresAt.toISOString() },
      });
    }

    await inngest.send(events);

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

    console.error(
      "[PRISMA_CREATE_ERROR] Unexpected error creating link:",
      error,
    );
    return {
      success: false,
      errorCode: "UNKNOWN",
      error: "Could not create the link. Please try again later.",
    };
  }
};

//* -- DELETE LINK --

export type DeleteLinkErrorCode = "AUTH_ERROR" | "NOT_FOUND" | "UNKNOWN";

interface DeleteLinkResult {
  success: boolean;
  errorCode?: DeleteLinkErrorCode;
  error?: string;
}

export const deleteLink = async (linkId: string): Promise<DeleteLinkResult> => {
  const session = await getAuthenticatedSession();
  if (!session) return AUTH_ERROR_RESULT;

  try {
    await LinksService.deleteLink(linkId, session.user.id);

    await inngest.send({
      name: "link/expiration.cancelled",
      data: { linkId },
    });

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.log(
        `[PRISMA_DELETE_INFO] Link ${linkId} not found or not owned by user.`,
      );
      return {
        success: false,
        errorCode: "NOT_FOUND",
        error: "Link not found.",
      };
    }

    console.error(
      `[PRISMA_DELETE_ERROR] Failed to delete link ${linkId}:`,
      error,
    );
    return {
      success: false,
      errorCode: "UNKNOWN",
      error: "Could not delete the link. Please try again later.",
    };
  }
};

//* -- EDIT LINK --

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

export const editLink = async (
  values: EditLinkInput,
): Promise<EditLinkResult> => {
  const session = await getAuthenticatedSession();
  if (!session) return AUTH_ERROR_RESULT;

  try {
    const existing = await LinksService.getLinkById(values.id);

    if (!existing || existing.userId !== session.user.id) {
      return {
        success: false,
        errorCode: "NOT_FOUND",
        error: "Link not found or unauthorized.",
      };
    }

    const updatedLink = await LinksService.updateLink(values.id, values);

    // Cancel previous expiration, then reschedule if a new date exists
    const events: Parameters<typeof inngest.send>[0] = [
      { name: "link/expiration.cancelled", data: { linkId: updatedLink.id } },
    ];

    if (updatedLink.expiresAt) {
      events.push({
        name: "link/expiration.scheduled",
        data: {
          linkId: updatedLink.id,
          expiresAt: updatedLink.expiresAt.toISOString(),
        },
      });
    }

    await inngest.send(events);

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

    console.error(
      `[PRISMA_EDIT_ERROR] Failed to edit link ${values.id}:`,
      error,
    );
    return {
      success: false,
      errorCode: "UNKNOWN",
      error: "Could not update the link. Please try again later.",
    };
  }
};

//* -- TOGGLE LINK STATUS --

export type ToggleLinkErrorCode = "AUTH_ERROR" | "NOT_FOUND" | "UNKNOWN";

interface ToggleLinkResult {
  success: boolean;
  errorCode?: ToggleLinkErrorCode;
  error?: string;
}

export const toggleLinkStatus = async (
  linkId: string,
  isActive: boolean,
): Promise<ToggleLinkResult> => {
  const session = await getAuthenticatedSession();
  if (!session) return AUTH_ERROR_RESULT;

  try {
    await LinksService.toggleLinkStatus(linkId, session.user.id, isActive);

    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      console.log(
        `[PRISMA_TOGGLE_INFO] Link ${linkId} not found or not owned by user.`,
      );
      return {
        success: false,
        errorCode: "NOT_FOUND",
        error: "Link not found.",
      };
    }

    console.error(
      `[PRISMA_TOGGLE_ERROR] Failed to toggle link ${linkId}:`,
      error,
    );
    return {
      success: false,
      errorCode: "UNKNOWN",
      error: "Could not toggle the link status. Please try again later.",
    };
  }
};
