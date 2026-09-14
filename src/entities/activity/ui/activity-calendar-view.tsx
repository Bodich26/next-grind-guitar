"use client";
import * as React from "react";
import { Calendar, getTodayString } from "@/shared";
import { ActivityCalendarProps } from "../model/activity-type";

export function ActivityCalendarView({
  completedDates,
  onToggleToday,
  disabled,
}: ActivityCalendarProps) {
  const todayStr = getTodayString();

  const completedDateObjects = React.useMemo(
    () => completedDates.map((d) => new Date(d)),
    [completedDates],
  );

  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      className="rounded-lg border w-full bg-muted/20"
      disabled={(date) => {
        const dateStr = getTodayString(date);
        return dateStr !== todayStr || Boolean(disabled);
      }}
      modifiers={{
        completed: completedDateObjects,
      }}
      modifiersClassNames={{
        completed: "bg-primary text-white rounded-lg",
        selected: "rounded-lg! ",
      }}
    />
  );
}
