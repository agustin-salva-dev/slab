import { describe, it, expect, vi, beforeEach } from "vitest";
import { recordClick } from "@/inngest/functions/links/recordClick";
import { db } from "@/server/db";
import {
  cleanDatabase,
  createTestUser,
  createTestLink,
} from "../../helpers/db";

interface MockStep {
  run: <T>(id: string, fn: () => Promise<T> | T) => Promise<T>;
}

describe("Integration: recordClick Inngest Worker", () => {
  beforeEach(async () => {
    await cleanDatabase();
    vi.clearAllMocks();
  });

  it("updates click logs and link clickCount in a transaction", async () => {
    const user = await createTestUser();
    const link = await createTestLink(user.id, { shortSlug: "test" });

    const mockContext = {
      event: {
        name: "link/click.recorded" as const,
        data: {
          linkId: link.id,
          country: "AR",
          rawUserAgent:
            "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)",
        },
      },
      step: {
        run: vi.fn().mockImplementation(async <T>(id: string, fn: () => Promise<T> | T) => fn()),
      } as unknown as MockStep,
    };

    const result = await recordClick["fn"](mockContext);
    expect(result.success).toBe(true);

    const clicks = await db.click.findMany({ where: { linkId: link.id } });
    expect(clicks).toHaveLength(1);
    expect(clicks[0].country).toBe("AR");
    expect(clicks[0].device).toBe("Mobile");

    const updatedLink = await db.link.findUnique({ where: { id: link.id } });
    expect(updatedLink?.clickCount).toBe(1);
  });
});
