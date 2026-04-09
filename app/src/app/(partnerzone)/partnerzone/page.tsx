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
  try {
    const [recent, popular, categories, stats] = await Promise.all([
      getRecentMaterials(8).catch(() => []),
      getPopularMaterials(8).catch(() => []),
      getCategoryTree().catch(() => []),
      getAnalyticsSummary().catch(() => ({
        totalMaterials: 0,
        totalDownloads: 0,
        totalCategories: 0,
        totalUsers: 0,
      })),
    ])

    return (
      <DashboardClient
        recentMaterials={recent}
        popularMaterials={popular}
        categories={categories}
        stats={stats}
      />
    )
  } catch {
    return (
      <DashboardClient
        recentMaterials={[]}
        popularMaterials={[]}
        categories={[]}
        stats={{ totalMaterials: 0, totalDownloads: 0, totalCategories: 0, totalUsers: 0 }}
      />
    )
  }
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
