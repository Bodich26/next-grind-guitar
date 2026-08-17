import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

export function useGetExercisesList() {
  const exercises = useQuery(api.functions.exercises.getExercises);

  return {
    exercises: exercises ? exercises : null,
    isLoading: exercises === undefined,
  };
}
