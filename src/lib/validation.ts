import { z } from "zod";

// Signup Schema Validation
export const signupSchema = z.object({
    name: z
        .string()
        .min(1, "Name is required.")
        .regex(/^[A-Za-z\s]+$/, "Name should only contain letters and spaces"),
    email: z
        .string()
        .trim()
        .min(1, "Email is Required")
        .max(254, "Email cannot exceed 254 characters")
        .email("Invalid email address"),
    password: z
        .string()
        .trim()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password cannot exceed 64 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,64}$/,
            "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character."
        )
});

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "Email is Required")
        .max(254, "Email cannot exceed 254 characters")
        .email("Invalid email address"),
    password: z
        .string()
        .trim()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(64, "Password cannot exceed 64 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]{8,64}$/,
            "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character."
        )
});
