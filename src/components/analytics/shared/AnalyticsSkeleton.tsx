import { AnalyticsCard } from "./AnalyticsCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { Loader2 } from "lucide-react";

const SKELETON_BARS = [
  { labelW: "w-24", barW: "w-full" },
  { labelW: "w-20", barW: "w-3/4" },
  { labelW: "w-28", barW: "w-1/2" },
  { labelW: "w-16", barW: "w-2/5" },
  { labelW: "w-24", barW: "w-1/4" },
];

export function ChartSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {SKELETON_BARS.map(({ labelW, barW }, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <Skeleton className={`h-4 ${labelW}`} />
          <Skeleton className={`h-8 ${barW} rounded-r-2`} />
        </div>
      ))}
    </div>
  );
}

export function AnalyticsSkeleton({
  count = 1,
  title = "Loading Stats...",
}: {
  count?: number;
  title?: string;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <AnalyticsCard
          key={i}
          title={title}
          icon={Loader2}
          iconClassName="text-my-secondary/50 animate-spin"
        >
          <ChartSkeleton />
        </AnalyticsCard>
      ))}
    </>
  );
}
