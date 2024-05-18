import * as z from "zod";

const JobCategory = z.enum([
  "Software Development",
  "Engineering & Data",
  "UI & UX Design",
  "Business & Management",
  "Product & Marketing",
]);

const noNumbers = (value: string) => !/\d/.test(value);

export const MultiFormTwo = z.object({
  job_category: JobCategory,
  skills: z
    .array(z.string())
    .min(2, { message: "Select at least two skills" })
    .max(4, { message: "Select no more than four skills" }),
  bio: z
    .string({
      invalid_type_error: "Bio should not contain numbers",
      required_error: "Bio is required",
    })
    .min(10, { message: "Bio should be at least 10 characters long" })
    .max(600, { message: "Bio should not exceed 600 characters" })
    .refine(noNumbers, {
      message: "Bio should not contain numbers",
    }),
  linked_in: z
    .string()
    .url({ message: "LinkedIn URL should be a valid URL" })
    .optional(),
  twitter: z
    .string()
    .url({ message: "Twitter URL should be a valid URL" })
    .optional(),
});

export type FormTwo = z.infer<typeof MultiFormTwo>;
