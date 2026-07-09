export interface TunedString {
  number: number; // Номер струны (1 — самая тонкая, 6/7/8 — самая толстая)
  note: string; // Название ноты ("E", "A", "C#")
  octave: number; // Музыкальная октава (для точности детектора)
  frequency: number; // Идеальная частота в Герцах (Hz)
}

export interface TuningPreset {
  id: string; // Уникальный ID (понадобится для value в Select / Tabs)
  name: string; // Понятное имя: "Drop C", "Drop E (8-String)"
  stringsCount: 6 | 7 | 8; // Кол-во струн
  strings: TunedString[]; // Массив струн (от 1-й к толстой)
}

export interface TuningStringState {
  activeStringsCount: 6 | 7 | 8;
  selectedPreset: TuningPreset;
  activeStringIndex: number; // Индекс выбранной струны в массиве strings
  isTunerActive: boolean;
}

export interface TuningStringActions {
  setStringsCount: (count: 6 | 7 | 8) => void;
  setPreset: (presetId: string) => void;
  setActiveStringIndex: (index: number) => void;
  nextString: () => void;
  prevString: () => void;
  toggleTuner: () => void;
}

export interface TuningStringStore extends TuningStringState {
  actions: TuningStringActions;
}
