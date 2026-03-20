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

// Mock analytics data — in production, fetched from Supabase
const weeklyDownloads = [
  { day: "Seg", value: 42 },
  { day: "Ter", value: 58 },
  { day: "Qua", value: 35 },
  { day: "Qui", value: 67 },
  { day: "Sex", value: 89 },
  { day: "Sáb", value: 12 },
  { day: "Dom", value: 8 },
]

const maxDownload = Math.max(...weeklyDownloads.map((d) => d.value))

const topDepartments = [
  { name: "Vendas", downloads: 1250, percentage: 42 },
  { name: "Marketing", downloads: 890, percentage: 30 },
  { name: "Clínico", downloads: 480, percentage: 16 },
  { name: "Operações", downloads: 230, percentage: 8 },
  { name: "Outros", downloads: 120, percentage: 4 },
]

const recentActivity = [
  { user: "Ana Silva", action: "baixou", material: "Catálogo Q1 2026", time: "5 min atrás" },
  { user: "Carlos Santos", action: "baixou", material: "Tabela de Preços", time: "12 min atrás" },
  { user: "Maria Costa", action: "favoritou", material: "Template Stories", time: "25 min atrás" },
  { user: "João Lima", action: "baixou", material: "Script SDR", time: "1h atrás" },
  { user: "Lucia Mendes", action: "baixou", material: "Proposta Comercial", time: "2h atrás" },
]

export default function AnalyticsPage() {
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
          Métricas de uso e engajamento do PartnerZone
        </p>
      </motion.div>

      {/* KPI cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Download, label: "Downloads esta semana", value: "311", change: "+18%", positive: true },
          { icon: Users, label: "Usuários ativos", value: "87", change: "+5%", positive: true },
          { icon: FileText, label: "Materiais acessados", value: "156", change: "+12%", positive: true },
          { icon: TrendingUp, label: "Taxa de engajamento", value: "72%", change: "-3%", positive: false },
        ].map(({ icon: Icon, label, value, change, positive }) => (
          <div
            key={label}
            className="flex flex-col gap-3 p-5 rounded-xl border border-border bg-card"
          >
            <div className="flex items-center justify-between">
              <Icon className="size-5 text-muted-foreground" />
              <span
                className={`flex items-center gap-0.5 text-xs font-medium ${
                  positive ? "text-emerald-500" : "text-red-400"
                }`}
              >
                {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                {change}
              </span>
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
            {topDepartments.map(({ name, downloads, percentage }) => (
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
            ))}
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
          {recentActivity.map((activity, i) => (
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
              <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
            </div>
          ))}
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
