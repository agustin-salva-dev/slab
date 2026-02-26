"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/Input";
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
  };
}

export function EditLinkModal({ isOpen, onClose, link }: Props) {
  const { mutate } = useSWRConfig();
  const [isEnding, setIsEnding] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditLinkInput>({
    resolver: zodResolver(editLinkSchema),
    defaultValues: {
      id: link.id,
      shortSlug: link.shortSlug,
      originalUrl: link.originalUrl,
      description: link.description ?? "",
    },
  });

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
        return currentLinks.map((l) =>
          l.id === link.id
            ? {
                ...l,
                shortSlug: data.shortSlug,
                originalUrl: data.originalUrl,
                description: data.description ?? null,
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
              <div className="flex flex-col gap-y-1.5">
                <label className="text-sm text-my-secondary">
                  Destination URL
                </label>
                <Input
                  {...register("originalUrl")}
                  placeholder="https://example.com/my-long-url"
                  disabled={isSubmitting || isEnding}
                />
                {errors.originalUrl && (
                  <span className="text-sm text-my-accents-red">
                    {errors.originalUrl.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-y-1.5">
                <label className="text-sm text-my-secondary">
                  Short link name
                </label>
                <div className="flex relative items-center">
                  <span className="absolute left-3 text-sm text-my-secondary">
                    s/
                  </span>
                  <Input
                    {...register("shortSlug")}
                    className="pl-7 pb-0.5"
                    placeholder="my-link"
                    disabled={isSubmitting || isEnding}
                  />
                </div>
                {errors.shortSlug && (
                  <span className="text-sm text-my-accents-red">
                    {errors.shortSlug.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-y-1.5">
                <label className="text-sm text-my-secondary">
                  Description
                  <span className="text-my-tertiary ml-1">(Optional)</span>
                </label>
                <Input
                  {...register("description")}
                  placeholder="What is this link for?"
                  disabled={isSubmitting || isEnding}
                />
                {errors.description && (
                  <span className="text-sm text-my-accents-red">
                    {errors.description.message}
                  </span>
                )}
              </div>
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
