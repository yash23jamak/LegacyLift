import { z } from "zod";

// Signup Schema Validation
export const signupSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required.")
        .regex(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces"),
    email: z.string().min(1, "Email is Required").email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is Required.")
        .min(6, "Password must be at least 6 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character."
        ),
});

export const loginSchema = z.object({
    email: z.string().min(1, "Email is Required").email("Invalid email address"),
    password: z
        .string()
        .min(1, "Password is Required.")
        .min(6, "Password must be at least 6 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character."
        ),
});
