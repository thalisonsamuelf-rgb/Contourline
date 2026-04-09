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
  filters?: SearchFilters
}): Promise<{ data: Material[]; count: number }> {
  const {
    categoryId,
    limit = 20,
    offset = 0,
    orderBy = "created_at",
    order = "desc",
    filters,
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

  if (filters) {
    query = applyFilters(query, filters) as typeof query
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

export interface SearchFilters {
  categoryId?: string
  fileTypeGroup?: string
  dateRange?: "7d" | "30d" | "90d" | "all"
  tags?: string[]
  limit?: number
  offset?: number
}

const FILE_TYPE_GROUP_PATTERNS: Record<string, string[]> = {
  pdf: ["application/pdf"],
  image: ["image/"],
  video: ["video/"],
  document: ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml", "text/plain"],
  spreadsheet: ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml", "text/csv"],
  presentation: ["application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml"],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyFilters<T extends { eq: any; or: any; gte: any; overlaps: any }>(
  dbQuery: T,
  filters: SearchFilters
): T {
  let q = dbQuery

  if (filters.categoryId) q = q.eq("category_id", filters.categoryId)

  if (filters.fileTypeGroup && filters.fileTypeGroup !== "all") {
    const patterns = FILE_TYPE_GROUP_PATTERNS[filters.fileTypeGroup]
    if (patterns) {
      if (patterns.length === 1 && !patterns[0].endsWith("/")) {
        q = q.eq("file_type", patterns[0])
      } else {
        // For prefix-based matches (image/, video/) or multiple patterns, use or filter
        const orConditions = patterns
          .map((p) => p.endsWith("/") ? `file_type.like.${p}%` : `file_type.eq.${p}`)
          .join(",")
        q = q.or(orConditions)
      }
    }
  }

  if (filters.dateRange && filters.dateRange !== "all") {
    const now = new Date()
    const days = filters.dateRange === "7d" ? 7 : filters.dateRange === "30d" ? 30 : 90
    const since = new Date(now)
    since.setDate(now.getDate() - days)
    q = q.gte("created_at", since.toISOString())
  }

  if (filters.tags && filters.tags.length > 0) {
    q = q.overlaps("tags", filters.tags)
  }

  return q
}

export async function searchMaterials(
  query: string,
  options?: SearchFilters
): Promise<{ data: Material[]; count: number }> {
  const { limit = 20, offset = 0, ...filters } = options ?? {}

  let dbQuery = getClient()
    .from("partnerzone_materials")
    .select("*, category:partnerzone_categories(*)", { count: "exact" })
    .eq("is_active", true)
    .textSearch("search_vector", query, { type: "websearch", config: "portuguese" })
    .range(offset, offset + limit - 1)

  dbQuery = applyFilters(dbQuery, filters)

  const { data, error, count } = await dbQuery

  if (error) throw error
  return { data: data ?? [], count: count ?? 0 }
}

export async function getAllTags(): Promise<string[]> {
  const { data, error } = await getClient()
    .from("partnerzone_materials")
    .select("tags")
    .eq("is_active", true)

  if (error) throw error

  const tagSet = new Set<string>()
  for (const row of data ?? []) {
    for (const tag of row.tags ?? []) {
      tagSet.add(tag)
    }
  }
  return Array.from(tagSet).sort()
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

// ── Analytics: Weekly Downloads ─────────────────────────────────────────

export async function getWeeklyDownloads() {
  const client = getClient()
  const now = new Date()
  const sevenDaysAgo = new Date(now)
  sevenDaysAgo.setDate(now.getDate() - 6)
  sevenDaysAgo.setHours(0, 0, 0, 0)

  const { data, error } = await client
    .from("partnerzone_downloads")
    .select("created_at")
    .gte("created_at", sevenDaysAgo.toISOString())

  if (error) throw error

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"]
  const counts = new Map<string, number>()

  // Initialize all 7 days
  for (let i = 0; i < 7; i++) {
    const d = new Date(sevenDaysAgo)
    d.setDate(sevenDaysAgo.getDate() + i)
    const key = d.toISOString().slice(0, 10)
    counts.set(key, 0)
  }

  for (const row of data ?? []) {
    const key = row.created_at.slice(0, 10)
    if (counts.has(key)) {
      counts.set(key, (counts.get(key) ?? 0) + 1)
    }
  }

  return Array.from(counts.entries()).map(([dateStr, value]) => {
    const d = new Date(dateStr + "T12:00:00Z")
    return { day: dayNames[d.getUTCDay()], value }
  })
}

// ── Analytics: Top Departments ──────────────────────────────────────────

export async function getTopDepartments() {
  const client = getClient()

  // Get all downloads with user profiles to get department info
  const { data, error } = await client
    .from("partnerzone_downloads")
    .select("user_id")

  if (error) throw error

  // Get unique user IDs from downloads
  const userIds = [...new Set((data ?? []).map((d) => d.user_id).filter(Boolean))]

  if (userIds.length === 0) {
    return []
  }

  // Get profiles for those users
  const { data: profiles, error: profError } = await client
    .from("partnerzone_user_profiles")
    .select("id, department")
    .in("id", userIds)

  if (profError) throw profError

  // Map user_id -> department
  const userDept = new Map<string, string>()
  for (const p of profiles ?? []) {
    userDept.set(p.id, p.department ?? "Outros")
  }

  // Count downloads per department
  const deptCounts = new Map<string, number>()
  for (const row of data ?? []) {
    if (!row.user_id) continue
    const dept = userDept.get(row.user_id) ?? "Outros"
    deptCounts.set(dept, (deptCounts.get(dept) ?? 0) + 1)
  }

  const total = Array.from(deptCounts.values()).reduce((a, b) => a + b, 0) || 1
  return Array.from(deptCounts.entries())
    .map(([name, downloads]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      downloads,
      percentage: Math.round((downloads / total) * 100),
    }))
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 5)
}

// ── Analytics: Recent Activity ──────────────────────────────────────────

export async function getRecentActivity(limit = 10) {
  const client = getClient()

  const { data, error } = await client
    .from("partnerzone_downloads")
    .select("created_at, user_id, material:partnerzone_materials(title)")
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) throw error

  // Get user names
  const userIds = [...new Set((data ?? []).map((d) => d.user_id).filter(Boolean))]
  const userNames = new Map<string, string>()

  if (userIds.length > 0) {
    const { data: profiles } = await client
      .from("partnerzone_user_profiles")
      .select("id, full_name")
      .in("id", userIds)

    for (const p of profiles ?? []) {
      userNames.set(p.id, p.full_name ?? "Usuario")
    }
  }

  return (data ?? []).map((row) => ({
    user: userNames.get(row.user_id) ?? "Usuario",
    action: "baixou",
    material: ((row.material as unknown) as { title: string } | null)?.title ?? "Material",
    time: row.created_at,
  }))
}

// ── Analytics: KPI with period comparison ───────────────────────────────

export async function getAnalyticsKPIs() {
  const client = getClient()
  const now = new Date()

  const thisWeekStart = new Date(now)
  thisWeekStart.setDate(now.getDate() - 6)
  thisWeekStart.setHours(0, 0, 0, 0)

  const lastWeekStart = new Date(thisWeekStart)
  lastWeekStart.setDate(thisWeekStart.getDate() - 7)

  const [thisWeekDl, lastWeekDl, activeUsersRes, materialsAccessedRes] = await Promise.all([
    client.from("partnerzone_downloads").select("id", { count: "exact", head: true })
      .gte("created_at", thisWeekStart.toISOString()),
    client.from("partnerzone_downloads").select("id", { count: "exact", head: true })
      .gte("created_at", lastWeekStart.toISOString())
      .lt("created_at", thisWeekStart.toISOString()),
    client.from("partnerzone_downloads").select("user_id")
      .gte("created_at", thisWeekStart.toISOString()),
    client.from("partnerzone_downloads").select("material_id")
      .gte("created_at", thisWeekStart.toISOString()),
  ])

  const thisWeekCount = thisWeekDl.count ?? 0
  const lastWeekCount = lastWeekDl.count ?? 0
  const dlChange = lastWeekCount > 0
    ? Math.round(((thisWeekCount - lastWeekCount) / lastWeekCount) * 100)
    : 0

  const activeUsers = new Set((activeUsersRes.data ?? []).map((d) => d.user_id).filter(Boolean)).size
  const materialsAccessed = new Set((materialsAccessedRes.data ?? []).map((d) => d.material_id)).size

  return {
    downloadsThisWeek: thisWeekCount,
    downloadsChange: dlChange,
    activeUsers,
    materialsAccessed,
  }
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
