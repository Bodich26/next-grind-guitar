"use client";
import React from "react";
import {
  Card,
  ChordPosition,
  Container,
  GuitarChordsDB,
  Input,
  Instrument,
} from "@/shared";
import { CalendarIcon, Search } from "lucide-react";
import Chord from "@tombatossals/react-chords/lib/Chord";
import guitarChordsRaw from "@tombatossals/chords-db/lib/guitar.json";
import { TuningStringsList } from "@/features/tuned-string";
import { ExercisesList } from "@/widgets/exercises-list";
import { TimerPractice } from "@/features/timer-practice";
import { ProgressionItem } from "@/entities/progression";

export const HomePage = () => {
  const [streak] = React.useState(14);
  const [totalHours] = React.useState(87);
  const [level] = React.useState(12);
  const [points, setPoints] = React.useState(2450);

  const [selectedExercise, setSelectedExercise] = React.useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = React.useState(false);

  const [selectedChord, setSelectedChord] =
    React.useState<ChordPosition | null>(null);
  const [chordSearch, setChordSearch] = React.useState("");
  const guitarChords = guitarChordsRaw as GuitarChordsDB;

  const instrument: Instrument = {
    strings: 6,
    fretsOnChord: 5,
    name: "Guitar",
    keys: [],
    tunings: { standard: ["E", "A", "D", "G", "B", "E"] },
  };

  // Данные аккордов
  const allChords = React.useMemo(() => {
    return Object.entries(guitarChords.chords).flatMap(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ([key, chordList]: [string, any]) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        chordList.map((chord: any) => ({
          name: `${key}${chord.suffix}`,
          key,
          suffix: chord.suffix,
          positions: chord.positions,
        })),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredChords = React.useMemo(() => {
    if (!chordSearch.trim()) return [];

    const searchTerm = chordSearch.toLowerCase().trim();

    return allChords
      .filter((chord) => chord.name.toLowerCase().includes(searchTerm))
      .slice(0, 50);
  }, [chordSearch, allChords]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openPlayer = (exercise: any) => {
    setSelectedExercise(exercise);
    setIsPlayerOpen(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const completeExercise = (exercise: any) => {
    setPoints((prev) => prev + exercise.xp);
    alert(`Упражнение "${exercise.title}" завершено! +${exercise.xp} XP`);
  };

  return (
    <Container className="py-6 flex flex-col md:flex-row items-stretch md:items-start gap-6 min-h-screen bg-background text-foreground">
      <ExercisesList />
      {/* Основной контент */}
      <div className="flex-1 space-y-6 min-w-0">
        <TimerPractice />
        <TuningStringsList />

        {/* Библиотека аккордов */}
        <Card className="p-5 border border-border bg-card rounded-xl shadow-sm">
          <h3 className="text-lg font-bold tracking-tight">Поиск аккордов</h3>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Введите аккорд (например: C, Am, Fmaj7...)"
              value={chordSearch}
              onChange={(e) => setChordSearch(e.target.value)}
              className="pl-9 bg-muted/30 focus-visible:ring-primary border-border h-10 rounded-lg placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Результаты поиска */}
          {chordSearch.length > 0 && (
            <div className="space-y-4 mt-6 overflow-auto h-80 pr-1 custom-scrollbar">
              {filteredChords.length > 0 ? (
                filteredChords.map((chord, index) => (
                  <div
                    key={`${chord.name}-${index}`}
                    className="bg-muted/20 border border-border rounded-xl p-4"
                  >
                    <h3 className="text-xl font-bold font-mono text-center mb-4 text-primary">
                      {chord.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 justify-center">
                      {chord.positions.map(
                        (position: ChordPosition, posIndex: number) => (
                          <div
                            key={posIndex}
                            className="bg-card rounded-lg p-3 border border-border hover:border-primary/50 transition shadow-sm cursor-pointer"
                            onClick={() => setSelectedChord(position)}
                          >
                            {/* Инвертируем цвета для SVG аккордов под темную тему */}
                            <div className="dark:invert dark:brightness-90">
                              <Chord
                                chord={position}
                                instrument={instrument}
                                size={120}
                                lite={false}
                              />
                            </div>
                            <div className="text-center text-[11px] text-muted-foreground font-medium mt-2">
                              Позиция {posIndex + 1}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  Аккорд не найден
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Сетка: Календарь + Прогресс */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Активность (Календарь) */}
          <Card className="lg:col-span-7 p-5 border border-border bg-card rounded-xl shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
                <CalendarIcon className="w-4 h-4 text-primary" /> Активность
              </h3>
              <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-full">
                {streak} дней подряд 🔥
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: 28 }).map((_, i) => {
                const isActive = i % 3 === 0 || i % 5 === 0;
                return (
                  <div
                    key={i}
                    className={`aspect-square rounded-md flex items-center justify-center text-xs font-bold transition-all border ${
                      isActive
                        ? "bg-primary/20 text-primary border-primary/30"
                        : "bg-muted/40 hover:bg-muted border-transparent text-muted-foreground"
                    }`}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Уровень */}
          <ProgressionItem />
        </div>

        {/* Статистика */}
        <Card className="p-5 border border-border bg-card rounded-xl shadow-sm">
          <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-6">
            Общая статистика
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-4 bg-muted/20 border border-border/60 rounded-xl">
              <div className="text-3xl font-mono font-bold text-foreground">
                {totalHours}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                часов на гитаре
              </div>
            </div>
            <div className="p-4 bg-muted/20 border border-border/60 rounded-xl">
              <div className="text-3xl font-mono font-bold text-foreground">
                47
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                упражнений выполнено
              </div>
            </div>
            <div className="p-4 bg-muted/20 border border-border/60 rounded-xl">
              <div className="text-3xl font-mono font-bold text-foreground">
                19
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                рифов изучено
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Container>
  );
};
