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
      level: stats?.level ?? 1,
      streak: stats?.streak ?? 0,
    };
  },
});
