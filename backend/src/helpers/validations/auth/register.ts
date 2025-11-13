import z, { email } from "zod";

export const RegisterSchema = z.object({
    email: z.email("Invalid email address"),
    password: z
        .string("Password is required")
        .min(6, "Password must be at least 6 characters long")
        .max(30, "Password must be at most 30 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    username: z
        .string("Username is required")
        .min(3, "Username must be at least 3 characters long")
        .max(20, "Username must be at most 20 characters long")
        .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
        
});