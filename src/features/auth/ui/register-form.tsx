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
  FormStatus,
  Input,
  Spinner,
} from "@/shared";
import { useRegisterForm } from "../model/use-register-form";
import Link from "next/link";
import { AUTH_META } from "@/../routes";

export const RegisterForm = () => {
  const {
    formRegister,
    successForm,
    setErrorForm,
    errorForm,
    loadingForm,
    handleRegister,
  } = useRegisterForm();

  return (
    <Card className="flex justify-center items-center">
      <CardHeader className="w-full">
        <CardTitle className="text-3xl font-bold">Создание профиля</CardTitle>
        <CardDescription>
          Зарегистрируйте аккаунт, чтобы получить доступ к личной статистике и
          календарю тренировок.
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <form
          id="form-register"
          onSubmit={formRegister.handleSubmit(handleRegister)}
        >
          <FieldGroup>
            <Controller
              name="email"
              control={formRegister.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-register-email"
                    className="font-medium text-lg"
                  >
                    Почта
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-email"
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
              name="name"
              control={formRegister.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-register-name"
                    className="font-medium text-lg"
                  >
                    Ник
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Введите ваш никнейм"
                    type="text"
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
              control={formRegister.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="form-register-password"
                    className="font-medium text-lg"
                  >
                    Пароль
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-register-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Придумайте ваш пароль"
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
            form="form-register"
            className="font-medium text-base w-full p-4"
            type="submit"
            disabled={loadingForm}
          >
            {loadingForm ? <Spinner /> : "Зарегистрироваться"}
          </Button>

          <div className="flex gap-2 items-center justify-center">
            <p>Уже есть аккаунт?</p>
            <Link className="text-primary" href={AUTH_META.LOGIN}>
              Вход
            </Link>
          </div>

          <FormStatus error={errorForm} success={successForm} />
        </Field>
      </CardFooter>
    </Card>
  );
};
