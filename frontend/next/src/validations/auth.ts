import { z } from 'zod';

export const loginSchema = z.object({
    login: z.string().min(1, 'Login is required'),
    password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const emailSchema = z.union([z.literal(''), z.string().email('Invalid email')]);

export const registerSchema = z.object({
    login: z.string().min(1, 'Login is required'),
    password: z.string().min(1, 'Password is required'),
    password2: z.string().min(1, 'Confirm password is required'),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: emailSchema,
});

export type RegisterFormData = z.infer<typeof registerSchema>;
