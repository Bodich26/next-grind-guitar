export interface ActivityCalendarProps {
  completedDates: string[];
  isTodayCompleted: boolean;
  onToggleToday?: () => void;
  disabled?: boolean;
}

export interface ActivityData {
  completedDates: string[];
  streak: number;
  points: number;
}
