"use client";
import { useLogin } from "../model/use-login";
import { ArrowRight, Lock, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FormHeader,
  FormFooter,
  Input,
} from "@/shared";
import Link from "next/link";
import { AUTH_META } from "@/../routes";
import { Controller } from "react-hook-form";

export const LoginForm = () => {
  const { control, handleSubmitForm, isLoading, resSuccess, resError } =
    useLogin();

  return (
    <Card className="bg-transparent">
      <FormHeader
        titles={"Вход в аккаунт"}
        text={"Добро пожаловать в Grind Guitar"}
      />
      <form id="login-rhf-form" onSubmit={handleSubmitForm}>
        <CardContent className="space-y-6">
          <FieldGroup>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="login-rhf-form-email"
                    className="text-xs uppercase tracking-widest font-medium"
                  >
                    Почта
                  </FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                    <Input
                      {...field}
                      id="login-rhf-form-email"
                      aria-invalid={fieldState.invalid}
                      placeholder="name@example.com"
                      className="pl-11 h-12 rounded-2xl"
                      autoComplete="off"
                      disabled={isLoading}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        className="mt-1"
                        errors={[fieldState.error]}
                      />
                    )}
                  </div>
                </Field>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor="login-rhf-form-password"
                      className="text-xs uppercase tracking-widest font-medium"
                    >
                      Пароль
                    </FieldLabel>
                    <Link
                      href={AUTH_META.FORGOT_PASSWORD}
                      className="text-md text-primary transition-colors"
                    >
                      Забыли пароль?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                    <Input
                      {...field}
                      id="login-rhf-form-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="********"
                      className="pl-11 h-12 rounded-2xl"
                      autoComplete="off"
                      disabled={isLoading}
                    />
                    {fieldState.invalid && (
                      <FieldError
                        className="mt-1"
                        errors={[fieldState.error]}
                      />
                    )}
                  </div>
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
        <FormFooter
          isLoading={isLoading}
          linkRedirect={AUTH_META.REGISTER}
          actionError={resError}
          actionSuccess={resSuccess}
          buttonText={"Войти"}
          buttonActionText={"Входим..."}
          descriptionText={"Нет аккаунта?"}
          linkText={"Создать бесплатно"}
          buttonIcon={ArrowRight}
        />
      </form>
    </Card>
  );
};
