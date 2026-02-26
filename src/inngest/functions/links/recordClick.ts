import { inngest } from "../../client";
import { db } from "@/server/db";

export const recordClick = inngest.createFunction(
  { id: "record-click", name: "Record Link Click", retries: 3 },
  { event: "link/click.recorded" },
  async ({ event, step }) => {
    const { linkId, country, device, source } = event.data;

    if (!linkId) return { skip: true, message: "No linkId provided" };

    const result = await step.run("update-db-stats", async () => {
      return await db.$transaction([
        db.click.create({
          data: {
            linkId: linkId,
            country: country ?? "Unknown",
            device: device ?? "Desktop",
            source: source ?? "Direct",
          },
        }),
        db.link.update({
          where: { id: linkId },
          data: {
            clickCount: { increment: 1 },
          },
        }),
      ]);
    });

    return { success: true, clickId: result[0].id };
  },
);
