"use client";
import { useForgotPassword } from "../model/use-forgot-password";
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
import { AUTH_META } from "@/../routes";
import { ArrowRight, Mail } from "lucide-react";
import { Controller } from "react-hook-form";

export const ForgotPasswordFrom = () => {
  const { control, handleSubmitForm, resError, resSuccess, isLoading } =
    useForgotPassword();

  return (
    <Card className="bg-transparent">
      <FormHeader
        titles={"Сброс пароля"}
        text={"Введите почту, привязанную к вашему аккаунту"}
      />
      <form id="forgot-rhf-form" onSubmit={handleSubmitForm}>
        <CardContent className="space-y-6">
          <FieldGroup>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="forgot-rhf-form-email"
                    className="text-xs uppercase tracking-widest font-medium"
                  >
                    Почта
                  </FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                    <Input
                      {...field}
                      id="forgot-rhf-form-email"
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
        <FormFooter
          isLoading={isLoading}
          linkRedirect={AUTH_META.LOGIN}
          actionError={resError}
          actionSuccess={resSuccess}
          buttonText={"Сбросить пароль"}
          buttonActionText={"Письмо отправляется..."}
          descriptionText={"Хотите вернуться?"}
          linkText={"Войти"}
          buttonIcon={ArrowRight}
        />
      </form>
    </Card>
  );
};
