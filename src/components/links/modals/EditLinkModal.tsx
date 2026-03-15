"use client";

import { useState, useMemo } from "react";
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

type UserLinks = Awaited<ReturnType<typeof getUserLinks>>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  link: {
    id: string;
    shortSlug: string;
    originalUrl: string;
    description: string | null;
    expiresAt: Date | null;
    isActive: boolean;
  };
}

import { LinkForm } from "../form/LinkForm";

export function EditLinkModal({ isOpen, onClose, link }: Props) {
  const { mutate } = useSWRConfig();
  const [isEnding, setIsEnding] = useState(false);

  const { id, shortSlug, originalUrl, description, expiresAt } = link;

  const formValues = useMemo(
    () => ({
      id,
      shortSlug,
      originalUrl,
      description: description ?? "",
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    }),
    [id, shortSlug, originalUrl, description, expiresAt],
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

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = async (data: EditLinkInput) => {
    setIsEnding(true);

    mutate(
      "user-links",
      (currentLinks: UserLinks | undefined) => {
        if (!currentLinks) return [];

        const isFutureExpiration =
          data.expiresAt && data.expiresAt > new Date();

        return currentLinks.map((l) =>
          l.id === link.id
            ? {
                ...l,
                shortSlug: data.shortSlug,
                originalUrl: data.originalUrl,
                description: data.description ?? null,
                expiresAt: data.expiresAt ?? null,
                isActive: isFutureExpiration ? true : l.isActive,
              }
            : l,
        );
      },
      false,
    );

    const result = await editLink(data);

    if (result.success) {
      toast.success("Link updated!", {
        description: `/${data.shortSlug} has been updated successfully.`,
      });
      mutate("user-links");
      handleClose();
    } else {
      mutate("user-links");

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader className="flex items-start gap-1.5">
              <DialogTitle className="text-xl font-power-ultra">
                Edit my slab
              </DialogTitle>
              <CardDescription className="text-left text-sm leading-relaxed">
                /{link.shortSlug}
              </CardDescription>
            </CardHeader>

            <CardBody className="flex flex-col gap-y-4">
              <LinkForm form={form} isSubmitting={isSubmitting || isEnding} />
            </CardBody>

            <CardFooter className="flex justify-end gap-x-3">
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
          </Card>
        </form>
      </DialogContent>
    </Dialog>
  );
}
