"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { deleteLink } from "@/server/actions/links";
import type { getUserLinks } from "@/server/queries/links";

type UserLinks = Awaited<ReturnType<typeof getUserLinks>>;

export function useDeleteLink() {
  const { mutate } = useSWRConfig();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string, shortSlug: string) => {
    if (isDeleting) return;
    setIsDeleting(true);

    const deletePromise = async () => {
      const result = await deleteLink(id);
      if (!result.success) {
        throw new Error(result.error ?? "Failed to delete link");
      }
      return result;
    };

    toast.promise(deletePromise(), {
      loading: `Deleting /${shortSlug}...`,
      success: `/${shortSlug} deleted successfully.`,
      error: (err) => `Could not delete link: ${err.message}`,
    });

    try {
      await mutate<UserLinks>(
        "user-links",
        (currentLinks) => {
          if (!currentLinks) return [];
          return currentLinks.filter((link) => link.id !== id);
        },
        {
          optimisticData: (currentLinks) => {
            if (!currentLinks) return [];
            return currentLinks.filter((link) => link.id !== id);
          },
          rollbackOnError: true,
          revalidate: true,
        },
      );
    } catch (error) {
      console.error(`[DELETE_LINK_ERROR] Critical error deleting /${shortSlug}:`, error);
    } finally {
      setIsDeleting(false);
    }
  };

  return { handleDelete, isDeleting };
}
