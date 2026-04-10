"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileText,
  Download,
  FolderOpen,
  ArrowRight,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Clock,
  Search,
  LayoutGrid,
  List,
} from "lucide-react"
import { MaterialGrid } from "@/components/partnerzone/material-grid"
import { cn } from "@/lib/utils"
import { formatFileSize } from "@/lib/partnerzone/types"
import Image from "next/image"
import type { Material, Category } from "@/lib/partnerzone/types"

const equipmentImages: Record<string, string> = {
  // Crystal / Enygma
  "crystal 3d": "/equipamentos/Crystal 3D.png",
  "enygma": "/equipamentos/enygma.png",
  // Focuskin / Folix
  "focuskin": "/equipamentos/Focuskin.png",
  "folix": "/equipamentos/Folix.png",
  // Hipro variants
  "hipro": "/equipamentos/Hipro.png",
  "hipro med": "/equipamentos/Hipro med.png",
  "hipro hof": "/equipamentos/HIPRO HOF.png",
  "hipro prime": "/equipamentos/Hipro Prime Edition.png",
  "hipro prime edition": "/equipamentos/Hipro Prime Edition.png",
  // Hive / Iconyc
  "hive pro": "/equipamentos/Hive pro.png",
  "iconyc": "/equipamentos/Iconyc.png",
  // Inkie
  "inkie laser": "/equipamentos/Inkie Laser.png",
  "inkie light": "/equipamentos/inkie light.png",
  // Multishape
  "multishape": "/equipamentos/multishape.png",
  // S30 / M30 variants (Supabase may have "S -30", "M - 30", etc.)
  "s30": "/equipamentos/S30.png",
  "s -30": "/equipamentos/S30.png",
  "s-30": "/equipamentos/S30.png",
  "m30": "/equipamentos/m30.png",
  "m - 30": "/equipamentos/m30.png",
  "m-30": "/equipamentos/m30.png",
  // Supreme Pro
  "supreme pro": "/equipamentos/Supreme Pro.png",
  // BHS 156 variants
  "bhs 156 full": "/equipamentos/bhs 156full.png",
  "bhs 156full": "/equipamentos/bhs 156full.png",
  "bhs 156 full - criofrequência": "/equipamentos/bhs 156full.png",
  "bhs 156 full - criofrequencia": "/equipamentos/bhs 156full.png",
  "bhs 156 full enygma": "/equipamentos/bhs 156full.png",
  // Fusion / Raytrace / Reverso
  "fusion 3": "/equipamentos/fusion 3.png",
  "laser fusion": "/equipamentos/fusion 3.png",
  "raytrace": "/equipamentos/raytrace.png",
  "reverso": "/equipamentos/Reverso.png",
  // Creator 600
  "creator 600": "/equipamentos/Creator 600.png",
  // UltraLift / Unyque
  "ultralift": "/equipamentos/UltraLift.png",
  "unyque pro": "/equipamentos/Unyque Pro.png",
  "unyque pro enygma": "/equipamentos/Unyque Pro Enygma.png",
  // X-Tonus
  "x-tonus": "/equipamentos/X-Tonus.png",
  "xtonus": "/equipamentos/xtonus.png",
  "x tonus": "/equipamentos/X-Tonus.png",
  // Others
  "visbody": "/equipamentos/Visbody.png",
  "lumenis": "/equipamentos/Lumenis.png",
  "alpha": "/equipamentos/Alplha.png",
  "alplha": "/equipamentos/Alplha.png",
  "nuera tight": "/equipamentos/Nuera tight.png",
  "splendor x": "/equipamentos/splendor x.png",
  "stellar": "/equipamentos/stellar.png",
  "trilift": "/equipamentos/trilift.png",
  // Adella variants
  "adella laser": "/equipamentos/Inkie Laser.png",
  "adella led": "/equipamentos/inkie light.png",
  "adellaled1": "/equipamentos/inkie light.png",
}

const hiddenCategories = new Set([
  "body health portugal",
  "bodysculpt",
  "eurofeedback",
  "manuais do usuario",
  "manuais do usuário",
  "materiais",
  "medical care",
  "sheila melo",
  "techloc",
  "zelotech",
  "adellaled1",
  "adella led 1",
  "hipro hof",
  "zelo tech",
  "zelo-tech",
])

function isCategoryHidden(name: string): boolean {
  const lower = name.toLowerCase().trim()
  if (hiddenCategories.has(lower)) return true
  for (const hidden of hiddenCategories) {
    if (lower.includes(hidden) || hidden.includes(lower)) return true
  }
  return false
}

