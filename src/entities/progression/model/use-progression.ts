import { useCurrentUserXp } from "./use-current-user-xp";

export const useProgression = () => {
  const { currentXp, isLoading } = useCurrentUserXp();

  let level = 1;
  let xpForNextLevel = 100;
  let totalXpRequired = 0;

  while (currentXp >= totalXpRequired + xpForNextLevel) {
    level = level + 1;
    totalXpRequired = totalXpRequired + xpForNextLevel;
    xpForNextLevel = Math.round(xpForNextLevel * 1.3);
  }

  const progressXp = currentXp - totalXpRequired;
  const progressPercent = Math.round((progressXp / xpForNextLevel) * 100);

  return {
    level,
    currentXp,
    totalXpRequired,
    xpForNextLevel,
    isLoading,
    progressPercent,
    progressXp,
  };
};
