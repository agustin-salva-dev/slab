import { getTopCountriesStats } from "@/server/queries/analytics";
import { AnalyticsChartSection } from "@/components/analytics/shared/AnalyticsChartSection";
import { CountryFlag } from "@/components/ui/CountryFlag";
import { COUNTRIES } from "@/config/countries";
import { Globe } from "lucide-react";
import type { LinkClickStat } from "@/types/analytics";

export async function TopCountriesAnalytics() {
  const topCountriesData = await getTopCountriesStats({
    countryLimit: 4,
    linkLimitPerCountry: 5,
  });

  if (topCountriesData.length === 0) return null;

  const renderCountrySection = (countryCode: string, data: LinkClickStat[]) => {
    const countryName = COUNTRIES[countryCode] ?? countryCode;
    return (
      <AnalyticsChartSection
        key={countryCode}
        title={
          <span className="flex items-center gap-2">
            Top 5 in <CountryFlag countryCode={countryCode} /> {countryName}
          </span>
        }
        icon={Globe}
        iconClassName="text-my-accents-green"
        data={data}
        emptyMessage={`No clicks from ${countryName} yet.`}
      />
    );
  };

  return (
    <div>
      <h3 className="text-xl font-power-ultra mb-4">
        Your Top {topCountriesData.length} Countries
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {topCountriesData.map((c) =>
          renderCountrySection(c.country, c.topLinks),
        )}
      </div>
    </div>
  );
}
