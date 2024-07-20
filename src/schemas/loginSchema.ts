"use client";

import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[\W_]/, "Password must contain at least one special character."),
});

export type FormValues = z.infer<typeof formSchema>;
