"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/DropdownMenu";
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
  Square,
  CirclePlus,
  XCircle,
  Clock,
  Eraser,
  Rows3,
} from "lucide-react";
import React from "react";

export function AddFilterModal({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[320px] md:w-[350px] p-0 bg-my-background border-border"
      >
        <div className="flex flex-wrap items-center gap-2 p-3 bg-my-background rounded-t-2-5">
          <FilterChip icon={<Sun size={14} />} label="Today" />
          <FilterChip icon={<Tag size={14} />} label="My tag" />
          <FilterChip icon={<CalendarOff size={14} />} label="No expiration" />
        </div>

        <DropdownMenuSeparator className="bg-border mx-0" />

        <div className="max-h-[350px] overflow-y-auto">
          <SectionLabel icon={<CalendarClock size={16} />} title="Expires" />
          <FilterItem icon={<Sun />} label="Today" />
          <FilterItem icon={<Sunrise />} label="Tomorrow" />
          <FilterItem icon={<CalendarDays />} label="Next 7 days" />
          <FilterItem icon={<Calendar />} label="This month" />
          <FilterItem icon={<Clock />} label="Later" />
          <FilterItem icon={<CalendarOff />} label="No expiration" />

          <DropdownMenuSeparator className="bg-border mx-0" />

          <SectionLabel icon={<Rows3 size={16} />} title="Created" />
          <FilterItem icon={<Sun />} label="Today" />
          <FilterItem icon={<CalendarDays />} label="Last 7 days" />
          <FilterItem icon={<Calendar />} label="Last month" />
          <FilterItem icon={<Archive />} label="Older" />

          <DropdownMenuSeparator className="bg-border mx-0" />

          <SectionLabel icon={<Tag size={16} />} title="Tags" />
          <FilterItem icon={<Tag />} label="Mi tag" />
          <FilterItem icon={<Tag />} label="Secondary tag" />
          <FilterItem icon={<Tag />} label="Third tag" />
          <FilterItem icon={<Tag />} label="My four tag" />
        </div>

        <DropdownMenuSeparator className="bg-border mx-0" />

        <div className="flex items-center justify-between p-3 bg-my-background rounded-b-2-5">
          <Button
            variant="outline"
            size="sm"
            subject="icon-text"
            className="w-auto px-3 border-border hover:bg-muted"
          >
            <CirclePlus size={16} />
            Create Tag
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              subject="icon-text"
              className="w-auto px-3 border-border hover:bg-muted"
            >
              <XCircle size={16} />
              Close
            </Button>
            <Button
              variant="outline"
              size="sm"
              subject="icon-text"
              className="w-auto px-3 border-border hover:bg-muted text-foreground"
            >
              <Eraser size={16} />
              Clear
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FilterChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border text-xs text-foreground bg-transparent">
      {icon}
      <span>{label}</span>
      <X
        size={14}
        className="ml-1 cursor-pointer text-muted-foreground hover:text-foreground"
      />
    </div>
  );
}

function SectionLabel({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <DropdownMenuLabel className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground font-normal">
      <span>{title}</span>
      {icon}
    </DropdownMenuLabel>
  );
}

function FilterItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <DropdownMenuItem className="flex items-center gap-3 px-3 py-2 cursor-pointer focus:bg-muted outline-none">
      <div className="text-muted-foreground [&>svg]:size-5">{icon}</div>
      <span className="text-sm flex-1">{label}</span>
      <Square size={16} className="text-muted-foreground ml-auto" />
    </DropdownMenuItem>
  );
}
