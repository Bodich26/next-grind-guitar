import { Button } from "@/shared";
import { Plus } from "lucide-react";

export const ExercisesCreatingButton = () => {
  return (
    <div className="px-3">
      <Button
        size="sm"
        variant="default"
        className="w-full"
        onClick={() => console.log()}
      >
        <Plus size={24} />
        Добавить задачу
      </Button>
    </div>
  );
};
