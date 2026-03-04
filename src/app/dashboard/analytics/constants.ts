import { BarChart3, Clock, CalendarDays } from "lucide-react";
import type { ElementType } from "react";

interface AnalyticsSectionConfig {
  title: string;
  icon: ElementType;
  iconClassName: string;
  emptyMessage: string;
}

export const ANALYTICS_SECTIONS: AnalyticsSectionConfig[] = [
  {
    title: "Top 5 Most Clicked",
    icon: BarChart3,
    iconClassName: "text-my-accents-blue",
    emptyMessage: "No click data yet. Share your links to start tracking!",
  },
  {
    title: "Top 5 Today",
    icon: Clock,
    iconClassName: "text-my-accents-yellow",
    emptyMessage: "No clicks today yet.",
  },
  {
    title: "Top 5 Last Week",
    icon: CalendarDays,
    iconClassName: "text-my-accents-green",
    emptyMessage: "No clicks in the last week yet.",
  },
  {
    title: "Top 5 Last 30 Days",
    icon: CalendarDays,
    iconClassName: "text-my-accents-red",
    emptyMessage: "No clicks in the last 30 days yet.",
  },
];
