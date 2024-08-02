import { z } from "zod";

export const searchSchema = z.object({
  search: z.string().min(1, "Search query is required"),
});

export type SearchFormValues = z.infer<typeof searchSchema>;
