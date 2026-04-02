"use client"

import { useState } from "react"
import Link from "next/link"
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
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Megaphone,
  TrendingUp,
  GraduationCap,
}

// In production, fetched from Supabase
const mockCategories = [
  {
    name: "Institucional",
    slug: "institucional",
    icon: "Building2",
    children: [
      { name: "Logo & Marca", slug: "logo-marca", count: 12 },
      { name: "Manual de Marca", slug: "manual-marca", count: 3 },
      { name: "Apresentações", slug: "apresentacoes-inst", count: 8 },
      { name: "Vídeos Institucionais", slug: "videos-institucionais", count: 5 },
    ],
  },
  {
    name: "Marketing",
    slug: "marketing",
    icon: "Megaphone",
    children: [
      { name: "Templates Social Media", slug: "templates-social", count: 24 },
      { name: "Catálogos", slug: "catalogos", count: 6 },
      { name: "Materiais para Eventos", slug: "materiais-eventos", count: 14 },
      { name: "Fotos & Vídeos de Produto", slug: "fotos-videos-produto", count: 45 },
    ],
  },
  {
    name: "Vendas",
    slug: "vendas",
    icon: "TrendingUp",
    children: [
      { name: "Propostas Comerciais", slug: "propostas-comerciais", count: 7 },
      { name: "Tabelas de Preço", slug: "tabelas-preco", count: 4 },
      { name: "Cases de Sucesso", slug: "cases-sucesso", count: 11 },
      { name: "Scripts & Argumentários", slug: "scripts-argumentarios", count: 9 },
    ],
  },
  {
    name: "Treinamento",
    slug: "treinamento",
    icon: "GraduationCap",
    children: [
      { name: "Onboarding", slug: "onboarding", count: 6 },
      { name: "Produto & Técnico", slug: "produto-tecnico", count: 13 },
      { name: "Compliance Anvisa", slug: "compliance-anvisa", count: 8 },
    ],
  },
]

export default function ManageCategoriesPage() {
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
        <Button variant="primary" size="sm">
          <Plus className="size-4 mr-1.5" />
          Nova Categoria
        </Button>
      </div>

      {/* Category tree */}
      <div className="flex flex-col gap-3">
        {mockCategories.map((cat) => {
          const Icon = iconMap[cat.icon] ?? FolderOpen
          return (
            <div
              key={cat.slug}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              {/* Parent */}
              <div className="flex items-center justify-between px-4 py-3 bg-bg-surface">
                <div className="flex items-center gap-3">
                  <Icon className="size-5 text-primary" />
                  <span className="font-semibold text-foreground">{cat.name}</span>
                  <span className="text-[10px] text-muted-foreground">
                    {cat.children.length} subcategorias
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 rounded-md hover:bg-bg-surface-hover transition-colors">
                    <Edit className="size-3.5 text-muted-foreground" />
                  </button>
                  <button className="p-1.5 rounded-md hover:bg-bg-surface-hover transition-colors">
                    <Plus className="size-3.5 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="divide-y divide-border-subtle">
                {cat.children.map((child) => (
                  <div
                    key={child.slug}
                    className="flex items-center justify-between px-4 py-2.5 pl-12 hover:bg-bg-surface transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <ChevronRight className="size-3 text-muted-foreground" />
                      <span className="text-sm text-foreground">{child.name}</span>
                      <span className="text-[10px] tabular-nums text-muted-foreground">
                        ({child.count} materiais)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button className="p-1 rounded-md hover:bg-bg-surface-hover transition-colors">
                        <Edit className="size-3 text-muted-foreground" />
                      </button>
                      <button className="p-1 rounded-md hover:bg-destructive/10 transition-colors">
                        <Trash2 className="size-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
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
