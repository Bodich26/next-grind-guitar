import { Skeleton } from "@/shared";

export const HeaderSkeleton = () => {
  return (
    <>
      <Skeleton className="w-[112px] h-[42px] rounded-xl" />
      <Skeleton className="w-[99px] h-[44px] rounded-xl" />
    </>
  );
};
