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
  LayoutGrid,
  List,
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
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
                ? "bg-[#10B981]/10 text-[#047857] border border-[#10B981]/30"
                : "bg-[#EF4444]/10 text-[#B91C1C] border border-[#EF4444]/30"
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
      <div className="flex items-center gap-2 text-sm text-black/50">
        <Link
          href="/partnerzone/admin"
          className="hover:text-black/80 transition-colors"
        >
          Admin
        </Link>
        <span>/</span>
        <span className="text-black/80 font-medium">Capas Equipamentos</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-black/80">
            Capas de Equipamentos
          </h1>
          <p className="text-sm text-black/50 mt-1">
            Gerencie as imagens de capa dos equipamentos exibidos no dashboard
          </p>
        </div>

        {/* Stats + View toggle */}
        {!loading && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-xs text-black/50">
              <span>{totalWithImage} com imagem</span>
              <span>{totalWithoutImage} sem</span>
            </div>
            <div className="flex items-center rounded-lg border border-black/[0.08] overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "grid" ? "bg-[#24336E]/10 text-[#24336E]" : "text-black/40 hover:text-black/70"
                )}
              >
                <LayoutGrid className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-2 transition-colors",
                  viewMode === "list" ? "bg-[#24336E]/10 text-[#24336E]" : "text-black/40 hover:text-black/70"
                )}
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-6 text-black/50 animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!loading && covers.length === 0 && (
        <div className="rounded-xl border border-black/[0.08] bg-white p-12 text-center">
          <ImageIcon className="size-12 text-black/30 mx-auto mb-3" />
          <p className="text-sm text-black/50">
            Nenhuma categoria de equipamento encontrada.
          </p>
        </div>
      )}

      {/* Equipment grid/list */}
      {!loading && covers.length > 0 && viewMode === "grid" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {covers.map((cover) => {
            const displayImage = getDisplayImage(cover)
            const isUploading = uploading === cover.slug
            const isRemoving = removing === cover.slug
            const hasCover = hasAnyImage(cover)

            return (
              <div
                key={cover.id}
                className="group relative rounded-lg border border-black/[0.08] bg-white overflow-hidden transition-all duration-200 hover:border-black/[0.15]"
              >
                <div className="relative aspect-square bg-[#F5F5F5] flex items-center justify-center overflow-hidden">
                  {displayImage ? (
                    <img src={displayImage} alt={cover.name} className="w-full h-full object-contain p-2" />
                  ) : (
                    <ImageIcon className="size-6 text-black/20" />
                  )}

                  {(isUploading || isRemoving) && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className={cn("size-5 animate-spin", isUploading ? "text-white" : "text-white")} />
                    </div>
                  )}

                  {!isUploading && !isRemoving && (
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => openFilePicker(cover.slug)}
                        className="p-1.5 rounded-lg bg-[#24336E] hover:bg-[#1B2655] text-white transition-colors"
                        title={hasCover ? "Alterar Capa" : "Adicionar Capa"}
                      >
                        <Camera className="size-3.5" />
                      </button>
                      {cover.has_cover && (
                        <button
                          onClick={() => handleRemove(cover.slug)}
                          className="p-1.5 rounded-lg bg-[#EF4444] hover:bg-[#B91C1C] text-white transition-colors"
                          title="Remover"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <div className="px-2 py-1.5 border-t border-black/[0.06]">
                  <p className="text-[11px] font-medium text-black/80 truncate">{cover.name}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* List view */}
      {!loading && covers.length > 0 && viewMode === "list" && (
        <div className="flex flex-col rounded-xl border border-black/[0.08] bg-white overflow-hidden divide-y divide-black/[0.06]">
          {covers.map((cover) => {
            const displayImage = getDisplayImage(cover)
            const isUploading = uploading === cover.slug
            const isRemoving = removing === cover.slug
            const hasCover = hasAnyImage(cover)

            return (
              <div key={cover.id} className="flex items-center gap-4 px-4 py-2.5 hover:bg-black/[0.02] transition-colors">
                <div className="relative size-12 rounded-lg bg-[#F5F5F5] border border-black/[0.08] overflow-hidden shrink-0 flex items-center justify-center">
                  {displayImage ? (
                    <img src={displayImage} alt={cover.name} className="w-full h-full object-contain p-1" />
                  ) : (
                    <ImageIcon className="size-4 text-black/20" />
                  )}
                  {(isUploading || isRemoving) && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Loader2 className="size-3 animate-spin text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black/80 truncate">{cover.name}</p>
                  <p className="text-[11px] text-black/40">{cover.slug}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {hasCover ? (
                    <span className="text-[10px] text-[#047857] px-2 py-0.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20">Com capa</span>
                  ) : (
                    <span className="text-[10px] text-black/50 px-2 py-0.5 rounded-full bg-black/[0.04] border border-black/[0.08]">Sem capa</span>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => openFilePicker(cover.slug)}
                    disabled={isUploading || isRemoving}
                    className="p-1.5 rounded-lg text-black/40 hover:text-[#24336E] hover:bg-[#24336E]/10 transition-colors disabled:opacity-30"
                    title={hasCover ? "Alterar Capa" : "Adicionar Capa"}
                  >
                    <Camera className="size-4" />
                  </button>
                  {cover.has_cover && (
                    <button
                      onClick={() => handleRemove(cover.slug)}
                      disabled={isRemoving}
                      className="p-1.5 rounded-lg text-black/40 hover:text-[#B91C1C] hover:bg-[#EF4444]/10 transition-colors disabled:opacity-30"
                      title="Remover"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Back link */}
      <Link
        href="/partnerzone/admin"
        className="flex items-center gap-1.5 text-xs text-black/50 hover:text-black/80 transition-colors w-fit"
      >
        <ArrowLeft className="size-3.5" />
        Voltar ao Admin
      </Link>
    </motion.div>
  )
}
