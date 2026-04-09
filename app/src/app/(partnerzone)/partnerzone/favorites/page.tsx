import { Suspense } from "react"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server-auth"
import { getUserFavorites } from "@/lib/partnerzone/queries"
import { FavoritesClient } from "./favorites-client"

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Favoritos — PartnerZone",
}

async function FavoritesData() {
  const supabase = await createSupabaseServerClient()

  if (!supabase) {
    redirect("/login")
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const materials = await getUserFavorites(user.id)

  return (
    <FavoritesClient
      materials={materials}
      userId={user.id}
    />
  )
}

export default function FavoritesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <FavoritesData />
    </Suspense>
  )
}
