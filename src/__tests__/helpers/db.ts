import { db } from "@/server/db";
import { LinkStatus } from "@prisma/client";
import crypto from "crypto";


export async function cleanDatabase() {
  await db.click.deleteMany();
  await db.linkTag.deleteMany();
  await db.tag.deleteMany();
  await db.link.deleteMany();
  await db.session.deleteMany();
  await db.account.deleteMany();
  await db.user.deleteMany();
}

export async function createTestUser(data: { id?: string; email?: string; name?: string } = {}) {
  const uniqueId = data.id ?? `user-${crypto.randomUUID()}`;
  return await db.user.create({
    data: {
      id: uniqueId,
      email: data.email ?? `test-${uniqueId}@example.com`,
      name: data.name ?? "Test User",
    },
  });
}

export async function createTestLink(
  userId: string,
  data: { shortSlug?: string; originalUrl?: string; expiresAt?: Date; isActive?: boolean } = {}
) {
  const uniqueSlug = data.shortSlug ?? `slug-${crypto.randomUUID().slice(0, 8)}`;
  return await db.link.create({
    data: {
      userId,
      shortSlug: uniqueSlug,
      originalUrl: data.originalUrl ?? "https://google.com",
      status: LinkStatus.PENDING,
      expiresAt: data.expiresAt,
      isActive: data.isActive ?? true,
    },
  });
}
