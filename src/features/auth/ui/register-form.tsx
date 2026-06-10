"use client";

import { NoticeForm, PasswordInput } from "@/shared";
import {
  Button,
  Field,
  Flex,
  Input,
  InputGroup,
  Link,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import { TitlesForm } from "./titles-form";
import { IoIosMail } from "react-icons/io";
import { RiUser3Fill } from "react-icons/ri";
import { AuthRedirectForm } from "./auth-redirect-form";
import { useRegister } from "../model/use-register";

export const RegisterForm = () => {
  const {
    register,
    handleSubmitForm,
    emailErrors,
    passwordErrors,
    nameErrors,
    resError,
    resSuccess,
    isLoading,
  } = useRegister();

  return (
    <Flex gap={"5"} flexDirection={"column"} className="max-w-[487px]">
      <TitlesForm
        titles={"Регистрация"}
        text={"Твое новое пространство для общения и вдохновения"}
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

          {/* Nick */}

          <Field.Root required invalid={!!nameErrors}>
            <Field.Label>
              Псевдоним <Field.RequiredIndicator />
            </Field.Label>
            <InputGroup startElement={<RiUser3Fill />}>
              <Input
                type="text"
                {...register("name")}
                required
                placeholder="Введите псевдоним"
                borderColor={"border.default"}
              />
            </InputGroup>

            <Field.ErrorText>{nameErrors?.message}</Field.ErrorText>
          </Field.Root>

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
            {passwordErrors ? (
              <Field.ErrorText>{passwordErrors?.message}</Field.ErrorText>
            ) : (
              <Field.HelperText>Минимум 8 символов</Field.HelperText>
            )}
          </Field.Root>

          {/*Notice*/}
          <NoticeForm success={resSuccess} error={resError} />

          {/* Rule */}

          <Checkbox.Root variant={"solid"} required>
            <Checkbox.HiddenInput />
            <Checkbox.Control borderColor={"border.default"} />
            <Checkbox.Label fontSize={"sm"}>
              Регистрируясь, вы соглашаетесь с{" "}
              <Link href="/login" color={"rose.700"} display={"inline"}>
                [Правилами сообщества]
              </Link>{" "}
              и{" "}
              <Link href="/login" color={"rose.700"} display={"inline"}>
                [Политикой конфиденциальности]
              </Link>
            </Checkbox.Label>
          </Checkbox.Root>

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
            Создать Аккаунт
          </Button>
          <AuthRedirectForm
            text={"Уже есть аккаунт?"}
            linkText={"Войти"}
            href={"/login"}
          />
        </Stack>
      </form>
    </Flex>
  );
};
