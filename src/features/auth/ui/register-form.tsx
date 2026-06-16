"use client";
import {
  Card,
  CardContent,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FormFooter,
  FormHeader,
  Input,
} from "@/shared";
import { useRegister } from "../model/use-register";
import { AUTH_META } from "@/../routes";
import { Controller } from "react-hook-form";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

export const RegisterForm = () => {
  const { control, handleSubmitForm, resError, resSuccess, isLoading } =
    useRegister();

  return (
    <Card className="bg-transparent">
      <FormHeader
        titles={"Вход в аккаунт"}
        text={"Добро пожаловать в Grind Guitar"}
      />
      <form id="register-rhf-form" onSubmit={handleSubmitForm}>
        <CardContent className="space-y-6">
          <FieldGroup>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="register-rhf-form-email"
                    className="text-xs uppercase tracking-widest font-medium"
                  >
                    Почта
                  </FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                    <Input
                      {...field}
                      id="register-rhf-form-email"
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
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="register-rhf-form-name"
                    className="text-xs uppercase tracking-widest font-medium"
                  >
                    Имя
                  </FieldLabel>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                    <Input
                      {...field}
                      id="register-rhf-form-name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Bodich"
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
                  <FieldLabel
                    htmlFor="register-rhf-form-password"
                    className="text-xs uppercase tracking-widest font-medium"
                  >
                    Пароль
                  </FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                    <Input
                      {...field}
                      id="register-rhf-form-password"
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
          linkRedirect={AUTH_META.LOGIN}
          actionError={resError}
          actionSuccess={resSuccess}
          buttonText={"Зарегистрироваться"}
          buttonActionText={"Регистрация..."}
          descriptionText={"Есть аккаунта?"}
          linkText={"Войти"}
          buttonIcon={ArrowRight}
        />
      </form>
    </Card>
  );
};
