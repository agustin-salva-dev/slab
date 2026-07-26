import { describe, it, expect, vi, beforeEach } from "vitest";
import { createLink } from "@/server/actions/links";
import { db } from "@/server/db";
import { inngest } from "@/inngest/client";
import { cleanDatabase, createTestUser } from "../../helpers/db";
import { mockSession } from "../../helpers/auth";

describe("Integration: createLink Server Action", () => {
  beforeEach(async () => {
    await cleanDatabase();
    vi.clearAllMocks();
  });

  it("fails to create link if unauthorized", async () => {
    mockSession(null);

    const result = await createLink({ originalUrl: "https://github.com" });

    expect(result.success).toBe(false);
    expect(result.errorCode).toBe("AUTH_ERROR");

    const linksCount = await db.link.count();
    expect(linksCount).toBe(0);
  });

  it("creates a link in the real database and sends verify event to Inngest", async () => {
    const user = await createTestUser();
    mockSession(user);

    const result = await createLink({
      originalUrl: "https://github.com",
      shortSlug: "git",
    });

    expect(result.success).toBe(true);
    expect(result.linkId).toBeDefined();

    const savedLink = await db.link.findUnique({
      where: { id: result.linkId },
    });
    expect(savedLink).not.toBeNull();
    expect(savedLink?.originalUrl).toBe("https://github.com");
    expect(savedLink?.userId).toBe(user.id);

    expect(inngest.send).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          name: "link/verify.requested",
          data: { linkId: result.linkId, originalUrl: "https://github.com" },
        }),
      ])
    );
  });
});
