"use client";

import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { editLink } from "@/server/actions/links";
import { editLinkSchema, type EditLinkInput } from "@/server/schemas/link";
import type { getUserLinks } from "@/server/queries/links";
import { LINKS_CACHE_KEY } from "@/hooks/links/keys";

import { useTags } from "@/hooks/tags/useTags";

type UserLinks = Awaited<ReturnType<typeof getUserLinks>>;
type UserLink = UserLinks[number];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  link: UserLink;
}

import { LinkForm } from "../form/LinkForm";

export function EditLinkModal({ isOpen, onClose, link }: Props) {
  const { mutate } = useSWRConfig();
  const { tags: availableTags } = useTags();
  const [isEnding, setIsEnding] = useState(false);

  const { id, shortSlug, originalUrl, description, expiresAt, tags } = link;

  const formValues = useMemo(
    () => ({
      id,
      shortSlug,
      originalUrl,
      description: description ?? "",
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      tagIds: tags?.map((t) => t.tag.id) || [],
    }),
    [id, shortSlug, originalUrl, description, expiresAt, tags],
  );

  const form = useForm<EditLinkInput>({
    resolver: zodResolver(editLinkSchema),
    values: formValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (isOpen) {
      reset(formValues);
    }
  }, [isOpen, formValues, reset]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: EditLinkInput) => {
    setIsEnding(true);

    mutate(
      LINKS_CACHE_KEY,
      (currentLinks: UserLinks | undefined) => {
        if (!currentLinks) return [];

        const isFutureExpiration =
          data.expiresAt && data.expiresAt > new Date();

        return currentLinks.map((l) => {
          if (l.id === link.id) {
            const optimisticTags =
              data.tagIds && availableTags
                ? data.tagIds
                    .map((tagId) => {
                      const t = availableTags.find((tag) => tag.id === tagId);
                      return t
                        ? { tag: { id: t.id, name: t.name, color: t.color } }
                        : null;
                    })
                    .filter((t) => t !== null)
                : [];

            return {
              ...l,
              shortSlug: data.shortSlug,
              originalUrl: data.originalUrl,
              description: data.description ?? null,
              expiresAt: data.expiresAt ?? null,
              isActive: isFutureExpiration ? true : l.isActive,
              tags: optimisticTags as typeof l.tags,
            };
          }
          return l;
        });
      },
      false,
    );

    const result = await editLink(data);

    if (result.success) {
      toast.success("Link updated!", {
        description: `/${data.shortSlug} has been updated successfully.`,
      });
      mutate(LINKS_CACHE_KEY);
      handleClose();
    } else {
      mutate(LINKS_CACHE_KEY);

      if (result.errorCode === "SLUG_CONFLICT") {
        toast.error("Short link already taken", {
          description: result.error,
        });
      } else {
        toast.error("Could not update the link", {
          description: result.error ?? "Please try again.",
        });
      }
    }
    setIsEnding(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-4/5 md:w-md p-0 border-none bg-transparent shadow-none max-w-md">
        <Card className="flex flex-col max-h-[90dvh] overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col overflow-hidden h-full"
          >
            <CardHeader className="flex flex-col items-start gap-1.5 shrink-0">
              <DialogTitle className="text-xl font-power-ultra">
                Edit my slab
              </DialogTitle>
              <CardDescription className="text-left text-sm leading-relaxed">
                /{link.shortSlug}
              </CardDescription>
            </CardHeader>

            <CardBody className="overflow-y-auto flex flex-col gap-y-4 py-2 px-6">
              <LinkForm form={form} isSubmitting={isSubmitting || isEnding} />
            </CardBody>

            <CardFooter className="flex justify-end gap-x-3 shrink-0 pt-4 pb-6 px-6">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClose}
                disabled={isSubmitting || isEnding}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting || isEnding}
                className="cursor-pointer"
              >
                {isSubmitting || isEnding ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
