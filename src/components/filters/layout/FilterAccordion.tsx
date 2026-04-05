"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Tag } from "lucide-react";
import { useFilterStore } from "@/stores/useFilterStore";
import type { FilterValue } from "@/types/filters";
import { FILTER_SECTIONS } from "../filterConfig";
import { FilterItem } from "../ui/FilterItem";
import { TagFilterSection } from "../sections/TagFilterSection";

export function FilterAccordion() {
  const { activeFilters, toggleFilter } = useFilterStore();

  return (
    <Accordion
      type="multiple"
      className="flex-1 overflow-y-auto min-h-0 w-full"
    >
      {FILTER_SECTIONS.map((filterSection) => (
        <AccordionItem key={filterSection.title} value={filterSection.title}>
          <AccordionTrigger className="hover:no-underline hover:bg-my-secondary/10 px-3 py-2 rounded-2 group">
            <div className="flex items-center gap-2 text-my-secondary group-hover:text-white transition-colors duration-200">
              <filterSection.icon className="size-4" />
              <span className="text-3.5 font-medium">
                {filterSection.title}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2">
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
          </AccordionContent>
        </AccordionItem>
      ))}

      <AccordionItem value="Tags" className="border-none">
        <AccordionTrigger className="hover:no-underline hover:bg-my-secondary/10 px-3 py-2 rounded-2 group">
          <div className="flex items-center gap-2 text-my-secondary group-hover:text-white transition-colors duration-200">
            <Tag className="size-4" />
            <span className="text-3.5 font-medium">Tags</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-2">
          <TagFilterSection />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
