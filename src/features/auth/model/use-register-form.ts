"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PUBLIC_ROUTES } from "@/../routes";
import { registerFormData, registerSchema } from "./auth-schema";
import { authClient } from "@/shared";

export const useRegisterForm = () => {
  const [errorForm, setErrorForm] = React.useState<string | undefined>("");
  const [successForm, setSuccessForm] = React.useState<string | undefined>("");
  const [loadingForm, setLoadingForm] = React.useState<boolean>(false);

  const route = useRouter();

  const formRegister = useForm<registerFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const handleRegister = async (values: registerFormData) => {
    setErrorForm("");
    setSuccessForm("");

    await authClient.signUp.email(
      { email: values.email, password: values.password, name: values.name },
      {
        onRequest: () => setLoadingForm(true),
        onSuccess: () => {
          setLoadingForm(false);
          setSuccessForm("Успешная регистрация!");
          route.push(PUBLIC_ROUTES.HOME);
        },
        onError: (ctx) => {
          setLoadingForm(false);
          setErrorForm(ctx.error.message || "Произошла ошибка при регистрации");
        },
      },
    );
  };

  return {
    formRegister,
    errorForm,
    successForm,
    loadingForm,
    handleRegister,
    setErrorForm,
  };
};
