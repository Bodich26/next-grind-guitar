import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { Id } from "@/../convex/_generated/dataModel";

export const useExercisesCompleting = (
  _id: Id<"exercises">,
  isCompleted: boolean,
) => {
  const completingExercisesMutation = useMutation(
    api.functions.exercises.completeExercises,
  );

  const handleCompleting = async () => {
    if (!_id) return;
    if (isCompleted === true) {
      return { success: false, message: "Ошибка задача уже выполнена" };
    }

    try {
      const res = await completingExercisesMutation({ _id, isCompleted });
      return res;
    } catch (error) {
      console.error("Ошибка при выполнении задачи:", error);
      return { success: false, message: "Ошибка выполнения запроса" };
    }
  };

  return { handleCompleting };
};
