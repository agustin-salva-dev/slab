import { Suspense } from "react";
import { CustomRangeSection } from "@/components/analytics/time/CustomRangeSection";
import { TimeAnalytics } from "@/components/analytics/time/TimeAnalytics";
import { DeviceAnalytics } from "@/components/analytics/device/DeviceAnalytics";
import { TopCountriesAnalytics } from "@/components/analytics/country/TopCountriesAnalytics";
import { CountrySearch } from "@/components/analytics/country/CountrySearch";
import { AnalyticsSkeleton } from "@/components/analytics/shared/AnalyticsSkeleton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
  description:
    "Visualize your link performance and track your most clicked links.",
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <Suspense fallback={<AnalyticsSkeleton count={3} />}>
        <TimeAnalytics />
      </Suspense>

      <CustomRangeSection />

      <Suspense fallback={<AnalyticsSkeleton count={3} />}>
        <DeviceAnalytics />
      </Suspense>

      <div className="pt-8 border-t border-border/40">
        <h2 className="text-2xl font-power-ultra tracking-tight mb-6">
          Countries Analytics
        </h2>

        <div className="mb-8 p-6 bg-my-background border rounded-3 space-y-4">
          <p className="font-power-med tracking-wide">
            Search for a specific country to view its most clicked links.
          </p>
          <CountrySearch />
        </div>

        <Suspense
          fallback={
            <AnalyticsSkeleton count={2} title="Loading Top Countries..." />
          }
        >
          <TopCountriesAnalytics />
        </Suspense>
      </div>
    </div>
  );
}
