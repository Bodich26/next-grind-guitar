import { useQuery } from "convex/react";
import { api } from "@/../convex/_generated/api";

export function useGetExercisesList() {
  const exercises = useQuery(api.functions.exercises.getExercises);

  const isLoading = exercises === undefined;
  const isError = !isLoading && exercises === null;

  return {
    exercises: exercises ? exercises : null,
    isLoading,
    isError,
  };
}
