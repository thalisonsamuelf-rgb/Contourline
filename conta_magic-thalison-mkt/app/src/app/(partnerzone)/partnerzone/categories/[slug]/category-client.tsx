"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { SearchBar } from "@/components/partnerzone/search-bar"
import { MaterialGrid } from "@/components/partnerzone/material-grid"
import { CategorySidebar } from "@/components/partnerzone/category-sidebar"
import { Badge } from "@/components/ui/badge"
import type { Material, Category } from "@/lib/partnerzone/types"

interface CategoryPageClientProps {
  category: Category
  subcategories: Category[]
  materials: Material[]
  totalCount: number
  allCategories: Category[]
}

export function CategoryPageClient({
  category,
  subcategories,
  materials,
  totalCount,
  allCategories,
}: CategoryPageClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/partnerzone" className="hover:text-foreground transition-colors">
          PartnerZone
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">{category.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{category.name}</h1>
          {category.description && (
            <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">{totalCount} materiais</Badge>
            {subcategories.length > 0 && (
              <Badge variant="muted">{subcategories.length} subcategorias</Badge>
            )}
          </div>
        </div>
        <Link
          href="/partnerzone"
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors shrink-0"
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
              className="px-3 py-1.5 text-xs rounded-full border border-border hover:border-primary/50 hover:bg-primary/10 transition-colors"
            >
              {sub.name}
              {sub.material_count !== undefined && sub.material_count > 0 && (
                <span className="ml-1.5 text-muted-foreground">({sub.material_count})</span>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="flex gap-6">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block w-56 shrink-0">
          <CategorySidebar categories={allCategories} />
        </aside>

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <MaterialGrid
            materials={materials}
            emptyMessage={`Nenhum material em ${category.name} ainda.`}
          />
        </div>
      </div>
    </motion.div>
  )
}
