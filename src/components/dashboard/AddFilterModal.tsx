"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/DropdownMenu";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";
import {
  Sun,
  X,
  Tag,
  CalendarOff,
  CalendarClock,
  Sunrise,
  CalendarDays,
  Calendar,
  Archive,
  BadgePlus,
  BadgeX,
  Clock,
  Eraser,
  Rows3,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import React from "react";
import { useFilterStore } from "@/stores/useFilterStore";
import type { ActiveFilters, CreatedFilter } from "@/types/filters";

//* -- TYPES --

interface FilterOption {
  icon: LucideIcon;
  label: string;
  value: CreatedFilter;
}

interface FilterSection {
  icon: LucideIcon;
  title: string;
  section: keyof ActiveFilters;
  options: FilterOption[];
}

//* -- FILTER DATA --

const FILTER_SECTIONS: FilterSection[] = [
  {
    icon: CalendarClock,
    title: "Expires",
    section: "created", // placeholder — will be "expires" when implemented
    options: [
      { icon: Sun, label: "Today", value: "today" },
      { icon: Sunrise, label: "Tomorrow", value: "today" },
      { icon: CalendarDays, label: "Next 7 days", value: "last7days" },
      { icon: Calendar, label: "This month", value: "lastMonth" },
      { icon: Clock, label: "Later", value: "older" },
      { icon: CalendarOff, label: "No expiration", value: "older" },
    ],
  },
  {
    icon: Rows3,
    title: "Created",
    section: "created",
    options: [
      { icon: Sun, label: "Today", value: "today" },
      { icon: CalendarDays, label: "Last 7 days", value: "last7days" },
      { icon: Calendar, label: "Last month", value: "lastMonth" },
      { icon: Archive, label: "Older", value: "older" },
    ],
  },
];

// Maps filter values to their display info for FilterChips
const FILTER_CHIP_META: Record<
  CreatedFilter,
  { icon: LucideIcon; label: string }
> = {
  today: { icon: Sun, label: "Today" },
  last7days: { icon: CalendarDays, label: "Last 7 days" },
  lastMonth: { icon: Calendar, label: "Last month" },
  older: { icon: Archive, label: "Older" },
};

// Tags section (static, not functional yet)
const TAGS_SECTION = {
  icon: Tag,
  title: "Tags",
  options: [
    { icon: Tag, label: "Mi tag" },
    { icon: Tag, label: "Secondary tag" },
    { icon: Tag, label: "Third tag" },
    { icon: Tag, label: "My four tag" },
  ],
};

//* -- MAIN COMPONENT --

export function AddFilterModal({ children }: { children: React.ReactNode }) {
  const {
    activeFilters,
    toggleFilter,
    removeFilter,
    clearAllFilters,
    hasActiveFilters,
  } = useFilterStore();

  const activeChips = activeFilters.created;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={18} className="w-74 md:w-95">
        {/* Active filters chips */}
        {activeChips.length > 0 && (
          <>
            <div
              role="group"
              aria-label="Active filters"
              className="flex flex-wrap items-center gap-1.5 p-2 md:gap-2 md:p-3"
            >
              {activeChips.map((filterValue) => {
                const meta = FILTER_CHIP_META[filterValue];
                const Icon = meta.icon;
                return (
                  <FilterChip
                    key={filterValue}
                    icon={<Icon size={12} />}
                    label={meta.label}
                    onRemove={() => removeFilter("created", filterValue)}
                  />
                );
              })}
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
                // Only "Created" section is functional for now
                const isCreatedSection = filterSection.title === "Created";
                const isChecked = isCreatedSection
                  ? activeFilters.created.includes(option.value)
                  : false;

                return (
                  <FilterItem
                    key={`${filterSection.title}-${option.label}`}
                    icon={option.icon}
                    label={option.label}
                    sectionTitle={filterSection.title}
                    checked={isChecked}
                    onToggle={
                      isCreatedSection
                        ? () => toggleFilter("created", option.value)
                        : undefined
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
            className="cursor-pointer md:size-auto md:h-10 md:gap-x-1.5 md:rounded-2 md:px-3.5 md:pl-2.5 md:text-3.5 md:[&_svg]:size-4.5"
          >
            <BadgePlus />
            Create Tag
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="xs"
              subject="icon-text"
              className="cursor-pointer md:size-auto md:h-10 md:gap-x-1.5 md:rounded-2 md:px-3.5 md:pl-2.5 md:text-3.5 md:[&_svg]:size-4.5"
            >
              <BadgeX />
              Close
            </Button>
            <Button
              variant="primary"
              size="xs"
              subject="icon-text"
              className="cursor-pointer md:size-auto md:h-10 md:gap-x-1.5 md:rounded-2 md:px-3.5 md:pl-2.5 md:text-3.5 md:[&_svg]:size-4.5"
              onClick={hasActiveFilters() ? clearAllFilters : undefined}
              disabled={!hasActiveFilters()}
            >
              <Eraser />
              Clear
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

//* -- INTERNAL SUB-COMPONENTS --

function FilterChip({
  icon,
  label,
  onRemove,
}: {
  icon: React.ReactNode;
  label: string;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full border border-my-border-primary text-2.5 md:gap-1.5 md:px-2.5 md:text-xs">
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
      <button
        type="button"
        aria-label={`Remove ${label} filter`}
        className="ml-1 cursor-pointer text-white hover:text-my-accents-red"
        onClick={onRemove}
      >
        <X size={12} />
      </button>
    </div>
  );
}

function SectionLabel({
  icon: Icon,
  title,
}: {
  icon: LucideIcon;
  title: string;
}) {
  return (
    <DropdownMenuLabel className="flex items-center gap-1.5 px-2 py-2 text-2.5 font-normal md:gap-2 md:px-3 md:py-3 md:text-xs">
      <span className="text-my-secondary">{title}</span>
      <Icon
        size={13}
        className="text-my-secondary md:[&]:size-3.5"
        aria-hidden="true"
      />
    </DropdownMenuLabel>
  );
}

function FilterItem({
  icon: Icon,
  label,
  sectionTitle,
  checked,
  onToggle,
}: {
  icon: LucideIcon;
  label: string;
  sectionTitle: string;
  checked: boolean;
  onToggle?: () => void;
}) {
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
        onCheckedChange={onToggle}
      />
    </DropdownMenuItem>
  );
}
