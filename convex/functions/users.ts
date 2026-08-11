import { internalMutation } from "../_generated/server";
import { v } from "convex/values";

export const createUserProfileAfterSignup = internalMutation({
  args: {
    name: v.string(),
    tokenIdentifier: v.string(),
    pictureUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await ctx.db.insert("users", {
      name: args.name,
      role: "user",
      tokenIdentifier: args.tokenIdentifier,
      pictureUrl: args.pictureUrl,
    });

    await ctx.db.insert("usersStats", {
      userId: userId,
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
