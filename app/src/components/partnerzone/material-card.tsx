"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Download,
  Heart,
  FileText,
  Image,
  Video,
  Table,
  Presentation,
  File,
  Eye,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatFileSize, getFileTypeGroup, type Material } from "@/lib/partnerzone/types"

const fileTypeIcons: Record<string, React.ElementType> = {
  pdf: FileText,
  image: Image,
  video: Video,
  spreadsheet: Table,
  presentation: Presentation,
  document: FileText,
  other: File,
}

const fileTypeColors: Record<string, string> = {
  pdf: "text-red-400",
  image: "text-emerald-400",
  video: "text-purple-400",
  spreadsheet: "text-green-400",
  presentation: "text-orange-400",
  document: "text-blue-400",
  other: "text-gray-400",
}

interface MaterialCardProps {
  material: Material
  isFavorited?: boolean
  onToggleFavorite?: (materialId: string) => void
  className?: string
}

export function MaterialCard({
  material,
  isFavorited = false,
  onToggleFavorite,
  className,
}: MaterialCardProps) {
  const fileGroup = getFileTypeGroup(material.file_type)
  const IconComponent = fileTypeIcons[fileGroup] ?? File
  const iconColor = fileTypeColors[fileGroup] ?? "text-gray-400"

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "group relative flex flex-col rounded-xl border border-border bg-card",
        "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
        "transition-colors duration-300",
        className
      )}
    >
      {/* Thumbnail / Icon area */}
      <div className="relative flex items-center justify-center h-40 rounded-t-xl bg-bg-surface overflow-hidden">
        {material.thumbnail_path ? (
          <img
            src={material.thumbnail_path}
            alt={material.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center gap-2">
            <IconComponent className={cn("size-12 transition-transform duration-300 group-hover:scale-110", iconColor)} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              {fileGroup}
            </span>
          </div>
        )}

        {/* Overlay actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link
            href={`/partnerzone/material/${material.id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-sm text-white text-xs font-medium hover:bg-white/20 transition-colors"
          >
            <Eye className="size-3.5" />
            Ver
          </Link>
          <a
            href={material.file_path}
            download={material.file_name}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/80 backdrop-blur-sm text-primary-foreground text-xs font-medium hover:bg-primary transition-colors"
          >
            <Download className="size-3.5" />
            Baixar
          </a>
        </div>

        {/* Favorite button */}
        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.preventDefault()
              onToggleFavorite(material.id)
            }}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors z-10"
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
                isFavorited ? "fill-red-500 text-red-500" : "text-white"
              )}
            />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        <div className="flex items-start justify-between gap-2">
          <Link
            href={`/partnerzone/material/${material.id}`}
            className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors"
          >
            {material.title}
          </Link>
        </div>

        {material.category && (
          <Badge variant="outline" className="w-fit text-[9px]">
            {material.category.name}
          </Badge>
        )}

        <div className="flex items-center justify-between mt-auto pt-2 text-[11px] text-muted-foreground">
          <span>{formatFileSize(material.file_size)}</span>
          <span className="flex items-center gap-1">
            <Download className="size-3" />
            {material.download_count}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
