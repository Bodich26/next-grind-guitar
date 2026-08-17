import { Button } from "@/shared";
import { CheckCircle, Circle } from "lucide-react";
import { Id } from "@/../convex/_generated/dataModel";

type Props = {
  _id: Id<"exercises">;
  isCompleted: boolean;
};
export const ExercisesCompletingButton = ({ _id, isCompleted }: Props) => {
  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-8 w-8 rounded-md hover:text-primary/80"
      onClick={() => console.log(_id)}
    >
      {isCompleted ? (
        <CheckCircle size={24} className="text-primary" />
      ) : (
        <Circle size={24} />
      )}
    </Button>
  );
};
