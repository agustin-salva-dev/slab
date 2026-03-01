"use client";

import { useState } from "react";
import { toast } from "sonner";
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
import { deleteUserAccount } from "@/server/actions/user";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export function DeleteAccountModal({ isOpen, onClose, userEmail }: Props) {
  const [confirmEmail, setConfirmEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const isMatch = confirmEmail === userEmail;

  const handleDelete = async () => {
    if (!isMatch) return;

    setIsDeleting(true);
    const toastId = toast.loading("Deleting your account and data...");

    try {
      const response = await deleteUserAccount();

      if (response.success) {
        toast.success("Account deleted successfully.", { id: toastId });
        window.location.href = "/";
      } else {
        toast.error(response.error || "Could not delete account.", {
          id: toastId,
        });
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("[DELETE_ACCOUNT_ERROR]", error);
      setIsDeleting(false);
      toast.error("An unexpected error occurred while deleting.", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!isDeleting && !open) onClose();
      }}
    >
      <DialogContent className="border-0">
        <Card className=" border border-my-accents-red/30 p-4">
          <CardHeader className="flex items-start gap-1.5">
            <DialogTitle className="text-xl font-power-ultra text-white">
              Delete Account
            </DialogTitle>
            <CardDescription className="text-left text-sm leading-relaxed text-my-secondary">
              This action is{" "}
              <span className="text-my-accents-red font-power-ultra">
                irreversible
              </span>
              . All your links, analytics, and personal data will be permanently
              removed from Slab.
            </CardDescription>
          </CardHeader>

          <CardBody className="py-4 flex flex-col gap-3">
            <label htmlFor="confirm-email" className="text-sm">
              Please type{" "}
              <span className="font-power-ultra text-white tracking-wider">
                {userEmail}
              </span>{" "}
              to confirm.
            </label>
            <Input
              id="confirm-email"
              placeholder={userEmail}
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              disabled={isDeleting}
              className="border-my-accents-red/30 focus-visible:ring-my-accents-red/50"
            />
          </CardBody>

          <CardFooter className="flex justify-end gap-x-3">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={onClose}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="cursor-pointer"
              onClick={handleDelete}
              disabled={isDeleting || !isMatch}
            >
              {isDeleting ? "Deleting..." : "Permanently Delete"}
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
