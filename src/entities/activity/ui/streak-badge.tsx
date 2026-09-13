export const StreakBadge = ({ streak }: { streak: number }) => {
  return (
    <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full">
      {streak} дней подряд 🔥
    </span>
  );
};
