"use client";

import { z } from "zod";

export const formSchema = z.object({
  search: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(50, "Username must be at most 50 characters."),
});

export type FormValues = z.infer<typeof formSchema>;
