import { Suspense } from "react"
import { getAllUsers, getUserStats } from "@/lib/partnerzone/queries"
import UsersManager from "./users-manager"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Gestao de Usuarios — PartnerZone Admin",
}

async function UsersData() {
  try {
    const [users, stats] = await Promise.all([
      getAllUsers().catch(() => []),
      getUserStats().catch(() => ({
        total: 0,
        byRole: { admin: 0, editor: 0, viewer: 0 },
        byDepartment: {},
      })),
    ])

    return <UsersManager initialUsers={users} initialStats={stats} />
  } catch {
    return <UsersManager initialUsers={[]} initialStats={{
      total: 0,
      byRole: { admin: 0, editor: 0, viewer: 0 },
      byDepartment: {},
    }} />
  }
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
