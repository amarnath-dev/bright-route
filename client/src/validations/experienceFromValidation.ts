import * as z from "zod";

export const ExperienceFormSchema = z.object({
  why_mentor: z
    .string()
    .min(10, {
      message: "Need at least 10 characters long",
    })
    .max(600, {
      message: "Should not exceed 600 characters",
    }),
  achievement: z
    .string()
    .min(10, { message: "Should be at least 10 characters long" })
    .max(600, { message: "Should not exceed 600 characters" }),
});

export type FormThree = z.infer<typeof ExperienceFormSchema>;
