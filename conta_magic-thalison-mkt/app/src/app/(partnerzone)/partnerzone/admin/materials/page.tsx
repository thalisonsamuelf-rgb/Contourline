"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FileText,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  Download,
  ArrowLeft,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// In production, this would fetch from Supabase
const mockMaterials = [
  { id: "1", title: "Manual de Marca Contourline 2026", category: "Institucional", file_type: "PDF", size: "12.4 MB", downloads: 89, status: "Ativo", updated: "15/03/2026" },
  { id: "2", title: "Catálogo de Equipamentos Q1 2026", category: "Marketing", file_type: "PDF", size: "28.1 MB", downloads: 156, status: "Ativo", updated: "10/03/2026" },
  { id: "3", title: "Template Instagram Stories", category: "Marketing", file_type: "PSD", size: "45.2 MB", downloads: 234, status: "Ativo", updated: "08/03/2026" },
  { id: "4", title: "Proposta Comercial Template", category: "Vendas", file_type: "PPTX", size: "5.8 MB", downloads: 312, status: "Ativo", updated: "12/03/2026" },
  { id: "5", title: "Tabela de Preços Março 2026", category: "Vendas", file_type: "XLSX", size: "1.2 MB", downloads: 445, status: "Ativo", updated: "01/03/2026" },
  { id: "6", title: "Onboarding Kit - Novo Colaborador", category: "Treinamento", file_type: "PDF", size: "8.7 MB", downloads: 67, status: "Ativo", updated: "05/03/2026" },
  { id: "7", title: "Vídeo Institucional 2026", category: "Institucional", file_type: "MP4", size: "256 MB", downloads: 42, status: "Ativo", updated: "20/02/2026" },
  { id: "8", title: "Script SDR - Qualificação", category: "Vendas", file_type: "DOCX", size: "245 KB", downloads: 198, status: "Ativo", updated: "18/03/2026" },
]

export default function ManageMaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filtered = mockMaterials.filter(
    (m) =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
            {mockMaterials.length} materiais cadastrados
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
              <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Ações</th>
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
                  <Badge variant="outline" className="text-[9px]">{m.category}</Badge>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{m.file_type}</td>
                <td className="px-4 py-3 text-muted-foreground tabular-nums">{m.size}</td>
                <td className="px-4 py-3 text-right tabular-nums text-foreground">{m.downloads}</td>
                <td className="px-4 py-3 text-muted-foreground tabular-nums">{m.updated}</td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-xs">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    {m.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-md hover:bg-bg-surface-hover transition-colors" title="Ver">
                      <Eye className="size-3.5 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-bg-surface-hover transition-colors" title="Editar">
                      <Edit className="size-3.5 text-muted-foreground" />
                    </button>
                    <button className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors" title="Remover">
                      <Trash2 className="size-3.5 text-muted-foreground hover:text-destructive" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
