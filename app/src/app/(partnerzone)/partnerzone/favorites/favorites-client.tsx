"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"
import { MaterialGrid } from "@/components/partnerzone/material-grid"

export function FavoritesClient() {
  // In production, this would fetch from Supabase using the authenticated user ID
  // For now, show empty state with instructions
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
          Materiais que você salvou para acesso rápido
        </p>
      </div>

      <MaterialGrid
        materials={[]}
        emptyMessage="Você ainda não favoritou nenhum material. Clique no coração em qualquer material para salvar aqui."
      />
    </motion.div>
  )
}
