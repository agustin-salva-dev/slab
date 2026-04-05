import { useMemo } from "react";
import { useFilterStore } from "@/stores/useFilterStore";
import {
  matchesCreatedFilters,
  matchesExpiresFilters,
} from "@/utils/filters/dateFilters";

interface LinkWithDates {
  createdAt: Date | string;
  expiresAt: Date | string | null;
  tags?: {
    tag: {
      id: string;
    };
  }[];
}

export function useFilteredLinks<T extends LinkWithDates>(
  links: T[] | undefined,
) {
  const { activeFilters, clearAllFilters, hasActiveFilters } = useFilterStore();

  const filteredLinks = useMemo(() => {
    if (!links) return [];

    const hasCreatedFilters = activeFilters.created.length > 0;
    const hasExpiresFilters = activeFilters.expires.length > 0;
    const hasTagsFilters = activeFilters.tags.length > 0;

    if (!hasCreatedFilters && !hasExpiresFilters && !hasTagsFilters)
      return links;

    return links.filter((link) => {
      const matchesCreated = matchesCreatedFilters(
        new Date(link.createdAt),
        activeFilters.created,
      );
      const matchesExpires = matchesExpiresFilters(
        link.expiresAt,
        activeFilters.expires,
      );

      const matchesTags =
        !hasTagsFilters ||
        (link.tags !== undefined &&
          link.tags.some((tagItem) =>
            (activeFilters.tags as string[]).includes(tagItem.tag.id),
          ));

      return matchesCreated && matchesExpires && matchesTags;
    });
  }, [links, activeFilters.created, activeFilters.expires, activeFilters.tags]);

  return { filteredLinks, clearAllFilters, hasActiveFilters };
}
