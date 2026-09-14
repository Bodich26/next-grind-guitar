import { query, mutation } from "../_generated/server";
import { getTodayString } from "../helpers";

export const getActivityData = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();

    if (!user) return null;

    const days = await ctx.db
      .query("completed_days")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    const stats = await ctx.db
      .query("usersStats")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    return {
      completedDates: days.map((d) => d.date),
      userXp: stats?.currentXp ?? 0,
      currentStreak: stats?.streak ?? 0,
    };
  },
});

export const toggleTodayActivity = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();

    if (!user) return null;

    const today = getTodayString();

    const existingEntry = await ctx.db
      .query("completed_days")
      .withIndex("by_user_and_date", (q) =>
        q.eq("userId", user._id).eq("date", today),
      )
      .unique();

    let stats = await ctx.db
      .query("usersStats")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    if (!stats) {
      const statsId = await ctx.db.insert("usersStats", {
        userId: user._id,
        level: 1,
        currentXp: 0,
        completedExercisesCount: 0,
        completedRiffsCount: 0,
        totalSeconds: 0,
        streak: 0,
        lastPracticeDate: today,
      });
      stats = (await ctx.db.get(statsId))!;
    }

    if (existingEntry) {
      await ctx.db.delete(existingEntry._id);
      const newStreak = Math.max(0, (stats.streak ?? 0) - 1);
      const newXp = (stats.currentXp ?? 0) - 5;

      await ctx.db.patch(stats._id, {
        streak: newStreak,
        currentXp: newXp,
      });

      return {
        success: true,
        message: "Сегодняшний день убран",
        streak: newStreak,
      };
    } else {
      await ctx.db.insert("completed_days", {
        userId: user._id,
        date: today,
      });

      const newStreak = (stats.streak ?? 0) + 1;
      const newXp = (stats.currentXp ?? 0) + 5;
      await ctx.db.patch(stats._id, {
        streak: newStreak,
        lastPracticeDate: today,
        currentXp: newXp,
      });

      return {
        success: true,
        message: "Сегодняшний день добавлен",
        streak: newStreak,
      };
    }
  },
});
