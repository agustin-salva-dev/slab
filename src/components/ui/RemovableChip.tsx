import { X } from "lucide-react";
import React from "react";

interface RemovableChipProps {
  icon?: React.ReactNode;
  label: string;
  onRemove: () => void;
  dynamicColor?: string | null;
}

export function RemovableChip({
  icon,
  label,
  onRemove,
  dynamicColor,
}: RemovableChipProps) {
  return (
    <div
      className={
        dynamicColor
          ? "flex items-center gap-1 px-2 py-1 bg-(--tag-color)/20 rounded-full border border-(--tag-color) text-(--tag-color) text-2.5 md:gap-1.5 md:px-2.5 md:text-xs"
          : "flex items-center gap-1 px-2 py-1 bg-my-background rounded-full border border-my-border-primary text-white text-2.5 md:gap-1.5 md:px-2.5 md:text-xs"
      }
      style={
        dynamicColor
          ? ({ "--tag-color": `var(${dynamicColor})` } as React.CSSProperties)
          : undefined
      }
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{label}</span>
      <button
        type="button"
        aria-label={`Remove ${label}`}
        title={`Remove ${label}`}
        className={
          dynamicColor
            ? "ml-1 cursor-pointer hover:text-white t-color"
            : "ml-1 cursor-pointer text-white hover:text-my-accents-red t-color"
        }
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
