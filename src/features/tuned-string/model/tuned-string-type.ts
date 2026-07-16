export interface TunedString {
  number: number;
  note: string;
  octave: number;
  frequency: number;
}
export interface TuningPreset {
  id: string;
  name: string;
  stringsCount: 4 | 6 | 7 | 8;
  strings: TunedString[];
}
export interface TuningStringState {
  activeStringsCount: 4 | 6 | 7 | 8;
  selectedPreset: TuningPreset;
  activeStringIndex: number;
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
