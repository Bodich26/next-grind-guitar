import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    pictureUrl: v.optional(v.string()),
    role: v.union(v.literal("user"), v.literal("admin")),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),

  exercises: defineTable({
    userId: v.id("users"),
    title: v.string(),
    category: v.string(),
    xp: v.number(),
    type: v.union(v.literal("exercise"), v.literal("riff")),
    isCompleted: v.boolean(),
    link: v.string(),
  }).index("by_user", ["userId"]),

  usersStats: defineTable({
    userId: v.id("users"),
    level: v.number(),
    currentXp: v.number(),
    completedExercisesCount: v.number(),
    completedRiffsCount: v.number(),
    totalMinutes: v.number(),
    streak: v.number(),
    lastPracticeDate: v.optional(v.string()),
  }).index("by_user", ["userId"]),

  practiceSessions: defineTable({
    userId: v.id("users"),
    date: v.string(),
    durationMinutes: v.number(),
    xpEarned: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_date", ["userId", "date"]),
});
