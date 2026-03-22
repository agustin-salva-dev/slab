"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { BadgePlus, Eraser } from "lucide-react";
import React from "react";
import { useFilterStore } from "@/stores/useFilterStore";
import type { ActiveFilters, FilterValue } from "@/types/filters";
import {
  FILTER_SECTIONS,
  TAGS_SECTION,
  SECTION_LABELS,
  getChipMeta,
} from "../filterConfig";
import { FilterChip } from "../shared/FilterChip";
import { FilterItem } from "../shared/FilterItem";
import { SectionLabel } from "../shared/SectionLabel";

const MODAL_BTN_CLASS =
  "cursor-pointer md:size-auto md:h-10 md:gap-x-1.5 md:rounded-2 md:px-3.5 md:pl-2.5 md:text-3.5 md:[&_svg]:size-4.5";

export function AddFilterModal({ children }: { children: React.ReactNode }) {
  const {
    activeFilters,
    toggleFilter,
    removeFilter,
    clearAllFilters,
    hasActiveFilters,
  } = useFilterStore();

  const hasChips = hasActiveFilters();

  const activeChips = (
    Object.entries(activeFilters) as [keyof ActiveFilters, FilterValue[]][]
  ).flatMap(([section, values]) =>
    values.map((value) => ({ section, value, ...getChipMeta(section, value) })),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={18} className="w-74 md:w-95">
        {/* Active filters chips */}
        {hasChips && (
          <>
            <div
              role="group"
              aria-label="Active filters"
              className="flex flex-wrap items-center gap-1.5 p-2 md:gap-2 md:p-3"
            >
              {activeChips.map(({ section, value, icon: Icon, label }) => (
                <FilterChip
                  key={`${section}-${value}`}
                  icon={<Icon size={12} />}
                  label={`${SECTION_LABELS[section]}: ${label}`}
                  onRemove={() => removeFilter(section, value)}
                />
              ))}
            </div>
            <DropdownMenuSeparator />
          </>
        )}

        {/* Scrollable filter sections */}
        <div
          role="group"
          aria-label="Filter options"
          className="max-h-72 md:max-h-88 overflow-y-auto"
        >
          {FILTER_SECTIONS.map((filterSection, sectionIndex) => (
            <React.Fragment key={filterSection.title}>
              {sectionIndex > 0 && <DropdownMenuSeparator />}
              <SectionLabel
                icon={filterSection.icon}
                title={filterSection.title}
              />
              {filterSection.options.map((option) => {
                const isChecked = (
                  activeFilters[filterSection.section] as FilterValue[]
                )?.includes(option.value);

                return (
                  <FilterItem
                    key={`${filterSection.title}-${option.label}`}
                    icon={option.icon}
                    label={option.label}
                    sectionTitle={filterSection.title}
                    checked={isChecked}
                    onToggle={() =>
                      toggleFilter(filterSection.section, option.value)
                    }
                  />
                );
              })}
            </React.Fragment>
          ))}

          <DropdownMenuSeparator />
          <SectionLabel icon={TAGS_SECTION.icon} title={TAGS_SECTION.title} />
          {TAGS_SECTION.options.map((option) => (
            <FilterItem
              key={`Tags-${option.label}`}
              icon={option.icon}
              label={option.label}
              sectionTitle="Tags"
              checked={false}
            />
          ))}
        </div>

        <DropdownMenuSeparator />

        {/* Footer actions */}
        <div className="flex items-center justify-between gap-2 p-2 md:p-3">
          <Button
            variant="outline"
            size="xs"
            subject="icon-text"
            className={MODAL_BTN_CLASS}
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
