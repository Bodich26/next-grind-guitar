"use server";

import { forgotPasswordSchema } from "../../model/auth-schema";
import { validationData } from "@/shared";
import { AUTH_META } from "@/../routes";
import { createClient } from "@/shared/lib/server";

export async function forgotPassword(formData: FormData) {
  const supabase = await createClient();
  const userData = Object.fromEntries(formData);

  const { email } = validationData(
    forgotPasswordSchema,
    userData,
    AUTH_META.FORGOT_PASSWORD,
  );

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    if (error.code === "email_address_invalid") {
      return { error: "Некорректный формат email." };
    }

    return { error: "Неверные данные или email не найден." };
  }

  return { success: "Письмо на почту успешно отправлено." };
}
