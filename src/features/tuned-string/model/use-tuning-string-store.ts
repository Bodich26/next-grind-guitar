import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { TUNING_PRESETS } from "./tuning-string-date";
import { TuningStringState, TuningStringStore } from "./tuned-string-type";

const defaultState: TuningStringState = {
  activeStringsCount: 6,
  selectedPreset: TUNING_PRESETS[0],
  activeStringIndex: 0,
  isTunerActive: false,
};

export const useTuningStringStore = create<TuningStringStore>()(
  devtools(
    (set) => ({
      ...defaultState,
      actions: {
        toggleTuner: () =>
          set((state) => ({ isTunerActive: !state.isTunerActive })),
        setStringsCount: (count) =>
          set((state) => {
            const firstPresetForCount =
              TUNING_PRESETS.find((p) => p.stringsCount === count) ||
              TUNING_PRESETS[0];
            return {
              activeStringsCount: count,
              selectedPreset: firstPresetForCount,
              activeStringIndex: 0,
            };
          }),
        setPreset: (presetId) =>
          set((state) => {
            const preset = TUNING_PRESETS.find((p) => p.id === presetId);
            if (!preset) return {};
            return {
              selectedPreset: preset,
              activeStringsCount: preset.stringsCount,
              activeStringIndex: 0,
            };
          }),
        setActiveStringIndex: (index) =>
          set((state) => {
            if (index < 0 || index >= state.selectedPreset.strings.length)
              return {};
            return { activeStringIndex: index };
          }),
        nextString: () =>
          set((state) => {
            const nextIndex = state.activeStringIndex + 1;
            if (nextIndex >= state.selectedPreset.strings.length) return {};
            return { activeStringIndex: nextIndex };
          }),
        prevString: () =>
          set((state) => {
            const prevIndex = state.activeStringIndex - 1;
            if (prevIndex < 0) return {};
            return { activeStringIndex: prevIndex };
          }),
      },
    }),
    { name: "TuningStringStore" },
  ),
);

export const useTuningStringActions = () =>
  useTuningStringStore((state) => state.actions);
