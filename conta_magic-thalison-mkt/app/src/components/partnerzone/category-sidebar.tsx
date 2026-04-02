"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  Megaphone,
  TrendingUp,
  GraduationCap,
  ChevronRight,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Category } from "@/lib/partnerzone/types"

const iconMap: Record<string, LucideIcon> = {
  Building2,
  Megaphone,
  TrendingUp,
  GraduationCap,
}

interface CategorySidebarProps {
  categories: Category[]
  className?: string
}

export function CategorySidebar({ categories, className }: CategorySidebarProps) {
  const pathname = usePathname()

  const roots = categories.filter((c) => !c.parent_id)
  const getChildren = (parentId: string) =>
    categories.filter((c) => c.parent_id === parentId).sort((a, b) => a.sort_order - b.sort_order)

  return (
    <nav className={cn("flex flex-col gap-1", className)}>
      <Link
        href="/partnerzone"
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors",
          pathname === "/partnerzone"
            ? "bg-primary/10 text-primary font-semibold"
            : "text-muted-foreground hover:text-foreground hover:bg-bg-surface"
        )}
      >
        Todos os Materiais
      </Link>

      <div className="my-2 h-px bg-border-subtle" />

      {roots.map((root) => {
        const Icon = iconMap[root.icon ?? ""] ?? Building2
        const children = getChildren(root.id)
        const isActive = pathname.includes(`/categories/${root.slug}`)

        return (
          <div key={root.id} className="flex flex-col">
            <Link
              href={`/partnerzone/categories/${root.slug}`}
              className={cn(
                "flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-bg-surface"
              )}
            >
              <Icon className="size-4 shrink-0" />
              <span className="flex-1">{root.name}</span>
              {root.material_count !== undefined && root.material_count > 0 && (
                <span className="text-[10px] tabular-nums text-muted-foreground">
                  {root.material_count}
                </span>
              )}
            </Link>

            {children.length > 0 && (
              <div className="ml-4 pl-3 border-l border-border-subtle flex flex-col gap-0.5 mt-0.5">
                {children.map((child) => {
                  const childActive = pathname.includes(`/categories/${child.slug}`)
                  return (
                    <Link
                      key={child.id}
                      href={`/partnerzone/categories/${child.slug}`}
                      className={cn(
                        "flex items-center gap-1.5 px-2 py-1.5 text-xs rounded-md transition-colors",
                        childActive
                          ? "text-primary font-medium bg-primary/5"
                          : "text-muted-foreground hover:text-foreground hover:bg-bg-surface"
                      )}
                    >
                      <ChevronRight className="size-3 shrink-0" />
                      <span className="flex-1">{child.name}</span>
                      {child.material_count !== undefined && child.material_count > 0 && (
                        <span className="text-[10px] tabular-nums">{child.material_count}</span>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </nav>
  )
}
