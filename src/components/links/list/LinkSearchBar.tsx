"use client";

import { SearchBar } from "@/components/ui/SearchBar";
import { useFilterStore } from "@/stores/useFilterStore";

export function LinkSearchBar() {
  const { searchQuery, setSearchQuery } = useFilterStore();

  return (
    <>
      <SearchBar
        type="text"
        placeholder="Search links"
        inputSize="sm"
        className="hidden md:flex w-xs"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <SearchBar
        type="text"
        placeholder="Search links"
        inputSize="xs"
        className="flex md:hidden w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </>
  );
}
