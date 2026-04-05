import { DropdownMenuLabel } from "@/components/ui/DropdownMenu";
import type { LucideIcon } from "lucide-react";

interface SectionLabelProps {
  icon: LucideIcon;
  title: string;
}

export function SectionLabel({ icon: Icon, title }: SectionLabelProps) {
  return (
    <DropdownMenuLabel className="flex items-center gap-1.5 px-2 py-2 text-2.5 font-normal md:gap-2 md:px-3 md:py-3 md:text-xs">
      <span className="text-my-secondary">{title}</span>
      <Icon size={15} className="text-my-secondary" aria-hidden="true" />
    </DropdownMenuLabel>
  );
}
