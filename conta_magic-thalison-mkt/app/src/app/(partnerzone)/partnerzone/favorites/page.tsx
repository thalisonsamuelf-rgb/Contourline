import { Suspense } from "react"
import { FavoritesClient } from "./favorites-client"

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Favoritos — PartnerZone",
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
      <FavoritesClient />
    </Suspense>
  )
}
