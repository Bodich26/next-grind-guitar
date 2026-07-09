import { TuningPreset } from "./tuned-string-type";

export const TUNING_PRESETS: TuningPreset[] = [
  // === 6 СТРУН ===
  {
    id: "6-standard-e",
    name: "6-Str Standard E",
    stringsCount: 6,
    strings: [
      { number: 1, note: "E", octave: 4, frequency: 329.63 },
      { number: 2, note: "B", octave: 3, frequency: 246.94 },
      { number: 3, note: "G", octave: 3, frequency: 196.0 },
      { number: 4, note: "D", octave: 3, frequency: 146.83 },
      { number: 5, note: "A", octave: 2, frequency: 110.0 },
      { number: 6, note: "E", octave: 2, frequency: 82.41 },
    ],
  },
  {
    id: "6-drop-c",
    name: "6-Str Drop C",
    stringsCount: 6,
    strings: [
      { number: 1, note: "D", octave: 4, frequency: 293.66 },
      { number: 2, note: "A", octave: 3, frequency: 220.0 },
      { number: 3, note: "F", octave: 3, frequency: 174.61 },
      { number: 4, note: "C", octave: 3, frequency: 130.81 },
      { number: 5, note: "G", octave: 2, frequency: 98.0 },
      { number: 6, note: "C", octave: 2, frequency: 65.41 }, // Жирный металкор
    ],
  },

  // === 7 СТРУН ===
  {
    id: "7-standard-b",
    name: "7-Str Standard B",
    stringsCount: 7,
    strings: [
      { number: 1, note: "E", octave: 4, frequency: 329.63 },
      { number: 2, note: "B", octave: 3, frequency: 246.94 },
      { number: 3, note: "G", octave: 3, frequency: 196.0 },
      { number: 4, note: "D", octave: 3, frequency: 146.83 },
      { number: 5, note: "A", octave: 2, frequency: 110.0 },
      { number: 6, note: "E", octave: 2, frequency: 82.41 },
      { number: 7, note: "B", octave: 1, frequency: 61.74 },
    ],
  },
  {
    id: "7-drop-a",
    name: "7-Str Drop A",
    stringsCount: 7,
    strings: [
      { number: 1, note: "E", octave: 4, frequency: 329.63 },
      { number: 2, note: "B", octave: 3, frequency: 246.94 },
      { number: 3, note: "G", octave: 3, frequency: 196.0 },
      { number: 4, note: "D", octave: 3, frequency: 146.83 },
      { number: 5, note: "A", octave: 2, frequency: 110.0 },
      { number: 6, note: "E", octave: 2, frequency: 82.41 },
      { number: 7, note: "A", octave: 1, frequency: 55.0 }, // Классика Deathcore
    ],
  },
  {
    id: "7-drop-g",
    name: "7-Str Drop G",
    stringsCount: 7,
    strings: [
      { number: 1, note: "D", octave: 4, frequency: 293.66 },
      { number: 2, note: "A", octave: 3, frequency: 220.0 },
      { number: 3, note: "F", octave: 3, frequency: 174.61 },
      { number: 4, note: "C", octave: 3, frequency: 130.81 },
      { number: 5, note: "G", octave: 2, frequency: 98.0 },
      { number: 6, note: "D", octave: 2, frequency: 73.42 },
      { number: 7, note: "G", octave: 1, frequency: 49.0 }, // Тот самый нижний G
    ],
  },

  // === 8 СТРУН ===
  {
    id: "8-standard-f-sharp",
    name: "8-Str Standard F#",
    stringsCount: 8,
    strings: [
      { number: 1, note: "E", octave: 4, frequency: 329.63 },
      { number: 2, note: "B", octave: 3, frequency: 246.94 },
      { number: 3, note: "G", octave: 3, frequency: 196.0 },
      { number: 4, note: "D", octave: 3, frequency: 146.83 },
      { number: 5, note: "A", octave: 2, frequency: 110.0 },
      { number: 6, note: "E", octave: 2, frequency: 82.41 },
      { number: 7, note: "B", octave: 1, frequency: 61.74 },
      { number: 8, note: "F#", octave: 1, frequency: 46.25 }, // Meshuggah стайл
    ],
  },
  {
    id: "8-drop-e",
    name: "8-Str Drop E",
    stringsCount: 8,
    strings: [
      { number: 1, note: "E", octave: 4, frequency: 329.63 },
      { number: 2, note: "B", octave: 3, frequency: 246.94 },
      { number: 3, note: "G", octave: 3, frequency: 196.0 },
      { number: 4, note: "D", octave: 3, frequency: 146.83 },
      { number: 5, note: "A", octave: 2, frequency: 110.0 },
      { number: 6, note: "E", octave: 2, frequency: 82.41 },
      { number: 7, note: "B", octave: 1, frequency: 61.74 },
      { number: 8, note: "E", octave: 1, frequency: 41.2 }, // Полнейший деструктив
    ],
  },
];
