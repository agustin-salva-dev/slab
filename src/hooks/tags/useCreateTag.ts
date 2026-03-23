import { useState } from "react";
import { toast } from "sonner";
import { mutate } from "swr";
import { createTag } from "@/server/actions/tags";
import type { CreateTagInput } from "@/server/schemas/tags";
import { TAGS_CACHE_KEY } from "./keys";
import type { Tag } from "@prisma/client";

export function useCreateTag() {
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async (
    values: CreateTagInput,
    onSuccess: () => void,
  ) => {
    setIsCreating(true);

    const tempId = `temp-${Date.now()}`;
    const newTag: Tag = {
      id: tempId,
      name: values.name,
      color: values.color || null,
      userId: "",
      createdAt: new Date(),
    };

    mutate(
      TAGS_CACHE_KEY,
      (currentTags: Tag[] | undefined) =>
        [...(currentTags || []), newTag].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
      false,
    );

    try {
      const result = await createTag(values);

      if (result.success) {
        toast.success("Tag created!", {
          description: `"${values.name}" tag has been created.`,
        });
        onSuccess();

        mutate(TAGS_CACHE_KEY);
      } else {
        mutate(TAGS_CACHE_KEY);

        if (result.errorCode === "TAG_CONFLICT") {
          toast.error("Tag already exists", {
            description: result.error,
          });
        } else {
          toast.error("Could not create the tag", {
            description: result.error ?? "Please try again.",
          });
        }
      }
    } catch (error) {
      mutate(TAGS_CACHE_KEY);
      toast.error("An unexpected error occurred", {
        description: "Please try again.",
      });
      console.error("[USE_CREATE_TAG_ERROR] ", error);
    } finally {
      setIsCreating(false);
    }
  };

  return {
    handleCreate,
    isCreating,
  };
}
