import { Suspense } from "react"
import { notFound } from "next/navigation"
import {
  getCategoryBySlug,
  getMaterials,
  getCategories,
  getCategoriesWithCount,
} from "@/lib/partnerzone/queries"
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

async function CategoryData({ slug }: { slug: string }) {
  const [category, allCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getCategoriesWithCount(),
  ])

  if (!category) notFound()

  // Get materials for this category and its children
  const childCategories = allCategories.filter((c) => c.parent_id === category.id)
  const categoryIds = [category.id, ...childCategories.map((c) => c.id)]

  // Fetch materials for main category
  const { data: materials, count } = await getMaterials({
    categoryId: category.id,
    limit: 40,
  })

  // Also get materials from subcategories
  const subMaterials = await Promise.all(
    childCategories.map((c) => getMaterials({ categoryId: c.id, limit: 20 }))
  )

  const allMaterials = [
    ...materials,
    ...subMaterials.flatMap((s) => s.data),
  ]

  return (
    <CategoryPageClient
      category={category}
      subcategories={childCategories}
      materials={allMaterials}
      totalCount={count + subMaterials.reduce((a, s) => a + s.count, 0)}
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
