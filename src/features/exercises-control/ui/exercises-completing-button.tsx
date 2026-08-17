import { Button } from "@/shared";
import { CheckCircle, Circle } from "lucide-react";
import { Id } from "@/../convex/_generated/dataModel";
import { useExercisesCompleting } from "../model/use-exercises-completing";
import { toast } from "sonner";

type Props = {
  _id: Id<"exercises">;
  isCompleted: boolean;
};
export const ExercisesCompletingButton = ({ _id, isCompleted }: Props) => {
  const { handleCompleting } = useExercisesCompleting(_id, isCompleted);

  const handleClick = async () => {
    const res = await handleCompleting();
    if (res?.success) {
      toast.success(res.message || "Задача успешно выполнена");
    } else {
      toast.error(res?.message || "Не удалось выполнить задачу");
    }
  };
  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-8 w-8 rounded-md hover:text-primary/80"
      onClick={handleClick}
    >
      {isCompleted ? (
        <CheckCircle size={24} className="text-primary" />
      ) : (
        <Circle size={24} />
      )}
    </Button>
  );
};
