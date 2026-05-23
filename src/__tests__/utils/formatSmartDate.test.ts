import { describe, it, expect } from "vitest";
import { formatSmartDate } from "@/utils/formatSmartDate";

const currentYear = new Date().getFullYear();

const sameYearCases = [
  { label: "January 15", date: new Date(currentYear, 0, 15), expected: /15 January/ },
  { label: "June 1", date: new Date(currentYear, 5, 1), expected: /1 June/ },
  { label: "December 31", date: new Date(currentYear, 11, 31), expected: /31 December/ },
];

const differentYearCases = [
  { label: "June 10, 2021", date: new Date(2021, 5, 10), expected: "2021" },
  { label: "January 1, 2019", date: new Date(2019, 0, 1), expected: "2019" },
];

describe("formatSmartDate", () => {
  it.each(sameYearCases)(
    "omits the year for a current-year date: $label",
    ({ date, expected }) => {
      const result = formatSmartDate(date);
      expect(result).toMatch(expected);
      expect(result).not.toContain(String(currentYear));
    },
  );

  it.each(differentYearCases)(
    "includes the year for a past-year date: $label",
    ({ date, expected }) => {
      expect(formatSmartDate(date)).toContain(expected);
    },
  );
});
