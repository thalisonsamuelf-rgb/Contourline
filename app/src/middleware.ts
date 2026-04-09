import { type NextRequest, NextResponse } from "next/server"
import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? ""
  const pathname = request.nextUrl.pathname

  // Redirect root to /partnerzone when accessing via partnerzone subdomain
  if (hostname.startsWith("partnerzone.") && pathname === "/") {
    return NextResponse.redirect(new URL("/partnerzone", request.url))
  }

  // Auth protection for partnerzone routes
  if (pathname.startsWith("/partnerzone")) {
    return await updateSession(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/partnerzone/:path*",
  ],
}
