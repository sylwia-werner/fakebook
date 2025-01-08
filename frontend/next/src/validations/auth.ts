import { z } from "zod";

export const loginSchema = z.object({
	email: z.string().email("Invalid email").min(1, "Email is required"),
	password: z.string().min(1, "Password is required"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
