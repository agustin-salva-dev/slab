import { z } from "zod";

export const createTagSchema = z.object({
  name: z.string().min(1, { message: "Tag name cannot be empty." }).max(15, {
    message: "Tag name cannot exceed 15 characters.",
  }),
  color: z.string().optional(),
});

export type CreateTagInput = z.infer<typeof createTagSchema>;

export const tagLinkSchema = z.object({
  linkId: z.string().min(1, { message: "Link ID is required." }),
  tagId: z.string().min(1, { message: "Tag ID is required." }),
});

export type TagLinkInput = z.infer<typeof tagLinkSchema>;
