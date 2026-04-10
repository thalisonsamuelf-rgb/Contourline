"use client"

import { motion } from "framer-motion"
import {
  ArrowLeft,
  Eye,
  Download,
  FileText,
  Image as ImageIcon,
  Video,
  Table,
  Presentation,
  File,
  Folder,
} from "lucide-react"
import Link from "next/link"
import { SearchBar } from "@/components/partnerzone/search-bar"
import { formatFileSize, getFileTypeGroup, type Material, type Category } from "@/lib/partnerzone/types"
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  id: string
  name: string
  slug: string
}

interface CategoryPageClientProps {
  category: Category
  subcategories: Category[]
  directMaterials: Material[]
  breadcrumbs: BreadcrumbItem[]
  totalCount: number
}

const fileTypeIcons: Record<string, React.ElementType> = {
  pdf: FileText,
  image: ImageIcon,
  video: Video,
  spreadsheet: Table,
  presentation: Presentation,
  document: FileText,
  other: File,
}

const fileTypeColors: Record<string, string> = {
  pdf: "text-[#B91C1C] bg-[#EF4444]/10",
  image: "text-[#047857] bg-[#10B981]/10",
  video: "text-[#7C3AED] bg-[#7C3AED]/10",
  spreadsheet: "text-[#047857] bg-[#10B981]/10",
  presentation: "text-[#B45309] bg-[#F59E0B]/10",
  document: "text-[#24336E] bg-[#24336E]/10",
  other: "text-black/50 bg-black/[0.04]",
}

const fileTypeLabels: Record<string, string> = {
  pdf: "PDF",
  image: "IMG",
  video: "VÍDEO",
  spreadsheet: "PLANILHA",
  presentation: "APRESENT",
  document: "DOC",
  other: "ARQUIVO",
}

