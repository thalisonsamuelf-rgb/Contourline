import { Suspense } from "react"
import { getAllUsers, getUserStats } from "@/lib/partnerzone/queries"
import UsersManager from "./users-manager"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Gestao de Usuarios — PartnerZone Admin",
}

async function UsersData() {
  const [users, stats] = await Promise.all([
    getAllUsers(),
    getUserStats(),
  ])

  return <UsersManager initialUsers={users} initialStats={stats} />
}

export default function UsersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <UsersData />
    </Suspense>
  )
}
