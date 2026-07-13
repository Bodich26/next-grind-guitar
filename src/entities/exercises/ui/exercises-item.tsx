import { IExercisesItem } from "../model/exercises-type";
import { handelExercisesLink } from "../model/handle-exercises-link";

type Props = {
  ex: IExercisesItem;
  openPlayer: (url: string) => void;
  completeExercise: React.ReactNode;
};

export const ExercisesItem = ({ ex, openPlayer, completeExercise }: Props) => {
  const { handleCardClick } = handelExercisesLink({ openPlayer, ex });
  return (
    <div
      key={ex.id}
      className="flex items-center justify-between flex-row group bg-muted/40 hover:bg-muted border border-transparent hover:border-border p-3.5 rounded-lg transition-all cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm truncate">{ex.title}</div>
        <div className="text-xs text-muted-foreground mt-0.5">
          {ex.category}
        </div>
      </div>
      {completeExercise}
    </div>
  );
};
