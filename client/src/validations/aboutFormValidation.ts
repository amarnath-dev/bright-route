import { z, ZodType } from "zod";
import { AboutSchema } from "../interfaces/validation.interface";

const noNumbers = (value: string) => !/\d/.test(value);
export const MultiFormOne: ZodType<AboutSchema> = z.object({
  first_name: z
    .string({
      invalid_type_error: "Name should not contain numbers",
      required_error: "Firstname is required",
    })
    .min(3, { message: "Enter atleast 3 characters" })
    .max(20, { message: "Name should belove 20 characters" })
    .refine((value) => value.trim() !== "", {
      message: "Name should not be empty",
    })
    .refine(noNumbers, {
      message: "Name should not contain numbers",
    }),
  last_name: z
    .string({
      invalid_type_error: "Name should not contain numbers",
      required_error: "Lasttname is required",
    })
    .min(3, { message: "Enter atleast 3 characters" })
    .max(20, { message: "Name should belove 20 characters" })
    .refine((value) => value.trim() !== "", {
      message: "Name should not be empty",
    })
    .refine(noNumbers, {
      message: "Name should not contain numbers",
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
    .string({
      invalid_type_error: "Job Title should not contain numbers",
      required_error: "Job Title is required",
    })
    .min(3, { message: "Enter atleast 3 characters" })
    .max(20, { message: "Keep it belove 20 characters" })
    .refine((value) => value.trim() !== "", {
      message: "Job should not be empty",
    })
    .refine(noNumbers, {
      message: "Name should not contain numbers",
    }),
  company: z
    .string({
      invalid_type_error: "Company should not contain numbers",
      required_error: "Company field is required",
    })
    .min(3, { message: "Enter atleast 3 characters" })
    .max(20, { message: "Keep it belove 20 characters" })
    .refine((value) => value.trim() !== "", {
      message: "Company should not be empty",
    })
    .refine(noNumbers, {
      message: "Name should not contain numbers",
    }),
});
