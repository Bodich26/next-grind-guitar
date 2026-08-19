import { ExercisesItem } from "@/entities/exercises";
import { Doc } from "@/../convex/_generated/dataModel";

type Props = {
  title: string;
  exercises: Doc<"exercises">[];
  renderActions: (exercise: Doc<"exercises">) => React.ReactNode;
};

export const ExercisesCategory = ({
  title,
  exercises,
  renderActions,
}: Props) => {
  if (exercises.length === 0) return null;

  return (
    <div className="flex flex-col max-h-175 overflow-y-auto custom-scrollbar">
      <div className="px-3 py-2 text-xs font-bold tracking-wider text-muted-foreground uppercase shrink-0">
        {title}
      </div>
      <div className="flex flex-col py-1 px-1 gap-3">
        {exercises.map((ex) => (
          <ExercisesItem
            key={ex._id}
            ex={ex}
            openPlayer={() => {}}
            children={renderActions(ex)}
          />
        ))}
      </div>
    </div>
  );
};
