"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3 } from "lucide-react";
import type { LinkClickStat } from "@/types/analytics";

interface ChartEntry {
  name: string;
  clicks: number;
}

interface LinkBarChartProps {
  data: LinkClickStat[];
  emptyMessage?: string;
}

const BAR_HEIGHT = 56;

const AXIS_COLORS = {
  secondary: "var(--color-my-secondary)",
  foreground: "var(--color-foreground)",
} as const;

function truncateTitle(title: string, maxLength: number): string {
  return title.length > maxLength ? `${title.slice(0, maxLength)}…` : title;
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ payload: ChartEntry }>;
}) {
  if (!active || !payload?.length) return null;

  const { name, clicks } = payload[0].payload;

  return (
    <div className="rounded-2 border border-my-border-primary bg-my-primary px-3 py-2">
      <p className="font-power-ultra text-sm text-white">{name}</p>
      <p className="text-xs text-my-secondary">{clicks} clicks</p>
    </div>
  );
}

export function LinkBarChart({
  data,
  emptyMessage = "No click data yet. Share your links to start tracking!",
}: LinkBarChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-3 text-my-secondary">
        <div className="rounded-full bg-my-secondary/10 p-3">
          <BarChart3 size={24} className="opacity-80" />
        </div>
        <p className="text-sm font-medium">{emptyMessage}</p>
      </div>
    );
  }

  const currentMaxTitle = 15;
  const yAxisWidth = 110;

  const chartData: ChartEntry[] = data.map((item) => ({
    name: truncateTitle(item.title, currentMaxTitle),
    clicks: item.clickCount,
  }));

  return (
    <ResponsiveContainer width="100%" height={data.length * BAR_HEIGHT + 20}>
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 0, right: 32, left: 0, bottom: 0 }}
        barCategoryGap="20%"
      >
        <XAxis
          type="number"
          tick={{ fill: AXIS_COLORS.secondary, fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: AXIS_COLORS.foreground, fontSize: 13 }}
          axisLine={false}
          tickLine={false}
          width={yAxisWidth}
        />
        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.08)" }}
          content={<CustomTooltip />}
        />
        <Bar
          dataKey="clicks"
          fill="var(--color-my-accents-blue)"
          radius={[0, 6, 6, 0]}
          maxBarSize={36}
          label={{
            position: "right",
            fill: "var(--color-my-secondary)",
            fontSize: 12,
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
