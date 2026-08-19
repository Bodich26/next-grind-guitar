import { Card } from "@/shared";
import { handelExercisesLink } from "../model/handle-exercises-link";
import { Doc } from "@/../convex/_generated/dataModel";

type Props = {
  ex: Doc<"exercises">;
  openPlayer: (url: string) => void;
  children: React.ReactNode;
};

export const ExercisesItem = ({ ex, openPlayer, children }: Props) => {
  const { handleCardClick } = handelExercisesLink({ openPlayer, ex });
  return (
    <Card
      key={ex._id}
      className="flex items-center justify-between flex-row group bg-muted/40 hover:bg-muted border border-transparent hover:border-border p-1.5 rounded-lg transition-all"
    >
      <div className="flex-1 min-w-0">
        <span
          className="font-semibold text-sm transition-colors duration-200 hover:text-primary cursor-pointer"
          onClick={handleCardClick}
        >
          {ex.title}
        </span>
        <div className="text-xs text-muted-foreground mt-0.5">
          {ex.category}
        </div>
      </div>
      {children}
    </Card>
  );
};
