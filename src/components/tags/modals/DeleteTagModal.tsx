"use client";

import { useDeleteTag } from "@/hooks/tags/useDeleteTag";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tag: {
    id: string;
    name: string;
  };
}

export function DeleteTagModal({ isOpen, onClose, tag }: Props) {
  const { handleDelete, isDeleting } = useDeleteTag();

  const handleConfirm = async () => {
    await handleDelete(tag.id, tag.name);
    onClose();
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Delete ${tag.name}?`}
      description={`Are you sure you want to delete the tag "${tag.name}"? This action cannot be undone.`}
      confirmText="Delete tag"
      onConfirm={handleConfirm}
      isLoading={isDeleting}
      variant="destructive"
    />
  );
}
