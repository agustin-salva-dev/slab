// Time-based analytics — Server Component, streamed via Suspense
import { getTopLinksBetween } from "@/server/queries/analytics";
import { AnalyticsChartSection } from "@/components/analytics/shared/AnalyticsChartSection";
import { ANALYTICS_SECTIONS } from "@/app/dashboard/analytics/constants";

export async function TimeAnalytics() {
  const now = new Date();

  const results = await Promise.allSettled([
    getTopLinksBetween(),
    getTopLinksBetween({
      from: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      to: now,
    }),
    getTopLinksBetween({
      from: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
      to: now,
    }),
  ]);

  const allTime = results[0].status === "fulfilled" ? results[0].value : [];
  const today = results[1].status === "fulfilled" ? results[1].value : [];
  const lastWeek = results[2].status === "fulfilled" ? results[2].value : [];

  return (
    <>
      <AnalyticsChartSection {...ANALYTICS_SECTIONS.ALL_TIME} data={allTime} />
      <AnalyticsChartSection {...ANALYTICS_SECTIONS.TODAY} data={today} />
      <AnalyticsChartSection
        {...ANALYTICS_SECTIONS.LAST_WEEK}
        data={lastWeek}
      />
    </>
  );
}
