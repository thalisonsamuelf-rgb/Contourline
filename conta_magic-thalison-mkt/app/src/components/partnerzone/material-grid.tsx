"use client"

import { MaterialCard } from "./material-card"
import { cn } from "@/lib/utils"
import type { Material } from "@/lib/partnerzone/types"

interface MaterialGridProps {
  materials: Material[]
  favoriteIds?: Set<string>
  onToggleFavorite?: (materialId: string) => void
  emptyMessage?: string
  className?: string
}

export function MaterialGrid({
  materials,
  favoriteIds,
  onToggleFavorite,
  emptyMessage = "Nenhum material encontrado.",
  className,
}: MaterialGridProps) {
  if (materials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="size-16 rounded-full bg-bg-surface flex items-center justify-center mb-4">
          <span className="text-2xl">📁</span>
        </div>
        <p className="text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
        className
      )}
    >
      {materials.map((material) => (
        <MaterialCard
          key={material.id}
          material={material}
          isFavorited={favoriteIds?.has(material.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}
