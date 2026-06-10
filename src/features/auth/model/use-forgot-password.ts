"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { ForgotFormData, forgotPasswordSchema } from "./auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassword } from "../api/actions";
import { objectFormData } from "@/shared";

export const useForgotPassword = () => {
  const [resError, setResError] = React.useState<string>("");
  const [resSuccess, setResSuccess] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const emailErrors = errors.email;

  const handleSubmitForm = handleSubmit(async (data: ForgotFormData) => {
    setIsLoading(true);
    const res = await forgotPassword(objectFormData(data));

    if (res.error) {
      setResError(res.error);
      setIsLoading(false);
      return;
    }

    if (res.success) {
      setResSuccess(res.success);
      setIsLoading(false);
    }
  });
  return {
    register,
    handleSubmitForm,
    emailErrors,
    resError,
    resSuccess,
    isLoading,
  };
};
