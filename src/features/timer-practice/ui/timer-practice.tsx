"use client";
import React from "react";
import { Card } from "@/shared";
import { Clock } from "lucide-react";
import { TimerResetButton } from "./timer-reset-button";
import { TimerToggleButton } from "./timer-toggle-button";
import { TimerSaveButton } from "./timer-save-button";
import { useTimerSavingPractice } from "../model/use-timer-saving-practice";

export const TimerPractice = () => {
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [time, setTime] = React.useState<number>(0);
  const [isSaving, setIsSaving] = React.useState<boolean>(false);

  const { handleSave } = useTimerSavingPractice({
    time,
    setTime,
    setIsPlaying,
    setIsSaving,
  });

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

  return (
    <Card className="p-4 border border-border bg-card flex flex-col md:flex-row items-center justify-between gap-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-xl text-primary">
          <Clock className="w-6 h-6" />
        </div>
        <div>
          <div className="text-xs font-medium text-muted-foreground">
            Практика сегодня
          </div>
          <div className="text-3xl font-mono font-bold tracking-tight">
            {formatTime(time)}
          </div>
        </div>
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        {time > 0 && (
          <TimerSaveButton onClick={handleSave} disabled={isSaving} />
        )}

        <TimerToggleButton setIsPlaying={setIsPlaying} isPlaying={isPlaying} />
        <TimerResetButton setTime={setTime} setIsPlaying={setIsPlaying} />
      </div>
    </Card>
  );
};
