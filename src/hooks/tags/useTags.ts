import useSWR from "swr";
import { getUserTags } from "@/server/queries/tags";
import { TAGS_CACHE_KEY } from "./keys";

export function useTags() {
  const { data, error, isLoading } = useSWR(
    TAGS_CACHE_KEY,
    async () => {
      const response = await getUserTags();
      if (!response.success) {
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
