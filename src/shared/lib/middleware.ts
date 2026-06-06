import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { AUTH_META, API_ROUTES, PUBLIC_ROUTES } from "@/../routes";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  const { pathname } = request.nextUrl;

  /**
   * ================
   * 🔒 Защита приватных роутов
   * ================
   * Если пользователь не авторизован и пытается попасть на приватную страницу
   */
  const authPaths = Object.values(API_ROUTES);

  if (!user && !authPaths.some((path) => pathname.startsWith(path))) {
    const url = request.nextUrl.clone();
    url.pathname = API_ROUTES.LOGIN;
    return NextResponse.redirect(url);
  }

  /**
   * ================
   * 🚫 Запрещаем доступ авторизованным к auth страницам
   * ================
   * Например: если пользователь уже вошёл, нет смысла открывать /login, /register и т.п.
   */
  if (user && authPaths.some((path) => pathname.startsWith(path))) {
    const url = request.nextUrl.clone();
    url.pathname = AUTH_META.AFTER_LOGIN_REDIRECT;
    return NextResponse.redirect(url);
  }

  /**
   * ================
   * 👤 Проверка slug профиля
   * ================
   * Если пользователь заходит на /user/:username, и этот username принадлежит ему —
   * перенаправляем на /profile
   */
  const isUserProfilePath = pathname.startsWith(`${PUBLIC_ROUTES.USER}/`);
  if (isUserProfilePath && user) {
    const slug = pathname.split(`${PUBLIC_ROUTES.USER}/`)[1];

    if (slug) {
      const { data: userProfile } = await supabase
        .from("user_profiles")
        .select("id, user_name")
        .ilike("user_name", slug)
        .single();

      if (userProfile && userProfile.id === user.id) {
        const url = request.nextUrl.clone();
        url.pathname = PUBLIC_ROUTES.PROFILE;
        return NextResponse.redirect(url);
      }
    }
  }

  return supabaseResponse;
}
