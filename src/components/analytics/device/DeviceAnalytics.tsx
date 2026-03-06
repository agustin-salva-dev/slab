// Device-based analytics — Server Component, streamed via Suspense
import { getTopLinksBetween } from "@/server/queries/analytics";
import { AnalyticsChartSection } from "@/components/analytics/shared/AnalyticsChartSection";
import { ANALYTICS_SECTIONS } from "@/app/dashboard/analytics/constants";

export async function DeviceAnalytics() {
  const results = await Promise.allSettled([
    getTopLinksBetween({ device: "Desktop" }),
    getTopLinksBetween({ device: "Mobile" }),
    getTopLinksBetween({ device: "Tablet" }),
  ]);

  const desktop = results[0].status === "fulfilled" ? results[0].value : [];
  const mobile = results[1].status === "fulfilled" ? results[1].value : [];
  const tablet = results[2].status === "fulfilled" ? results[2].value : [];

  return (
    <>
      <AnalyticsChartSection {...ANALYTICS_SECTIONS.DESKTOP} data={desktop} />
      <AnalyticsChartSection {...ANALYTICS_SECTIONS.MOBILE} data={mobile} />
      <AnalyticsChartSection {...ANALYTICS_SECTIONS.TABLET} data={tablet} />
    </>
  );
}
