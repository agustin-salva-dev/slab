"use client";

import { useState, useTransition } from "react";
import { endOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { CalendarSearch, BarChart3 } from "lucide-react";

import { LinkBarChart } from "@/components/analytics/shared/LinkBarChart";
import { AnalyticsCard } from "@/components/analytics/shared/AnalyticsCard";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { fetchTopLinksAction } from "@/server/actions/analytics";
import type { LinkClickStat } from "@/types/analytics";
import { toast } from "sonner";

export function CustomRangeSection() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [data, setData] = useState<LinkClickStat[]>([]);
  const [isPending, startTransition] = useTransition();

  function handleSelect(range: DateRange | undefined) {
    setDateRange(range);

    if (range?.from && range?.to) {
      const to = endOfDay(range.to);

      startTransition(async () => {
        try {
          const result = await fetchTopLinksAction({ from: range.from, to });
          setData(result);
        } catch {
          toast.error("Error loading data", {
            description:
              "We couldn't load the clicks for this date range. Please try again.",
          });
          setData([]);
        }
      });
    }
  }

  function handleClear() {
    setDateRange(undefined);
    setData([]);
  }

  const showEmpty = !isPending && !dateRange?.from;
  const showChart = !isPending && !!dateRange?.from;

  return (
    <AnalyticsCard
      title="Custom Range"
      icon={CalendarSearch}
      headerAction={
        <DateRangePicker
          dateRange={dateRange}
          onSelect={handleSelect}
          onClear={handleClear}
        />
      }
    >
      {isPending && (
        <div className="flex items-center justify-center h-48 text-my-secondary text-sm animate-pulse">
          Fetching data…
        </div>
      )}

      {showEmpty && (
        <div className="flex flex-col items-center justify-center h-48 gap-3 text-my-secondary">
          <div className="rounded-full bg-my-secondary/10 p-3">
            <BarChart3 size={24} />
          </div>
          <p className="text-sm font-medium">
            Select a date range to see your top links.
          </p>
        </div>
      )}

      {showChart && (
        <LinkBarChart
          data={data}
          emptyMessage="No clicks in this date range."
        />
      )}
    </AnalyticsCard>
  );
}
