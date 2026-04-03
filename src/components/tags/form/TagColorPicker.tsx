import { cn } from "@/utils/tailwind";
import { TAG_COLORS } from "@/constants/tags";
import { Check } from "lucide-react";

interface TagColorPickerProps {
  value?: string | null;
  onChange: (color: string | undefined) => void;
  className?: string;
  disabled?: boolean;
}

export function TagColorPicker({
  value,
  onChange,
  className,
  disabled,
}: TagColorPickerProps) {
  return (
    <div
      className={cn("grid grid-cols-4 sm:grid-cols-8 gap-3 mt-1", className)}
      role="radiogroup"
      aria-label="Select tag color"
    >
      {TAG_COLORS.map((color) => {
        const isSelected = value === color;
        return (
          <button
            key={color}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-label={`Color ${color.replace("--color-my-accents-", "")}`}
            onClick={() => {
              if (disabled) return;
              onChange(isSelected ? undefined : color);
            }}
            disabled={disabled}
            className={cn(
              "relative size-8 rounded-full border-2 t-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-my-secondary",
              !disabled && "hover-grow cursor-pointer",
              isSelected
                ? "border-white"
                : "border-transparent text-transparent",
              "flex items-center justify-center transition-colors shadow-sm",
              disabled && "opacity-50 cursor-not-allowed",
            )}
            style={{ backgroundColor: `var(${color})` }}
          >
            {isSelected && (
              <Check size={16} className="text-white drop-shadow-md" />
            )}
          </button>
        );
      })}
    </div>
  );
}
