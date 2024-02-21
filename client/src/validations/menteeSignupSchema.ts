import { ZodType, z } from "zod";

interface MenteeSignupShema {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d).{4,10}$/ || /^(?=.*\d).{4,10}(?=.*[A-Za-z])$/;
const onlyString = /^[a-zA-Z]+$/;

export const schema: ZodType<MenteeSignupShema> = z.object({
  first_name: z
    .string()
    .min(3)
    .max(30)
    .refine((value) => onlyString.test(value), {
      message: "Name shoul not contain numbers",
    })
    .refine((value) => value.trim() !== "", {
      message: "First name should not be empty",
    }),
  last_name: z
    .string()
    .min(3)
    .max(30)
    .refine((value) => onlyString.test(value), {
      message: "Name shoul not contain numbers",
    })
    .refine((value) => value.trim() !== "", {
      message: "Last name should not be empty",
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(4)
    .refine((value) => passwordRegex.test(value), {
      message: "Password should contain letters and numbers",
    }),
});
