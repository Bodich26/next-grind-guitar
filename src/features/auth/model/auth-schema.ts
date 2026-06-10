import * as z from "zod";

export const loginSchema = z.object({
  email: z.email({
    message: "Пожалуйста, укажите вашу почту.",
  }),
  password: z
    .string()
    .min(8, {
      message: "Минимум 8 символов.",
    })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "Только латинские буквы и цифры.",
    }),
});

export const registerSchema = z.object({
  email: z.email({
    message: "Пожалуйста, укажите вашу почту.",
  }),
  name: z
    .string()
    .min(3, {
      message: "Минимум 3 символа.",
    })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "Только латинские буквы и цифры.",
    }),
  password: z
    .string()
    .min(8, {
      message: "Минимум 8 символов",
    })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "Только латинские буквы и цифры",
    }),
});

export const forgotPasswordSchema = z.object({
  email: z.email({
    message: "Пожалуйста, укажите вашу почту.",
  }),
});

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: "Минимум 8 символов",
    })
    .regex(/^[A-Za-z0-9]+$/, {
      message: "Только латинские буквы и цифры.",
    }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotFormData = z.infer<typeof forgotPasswordSchema>;
export type UpdateFormData = z.infer<typeof updatePasswordSchema>;
