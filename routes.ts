/**
 * ============================
 * 🌍 API ENDPOINTS
 * ============================
 * Серверные маршруты (используются для запросов)
 */
export const API_ROUTES = {
  BASE_URL: "",
  BASE_API: "/api",
  LOGIN: "/login",
  REGISTER: "/register",
} as const;

export const AUTH_META = {
  LOGIN: "/login",
  REGISTER: "/register",
  AFTER_LOGIN_REDIRECT: "/",
  FORGOT_PASSWORD: "/forgot-password",
  UPDATE_PASSWORD: "/update-password",
} as const;

/**
 * ============================
 * 🌐 PUBLIC ROUTES
 * ============================
 * Основные публичные страницы (фронтенд)
 */
export const PUBLIC_ROUTES = {
  HOME: "/",
  PROFILE: "/profile",
  USER: "/user",
} as const;
