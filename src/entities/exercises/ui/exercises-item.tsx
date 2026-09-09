import { Card } from "@/shared";
import { Doc } from "@/../convex/_generated/dataModel";
import Link from "next/link";
import { cn } from "@/shared";

type Props = {
  ex: Doc<"exercises">;
  children: React.ReactNode;
};

export const ExercisesItem = ({ ex, children }: Props) => {
  return (
    <Card
      key={ex._id}
      className={cn(
        "flex items-center justify-between flex-row group p-1.5 rounded-lg transition-all border border-transparent hover:border-border",
        ex.isCompleted ? " opacity-70" : "bg-muted/40 hover:bg-muted",
      )}
    >
      <div className="flex-1 min-w-0">
        <Link
          className="font-semibold text-sm transition-colors duration-200 hover:text-primary cursor-pointer"
          href={ex.link}
          target="_blank"
        >
          {ex.title}
        </Link>
        <p className="text-xs text-muted-foreground mt-0.5">{ex.category}</p>
      </div>
      {children}
    </Card>
  );
};
