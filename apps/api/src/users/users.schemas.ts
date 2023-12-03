import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string(),
});

export type UserResponseSchema = z.infer<typeof userResponseSchema>;

export const signUpInputSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type SignUpInputSchema = z.infer<typeof signUpInputSchema>;

export const loginInputSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginInputSchema = z.infer<typeof loginInputSchema>;
