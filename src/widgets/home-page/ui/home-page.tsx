"use client";
import React from "react";
import {
  Button,
  Card,
  ChordPosition,
  Container,
  GuitarChordsDB,
  Input,
  Instrument,
} from "@/shared";
import {
  CalendarIcon,
  CheckCircle,
  Clock,
  Pause,
  Play,
  RotateCcw,
  Search,
} from "lucide-react";
import Chord from "@tombatossals/react-chords/lib/Chord";
import guitarChordsRaw from "@tombatossals/chords-db/lib/guitar.json";
import { TuningStringsList } from "@/features/tuned-string";

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
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [time, setTime] = React.useState(0);
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

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

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => setTime((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

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
    <Container className="py-6 flex flex-col md:flex-row gap-6 min-h-screen bg-background text-foreground">
      {/* Боковая панель (Библиотека) */}
      <Card
        className={`w-full md:w-80 border border-border bg-card text-card-foreground overflow-hidden md:transition-all md:duration-300 rounded-xl ${
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
          {/* Упражнения */}
          <div className="flex flex-col h-80 overflow-hidden">
            <div className="px-3 py-2 text-xs font-bold tracking-wider text-muted-foreground uppercase shrink-0">
              Мои упражнения
            </div>
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
              {exercises
                .filter((ex) => ex.type === "exercise")
                .map((ex) => (
                  <div
                    key={ex.id}
                    className="group bg-muted/40 hover:bg-muted border border-transparent hover:border-border p-3.5 rounded-lg transition-all flex justify-between items-center cursor-pointer"
                    onClick={() => openPlayer(ex)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">
                        {ex.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {ex.category}
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-md text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10 shrink-0 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        completeExercise(ex);
                      }}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </div>

          {/* Рифы */}
          <div className="flex flex-col h-80 overflow-hidden">
            <div className="px-3 py-2 text-xs font-bold tracking-wider text-muted-foreground uppercase shrink-0">
              Изучаемые рифы
            </div>
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
              {exercises
                .filter((ex) => ex.type === "riff")
                .map((ex) => (
                  <div
                    key={ex.id}
                    className="group bg-muted/40 hover:bg-muted border border-transparent hover:border-border p-3.5 rounded-lg transition-all flex justify-between items-center cursor-pointer"
                    onClick={() => console.log(ex)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm truncate">
                        {ex.title}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {ex.category}
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 rounded-md text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10 shrink-0 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(ex);
                      }}
                    >
                      <CheckCircle className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Основной контент */}
      <div className="flex-1 space-y-6 min-w-0">
        {/* Таймер */}
        <Card className="p-4 border border-border bg-card flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-medium text-muted-foreground">
                Практика сегодня
              </div>
              <div className="text-3xl font-mono font-bold tracking-tight">
                {formatTime(time)}
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 md:flex-none font-semibold px-5 h-10 shadow-sm"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 mr-2" />
              ) : (
                <Play className="w-4 h-4 mr-2" />
              )}
              {isPlaying ? "Пауза" : "Начать"}
            </Button>
            <Button
              onClick={() => {
                setTime(0);
                setIsPlaying(false);
              }}
              variant="outline"
              size="icon"
              className="h-10 w-10 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </Card>

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
          <Card className="lg:col-span-5 p-5 border border-border bg-card rounded-xl shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">
                Прогресс уровня
              </h3>
              <div className="text-5xl font-mono font-black tracking-tight text-foreground">
                {level}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                текущий уровень гитариста
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1.5">
                <span>Прогресс</span>
                <span>68%</span>
              </div>
              {/* Используем системную переменную primary для заливки прогресса */}
              <div className="h-2.5 bg-muted border border-border/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 rounded-full"
                  style={{ width: "68%" }}
                />
              </div>
            </div>
          </Card>
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
