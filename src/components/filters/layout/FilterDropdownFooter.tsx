"use client";

import { Button } from "@/components/ui/Button";
import { BadgePlus, Eraser } from "lucide-react";
import { useFilterStore } from "@/stores/useFilterStore";

const MODAL_BTN_CLASS =
  "cursor-pointer md:size-auto md:h-10 md:gap-x-1.5 md:rounded-2 md:px-3.5 md:pl-2.5 md:text-3.5 md:[&_svg]:size-4.5";

interface FilterDropdownFooterProps {
  onOpenCreateTag: () => void;
}

export function FilterDropdownFooter({
  onOpenCreateTag,
}: FilterDropdownFooterProps) {
  const { clearAllFilters, hasActiveFilters } = useFilterStore();

  return (
    <div className="flex items-center justify-between gap-2 p-2 md:p-3">
      <Button
        variant="outline"
        size="xs"
        subject="icon-text"
        className={MODAL_BTN_CLASS}
        onClick={onOpenCreateTag}
      >
        <BadgePlus />
        Create Tag
      </Button>

      <Button
        variant="primary"
        size="xs"
        subject="icon-text"
        className={MODAL_BTN_CLASS}
        onClick={hasActiveFilters() ? clearAllFilters : undefined}
        disabled={!hasActiveFilters()}
      >
        <Eraser />
        Clear
      </Button>
    </div>
  );
}
