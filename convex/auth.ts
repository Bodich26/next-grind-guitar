// convex/auth.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// 1. Мутация регистрации: теперь принимает еще и хэш пароля
export const signUpUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.optional(v.string()), // <-- принимаем пароль
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

    const userId = await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      password: args.password, // <-- сохраняем хэш пароля в базу
      role: "user",
      tokenIdentifier: args.tokenIdentifier,
    });

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

// 2. Новый запрос для Better-Auth: поиск пользователя по Email при входе
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    // Ищем юзера по email
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();
  },
});
