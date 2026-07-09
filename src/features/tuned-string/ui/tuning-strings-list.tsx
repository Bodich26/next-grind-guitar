import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@/shared";
import {
  useTuningStringActions,
  useTuningStringStore,
} from "../model/use-tuning-string-store";
import { StringsFilter } from "./strings-filter";
import { TuningPresetSelect } from "./tuning-preset-select";
import { TunerVisualizer } from "./tuner-visualizer";
import { TargetTunedButton } from "./target-tuned-button";

export const TuningStringsList = () => {
  const { selectedPreset, activeStringIndex, isTunerActive } =
    useTuningStringStore();
  const { setActiveStringIndex, toggleTuner } = useTuningStringActions();
  const currentTargetFreq =
    selectedPreset.strings[activeStringIndex]?.frequency;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="TunedStrings"
      className="p-5 border border-border bg-card rounded-xl shadow-sm"
    >
      <AccordionItem value="TunedStrings" className="border-none">
        <AccordionTrigger className="hover:no-underline pt-0 text-lg font-semibold tracking-tight">
          Гитарный тюнер
        </AccordionTrigger>

        <AccordionContent className="pb-0">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <StringsFilter />
              <TargetTunedButton
                isTunerActive={isTunerActive}
                toggleTuner={toggleTuner}
              />
              <TuningPresetSelect />
            </div>
            <TunerVisualizer key={currentTargetFreq} />
          </div>
          <div className="flex flex-col gap-2 mt-4 max-h-[250px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            {selectedPreset.strings.map((string, index) => {
              const isActive = index === activeStringIndex;

              return (
                <Button
                  key={string.number}
                  onClick={() => setActiveStringIndex(index)}
                  variant={isActive ? "default" : "outline"}
                  className="w-full justify-between transition-all last:mb-2"
                >
                  <span
                    className={
                      isActive ? "font-semibold" : "text-muted-foreground"
                    }
                  >
                    Струна {string.number}
                  </span>
                  <span className="font-mono font-bold">
                    {string.note}{" "}
                    <span className="text-xs font-normal opacity-80">
                      ({string.frequency} Hz)
                    </span>
                  </span>
                </Button>
              );
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
