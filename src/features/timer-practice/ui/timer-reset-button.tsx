import { Button } from "@/shared";
import { RotateCcw } from "lucide-react";

type Props = {
  setTime: (time: number) => void;
  setIsPlaying: (val: boolean) => void;
};
export const TimerResetButton = ({ setTime, setIsPlaying }: Props) => {
  return (
    <Button
      onClick={() => {
        setTime(0);
        setIsPlaying(false);
      }}
      variant="outline"
      size="icon"
      className="h-10 w-10 text-muted-foreground hover:text-foreground"
    >
      <RotateCcw className="w-4 h-4" />
    </Button>
  );
};
