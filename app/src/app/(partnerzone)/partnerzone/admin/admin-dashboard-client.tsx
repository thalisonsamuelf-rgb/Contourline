"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Upload,
  FileText,
  FolderOpen,
  Download,
  BarChart3,
  Settings,
  ArrowRight,
} from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

interface AdminDashboardClientProps {
  stats: {
    totalMaterials: number
    totalDownloads: number
    totalCategories: number
  }
  topDownloaded: Array<{
    id: string
    title: string
    download_count: number
    file_type: string
    category: { name: string; slug: string }[] | null
  }>
}

export function AdminDashboardClient({ stats, topDownloaded }: AdminDashboardClientProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Gerencie materiais, categorias e acompanhe métricas de uso
        </p>
      </motion.div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: FileText, label: "Total de Materiais", value: stats.totalMaterials, color: "text-blue-400" },
          { icon: Download, label: "Total de Downloads", value: stats.totalDownloads, color: "text-emerald-400" },
          { icon: FolderOpen, label: "Categorias", value: stats.totalCategories, color: "text-purple-400" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card"
          >
            <div className={`flex items-center justify-center size-10 rounded-lg bg-bg-surface ${color}`}>
              <Icon className="size-5" />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums text-foreground">{value}</p>
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Quick actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { href: "/partnerzone/admin/upload", icon: Upload, label: "Upload de Material", desc: "Adicionar novo material" },
          { href: "/partnerzone/admin/materials", icon: FileText, label: "Gerenciar Materiais", desc: "Editar, remover, versionar" },
          { href: "/partnerzone/admin/categories", icon: FolderOpen, label: "Gerenciar Categorias", desc: "Organizar categorias" },
          { href: "/partnerzone/admin/analytics", icon: BarChart3, label: "Analytics", desc: "Métricas e relatórios" },
        ].map(({ href, icon: Icon, label, desc }) => (
          <Link
            key={href}
            href={href}
            className="group flex flex-col gap-3 p-5 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <Icon className="size-5" />
              </div>
              <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-[11px] text-muted-foreground">{desc}</p>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Top downloaded */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Top 10 Mais Baixados</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-surface">
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">#</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Material</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Categoria</th>
                <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Downloads</th>
              </tr>
            </thead>
            <tbody>
              {topDownloaded.map((item, i) => (
                <tr key={item.id} className="border-b border-border-subtle last:border-0 hover:bg-bg-surface transition-colors">
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{i + 1}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/partnerzone/material/${item.id}`}
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {item.category?.[0]?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium text-foreground">
                    {item.download_count}
                  </td>
                </tr>
              ))}
              {topDownloaded.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                    Nenhum download registrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  )
}
