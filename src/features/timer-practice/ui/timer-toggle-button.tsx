import { Button } from "@/shared";
import { Pause, Play } from "lucide-react";

type Props = {
  setIsPlaying: (val: boolean) => void;
  isPlaying: boolean;
};
export const TimerToggleButton = ({ setIsPlaying, isPlaying }: Props) => {
  return (
    <Button
      onClick={() => setIsPlaying(!isPlaying)}
      className="flex-1 md:flex-none font-semibold px-5 h-10 shadow-sm"
    >
      {isPlaying ? (
        <Pause className="w-4 h-4 mr-2" />
      ) : (
        <Play className="w-4 h-4 mr-2" />
      )}
      {isPlaying ? "Пауза" : "Начать"}
    </Button>
  );
};
