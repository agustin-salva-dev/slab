// Config for analytics chart sections — uses named keys to avoid silent bugs when reordering.
// To add a new section: add a key here, then reference it as ANALYTICS_SECTIONS.KEY_NAME.
import {
  BarChart3,
  Clock,
  CalendarDays,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import type { ElementType } from "react";

export interface AnalyticsSectionConfig {
  title: string;
  icon: ElementType;
  iconClassName: string;
  emptyMessage: string;
}

export const ANALYTICS_SECTIONS = {
  ALL_TIME: {
    title: "Top 5 Most Clicked",
    icon: BarChart3,
    iconClassName: "text-my-accents-blue",
    emptyMessage: "No click data yet. Share your links to start tracking!",
  },
  TODAY: {
    title: "Top 5 Today",
    icon: Clock,
    iconClassName: "text-my-accents-yellow",
    emptyMessage: "No clicks today yet.",
  },
  LAST_WEEK: {
    title: "Top 5 Last Week",
    icon: CalendarDays,
    iconClassName: "text-my-accents-green",
    emptyMessage: "No clicks in the last week yet.",
  },
  DESKTOP: {
    title: "Top 5 Desktop",
    icon: Monitor,
    iconClassName: "text-my-accents-cyan",
    emptyMessage: "No desktop clicks yet.",
  },
  MOBILE: {
    title: "Top 5 Mobile",
    icon: Smartphone,
    iconClassName: "text-my-accents-orange",
    emptyMessage: "No mobile clicks yet.",
  },
  TABLET: {
    title: "Top 5 Tablet",
    icon: Tablet,
    iconClassName: "text-my-accents-indigo",
    emptyMessage: "No tablet clicks yet.",
  },
} as const satisfies Record<string, AnalyticsSectionConfig>;
