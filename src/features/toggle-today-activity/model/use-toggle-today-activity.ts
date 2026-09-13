"use client";
import React from "react";
import { api } from "@/../convex/_generated/api";
import { useMutation } from "convex/react";

export const useToggleTodayActivity = () => {
  const toggleActivity = useMutation(
    api.functions.activity.toggleTodayActivity,
  );

  const [isPending, setIsPending] = React.useState<boolean>(false);

  const handleToggle = async () => {
    if (isPending) return;

    setIsPending(true);
    try {
      await toggleActivity();
    } catch (error) {
      console.error("Ошибка при добавлении дня:", error);
    } finally {
      setIsPending(false);
    }
  };

  return {
    handleToggle,
    isPending,
  };
};
