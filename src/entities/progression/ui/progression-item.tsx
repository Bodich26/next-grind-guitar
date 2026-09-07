import { Card, ErrorMessage } from "@/shared";
import { useProgression } from "../model/use-progression";
import { ProgressionSkeleton } from "./progression-skeleton";

export const ProgressionItem = () => {
  const progression = useProgression();

  if (progression.isLoading) {
    return <ProgressionSkeleton />;
  }

  if (progression.isError) {
    return (
      <Card className="lg:col-span-5 p-5 border border-border bg-card rounded-xl shadow-sm">
        <ErrorMessage message="Ошибка получения уровня" />
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-5 p-5 border border-border bg-card rounded-xl shadow-sm flex flex-col justify-between">
      <div>
        <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-2">
          Прогресс уровня
        </h3>
        <div className="text-5xl font-mono font-black tracking-tight text-foreground">
          {progression.level}
        </div>
        <div className="text-md text-muted-foreground mt-1">
          текущий уровень гитариста
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between text-xs font-medium text-muted-foreground mb-1.5">
          <span className="text-sm font-bold">{progression.progressXp} xp</span>
          <span className="text-sm font-bold">
            {progression.xpForNextLevel} xp
          </span>
        </div>
        <div className="h-2.5 bg-muted border border-border/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 rounded-full"
            style={{ width: `${progression.progressPercent}%` }}
          />
        </div>
        <p className="text-md mt-2 text-muted-foreground">
          Всего xp на аккаунте {progression.currentXp}
        </p>
      </div>
    </Card>
  );
};
