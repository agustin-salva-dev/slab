import { useMemo } from "react";
import { useFilterStore } from "@/stores/useFilterStore";
import {
  matchesCreatedFilters,
  matchesExpiresFilters,
} from "@/utils/filters/dateFilters";

interface LinkWithDates {
  shortSlug: string;
  description?: string | null;
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
  const { activeFilters, searchQuery, clearAllFilters, hasActiveFilters } =
    useFilterStore();
  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredLinks = useMemo(() => {
    if (!links) return [];

    const hasCreatedFilters = activeFilters.created.length > 0;
    const hasExpiresFilters = activeFilters.expires.length > 0;
    const hasTagsFilters = activeFilters.tags.length > 0;

    if (
      !hasCreatedFilters &&
      !hasExpiresFilters &&
      !hasTagsFilters &&
      !normalizedQuery
    )
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

      const matchesSearch =
        !normalizedQuery ||
        link.shortSlug.toLowerCase().includes(normalizedQuery) ||
        (link.description?.toLowerCase().includes(normalizedQuery) ?? false);

      return matchesCreated && matchesExpires && matchesTags && matchesSearch;
    });
  }, [
    links,
    activeFilters.created,
    activeFilters.expires,
    activeFilters.tags,
    normalizedQuery,
  ]);

  return { filteredLinks, clearAllFilters, hasActiveFilters };
}
