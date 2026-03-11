import type { CreatedFilter } from "@/types/filters";

interface DateRange {
  from: Date;
  to: Date;
}

function getDateRange(filter: CreatedFilter): DateRange {
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  switch (filter) {
    case "today":
      return { from: startOfToday, to: now };

    case "last7days": {
      const sevenDaysAgo = new Date(startOfToday);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return { from: sevenDaysAgo, to: now };
    }

    case "lastMonth": {
      const thirtyDaysAgo = new Date(startOfToday);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return { from: thirtyDaysAgo, to: now };
    }

    case "older": {
      const thirtyDaysAgo = new Date(startOfToday);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return { from: new Date(0), to: thirtyDaysAgo };
    }
  }
}

export function matchesCreatedFilters(
  createdAt: Date,
  activeFilters: CreatedFilter[],
): boolean {
  if (activeFilters.length === 0) return true;

  return activeFilters.some((filter) => {
    const { from, to } = getDateRange(filter);
    return createdAt >= from && createdAt <= to;
  });
}
