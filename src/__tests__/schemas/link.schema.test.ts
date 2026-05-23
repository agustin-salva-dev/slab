import { describe, it, expect } from "vitest";
import { createLinkSchema, editLinkSchema } from "@/server/schemas/link";

const validBase = { originalUrl: "https://google.com" };

const validCases = [
  { label: "valid https URL", input: validBase },
  { label: "empty slug (auto-generation)", input: { ...validBase, shortSlug: "" } },
  { label: "valid custom slug", input: { ...validBase, shortSlug: "my-link" } },
  { label: "description at 100 chars", input: { ...validBase, description: "a".repeat(100) } },
  { label: "optional tagIds array", input: { ...validBase, tagIds: ["cuid1", "cuid2"] } },
  { label: "nullable expiresAt", input: { ...validBase, expiresAt: null } },
];

const invalidCases = [
  { label: "URL without protocol", input: { originalUrl: "google.com" } },
  { label: "FTP protocol", input: { originalUrl: "ftp://files.com/data" } },
  { label: "slug with spaces", input: { ...validBase, shortSlug: "my slug" } },
  { label: "slug with special chars", input: { ...validBase, shortSlug: "link@!" } },
  { label: "slug too short (2 chars)", input: { ...validBase, shortSlug: "ab" } },
  { label: "slug too long (21 chars)", input: { ...validBase, shortSlug: "a".repeat(21) } },
  { label: "description over 100 chars", input: { ...validBase, description: "a".repeat(101) } },
];

describe("createLinkSchema", () => {
  it.each(validCases)(
    "accepts: $label",
    ({ input }) => {
      expect(createLinkSchema.safeParse(input).success).toBe(true);
    },
  );

  it.each(invalidCases)(
    "rejects: $label",
    ({ input }) => {
      expect(createLinkSchema.safeParse(input).success).toBe(false);
    },
  );
});

describe("editLinkSchema", () => {
  const editBase = { id: "cm1234567890abcdefghij123", ...validBase, shortSlug: "valid-slug" };

  const validEditCases = [
    { label: "valid complete input", input: editBase },
    { label: "with optional empty description", input: { ...editBase, description: "" } },
  ];

  const invalidEditCases = [
    { label: "missing id", input: { ...validBase, shortSlug: "abc" } },
    { label: "invalid CUID format", input: { ...editBase, id: "not-a-cuid" } },
    { label: "slug is required (cannot be empty)", input: { ...editBase, shortSlug: "" } },
  ];

  it.each(validEditCases)(
    "accepts: $label",
    ({ input }) => {
      expect(editLinkSchema.safeParse(input).success).toBe(true);
    },
  );

  it.each(invalidEditCases)(
    "rejects: $label",
    ({ input }) => {
      expect(editLinkSchema.safeParse(input).success).toBe(false);
    },
  );
});
