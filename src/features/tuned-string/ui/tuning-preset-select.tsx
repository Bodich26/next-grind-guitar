"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared";
import { TUNING_PRESETS } from "../model/tuning-string-date";
import {
  useTuningStringActions,
  useTuningStringStore,
} from "../model/use-tuning-string-store";

export const TuningPresetSelect = () => {
  const { activeStringsCount, selectedPreset } = useTuningStringStore();
  const { setPreset } = useTuningStringActions();

  const availablePresets = TUNING_PRESETS.filter(
    (preset) => preset.stringsCount === activeStringsCount,
  );

  return (
    <div className="flex flex-col gap-1.5 w-70">
      <Select value={selectedPreset.id} onValueChange={setPreset}>
        <SelectTrigger className="w-full bg-background/50 border-border h-10">
          <SelectValue placeholder="Выберите строй" />
        </SelectTrigger>
        <SelectContent>
          {availablePresets.map((preset) => (
            <SelectItem
              key={preset.id}
              value={preset.id}
              className="cursor-pointer"
            >
              {preset.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
