"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { RegisterFormData, registerSchema } from "./auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { objectFormData } from "@/shared";
import { signUp } from "../api/actions";

export const useRegister = () => {
  const [resError, setResError] = React.useState<string>("");
  const [resSuccess, setResSuccess] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const emailErrors = errors.email;
  const nameErrors = errors.name;
  const passwordErrors = errors.password;

  const handleSubmitForm = handleSubmit(async (data: RegisterFormData) => {
    setIsLoading(true);
    const res = await signUp(objectFormData(data));

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
    passwordErrors,
    nameErrors,
    resError,
    resSuccess,
    isLoading,
  };
};
