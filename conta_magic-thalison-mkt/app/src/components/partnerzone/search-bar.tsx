"use client"

import { useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, X, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  placeholder?: string
  className?: string
  showFilters?: boolean
}

export function SearchBar({
  placeholder = "Buscar materiais...",
  className,
  showFilters = false,
}: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const [filtersOpen, setFiltersOpen] = useState(false)

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (query.trim()) {
        router.push(`/partnerzone/search?q=${encodeURIComponent(query.trim())}`)
      }
    },
    [query, router]
  )

  const handleClear = useCallback(() => {
    setQuery("")
  }, [])

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
            className="h-11 px-3"
            onClick={() => setFiltersOpen(!filtersOpen)}
          >
            <SlidersHorizontal className="size-4" />
          </Button>
        )}
      </form>

      {showFilters && filtersOpen && (
        <div className="mt-3 p-4 rounded-lg border border-border bg-bg-surface animate-in fade-in-0 slide-in-from-top-2 duration-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Tipo de arquivo
              </label>
              <div className="flex gap-1.5">
                {["PDF", "Imagem", "Vídeo", "Documento", "Planilha"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    className="px-2.5 py-1 text-xs rounded-full border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
