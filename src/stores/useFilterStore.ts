import { create } from "zustand";
import type { ActiveFilters, CreatedFilter } from "@/types/filters";

interface FilterStore {
  activeFilters: ActiveFilters;
  toggleFilter: (section: keyof ActiveFilters, value: CreatedFilter) => void;
  removeFilter: (section: keyof ActiveFilters, value: CreatedFilter) => void;
  clearAllFilters: () => void;
  hasActiveFilters: () => boolean;
}

const INITIAL_FILTERS: ActiveFilters = {
  created: [],
};

export const useFilterStore = create<FilterStore>((set, get) => ({
  activeFilters: INITIAL_FILTERS,

  toggleFilter: (section, value) =>
    set((state) => {
      const current = state.activeFilters[section];
      const isActive = current.includes(value);

      return {
        activeFilters: {
          ...state.activeFilters,
          [section]: isActive
            ? current.filter((v) => v !== value)
            : [...current, value],
        },
      };
    }),

  removeFilter: (section, value) =>
    set((state) => ({
      activeFilters: {
        ...state.activeFilters,
        [section]: state.activeFilters[section].filter((v) => v !== value),
      },
    })),

  clearAllFilters: () => set({ activeFilters: INITIAL_FILTERS }),

  hasActiveFilters: () => {
    const { activeFilters } = get();
    return Object.values(activeFilters).some((filters) => filters.length > 0);
  },
}));
