import {
  Sun,
  CalendarOff,
  CalendarClock,
  Sunrise,
  CalendarDays,
  Calendar,
  CalendarArrowDown,
  Clock,
  LayersPlus,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ActiveFilters, FilterValue } from "@/types/filters";

export interface FilterOption {
  icon: LucideIcon;
  label: string;
  value: FilterValue;
}

export interface FilterSection {
  icon: LucideIcon;
  title: string;
  section: keyof ActiveFilters;
  options: FilterOption[];
}

export const FILTER_SECTIONS: FilterSection[] = [
  {
    icon: CalendarClock,
    title: "Expires",
    section: "expires",
    options: [
      { icon: Sun, label: "Today", value: "today" },
      { icon: Sunrise, label: "Tomorrow", value: "tomorrow" },
      { icon: CalendarDays, label: "Next 7 days", value: "next7days" },
      { icon: Calendar, label: "This month", value: "thisMonth" },
      { icon: Clock, label: "Later", value: "later" },
      { icon: CalendarOff, label: "No expiration", value: "no-expiration" },
    ],
  },
  {
    icon: LayersPlus,
    title: "Created",
    section: "created",
    options: [
      { icon: Sun, label: "Today", value: "today" },
      { icon: CalendarDays, label: "Last 7 days", value: "last7days" },
      { icon: Calendar, label: "Last month", value: "lastMonth" },
      { icon: CalendarArrowDown, label: "Older", value: "older" },
    ],
  },
];

export function getChipMeta(
  section: keyof ActiveFilters,
  value: FilterValue,
): { icon: LucideIcon; label: string } {
  const sectionData = FILTER_SECTIONS.find((s) => s.section === section);
  const option = sectionData?.options.find((o) => o.value === value);

  return option
    ? { icon: option.icon, label: option.label }
    : { icon: Sun, label: String(value) };
}

export const SECTION_LABELS: Record<keyof ActiveFilters, string> = {
  created: "Created",
  expires: "Expires",
  tags: "Tag",
};
