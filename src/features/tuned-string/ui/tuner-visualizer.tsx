"use client";
import { useTunedCalculation } from "../model/use-tuned-calculation";

export const TunerVisualizer = () => {
  const {
    isPerfect,
    targetString,
    liveFreq,
    displayFreq,
    targetFreq,
    arrowPositionPercent,
    isFlat,
    isSharp,
  } = useTunedCalculation();
  return (
    <div>
      <div className="flex items-center justify-between w-full mb-3 px-1">
        <div className="flex items-baseline gap-1">
          <span
            className={`text-4xl font-black tracking-tight transition-colors ${
              isPerfect ? "text-primary" : "text-foreground"
            }`}
          >
            {targetString.note}
          </span>
          <span className="text-sm font-bold text-muted-foreground">
            {targetString.octave}
          </span>
        </div>

        <div className="text-xs font-mono text-muted-foreground">
          <span
            className={
              isPerfect ? "text-primary font-bold" : "text-foreground/80"
            }
          >
            {liveFreq !== null ? displayFreq.toFixed(2) : "---"}
          </span>
          <span className="opacity-40"> / {targetFreq.toFixed(2)} Hz</span>
        </div>
      </div>

      {/* МИНИ-ШКАЛА ТЮНЕРА */}
      <div className="w-full relative h-5 flex items-center mb-2 select-none">
        {/* Центр */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 h-full w-[1.5px] z-10 ${
            isPerfect ? "bg-primary" : "bg-muted-foreground/30"
          }`}
        />

        {/* Тонкая линия шкалы */}
        <div className="w-full h-1 bg-muted rounded-full" />

        {/* Маленькая стрелка-указатель */}
        <div
          className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all ease-out h-full"
          style={{ left: `${arrowPositionPercent}%` }}
        >
          <div
            className={`w-2 h-2 rounded-full ${isPerfect ? "bg-primary" : "bg-foreground"}`}
          />
          <div
            className={`w-[1.5px] h-3 mt-0.5 ${isPerfect ? "bg-primary" : "bg-foreground"}`}
          />
        </div>
      </div>

      {/* Компактный статус текста */}
      <div className="text-[10px] uppercase font-bold tracking-wider h-4 text-center">
        {liveFreq === null && (
          <span className="text-muted-foreground/40 animate-pulse">
            Слушаю струну...
          </span>
        )}
        {isPerfect && <span className="text-primary">Идеально</span>}
        {isFlat && <span className="text-destructive/80">Низит (натяни)</span>}
        {isSharp && <span className="text-amber-500/80">Высит (ослабь)</span>}
      </div>
    </div>
  );
};
