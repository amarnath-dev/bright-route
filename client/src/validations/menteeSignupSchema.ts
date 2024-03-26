import { ZodType, z } from "zod";

interface MenteeSignupShema {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

// const passwordRegex =
//   /^(?=.*[A-Za-z])(?=.*\d).{4,10}$/ || /^(?=.*\d).{4,10}(?=.*[A-Za-z])$/;

// const passwordRegex =
//   /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$/;

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);
const onlyString = new RegExp(/^[a-zA-Z]+$/);

export const schema: ZodType<MenteeSignupShema> = z.object({
  first_name: z
    .string({
      required_error: "First name is required",
      invalid_type_error: "First name must be a string",
    })
    .max(30, { message: "First name is too long" })
    .min(2, { message: "First Name must be at least 2 characters" })
    .refine((value) => value.trim() !== "", {
      message: "First name should not be empty",
    }),
  last_name: z
    .string({
      required_error: "Last name is required",
      invalid_type_error: "Last name must be a string",
    })
    .max(30)
    .refine((value) => onlyString.test(value), {
      message: "Name should not contain numbers",
    })
    .refine((value) => value.trim() !== "", {
      message: "Last name should not be empty",
    }),
  email: z.string().email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Must have at least 8 character" })
    .max(10, { message: "Password should belove 10 characters" })
    .regex(passwordValidation, {
      message: "Your password is not valid",
    }),
});
