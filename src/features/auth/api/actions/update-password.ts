"use server";

import { updatePasswordSchema } from "../../model/auth-schema";
import { createClient } from "@/shared/lib/supabase/server";
import { validationData } from "@/shared";
import { AUTH_ROUTES } from "routes";

export async function updatePassword(formData: FormData, code: string) {
  const supabase = await createClient();
  const userData = Object.fromEntries(formData);

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
    code
  );

  if (exchangeError) {
    console.error(exchangeError);
    return { error: "Не удалось подтвердить сессию. Попробуйте снова." };
  }

  const { password } = validationData(
    updatePasswordSchema,
    userData,
    AUTH_ROUTES.UPDATE_PASSWORD
  );

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: "Произошла ошибка при обновлении пароля." };
  }

  return { success: "Пароль успешно обновлён." };
}
