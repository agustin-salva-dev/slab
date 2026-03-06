"use client";

import { useState } from "react";
import { COUNTRIES } from "@/config/countries";
import { fetchTopLinksAction } from "@/server/actions/analytics";
import { AnalyticsChartSection } from "@/components/analytics/shared/AnalyticsChartSection";
import { CountryFlag } from "@/components/ui/CountryFlag";
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/Combobox";
import { Globe, Loader2 } from "lucide-react";
import type { LinkClickStat } from "@/types/analytics";
import { toast } from "sonner";

const COUNTRY_ITEMS = Object.entries(COUNTRIES)
  .map(([code, name]) => ({
    value: code,
    label: name,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

export function CountrySearch() {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();
  const [data, setData] = useState<LinkClickStat[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelect = async (value: string | undefined) => {
    setSelectedCountry(value);

    if (!value) {
      setData(null);
      return;
    }

    setIsLoading(true);
    try {
      const stats = await fetchTopLinksAction({ country: value });
      setData(stats);
    } catch (error) {
      console.error("[COUNTRY_SEARCH_ERROR]", error);
      toast.error("Error loading data", {
        description: `We couldn't load statistics for ${COUNTRIES[value] ?? value}. Please try again.`,
      });
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 w-full max-w-sm">
        <label className="text-sm font-medium text-my-secondary">
          Filter by Country
        </label>
        <Combobox
          items={COUNTRY_ITEMS}
          value={selectedCountry}
          onChange={handleSelect}
        >
          <ComboboxTrigger className="w-full">
            <ComboboxValue placeholder="Search for a country..." />
          </ComboboxTrigger>
          <ComboboxContent className="w-full sm:w-[384px]">
            <ComboboxInput placeholder="Type a country name..." />
            <ComboboxList>
              <ComboboxEmpty>No country found.</ComboboxEmpty>
              <ComboboxGroup>
                {COUNTRY_ITEMS.map((country) => (
                  <ComboboxItem value={country.value} key={country.value}>
                    <div className="flex items-center gap-2 text-my-secondary">
                      <CountryFlag countryCode={country.value} />
                      <span className="truncate">{country.label}</span>
                    </div>
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-my-secondary p-4 border rounded-1 bg-my-secondary/5">
          <Loader2 className="animate-spin size-5" />
          <span className="text-sm">
            Fetching stats for {COUNTRIES[selectedCountry!]}...
          </span>
        </div>
      )}

      {!isLoading && selectedCountry && data && (
        <div className="pt-4">
          <h3 className="text-xl font-power-ultra mb-4 text-my-accents-blue">
            Search Result
          </h3>
          <AnalyticsChartSection
            title={
              <span className="flex items-center gap-2">
                Top 5 in <CountryFlag countryCode={selectedCountry} /> {COUNTRIES[selectedCountry]}
              </span>
            }
            icon={Globe}
            iconClassName="text-my-accents-green"
            data={data}
            emptyMessage={`No clicks from ${COUNTRIES[selectedCountry]} yet.`}
          />
        </div>
      )}
    </div>
  );
}
