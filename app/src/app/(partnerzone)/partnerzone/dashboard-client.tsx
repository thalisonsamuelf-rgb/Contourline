"use client"

import { Suspense, useRef } from "react"
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
  Cpu,
  ChevronLeft,
  ChevronRight,
  Clock,
  Sparkles,
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

const categoryGradients = [
  "from-blue-500/20 to-cyan-500/10",
  "from-purple-500/20 to-pink-500/10",
  "from-emerald-500/20 to-teal-500/10",
  "from-amber-500/20 to-orange-500/10",
  "from-rose-500/20 to-red-500/10",
  "from-indigo-500/20 to-violet-500/10",
]

const categoryIconColors = [
  "text-blue-400",
  "text-purple-400",
  "text-emerald-400",
  "text-amber-400",
  "text-rose-400",
  "text-indigo-400",
]

const categoryBorderColors = [
  "border-blue-500/20 hover:border-blue-500/40",
  "border-purple-500/20 hover:border-purple-500/40",
  "border-emerald-500/20 hover:border-emerald-500/40",
  "border-amber-500/20 hover:border-amber-500/40",
  "border-rose-500/20 hover:border-rose-500/40",
  "border-indigo-500/20 hover:border-indigo-500/40",
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 20 },
  },
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
  const materialsScrollRef = useRef<HTMLDivElement>(null)

  const scrollMaterials = (direction: "left" | "right") => {
    if (!materialsScrollRef.current) return
    const scrollAmount = 320
    materialsScrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-8"
    >
      {/* Hero Banner */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden rounded-2xl border border-white/[0.06]"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/15 to-indigo-600/10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="relative px-6 py-8 lg:px-8 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left content */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-blue-400" />
                <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-blue-400/80">
                  Central de Materiais
                </span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                Bem-vindo ao PartnerZone
              </h1>
              <p className="text-[14px] text-white/50 max-w-md leading-relaxed">
                Acesse materiais institucionais, equipamentos e recursos da Contourline Diagnosticos.
              </p>

              {/* Search in banner */}
              <div className="mt-2 max-w-lg">
                <Suspense fallback={<div className="h-11 rounded-xl bg-white/[0.05] animate-pulse" />}>
                  <SearchBar showFilters className="[&_input]:bg-white/[0.06] [&_input]:border-white/[0.08] [&_input]:text-white [&_input]:placeholder-white/30" />
                </Suspense>
              </div>
            </div>

            {/* Stats pills */}
            <div className="flex flex-wrap lg:flex-col gap-3">
              {[
                {
                  icon: FileText,
                  label: "Materiais",
                  value: stats.totalMaterials,
                  gradient: "from-blue-500/20 to-blue-600/10",
                  iconColor: "text-blue-400",
                  borderColor: "border-blue-500/20",
                },
                {
                  icon: Download,
                  label: "Downloads",
                  value: stats.totalDownloads,
                  gradient: "from-emerald-500/20 to-emerald-600/10",
                  iconColor: "text-emerald-400",
                  borderColor: "border-emerald-500/20",
                },
                {
                  icon: FolderOpen,
                  label: "Categorias",
                  value: stats.totalCategories,
                  gradient: "from-purple-500/20 to-purple-600/10",
                  iconColor: "text-purple-400",
                  borderColor: "border-purple-500/20",
                },
              ].map(({ icon: Icon, label, value, gradient, iconColor, borderColor }) => (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.03 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r ${gradient} border ${borderColor} backdrop-blur-sm min-w-[180px]`}
                >
                  <div className={`flex items-center justify-center size-9 rounded-lg bg-white/[0.06] ${iconColor}`}>
                    <Icon className="size-[18px]" />
                  </div>
                  <div>
                    <p className="text-xl font-bold tabular-nums text-white">{value}</p>
                    <p className="text-[10px] uppercase tracking-[0.12em] text-white/40 font-medium">{label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Materiais Institucionais - Horizontal Carousel */}
      {popularMaterials.length > 0 && (
        <motion.section variants={itemVariants} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-8 rounded-lg bg-blue-500/10">
                <Sparkles className="size-4 text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Materiais Institucionais</h2>
                <p className="text-[12px] text-white/35">Materiais mais baixados da plataforma</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollMaterials("left")}
                className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-white/50 hover:text-white/80 transition-all"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={() => scrollMaterials("right")}
                className="p-2 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] text-white/50 hover:text-white/80 transition-all"
              >
                <ChevronRight className="size-4" />
              </button>
              <Link
                href="/partnerzone/search?sort=popular"
                className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-lg text-[12px] text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all"
              >
                Ver todos <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

          {/* Scrollable carousel */}
          <div
            ref={materialsScrollRef}
            className="flex gap-4 overflow-x-auto pb-2 scrollbar-none -mx-1 px-1 snap-x snap-mandatory"
          >
            {popularMaterials.map((material, index) => (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-[280px] snap-start"
              >
                <Link
                  href={`/partnerzone/material/${material.id}`}
                  className="group flex flex-col rounded-xl border border-white/[0.06] bg-[#0d0d1a] hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden"
                >
                  {/* Thumbnail */}
                  <div className="relative h-36 bg-gradient-to-br from-white/[0.03] to-white/[0.01] overflow-hidden">
                    {material.thumbnail_path ? (
                      <img
                        src={material.thumbnail_path}
                        alt={material.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FileText className="size-10 text-white/10 group-hover:text-blue-500/20 transition-colors duration-300" />
                      </div>
                    )}
                    {/* File type badge */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-sm text-[10px] font-medium text-white/70 uppercase tracking-wider">
                      {material.file_type.split("/").pop()}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex flex-col gap-2 p-4">
                    <h3 className="text-[13px] font-semibold text-white/90 line-clamp-2 group-hover:text-white transition-colors">
                      {material.title}
                    </h3>
                    {material.category && (
                      <span className="text-[10px] text-blue-400/60 font-medium">
                        {material.category.name}
                      </span>
                    )}
                    <div className="flex items-center justify-between pt-1 text-[11px] text-white/30">
                      <span className="flex items-center gap-1">
                        <Download className="size-3" />
                        {material.download_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3" />
                        {new Date(material.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Equipamentos Section - Product Card Grid */}
      <motion.section variants={itemVariants} className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-8 rounded-lg bg-purple-500/10">
              <Cpu className="size-4 text-purple-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Equipamentos</h2>
              <p className="text-[12px] text-white/35">Categorias de equipamentos e materiais</p>
            </div>
          </div>
          <Link
            href="/partnerzone/categories"
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-[12px] text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 transition-all"
          >
            Ver todas <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {categories.map((cat, index) => {
            const Icon = iconMap[cat.icon ?? ""] ?? Cpu
            const gradientIndex = index % categoryGradients.length
            const childCount = cat.children?.length ?? 0

            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link
                  href={`/partnerzone/categories/${cat.slug}`}
                  className={`group relative flex flex-col rounded-xl border ${categoryBorderColors[gradientIndex]} bg-[#0d0d1a] overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5`}
                >
                  {/* Category image / icon area */}
                  <div className={`relative h-32 bg-gradient-to-br ${categoryGradients[gradientIndex]} overflow-hidden`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent" />
                    <div className="flex items-center justify-center h-full">
                      <div className={`p-4 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`size-8 ${categoryIconColors[gradientIndex]} transition-colors`} />
                      </div>
                    </div>
                    {/* Subcategory count badge */}
                    {childCount > 0 && (
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-sm text-[10px] font-medium text-white/70 border border-white/[0.08]">
                        {childCount} sub
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex items-center gap-3 p-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[14px] font-semibold text-white group-hover:text-white/90 transition-colors">
                        {cat.name}
                      </h3>
                      {cat.description && (
                        <p className="text-[11px] text-white/30 line-clamp-1 mt-0.5">
                          {cat.description}
                        </p>
                      )}
                      {childCount > 0 && (
                        <p className="text-[10px] text-white/25 mt-1">
                          {childCount} subcategoria{childCount !== 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="size-4 text-white/15 group-hover:text-white/40 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Materiais Recentes */}
      <motion.section variants={itemVariants} className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-8 rounded-lg bg-emerald-500/10">
              <Clock className="size-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Materiais Recentes</h2>
              <p className="text-[12px] text-white/35">Adicionados recentemente na plataforma</p>
            </div>
          </div>
          <Link
            href="/partnerzone/search?sort=recent"
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-[12px] text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 transition-all"
          >
            Ver todos <ArrowRight className="size-3" />
          </Link>
        </div>
        <MaterialGrid
          materials={recentMaterials}
          emptyMessage="Nenhum material adicionado ainda."
        />
      </motion.section>
    </motion.div>
  )
}
