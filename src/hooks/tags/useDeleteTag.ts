import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { deleteTag } from "@/server/actions/tags";
import { TAGS_CACHE_KEY } from "./keys";
import { useFilterStore } from "@/stores/useFilterStore";
import type { Tag } from "@prisma/client";
import type { getUserLinks } from "@/server/queries/links";

type UserLinks = Awaited<ReturnType<typeof getUserLinks>>;

export function useDeleteTag() {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (tagId: string, tagName: string) => {
    setIsDeleting(true);

    mutate(
      TAGS_CACHE_KEY,
      (currentTags: Tag[] | undefined) =>
        (currentTags || []).filter((tag) => tag.id !== tagId),
      false,
    );

    // Optimistic update for links to remove the deleted tag instantly
    mutate(
      "user-links",
      (currentLinks: UserLinks | undefined) => {
        if (!currentLinks) return currentLinks;
        return currentLinks.map((link) => ({
          ...link,
          tags: link.tags.filter((t) => t.tag.id !== tagId),
        }));
      },
      false,
    );

    useFilterStore.getState().removeFilter("tags", tagId);

    try {
      const response = await deleteTag(tagId);

      if (!response.success) {
        mutate(TAGS_CACHE_KEY);
        toast.error(response.error ?? "Failed to delete tag");
        console.error(`[DELETE_TAG_ERROR] Failed to delete tag ${tagId}`);
        return;
      }

      toast.success(`Tag "${tagName}" deleted successfully`);

      mutate(TAGS_CACHE_KEY);
    } catch (error) {
      mutate(TAGS_CACHE_KEY);
      toast.error("An unexpected error occurred");
      console.error("[DELETE_TAG_ERROR] Exception caught:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    handleDelete,
    isDeleting,
  };
}
