"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";
import { exerciseFormData, exerciseSchema } from "./exercises-schema";
import { toast } from "sonner";

export const useExercisesForm = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [errorForm, setErrorForm] = React.useState<string | undefined>("");
  const [loadingForm, setLoadingForm] = React.useState<boolean>(false);

  const selectTypeExercises = [
    { label: "Exercise", value: "exercise" },
    { label: "Riff", value: "riff" },
  ];

  const createExerciseMutation = useMutation(
    api.functions.exercises.createExercises,
  );

  const formExercises = useForm<exerciseFormData>({
    resolver: zodResolver(exerciseSchema),
    defaultValues: {
      title: "",
      category: "",
      xp: "",
      type: "exercise",
      link: "",
    },
  });

  console.log(formExercises);

  const handleCreateExercise = async (values: exerciseFormData) => {
    setErrorForm("");
    setLoadingForm(true);

    try {
      const payload = {
        ...values,
        xp: Number(values.xp),
      };

      const res = await createExerciseMutation(payload);

      // Если твой мутационный бэкенд возвращает объект { success: false, message: "..." }
      if (res && res.success === false) {
        setErrorForm(res.message || "Не удалось создать задачу");
        toast.error(res.message || "Не удалось создать задачу");
        return;
      }

      toast.success("Задача успешно создана!");
      formExercises.reset();
      setOpen(false);
    } catch (error: any) {
      const errorMessage =
        error.message || "Произошла ошибка при создании задачи";
      setErrorForm(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoadingForm(false);
    }
  };

  return {
    formExercises,
    handleCreateExercise,
    errorForm,
    loadingForm,
    setErrorForm,
    selectTypeExercises,
    open,
    setOpen,
  };
};
