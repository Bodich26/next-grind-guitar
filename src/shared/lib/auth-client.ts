import { createAuthClient } from "better-auth/react";
import { API_ROUTES } from "@/../routes";
export const authClient = createAuthClient({
  baseURL: API_ROUTES.BASE_URL,
});
