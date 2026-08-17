import { useMutation } from "convex/react";
import { api } from "@/../convex/_generated/api";

type Props = {
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSaving: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useTimerSavingPractice = ({
  time,
  setTime,
  setIsPlaying,
  setIsSaving,
}: Props) => {
  const saveTimer = useMutation(
    api.functions.savePracticeTimer.savePracticeTimer,
  );

  const handleSave = async () => {
    if (time <= 0) return;

    try {
      setIsPlaying(false);
      setIsSaving(true);

      const result = await saveTimer({ seconds: time });

      if (result && result.success) {
        setTime(0);
      }

      return result;
    } catch (error) {
      console.error("Ошибка при сохранении практики:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return {
    setIsPlaying,
    time,
    handleSave,
  };
};
