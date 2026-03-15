"use client";

import { CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/utils/tailwind";

import { Button } from "@/components/ui/Button";
import { Calendar } from "@/components/ui/Calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";

interface DatePickerProps {
  date: Date | null | undefined;
  onSelect: (date: Date | null | undefined) => void;
  className?: string;
  placeholder?: string;
  id?: string;
}

export function DatePicker({
  date,
  onSelect,
  className,
  placeholder = "Pick a date",
  id,
}: DatePickerProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            subject="icon-text"
            className={cn(
              "justify-start text-left font-normal w-full",
              !date && "text-muted-foreground",
            )}
            type="button"
          >
            <CalendarIcon size={16} />
            {date ? format(date, "dd MMMM yyyy") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date ?? undefined}
            onSelect={onSelect}
            autoFocus
            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </PopoverContent>
      </Popover>

      {date && (
        <Button
          variant="ghost"
          size="sm"
          subject="icon"
          onClick={(e) => {
            e.preventDefault();
            onSelect(null);
          }}
          aria-label="Clear date"
          type="button"
          className="cursor-pointer"
        >
          <X size={16} />
        </Button>
      )}
    </div>
  );
}
