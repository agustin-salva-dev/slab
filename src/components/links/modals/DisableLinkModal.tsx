"use client";

import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { useToggleLink } from "@/hooks/links/useToggleLink";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  link: {
    id: string;
    shortSlug: string;
    isActive: boolean;
  };
}

export function DisableLinkModal({ isOpen, onClose, link }: Props) {
  const { toggleLink, isToggling } = useToggleLink();

  const handleToggle = async () => {
    await toggleLink(link.id, link.shortSlug, link.isActive);
    onClose();
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title={link.isActive ? "Disable link" : "Enable link"}
      description={
        link.isActive
          ? "Are you sure you want to disable this link? It will no longer be accessible until you enable it again."
          : "Are you sure you want to enable this link? It will be accessible again immediately."
      }
      confirmText={link.isActive ? "Disable" : "Enable"}
      onConfirm={handleToggle}
      isLoading={isToggling}
    />
  );
}
