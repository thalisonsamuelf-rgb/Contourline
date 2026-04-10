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

  const isLoginPage = request.nextUrl.pathname === "/partnerzone/login"
  const isAuthCallback = request.nextUrl.pathname === "/partnerzone/auth/callback"

  // Auth callback must always pass through (handles OAuth redirect)
  if (isAuthCallback) {
    return supabaseResponse
  }

  // Authenticated users visiting login page get redirected to dashboard
  if (user && isLoginPage) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = "/partnerzone"
    dashboardUrl.search = ""
    return NextResponse.redirect(dashboardUrl)
  }

  // Unauthenticated users on protected partnerzone routes get redirected to login
  if (
    !user &&
    request.nextUrl.pathname.startsWith("/partnerzone") &&
    !isLoginPage
  ) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/partnerzone/login"
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return supabaseResponse
}
