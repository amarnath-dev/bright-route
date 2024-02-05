import { z, ZodType } from "zod";

interface aboutYouSchema {
  //   profile_img: File;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  job_title: string;
  company: string;
  state: string;
}

export const MultiFormOne: ZodType<aboutYouSchema> = z.object({
  //   profile_img: z.string(),
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
  state: z
    .string()
    .min(3)
    .max(20)
    .refine((value) => value.trim() !== "", {
      message: "State should not be empty",
    }),
});
