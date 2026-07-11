"use client";
import { authClient } from "@/shared";
import { useRouter } from "next/navigation";
import React from "react";
import { AUTH_META } from "@/../routes";

export const useLogout = () => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => setIsLoggingOut(true),
        onSuccess: () => {
          setIsLoggingOut(false);
          router.push(AUTH_META.LOGIN);
        },
        onError: () => {
          setIsLoggingOut(false);
        },
      },
    });
  };

  return { handleSignOut, isLoggingOut };
};
