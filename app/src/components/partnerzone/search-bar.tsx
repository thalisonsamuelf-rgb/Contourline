"use client"

import { useState, useCallback, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X, SlidersHorizontal, FileText, Image, Video, File, Table, Presentation, Check } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  placeholder?: string
  className?: string
  showFilters?: boolean
  availableTags?: string[]
  activeFileType?: string
  activeDateRange?: string
  activeTags?: string[]
}

const FILE_TYPE_OPTIONS = [
  { value: "pdf", label: "PDF", icon: FileText },
  { value: "image", label: "Imagem", icon: Image },
  { value: "video", label: "Video", icon: Video },
  { value: "document", label: "Documento", icon: File },
  { value: "spreadsheet", label: "Planilha", icon: Table },
  { value: "presentation", label: "Apresentacao", icon: Presentation },
] as const

const DATE_RANGE_OPTIONS = [
  { value: "7d", label: "Ultimos 7 dias" },
  { value: "30d", label: "Ultimos 30 dias" },
  { value: "90d", label: "Ultimos 90 dias" },
  { value: "all", label: "Todo o periodo" },
] as const

export function SearchBar({
  placeholder = "Buscar materiais...",
  className,
  showFilters = false,
  availableTags = [],
  activeFileType,
  activeDateRange,
  activeTags = [],
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const [filtersOpen, setFiltersOpen] = useState(
    !!(activeFileType || (activeDateRange && activeDateRange !== "all") || activeTags.length > 0)
  )

  const [selectedFileType, setSelectedFileType] = useState<string | undefined>(activeFileType)
  const [selectedDateRange, setSelectedDateRange] = useState<string>(activeDateRange ?? "all")
  const [selectedTags, setSelectedTags] = useState<string[]>(activeTags)

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (selectedFileType) count++
    if (selectedDateRange && selectedDateRange !== "all") count++
    if (selectedTags.length > 0) count++
    return count
  }, [selectedFileType, selectedDateRange, selectedTags])

  const buildSearchUrl = useCallback(
    (overrides?: {
      q?: string
      fileType?: string | undefined
      dateRange?: string
      tags?: string[]
    }) => {
      const params = new URLSearchParams()
      const q = overrides?.q ?? query.trim()
      const ft = overrides?.fileType !== undefined ? overrides.fileType : selectedFileType
      const dr = overrides?.dateRange ?? selectedDateRange
      const tg = overrides?.tags ?? selectedTags

      if (q) params.set("q", q)

      // Preserve sort if present
      const sort = searchParams.get("sort")
      if (sort) params.set("sort", sort)

      if (ft) params.set("file_type", ft)
      if (dr && dr !== "all") params.set("date_range", dr)
      if (tg.length > 0) params.set("tags", tg.join(","))

      return `/partnerzone/search?${params.toString()}`
    },
    [query, selectedFileType, selectedDateRange, selectedTags, searchParams]
  )

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      router.push(buildSearchUrl())
    },
    [router, buildSearchUrl]
  )

  const handleClear = useCallback(() => {
    setQuery("")
  }, [])

  const handleFileTypeToggle = useCallback(
    (value: string) => {
      const next = selectedFileType === value ? undefined : value
      setSelectedFileType(next)
      router.push(buildSearchUrl({ fileType: next }))
    },
    [selectedFileType, router, buildSearchUrl]
  )

  const handleDateRangeChange = useCallback(
    (value: string) => {
      setSelectedDateRange(value)
      router.push(buildSearchUrl({ dateRange: value }))
    },
    [router, buildSearchUrl]
  )

  const handleTagToggle = useCallback(
    (tag: string) => {
      const next = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
      setSelectedTags(next)
      router.push(buildSearchUrl({ tags: next }))
    },
    [selectedTags, router, buildSearchUrl]
  )

  const handleClearFilters = useCallback(() => {
    setSelectedFileType(undefined)
    setSelectedDateRange("all")
    setSelectedTags([])
    const params = new URLSearchParams()
    const q = query.trim()
    if (q) params.set("q", q)
    const sort = searchParams.get("sort")
    if (sort) params.set("sort", sort)
    router.push(`/partnerzone/search?${params.toString()}`)
  }, [query, searchParams, router])

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSearch} className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="pl-10 pr-10 h-11 bg-bg-surface border-border-subtle focus-visible:border-primary/50 focus-visible:ring-primary/20"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <Button type="submit" variant="primary" size="sm" className="h-11 px-6">
          Buscar
        </Button>

        {showFilters && (
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className={cn(
              "h-11 px-3 relative",
              activeFilterCount > 0 && "border-primary/50 bg-primary/5"
            )}
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal className="size-4" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 size-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
        )}
      </form>

      {showFilters && filtersOpen && (
        <div className="mt-3 p-4 rounded-lg border border-border bg-bg-surface animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-5">
            {/* File Type Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Tipo de arquivo
              </label>
              <div className="flex flex-wrap gap-1.5">
                {FILE_TYPE_OPTIONS.map(({ value, label, icon: Icon }) => {
                  const isActive = selectedFileType === value
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleFileTypeToggle(value)}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border transition-colors",
                        isActive
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="size-3.5" />
                      {label}
                      {isActive && <Check className="size-3" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Periodo
              </label>
              <div className="flex flex-wrap gap-1.5">
                {DATE_RANGE_OPTIONS.map(({ value, label }) => {
                  const isActive = selectedDateRange === value
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => handleDateRangeChange(value)}
                      className={cn(
                        "px-3 py-1.5 text-xs rounded-full border transition-colors",
                        isActive
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Tags Filter */}
            {availableTags.length > 0 && (
              <div className="flex flex-col gap-2">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Tags
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {availableTags.map((tag) => {
                    const isActive = selectedTags.includes(tag)
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleTagToggle(tag)}
                        className={cn(
                          "flex items-center gap-1 px-2.5 py-1 text-xs rounded-full border transition-colors",
                          isActive
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border hover:border-primary/50 hover:bg-primary/5 text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {tag}
                        {isActive && <Check className="size-3" />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Clear Filters */}
            {activeFilterCount > 0 && (
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex gap-1.5">
                  {selectedFileType && (
                    <Badge variant="muted" className="text-xs gap-1">
                      {FILE_TYPE_OPTIONS.find((o) => o.value === selectedFileType)?.label}
                      <button onClick={() => handleFileTypeToggle(selectedFileType)} className="hover:text-foreground">
                        <X className="size-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedDateRange && selectedDateRange !== "all" && (
                    <Badge variant="muted" className="text-xs gap-1">
                      {DATE_RANGE_OPTIONS.find((o) => o.value === selectedDateRange)?.label}
                      <button onClick={() => handleDateRangeChange("all")} className="hover:text-foreground">
                        <X className="size-3" />
                      </button>
                    </Badge>
                  )}
                  {selectedTags.length > 0 && (
                    <Badge variant="muted" className="text-xs gap-1">
                      {selectedTags.length} tag{selectedTags.length > 1 ? "s" : ""}
                      <button onClick={() => { setSelectedTags([]); router.push(buildSearchUrl({ tags: [] })) }} className="hover:text-foreground">
                        <X className="size-3" />
                      </button>
                    </Badge>
                  )}
                </div>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Limpar todos
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
