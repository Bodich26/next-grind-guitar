"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { UpdateFormData, updatePasswordSchema } from "./auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePassword } from "../api/actions";
import { objectFormData, useRedirectTimer } from "@/shared";
import { useSearchParams } from "next/navigation";
import { AUTH_META } from "@/../routes";

export const useUpdatePassword = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [resError, setResError] = React.useState<string>("");
  const [resSuccess, setResSuccess] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { startRedirect } = useRedirectTimer(
    AUTH_META.AFTER_LOGIN_REDIRECT,
    1000,
  );

  const { control, handleSubmit } = useForm<UpdateFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const handleSubmitForm = handleSubmit(async (data: UpdateFormData) => {
    setIsLoading(true);
    if (!code) {
      setIsLoading(false);
      setResError("Код восстановления отсутствует");
      return;
    }

    const res = await updatePassword(objectFormData(data), code);

    if (res.error) {
      setResError(res.error);
      setIsLoading(false);
      return;
    }
    if (res.success) {
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
