import { v } from "convex/values";
import { query, mutation } from "../_generated/server";

export const getExercises = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();

    if (!user) return null;

    return await ctx.db
      .query("exercises")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const deleteExercises = mutation({
  args: {
    _id: v.id("exercises"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();
    if (!user) return null;

    const exercise = await ctx.db.get(args._id);
    if (!exercise) {
      return { success: false, message: "Задача не найдена" };
    }

    if (exercise.userId !== user._id) {
      return {
        success: false,
        message: "Нет прав на удаление этой задачи",
      };
    }

    await ctx.db.delete(args._id);

    return { success: true, message: "Задача успешно удалена" };
  },
});
