"use client";

import useSWR from "swr";
import { LinkCard } from "./LinkCard";
import { getUserLinks } from "@/server/queries/links";
import { LinkCardSkeleton } from "./LinkCardSkeleton";
import { EmptyLinkList } from "./EmptyLinkList";

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-25 gap-y-10">
      {links && links.length > 0 ? (
        links.map((link) =>
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
            />
          ),
        )
      ) : (
        <EmptyLinkList />
      )}
    </div>
  );
}
