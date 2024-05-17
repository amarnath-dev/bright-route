import * as z from "zod";

const JobCategory = z.enum([
  "Software Development",
  "Engineering & Data",
  "UI & UX Design",
  "Business & Management",
  "Product & Marketing",
]);

export const MultiFormTwo = z.object({
  job_category: JobCategory,
  skills: z.array(z.string()).refine((skills) => skills.length > 1, {
    message: "Select at least Two skill",
  }),
  bio: z
    .string()
    .min(10, { message: "Bio should be at least 10 characters long" })
    .max(1000, { message: "Bio should not exceed 1000 characters" }),
  linked_in: z
    .string()
    .url({ message: "LinkedIn URL should be a valid URL" })
    .optional(),
  twitter: z.string().optional(),
});

export type FormTwo = z.infer<typeof MultiFormTwo>;
