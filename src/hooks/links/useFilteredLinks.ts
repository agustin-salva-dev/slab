import { useMemo } from "react";
import { useFilterStore } from "@/stores/useFilterStore";
import {
  matchesCreatedFilters,
  matchesExpiresFilters,
} from "@/utils/filters/dateFilters";

interface LinkWithDates {
  createdAt: Date | string;
  expiresAt: Date | string | null;
}

export function useFilteredLinks<T extends LinkWithDates>(
  links: T[] | undefined,
) {
  const { activeFilters, clearAllFilters, hasActiveFilters } = useFilterStore();

  const filteredLinks = useMemo(() => {
    if (!links) return [];

    const hasCreatedFilters = activeFilters.created.length > 0;
    const hasExpiresFilters = activeFilters.expires.length > 0;

    if (!hasCreatedFilters && !hasExpiresFilters) return links;

    return links.filter((link) => {
      const matchesCreated = matchesCreatedFilters(
        new Date(link.createdAt),
        activeFilters.created,
      );
      const matchesExpires = matchesExpiresFilters(
        link.expiresAt,
        activeFilters.expires,
      );

      return matchesCreated && matchesExpires;
    });
  }, [links, activeFilters.created, activeFilters.expires]);

  return { filteredLinks, clearAllFilters, hasActiveFilters };
}
