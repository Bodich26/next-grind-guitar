import { Skeleton } from "@/shared";

export const ActivityCalendarSkeleton = () => {
  return (
    <div className="lg:col-span-7 p-5 border border-border bg-card rounded-xl shadow-sm">
      <Skeleton className="w-full h-[24px] mb-4" />
      <Skeleton className="w-full h-[32px] mb-4" />
      <Skeleton className="w-full h-[448px] mb-4" />
    </div>
  );
};
