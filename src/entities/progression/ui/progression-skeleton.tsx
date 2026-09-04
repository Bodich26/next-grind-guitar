import { Skeleton } from "@/shared";

export const ProgressionSkeleton = () => {
  return (
    <div className="bg-card shadow-sm border border-border lg:col-span-5 p-5 w-[376px] h-[378px] rounded-xl flex flex-col justify-between">
      <div>
        <Skeleton className="w-full h-[20px] mb-2" />
        <Skeleton className="w-full h-[48px] " />
        <Skeleton className="w-full h-[16px] mt-1" />
      </div>
      <div>
        <Skeleton className="w-full h-[20px] mt-6" />
        <Skeleton className="w-full h-[13px] mt-2" />
      </div>
    </div>
  );
};
