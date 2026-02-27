"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { authClient } from "@/lib/auth/client";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function LogoutModal({ isOpen, onClose }: Props) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const toastId = toast.loading("Logging out...");

    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Successfully logged out", {
              id: toastId,
            });
            window.location.href = "/";
          },
          onError: (ctx) => {
            setIsLoggingOut(false);
            const errorMessage = ctx.error.message || "Failed to log out.";
            toast.error("Could not log out", {
              id: toastId,
              description: errorMessage.toLowerCase().includes("session")
                ? "No active session found."
                : errorMessage,
            });
          },
        },
      });
    } catch (error) {
      console.error("[LOGOUT_ERROR]", error);
      setIsLoggingOut(false);
      toast.error("Unexpected error", {
        id: toastId,
        description: "An unexpected error occurred while logging out.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-4/5 md:w-md p-0 border-none bg-transparent shadow-none max-w-md">
        <Card>
          <CardHeader className="flex items-start gap-1.5">
            <DialogTitle className="text-xl font-power-ultra">
              Log out
            </DialogTitle>
            <CardDescription className="text-left text-sm leading-relaxed">
              Are you sure you want to log out? You will need to sign in again
              to access your dashboard.
            </CardDescription>
          </CardHeader>

          <CardFooter className="flex justify-end gap-x-3">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={onClose}
              disabled={isLoggingOut}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="cursor-pointer"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Log out"}
            </Button>
          </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
