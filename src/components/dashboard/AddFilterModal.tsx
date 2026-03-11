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

interface FilterOption {
  icon: LucideIcon;
  label: string;
}

interface FilterSection {
  icon: LucideIcon;
  title: string;
  options: FilterOption[];
}

//* -- FILTER DATA --

const FILTER_SECTIONS: FilterSection[] = [
  {
    icon: CalendarClock,
    title: "Expires",
    options: [
      { icon: Sun, label: "Today" },
      { icon: Sunrise, label: "Tomorrow" },
      { icon: CalendarDays, label: "Next 7 days" },
      { icon: Calendar, label: "This month" },
      { icon: Clock, label: "Later" },
      { icon: CalendarOff, label: "No expiration" },
    ],
  },
  {
    icon: Rows3,
    title: "Created",
    options: [
      { icon: Sun, label: "Today" },
      { icon: CalendarDays, label: "Last 7 days" },
      { icon: Calendar, label: "Last month" },
      { icon: Archive, label: "Older" },
    ],
  },
  {
    icon: Tag,
    title: "Tags",
    options: [
      { icon: Tag, label: "Mi tag" },
      { icon: Tag, label: "Secondary tag" },
      { icon: Tag, label: "Third tag" },
      { icon: Tag, label: "My four tag" },
    ],
  },
];

//* -- MAIN COMPONENT --

export function AddFilterModal({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={18} className="w-74 md:w-95">
        {/* Active filters chips */}
        <div
          role="group"
          aria-label="Active filters"
          className="flex flex-wrap items-center gap-1.5 p-2 md:gap-2 md:p-3"
        >
          <FilterChip icon={<Sun size={12} />} label="Today" />
          <FilterChip icon={<Tag size={12} />} label="My tag" />
          <FilterChip icon={<CalendarOff size={12} />} label="No expiration" />
        </div>

        <DropdownMenuSeparator />

        {/* Scrollable filter sections */}
        <div
          role="group"
          aria-label="Filter options"
          className="max-h-72 md:max-h-88 overflow-y-auto"
        >
          {FILTER_SECTIONS.map((section, sectionIndex) => (
            <React.Fragment key={section.title}>
              {sectionIndex > 0 && <DropdownMenuSeparator />}
              <SectionLabel icon={section.icon} title={section.title} />
              {section.options.map((option) => (
                <FilterItem
                  key={`${section.title}-${option.label}`}
                  icon={option.icon}
                  label={option.label}
                  sectionTitle={section.title}
                />
              ))}
            </React.Fragment>
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

// Removable chip displaying an active filter
function FilterChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1 px-2 py-1 rounded-full border border-my-border-primary text-2.5 md:gap-1.5 md:px-2.5 md:text-xs">
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
      <button
        type="button"
        aria-label={`Remove ${label} filter`}
        className="ml-1 cursor-pointer text-white hover:text-my-accents-red"
      >
        <X size={12} />
      </button>
    </div>
  );
}

// Title label for each filter section
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

// Single filter item with checkbox
function FilterItem({
  icon: Icon,
  label,
  sectionTitle,
}: {
  icon: LucideIcon;
  label: string;
  sectionTitle: string;
}) {
  return (
    <DropdownMenuItem
      className="flex items-center gap-2 px-2 py-1.5 md:gap-3 md:px-3 md:py-2"
      onSelect={(e) => e.preventDefault()}
    >
      <div
        className="text-white [&>svg]:size-4 md:[&>svg]:size-5"
        aria-hidden="true"
      >
        <Icon />
      </div>
      <span className="text-xs md:text-sm flex-1">{label}</span>
      <Checkbox aria-label={`${sectionTitle}: ${label}`} />
    </DropdownMenuItem>
  );
}
