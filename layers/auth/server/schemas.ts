import { z } from "zod";

const UserRole = z.enum(["admin", "user"]);

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Invalid"),
});

export const signupSchema = z
  .object({
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .check((data) => {
    if (data.value.password !== data.value.confirmPassword) {
      data.issues.push({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords do not match",
        input: data.value.confirmPassword,
      });
    }
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
