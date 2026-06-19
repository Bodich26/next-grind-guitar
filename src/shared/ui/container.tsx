import { cn } from "../lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};

export const Container = ({ children, className }: Props) => {
  return (
    <div className={cn("max-w-[1310px] px-[15px] mx-auto", className)}>
      {children}
    </div>
  );
};
