import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email("Por favor, insira um email válido"),
    username: z
      .string()
      .min(3, "Seu nome de usuário deve ter pelo menos 3 caracteres")
      .refine((val) => !val.includes(" "), {
        message: "Seu usuário não pode conter espaços",
      }),
    password: z.string().min(6, "Sua senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string(),
  })
  .superRefine(({ password }, ctx) => {
    if (!/\d/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "Sua senha deve conter pelo menos um número",
      });
    }
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
