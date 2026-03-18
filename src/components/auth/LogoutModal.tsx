"use client";

import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/client";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

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
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title="Log out"
      description="Are you sure you want to log out? You will need to sign in again to access your dashboard."
      confirmText="Log out"
      onConfirm={handleLogout}
      isLoading={isLoggingOut}
    />
  );
}
