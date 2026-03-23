"use client";

import { Loader2, Tag } from "lucide-react";
import { FilterItem } from "../shared/FilterItem";
import { SectionLabel } from "../shared/SectionLabel";
import { useTags } from "@/hooks/tags/useTags";
import { useFilterStore } from "@/stores/useFilterStore";
import { DeleteTagModal } from "@/components/tags/DeleteTagModal";
import { useState } from "react";

export function TagFilterSection() {
  const { tags, isLoading, isError } = useTags();
  const { activeFilters, toggleFilter } = useFilterStore();

  const [tagToDelete, setTagToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const onDeleteClick = (tagId: string, tagName: string) => {
    setTagToDelete({ id: tagId, name: tagName });
  };

  return (
    <>
      <SectionLabel icon={Tag} title="Tags" />
      {isLoading ? (
        <div className="flex items-center justify-center py-4 text-my-secondary">
          <Loader2 className="animate-spin size-4" />
          <span className="ml-2 text-sm">Loading tags...</span>
        </div>
      ) : isError ? (
        <div className="px-3 py-4 text-sm text-my-accents-red text-center">
          Error loading tags.
        </div>
      ) : tags.length === 0 ? (
        <div className="px-3 py-4 text-sm text-my-secondary text-center">
          No tags found.
        </div>
      ) : (
        tags.map((tag) => {
          const isChecked = (activeFilters.tags as string[])?.includes(tag.id);

          return (
            <FilterItem
              key={`Tags-${tag.id}`}
              icon={Tag}
              label={tag.name}
              sectionTitle="Tags"
              checked={isChecked}
              onToggle={() => toggleFilter("tags", tag.id)}
              onDelete={() => onDeleteClick(tag.id, tag.name)}
              isDeleting={false}
            />
          );
        })
      )}

      {tagToDelete && (
        <DeleteTagModal
          isOpen={!!tagToDelete}
          onClose={() => setTagToDelete(null)}
          tag={tagToDelete}
        />
      )}
    </>
  );
}
