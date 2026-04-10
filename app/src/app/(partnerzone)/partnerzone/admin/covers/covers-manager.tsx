"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Upload,
  Trash2,
  Loader2,
  ImageIcon,
  CheckCircle,
  XCircle,
  Camera,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Category } from "@/lib/partnerzone/types"

/* ── Static image mapping (mirrors dashboard-client.tsx) ──────────── */

const equipmentImages: Record<string, string> = {
  "crystal 3d": "/equipamentos/Crystal 3D.png",
  "enygma": "/equipamentos/enygma.png",
  "focuskin": "/equipamentos/Focuskin.png",
  "folix": "/equipamentos/Folix.png",
  "hipro": "/equipamentos/Hipro.png",
  "hipro med": "/equipamentos/Hipro med.png",
  "hipro hof": "/equipamentos/HIPRO HOF.png",
  "hipro prime": "/equipamentos/Hipro Prime Edition.png",
  "hipro prime edition": "/equipamentos/Hipro Prime Edition.png",
  "hive pro": "/equipamentos/Hive pro.png",
  "iconyc": "/equipamentos/Iconyc.png",
  "inkie laser": "/equipamentos/Inkie Laser.png",
  "inkie light": "/equipamentos/inkie light.png",
  "multishape": "/equipamentos/multishape.png",
  "s30": "/equipamentos/S30.png",
  "s -30": "/equipamentos/S30.png",
  "s-30": "/equipamentos/S30.png",
  "m30": "/equipamentos/m30.png",
  "m - 30": "/equipamentos/m30.png",
  "m-30": "/equipamentos/m30.png",
  "supreme pro": "/equipamentos/Supreme Pro.png",
  "bhs 156 full": "/equipamentos/bhs 156full.png",
  "bhs 156full": "/equipamentos/bhs 156full.png",
  "bhs 156 full - criofrequencia": "/equipamentos/bhs 156full.png",
  "bhs 156 full enygma": "/equipamentos/bhs 156full.png",
  "fusion 3": "/equipamentos/fusion 3.png",
  "laser fusion": "/equipamentos/fusion 3.png",
  "raytrace": "/equipamentos/raytrace.png",
  "reverso": "/equipamentos/Reverso.png",
  "creator 600": "/equipamentos/Creator 600.png",
  "ultralift": "/equipamentos/UltraLift.png",
  "unyque pro": "/equipamentos/Unyque Pro.png",
  "unyque pro enygma": "/equipamentos/Unyque Pro Enygma.png",
  "x-tonus": "/equipamentos/X-Tonus.png",
  "xtonus": "/equipamentos/xtonus.png",
  "x tonus": "/equipamentos/X-Tonus.png",
  "visbody": "/equipamentos/Visbody.png",
  "lumenis": "/equipamentos/Lumenis.png",
  "alpha": "/equipamentos/Alplha.png",
  "alplha": "/equipamentos/Alplha.png",
  "nuera tight": "/equipamentos/Nuera tight.png",
  "splendor x": "/equipamentos/splendor x.png",
  "stellar": "/equipamentos/stellar.png",
  "trilift": "/equipamentos/trilift.png",
  "adella laser": "/equipamentos/Inkie Laser.png",
  "adella led": "/equipamentos/inkie light.png",
  "adellaled1": "/equipamentos/inkie light.png",
}

function getStaticImage(name: string): string | null {
  const lower = name.toLowerCase().trim()
  if (equipmentImages[lower]) return equipmentImages[lower]
  for (const [key, val] of Object.entries(equipmentImages)) {
    if (lower.includes(key) || key.includes(lower)) return val
  }
  return null
}

/* ── Types ────────────────────────────────────────────────────────── */

interface CoverInfo {
  id: string
  name: string
  slug: string
  has_cover: boolean
  cover_url: string | null
}

interface ToastMessage {
  id: number
  type: "success" | "error"
  text: string
}

/* ── Component ────────────────────────────────────────────────────── */

interface CoversManagerProps {
  categories: Category[]
}

