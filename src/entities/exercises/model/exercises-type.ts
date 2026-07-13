export type TExercisesType = "exercise" | "riff";

export interface IExercisesItem {
  id: number;
  title: string;
  category: string;
  xp: number;
  type: TExercisesType;
  isCompleted: boolean;
  link: string;
}
