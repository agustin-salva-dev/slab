"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import React, { useState } from "react";
import CreateTagModal from "@/components/tags/modals/CreateTagModal";
import { useFilterStore } from "@/stores/useFilterStore";
import { ActiveFilterChips } from "../ui/ActiveFilterChips";
import { FilterAccordion } from "../layout/FilterAccordion";
import { FilterDropdownFooter } from "../layout/FilterDropdownFooter";

export function AddFilterDropdown({ children }: { children: React.ReactNode }) {
  const { hasActiveFilters } = useFilterStore();
  const [isCreateTagOpen, setIsCreateTagOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={18}
          className="w-74 md:w-95 flex flex-col max-h-[55vh]"
        >
          {hasActiveFilters() && (
            <>
              <ActiveFilterChips />
              <DropdownMenuSeparator />
            </>
          )}

          <FilterAccordion />

          <DropdownMenuSeparator />

          <FilterDropdownFooter
            onOpenCreateTag={() => setIsCreateTagOpen(true)}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateTagModal
        isOpen={isCreateTagOpen}
        onClose={() => setIsCreateTagOpen(false)}
      />
    </>
  );
}
