import { createClient } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import {
  requireRunMutationCtx,
  type GenericCtx,
} from "@convex-dev/better-auth/utils";
import type { BetterAuthOptions } from "better-auth";
import { betterAuth } from "better-auth";

import { components, internal } from "../_generated/api";
import type { DataModel } from "../_generated/dataModel";
import authConfig from "../auth.config";
import schema from "./schema";

const siteUrl =
  process.env.SITE_URL ||
  process.env.BETTER_AUTH_URL ||
  "http://localhost:3000";

export const authComponent = createClient<DataModel, typeof schema>(
  components.betterAuth,
  {
    local: { schema },
    verbose: false,
  },
);

export const createAuthOptions = (ctx: GenericCtx<DataModel>) => {
  return {
    appName: "My App",
    baseURL: siteUrl,
    secret: process.env.BETTER_AUTH_SECRET,
    trustedOrigins: [
      "https://next-grind-guitar.vercel.app",
      "http://localhost:3000",
    ],
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [convex({ authConfig })],

    databaseHooks: {
      user: {
        create: {
          after: async (user) => {
            await requireRunMutationCtx(ctx).runMutation(
              internal.functions.users.createUserProfileAfterSignup,
              {
                name: user.name,
                tokenIdentifier: user.id,
                pictureUrl: user.image || undefined,
              },
            );
          },
        },
      },
    },
  } satisfies BetterAuthOptions;
};

export const options = createAuthOptions({} as GenericCtx<DataModel>);
export const createAuth = (ctx: GenericCtx<DataModel>) => {
  return betterAuth(createAuthOptions(ctx));
};
