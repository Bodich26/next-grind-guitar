import { AuthWrapper } from "@/widgets/auth-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grind Guitar — Вход в академию",
  description:
    "Авторизуйся, чтобы продолжить качать свои навыки игры на гитаре.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
