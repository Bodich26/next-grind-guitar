import { Button } from "@/shared";
import { useToggleTodayActivity } from "../model/use-toggle-today-activity";

export function ToggleTodayButton({ isCompleted }: { isCompleted: boolean }) {
  const { handleToggle, isPending } = useToggleTodayActivity();

  return (
    <Button
      onClick={handleToggle}
      disabled={isPending}
      variant={isCompleted ? "destructive" : "default"}
    >
      {isCompleted ? "Отменить отметку" : "Отметить сегодня 🔥"}
    </Button>
  );
}
