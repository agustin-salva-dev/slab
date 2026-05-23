import { describe, it, expect, beforeEach } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useFilterStore } from "@/stores/useFilterStore";
import type { ActiveFilters } from "@/types/filters";

const INITIAL_FILTERS: ActiveFilters = {
  created: [],
  expires: [],
  tags: [],
};

describe("useFilterStore", () => {
  beforeEach(() => {
    act(() => useFilterStore.setState({ activeFilters: INITIAL_FILTERS, searchQuery: "" }));
  });

  describe("toggleFilter", () => {
    const toggleOnCases = [
      { section: "created" as const, value: "today", label: "created → today" },
      { section: "expires" as const, value: "tomorrow", label: "expires → tomorrow" },
      { section: "tags" as const, value: "tag-id-123", label: "tags → tag-id-123" },
    ];

    it.each(toggleOnCases)(
      "adds filter when toggling ON: $label",
      ({ section, value }) => {
        const { result } = renderHook(() => useFilterStore());
        act(() => result.current.toggleFilter(section, value));
        expect(result.current.activeFilters[section]).toContain(value);
      },
    );

    it("removes filter when toggling OFF an already active filter", () => {
      const { result } = renderHook(() => useFilterStore());
      act(() => result.current.toggleFilter("created", "today"));
      act(() => result.current.toggleFilter("created", "today"));
      expect(result.current.activeFilters.created).not.toContain("today");
    });
  });

  describe("removeFilter", () => {
    it("removes only the specified filter, keeping others", () => {
      const { result } = renderHook(() => useFilterStore());
      act(() => result.current.toggleFilter("created", "today"));
      act(() => result.current.toggleFilter("created", "last7days"));
      act(() => result.current.removeFilter("created", "today"));

      expect(result.current.activeFilters.created).not.toContain("today");
      expect(result.current.activeFilters.created).toContain("last7days");
    });
  });

  describe("clearAllFilters", () => {
    it("resets all filters and search query to initial state", () => {
      const { result } = renderHook(() => useFilterStore());
      act(() => result.current.toggleFilter("created", "today"));
      act(() => result.current.toggleFilter("tags", "some-tag"));
      act(() => result.current.setSearchQuery("test"));
      act(() => result.current.clearAllFilters());

      expect(result.current.activeFilters).toEqual(INITIAL_FILTERS);
      expect(result.current.searchQuery).toBe("");
    });
  });

  describe("hasActiveFilters", () => {
    const activeFilterCases = [
      { section: "created" as const, value: "today", label: "created filter" },
      { section: "expires" as const, value: "tomorrow", label: "expires filter" },
      { section: "tags" as const, value: "tag-1", label: "tag filter" },
    ];

    it("returns false when no filters are active", () => {
      const { result } = renderHook(() => useFilterStore());
      expect(result.current.hasActiveFilters()).toBe(false);
    });

    it.each(activeFilterCases)(
      "returns true after adding a $label",
      ({ section, value }) => {
        const { result } = renderHook(() => useFilterStore());
        act(() => result.current.toggleFilter(section, value));
        expect(result.current.hasActiveFilters()).toBe(true);
      },
    );
  });
});
