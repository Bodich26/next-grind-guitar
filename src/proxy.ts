import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_ROUTES, AUTH_META, PUBLIC_ROUTES } from "../routes";

export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;

  // 1. Проверяем сессию в Better-Auth
  const authResponse = await fetch(`${nextUrl.origin}/api/auth/get-session`, {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  const session = await authResponse.json();
  const isLoggedIn = !!session;

  // Достаем роль пользователя из сессии Better-Auth
  // Примечание: Убедись, что в схеме Better-Auth поле роли возвращается как строка (например, "admin" или "user")
  const userRole = session?.user?.role;

  const currentPath = nextUrl.pathname;

  // 2. Группируем маршруты
  const authMetaPages = [
    AUTH_META.LOGIN,
    AUTH_META.REGISTER,
    AUTH_META.FORGOT_PASSWORD,
    AUTH_META.UPDATE_PASSWORD,
  ];

  const appProtectedPages = [
    PUBLIC_ROUTES.HOME,
    PUBLIC_ROUTES.PROFILE,
    PUBLIC_ROUTES.USER,
  ];

  // Проверяем типы страниц
  const isTryingAuthMeta = authMetaPages.some((route) => currentPath === route);
  const isTryingProtectedPage = appProtectedPages.some(
    (route) => currentPath === route || currentPath.startsWith(`${route}/`),
  );

  // Проверяем, идет ли юзер на админку или её подстраницы (например, /admin/users)
  const isTryingAdmin =
    currentPath === ADMIN_ROUTES.ADMIN ||
    currentPath.startsWith(`${ADMIN_ROUTES.ADMIN}/`);

  // 3. ПРИМЕНЯЕМ ПРАВИЛА ЗАЩИТЫ:

  // --- ЗАЩИТА АДМИНКИ ---
  if (isTryingAdmin) {
    // Если вообще не залогинен -> на логин
    if (!isLoggedIn) {
      const callbackUrl = encodeURIComponent(currentPath);
      return NextResponse.redirect(
        new URL(`${AUTH_META.LOGIN}?callbackUrl=${callbackUrl}`, request.url),
      );
    }

    // Если залогинен, но роль НЕ admin (например, "user" или undefined) -> на главную
    if (userRole !== "admin") {
      return NextResponse.redirect(
        new URL(AUTH_META.AFTER_LOGIN_REDIRECT, request.url),
      );
    }
  }

  // --- ОБЫЧНЫЕ ПРИВАТНЫЕ СТРАНИЦЫ ---
  if (isTryingProtectedPage && !isLoggedIn) {
    const callbackUrl = encodeURIComponent(currentPath);
    return NextResponse.redirect(
      new URL(`${AUTH_META.LOGIN}?callbackUrl=${callbackUrl}`, request.url),
    );
  }

  // --- ГОСТЕВЫЕ СТРАНИЦЫ (AUTH_META) ---
  if (isTryingAuthMeta && isLoggedIn) {
    return NextResponse.redirect(
      new URL(AUTH_META.AFTER_LOGIN_REDIRECT, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
