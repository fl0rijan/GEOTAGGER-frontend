import {z} from "zod";

const passwordRule = z.string().min(8, "Password must be at least 8 characters");

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export const signupSchema = z.object({
    firstName: z.string().min(2, "Name too short"),
    lastName: z.string().min(2, "Surname too short"),
    email: z.email("Invalid email address"),
    password: passwordRule,
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export const forgotPasswordSchema = z.object({
    email: z.email("Invalid email address").nonempty("Email is required"),
});

export const forgotPasswordUpdateSchema = z.object({
    newPassword: passwordRule,
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export type LoginFields = z.infer<typeof loginSchema>;
export type SignupFields = z.infer<typeof signupSchema>;
export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>;
export type ForgotPasswordUpdateFields = z.infer<typeof forgotPasswordUpdateSchema>;