import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

export const formatDuration = (totalSeconds: number = 0): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `${hours}ч ${minutes}м`;
};

export const useGeneralStatistics = () => {
  const userStats = useQuery(api.functions.userStats.getUserStats);

  const isLoading = userStats === undefined;
  const isError = !isLoading && userStats === null;

  return {
    formattedTotalTime: formatDuration(userStats?.totalSeconds ?? 0),
    riffsLearned: userStats?.learnedRiffs ?? 0,
    completedExercises: userStats?.completedExercises ?? 0,
    isLoading,
    isError,
  };
};
