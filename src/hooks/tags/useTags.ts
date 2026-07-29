import useSWR from "swr";
import { getUserTags } from "@/server/queries/tags";
import { TAGS_CACHE_KEY } from "./keys";

interface TagItem {
  id: string;
  name: string;
  color: string | null;
  createdAt: Date;
}

export function useTags() {
  const { data, error, isLoading } = useSWR<TagItem[]>(
    TAGS_CACHE_KEY,
    async () => {
      const response = await getUserTags();
      if (!response.success || !response.data) {
        throw new Error(response.error ?? "Failed to load tags");
      }
      return response.data;
    },
    {
      revalidateOnFocus: true,
    },
  );

  return {
    tags: data || [],
    isLoading,
    isError: error,
  };
}
