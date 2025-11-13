import z, { email } from "zod";

export const RegisterSchema = z.object({
    email: z.email("Invalid email address"),
    Password: z
        .string("Password is required")
        .min(6, "Password must be at least 6 characters long")
        .max(30, "Password must be at most 30 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    firstName: z
        .string("First name is required")
        .min(2, "First name must be at least 2 characters long")
        .max(30, "First name must be at most 30 characters long"),
    lastName: z
        .string("Last name is required")
        .min(2, "Last name must be at least 2 characters long")
        .max(30, "Last name must be at most 30 characters long")
        .optional(),
});