import { z, ZodType } from "zod";
import { LoginSchema } from "../interfaces/validation.interface";

export const loginSchema: ZodType<LoginSchema> = z.object({
  email: z
    .string()
    .email()
    .refine((value) => value.trim() !== "", {
      message: "Email should not be empty",
    }),
  password: z.string().refine((value) => value.trim() !== "", {
    message: "Password should not be empty",
  }),
});
