import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { getTodayString } from "@/shared";

export function useActivityData() {
  const activityData = useQuery(api.functions.activity.getActivityData);

  const isLoading = activityData === undefined;
  const isError = !isLoading && activityData === null;

  const todayStr = getTodayString();
  const isTodayCompleted =
    activityData?.completedDates.includes(todayStr) ?? false;

  return {
    activityData,
    isLoading,
    isError,
    isTodayCompleted,
    completedDates: activityData?.completedDates ?? [],
    currentStreak: activityData?.currentStreak ?? 0,
  };
}
