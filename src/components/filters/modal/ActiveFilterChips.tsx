"use client";

import { useFilterStore } from "@/stores/useFilterStore";
import { useTags } from "@/hooks/tags/useTags";
import { FilterChip } from "../shared/FilterChip";
import { Tag } from "lucide-react";
import { SECTION_LABELS, getChipMeta } from "../filterConfig";
import type { ActiveFilters, FilterValue } from "@/types/filters";

export function ActiveFilterChips() {
  const { activeFilters, removeFilter } = useFilterStore();
  const { tags, isLoading } = useTags();

  const activeChips = (
    Object.entries(activeFilters) as [keyof ActiveFilters, FilterValue[]][]
  ).flatMap(([section, values]) =>
    values.map((value) => {
      let label = "";
      let icon = getChipMeta(section, value).icon;

      if (section === "tags") {
        const tag = tags.find((t) => t.id === value);
        label = tag ? tag.name : isLoading ? "..." : "Tag";
        icon = Tag;
      } else {
        label = getChipMeta(section, value).label;
      }

      return { section, value, icon, label };
    }),
  );

  return (
    <div
      role="group"
      aria-label="Active filters"
      className="flex flex-wrap items-center gap-1.5 p-2 md:gap-2 md:p-3"
    >
      {activeChips.map(({ section, value, icon: Icon, label }) => (
        <FilterChip
          key={`${section}-${value}`}
          icon={<Icon size={12} />}
          label={`${SECTION_LABELS[section]}: ${label}`}
          onRemove={() => removeFilter(section, value)}
        />
      ))}
    </div>
  );
}
