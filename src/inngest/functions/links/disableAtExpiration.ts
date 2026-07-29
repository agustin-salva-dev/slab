import { inngest } from "../../client";
import { LinksService } from "@/server/services/links";

export const disableAtExpiration = inngest.createFunction(
  {
    id: "disable-at-expiration",
    name: "Disable At Expiration",
    cancelOn: [
      {
        event: "link/expiration.cancelled",
        match: "data.linkId",
      },
    ],
    retries: 3,
  },
  { event: "link/expiration.scheduled" },
  async ({ event, step }) => {
    await step.sleepUntil("wait-for-expiration", event.data.expiresAt);

    await step.run("disable-expired-link", async () => {
      try {
        await LinksService.disableExpiredLink(event.data.linkId);
      } catch (error: unknown) {
        if (
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          error.code === "P2025"
        ) {
          console.log(
            `[INNGEST_EXPIRATION_INFO] Link ${event.data.linkId} not found. Assuming deleted.`,
          );
          return;
        }
        console.error(
          "[INNGEST_EXPIRATION_ERROR] Failed to disable link at expiration:",
          error,
        );
        throw error;
      }
    });

    return { success: true, linkId: event.data.linkId };
  },
);
