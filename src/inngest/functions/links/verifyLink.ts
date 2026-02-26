import { inngest } from "../../client";
import { db } from "@/server/db";
import { LinkStatus } from "@prisma/client";

export const verifyLink = inngest.createFunction(
  { id: "verify-link-safety", name: "Verify Link Safety" },
  { event: "link/verify.requested" },
  async ({ event, step }) => {
    const { linkId, originalUrl } = event.data;
    const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;

    if (!apiKey) {
      throw new Error("Missing Google Safe Browsing API Key");
    }

    const isSafe = await step.run("check-google-safe-browsing", async () => {
      const response = await fetch(
        `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client: {
              clientId: "slab-url-shortener",
              clientVersion: "1.0.0",
            },
            threatInfo: {
              threatTypes: [
                "MALWARE",
                "SOCIAL_ENGINEERING",
                "UNWANTED_SOFTWARE",
                "POTENTIALLY_HARMFUL_APPLICATION",
              ],
              platformTypes: ["ANY_PLATFORM"],
              threatEntryTypes: ["URL"],
              threatEntries: [{ url: originalUrl }],
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Google API responded with ${response.status}`);
      }

      const data = await response.json();

      return !data.matches || data.matches.length === 0;
    });

    await step.sleep("simulate-verification-delay", "10s");

    await step.run("update-link-status", async () => {
      await db.link.update({
        where: { id: linkId },
        data: {
          status: isSafe ? LinkStatus.VERIFIED : LinkStatus.DANGEROUS,
        },
      });
    });

    return {
      success: true,
      linkId,
      status: isSafe ? LinkStatus.VERIFIED : LinkStatus.DANGEROUS,
    };
  },
);
