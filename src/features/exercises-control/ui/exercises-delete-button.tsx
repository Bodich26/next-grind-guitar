import { Button } from "@/shared";
import { Trash } from "lucide-react";
import { Id } from "@/../convex/_generated/dataModel";
import { useExercisesDelete } from "../model/use-exercises-delete";
import { toast } from "sonner";

type Props = {
  _id: Id<"exercises">;
};
export const ExercisesDeleteButton = ({ _id }: Props) => {
  const { handleDelete } = useExercisesDelete(_id);

  const handleClick = async () => {
    const res = await handleDelete();
    if (res?.success) {
      toast.success(res.message || "Задача успешно удалена");
    } else {
      toast.error(res?.message || "Не удалось удалить задачу");
    }
  };

  return (
    <Button
      size="icon"
      variant="ghost"
      className="h-8 w-8 rounded-md hover:text-destructive/80"
      onClick={handleClick}
    >
      <Trash size={24} />
    </Button>
  );
};
