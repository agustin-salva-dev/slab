import { describe, it, expect, vi, beforeEach } from "vitest";
import RedirectPage from "@/app/s/[slug]/page";
import { inngest } from "@/inngest/client";
import {
  cleanDatabase,
  createTestUser,
  createTestLink,
} from "../../helpers/db";

describe("Integration: Redirect Route (/s/[slug])", () => {
  beforeEach(async () => {
    await cleanDatabase();
    vi.clearAllMocks();
  });

  it("throws notFound error when link is missing or inactive", async () => {
    await expect(
      RedirectPage({ params: Promise.resolve({ slug: "unknown" }) }),
    ).rejects.toThrow("NextNotFound");
  });

  it("sends non-awaited inngest event and redirects for active link", async () => {
    const user = await createTestUser();
    const link = await createTestLink(user.id, {
      shortSlug: "wiki",
      originalUrl: "https://wikipedia.org",
    });

    await expect(
      RedirectPage({ params: Promise.resolve({ slug: "wiki" }) }),
    ).rejects.toThrow("Redirected to: https://wikipedia.org");

    expect(inngest.send).toHaveBeenCalledWith({
      name: "link/click.recorded",
      data: {
        linkId: link.id,
        country: "US",
        rawUserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    });
  });
});
