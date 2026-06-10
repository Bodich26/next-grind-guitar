"use client";
import React from "react";
import { useRouter } from "next/navigation";

export const useRedirectTimer = (path: string, delay: number) => {
  const router = useRouter();
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);

  const startRedirect = () => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      router.push(path);
    }, delay);
  };

  const cancelRedirect = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  React.useEffect(() => {
    return () => cancelRedirect();
  }, []);

  return { startRedirect, cancelRedirect };
};
