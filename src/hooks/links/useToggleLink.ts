"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";
import { toast } from "sonner";
import { toggleLinkStatus } from "@/server/actions/links";
import type { getUserLinks } from "@/server/queries/links";

type UserLinks = Awaited<ReturnType<typeof getUserLinks>>;

export function useToggleLink() {
  const { mutate } = useSWRConfig();
  const [isToggling, setIsToggling] = useState(false);

  const toggleLink = async (
    id: string,
    shortSlug: string,
    currentIsActive: boolean,
  ) => {
    if (isToggling) return;
    setIsToggling(true);

    const newStatus = !currentIsActive;

    const togglePromise = async () => {
      const result = await toggleLinkStatus(id, newStatus);
      if (!result.success) {
        throw new Error(result.error ?? "Failed to update status");
      }
      return result;
    };

    toast.promise(togglePromise(), {
      loading: newStatus ? "Enabling link..." : "Disabling link...",
      success: `/${shortSlug} ${newStatus ? "enabled" : "disabled"} successfully.`,
      error: (err) => `Could not update link: ${err.message}`,
    });

    try {
      await mutate<UserLinks>("user-links", undefined, {
        optimisticData: (currentLinks) => {
          if (!currentLinks) return [];
          return currentLinks.map((link) =>
            link.id === id ? { ...link, isActive: newStatus } : link,
          );
        },
        rollbackOnError: true,
        revalidate: true,
      });
    } catch (error) {
      console.error(
        `[TOGGLE_STATUS_ERROR] Critical error toggling /${shortSlug}:`,
        error,
      );
    } finally {
      setIsToggling(false);
    }
  };

  return { toggleLink, isToggling };
}
