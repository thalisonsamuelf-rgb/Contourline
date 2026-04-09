"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FileText,
  Search,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Material } from "@/lib/partnerzone/types"
import { formatFileSize } from "@/lib/partnerzone/types"

interface MaterialsTableProps {
  materials: Material[]
  totalCount: number
}

export default function MaterialsTable({ materials, totalCount }: MaterialsTableProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = materials.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (m.category?.name ?? "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  function formatDate(dateStr: string): string {
    const date = new Date(dateStr)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/partnerzone/admin" className="hover:text-foreground transition-colors">
          Admin
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Materiais</span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gerenciar Materiais</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {totalCount} materiais cadastrados
          </p>
        </div>
        <Link href="/partnerzone/admin/upload">
          <Button variant="primary" size="sm">
            + Novo Material
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filtrar materiais..."
          className="pl-10 h-10"
        />
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <FileText className="size-10 mb-3 opacity-40" />
            <p className="text-sm font-medium">
              {searchQuery ? "Nenhum material encontrado" : "Nenhum material cadastrado"}
            </p>
            <p className="text-xs mt-1">
              {searchQuery
                ? "Tente ajustar o filtro de busca"
                : "Clique em '+ Novo Material' para adicionar"}
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-bg-surface">
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Material</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Categoria</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Tipo</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Tamanho</th>
                <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Downloads</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Atualizado</th>
                <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-border-subtle last:border-0 hover:bg-bg-surface transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-muted-foreground shrink-0" />
                      <span className="font-medium text-foreground truncate max-w-[200px]">{m.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-[9px]">{m.category?.name ?? "Sem categoria"}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{m.file_type}</td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{formatFileSize(m.file_size)}</td>
                  <td className="px-4 py-3 text-right tabular-nums text-foreground">{m.download_count}</td>
                  <td className="px-4 py-3 text-muted-foreground tabular-nums">{formatDate(m.updated_at)}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-xs">
                      <span className={`size-1.5 rounded-full ${m.is_active ? "bg-emerald-500" : "bg-zinc-400"}`} />
                      {m.is_active ? "Ativo" : "Inativo"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/partnerzone/admin/materials/${m.id}`} className="p-1.5 rounded-md hover:bg-bg-surface-hover transition-colors" title="Ver">
                        <Eye className="size-3.5 text-muted-foreground" />
                      </Link>
                      <Link href={`/partnerzone/admin/materials/${m.id}/edit`} className="p-1.5 rounded-md hover:bg-bg-surface-hover transition-colors" title="Editar">
                        <Edit className="size-3.5 text-muted-foreground" />
                      </Link>
                      <button className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors" title="Remover">
                        <Trash2 className="size-3.5 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Link
        href="/partnerzone/admin"
        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit"
      >
        <ArrowLeft className="size-3.5" />
        Voltar ao Admin
      </Link>
    </motion.div>
  )
}
