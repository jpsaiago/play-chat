import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.string(),
  username: z.string(),
  token: z.string(),
  displayName: z.string(),
  profilePicture: z.string().nullable(),
});

export type UserResponseSchema = z.infer<typeof userResponseSchema>;

export const signUpInputSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  displayName: z.string(),
  profilePicture: z.instanceof(File).optional(),
});

export type SignUpInputSchema = z.infer<typeof signUpInputSchema>;

export const loginInputSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginInputSchema = z.infer<typeof loginInputSchema>;
