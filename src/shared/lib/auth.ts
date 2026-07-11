import { betterAuth } from "better-auth";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/../convex/_generated/api";

const convexServer = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  // Включаем вход по почте и паролю
  emailAndPassword: {
    enabled: true,
  },

  // Хуки Better-Auth: перехватываем момент создания пользователя
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          // Вызываем мутацию через официальный HTTP-клиент
          await convexServer.mutation(api.auth.signUpUser, {
            name: user.name,
            email: user.email,
            tokenIdentifier: user.id,
          });
        },
      },
    },
  },
});
