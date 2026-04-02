"use client"

import { Suspense } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FileText,
  Download,
  FolderOpen,
  ArrowRight,
  Building2,
  Megaphone,
  TrendingUp,
  GraduationCap,
  type LucideIcon,
} from "lucide-react"
import { SearchBar } from "@/components/partnerzone/search-bar"
import { MaterialGrid } from "@/components/partnerzone/material-grid"
import type { Material, Category } from "@/lib/partnerzone/types"

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Megaphone,
  TrendingUp,
  GraduationCap,
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

interface DashboardClientProps {
  recentMaterials: Material[]
  popularMaterials: Material[]
  categories: Category[]
  stats: {
    totalMaterials: number
    totalDownloads: number
    totalCategories: number
  }
}

export function DashboardClient({
  recentMaterials,
  popularMaterials,
  categories,
  stats,
}: DashboardClientProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8"
    >
      {/* Hero section */}
      <motion.div variants={itemVariants} className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            PartnerZone
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Central de materiais da Contourline Diagnósticos
          </p>
        </div>
        <Suspense fallback={<div className="h-11 max-w-2xl rounded-lg bg-bg-surface animate-pulse" />}>
          <SearchBar showFilters className="max-w-2xl" />
        </Suspense>
      </motion.div>

      {/* Stats cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {[
          { icon: FileText, label: "Materiais", value: stats.totalMaterials, color: "text-blue-400" },
          { icon: Download, label: "Downloads", value: stats.totalDownloads, color: "text-emerald-400" },
          { icon: FolderOpen, label: "Categorias", value: stats.totalCategories, color: "text-purple-400" },
        ].map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-border-medium transition-colors"
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

      {/* Categories grid */}
      <motion.section variants={itemVariants} className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-foreground">Categorias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon ?? ""] ?? FolderOpen
            return (
              <Link
                key={cat.id}
                href={`/partnerzone/categories/${cat.slug}`}
                className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="flex items-center justify-center size-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Icon className="size-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{cat.name}</p>
                  {cat.children && (
                    <p className="text-[10px] text-muted-foreground">
                      {cat.children.length} subcategorias
                    </p>
                  )}
                </div>
                <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            )
          })}
        </div>
      </motion.section>

      {/* Recent materials */}
      <motion.section variants={itemVariants} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Adicionados Recentemente</h2>
          <Link
            href="/partnerzone/search?sort=recent"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            Ver todos <ArrowRight className="size-3" />
          </Link>
        </div>
        <MaterialGrid
          materials={recentMaterials}
          emptyMessage="Nenhum material adicionado ainda."
        />
      </motion.section>

      {/* Popular materials */}
      <motion.section variants={itemVariants} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Mais Baixados</h2>
          <Link
            href="/partnerzone/search?sort=popular"
            className="text-xs text-primary hover:underline flex items-center gap-1"
          >
            Ver todos <ArrowRight className="size-3" />
          </Link>
        </div>
        <MaterialGrid
          materials={popularMaterials}
          emptyMessage="Nenhum download registrado ainda."
        />
      </motion.section>
    </motion.div>
  )
}