export default function CoversManager({ categories }: CoversManagerProps) {
  const [covers, setCovers] = useState<CoverInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState<string | null>(null)
  const [removing, setRemoving] = useState<string | null>(null)
  const [previewMap, setPreviewMap] = useState<Record<string, string>>({})
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const activeSlugRef = useRef<string | null>(null)
  const toastIdRef = useRef(0)

  const addToast = useCallback((type: "success" | "error", text: string) => {
    const id = ++toastIdRef.current
    setToasts((prev) => [...prev, { id, type, text }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  // Fetch cover info from API
  const fetchCovers = useCallback(async () => {
    try {
      const res = await fetch("/partnerzone/api/covers")
      if (!res.ok) throw new Error("Falha ao carregar capas")
      const json = await res.json()
      setCovers(json.data ?? [])
    } catch {
      // If API fails, build from categories prop with static images only
      setCovers(
        categories.map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          has_cover: false,
          cover_url: null,
        }))
      )
    } finally {
      setLoading(false)
    }
  }, [categories])

  useEffect(() => {
    fetchCovers()
  }, [fetchCovers])

  // Get the display image for a category
  function getDisplayImage(cover: CoverInfo): string | null {
    // Priority: preview > uploaded cover in Storage > static image
    if (previewMap[cover.slug]) return previewMap[cover.slug]
    if (cover.cover_url) return cover.cover_url
    return getStaticImage(cover.name)
  }

  // Has any image (static or uploaded)
  function hasAnyImage(cover: CoverInfo): boolean {
    return !!(previewMap[cover.slug] || cover.cover_url || getStaticImage(cover.name))
  }

  // Trigger file picker for a specific category
  function openFilePicker(slug: string) {
    activeSlugRef.current = slug
    fileInputRef.current?.click()
  }

  // Handle file selection
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    const slug = activeSlugRef.current
    if (!file || !slug) return

    // Reset input so same file can be re-selected
    e.target.value = ""

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      addToast("error", "Arquivo muito grande. Maximo 5MB.")
      return
    }

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file)
    setPreviewMap((prev) => ({ ...prev, [slug]: previewUrl }))

    // Upload
    setUploading(slug)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("slug", slug)

      const res = await fetch("/partnerzone/api/covers", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error ?? "Upload falhou")
      }

      const json = await res.json()

      // Update covers state with the new URL
      setCovers((prev) =>
        prev.map((c) =>
          c.slug === slug
            ? { ...c, has_cover: true, cover_url: json.data.cover_url }
            : c
        )
      )

      // Clear preview (uploaded URL will be used now)
      setPreviewMap((prev) => {
        const copy = { ...prev }
        delete copy[slug]
        URL.revokeObjectURL(previewUrl)
        return copy
      })

      addToast("success", "Capa atualizada com sucesso!")
    } catch (err) {
      // Revert preview on error
      setPreviewMap((prev) => {
        const copy = { ...prev }
        delete copy[slug]
        URL.revokeObjectURL(previewUrl)
        return copy
      })
      addToast("error", err instanceof Error ? err.message : "Erro ao enviar capa")
    } finally {
      setUploading(null)
    }
  }

  // Remove cover
  async function handleRemove(slug: string) {
    if (!confirm("Tem certeza que deseja remover esta capa?")) return

    setRemoving(slug)
    try {
      const res = await fetch(`/partnerzone/api/covers?slug=${slug}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error ?? "Falha ao remover")
      }

      setCovers((prev) =>
        prev.map((c) =>
          c.slug === slug ? { ...c, has_cover: false, cover_url: null } : c
        )
      )

      addToast("success", "Capa removida com sucesso!")
    } catch (err) {
      addToast("error", err instanceof Error ? err.message : "Erro ao remover capa")
    } finally {
      setRemoving(null)
    }
  }

  // Count stats
  const totalWithImage = covers.filter((c) => hasAnyImage(c)).length
  const totalWithoutImage = covers.length - totalWithImage
  const totalUploaded = covers.filter((c) => c.has_cover).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Toast notifications */}
      <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className={cn(
              "flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium shadow-lg",
              toast.type === "success"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-red-500/20 text-red-300 border border-red-500/30"
            )}
          >
            {toast.type === "success" ? (
              <CheckCircle className="size-4 shrink-0" />
            ) : (
              <XCircle className="size-4 shrink-0" />
            )}
            {toast.text}
          </motion.div>
        ))}
      </div>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-white/40">
        <Link
          href="/partnerzone/admin"
          className="hover:text-white/70 transition-colors"
        >
          Admin
        </Link>
        <span>/</span>
        <span className="text-white/70 font-medium">Capas Equipamentos</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Capas de Equipamentos
          </h1>
          <p className="text-sm text-white/40 mt-1">
            Gerencie as imagens de capa dos equipamentos exibidos no dashboard
          </p>
        </div>

        {/* Stats */}
        {!loading && (
          <div className="flex items-center gap-4 text-xs text-white/40">
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-400" />
              {totalWithImage} com imagem
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-white/20" />
              {totalWithoutImage} sem imagem
            </div>
            <div className="flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-blue-400" />
              {totalUploaded} no Storage
            </div>
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-6 text-white/40 animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!loading && covers.length === 0 && (
        <div className="rounded-xl border border-white/[0.06] bg-[#0c1220] p-12 text-center">
          <ImageIcon className="size-12 text-white/20 mx-auto mb-3" />
          <p className="text-sm text-white/40">
            Nenhuma categoria de equipamento encontrada.
          </p>
        </div>
      )}

      {/* Equipment grid */}
      {!loading && covers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {covers.map((cover) => {
            const displayImage = getDisplayImage(cover)
            const isUploading = uploading === cover.slug
            const isRemoving = removing === cover.slug
            const hasCover = hasAnyImage(cover)

            return (
              <div
                key={cover.id}
                className="group relative rounded-xl border border-white/[0.06] bg-[#0c1220] overflow-hidden transition-all duration-200 hover:border-white/[0.12]"
              >
                {/* Image area */}
                <div className="relative aspect-[4/3] bg-[#080d16] flex items-center justify-center overflow-hidden">
                  {displayImage ? (
                    <img
                      src={displayImage}
                      alt={cover.name}
                      className="w-full h-full object-contain p-3"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-white/15">
                      <ImageIcon className="size-10" />
                      <span className="text-xs">Sem capa</span>
                    </div>
                  )}

                  {/* Upload overlay */}
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="size-6 text-blue-400 animate-spin" />
                        <span className="text-xs text-white/60">Enviando...</span>
                      </div>
                    </div>
                  )}

                  {/* Removing overlay */}
                  {isRemoving && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="size-6 text-red-400 animate-spin" />
                        <span className="text-xs text-white/60">Removendo...</span>
                      </div>
                    </div>
                  )}

                  {/* Hover overlay with actions */}
                  {!isUploading && !isRemoving && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => openFilePicker(cover.slug)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-500/90 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
                      >
                        <Camera className="size-3.5" />
                        {hasCover ? "Alterar Capa" : "Adicionar Capa"}
                      </button>

                      {cover.has_cover && (
                        <button
                          onClick={() => handleRemove(cover.slug)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/90 hover:bg-red-500 text-white text-xs font-medium transition-colors"
                        >
                          <Trash2 className="size-3.5" />
                          Remover
                        </button>
                      )}
                    </div>
                  )}

                  {/* Status badge */}
                  {cover.has_cover && (
                    <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-medium border border-blue-500/30">
                      <Upload className="size-2.5" />
                      Storage
                    </div>
                  )}
                </div>

                {/* Info area */}
                <div className="px-3 py-2.5 border-t border-white/[0.06]">
                  <p className="text-sm font-medium text-white truncate">
                    {cover.name}
                  </p>
                  <p className="text-[11px] text-white/30 mt-0.5">
                    {cover.slug}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Back link */}
      <Link
        href="/partnerzone/admin"
        className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors w-fit"
      >
        <ArrowLeft className="size-3.5" />
        Voltar ao Admin
      </Link>
    </motion.div>
  )
}
