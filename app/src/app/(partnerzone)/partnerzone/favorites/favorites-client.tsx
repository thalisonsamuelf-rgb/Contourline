"use client"

import { useCallback, useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { MaterialGrid } from "@/components/partnerzone/material-grid"
import type { Material } from "@/lib/partnerzone/types"

interface FavoritesClientProps {
  materials: Material[]
  userId: string
}

export function FavoritesClient({ materials, userId }: FavoritesClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set())

  const favoriteIds = new Set(
    materials
      .filter((m) => !removingIds.has(m.id))
      .map((m) => m.id)
  )

  const handleToggleFavorite = useCallback(
    async (materialId: string) => {
      // Optimistic: mark as removing
      setRemovingIds((prev) => new Set(prev).add(materialId))

      try {
        const res = await fetch("/partnerzone/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_id: userId, material_id: materialId }),
        })

        if (!res.ok) {
          // Revert on error
          setRemovingIds((prev) => {
            const next = new Set(prev)
            next.delete(materialId)
            return next
          })
          return
        }

        // Refresh server data to get updated list
        startTransition(() => {
          router.refresh()
        })
      } catch {
        // Revert on network error
        setRemovingIds((prev) => {
          const next = new Set(prev)
          next.delete(materialId)
          return next
        })
      }
    },
    [userId, router]
  )

  // Filter out optimistically removed items for display
  const visibleMaterials = materials.filter((m) => !removingIds.has(m.id))

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Heart className="size-6 text-red-400" />
          Meus Favoritos
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Materiais que voce salvou para acesso rapido
          {visibleMaterials.length > 0 && (
            <span className="ml-1">
              ({visibleMaterials.length} {visibleMaterials.length === 1 ? "material" : "materiais"})
            </span>
          )}
        </p>
      </div>

      <MaterialGrid
        materials={visibleMaterials}
        favoriteIds={favoriteIds}
        onToggleFavorite={handleToggleFavorite}
        emptyMessage="Voce ainda nao favoritou nenhum material. Clique no coracao em qualquer material para salvar aqui."
      />

      {isPending && (
        <div className="fixed bottom-4 right-4 px-3 py-1.5 rounded-lg bg-card border border-border text-xs text-muted-foreground shadow-lg">
          Atualizando...
        </div>
      )}
    </motion.div>
  )
}
