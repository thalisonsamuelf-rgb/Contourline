"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Download,
  Heart,
  FileText,
  Image,
  Video,
  Calendar,
  HardDrive,
  Tag,
  Clock,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  formatFileSize,
  getFileTypeGroup,
  type Material,
  type MaterialVersion,
} from "@/lib/partnerzone/types"

interface MaterialDetailClientProps {
  material: Material
  versions: MaterialVersion[]
}

export function MaterialDetailClient({ material, versions }: MaterialDetailClientProps) {
  const fileGroup = getFileTypeGroup(material.file_type)

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 max-w-5xl"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/partnerzone" className="hover:text-foreground transition-colors">
          PartnerZone
        </Link>
        <span>/</span>
        {material.category && (
          <>
            <Link
              href={`/partnerzone/categories/${material.category.slug}`}
              className="hover:text-foreground transition-colors"
            >
              {material.category.name}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-foreground font-medium truncate">{material.title}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Preview area */}
        <div className="flex-1 min-w-0">
          <div className="rounded-xl border border-border bg-bg-surface overflow-hidden">
            {/* Preview content */}
            <div className="relative aspect-video flex items-center justify-center bg-bg-elevated">
              {fileGroup === "image" && material.thumbnail_path ? (
                <img
                  src={material.thumbnail_path}
                  alt={material.title}
                  className="w-full h-full object-contain"
                />
              ) : fileGroup === "pdf" ? (
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <FileText className="size-16 text-red-400" />
                  <p className="text-sm">Preview PDF</p>
                  <a
                    href={`/partnerzone/api/download/${material.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                  >
                    <Eye className="size-3.5" />
                    Abrir em nova aba
                  </a>
                </div>
              ) : fileGroup === "video" ? (
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <Video className="size-16 text-purple-400" />
                  <p className="text-sm">Preview de vídeo</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <FileText className="size-16" />
                  <p className="text-sm">{material.file_type}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Details sidebar */}
        <div className="w-full lg:w-80 flex flex-col gap-5">
          {/* Title & actions */}
          <div className="flex flex-col gap-3">
            <h1 className="text-xl font-bold text-foreground">{material.title}</h1>

            {material.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {material.description}
              </p>
            )}

            <div className="flex gap-2">
              <Button
                variant="primary"
                size="md"
                className="flex-1"
                onClick={() => window.open(`/partnerzone/api/download/${material.id}`, "_blank")}
              >
                <Download className="size-4 mr-1.5" />
                Baixar
              </Button>
              <Button variant="secondary" size="md">
                <Heart className="size-4" />
              </Button>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex flex-col gap-3 p-4 rounded-xl border border-border bg-card">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Detalhes
            </h3>

            <div className="flex flex-col gap-2.5">
              {material.category && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Categoria</span>
                  <Badge variant="outline">{material.category.name}</Badge>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <HardDrive className="size-3.5" />
                  Tamanho
                </span>
                <span className="text-foreground">{formatFileSize(material.file_size)}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <FileText className="size-3.5" />
                  Formato
                </span>
                <span className="text-foreground">{material.file_name.split(".").pop()?.toUpperCase()}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Download className="size-3.5" />
                  Downloads
                </span>
                <span className="text-foreground tabular-nums">{material.download_count}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="size-3.5" />
                  Versão
                </span>
                <span className="text-foreground">v{material.version}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="size-3.5" />
                  Adicionado
                </span>
                <span className="text-foreground">
                  {new Date(material.created_at).toLocaleDateString("pt-BR")}
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {material.tags.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                <Tag className="size-3" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {material.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/partnerzone/search?q=${encodeURIComponent(tag)}`}
                    className="px-2 py-0.5 text-[10px] rounded-full bg-bg-surface text-muted-foreground hover:text-foreground hover:bg-bg-surface-hover transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Version history */}
          {versions.length > 1 && (
            <div className="flex flex-col gap-2 p-4 rounded-xl border border-border bg-card">
              <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Histórico de Versões
              </h3>
              <div className="flex flex-col gap-2">
                {versions.slice(0, 5).map((v) => (
                  <div key={v.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">v{v.version}</span>
                      {v.change_note && (
                        <span className="text-muted-foreground truncate max-w-[150px]">
                          {v.change_note}
                        </span>
                      )}
                    </div>
                    <span className="text-muted-foreground tabular-nums">
                      {new Date(v.created_at).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Back link */}
          <Link
            href="/partnerzone"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Voltar ao PartnerZone
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
