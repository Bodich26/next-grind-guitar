import { Card, Skeleton } from "@/shared";

export const GeneralStatisticsSkeleton = () => {
  return (
    <Card className="p-5 border border-border bg-card rounded-xl shadow-sm">
      <Skeleton className="w-full h-[20px] mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Skeleton className="w-full h-[90px]" />
        <Skeleton className="w-full h-[90px]" />
        <Skeleton className="w-full h-[90px]" />
      </div>
    </Card>
  );
};
