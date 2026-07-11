import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const signUpUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier),
      )
      .unique();

    if (existing) return existing._id;

    // 1. Создаем самого пользователя
    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      role: "user",
      tokenIdentifier: args.tokenIdentifier,
    });

    // 2. Инициализируем его гитарную статистику (Грайнд-старт!)
    await ctx.db.insert("usersStats", {
      userId,
      level: 1,
      currentXp: 0,
      completedExercisesCount: 0,
      completedRiffsCount: 0,
      totalMinutes: 0,
      streak: 0,
    });

    return userId;
  },
});

// Запрос для поиска юзера по его токену сессии
export const getUserByToken = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier),
      )
      .unique();
  },
});
