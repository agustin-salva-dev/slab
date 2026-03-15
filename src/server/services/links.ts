import { db } from "@/server/db";
import { LinkStatus } from "@prisma/client";
import type { CreateLinkInput, EditLinkInput } from "@/server/schemas/link";

export class LinksService {
  static async generateUniqueSlug(): Promise<string> {
    for (let attempt = 0; attempt < 5; attempt++) {
      const slug = Math.random().toString(36).substring(2, 8);
      const existing = await db.link.findUnique({ where: { shortSlug: slug } });
      if (!existing) return slug;
    }
    throw new Error("Could not generate a unique slug after 5 attempts.");
  }

  static async createLink(userId: string, values: CreateLinkInput) {
    const shortSlug = values.shortSlug || (await this.generateUniqueSlug());

    return await db.link.create({
      data: {
        originalUrl: values.originalUrl,
        shortSlug,
        description: values.description,
        userId,
        status: LinkStatus.PENDING,
        expiresAt: values.expiresAt,
      },
    });
  }

  static async deleteLink(linkId: string, userId: string) {
    return await db.link.delete({
      where: {
        id: linkId,
        userId,
      },
    });
  }

  static async getLinkById(linkId: string) {
    return await db.link.findUnique({
      where: { id: linkId },
    });
  }

  static async updateLink(linkId: string, values: EditLinkInput) {
    const isFutureExpiration =
      values.expiresAt && values.expiresAt > new Date();

    return await db.link.update({
      where: {
        id: linkId,
      },
      data: {
        originalUrl: values.originalUrl,
        shortSlug: values.shortSlug,
        description: values.description,
        ...(values.expiresAt !== undefined && { expiresAt: values.expiresAt }),
        ...(isFutureExpiration && { isActive: true }),
      },
    });
  }

  static async toggleLinkStatus(
    linkId: string,
    userId: string,
    isActive: boolean,
  ) {
    return await db.link.update({
      where: {
        id: linkId,
        userId,
      },
      data: {
        isActive,
      },
    });
  }

  static async disableExpiredLink(linkId: string) {
    return await db.link.update({
      where: { id: linkId },
      data: { isActive: false },
    });
  }
}
