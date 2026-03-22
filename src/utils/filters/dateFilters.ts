import type { CreatedFilter, ExpiresFilter } from "@/types/filters";

interface DateRange {
  from: Date;
  to: Date;
}

type DateRangeStrategy = () => DateRange;

function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function endOfDay(date: Date): Date {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
}

const createdStrategies: Record<CreatedFilter, DateRangeStrategy> = {
  today: () => ({ from: startOfToday(), to: new Date() }),
  last7days: () => {
    const from = startOfToday();
    from.setDate(from.getDate() - 7);
    return { from, to: new Date() };
  },
  lastMonth: () => {
    const from = startOfToday();
    from.setDate(from.getDate() - 30);
    return { from, to: new Date() };
  },
  older: () => {
    const to = startOfToday();
    to.setDate(to.getDate() - 30);
    return { from: new Date(0), to };
  },
};

const expiresStrategies: Record<
  Exclude<ExpiresFilter, "no-expiration">,
  DateRangeStrategy
> = {
  today: () => {
    const from = startOfToday();
    return { from, to: endOfDay(from) };
  },
  tomorrow: () => {
    const from = startOfToday();
    from.setDate(from.getDate() + 1);
    return { from, to: endOfDay(from) };
  },
  next7days: () => {
    const from = startOfToday();
    const to = new Date(from);
    to.setDate(to.getDate() + 8);
    to.setMilliseconds(-1);
    return { from, to };
  },
  thisMonth: () => {
    const now = new Date();
    const from = new Date(now.getFullYear(), now.getMonth(), 1);
    return {
      from,
      to: endOfDay(new Date(now.getFullYear(), now.getMonth() + 1, 0)),
    };
  },
  later: () => {
    const now = new Date();
    return {
      from: new Date(now.getFullYear(), now.getMonth() + 1, 1),
      to: new Date(9999, 11, 31),
    };
  },
};

function matchesDateRange<T extends string>(
  date: Date,
  activeFilters: T[],
  strategies: Record<T, DateRangeStrategy>,
): boolean {
  if (activeFilters.length === 0) return true;

  return activeFilters.some((filter) => {
    const strategy = strategies[filter];
    if (!strategy) return false;

    const { from, to } = strategy();
    return date >= from && date <= to;
  });
}

export function matchesCreatedFilters(
  createdAt: Date,
  activeFilters: CreatedFilter[],
): boolean {
  return matchesDateRange(createdAt, activeFilters, createdStrategies);
}

export function matchesExpiresFilters(
  expiresAt: Date | string | null | undefined,
  activeFilters: ExpiresFilter[],
): boolean {
  if (activeFilters.length === 0) return true;

  return activeFilters.some((filter) => {
    if (filter === "no-expiration") return !expiresAt;
    if (!expiresAt) return false;

    const date = expiresAt instanceof Date ? expiresAt : new Date(expiresAt);
    const strategy =
      expiresStrategies[filter as Exclude<ExpiresFilter, "no-expiration">];
    if (!strategy) return false;

    const { from, to } = strategy();
    return date >= from && date <= to;
  });
}
