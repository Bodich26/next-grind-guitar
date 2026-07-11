"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { PUBLIC_ROUTES } from "@/../routes";
import { loginFormData, loginSchema } from "./auth-schema";
import { authClient } from "@/shared";

export const useLoginForm = () => {
  const [errorForm, setErrorForm] = React.useState<string | undefined>("");
  const [successForm, setSuccessForm] = React.useState<string | undefined>("");
  const [loadingForm, setLoadingForm] = React.useState<boolean>(false);

  const route = useRouter();

  const formLogin = useForm<loginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: loginFormData) => {
    setErrorForm("");
    setSuccessForm("");

    await authClient.signIn.email(
      { email: values.email, password: values.password },
      {
        onRequest: () => setLoadingForm(true),
        onSuccess: () => {
          setLoadingForm(false);
          setSuccessForm("Успешный вход!");
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
    formLogin,
    handleLogin,
    errorForm,
    loadingForm,
    successForm,
    setErrorForm,
  };
};
