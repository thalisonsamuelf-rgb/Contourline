import { Suspense } from "react"
import { notFound } from "next/navigation"
import {
  getCategoryBySlug,
  getMaterials,
  getCategoriesWithCount,
} from "@/lib/partnerzone/queries"
import type { Category } from "@/lib/partnerzone/types"
import { CategoryPageClient } from "./category-client"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  return {
    title: category ? `${category.name} — PartnerZone` : "Categoria",
  }
}

/**
 * Recursively collect all descendant category ids of a given root.
 */
function collectDescendantIds(
  rootId: string,
  allCategories: Category[]
): string[] {
  const result: string[] = [rootId]
  const stack = [rootId]
  while (stack.length > 0) {
    const currentId = stack.pop()!
    const children = allCategories.filter((c) => c.parent_id === currentId)
    for (const child of children) {
      result.push(child.id)
      stack.push(child.id)
    }
  }
  return result
}

/**
 * Counts total materials reachable from a category (recursive).
 */
function countDescendantMaterials(
  rootId: string,
  allCategories: Category[],
  materialCountByCategory: Map<string, number>
): number {
  const ids = collectDescendantIds(rootId, allCategories)
  let total = 0
  for (const id of ids) {
    total += materialCountByCategory.get(id) ?? 0
  }
  return total
}

/**
 * Build the breadcrumb trail from root to the current category.
 */
function buildBreadcrumbs(
  category: Category,
  allCategories: Category[]
): { id: string; name: string; slug: string }[] {
  const trail: Category[] = []
  let current: Category | undefined = category
  const maxDepth = 20
  let depth = 0
  while (current && depth < maxDepth) {
    trail.unshift(current)
    if (!current.parent_id) break
    current = allCategories.find((c) => c.id === current!.parent_id)
    depth++
  }
  return trail.map((c) => ({ id: c.id, name: c.name, slug: c.slug }))
}

async function CategoryData({ slug }: { slug: string }) {
  const [category, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategoriesWithCount(),
  ])

  if (!category) notFound()

  // Build a quick lookup: category id -> direct material count
  const materialCountByCategory = new Map<string, number>()
  for (const c of allCategories) {
    materialCountByCategory.set(c.id, c.material_count ?? 0)
  }

  // Direct child categories
  const childCategories = allCategories.filter(
    (c) => c.parent_id === category.id
  )

  // Enrich each child with its recursive material count (to show in the card)
  const enrichedSubcategories = childCategories.map((c) => ({
    ...c,
    material_count: countDescendantMaterials(
      c.id,
      allCategories,
      materialCountByCategory
    ),
  }))

  // Fetch ONLY materials directly at THIS category (not from descendants)
  const { data: directMaterials } = await getMaterials({
    categoryId: category.id,
    limit: 500,
  })

  // Total count including all descendants (for the header)
  const totalCount = countDescendantMaterials(
    category.id,
    allCategories,
    materialCountByCategory
  )

  const breadcrumbs = buildBreadcrumbs(category, allCategories)

  return (
    <CategoryPageClient
      category={category}
      subcategories={enrichedSubcategories}
      directMaterials={directMaterials}
      breadcrumbs={breadcrumbs}
      totalCount={totalCount}
    />
  )
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CategoryData slug={slug} />
    </Suspense>
  )
}
