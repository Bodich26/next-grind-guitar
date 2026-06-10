"use client";
import {
  Button,
  Field,
  Flex,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";
import { IoIosMail } from "react-icons/io";
import { TitlesForm } from "./titles-form";
import { AuthRedirectForm } from "./auth-redirect-form";
import { useForgotPassword } from "../model/use-forgot-password";
import { NoticeForm } from "@/shared";

export const ForgotPasswordFrom = () => {
  const {
    handleSubmitForm,
    emailErrors,
    resError,
    resSuccess,
    register,
    isLoading,
  } = useForgotPassword();

  return (
    <Flex gap={"5"} flexDirection={"column"} className="max-w-[487px]">
      <TitlesForm
        titles={"Сброс пароля"}
        text={"Введите почту, привязанную к вашему аккаунту"}
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
          {/* Email */}

          <Field.Root required invalid={!!emailErrors}>
            <Field.Label>
              Почта <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement={<IoIosMail />}>
              <Input
                type="email"
                {...register("email")}
                required
                placeholder="example@mail.com"
                borderColor={"border.default"}
              />
            </InputGroup>

            <Field.ErrorText>{emailErrors?.message}</Field.ErrorText>
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
            Восстановить пароль
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
