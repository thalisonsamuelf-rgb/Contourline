import { Suspense } from "react"
import { searchMaterials, getMaterials, getCategoriesWithCount, getAllTags } from "@/lib/partnerzone/queries"
import type { SearchFilters } from "@/lib/partnerzone/queries"
import { SearchPageClient } from "./search-client"

export const dynamic = 'force-dynamic'

interface Props {
  searchParams: Promise<{
    q?: string
    category?: string
    sort?: string
    file_type?: string
    date_range?: string
    tags?: string
  }>
}

export const metadata = {
  title: "Buscar — PartnerZone",
}

async function SearchData({
  q,
  sort,
  fileType,
  dateRange,
  tags,
}: {
  q?: string
  sort?: string
  fileType?: string
  dateRange?: string
  tags?: string
}) {
  const [categories, availableTags] = await Promise.all([
    getCategoriesWithCount(),
    getAllTags(),
  ])

  const filters: SearchFilters = {}
  if (fileType) filters.fileTypeGroup = fileType
  if (dateRange && ["7d", "30d", "90d", "all"].includes(dateRange)) {
    filters.dateRange = dateRange as SearchFilters["dateRange"]
  }
  if (tags) {
    filters.tags = tags.split(",").filter(Boolean)
  }

  let materials
  let total = 0

  if (q) {
    const result = await searchMaterials(q, { ...filters, limit: 40 })
    materials = result.data
    total = result.count
  } else if (sort === "popular") {
    const result = await getMaterials({ orderBy: "download_count", order: "desc", limit: 40, filters })
    materials = result.data
    total = result.count
  } else if (sort === "recent") {
    const result = await getMaterials({ orderBy: "created_at", order: "desc", limit: 40, filters })
    materials = result.data
    total = result.count
  } else {
    const result = await getMaterials({ limit: 40, filters })
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
      availableTags={availableTags}
      activeFilters={{
        fileType,
        dateRange,
        tags: tags ? tags.split(",").filter(Boolean) : undefined,
      }}
    />
  )
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, sort, file_type, date_range, tags } = await searchParams
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SearchData q={q} sort={sort} fileType={file_type} dateRange={date_range} tags={tags} />
    </Suspense>
  )
}
