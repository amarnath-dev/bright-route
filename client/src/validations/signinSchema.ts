import { z, ZodType } from "zod";

interface signinSchema {
    email: string,
    password: string,
}

export const signinSchema: ZodType<signinSchema> = z
.object({
    email: z.string().email().refine((value) => value.trim() !== "", {
        message: "Email should not be empty",
    }),
    password: z.string().refine((value) => value.trim() !== "", {
        message: "Password should not be empty",
    }),
});