import { getTopLinksBetween } from "@/server/queries/analytics";
import { AnalyticsChartSection } from "@/components/analytics/AnalyticsChartSection";
import { CustomRangeSection } from "@/components/analytics/CustomRangeSection";
import { ANALYTICS_SECTIONS } from "./constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics | Slab",
  description:
    "Visualize your link performance and track your most clicked links.",
};

export default async function AnalyticsPage() {
  const now = new Date();

  const [allTime, today, lastWeek, lastMonth] = await Promise.all([
    getTopLinksBetween(),
    getTopLinksBetween(new Date(now.getTime() - 24 * 60 * 60 * 1000), now),
    getTopLinksBetween(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), now),
    getTopLinksBetween(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000), now),
  ]);

  const sectionsData = [allTime, today, lastWeek, lastMonth];

  return (
    <div className="space-y-8">
      <AnalyticsChartSection
        {...ANALYTICS_SECTIONS[0]}
        data={sectionsData[0]}
      />
      <AnalyticsChartSection
        {...ANALYTICS_SECTIONS[1]}
        data={sectionsData[1]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnalyticsChartSection
          {...ANALYTICS_SECTIONS[2]}
          data={sectionsData[2]}
        />
        <AnalyticsChartSection
          {...ANALYTICS_SECTIONS[3]}
          data={sectionsData[3]}
        />
      </div>

      <CustomRangeSection />
    </div>
  );
}
