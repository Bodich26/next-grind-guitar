"use server";

import { createClient } from "@/shared/lib/supabase/server";
import { registerSchema } from "../../model/auth-schema";
import { validationData } from "@/shared";
import { AUTH_ROUTES } from "routes";

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const userData = Object.fromEntries(formData);

  const { email, password, name } = validationData(
    registerSchema,
    userData,
    AUTH_ROUTES.REGISTER
  );

  const { data: existingUser } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", name)
    .limit(1)
    .single();

  if (existingUser) {
    return { error: "Этот псевдоним уже занят. Введите другой." };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    if (error.code === "email_address_invalid") {
      return { error: "Некорректный формат email." };
    }

    return { error: "Произошла ошибка при регистрации." };
  }

  return { success: "Регистрация успешна. Подтвердите почту." };
}
