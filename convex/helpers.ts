export function getTodayString(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}
