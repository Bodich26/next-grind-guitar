import { betterAuth } from "better-auth";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../convex/_generated/api";

const convexServer = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  emailAndPassword: {
    enabled: true,
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await convexServer.mutation(api.auth.signUpUser, {
            name: user.name,
            email: user.email,
            password: user.password as string | undefined,
            tokenIdentifier: user.id,
          });
        },
      },
      find: {
        before: async (data: { email?: string; [key: string]: any }) => {
          if (data && "email" in data && typeof data.email === "string") {
            const convexUser = await convexServer.query(
              api.auth.getUserByEmail,
              {
                email: data.email,
              },
            );

            if (convexUser) {
              return {
                user: {
                  id: convexUser.tokenIdentifier,
                  name: convexUser.name,
                  email: convexUser.email,
                  password: convexUser.password,
                  role: convexUser.role,
                  emailVerified: true,
                  createdAt: new Date(),
                  updatedAt: new Date(),
                },
              };
            }
          }
        },
      },
    },
  },
});
