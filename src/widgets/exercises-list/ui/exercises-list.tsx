"use client";
import React from "react";
import { ExercisesCategory, useGetExercisesList } from "@/entities/exercises";
import { Card, ErrorMessage, StatusMessage } from "@/shared";
import { ExercisesListSkeleton } from "./exercises-list-skeleton";
import {
  ExercisesCompletingButton,
  ExercisesDeleteButton,
  ExercisesDialogForm,
} from "@/features/exercises-control";

export const ExercisesList = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const { exercises, isLoading, isError } = useGetExercisesList();

  const exerciseList = exercises?.filter((ex) => ex.type === "exercise") || [];
  const riffList = exercises?.filter((ex) => ex.type === "riff") || [];

  return (
    <Card
      className={`w-full gap-0 md:w-80 border border-border bg-card text-card-foreground overflow-hidden md:transition-all md:duration-300 rounded-xl ${
        sidebarOpen ? "md:w-80" : "md:w-14"
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-border">
        <h2
          className={`font-bold text-lg tracking-tight ${!sidebarOpen && "md:hidden"}`}
        >
          Библиотека
        </h2>
      </div>
      <div className="p-3 space-y-6">
        {isLoading ? (
          <ExercisesListSkeleton />
        ) : !exercises || isError ? (
          <ErrorMessage message={"Произошла ошибка при загрузке"} />
        ) : exercises.length === 0 ? (
          <StatusMessage message="У вас пустая бибилиотека" />
        ) : (
          <>
            <ExercisesCategory
              title="Мои упражнения"
              exercises={exerciseList}
              renderActions={(ex) => (
                <div className="flex flex-col">
                  <ExercisesCompletingButton
                    _id={ex._id}
                    isCompleted={ex.isCompleted}
                  />
                  <ExercisesDeleteButton _id={ex._id} />
                </div>
              )}
            />
            <ExercisesCategory
              title="Изучаемые рифы"
              exercises={riffList}
              renderActions={(ex) => (
                <div className="flex flex-col">
                  <ExercisesCompletingButton
                    _id={ex._id}
                    isCompleted={ex.isCompleted}
                  />
                  <ExercisesDeleteButton _id={ex._id} />
                </div>
              )}
            />
          </>
        )}
      </div>
      {!isLoading && <ExercisesDialogForm />}
    </Card>
  );
};
