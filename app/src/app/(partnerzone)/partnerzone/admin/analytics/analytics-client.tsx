"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Download,
  Users,
  FileText,
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

type WeeklyDownload = { day: string; value: number }
type Department = { name: string; downloads: number; percentage: number }
type Activity = { user: string; action: string; material: string; time: string }
type KPIs = {
  downloadsThisWeek: number
  downloadsChange: number
  activeUsers: number
  materialsAccessed: number
}

interface AnalyticsClientProps {
  weeklyDownloads: WeeklyDownload[]
  topDepartments: Department[]
  recentActivity: Activity[]
  kpis: KPIs
}

function formatRelativeTime(isoDate: string): string {
  const now = Date.now()
  const then = new Date(isoDate).getTime()
  const diffMs = now - then
  const diffMin = Math.floor(diffMs / 60000)

  if (diffMin < 1) return "agora"
  if (diffMin < 60) return `${diffMin} min atras`
  const diffHours = Math.floor(diffMin / 60)
  if (diffHours < 24) return `${diffHours}h atras`
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d atras`
}

export function AnalyticsClient({
  weeklyDownloads,
  topDepartments,
  recentActivity,
  kpis,
}: AnalyticsClientProps) {
  const maxDownload = Math.max(...weeklyDownloads.map((d) => d.value), 1)

  const kpiCards = [
    {
      icon: Download,
      label: "Downloads esta semana",
      value: String(kpis.downloadsThisWeek),
      change: `${kpis.downloadsChange >= 0 ? "+" : ""}${kpis.downloadsChange}%`,
      positive: kpis.downloadsChange >= 0,
    },
    {
      icon: Users,
      label: "Usuarios ativos",
      value: String(kpis.activeUsers),
      change: "",
      positive: true,
    },
    {
      icon: FileText,
      label: "Materiais acessados",
      value: String(kpis.materialsAccessed),
      change: "",
      positive: true,
    },
    {
      icon: TrendingUp,
      label: "Total downloads",
      value: String(kpis.downloadsThisWeek),
      change: `${kpis.downloadsChange >= 0 ? "+" : ""}${kpis.downloadsChange}%`,
      positive: kpis.downloadsChange >= 0,
    },
  ]

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/partnerzone/admin" className="hover:text-foreground transition-colors">
          Admin
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Analytics</span>
      </div>

      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <BarChart3 className="size-6 text-primary" />
          Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Metricas de uso e engajamento do PartnerZone
        </p>
      </motion.div>

      {/* KPI cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map(({ icon: Icon, label, value, change, positive }) => (
          <div
            key={label}
            className="flex flex-col gap-3 p-5 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between">
              <Icon className="size-5 text-muted-foreground" />
              {change && (
                <span
                  className={`flex items-center gap-0.5 text-xs font-medium ${
                    positive ? "text-emerald-500" : "text-red-400"
                  }`}
                >
                  {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {change}
                </span>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums text-foreground">{value}</p>
              <p className="text-[11px] text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Downloads chart (simple bar) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 p-5 rounded-xl border border-border bg-card"
        >
          <h3 className="text-sm font-semibold text-foreground">Downloads por Dia</h3>
          <div className="flex items-end gap-2 h-40">
            {weeklyDownloads.map(({ day, value }) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] tabular-nums text-muted-foreground">{value}</span>
                <div
                  className="w-full rounded-t-md bg-primary/60 hover:bg-primary transition-colors"
                  style={{ height: `${(value / maxDownload) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Downloads by department */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 p-5 rounded-xl border border-border bg-card"
        >
          <h3 className="text-sm font-semibold text-foreground">Downloads por Departamento</h3>
          <div className="flex flex-col gap-3">
            {topDepartments.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nenhum dado disponivel</p>
            ) : (
              topDepartments.map(({ name, downloads, percentage }) => (
                <div key={name} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground">{name}</span>
                    <span className="text-muted-foreground tabular-nums">{downloads}</span>
                  </div>
                  <div className="h-2 rounded-full bg-bg-surface overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary/70 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent activity */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col gap-4 p-5 rounded-xl border border-border bg-card"
      >
        <h3 className="text-sm font-semibold text-foreground">Atividade Recente</h3>
        <div className="flex flex-col divide-y divide-border-subtle">
          {recentActivity.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4">Nenhuma atividade recente</p>
          ) : (
            recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                    {activity.user.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span className="text-foreground">
                    <span className="font-medium">{activity.user}</span>{" "}
                    <span className="text-muted-foreground">{activity.action}</span>{" "}
                    <span className="font-medium">{activity.material}</span>
                  </span>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {formatRelativeTime(activity.time)}
                </span>
              </div>
            ))
          )}
        </div>
      </motion.div>

      <Link
        href="/partnerzone/admin"
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-3.5" />
        Voltar ao Admin
      </Link>
    </motion.div>
  )
}
