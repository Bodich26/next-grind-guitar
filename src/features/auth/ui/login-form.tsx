"use client";
import { Controller } from "react-hook-form";
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
  Spinner,
} from "@/shared";
import { useLoginForm } from "../model/use-login-form";
import Link from "next/link";
import { AUTH_META } from "@/../routes";
import { FormStatus } from "./status-form";

export const LoginForm = () => {
  const {
    formLogin,
    successForm,
    errorForm,
    loadingForm,
    handleLogin,
    setErrorForm,
  } = useLoginForm();

  return (
    <Card className="flex justify-center items-center">
      <CardHeader className="w-full">
        <CardTitle className="text-3xl font-bold">Авторизация</CardTitle>
        <CardDescription>
          Войдите, чтобы продолжить тренировки и обновить ежедневные счетчики
          времени.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <form id="form-login" onSubmit={formLogin.handleSubmit(handleLogin)}>
          <FieldGroup>
            <Controller
              name="email"
              control={formLogin.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-login-email"
                    className="font-medium text-lg"
                  >
                    Почта
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-login-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Укажите вашу почту"
                    type="email"
                    disabled={loadingForm}
                    onClick={() => setErrorForm("")}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={formLogin.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-login-password"
                    className="font-medium text-lg"
                  >
                    Пароль
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-login-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Введите ваш пароль"
                    type="password"
                    disabled={loadingForm}
                    onClick={() => setErrorForm("")}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="bg-transparent border-0 w-full">
        <Field orientation="vertical">
          <Button
            form="form-login"
            disabled={loadingForm}
            className="cursor-pointer font-medium text-base w-full p-4"
            type="submit"
          >
            {loadingForm ? <Spinner /> : "Вход"}
          </Button>

          <div className="flex gap-2 items-center justify-center">
            <p>Нет аккаунта?</p>
            <Link className="text-primary" href={AUTH_META.REGISTER}>
              Зарегистрироваться
            </Link>
          </div>

          <FormStatus error={errorForm} success={successForm} />
        </Field>
      </CardFooter>
    </Card>
  );
};
