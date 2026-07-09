import { Button } from "@/shared";
import { Power } from "lucide-react";

type Props = {
  isTunerActive: boolean;
  toggleTuner: () => void;
};
export const TargetTunedButton = ({ isTunerActive, toggleTuner }: Props) => {
  return (
    <Button
      size="sm"
      variant={isTunerActive ? "default" : "outline"}
      onClick={toggleTuner}
      className={`h-8 gap-1.5 px-2.5 text-xs font-semibold rounded-md transition-all ${
        isTunerActive ? "shadow-sm shadow-primary/20" : "text-muted-foreground"
      }`}
    >
      <Power className="w-3.5 h-3.5" />
      {isTunerActive ? "Вкл" : "Выкл"}
    </Button>
  );
};
