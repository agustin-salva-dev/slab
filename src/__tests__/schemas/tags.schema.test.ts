import { describe, it, expect } from "vitest";
import { createTagSchema } from "@/server/schemas/tags";

const validCases = [
  { label: "valid name only", input: { name: "frontend" } },
  { label: "name with valid color", input: { name: "urgent", color: "--color-my-accents-red" } },
  { label: "name at max length (15)", input: { name: "a".repeat(15) } },
  { label: "single char name", input: { name: "x" } },
];

const invalidCases = [
  { label: "empty name", input: { name: "" } },
  { label: "name exceeds 15 chars", input: { name: "a".repeat(16) } },
  { label: "color not in TAG_COLORS", input: { name: "tag", color: "invalid-color" } },
];

describe("createTagSchema", () => {
  it.each(validCases)(
    "accepts: $label",
    ({ input }) => {
      expect(createTagSchema.safeParse(input).success).toBe(true);
    },
  );

  it.each(invalidCases)(
    "rejects: $label",
    ({ input }) => {
      expect(createTagSchema.safeParse(input).success).toBe(false);
    },
  );
});
