import { DropdownMenuItem } from "@/components/ui/DropdownMenu";
import { Checkbox } from "@/components/ui/Checkbox";
import type { LucideIcon } from "lucide-react";

interface FilterItemProps {
  icon: LucideIcon;
  label: string;
  sectionTitle: string;
  checked: boolean;
  onToggle?: () => void;
}

export function FilterItem({
  icon: Icon,
  label,
  sectionTitle,
  checked,
  onToggle,
}: FilterItemProps) {
  return (
    <DropdownMenuItem
      className="flex items-center gap-2 px-2 py-1.5 md:gap-3 md:px-3 md:py-2"
      onSelect={(e) => e.preventDefault()}
      onClick={onToggle}
    >
      <div
        className="text-white [&>svg]:size-4 md:[&>svg]:size-5"
        aria-hidden="true"
      >
        <Icon />
      </div>
      <span className="text-xs md:text-sm flex-1">{label}</span>
      <Checkbox
        aria-label={`${sectionTitle}: ${label}`}
        checked={checked}
        className="pointer-events-none"
      />
    </DropdownMenuItem>
  );
}
