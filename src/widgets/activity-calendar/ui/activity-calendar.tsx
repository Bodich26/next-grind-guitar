import {
  ActivityCalendarView,
  StreakBadge,
  useActivityData,
} from "@/entities/activity";
import { ToggleTodayButton } from "@/features/toggle-today-activity";
import { Card, ErrorMessage } from "@/shared";
import { CalendarIcon } from "lucide-react";
import { ActivityCalendarSkeleton } from "./activity-calendar-skeleton";

export const ActivityCalendar = () => {
  const activity = useActivityData();

  if (activity.isLoading) {
    return <ActivityCalendarSkeleton />;
  }

  if (activity.isError) {
    return (
      <Card className="lg:col-span-5 p-5 border border-border bg-card rounded-xl shadow-sm">
        <ErrorMessage message="Ошибка получения календаря" />
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-7 p-5 border border-border bg-card rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-1">
        <h3 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground">
          <CalendarIcon className="w-4 h-4 text-primary" /> Активность
        </h3>
        <StreakBadge streak={activity.currentStreak} />
      </div>
      <ToggleTodayButton isCompleted={activity.isTodayCompleted} />
      <ActivityCalendarView
        completedDates={activity.completedDates}
        isTodayCompleted={activity.isTodayCompleted}
      />
    </Card>
  );
};
