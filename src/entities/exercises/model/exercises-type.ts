import { Id } from "@/../convex/_generated/dataModel";
export type TExercisesType = "exercise" | "riff";

export interface IExercisesItem {
  _id: Id<"exercises">;
  _creationTime: number;
  title: string;
  category: string;
  xp: number;
  type: TExercisesType;
  isCompleted: boolean;
  link: string;
}
