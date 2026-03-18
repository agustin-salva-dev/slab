"use client";

import { useDeleteLink } from "@/hooks/links/useDeleteLink";
import { ConfirmModal } from "@/components/ui/ConfirmModal";


interface Props {
  isOpen: boolean;
  onClose: () => void;
  link: {
    id: string;
    shortSlug: string;
  };
}

export function DeleteLinkModal({ isOpen, onClose, link }: Props) {
  const { handleDelete, isDeleting } = useDeleteLink();

  const handleConfirm = async () => {
    await handleDelete(link.id, link.shortSlug);
    onClose();
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Delete /${link.shortSlug}`}
      description="Access to the link will be permanently removed. This action cannot be undone."
      confirmText="Delete link"
      onConfirm={handleConfirm}
      isLoading={isDeleting}
      requireInputString={link.shortSlug}
      variant="destructive"
    />
  );
}
