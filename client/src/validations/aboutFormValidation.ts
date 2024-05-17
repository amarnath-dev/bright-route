import { z, ZodType } from "zod";
import { AboutSchema } from "../interfaces/validation.interface";

export const MultiFormOne: ZodType<AboutSchema> = z.object({
  first_name: z
    .string()
    .min(3)
    .max(20)
    .refine((value) => value.trim() !== "", {
      message: "Name should not be empty",
    }),
  last_name: z
    .string()
    .min(3)
    .max(20)
    .refine((value) => value.trim() !== "", {
      message: "Name should not be empty",
    }),
  email: z
    .string()
    .email()
    .refine((value) => value.trim() !== "", {
      message: "Email should not be empty",
    }),
  password: z.string().refine((value) => value.trim() !== "", {
    message: "Password should not be empty",
  }),
  job_title: z
    .string()
    .min(3)
    .max(20)
    .refine((value) => value.trim() !== "", {
      message: "Job should not be empty",
    }),
  company: z
    .string()
    .min(3)
    .max(20)
    .refine((value) => value.trim() !== "", {
      message: "Company should not be empty",
    }),
});
