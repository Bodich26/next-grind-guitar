"use client";
import React from "react";
import { ExercisesItem } from "@/entities/exercises";
import { IExercisesItem } from "@/entities/exercises/model/exercises-type";
import { Button, Card } from "@/shared";
import { CheckCircle, Circle } from "lucide-react";

const exercises: IExercisesItem[] = [
  {
    id: 1,
    title: "Alternate Picking 120 BPM",
    category: "Техника",
    xp: 120,
    type: "exercise" as const,
    isCompleted: false,
    link: "ssssswe",
  },
  {
    id: 2,
    title: "Pentatonic Scale Runs",
    category: "Скейлы",
    xp: 90,
    type: "exercise" as const,
    isCompleted: false,
    link: "ssssswe",
  },
  {
    id: 3,
    title: "Sweep Picking Arpeggios",
    category: "Арпеджио",
    xp: 150,
    type: "exercise" as const,
    isCompleted: false,
    link: "ssssswe",
  },
  {
    id: 4,
    title: "Pentatonic Scale Runs",
    category: "Скейлы",
    xp: 90,
    type: "exercise" as const,
    isCompleted: false,
    link: "ssssswe",
  },
  {
    id: 5,
    title: "Sweep Picking Arpeggios",
    category: "Арпеджио",
    xp: 150,
    type: "exercise" as const,
    isCompleted: false,
    link: "ssssswe",
  },
  {
    id: 6,
    title: "Sweep Picking Arpeggios",
    category: "Арпеджио",
    xp: 150,
    type: "exercise" as const,
    isCompleted: false,
    link: "ssssswe",
  },
  {
    id: 7,
    title: "Anastasia - Slash Solo",
    category: "Рифы",
    xp: 200,
    type: "riff" as const,
    isCompleted: false,
    link: "ssssswe",
  },
  {
    id: 8,
    title: "Nothing Else Matters Solo",
    category: "Рифы",
    xp: 180,
    type: "riff" as const,
    isCompleted: false,
    link: "ssssswe",
  },
  {
    id: 9,
    title: "Anastasia - Slash Solo",
    category: "Рифы",
    xp: 200,
    type: "riff" as const,
    isCompleted: false,
    link: "ssssswe",
  },
  {
    id: 10,
    title: "Nothing Else Matters Solo",
    category: "Рифы",
    xp: 180,
    type: "riff" as const,
    isCompleted: true,
    link: "ssssswe",
  },
];

export const ExercisesList = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

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
        <div className="flex flex-col h-80 overflow-hidden">
          <div className="px-3 py-2 text-xs font-bold tracking-wider text-muted-foreground uppercase shrink-0">
            Мои упражнения
          </div>
          <div className="flex flex-col overflow-y-auto py-1 pr-1 gap-3 custom-scrollbar">
            {exercises
              .filter((ex) => ex.type === "exercise")
              .map((ex) => (
                <ExercisesItem
                  key={ex.id}
                  ex={ex}
                  openPlayer={function (url: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  completeExercise={
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-md hover:text-primary/80"
                      onClick={(e) => console.log(e)}
                    >
                      {ex.isCompleted ? (
                        <CheckCircle size={24} className="text-primary" />
                      ) : (
                        <Circle size={24} />
                      )}
                    </Button>
                  }
                />
              ))}
          </div>
        </div>

        {/* Рифы */}
        <div className="flex flex-col h-80 overflow-hidden">
          <div className="px-3 py-2 text-xs font-bold tracking-wider text-muted-foreground uppercase shrink-0">
            Изучаемые рифы
          </div>
          <div className="flex flex-col overflow-y-auto py-1 pr-1 gap-3 custom-scrollbar">
            {exercises
              .filter((ex) => ex.type === "riff")
              .map((ex) => (
                <ExercisesItem
                  key={ex.id}
                  ex={ex}
                  openPlayer={function (url: string): void {
                    throw new Error("Function not implemented.");
                  }}
                  completeExercise={
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-md  hover:text-primary/80"
                      onClick={(e) => console.log(e)}
                    >
                      {ex.isCompleted ? (
                        <CheckCircle size={24} className="text-primary" />
                      ) : (
                        <Circle size={24} />
                      )}
                    </Button>
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
