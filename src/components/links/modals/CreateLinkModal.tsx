"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { getUserLinks } from "@/server/queries/links";
import { LINKS_CACHE_KEY } from "@/hooks/links/keys";

type UserLinks = Awaited<ReturnType<typeof getUserLinks>>;
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
{
  /* import {
        Select,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/Select"; */
}
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLinkSchema, type CreateLinkInput } from "@/server/schemas/link";
import { createLink } from "@/server/actions/links";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { LinkStatus } from "@prisma/client";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { LinkForm } from "../form/LinkForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateLinkModal({ isOpen, onClose }: Props) {
  const { mutate } = useSWRConfig();
  const form = useForm<CreateLinkInput>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      originalUrl: "",
      shortSlug: "",
      description: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: CreateLinkInput) => {
    const isFutureExpiration = values.expiresAt
      ? values.expiresAt > new Date()
      : true;

    const optimisticLink = {
      id: "optimistic-id",
      shortSlug: values.shortSlug || "...",
      originalUrl: values.originalUrl,
      description: values.description || null,
      createdAt: new Date(),
      clickCount: 0,
      status: "PENDING" as LinkStatus,
      expiresAt: values.expiresAt || null,
      isActive: isFutureExpiration,
      tags: [],
    };

    mutate(
      LINKS_CACHE_KEY,
      (currentLinks: UserLinks | undefined) => {
        return currentLinks
          ? [optimisticLink, ...currentLinks]
          : [optimisticLink];
      },
      false,
    );

    onClose();
    reset();

    const result = await createLink(values);

    if (result.success) {
      toast.success("Link created!", {
        description: "Your Slab is live and ready to share.",
      });
      mutate(LINKS_CACHE_KEY);
    } else {
      mutate(LINKS_CACHE_KEY);

      if (result.errorCode === "SLUG_CONFLICT") {
        toast.error("Short link already taken", {
          description: result.error,
        });
      } else {
        toast.error("Could not create the link", {
          description: result.error ?? "Please try again.",
        });
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-4/5 md:w-md p-0 border-none bg-transparent shadow-none max-w-md">
        <Card>
          <CardHeader className="flex items-center gap-2.5">
            <div className="flex items-center gap-2.5">
              <DialogTitle className="text-2xl font-power-ultra">
                Create new link
              </DialogTitle>
              <Image src="/logo.webp" alt="Slab Logo" width={25} height={25} />
            </div>
            <CardDescription className="text-center">
              We will analyze the destination link to verify if it is secure.
            </CardDescription>
          </CardHeader>
          <CardBody className="flex flex-col gap-y-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-y-4">
                <LinkForm form={form} isSubmitting={isSubmitting} />
              </div>
              <CardFooter className="flex justify-end gap-x-4">
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  disabled={isSubmitting}
                  onClick={() => onClose()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </CardFooter>
            </form>
          </CardBody>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
