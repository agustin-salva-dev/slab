"use client";

import { useState } from "react";
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
import { cn } from "@/utils/tailwind";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void | Promise<void>;
  isLoading?: boolean;
  requireInputString?: string;
  variant?:
    | "primary"
    | "secondary"
    | "destructive"
    | "destructive-outline"
    | "warning"
    | "success";
}

export function ConfirmModal({
  isOpen,
  onClose,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  isLoading = false,
  requireInputString,
  variant = "primary",
}: ConfirmModalProps) {
  const [inputValue, setInputValue] = useState("");

  const needsConfirmation = Boolean(requireInputString);
  const isConfirmed = requireInputString
    ? inputValue === requireInputString
    : true;

  const handleClose = () => {
    if (isLoading) return;
    setInputValue("");
    onClose();
  };

  const handleConfirm = async () => {
    if (!isConfirmed || isLoading) return;
    await onConfirm();
  };

  const getConfirmStyles = () => {
    switch (variant) {
      case "destructive":
        return {
          variant: "destructive" as const,
          className: "bg-my-accents-red hover:bg-my-accents-red/80 text-white",
        };
      case "warning":
        return {
          variant: "warning" as const,
          className:
            "bg-my-accents-yellow text-black hover:bg-my-accents-yellow/80",
        };
      case "success":
        return {
          variant: "success" as const,
          className:
            "bg-my-accents-green hover:bg-my-accents-green/80 text-white",
        };
      default:
        return {
          variant: variant as
            | "primary"
            | "secondary"
            | "destructive"
            | "destructive-outline"
            | "warning"
            | "success"
            | "outline"
            | "ghost"
            | "link"
            | undefined,
          className: "",
        };
    }
  };

  const confirmStyles = getConfirmStyles();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-4/5 md:w-md p-0 border-none bg-transparent shadow-none max-w-md">
        <Card>
          <CardHeader className="flex items-start gap-1.5">
            <DialogTitle className="text-xl font-power-ultra">
              {title}
            </DialogTitle>
            <CardDescription className="text-left text-sm leading-relaxed">
              {description}
            </CardDescription>
          </CardHeader>

          {needsConfirmation && (
            <CardBody className="flex flex-col gap-y-2.5">
              <label
                htmlFor="confirm-input"
                className="text-sm text-my-secondary"
              >
                Type{" "}
                <span className="font-power-ultra">{requireInputString}</span>{" "}
                to confirm
              </label>
              <Input
                id="confirm-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={requireInputString}
                disabled={isLoading}
                autoComplete="off"
                className="focus-visible:ring-my-primary"
              />
            </CardBody>
          )}

          <CardFooter
            className={`${needsConfirmation ? "" : "pt-6"} flex justify-end gap-x-3`}
          >
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer hover:bg-my-secondary/10"
              onClick={handleClose}
              disabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button
              size="sm"
              variant={confirmStyles.variant}
              className={cn("cursor-pointer", confirmStyles.className)}
              onClick={handleConfirm}
              disabled={!isConfirmed || isLoading}
            >
              {isLoading ? "Processing..." : confirmText}
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
