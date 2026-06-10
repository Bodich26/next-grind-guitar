"use client";
import { useLogin } from "../model/use-login";
import { ArrowRight, Lock, Mail } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
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
      <CardHeader className="space-y-3">
        <CardTitle className="text-3xl font-bold text-center">
          Вход в аккаунт
        </CardTitle>
        <CardDescription className="text-center text-[15px]">
          Добро пожаловать в Grind Guitar
        </CardDescription>
      </CardHeader>
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
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 pt-4 bg-transparent border-0 mt-5">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 font-semibold rounded-2xl text-base transition-all"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Входим...
              </div>
            ) : (
              <>
                Войти
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          <div className="text-center text-sm pt-2">
            Нет аккаунта?{" "}
            <Link
              href={AUTH_META.REGISTER}
              className="text-primary font-medium transition-colors"
            >
              Создать бесплатно
            </Link>
          </div>
          {resSuccess && (
            <div className="text-primary text-sm text-center">{resSuccess}</div>
          )}
          {resError && (
            <div className="text-destructive text-sm text-center">
              {resError}
            </div>
          )}
        </CardFooter>
      </form>
    </Card>
  );
};
