import { Button } from "@/shared";
import { useToggleTodayActivity } from "../model/use-toggle-today-activity";
import { toast } from "sonner";

export function ToggleTodayButton({ isCompleted }: { isCompleted: boolean }) {
  const { handleToggle, isPending } = useToggleTodayActivity();

  const handleClick = async () => {
    const res = await handleToggle();
    if (res?.success) {
      toast.success(res.message || "Сегодняшний день добавлен");
    } else {
      toast.error(res?.message || "Сегодняшний день убран");
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isPending}
      variant={isCompleted ? "destructive" : "default"}
    >
      {isCompleted ? "Отменить отметку" : "Отметить сегодня 🔥"}
    </Button>
  );
}
