import { LinkBarChart } from "./LinkBarChart";
import { AnalyticsCard } from "./AnalyticsCard";
import type { LinkClickStat } from "@/types/analytics";
import type { ElementType, ReactNode } from "react";

interface AnalyticsChartSectionProps {
  title: ReactNode;
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
