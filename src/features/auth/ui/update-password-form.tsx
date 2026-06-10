"use client";
import { Button, Field, Flex, Stack } from "@chakra-ui/react";
import { TitlesForm } from "./titles-form";
import { AuthRedirectForm } from "./auth-redirect-form";
import { NoticeForm, PasswordInput } from "@/shared";
import { useUpdatePassword } from "../model/use-update-password";

export const UpdatePasswordForm = () => {
  const {
    handleSubmitForm,
    passwordErrors,
    register,
    resError,
    resSuccess,
    isLoading,
  } = useUpdatePassword();

  return (
    <Flex gap={"5"} flexDirection={"column"} className="max-w-[487px]">
      <TitlesForm
        titles={"Сброс пароля"}
        text={"Теперь вы можете ввести новый пароль для своего аккаунта"}
      />
      <form onSubmit={handleSubmitForm}>
        <Stack
          gap="4"
          align="flex-start"
          padding={"10"}
          border={"solid"}
          borderWidth={"thin"}
          rounded={"md"}
          width={"full"}
          borderColor={"border.default"}
          background={"bg.app"}
        >
          {/* Password */}

          <Field.Root required invalid={!!passwordErrors}>
            <Field.Label>
              Пароль <Field.RequiredIndicator />
            </Field.Label>
            <PasswordInput
              type="password"
              {...register("password")}
              required
              placeholder="********"
              borderColor={"border.default"}
            />
            <Field.ErrorText>{passwordErrors?.message}</Field.ErrorText>
          </Field.Root>

          {/*Notice*/}
          <NoticeForm success={resSuccess} error={resError} />

          {/* Button */}

          <Button
            className="w-full"
            type="submit"
            background={"accent.primary"}
            color={"text.white"}
            rounded={"md"}
            _active={{ background: "rose.800" }}
            _hover={{ background: "rose.800" }}
            loading={isLoading}
          >
            Обновить пароль
          </Button>
          <AuthRedirectForm
            text={"Хотите вернуться?"}
            linkText={"Войти"}
            href={"/login"}
          />
        </Stack>
      </form>
    </Flex>
  );
};
