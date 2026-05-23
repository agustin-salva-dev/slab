import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  matchesCreatedFilters,
  matchesExpiresFilters,
} from "@/utils/filters/dateFilters";

const FIXED_NOW = new Date("2024-06-15T12:00:00Z");

describe("matchesCreatedFilters", () => {
  beforeEach(() => vi.setSystemTime(FIXED_NOW));
  afterEach(() => vi.useRealTimers());

  it("returns true when no filters are active", () => {
    expect(matchesCreatedFilters(new Date(), [])).toBe(true);
  });

  const passingCases = [
    { filter: "today" as const, date: "2024-06-15T08:00:00Z", label: "today's date" },
    { filter: "last7days" as const, date: "2024-06-12T08:00:00Z", label: "3 days ago" },
    { filter: "lastMonth" as const, date: "2024-06-01T08:00:00Z", label: "14 days ago" },
    { filter: "older" as const, date: "2024-01-01T08:00:00Z", label: "5 months ago" },
  ];

  it.each(passingCases)(
    "matches '$filter' filter for a date from $label",
    ({ filter, date }) => {
      expect(matchesCreatedFilters(new Date(date), [filter])).toBe(true);
    },
  );

  const rejectingCases = [
    { filter: "today" as const, date: "2024-06-14T08:00:00Z", label: "yesterday" },
    { filter: "last7days" as const, date: "2024-06-01T08:00:00Z", label: "14 days ago" },
    { filter: "lastMonth" as const, date: "2024-04-01T08:00:00Z", label: "2+ months ago" },
  ];

  it.each(rejectingCases)(
    "rejects '$filter' filter for a date from $label",
    ({ filter, date }) => {
      expect(matchesCreatedFilters(new Date(date), [filter])).toBe(false);
    },
  );

  it("passes if ANY of multiple filters match (OR logic)", () => {
    const yesterday = new Date("2024-06-14T08:00:00Z");
    expect(matchesCreatedFilters(yesterday, ["today", "last7days"])).toBe(true);
  });
});

describe("matchesExpiresFilters", () => {
  beforeEach(() => vi.setSystemTime(FIXED_NOW));
  afterEach(() => vi.useRealTimers());

  it("returns true when no filters are active", () => {
    expect(matchesExpiresFilters(null, [])).toBe(true);
  });

  const noExpirationCases = [
    { expiresAt: null, expected: true, label: "null" },
    { expiresAt: undefined, expected: true, label: "undefined" },
    { expiresAt: "2024-07-01T00:00:00Z", expected: false, label: "a date" },
  ];

  it.each(noExpirationCases)(
    "'no-expiration' returns $expected when expiresAt is $label",
    ({ expiresAt, expected }) => {
      expect(matchesExpiresFilters(expiresAt, ["no-expiration"])).toBe(expected);
    },
  );

  const dateFilterCases = [
    { filter: "today" as const, expiresAt: "2024-06-15T20:00:00Z", expected: true, label: "link expiring today" },
    { filter: "today" as const, expiresAt: "2024-06-16T08:00:00Z", expected: false, label: "link expiring tomorrow" },
    { filter: "tomorrow" as const, expiresAt: "2024-06-16T12:00:00Z", expected: true, label: "link expiring tomorrow" },
    { filter: "next7days" as const, expiresAt: "2024-06-20T12:00:00Z", expected: true, label: "link expiring in 5 days" },
  ];

  it.each(dateFilterCases)(
    "'$filter' returns $expected for $label",
    ({ filter, expiresAt, expected }) => {
      expect(matchesExpiresFilters(expiresAt, [filter])).toBe(expected);
    },
  );
});
