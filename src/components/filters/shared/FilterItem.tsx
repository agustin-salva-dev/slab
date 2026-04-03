import { DropdownMenuItem } from "@/components/ui/DropdownMenu";
import { Checkbox } from "@/components/ui/Checkbox";
import type { LucideIcon } from "lucide-react";
import { X, Loader2 } from "lucide-react";

interface FilterItemProps {
  icon: LucideIcon;
  label: string;
  sectionTitle: string;
  checked: boolean;
  onToggle?: () => void;
  onDelete?: () => void;
  isDeleting?: boolean;
  dynamicColor?: string | null;
}

export function FilterItem({
  icon: Icon,
  label,
  sectionTitle,
  checked,
  onToggle,
  onDelete,
  isDeleting = false,
  dynamicColor,
}: FilterItemProps) {
  return (
    <DropdownMenuItem
      className="flex items-center gap-2 px-2 py-1.5 md:gap-3 md:px-3 md:py-2 group"
      onSelect={(e) => {
        if (isDeleting) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        onToggle?.();
      }}
    >
      <div
        className={
          dynamicColor
            ? "text-(--tag-color) [&>svg]:size-4 md:[&>svg]:size-5"
            : "text-white [&>svg]:size-4 md:[&>svg]:size-5"
        }
        style={
          dynamicColor
            ? ({ "--tag-color": `var(${dynamicColor})` } as React.CSSProperties)
            : undefined
        }
        aria-hidden="true"
      >
        <Icon />
      </div>
      <span className="text-xs md:text-sm flex-1">{label}</span>

      {onDelete && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
          disabled={isDeleting}
          className="text-my-secondary hover:text-my-accents-red opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity disabled:opacity-100 focus:opacity-100 cursor-pointer"
          aria-label={`Delete tag ${label}`}
        >
          {isDeleting ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <X size={18} />
          )}
        </button>
      )}

      <Checkbox
        aria-label={`${sectionTitle}: ${label}`}
        checked={checked}
        className="pointer-events-none"
      />
    </DropdownMenuItem>
  );
}
