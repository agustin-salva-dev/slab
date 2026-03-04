import { LinkBarChart } from "@/components/analytics/LinkBarChart";
import { AnalyticsCard } from "@/components/analytics/AnalyticsCard";
import type { LinkClickStat } from "@/types/analytics";
import type { ElementType } from "react";

interface AnalyticsChartSectionProps {
  title: string;
  icon: ElementType;
  iconClassName?: string;
  data: LinkClickStat[];
  emptyMessage?: string;
}

export function AnalyticsChartSection({
  title,
  icon,
  iconClassName,
  data,
  emptyMessage,
}: AnalyticsChartSectionProps) {
  return (
    <AnalyticsCard title={title} icon={icon} iconClassName={iconClassName}>
      <LinkBarChart data={data} emptyMessage={emptyMessage} />
    </AnalyticsCard>
  );
}
