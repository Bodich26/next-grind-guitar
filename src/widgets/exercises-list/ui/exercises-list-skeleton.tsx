import { Skeleton } from "@/shared";

export const ExercisesListSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="px-3 mt-1.5 py-2 w-full h-[22px] rounded-xl" />
      <div className="flex flex-col py-1 pr-1 gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-[68px] rounded-xl" />
        ))}
      </div>
    </div>
  );
};