function getEquipmentImage(name: string): string | null {
  const lower = name.toLowerCase().trim()
  if (equipmentImages[lower]) return equipmentImages[lower]
  // fuzzy match: check if any key is contained in the name or vice versa
  for (const [key, val] of Object.entries(equipmentImages)) {
    if (lower.includes(key) || key.includes(lower)) return val
  }
  return null
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
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
}

interface AutocompleteResult {
  categories: Category[]
  materials: Material[]
  totalMaterials: number
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
  const router = useRouter()
  const materialsScrollRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<HTMLDivElement>(null)

  const [searchQuery, setSearchQuery] = useState("")
  const [autocompleteResults, setAutocompleteResults] = useState<AutocompleteResult | null>(null)
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Close autocomplete on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(e.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(e.target as Node)
      ) {
        setShowAutocomplete(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Autocomplete search with debounce
  const handleSearchInput = useCallback(
    (value: string) => {
      setSearchQuery(value)

      if (debounceRef.current) clearTimeout(debounceRef.current)

      if (value.trim().length < 2) {
        setAutocompleteResults(null)
        setShowAutocomplete(false)
        return
      }

      debounceRef.current = setTimeout(() => {
        const query = value.trim().toLowerCase()

        // Filter categories matching the query
        const matchedCategories = categories.filter(
          (c) =>
            c.name.toLowerCase().includes(query) ||
            (c.description && c.description.toLowerCase().includes(query))
        )

        // Filter materials matching the query (from popular + recent combined)
        const allMaterials = [...popularMaterials, ...recentMaterials]
        const seen = new Set<string>()
        const uniqueMaterials: Material[] = []
        for (const m of allMaterials) {
          if (!seen.has(m.id)) {
            seen.add(m.id)
            uniqueMaterials.push(m)
          }
        }

        const matchedMaterials = uniqueMaterials.filter(
          (m) =>
            m.title.toLowerCase().includes(query) ||
            (m.category?.name && m.category.name.toLowerCase().includes(query)) ||
            (m.description && m.description.toLowerCase().includes(query))
        )

        setAutocompleteResults({
          categories: matchedCategories.slice(0, 4),
          materials: matchedMaterials.slice(0, 5),
          totalMaterials: matchedMaterials.length,
        })
        setShowAutocomplete(true)
      }, 300)
    },
    [categories, popularMaterials, recentMaterials]
  )

  const handleSearchSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (searchQuery.trim()) {
        setShowAutocomplete(false)
        router.push(`/partnerzone/search?q=${encodeURIComponent(searchQuery.trim())}`)
      }
    },
    [searchQuery, router]
  )

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
      {/* Hero / Welcome Section */}
      <motion.div variants={itemVariants} className="flex flex-col gap-6">
        {/* Top row: avatar + welcome + stats */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center size-[60px] rounded-full bg-[#24336E] text-white text-xl font-bold shrink-0">
              CL
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] text-black/50">Bem-vindo ao</span>
              <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-black/80">
                PartnerZone
              </h1>
            </div>
          </div>

        </div>

        {/* Search bar */}
        <div className="relative">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-black/40" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
                onFocus={() => {
                  if (autocompleteResults && searchQuery.trim().length >= 2) {
                    setShowAutocomplete(true)
                  }
                }}
                placeholder="Buscar materiais..."
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-white border border-black/[0.08] text-black/80 text-[14px] placeholder-black/30 focus:outline-none focus:border-[#24336E]/40 focus:ring-1 focus:ring-[#24336E]/20 transition-all"
              />
            </div>
            <button
              type="submit"
              className="h-12 px-6 rounded-xl bg-[#24336E] hover:bg-[#1B2655] text-white text-[13px] font-semibold transition-colors shrink-0"
            >
              Buscar
            </button>
            <button
              type="button"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="h-12 px-3 rounded-xl bg-white border border-black/[0.08] text-black/50 hover:text-black/80 hover:border-black/[0.15] transition-all shrink-0"
            >
              {viewMode === "grid" ? (
                <List className="size-5" />
              ) : (
                <LayoutGrid className="size-5" />
              )}
            </button>
          </form>

          {/* Autocomplete dropdown */}
          <AnimatePresence>
            {showAutocomplete && autocompleteResults && (
              <motion.div
                ref={autocompleteRef}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute top-full left-0 right-0 mt-2 z-50 rounded-xl bg-white border border-black/[0.08] shadow-xl shadow-black/10 overflow-hidden max-h-[420px] overflow-y-auto"
              >
                {/* Equipment/Category results */}
                {autocompleteResults.categories.length > 0 && (
                  <div className="p-3">
                    <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">
                      Equipamentos
                    </p>
                    {autocompleteResults.categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/partnerzone/categories/${cat.slug}`}
                        onClick={() => setShowAutocomplete(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black/[0.04] transition-colors"
                      >
                        <Cpu className="size-4 text-[#24336E] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] text-black/80 font-medium truncate">{cat.name}</p>
                          {cat.description && (
                            <p className="text-[11px] text-black/40 truncate">{cat.description}</p>
                          )}
                        </div>
                        <ChevronRight className="size-3.5 text-black/30 shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* Separator */}
                {autocompleteResults.categories.length > 0 && autocompleteResults.materials.length > 0 && (
                  <div className="mx-3 h-px bg-black/[0.08]" />
                )}

                {/* Material results */}
                {autocompleteResults.materials.length > 0 && (
                  <div className="p-3">
                    <p className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">
                      Materiais ({autocompleteResults.totalMaterials})
                    </p>
                    {autocompleteResults.materials.map((material) => (
                      <Link
                        key={material.id}
                        href={`/partnerzone/material/${material.id}`}
                        onClick={() => setShowAutocomplete(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black/[0.04] transition-colors"
                      >
                        <FileText className="size-4 text-[#24336E] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] text-black/80 font-medium truncate">{material.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {material.category && (
                              <span className="text-[10px] text-[#24336E]/70 font-medium">
                                {material.category.name}
                              </span>
                            )}
                            <span className="text-[10px] text-black/30">
                              {formatFileSize(material.file_size)}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="size-3.5 text-black/30 shrink-0" />
                      </Link>
                    ))}
                  </div>
                )}

                {/* No results */}
                {autocompleteResults.categories.length === 0 && autocompleteResults.materials.length === 0 && (
                  <div className="p-6 text-center">
                    <p className="text-[13px] text-black/50">Nenhum resultado encontrado</p>
                  </div>
                )}

                {/* Search all link */}
                {(autocompleteResults.categories.length > 0 || autocompleteResults.materials.length > 0) && (
                  <div className="border-t border-black/[0.08] p-2">
                    <button
                      onClick={() => {
                        setShowAutocomplete(false)
                        router.push(`/partnerzone/search?q=${encodeURIComponent(searchQuery.trim())}`)
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-[12px] text-[#24336E] hover:bg-[#24336E]/10 transition-colors"
                    >
                      <Search className="size-3.5" />
                      Ver todos os resultados para &quot;{searchQuery.trim()}&quot;
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>


      {/* Equipamentos Section */}
      <motion.section variants={itemVariants} className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-black/80">Equipamentos</h2>
          <Link
            href="/partnerzone/categories"
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-[12px] text-[#24336E] hover:bg-[#24336E]/10 transition-all"
          >
            Ver todas <ArrowRight className="size-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {categories.filter((cat) => !isCategoryHidden(cat.name)).map((cat) => {
            const img = getEquipmentImage(cat.name)
            return (
              <motion.div
                key={cat.id}
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
              >
                <Link
                  href={`/partnerzone/categories/${cat.slug}`}
                  className="group relative block aspect-[4/3] rounded-2xl overflow-hidden bg-[#24336E] shadow-sm hover:shadow-xl transition-shadow duration-300"
                >
                  {img ? (
                    <Image
                      src={img}
                      alt={cat.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Cpu className="size-10 text-white/40" />
                    </div>
                  )}

                  {/* Bottom gradient overlay with name */}
                  <div className="absolute inset-x-0 bottom-0 p-3 pt-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <h3 className="text-[13px] font-semibold text-white truncate drop-shadow-md">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* Materiais Recentes */}
      {recentMaterials.length > 0 && (
        <motion.section variants={itemVariants} className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-7 rounded-lg bg-[#10B981]/10">
                <Clock className="size-3.5 text-[#047857]" />
              </div>
              <h2 className="text-lg font-bold text-black/80">Materiais Recentes</h2>
            </div>
            <Link
              href="/partnerzone/search?sort=recent"
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-[12px] text-[#047857] hover:bg-[#10B981]/10 transition-all"
            >
              Ver todos <ArrowRight className="size-3" />
            </Link>
          </div>
          <MaterialGrid
            materials={recentMaterials}
            emptyMessage="Nenhum material adicionado ainda."
          />
        </motion.section>
      )}
    </motion.div>
  )
}
