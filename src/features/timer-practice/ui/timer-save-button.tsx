import { Button } from "@/shared";
import { Save } from "lucide-react";

type Props = {
  onClick: () => void;
  disabled: boolean;
};
export const TimerSaveButton = ({ onClick, disabled }: Props) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      className="flex-1 md:flex-none font-semibold px-5 h-10 shadow-sm"
    >
      <Save />
    </Button>
  );
};
