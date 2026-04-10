"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Eye, Download, FileText, Image as ImageIcon, Video, Table, Presentation, File } from "lucide-react"
import Link from "next/link"
import { SearchBar } from "@/components/partnerzone/search-bar"
import { formatFileSize, getFileTypeGroup, type Material, type Category } from "@/lib/partnerzone/types"
import { cn } from "@/lib/utils"

interface CategoryPageClientProps {
  category: Category
  subcategories: Category[]
  materials: Material[]
  totalCount: number
  allCategories: Category[]
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
  materials,
  totalCount,
}: CategoryPageClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-black/50">
        <Link href="/partnerzone" className="hover:text-black/80 transition-colors">
          PartnerZone
        </Link>
        <span>/</span>
        <span className="text-black/80 font-medium">{category.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-black/80 tracking-tight">{category.name}</h1>
          {category.description && (
            <p className="text-sm text-black/50 mt-1">{category.description}</p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-[#24336E]/10 text-[#24336E]">
              {totalCount} {totalCount === 1 ? "material" : "materiais"}
            </span>
            {subcategories.length > 0 && (
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-black/[0.04] text-black/60">
                {subcategories.length} {subcategories.length === 1 ? "subcategoria" : "subcategorias"}
              </span>
            )}
          </div>
        </div>
        <Link
          href="/partnerzone"
          className="flex items-center gap-1.5 text-xs text-black/50 hover:text-black/80 transition-colors shrink-0"
        >
          <ArrowLeft className="size-3.5" />
          Voltar
        </Link>
      </div>

      {/* Search within category */}
      <SearchBar placeholder={`Buscar em ${category.name}...`} className="max-w-xl" />

      {/* Subcategory chips */}
      {subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {subcategories.map((sub) => (
            <Link
              key={sub.id}
              href={`/partnerzone/categories/${sub.slug}`}
              className="px-4 py-2 text-[12px] font-medium rounded-full bg-white border border-black/[0.08] text-black/70 hover:bg-[#24336E] hover:border-[#24336E] hover:text-white transition-all"
            >
              {sub.name}
              {sub.material_count !== undefined && sub.material_count > 0 && (
                <span className="ml-1.5 opacity-60">({sub.material_count})</span>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Materials Grid */}
      {materials.length === 0 ? (
        <div className="rounded-2xl border border-black/[0.08] bg-white p-12 text-center">
          <FileText className="size-12 text-black/20 mx-auto mb-3" />
          <p className="text-sm text-black/50">
            Nenhum material em {category.name} ainda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {materials.map((material) => {
            const fileGroup = getFileTypeGroup(material.file_type)
            const Icon = fileTypeIcons[fileGroup] ?? File
            const label = fileTypeLabels[fileGroup] ?? "ARQUIVO"

            return (
              <motion.div
                key={material.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#24336E] shadow-sm hover:shadow-2xl hover:shadow-[#24336E]/20 transition-shadow duration-300"
              >
                {/* Image / Icon area */}
                <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#2A3D7E] to-[#1B2655]">
                  {material.thumbnail_path ? (
                    <img
                      src={material.thumbnail_path}
                      alt={material.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <Icon className="size-16 text-white/60 transition-transform duration-300 group-hover:scale-110" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/40">
                        {label}
                      </span>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      href={`/partnerzone/material/${material.id}`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/15 backdrop-blur-sm text-white text-xs font-semibold hover:bg-white/25 transition-colors"
                    >
                      <Eye className="size-4" />
                      Ver
                    </Link>
                    <a
                      href={material.file_path}
                      download={material.file_name}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#24336E] text-xs font-semibold hover:bg-white/90 transition-colors"
                    >
                      <Download className="size-4" />
                      Baixar
                    </a>
                  </div>

                  {/* File type badge */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-white/15 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-white">
                    {label}
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-4 gap-2 bg-white">
                  <Link
                    href={`/partnerzone/material/${material.id}`}
                    className="text-[14px] font-semibold text-black/80 line-clamp-2 hover:text-[#24336E] transition-colors leading-snug"
                  >
                    {material.title}
                  </Link>

                  {material.category && (
                    <span className={cn(
                      "w-fit text-[10px] font-bold uppercase tracking-wider",
                      "px-2 py-0.5 rounded-md bg-[#24336E]/10 text-[#24336E]"
                    )}>
                      {material.category.name}
                    </span>
                  )}

                  <div className="flex items-center justify-between mt-auto pt-2 text-[11px] text-black/40">
                    <span>{formatFileSize(material.file_size)}</span>
                    <span className="flex items-center gap-1">
                      <Download className="size-3" />
                      {material.download_count}
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
