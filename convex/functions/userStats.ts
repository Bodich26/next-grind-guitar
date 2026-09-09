import { query } from "../_generated/server";
export const getHeaderData = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();

    if (!user) return null;

    const stats = await ctx.db
      .query("usersStats")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    return {
      name: user.name,
      pictureUrl: user.pictureUrl,
      role: user.role,
      streak: stats?.streak ?? 0,
    };
  },
});

export const getUserXp = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();

    if (!user) return null;

    const stats = await ctx.db
      .query("usersStats")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    return stats?.currentXp ?? 0;
  },
});

export const getUserStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", identity.subject))
      .unique();

    if (!user) return null;

    const stats = await ctx.db
      .query("usersStats")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .unique();

    return {
      totalSeconds: stats?.totalSeconds,
      completedExercises: stats?.completedExercisesCount,
      learnedRiffs: stats?.completedRiffsCount,
    };
  },
});
