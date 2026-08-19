import { z } from "zod";
import { ExerciseType } from "@/shared";

export const exerciseSchema = z.object({
  title: z.string().min(1, "Название обязательно"),
  category: z.string().min(1, "Категория обязательна"),
  xp: z
    .string()
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 1 && Number(val) <= 100,
      {
        message: "Введите число от 1 до 100",
      },
    ),
  type: z.enum(["exercise", "riff"] as [ExerciseType, ...ExerciseType[]]),
  link: z.url({ protocol: /^https$/, message: "Введите корректную ссылку" }),
});

export type exerciseFormData = z.infer<typeof exerciseSchema>;
