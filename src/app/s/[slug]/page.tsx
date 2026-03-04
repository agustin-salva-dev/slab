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
  const rawUserAgent = reqHeaders.get("user-agent") || "";

  void inngest.send({
    name: "link/click.recorded",
    data: {
      linkId: link.id,
      country,
      rawUserAgent,
    },
  });

  const destination = link.originalUrl.startsWith("http")
    ? link.originalUrl
    : `https://${link.originalUrl}`;

  redirect(destination);
}
