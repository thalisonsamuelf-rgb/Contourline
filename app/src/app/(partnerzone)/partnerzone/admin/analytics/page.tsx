import { Suspense } from "react"
import {
  getWeeklyDownloads,
  getTopDepartments,
  getRecentActivity,
  getAnalyticsKPIs,
} from "@/lib/partnerzone/queries"
import { AnalyticsClient } from "./analytics-client"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Analytics — PartnerZone Admin",
}

async function AnalyticsData() {
  const [weeklyDownloads, topDepartments, recentActivity, kpis] = await Promise.all([
    getWeeklyDownloads(),
    getTopDepartments(),
    getRecentActivity(10),
    getAnalyticsKPIs(),
  ])

  return (
    <AnalyticsClient
      weeklyDownloads={weeklyDownloads}
      topDepartments={topDepartments}
      recentActivity={recentActivity}
      kpis={kpis}
    />
  )
}

export default function AnalyticsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <AnalyticsData />
    </Suspense>
  )
}
