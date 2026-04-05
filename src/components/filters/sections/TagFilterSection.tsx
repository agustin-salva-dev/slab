"use client";

import { useFilterStore } from "@/stores/useFilterStore";
import { TagListOptions } from "@/components/tags/list/TagListOptions";

export function TagFilterSection() {
  const { activeFilters, toggleFilter } = useFilterStore();
  const selectedTagIds = (activeFilters.tags as string[]) || [];

  return (
    <TagListOptions
      selectedTagIds={selectedTagIds}
      onToggle={(tagId) => toggleFilter("tags", tagId)}
      showSectionLabel={false}
    />
  );
}
