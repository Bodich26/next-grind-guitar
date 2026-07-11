"use client";

import { DropdownMenuItem } from "@/shared";
import { LogOut } from "lucide-react";
import { useLogout } from "../model/use-logout";

export const LogoutButton = () => {
  const { handleSignOut, isLoggingOut } = useLogout();
  return (
    <DropdownMenuItem
      onClick={handleSignOut}
      disabled={isLoggingOut}
      className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer gap-2 font-medium"
    >
      <LogOut size={16} />
      <span>{isLoggingOut ? "Выхожу..." : "Выйти из аккаунта"}</span>
    </DropdownMenuItem>
  );
};
