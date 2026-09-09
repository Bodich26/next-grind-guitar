"use client";
import { LogoutButton } from "@/features/auth";
import {
  Container,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ErrorMessage,
  Logo,
} from "@/shared";
import { Flame, User } from "lucide-react";
import { useHeaderData } from "../model/use-header-data";
import { HeaderSkeleton } from "./header-skeleton";
import { useProgression } from "@/entities/progression";

export const Header = () => {
  const { stats, ...headerData } = useHeaderData();
  const { level, ...progression } = useProgression();

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <Container className="flex justify-between items-center py-4">
        <Logo />
        <div className="flex items-center gap-4 md:gap-6">
          {headerData.isLoading ? (
            <HeaderSkeleton />
          ) : headerData.isError || progression.isError ? (
            <ErrorMessage message={"Ошибка получения статистики"} />
          ) : (
            <>
              <div className="hidden sm:flex items-center gap-2 border px-4 py-2 rounded-xl">
                <Flame className="text-orange-500" size={20} />
                <span className="font-semibold">{stats?.streak} дней</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-ring">УРОВЕНЬ</div>
                  <div className="font-bold text-xl">{level}</div>
                </div>
                <div className="text-2xl">⭐</div>
              </div>
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-10 h-10 bg-zinc-800 border rounded-full flex items-center justify-center cursor-pointer hover:bg-zinc-700 transition-colors select-none">
                <User size={18} className="text-zinc-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-2">
              <DropdownMenuLabel>Мой профиль</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <LogoutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Container>
    </header>
  );
};
