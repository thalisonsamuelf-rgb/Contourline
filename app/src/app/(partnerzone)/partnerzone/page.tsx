import { Suspense } from "react"
import {
  getRecentMaterials,
  getPopularMaterials,
  getCategoryTree,
  getAnalyticsSummary,
} from "@/lib/partnerzone/queries"
import { DashboardClient } from "./dashboard-client"

export const dynamic = 'force-dynamic'

export const metadata = {
  title: "PartnerZone — Contourline",
}

async function DashboardData() {
  const [recent, popular, categories, stats] = await Promise.all([
    getRecentMaterials(8),
    getPopularMaterials(8),
    getCategoryTree(),
    getAnalyticsSummary(),
  ])

  return (
    <DashboardClient
      recentMaterials={recent}
      popularMaterials={popular}
      categories={categories}
      stats={stats}
    />
  )
}

export default function PartnerZoneDashboard() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <DashboardData />
    </Suspense>
  )
}
