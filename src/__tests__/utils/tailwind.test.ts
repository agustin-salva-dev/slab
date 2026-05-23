import { describe, it, expect } from "vitest";
import { cn } from "@/utils/tailwind";

const mergeCases = [
  { inputs: ["text-white", "bg-black"], expected: "text-white bg-black", label: "non-conflicting classes" },
  { inputs: ["p-4", "p-2"], expected: "p-2", label: "conflicting padding (last wins)" },
  { inputs: ["text-white", undefined, false, null], expected: "text-white", label: "falsy values ignored" },
  { inputs: ["rounded-lg", "rounded-sm"], expected: "rounded-sm", label: "conflicting border-radius" },
];

describe("cn (tailwind merge)", () => {
  it.each(mergeCases)(
    "correctly resolves $label",
    ({ inputs, expected }) => {
      expect(cn(...inputs)).toBe(expected);
    },
  );

  it("returns an empty string with no arguments", () => {
    expect(cn()).toBe("");
  });
});
