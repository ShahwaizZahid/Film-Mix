"use client";

import { z } from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters.")
    .max(50, "Username must be at most 50 characters."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[\W_]/, "Password must contain at least one special character."),

  email: z.string().email("Invalid email address."),
});

export type FormValues = z.infer<typeof formSchema>;
