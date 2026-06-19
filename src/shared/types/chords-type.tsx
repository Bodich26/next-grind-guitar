// types/chords.ts
export interface ChordPosition {
  frets: number[]; // массив ладов для каждой струны
  fingers: number[]; // массив пальцев
  barres?: number[]; // лады с баррэ
  capo?: boolean; // есть ли каподастр
  baseFret?: number; // базовый лад
}

export interface ChordDBItem {
  suffix: string;
  positions: ChordPosition[];
}

export interface GuitarChordsDB {
  chords: Record<string, ChordDBItem[]>;
  keys: string[];
  suffixes: string[];
  main: {
    strings: number;
    fretsOnChord: number;
    name: string;
    numberOfChords: number;
  };
  tunings: {
    standard: string[];
  };
}

export interface Instrument {
  strings: number;
  fretsOnChord: number;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  keys?: any[];
  tunings: { standard: string[] };
}
