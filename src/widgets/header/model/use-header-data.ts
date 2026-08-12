import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

export function useHeaderData() {
  const data = useQuery(api.functions.userStats.getHeaderData);

  return {
    user: data
      ? { name: data.name, pictureUrl: data.pictureUrl, role: data.role }
      : null,
    stats: data ? { level: data.level, streak: data.streak } : null,
    isLoading: data === undefined,
  };
}
