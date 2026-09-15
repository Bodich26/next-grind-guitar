export function getTodayString(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) return 0;

  // 1. Сортируем даты от самых свежих к самым старым
  const sorted = [...completedDates].sort((a, b) => (a < b ? 1 : -1));

  // Превращаем строку YYYY-MM-DD в локальную дату (без часов и UTC)
  const parseLocalDate = (str: string) => {
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d).getTime();
  };

  const todayMs = parseLocalDate(getTodayString());
  const latestMs = parseLocalDate(sorted[0]);

  const ONE_DAY_MS = 86400000;
  const diffFromToday = (todayMs - latestMs) / ONE_DAY_MS;

  // 2. Если последняя отметка была РАНОШЕ чем вчера (diff > 1), стрик сгорел
  if (diffFromToday > 1) return 0;

  let streak = 1;

  // 3. Идем по цепочке и проверяем пропуски
  for (let i = 0; i < sorted.length - 1; i++) {
    const currentDate = parseLocalDate(sorted[i]);
    const nextDate = parseLocalDate(sorted[i + 1]);

    const diff = (currentDate - nextDate) / ONE_DAY_MS;

    if (diff === 1) {
      streak++;
    } else if (diff > 1) {
      // Нашли пропуск — останавливаем цикл!
      break;
    }
  }

  return streak;
}
