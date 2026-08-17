import { Card } from "@/shared";
import { IExercisesItem } from "../model/exercises-type";
import { handelExercisesLink } from "../model/handle-exercises-link";

type Props = {
  ex: IExercisesItem;
  openPlayer: (url: string) => void;
  children: React.ReactNode;
};

export const ExercisesItem = ({ ex, openPlayer, children }: Props) => {
  const { handleCardClick } = handelExercisesLink({ openPlayer, ex });
  return (
    <Card
      key={ex._id}
      className="flex items-center justify-between flex-row group bg-muted/40 hover:bg-muted border border-transparent hover:border-border p-1.5 rounded-lg transition-all cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm truncate">{ex.title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">
          {ex.category}
        </div>
      </div>
      {children}
    </Card>
  );
};
