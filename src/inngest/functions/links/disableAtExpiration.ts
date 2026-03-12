import { inngest } from "../../client";
import { db } from "@/server/db";

export const disableAtExpiration = inngest.createFunction(
  {
    id: "disable-at-expiration",
    cancelOn: [
      {
        event: "link/expiration.cancelled",
        match: "data.linkId",
      },
    ],
  },
  { event: "link/expiration.scheduled" },
  async ({ event, step }) => {
    await step.sleepUntil("wait-for-expiration", event.data.expiresAt);

    await step.run("disable-expired-link", async () => {
      try {
        await db.link.update({
          where: { id: event.data.linkId },
          data: { isActive: false },
        });
      } catch (error) {
        console.error("[INNGEST_EXPIRATION_ERROR] Failed to disable link at expiration:", error);
        throw error;
      }
    });

    return { success: true, linkId: event.data.linkId };
  }
);
