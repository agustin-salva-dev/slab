import { Skeleton } from "@/components/ui/Skeleton";
import { AnalyticsCard } from "@/components/analytics/AnalyticsCard";
import { ANALYTICS_SECTIONS } from "./constants";
import { CalendarSearch } from "lucide-react";

function ChartSkeleton({
  title,
  icon: Icon,
}: {
  title: string;
  icon: React.ElementType;
}) {
  return (
    <AnalyticsCard title={title} icon={Icon}>
      <div className="flex flex-col gap-4">
        {[
          ["w-24", "w-full"],
          ["w-20", "w-3/4"],
          ["w-28", "w-1/2"],
          ["w-16", "w-2/5"],
          ["w-24", "w-1/4"],
        ].map(([labelW, barW], i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className={`h-4 ${labelW}`} />
            <Skeleton className={`h-8 ${barW} rounded-r-2`} />
          </div>
        ))}
      </div>
    </AnalyticsCard>
  );
}

export default function AnalyticsLoading() {
  return (
    <div className="flex flex-col gap-8">
      <ChartSkeleton
        title={ANALYTICS_SECTIONS[0].title}
        icon={ANALYTICS_SECTIONS[0].icon}
      />
      <ChartSkeleton
        title={ANALYTICS_SECTIONS[1].title}
        icon={ANALYTICS_SECTIONS[1].icon}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChartSkeleton
          title={ANALYTICS_SECTIONS[2].title}
          icon={ANALYTICS_SECTIONS[2].icon}
        />
        <ChartSkeleton
          title={ANALYTICS_SECTIONS[3].title}
          icon={ANALYTICS_SECTIONS[3].icon}
        />
      </div>

      <ChartSkeleton
        title={ANALYTICS_SECTIONS[4].title}
        icon={ANALYTICS_SECTIONS[4].icon}
      />
      <ChartSkeleton
        title={ANALYTICS_SECTIONS[5].title}
        icon={ANALYTICS_SECTIONS[5].icon}
      />
      <ChartSkeleton
        title={ANALYTICS_SECTIONS[6].title}
        icon={ANALYTICS_SECTIONS[6].icon}
      />

      <AnalyticsCard
        title="Custom Range"
        icon={CalendarSearch}
        headerAction={<Skeleton className="h-9 w-52 rounded-2" />}
      >
        <div className="flex items-center justify-center h-48">
          <Skeleton className="h-4 w-64" />
        </div>
      </AnalyticsCard>
    </div>
  );
}
