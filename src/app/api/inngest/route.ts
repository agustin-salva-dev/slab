import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { recordClick, verifyLink } from "@/inngest/functions/index";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [recordClick, verifyLink],
});