export function CategoryPageClient({
  category,
  subcategories,
  directMaterials,
  breadcrumbs,
  totalCount,
}: CategoryPageClientProps) {
  const parentBreadcrumb = breadcrumbs[breadcrumbs.length - 2]
  const backUrl = parentBreadcrumb
    ? `/partnerzone/categories/${parentBreadcrumb.slug}`
    : "/partnerzone"

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      {/* Breadcrumb */}
      <div className="flex items-center flex-wrap gap-2 text-sm text-black/50">
        <Link
          href="/partnerzone"
          className="hover:text-black/80 transition-colors"
        >
          PartnerZone
        </Link>
        {breadcrumbs.map((b, i) => {
          const isLast = i === breadcrumbs.length - 1
          return (
            <span key={b.id} className="flex items-center gap-2">
              <span>/</span>
              {isLast ? (
                <span className="text-black/80 font-medium">{b.name}</span>
              ) : (
                <Link
                  href={`/partnerzone/categories/${b.slug}`}
                  className="hover:text-black/80 transition-colors"
                >
                  {b.name}
                </Link>
              )}
            </span>
          )
        })}
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black/80 tracking-tight">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-sm text-black/50 mt-1">{category.description}</p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#24336E]/10 text-[#24336E]">
              {totalCount} {totalCount === 1 ? "material" : "materiais"}
            </span>
            {subcategories.length > 0 && (
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-black/[0.04] text-black/60">
                {subcategories.length} {subcategories.length === 1 ? "pasta" : "pastas"}
              </span>
            )}
          </div>
        </div>
        <Link
          href={backUrl}
          className="flex items-center gap-1.5 text-xs text-black/50 hover:text-black/80 transition-colors shrink-0"
        >
          <ArrowLeft className="size-3.5" />
          {parentBreadcrumb ? `Voltar para ${parentBreadcrumb.name}` : "Voltar"}
        </Link>
      </div>

      {/* Search */}
      <SearchBar
        placeholder={`Buscar em ${category.name}...`}
        className="max-w-xl"
      />

      {/* SUBFOLDERS (Blue cards) */}
      {subcategories.length > 0 && (
        <div className="flex flex-col gap-3">
          {directMaterials.length > 0 && (
            <h2 className="text-sm font-semibold text-black/60 uppercase tracking-wider">
              Pastas
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {subcategories.map((sub) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <Link
                  href={`/partnerzone/categories/${sub.slug}`}
                  className="group relative flex flex-col aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-[#2A3D7E] to-[#1B2655] shadow-sm hover:shadow-2xl hover:shadow-[#24336E]/20 transition-shadow duration-300"
                >
                  <div className="flex-1 flex items-center justify-center p-6">
                    <Folder className="size-20 text-white/30 group-hover:text-white/50 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <div className="p-5 bg-black/20 backdrop-blur-sm border-t border-white/10">
                    <h3 className="text-lg font-bold text-white truncate">
                      {sub.name}
                    </h3>
                    <p className="text-[11px] text-white/60 mt-1">
                      {sub.material_count ?? 0}{" "}
                      {(sub.material_count ?? 0) === 1 ? "material" : "materiais"}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* DIRECT MATERIALS (at this exact level) */}
      {directMaterials.length > 0 && (
        <div className="flex flex-col gap-3">
          {subcategories.length > 0 && (
            <h2 className="text-sm font-semibold text-black/60 uppercase tracking-wider">
              Materiais nesta pasta
            </h2>
          )}
          <MaterialsList materials={directMaterials} />
        </div>
      )}

      {/* EMPTY STATE */}
      {subcategories.length === 0 && directMaterials.length === 0 && (
        <div className="rounded-2xl border border-black/[0.08] bg-white p-12 text-center">
          <FileText className="size-12 text-black/20 mx-auto mb-3" />
          <p className="text-sm text-black/50">
            Nenhum material em {category.name} ainda.
          </p>
        </div>
      )}
    </motion.div>
  )
}

/* ── Materials list (rows) ──────────────────────────────────────── */

function MaterialsList({ materials }: { materials: Material[] }) {
  return (
    <div className="rounded-2xl border border-black/[0.08] bg-white overflow-hidden divide-y divide-black/[0.06]">
      {materials.map((material, i) => {
        const fileGroup = getFileTypeGroup(material.file_type)
        const Icon = fileTypeIcons[fileGroup] ?? File
        const colorClass = fileTypeColors[fileGroup] ?? fileTypeColors.other
        const label = fileTypeLabels[fileGroup] ?? "ARQUIVO"

        return (
          <motion.div
            key={material.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: Math.min(i * 0.02, 0.5) }}
            className="group flex items-center gap-4 px-4 sm:px-5 py-3 hover:bg-black/[0.02] transition-colors"
          >
            <div
              className={cn(
                "flex items-center justify-center size-11 rounded-xl shrink-0",
                colorClass
              )}
            >
              <Icon className="size-5" />
            </div>

            <Link
              href={`/partnerzone/material/${material.id}`}
              className="flex-1 min-w-0"
            >
              <p className="text-[14px] font-semibold text-black/80 truncate group-hover:text-[#24336E] transition-colors">
                {material.title}
              </p>
              <div className="flex items-center gap-3 mt-0.5 text-[11px] text-black/40">
                <span className="font-bold uppercase tracking-wider">{label}</span>
                <span>•</span>
                <span>{formatFileSize(material.file_size)}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Download className="size-3" />
                  {material.download_count}
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/partnerzone/material/${material.id}`}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium text-black/60 hover:text-[#24336E] hover:bg-[#24336E]/[0.06] transition-all"
                title="Ver detalhes"
              >
                <Eye className="size-3.5" />
                <span className="hidden md:inline">Ver</span>
              </Link>
              <a
                href={`/partnerzone/api/download/${material.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold bg-[#24336E] text-white hover:bg-[#1B2655] transition-colors"
                title="Baixar"
              >
                <Download className="size-3.5" />
                <span className="hidden md:inline">Baixar</span>
              </a>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
