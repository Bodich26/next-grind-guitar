import { getCentsOff } from "@/shared";
import { useAudioTuner } from "./use-audio-tuner";
import { useTuningStringStore } from "./use-tuning-string-store";

export const useTunedCalculation = () => {
  const { selectedPreset, activeStringIndex, isTunerActive } =
    useTuningStringStore();

  const targetString = selectedPreset.strings[activeStringIndex];
  const targetFreq = targetString.frequency;

  const liveFreq = useAudioTuner(isTunerActive, targetFreq);
  const displayFreq = liveFreq !== null ? liveFreq : targetFreq;

  const centsOff = getCentsOff(displayFreq, targetFreq);
  const clampedCents = Math.max(-50, Math.min(50, centsOff));

  const arrowPositionPercent =
    isTunerActive && liveFreq !== null ? ((clampedCents + 50) / 100) * 100 : 50;

  const isPerfect = liveFreq !== null && Math.abs(centsOff) <= 2;
  const isSharp = liveFreq !== null && centsOff > 2;
  const isFlat = liveFreq !== null && centsOff < -2;

  return {
    isPerfect,
    targetString,
    liveFreq,
    displayFreq,
    targetFreq,
    arrowPositionPercent,
    isSharp,
    isFlat,
  };
};
