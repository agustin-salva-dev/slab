"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { BadgePlus } from "lucide-react";
import React, { useState } from "react";
import CreateTagModal from "@/components/tags/modals/CreateTagModal";
import { TagListOptions } from "./TagListOptions";
import { cn } from "@/utils/tailwind";

interface TagSelectDropdownProps {
  value: string[];
  onChange: (value: string[]) => void;
  triggerChildren?: React.ReactNode;
  className?: string;
}

export function TagSelectDropdown({
  value = [],
  onChange,
  triggerChildren,
  className,
}: TagSelectDropdownProps) {
  const [isCreateTagOpen, setIsCreateTagOpen] = useState(false);

  const handleToggle = (tagId: string) => {
    if (value.includes(tagId)) {
      onChange(value.filter((id) => id !== tagId));
    } else {
      onChange([...value, tagId]);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {triggerChildren || (
            <Button
              variant="outline"
              size="sm"
              className={cn("w-full justify-between font-normal", className)}
            >
              Select tags...
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-56 md:w-64 flex flex-col max-h-[55vh]"
        >
          <div className="flex-1 overflow-y-auto min-h-0 py-1">
            <TagListOptions
              selectedTagIds={value}
              onToggle={handleToggle}
              showSectionLabel={false}
            />
          </div>
          <DropdownMenuSeparator />
          <div className="p-2 md:p-3">
            <Button
              variant="outline"
              size="xs"
              subject="icon-text"
              className="w-full justify-center cursor-pointer md:size-auto md:h-9 md:gap-x-1.5 md:rounded-2 md:text-3.5 md:[&_svg]:size-4"
              onClick={() => setIsCreateTagOpen(true)}
            >
              <BadgePlus />
              Create Tag
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateTagModal
        isOpen={isCreateTagOpen}
        onClose={() => setIsCreateTagOpen(false)}
      />
    </>
  );
}
