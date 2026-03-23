"use server";

import { auth } from "@/server/auth";
import { headers } from "next/headers";
import type { CreateTagInput, TagLinkInput } from "@/server/schemas/tags";
import { db } from "@/server/db";
import { Prisma } from "@prisma/client";

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

//* -- CREATE TAG --

export type CreateTagErrorCode = "AUTH_ERROR" | "TAG_CONFLICT" | "UNKNOWN";

interface CreateTagResult {
  success: boolean;
  tagId?: string;
  errorCode?: CreateTagErrorCode;
  error?: string;
}

export const createTag = async (
  values: CreateTagInput,
): Promise<CreateTagResult> => {
  const session = await getAuthenticatedSession();
  if (!session) return AUTH_ERROR_RESULT;

  try {
    const result = await db.tag.create({
      data: {
        name: values.name,
        color: values.color,
        userId: session.user.id,
      },
    });

    return { success: true, tagId: result.id };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.error(
        "[createTag] Unique constraint violated on tag name per user",
      );
      return {
        success: false,
        errorCode: "TAG_CONFLICT",
        error: `Tag "${values.name}" already exists.`,
      };
    }

    console.error(
      "[PRISMA_CREATE_TAG_ERROR] Unexpected error creating tag:",
      error,
    );
    return {
      success: false,
      errorCode: "UNKNOWN",
      error: "Could not create the tag. Please try again.",
    };
  }
};

//* -- DELETE TAG --

export type DeleteTagErrorCode = "AUTH_ERROR" | "NOT_FOUND" | "UNKNOWN";

interface DeleteTagResult {
  success: boolean;
  errorCode?: DeleteTagErrorCode;
  error?: string;
}

export const deleteTag = async (tagId: string): Promise<DeleteTagResult> => {
  const session = await getAuthenticatedSession();
  if (!session) return AUTH_ERROR_RESULT;

  try {
    const deleted = await db.tag.deleteMany({
      where: {
        id: tagId,
        userId: session.user.id,
      },
    });

    if (deleted.count === 0) {
      console.log(
        `[PRISMA_DELETE_TAG_INFO] Tag ${tagId} not found or not owned by user.`,
      );
      return {
        success: false,
        errorCode: "NOT_FOUND",
        error: "Tag not found.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error(
      `[PRISMA_DELETE_TAG_ERROR] Failed to delete tag ${tagId}:`,
      error,
    );
    return {
      success: false,
      errorCode: "UNKNOWN",
      error: "Could not delete the tag. Please try again.",
    };
  }
};

//* -- ATTACH TAG TO LINK --

export type AttachTagErrorCode = "AUTH_ERROR" | "CONFLICT" | "UNKNOWN";

interface AttachTagResult {
  success: boolean;
  errorCode?: AttachTagErrorCode;
  error?: string;
}

export const attachTagToLink = async (
  values: TagLinkInput,
): Promise<AttachTagResult> => {
  const session = await getAuthenticatedSession();
  if (!session) return AUTH_ERROR_RESULT;

  try {
    const [link, tag] = await Promise.all([
      db.link.findUnique({
        where: { id: values.linkId },
        select: { userId: true },
      }),
      db.tag.findUnique({
        where: { id: values.tagId },
        select: { userId: true },
      }),
    ]);

    if (
      !link ||
      link.userId !== session.user.id ||
      !tag ||
      tag.userId !== session.user.id
    ) {
      console.error(
        `[AUTH_ERROR] User ${session.user.id} attempted to attach tag ${values.tagId} to link ${values.linkId} without ownership.`,
      );
      return {
        success: false,
        errorCode: "AUTH_ERROR",
        error:
          "Unauthorized: You do not have permission to modify this link or tag.",
      };
    }

    await db.linkTag.create({
      data: {
        linkId: values.linkId,
        tagId: values.tagId,
      },
    });

    return { success: true };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        errorCode: "CONFLICT",
        error: "This link already has this tag assigned.",
      };
    }

    console.error(
      `[PRISMA_ATTACH_TAG_ERROR] Failed to attach tag ${values.tagId} to link ${values.linkId}:`,
      error,
    );
    return {
      success: false,
      errorCode: "UNKNOWN",
      error: "Could not add the tag to the link. Please try again.",
    };
  }
};

//* -- DETACH TAG FROM LINK --

export type DetachTagErrorCode = "AUTH_ERROR" | "NOT_FOUND" | "UNKNOWN";

interface DetachTagResult {
  success: boolean;
  errorCode?: DetachTagErrorCode;
  error?: string;
}

export const detachTagFromLink = async (
  values: TagLinkInput,
): Promise<DetachTagResult> => {
  const session = await getAuthenticatedSession();
  if (!session) return AUTH_ERROR_RESULT;

  try {
    const deleted = await db.linkTag.deleteMany({
      where: {
        linkId: values.linkId,
        tagId: values.tagId,
        link: {
          userId: session.user.id,
        },
      },
    });

    if (deleted.count === 0) {
      return {
        success: false,
        errorCode: "NOT_FOUND",
        error: "Link not found or the tag is not assigned to it.",
      };
    }

    return { success: true };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return {
        success: false,
        errorCode: "NOT_FOUND",
        error: "The tag is not assigned to this link.",
      };
    }

    console.error(
      `[PRISMA_DETACH_TAG_ERROR] Failed to detach tag ${values.tagId} from link ${values.linkId}:`,
      error,
    );
    return {
      success: false,
      errorCode: "UNKNOWN",
      error: "Could not remove the tag from the link. Please try again.",
    };
  }
};
