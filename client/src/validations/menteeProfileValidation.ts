import { z } from "zod";

const noNumbers = (value: string) => !/\d/.test(value);
export const MenteeProfileSchema = z.object({
  first_name: z
    .string()
    .min(3, { message: "Enter atleast 3 characters" })
    .max(15, { message: "Keep it below 15 characters" })
    .refine((value) => value.trim() !== "", {
      message: "First name should not be empty",
    })
    .refine(noNumbers, {
      message: "First name should not contain numbers",
    }),
  last_name: z
    .string()
    .min(2, { message: "Enter atleast 2 characters" })
    .max(15, { message: "Keep it below 15 characters" })
    .refine((value) => value.trim() !== "", {
      message: "Last name should not be empty",
    })
    .refine(noNumbers, {
      message: "Numbers are not allowed",
    }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .refine((value) => value.trim() !== "", {
      message: "Email should not be empty",
    }),
  linkedIn: z
    .string()
    .url({ message: "Invalid LinkedIn URL" })
    .refine((value) => value.trim() !== "", {
      message: "Field should not be empty",
    })
    .refine(noNumbers, {
      message: "Numbers are not allowed",
    }),
  twitter: z
    .string()
    .url({ message: "Invalid Twitter URL" })
    .refine((value) => value.trim() !== "", {
      message: "Field should not be empty",
    })
    // .refine(noNumbers, {
    //   message: "Numbers are not allowed",
    // })
    .optional(),
  job_title: z
    .string()
    .min(3, { message: "Enter atleast 3 characters" })
    .max(25, { message: "Keep it below 25 characters" })
    .refine((value) => value.trim() !== "", {
      message: "Job Title is required",
    })
    .refine(noNumbers, {
      message: "Numbers are not allowed",
    }),
  goal: z
    .string()
    .min(150, { message: "Enter atleast 100 characters" })
    .max(600, { message: "Keep it below 600 characters" })
    .refine((value) => value.trim() !== "", {
      message: "Goal should not be empty",
    }),
});
