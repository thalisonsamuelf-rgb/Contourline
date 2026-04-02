import "server-only"

import { getSupabaseServer } from "@/lib/supabase/server"
import type { Category, Material, UserProfile } from "./types"

function getClient() {
  const client = getSupabaseServer()
  if (!client) throw new Error("Supabase not configured")
  return client
}

// ── Categories ──────────────────────────────────────────────────────────

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await getClient()
    .from("partnerzone_categories")
    .select("*")
    .order("sort_order")

  if (error) throw error
  return data ?? []
}

export async function getCategoryTree(): Promise<Category[]> {
  const all = await getCategories()
  const roots = all.filter((c) => !c.parent_id)
  return roots.map((root) => ({
    ...root,
    children: all
      .filter((c) => c.parent_id === root.id)
      .sort((a, b) => a.sort_order - b.sort_order),
  }))
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await getClient()
    .from("partnerzone_categories")
    .select("*")
    .eq("slug", slug)
    .single()

  if (error) return null
  return data
}

// ── Materials ───────────────────────────────────────────────────────────

export async function getMaterials(options?: {
  categoryId?: string
  limit?: number
  offset?: number
  orderBy?: "created_at" | "download_count" | "title"
  order?: "asc" | "desc"
}): Promise<{ data: Material[]; count: number }> {
  const {
    categoryId,
    limit = 20,
    offset = 0,
    orderBy = "created_at",
    order = "desc",
  } = options ?? {}

  let query = getClient()
    .from("partnerzone_materials")
    .select("*, category:partnerzone_categories(*)", { count: "exact" })
    .eq("is_active", true)
    .order(orderBy, { ascending: order === "asc" })
    .range(offset, offset + limit - 1)

  if (categoryId) {
    query = query.eq("category_id", categoryId)
  }

  const { data, error, count } = await query

  if (error) throw error
  return { data: data ?? [], count: count ?? 0 }
}

export async function getMaterialById(id: string): Promise<Material | null> {
  const { data, error } = await getClient()
    .from("partnerzone_materials")
    .select("*, category:partnerzone_categories(*)")
    .eq("id", id)
    .single()

  if (error) return null
  return data
}

export async function getRecentMaterials(limit = 8): Promise<Material[]> {
  const { data } = await getMaterials({ limit, orderBy: "created_at", order: "desc" })
  return data
}

export async function getPopularMaterials(limit = 8): Promise<Material[]> {
  const { data } = await getMaterials({ limit, orderBy: "download_count", order: "desc" })
  return data
}

export async function searchMaterials(
  query: string,
  options?: { categoryId?: string; fileType?: string; limit?: number; offset?: number }
): Promise<{ data: Material[]; count: number }> {
  const { categoryId, fileType, limit = 20, offset = 0 } = options ?? {}

  let dbQuery = getClient()
    .from("partnerzone_materials")
    .select("*, category:partnerzone_categories(*)", { count: "exact" })
    .eq("is_active", true)
    .textSearch("search_vector", query, { type: "websearch", config: "portuguese" })
    .range(offset, offset + limit - 1)

  if (categoryId) dbQuery = dbQuery.eq("category_id", categoryId)
  if (fileType) dbQuery = dbQuery.eq("file_type", fileType)

  const { data, error, count } = await dbQuery

  if (error) throw error
  return { data: data ?? [], count: count ?? 0 }
}

// ── Material Versions ───────────────────────────────────────────────────

export async function getMaterialVersions(materialId: string) {
  const { data, error } = await getClient()
    .from("partnerzone_material_versions")
    .select("*")
    .eq("material_id", materialId)
    .order("version", { ascending: false })

  if (error) throw error
  return data ?? []
}

// ── Favorites ───────────────────────────────────────────────────────────

export async function getUserFavorites(userId: string, limit = 50): Promise<Material[]> {
  const { data, error } = await getClient()
    .from("partnerzone_favorites")
    .select("material:partnerzone_materials(*, category:partnerzone_categories(*))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error
  return (data ?? []).map((f: Record<string, unknown>) => f.material as Material)
}

// ── User Profile ────────────────────────────────────────────────────────

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await getClient()
    .from("partnerzone_user_profiles")
    .select("*")
    .eq("id", userId)
    .single()

  if (error) return null
  return data
}

// ── Analytics ───────────────────────────────────────────────────────────

export async function getAnalyticsSummary() {
  const client = getClient()

  const [materialsRes, downloadsRes, categoriesRes] = await Promise.all([
    client.from("partnerzone_materials").select("id", { count: "exact", head: true }).eq("is_active", true),
    client.from("partnerzone_downloads").select("id", { count: "exact", head: true }),
    client.from("partnerzone_categories").select("id", { count: "exact", head: true }).is("parent_id", null),
  ])

  return {
    totalMaterials: materialsRes.count ?? 0,
    totalDownloads: downloadsRes.count ?? 0,
    totalCategories: categoriesRes.count ?? 0,
  }
}

export async function getTopDownloadedMaterials(limit = 10) {
  const { data, error } = await getClient()
    .from("partnerzone_materials")
    .select("id, title, download_count, file_type, category:partnerzone_categories(name, slug)")
    .eq("is_active", true)
    .order("download_count", { ascending: false })
    .limit(limit)

  if (error) throw error
  return data ?? []
}

// ── Category materials count ────────────────────────────────────────────

export async function getCategoriesWithCount(): Promise<Category[]> {
  const client = getClient()

  const { data: categories, error: catError } = await client
    .from("partnerzone_categories")
    .select("*")
    .order("sort_order")

  if (catError) throw catError

  const { data: counts, error: countError } = await client
    .from("partnerzone_materials")
    .select("category_id")
    .eq("is_active", true)

  if (countError) throw countError

  const countMap = new Map<string, number>()
  for (const row of counts ?? []) {
    countMap.set(row.category_id, (countMap.get(row.category_id) ?? 0) + 1)
  }

  return (categories ?? []).map((c) => ({
    ...c,
    material_count: countMap.get(c.id) ?? 0,
  }))
}
