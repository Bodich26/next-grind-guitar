"use client";
import React from "react";
import { Card, Container } from "@/shared";
import { CheckCircle } from "lucide-react";

const exercises = [
  {
    id: 1,
    title: "Alternate Picking 120 BPM",
    category: "Техника",
    xp: 120,
    type: "exercise" as const,
  },
  {
    id: 2,
    title: "Pentatonic Scale Runs",
    category: "Скейлы",
    xp: 90,
    type: "exercise" as const,
  },
  {
    id: 3,
    title: "Sweep Picking Arpeggios",
    category: "Арпеджио",
    xp: 150,
    type: "exercise" as const,
  },
  {
    id: 4,
    title: "Pentatonic Scale Runs",
    category: "Скейлы",
    xp: 90,
    type: "exercise" as const,
  },
  {
    id: 5,
    title: "Sweep Picking Arpeggios",
    category: "Арпеджио",
    xp: 150,
    type: "exercise" as const,
  },
  {
    id: 6,
    title: "Sweep Picking Arpeggios",
    category: "Арпеджио",
    xp: 150,
    type: "exercise" as const,
  },
  {
    id: 7,
    title: "Anastasia - Slash Solo",
    category: "Рифы",
    xp: 200,
    type: "riff" as const,
  },
  {
    id: 8,
    title: "Nothing Else Matters Solo",
    category: "Рифы",
    xp: 180,
    type: "riff" as const,
  },
  {
    id: 9,
    title: "Anastasia - Slash Solo",
    category: "Рифы",
    xp: 200,
    type: "riff" as const,
  },
  {
    id: 10,
    title: "Nothing Else Matters Solo",
    category: "Рифы",
    xp: 180,
    type: "riff" as const,
  },
];

export const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <Container className="py-6 flex flex-col md:flex-row gap-6">
      <Card
        className={`gap-0 w-full md:w-80 border overflow-hidden md:transition-all md:duration-300 ${
          sidebarOpen ? "md:w-80" : "md:w-14"
        }`}
      >
        <div className="px-4 pb-4 flex items-center justify-between border-b">
          <h2
            className={`font-semibold text-lg ${!sidebarOpen && "md:hidden"}`}
          >
            Библиотека
          </h2>
        </div>

        <div className="p-3 space-y-6">
          {/* Упражнения */}
          <div className="flex flex-col h-80 overflow-hidden">
            <div className="px-3 py-2 text-sm text-ring font-medium shrink-0">
              МОИ УПРАЖНЕНИЯ
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {exercises
                .filter((ex) => ex.type === "exercise")
                .map((ex) => (
                  <div
                    key={ex.id}
                    className="group bg-zinc-950 hover:bg-zinc-800 p-4 rounded-xl transition-all flex  justify-between items-center cursor-pointer"
                    onClick={() => console.log(ex)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-[15px]">{ex.title}</div>
                      <div className="text-xs text-zinc-500">{ex.category}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => console.log(ex)}
                        className="p-2.5 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-xl transition"
                      >
                        <CheckCircle size={20} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Рифы */}
          <div className="flex flex-col h-80 overflow-hidden">
            <div className="px-3 py-2 text-sm text-zinc-400 font-medium shrink-0">
              ИЗУЧАЕМЫЕ РИФЫ
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
              {exercises
                .filter((ex) => ex.type === "riff")
                .map((ex) => (
                  <div
                    key={ex.id}
                    className="group bg-zinc-950 hover:bg-zinc-800 p-4 rounded-xl transition-all flex justify-between items-center cursor-pointer"
                    onClick={() => console.log(ex)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-[15px]">{ex.title}</div>
                      <div className="text-xs text-zinc-500">{ex.category}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => console.log(ex)}
                        className="p-2.5 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-xl transition"
                      >
                        <CheckCircle size={20} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};
