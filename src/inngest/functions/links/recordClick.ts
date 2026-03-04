import { inngest } from "../../client";
import { db } from "@/server/db";

import { UAParser } from "ua-parser-js";

export const recordClick = inngest.createFunction(
  { id: "record-click", name: "Record Link Click", retries: 3 },
  { event: "link/click.recorded" },
  async ({ event, step }) => {
    const { linkId, country, rawUserAgent } = event.data;

    if (!linkId) return { skip: true, message: "No linkId provided" };

    const device = await step.run("parse-user-agent", async () => {
      if (!rawUserAgent) return "Desktop";

      const parser = new UAParser(rawUserAgent);
      const type = parser.getDevice().type;

      if (type === "mobile" || type === "wearable") return "Mobile";
      if (type === "tablet") return "Tablet";
      return "Desktop";
    });

    const result = await step.run("update-db-stats", async () => {
      return await db.$transaction([
        db.click.create({
          data: {
            linkId: linkId,
            country: country ?? "Unknown",
            device: device,
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
