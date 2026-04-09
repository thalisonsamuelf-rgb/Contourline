import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server-auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServerClient()

  if (!supabase) {
    // Supabase not configured — block admin access by default
    redirect("/partnerzone")
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Check the user's role in the partnerzone_user_profiles table
  const { data: profile } = await supabase
    .from("partnerzone_user_profiles")
    .select("role")
    .eq("id", user.id)
    .single()

  const allowedRoles = ["admin", "editor"]

  if (!profile || !allowedRoles.includes(profile.role)) {
    redirect("/partnerzone")
  }

  return <>{children}</>
}
