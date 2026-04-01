import { X } from "lucide-react";
import React from "react";

interface RemovableChipProps {
  icon?: React.ReactNode;
  label: string;
  onRemove: () => void;
}

export function RemovableChip({ icon, label, onRemove }: RemovableChipProps) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-my-background rounded-full border border-my-border-primary text-2.5 md:gap-1.5 md:px-2.5 md:text-xs">
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{label}</span>
      <button
        type="button"
        aria-label={`Remove ${label}`}
        title={`Remove ${label}`}
        className="ml-1 cursor-pointer text-white hover:text-my-accents-red t-color"
        onClick={(e) => {
          e.preventDefault();
          onRemove();
        }}
      >
        <X size={12} />
      </button>
    </div>
  );
}
