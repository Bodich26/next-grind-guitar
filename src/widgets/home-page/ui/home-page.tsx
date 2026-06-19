"use client";
import React from "react";
import {
  Card,
  ChordPosition,
  Container,
  GuitarChordsDB,
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
                    onClick={() => openPlayer(ex)}
                  >
                    <div className="flex-1">
                      <div className="font-medium text-[15px]">{ex.title}</div>
                      <div className="text-xs text-zinc-500">{ex.category}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => completeExercise(ex)}
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

      <Card className="flex-1 space-y-6">
        {/* Таймер */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 md:p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <Clock className="text-violet-400" size={36} />
            <div>
              <div className="text-sm text-zinc-400">Практика сегодня</div>
              <div className="text-4xl font-mono font-bold tracking-tighter">
                {formatTime(time)}
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 md:flex-none px-4 py-2 bg-white text-black font-semibold rounded-xl hover:bg-amber-400 transition flex items-center justify-center gap-2"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              {isPlaying ? "Пауза" : "Начать"}
            </button>
            <button
              onClick={() => {
                setTime(0);
                setIsPlaying(false);
              }}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition"
            >
              <RotateCcw size={24} />
            </button>
          </div>
        </div>

        {/* Библиотека аккордов */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
          <h2 className="text-2xl font-bold mb-4">Поиск аккордов</h2>

          <div className="relative">
            <Search className="absolute left-3 top-2 text-zinc-500" size={24} />
            <input
              type="text"
              placeholder="Введите аккорд (например: C, Am, Fmaj7, Dm...)"
              value={chordSearch}
              onChange={(e) => setChordSearch(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 pl-11 py-2 text-md rounded-xl focus:outline-none focus:border-violet-500 placeholder-zinc-500"
            />
          </div>

          {/* Результаты поиска */}
          {chordSearch.length > 0 && (
            <div className="space-y-6 mt-8 overflow-auto h-80">
              {filteredChords.length > 0 ? (
                filteredChords.map((chord, index) => (
                  <div
                    key={`${chord.name}-${index}`}
                    className="bg-zinc-950 border border-zinc-800 rounded-xl p-5"
                  >
                    <h3 className="text-3xl font-bold text-center mb-6">
                      {chord.name}
                    </h3>
                    <div className="flex flex-wrap gap-6 justify-center">
                      {chord.positions.map(
                        (position: ChordPosition, posIndex: number) => (
                          <div
                            key={posIndex}
                            className="bg-zinc-900 rounded-xl p-4 hover:border-violet-500 border border-transparent transition"
                            onClick={() => setSelectedChord(position)}
                          >
                            <Chord
                              chord={position}
                              instrument={instrument}
                              size={130}
                              lite={false}
                            />

                            <div className="text-center text-sm text-zinc-500 mt-2">
                              Позиция {posIndex + 1}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center mb-8 text-zinc-400">
                  Аккорд не найден
                </div>
              )}
            </div>
          )}
        </div>

        {/* Календарь + Прогресс + Статистика */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <div className="flex justify-between mb-5">
              <h3 className="font-semibold flex items-center gap-2 text-lg">
                <CalendarIcon size={22} /> Активность
              </h3>
              <span className="text-emerald-400 font-medium">
                {10} дней подряд 🔥
              </span>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium ${
                    i % 3 === 0 || i % 5 === 0
                      ? "bg-emerald-500/30 text-emerald-400"
                      : "bg-zinc-950 hover:bg-zinc-800"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="font-semibold mb-4">Прогресс уровня</h3>
            <div className="text-6xl font-bold mb-1">{3}</div>
            <div className="text-zinc-400 mb-6">текущий уровень</div>
            <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-[68%] bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
            </div>
          </div>
        </div>

        {/* Общая статистика */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-6">Общая статистика</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold">{2223}</div>
              <div className="text-zinc-400">часов на гитаре</div>
            </div>
            <div>
              <div className="text-4xl font-bold">47</div>
              <div className="text-zinc-400">упражнений выполнено</div>
            </div>
            <div>
              <div className="text-4xl font-bold">19</div>
              <div className="text-zinc-400">рифов изучено</div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};
