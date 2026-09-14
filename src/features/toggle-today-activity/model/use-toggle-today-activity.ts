"use client";
import React from "react";
import { api } from "@/../convex/_generated/api";
import { useMutation } from "convex/react";

export const useToggleTodayActivity = () => {
  const toggleActivity = useMutation(
    api.functions.activity.toggleTodayActivity,
  );

  const [isPending, setIsPending] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (!isPending) return;

    const timer = setTimeout(() => {
      setIsPending(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [isPending]);

  const handleToggle = async () => {
    if (isPending) return;
    setIsPending(true);
    try {
      const res = await toggleActivity();
      return res;
    } catch (error) {
      console.error("Ошибка при добавлении дня:", error);
      setIsPending(false);
      return { success: false, message: "Ошибка выполнения запроса" };
    }
  };

  return {
    handleToggle,
    isPending,
  };
};
