import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // 1. ПОЛЬЗОВАТЕЛИ
  users: defineTable({
    name: v.string(),
    email: v.string(),
    password: v.optional(v.string()),
    pictureUrl: v.optional(v.string()),
    role: v.string(), // "user" | "admin"
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),

  // 2. БИБЛИОТЕКА УПРАЖНЕНИЙ И РИФФОВ
  exercises: defineTable({
    userId: v.id("users"),
    title: v.string(),
    category: v.string(),
    xp: v.number(),
    type: v.union(v.literal("exercise"), v.literal("riff")),
    isCompleted: v.boolean(),
  }).index("by_user", ["userId"]),

  // 3. ГЛОБАЛЬНАЯ СТАТИСТИКА ПОЛЬЗОВАТЕЛЯ
  usersStats: defineTable({
    userId: v.id("users"),
    level: v.number(), // Уровень гитариста
    currentXp: v.number(), // Текущий опыт
    completedExercisesCount: v.number(), // Сколько всего упражнений выполнил
    completedRiffsCount: v.number(), // Сколько всего риффов выучил
    totalMinutes: v.number(), // Всего минут за гитарой
    streak: v.number(), // Дней подряд 🔥
    lastPracticeDate: v.optional(v.string()), // "YYYY-MM-DD" для расчета комбо
  }).index("by_user", ["userId"]),

  // 4. КАЛЕНДАРЬ АКТИВНОСТИ И ИСТОРИЯ СЕССИЙ
  // Эта таблица отвечает и за автоматический таймер, и за ручные клики по календарю!
  practiceSessions: defineTable({
    userId: v.id("users"),
    date: v.string(), // Дата в формате "YYYY-MM-DD" (например, "2026-07-10")
    durationMinutes: v.number(), // Минуты (если кликнул вручную, поставим 0 или 15)
    xpEarned: v.number(), // ДОБАВЛЕНО: Сколько опыта юзер получил за этот день (например, 50)
  })
    .index("by_user", ["userId"])
    .index("by_user_and_date", ["userId", "date"]), // Индекс для быстрой проверки конкретного дня
});
