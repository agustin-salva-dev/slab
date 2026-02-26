import { z } from "zod";

export const createLinkSchema = z.object({
  originalUrl: z
    .url("Please enter a valid URL")
    .startsWith("http", "URL must start with http:// or https://"),

  shortSlug: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 20 characters")
    .regex(/^[a-zA-Z0-9-]+$/, "Only letters, numbers and hyphens allowed")
    .optional()
    .or(z.literal("")),

  description: z
    .string()
    .max(100, "Description must be under 100 characters")
    .optional(),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;

export const editLinkSchema = z.object({
  id: z.string().cuid("Invalid link ID"),
  originalUrl: z
    .url("Please enter a valid URL")
    .startsWith("http", "URL must start with http:// or https://"),

  shortSlug: z
    .string()
    .min(3, "Minimum 3 characters")
    .max(20, "Maximum 20 characters")
    .regex(/^[a-zA-Z0-9-]+$/, "Only letters, numbers and hyphens allowed"),

  description: z
    .string()
    .max(100, "Description must be under 100 characters")
    .optional()
    .or(z.literal("")),
});

export type EditLinkInput = z.infer<typeof editLinkSchema>;
