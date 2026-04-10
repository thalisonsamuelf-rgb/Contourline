import { Suspense } from "react"
import { notFound } from "next/navigation"
import {
  getCategoryBySlug,
  getMaterials,
  getCategoriesWithCount,
} from "@/lib/partnerzone/queries"
import type { Material, Category } from "@/lib/partnerzone/types"
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
  const childCategories = allCategories.filter((c) => c.parent_id === category.id)

  // For each subcategory, compute the recursive total
  const enrichedSubcategories = childCategories.map((c) => ({
    ...c,
    material_count: countDescendantMaterials(c.id, allCategories, materialCountByCategory),
  }))

  // All descendant ids of THIS category (for fetching materials recursively)
  const allDescendantIds = collectDescendantIds(category.id, allCategories)

  // Fetch all materials in this branch (use a recursive in-clause)
  // Limit to 500 per branch to keep the page snappy
  const { data: branchMaterials, count: branchCount } = await getMaterials({
    categoryIds: allDescendantIds,
    limit: 500,
  })

  // Direct materials (those whose category_id == this category)
  const directMaterials = branchMaterials.filter(
    (m) => m.category_id === category.id
  )

  // Group materials by subcategory (top-level child)
  // For each direct child, get all materials whose category is the child OR its descendants
  const subcategoryMaterials: Record<string, Material[]> = {}
  for (const child of childCategories) {
    const childDescendants = new Set(collectDescendantIds(child.id, allCategories))
    subcategoryMaterials[child.id] = branchMaterials.filter((m) =>
      childDescendants.has(m.category_id)
    )
  }

  return (
    <CategoryPageClient
      category={category}
      subcategories={enrichedSubcategories}
      directMaterials={directMaterials}
      subcategoryMaterials={subcategoryMaterials}
      totalCount={branchCount}
      allCategories={allCategories}
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
