import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

export function useHeaderData() {
  const headerData = useQuery(api.functions.userStats.getHeaderData);

  const isLoading = headerData === undefined;
  const isError = !isLoading && headerData === null;

  return {
    user: headerData
      ? {
          name: headerData.name,
          pictureUrl: headerData.pictureUrl,
          role: headerData.role,
        }
      : null,
    stats: headerData ? { streak: headerData.streak } : null,
    isLoading,
    isError,
  };
}
