"use client";

import { useState } from "react";
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
import { deleteLink } from "@/server/actions/links";
import type { getUserLinks } from "@/server/queries/links";

type UserLinks = Awaited<ReturnType<typeof getUserLinks>>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  linkId: string;
  shortSlug: string;
}

export function DeleteLinkModal({ isOpen, onClose, linkId, shortSlug }: Props) {
  const { mutate } = useSWRConfig();
  const [confirmValue, setConfirmValue] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const isConfirmed = confirmValue === shortSlug;

  const handleClose = () => {
    setConfirmValue("");
    onClose();
  };

  const handleDelete = async () => {
    if (!isConfirmed) return;

    setIsDeleting(true);

    mutate(
      "user-links",
      (currentLinks: UserLinks | undefined) =>
        currentLinks?.filter((link) => link.id !== linkId) ?? [],
      false,
    );

    handleClose();

    const result = await deleteLink(linkId);

    if (result.success) {
      toast.success("Link deleted", {
        description: `/${shortSlug} has been permanently removed.`,
      });
      mutate("user-links");
    } else {
      mutate("user-links");
      toast.error("Could not delete the link", {
        description: result.error ?? "Please try again.",
      });
    }

    setIsDeleting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-4/5 md:w-md p-0 border-none bg-transparent shadow-none max-w-md">
        <Card>
          <CardHeader className="flex items-start gap-1.5">
            <DialogTitle className="text-xl font-power-ultra">
              Delete /{shortSlug}
            </DialogTitle>
            <CardDescription className="text-left text-sm leading-relaxed">
              Access to the link will be permanently removed. This action cannot
              be undone.
            </CardDescription>
          </CardHeader>

          <CardBody className="flex flex-col gap-y-2.5">
            <label htmlFor="confirm-slug" className="text-sm text-my-secondary">
              Type <span className="font-power-ultra">{shortSlug}</span> to
              confirm
            </label>
            <Input
              id="confirm-slug"
              value={confirmValue}
              onChange={(e) => setConfirmValue(e.target.value)}
              placeholder={shortSlug}
              disabled={isDeleting}
              autoComplete="off"
            />
          </CardBody>

          <CardFooter className="flex justify-end gap-x-3">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={handleClose}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive-outline"
              size="sm"
              className="cursor-pointer"
              onClick={handleDelete}
              disabled={!isConfirmed || isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete link"}
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
