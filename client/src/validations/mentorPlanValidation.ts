import { z } from "zod";

const noNumbers = (value: string) => !/\d/.test(value);

export const PlanSchema = z.object({
  planAmount: z
    .string()
    .refine((val) => parseInt(val, 10) >= 500, {
      message: "Plan amount must be at least 500",
    })
    .refine((val) => parseInt(val, 10) <= 10000, {
      message: "Plan amount must be at most 10000",
    })
    .refine((value) => value.trim() !== "", {
      message: "Plan amount should not be empty",
    }),
  planType: z.string().min(1, "Plan type is required"),
  planDescription: z
    .string({
      invalid_type_error: "Description should not contain numbers",
      required_error: "Field is required",
    })
    .min(50, { message: "Enter at least 50 characters" })
    .max(150, { message: "Keep it less than 150 characters" })
    .refine(noNumbers, {
      message: "Description should not contain numbers",
    })
    .refine((value) => value.trim() !== "", {
      message: "Description should not be empty",
    }),
  videoCallSession: z
    .string({ invalid_type_error: "This fields is required" })
    .refine((value) => value.trim() !== "", {
      message: "This field is required should not be empty",
    }),
  videoCallCount: z
    .string({ invalid_type_error: "Video call Count is required" })
    .refine((value) => value.trim() !== "", {
      message: "Video call count should not be empty",
    })
    .refine((value) => parseInt(value, 10) > 0, {
      message: "Video call count must be greater than zero",
    }),
  chatSessions: z
    .string({ invalid_type_error: "This fields is required" })
    .min(1, { message: "Chat sessions is required" }),
  handsOnSupport: z
    .string({ invalid_type_error: "This fields is required" })
    .min(1, { message: "Hands-on support is required" }),
});
