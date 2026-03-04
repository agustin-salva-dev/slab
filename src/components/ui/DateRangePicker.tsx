"use client";

import { format, endOfDay } from "date-fns";
import type { DateRange } from "react-day-picker";
import { CalendarIcon, X } from "lucide-react";

import { cn } from "@/utils/tailwind";
import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

interface DateRangePickerProps {
  dateRange: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
  onClear: () => void;
  className?: string;
}

export function DateRangePicker({
  dateRange,
  onSelect,
  onClear,
  className,
}: DateRangePickerProps) {
  const label = dateRange?.from
    ? dateRange.to
      ? `${format(dateRange.from, "LLL dd, y")} – ${format(dateRange.to, "LLL dd, y")}`
      : `From ${format(dateRange.from, "LLL dd, y")} — pick end date`
    : "Pick a date range";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            subject="icon-text"
            className={cn(!dateRange && "text-muted-foreground")}
          >
            <CalendarIcon />
            {label}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            autoFocus
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={onSelect}
            numberOfMonths={2}
            disabled={{ after: endOfDay(new Date()) }}
          />
        </PopoverContent>
      </Popover>

      {dateRange && (
        <Button
          variant="ghost"
          size="sm"
          subject="icon"
          onClick={onClear}
          aria-label="Clear date range"
        >
          <X />
        </Button>
      )}
    </div>
  );
}
