import { z } from "zod";

export const addUserSchema = z.object({
  userId: z.string(),
});
