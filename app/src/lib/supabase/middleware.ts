import { createServerClient } from "@supabase/ssr"
import { type NextRequest, NextResponse } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Supabase not configured — allow through (dev/preview envs)
    return supabaseResponse
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value)
        }
        supabaseResponse = NextResponse.next({ request })
        for (const { name, value, options } of cookiesToSet) {
          supabaseResponse.cookies.set(name, value, options)
        }
      },
    },
  })

  // Refresh the session — this is the critical call that keeps
  // the auth token alive and syncs cookies between client/server.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isLoginPage = pathname === "/partnerzone/login"
  const isAuthCallback = pathname === "/partnerzone/auth/callback"

  // Auth callback must always pass through (handles OAuth redirect)
  if (isAuthCallback) {
    return supabaseResponse
  }

  // Only these paths require authentication.
  // Everything else under /partnerzone is publicly accessible (catalog mode).
  const isProtectedRoute =
    pathname.startsWith("/partnerzone/admin") ||
    pathname.startsWith("/partnerzone/conta")

  // Authenticated users visiting login page get redirected back to where they came from
  if (user && isLoginPage) {
    const redirectParam = request.nextUrl.searchParams.get("redirect")
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = redirectParam && redirectParam.startsWith("/")
      ? redirectParam
      : "/partnerzone"
    dashboardUrl.search = ""
    return NextResponse.redirect(dashboardUrl)
  }

  // Unauthenticated users on protected routes get redirected to login,
  // preserving the original destination via ?redirect= so they return after login.
  if (!user && isProtectedRoute) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/partnerzone/login"
    loginUrl.search = ""
    loginUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}
