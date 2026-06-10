"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "./auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "../api/actions";
import { AUTH_META } from "@/../routes";
import { objectFormData, useRedirectTimer } from "@/shared";

export const useLogin = () => {
  const [resError, setResError] = React.useState<string>("");
  const [resSuccess, setResSuccess] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { startRedirect } = useRedirectTimer(
    AUTH_META.AFTER_LOGIN_REDIRECT,
    1000,
  );

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmitForm = handleSubmit(async (data: LoginFormData) => {
    setIsLoading(true);
    const res = await signIn(objectFormData(data));

    if (res.error) {
      setResError(res.error);
      setIsLoading(false);
      return;
    }

    if (res.success) {
      // queryClient.clear();
      setResSuccess(res.success);
      startRedirect();
    }
  });

  return {
    control,
    handleSubmitForm,
    resError,
    resSuccess,
    isLoading,
  };
};
