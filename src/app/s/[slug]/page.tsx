import { db } from "@/server/db";
import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";
import { inngest } from "@/inngest/client";

export default async function RedirectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const link = await db.link.findUnique({
    where: { shortSlug: slug },
    select: { id: true, originalUrl: true },
  });

  if (!link) notFound();

  const reqHeaders = await headers();

  const country = reqHeaders.get("x-vercel-ip-country") || "Unknown";

  const rawReferer = reqHeaders.get("referer");
  let source = "Direct";
  if (rawReferer) {
    try {
      const url = new URL(rawReferer);
      source = url.hostname.replace("www.", "");
    } catch {
      source = rawReferer;
    }
  }

  const uaString = reqHeaders.get("user-agent") || "";
  let device = "Desktop";
  if (/mobile/i.test(uaString)) {
    device = "Mobile";
  } else if (/tablet/i.test(uaString)) {
    device = "Tablet";
  }

  await inngest.send({
    name: "link/click.recorded",
    data: {
      linkId: link.id,
      country,
      device,
      source,
    },
  });

  const destination = link.originalUrl.startsWith("http")
    ? link.originalUrl
    : `https://${link.originalUrl}`;

  redirect(destination);
}
