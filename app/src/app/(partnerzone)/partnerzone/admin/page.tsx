import { Suspense } from "react"
import { getAnalyticsSummary, getTopDownloadedMaterials } from "@/lib/partnerzone/queries"
import { AdminDashboardClient } from "./admin-dashboard-client"

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "Admin — PartnerZone",
}

async function AdminData() {
  const [stats, topDownloaded] = await Promise.all([
    getAnalyticsSummary(),
    getTopDownloadedMaterials(10),
  ])

  return <AdminDashboardClient stats={stats} topDownloaded={topDownloaded} />
}

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AdminData />
    </Suspense>
  )
}
