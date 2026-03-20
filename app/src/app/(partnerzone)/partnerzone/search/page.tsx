import { Suspense } from "react"
import { searchMaterials, getMaterials, getCategoriesWithCount } from "@/lib/partnerzone/queries"
import { SearchPageClient } from "./search-client"

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{ q?: string; category?: string; sort?: string }>
}

export const metadata = {
  title: "Buscar — PartnerZone",
}

async function SearchData({ q, sort }: { q?: string; sort?: string }) {
  const categories = await getCategoriesWithCount()

  let materials
  let total = 0

  if (q) {
    const result = await searchMaterials(q, { limit: 40 })
    materials = result.data
    total = result.count
  } else if (sort === "popular") {
    const result = await getMaterials({ orderBy: "download_count", order: "desc", limit: 40 })
    materials = result.data
    total = result.count
  } else if (sort === "recent") {
    const result = await getMaterials({ orderBy: "created_at", order: "desc", limit: 40 })
    materials = result.data
    total = result.count
  } else {
    const result = await getMaterials({ limit: 40 })
    materials = result.data
    total = result.count
  }

  return (
    <SearchPageClient
      query={q ?? ""}
      materials={materials}
      totalCount={total}
      categories={categories}
      sort={sort}
    />
  )
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, sort } = await searchParams
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SearchData q={q} sort={sort} />
    </Suspense>
  )
}
