import { v } from "convex/values";
import { mutation } from "../_generated/server";
import { calculateLevel } from "../utils";

export const savePracticeTimer = mutation({
  args: {
    seconds: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    if (args.seconds <= 0) {
      return { success: false, message: "Слишком мало времени" };
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();
    if (!user) return null;

    const earnedXp = Math.floor(args.seconds / 300);
    const today = new Date().toISOString().split("T")[0];

    await ctx.db.insert("practiceSessions", {
      userId: user._id,
      date: today,
      durationSeconds: args.seconds,
      xpEarned: earnedXp,
    });

    const stats = await ctx.db
      .query("usersStats")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    if (stats) {
      const newXp = (stats.currentXp ?? 0) + earnedXp;
      await ctx.db.patch(stats._id, {
        totalSeconds: (stats.totalSeconds ?? 0) + args.seconds,
        currentXp: newXp,
        level: calculateLevel(newXp),
        lastPracticeDate: today,
      });
    } else {
      const initialXp = earnedXp;
      await ctx.db.insert("usersStats", {
        userId: user._id,
        level: calculateLevel(initialXp),
        currentXp: initialXp,
        completedExercisesCount: 0,
        completedRiffsCount: 0,
        totalSeconds: args.seconds,
        streak: 1,
        lastPracticeDate: today,
      });
    }

    return { success: true, earnedXp };
  },
});
