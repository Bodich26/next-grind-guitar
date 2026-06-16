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
import { useUpdatePassword } from "../model/use-update-password";
import { AUTH_META } from "@/../routes";
import { ArrowRight, Lock } from "lucide-react";
import { Controller } from "react-hook-form";

export const UpdatePasswordForm = () => {
  const { control, handleSubmitForm, isLoading, resSuccess, resError } =
    useUpdatePassword();

  return (
    <Card className="bg-transparent">
      <FormHeader
        titles={"Сброс пароля"}
        text={"Теперь вы можете создать новый пароль"}
      />
      <form id="update-rhf-form" onSubmit={handleSubmitForm}>
        <CardContent className="space-y-6">
          <FieldGroup>
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="update-rhf-form-password"
                    className="text-xs uppercase tracking-widest font-medium"
                  >
                    Пароль
                  </FieldLabel>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
                    <Input
                      {...field}
                      id="update-rhf-form-password"
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
          buttonText={"Обновить пароль"}
          buttonActionText={"Пароль обновляется..."}
          descriptionText={"Хотите вернуться?"}
          linkText={"Войти"}
          buttonIcon={ArrowRight}
        />
      </form>
    </Card>
  );
};
