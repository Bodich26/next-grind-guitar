import { Card, ErrorMessage } from "@/shared";
import { useGeneralStatistics } from "../model/use-general-statistics";
import { GeneralStatisticsSkeleton } from "./general-statistics-skeleton";

export const GeneralStatistics = () => {
  const userStats = useGeneralStatistics();

  if (userStats.isLoading) {
    return <GeneralStatisticsSkeleton />;
  }

  if (userStats.isError) {
    return (
      <Card className="lg:col-span-5 p-5 border border-border bg-card rounded-xl shadow-sm">
        <ErrorMessage message="Ошибка получения статистики" />
      </Card>
    );
  }

  return (
    <Card className="p-5 border border-border bg-card rounded-xl shadow-sm">
      <h3 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-6">
        Общая статистика
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-4 bg-muted/20 border border-border/60 rounded-xl">
          <div className="text-3xl font-mono font-bold text-foreground">
            {userStats.formattedTotalTime}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            часов на гитаре
          </div>
        </div>
        <div className="p-4 bg-muted/20 border border-border/60 rounded-xl">
          <div className="text-3xl font-mono font-bold text-foreground">
            {userStats.completedExercises}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            упражнений выполнено
          </div>
        </div>
        <div className="p-4 bg-muted/20 border border-border/60 rounded-xl">
          <div className="text-3xl font-mono font-bold text-foreground">
            {userStats.riffsLearned}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            рифов изучено
          </div>
        </div>
      </div>
    </Card>
  );
};
