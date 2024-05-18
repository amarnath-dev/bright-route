import * as z from "zod";

const noNumbers = (value: string) => !/\d/.test(value);
export const ExperienceFormSchema = z.object({
  why_mentor: z
    .string({
      invalid_type_error: "Should not contain numbers",
      required_error: "Field is required",
    })
    .min(10, {
      message: "Should be at least 10 characters long",
    })
    .max(600, {
      message: "Should not exceed 600 characters",
    })
    .refine(noNumbers, {
      message: "Field should not contain numbers",
    })
    .refine((value) => value.trim() !== "", {
      message: "Field should not be empty",
    }),
  achievement: z
    .string({
      invalid_type_error: "Should not contain numbers",
      required_error: "Field is required",
    })
    .min(10, { message: "Should be at least 10 characters long" })
    .max(600, { message: "Should not exceed 600 characters" })
    .refine(noNumbers, {
      message: "Field should not contain numbers",
    })
    .refine((value) => value.trim() !== "", {
      message: "Filed should not be empty",
    }),
});

export type FormThree = z.infer<typeof ExperienceFormSchema>;
