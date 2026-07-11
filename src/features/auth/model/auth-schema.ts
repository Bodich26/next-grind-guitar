import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({
    error: "Введите корректный адрес электронной почты.",
  }),
  password: z.string().min(8, {
    error: "Пароль должен содержать не менее 8 символов.",
  }),
});

export const registerSchema = z.object({
  email: z.email({
    error: "Введите корректный адрес электронной почты.",
  }),
  name: z.string().min(3, {
    error: "Имя должно содержать не менее 3 символов.",
  }),
  password: z.string().min(8, {
    error: "Пароль должен содержать не менее 8 символов.",
  }),
});

export type loginFormData = z.infer<typeof loginSchema>;
export type registerFormData = z.infer<typeof registerSchema>;
