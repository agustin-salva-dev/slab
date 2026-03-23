import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { deleteTag } from "@/server/actions/tags";
import { TAGS_CACHE_KEY } from "./keys";
import { useFilterStore } from "@/stores/useFilterStore";
import type { Tag } from "@prisma/client";

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
