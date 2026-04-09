"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  FolderOpen,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  ChevronRight,
  Building2,
  Megaphone,
  TrendingUp,
  GraduationCap,
  X,
  Check,
  Loader2,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Category } from "@/lib/partnerzone/types"

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Megaphone,
  TrendingUp,
  GraduationCap,
}

const iconOptions = ["Building2", "Megaphone", "TrendingUp", "GraduationCap"]

interface CategoryTreeNode extends Category {
  children?: CategoryTreeNode[]
}

interface CategoriesManagerProps {
  initialCategories: CategoryTreeNode[]
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

type FormMode =
  | { type: "idle" }
  | { type: "add-parent" }
  | { type: "add-child"; parentId: string }
  | { type: "edit"; category: Category }

export default function CategoriesManager({ initialCategories }: CategoriesManagerProps) {
  const router = useRouter()
  const [formMode, setFormMode] = useState<FormMode>({ type: "idle" })
  const [formName, setFormName] = useState("")
  const [formSlug, setFormSlug] = useState("")
  const [formIcon, setFormIcon] = useState("Building2")
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const categories = initialCategories

  const resetForm = useCallback(() => {
    setFormMode({ type: "idle" })
    setFormName("")
    setFormSlug("")
    setFormIcon("Building2")
    setError(null)
  }, [])

  const openAddParent = () => {
    resetForm()
    setFormMode({ type: "add-parent" })
  }

  const openAddChild = (parentId: string) => {
    resetForm()
    setFormMode({ type: "add-child", parentId })
  }

  const openEdit = (category: Category) => {
    setFormMode({ type: "edit", category })
    setFormName(category.name)
    setFormSlug(category.slug)
    setFormIcon(category.icon ?? "Building2")
    setError(null)
  }

  const handleNameChange = (value: string) => {
    setFormName(value)
    // Auto-generate slug only when adding, not editing
    if (formMode.type !== "edit") {
      setFormSlug(slugify(value))
    }
  }

  const handleSave = async () => {
    if (!formName.trim() || !formSlug.trim()) {
      setError("Nome e slug sao obrigatorios.")
      return
    }

    setSaving(true)
    setError(null)

    try {
      if (formMode.type === "edit") {
        const res = await fetch("/partnerzone/api/categories", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: formMode.category.id,
            name: formName.trim(),
            slug: formSlug.trim(),
            icon: formMode.category.parent_id ? formMode.category.icon : formIcon,
          }),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error)
      } else {
        const parentId =
          formMode.type === "add-child" ? formMode.parentId : null

        const res = await fetch("/partnerzone/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formName.trim(),
            slug: formSlug.trim(),
            icon: parentId ? null : formIcon,
            parent_id: parentId,
            sort_order: 0,
          }),
        })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error)
      }

      resetForm()
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar categoria.")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta categoria?")) return

    setDeleting(id)
    setError(null)

    try {
      const res = await fetch(`/partnerzone/api/categories?id=${id}`, {
        method: "DELETE",
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)

      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao excluir categoria.")
    } finally {
      setDeleting(null)
    }
  }

  const isFormOpen = formMode.type !== "idle"

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 max-w-3xl"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/partnerzone/admin" className="hover:text-foreground transition-colors">
          Admin
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Categorias</span>
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gerenciar Categorias</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Organize a estrutura de categorias do PartnerZone
          </p>
        </div>
        <Button variant="primary" size="sm" onClick={openAddParent}>
          <Plus className="size-4 mr-1.5" />
          Nova Categoria
        </Button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Inline form */}
      {isFormOpen && (
        <div className="rounded-xl border border-primary/30 bg-card p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              {formMode.type === "edit"
                ? "Editar Categoria"
                : formMode.type === "add-child"
                  ? "Nova Subcategoria"
                  : "Nova Categoria"}
            </span>
            <button onClick={resetForm} className="p-1 rounded-md hover:bg-bg-surface-hover transition-colors">
              <X className="size-4 text-muted-foreground" />
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="Nome da categoria"
              value={formName}
              onChange={(e) => handleNameChange(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Input
              placeholder="slug"
              value={formSlug}
              onChange={(e) => setFormSlug(e.target.value)}
              className="flex-1"
            />
          </div>

          {/* Icon selector for parent categories */}
          {(formMode.type === "add-parent" || (formMode.type === "edit" && !formMode.category.parent_id)) && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Icone:</span>
              {iconOptions.map((iconName) => {
                const Ico = iconMap[iconName] ?? FolderOpen
                return (
                  <button
                    key={iconName}
                    onClick={() => setFormIcon(iconName)}
                    className={`p-1.5 rounded-md border transition-colors ${
                      formIcon === iconName
                        ? "border-primary bg-primary/10"
                        : "border-transparent hover:bg-bg-surface-hover"
                    }`}
                  >
                    <Ico className="size-4" />
                  </button>
                )
              })}
            </div>
          )}

          <div className="flex items-center gap-2 justify-end">
            <Button variant="ghost" size="sm" onClick={resetForm} disabled={saving}>
              Cancelar
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="size-4 mr-1.5 animate-spin" />
              ) : (
                <Check className="size-4 mr-1.5" />
              )}
              Salvar
            </Button>
          </div>
        </div>
      )}

      {/* Category tree */}
      {categories.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center">
          <FolderOpen className="size-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            Nenhuma categoria cadastrada ainda.
          </p>
          <Button variant="primary" size="sm" className="mt-4" onClick={openAddParent}>
            <Plus className="size-4 mr-1.5" />
            Criar primeira categoria
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon ?? ""] ?? FolderOpen
            const children = cat.children ?? []
            return (
              <div
                key={cat.id}
                className="rounded-xl border border-border bg-card overflow-hidden"
              >
                {/* Parent */}
                <div className="flex items-center justify-between px-4 py-3 bg-bg-surface">
                  <div className="flex items-center gap-3">
                    <Icon className="size-5 text-primary" />
                    <span className="font-semibold text-foreground">{cat.name}</span>
                    <span className="text-[10px] text-muted-foreground">
                      {children.length} subcategorias
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(cat)}
                      className="p-1.5 rounded-md hover:bg-bg-surface-hover transition-colors"
                    >
                      <Edit className="size-3.5 text-muted-foreground" />
                    </button>
                    <button
                      onClick={() => openAddChild(cat.id)}
                      className="p-1.5 rounded-md hover:bg-bg-surface-hover transition-colors"
                    >
                      <Plus className="size-3.5 text-muted-foreground" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                {children.length > 0 && (
                  <div className="divide-y divide-border-subtle">
                    {children.map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center justify-between px-4 py-2.5 pl-12 hover:bg-bg-surface transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <ChevronRight className="size-3 text-muted-foreground" />
                          <span className="text-sm text-foreground">{child.name}</span>
                          <span className="text-[10px] tabular-nums text-muted-foreground">
                            ({child.material_count ?? 0} materiais)
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openEdit(child)}
                            className="p-1 rounded-md hover:bg-bg-surface-hover transition-colors"
                          >
                            <Edit className="size-3 text-muted-foreground" />
                          </button>
                          <button
                            onClick={() => handleDelete(child.id)}
                            disabled={deleting === child.id}
                            className="p-1 rounded-md hover:bg-destructive/10 transition-colors"
                          >
                            {deleting === child.id ? (
                              <Loader2 className="size-3 text-muted-foreground animate-spin" />
                            ) : (
                              <Trash2 className="size-3 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

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
