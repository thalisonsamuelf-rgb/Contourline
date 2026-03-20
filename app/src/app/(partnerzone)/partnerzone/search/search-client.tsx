"use client"

import { motion } from "framer-motion"
import { SearchBar } from "@/components/partnerzone/search-bar"
import { MaterialGrid } from "@/components/partnerzone/material-grid"
import { CategorySidebar } from "@/components/partnerzone/category-sidebar"
import { Badge } from "@/components/ui/badge"
import type { Material, Category } from "@/lib/partnerzone/types"

interface SearchPageClientProps {
  query: string
  materials: Material[]
  totalCount: number
  categories: Category[]
  sort?: string
}

export function SearchPageClient({
  query,
  materials,
  totalCount,
  categories,
  sort,
}: SearchPageClientProps) {
  const title = query
    ? `Resultados para "${query}"`
    : sort === "popular"
    ? "Mais Baixados"
    : sort === "recent"
    ? "Adicionados Recentemente"
    : "Todos os Materiais"

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {totalCount} {totalCount === 1 ? "material encontrado" : "materiais encontrados"}
        </p>
      </div>

      <SearchBar showFilters className="max-w-2xl" />

      <div className="flex gap-6">
        <aside className="hidden lg:block w-56 shrink-0">
          <CategorySidebar categories={categories} />
        </aside>

        <div className="flex-1 min-w-0">
          <MaterialGrid
            materials={materials}
            emptyMessage={
              query
                ? `Nenhum resultado para "${query}". Tente termos diferentes.`
                : "Nenhum material disponível."
            }
          />
        </div>
      </div>
    </motion.div>
  )
}
