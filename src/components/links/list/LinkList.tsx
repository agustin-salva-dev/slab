"use client";

import { useMemo } from "react";
import useSWR from "swr";
import { LinkCard } from "../card/LinkCard";
import { getUserLinks } from "@/server/queries/links";
import { LinkCardSkeleton } from "../card/LinkCardSkeleton";
import { EmptyLinkList } from "./EmptyLinkList";
import { useFilterStore } from "@/stores/useFilterStore";
import { matchesCreatedFilters } from "@/utils/filters/dateFilters";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/Button";

type UserLinks = Awaited<ReturnType<typeof getUserLinks>>;

interface LinkListProps {
  initialLinks: UserLinks;
}

export function LinkList({ initialLinks }: LinkListProps) {
  const { data: links } = useSWR("user-links", () => getUserLinks(), {
    fallbackData: initialLinks,
    refreshInterval: 30000,
    revalidateOnFocus: true,
  });

  const { activeFilters, clearAllFilters } = useFilterStore();

  const filteredLinks = useMemo(() => {
    if (!links) return [];
    if (activeFilters.created.length === 0) return links;

    return links.filter((link) =>
      matchesCreatedFilters(new Date(link.createdAt), activeFilters.created),
    );
  }, [links, activeFilters.created]);

  if (!links || links.length === 0) return <EmptyLinkList />;

  if (filteredLinks.length === 0) {
    return <EmptyFilterResult onClear={clearAllFilters} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-25 gap-y-10">
      {filteredLinks.map((link) =>
        link.id === "optimistic-id" ? (
          <LinkCardSkeleton key={link.id} />
        ) : (
          <LinkCard
            key={link.id}
            id={link.id}
            shortSlug={link.shortSlug}
            originalUrl={link.originalUrl}
            description={link.description}
            createdAt={link.createdAt}
            clickCount={link.clickCount}
            status={link.status}
            expiresAt={link.expiresAt}
            isActive={link.isActive}
          />
        ),
      )}
    </div>
  );
}

function EmptyFilterResult({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <SearchX size={40} className="text-my-secondary" aria-hidden="true" />
      <div>
        <p className="text-sm font-medium text-white md:text-base">
          No links match your filters
        </p>
        <p className="text-xs text-my-secondary mt-1 md:text-sm">
          Try removing some filters to see more results
        </p>
      </div>
      <Button
        variant="outline"
        size="xs"
        className="cursor-pointer md:size-auto md:h-10 md:rounded-2 md:px-3.5 md:text-3.5"
        onClick={onClear}
      >
        Clear filters
      </Button>
    </div>
  );
}
