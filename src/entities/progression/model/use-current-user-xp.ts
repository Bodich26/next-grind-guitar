import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

export function useCurrentUserXp() {
  const xp = useQuery(api.functions.userStats.getUserXp);

  return {
    currentXp: xp ?? 0,
    isLoading: xp === undefined,
  };
}
