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
  FORGOT_PASSWORD: "/forgot-password",
  UPDATE_PASSWORD: "/update-password",
} as const;

export const AUTH_META = {
  PUBLIC_ACCESS: "/login",
  AFTER_LOGIN_REDIRECT: "/",
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
