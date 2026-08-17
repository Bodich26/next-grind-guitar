import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";

export const useExercisesDelete = (_id: Id<"exercises">) => {
  const deleteExercisesMutation = useMutation(
    api.functions.exercises.deleteExercises,
  );

  const handleDelete = async () => {
    if (!_id) return;
    try {
      const res = await deleteExercisesMutation({ _id });
      return res;
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
      return { success: false, message: "Ошибка выполнения запроса" };
    }
  };

  return { handleDelete };
};
