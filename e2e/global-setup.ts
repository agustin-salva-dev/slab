import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const E2E_USER = {
  id: "e2e-test-user-id",
  email: "e2e-user@example.com",
  name: "E2E Test User",
  emailVerified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const E2E_SESSION = {
  id: "e2e-test-session-id",
  token: "e2e-test-session-token",
  userId: E2E_USER.id,
  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
  createdAt: new Date(),
  updatedAt: new Date(),
};

const E2E_LINK = {
  id: "e2e-test-link-id",
  shortSlug: "e2e-test-slug",
  originalUrl: "https://google.com",
  description: "Test link for E2E redirection suite",
  userId: E2E_USER.id,
  isActive: true,
};

async function globalSetup() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn(
      "[E2E Global Setup] DATABASE_URL is not set. Skipping DB seeding.",
    );
    return;
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    await prisma.user.upsert({
      where: { id: E2E_USER.id },
      update: {
        email: E2E_USER.email,
        name: E2E_USER.name,
      },
      create: {
        id: E2E_USER.id,
        email: E2E_USER.email,
        name: E2E_USER.name,
        emailVerified: E2E_USER.emailVerified,
      },
    });

    await prisma.session.upsert({
      where: { id: E2E_SESSION.id },
      update: {
        token: E2E_SESSION.token,
        expiresAt: E2E_SESSION.expiresAt,
      },
      create: {
        id: E2E_SESSION.id,
        token: E2E_SESSION.token,
        userId: E2E_SESSION.userId,
        expiresAt: E2E_SESSION.expiresAt,
        createdAt: E2E_SESSION.createdAt,
        updatedAt: E2E_SESSION.updatedAt,
      },
    });

    await prisma.link.upsert({
      where: { shortSlug: E2E_LINK.shortSlug },
      update: {
        originalUrl: E2E_LINK.originalUrl,
        isActive: E2E_LINK.isActive,
      },
      create: {
        id: E2E_LINK.id,
        shortSlug: E2E_LINK.shortSlug,
        originalUrl: E2E_LINK.originalUrl,
        description: E2E_LINK.description,
        userId: E2E_LINK.userId,
        isActive: E2E_LINK.isActive,
      },
    });

    const authDir = path.join(process.cwd(), "e2e/.auth");
    if (!fs.existsSync(authDir)) {
      fs.mkdirSync(authDir, { recursive: true });
    }

    const storageState = {
      cookies: [
        {
          name: "better-auth.session_token",
          value: `${E2E_SESSION.token}.`,
          domain: "localhost",
          path: "/",
          expires: Math.floor(E2E_SESSION.expiresAt.getTime() / 1000),
          httpOnly: true,
          secure: false,
          sameSite: "Lax" as const,
        },
      ],
      origins: [],
    };

    fs.writeFileSync(
      path.join(authDir, "user.json"),
      JSON.stringify(storageState, null, 2),
    );
  } catch (error) {
    console.error("[E2E Global Setup] Error during DB seeding:", error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

export default globalSetup;
