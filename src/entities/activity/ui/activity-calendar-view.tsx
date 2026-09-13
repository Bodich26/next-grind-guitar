"use client";
import * as React from "react";
import { Calendar, getTodayString } from "@/shared";
import { ActivityCalendarProps } from "../model/activity-type";

export function ActivityCalendarView({
  completedDates,
  onToggleToday,
  disabled,
}: ActivityCalendarProps) {
  const today = new Date();
  const todayStr = getTodayString();

  const completedDateObjects = React.useMemo(
    () => completedDates.map((d) => new Date(d)),
    [completedDates],
  );

  return (
    <Calendar
      mode="single"
      selected={today}
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
        completed: "bg-green-500 text-white font-bold rounded-md",
      }}
      onDayClick={(date) => {
        const dateStr = getTodayString(date);
        if (dateStr === todayStr && onToggleToday) {
          onToggleToday();
        }
      }}
    />
  );
}
