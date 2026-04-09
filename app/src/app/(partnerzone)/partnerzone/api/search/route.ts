import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const { searchParams } = request.nextUrl
  const query = searchParams.get("q")
  const categoryId = searchParams.get("category_id")
  const fileTypeGroup = searchParams.get("file_type_group")
  const dateRange = searchParams.get("date_range") as "7d" | "30d" | "90d" | "all" | null
  const tagsParam = searchParams.get("tags")
  const limit = parseInt(searchParams.get("limit") ?? "20", 10)
  const offset = parseInt(searchParams.get("offset") ?? "0", 10)

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 })
  }

  const tags = tagsParam ? tagsParam.split(",").filter(Boolean) : undefined

  let dbQuery = client
    .from("partnerzone_materials")
    .select("*, category:partnerzone_categories(*)", { count: "exact" })
    .eq("is_active", true)
    .textSearch("search_vector", query, { type: "websearch", config: "portuguese" })
    .range(offset, offset + limit - 1)

  if (categoryId) dbQuery = dbQuery.eq("category_id", categoryId)

  // File type group filtering
  if (fileTypeGroup && fileTypeGroup !== "all") {
    const patterns: Record<string, string[]> = {
      pdf: ["application/pdf"],
      image: ["image/"],
      video: ["video/"],
      document: ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml", "text/plain"],
      spreadsheet: ["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml", "text/csv"],
      presentation: ["application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml"],
    }
    const group = patterns[fileTypeGroup]
    if (group) {
      if (group.length === 1 && !group[0].endsWith("/")) {
        dbQuery = dbQuery.eq("file_type", group[0])
      } else {
        const orConditions = group
          .map((p) => p.endsWith("/") ? `file_type.like.${p}%` : `file_type.eq.${p}`)
          .join(",")
        dbQuery = dbQuery.or(orConditions)
      }
    }
  }

  // Date range filtering
  if (dateRange && dateRange !== "all") {
    const now = new Date()
    const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90
    const since = new Date(now)
    since.setDate(now.getDate() - days)
    dbQuery = dbQuery.gte("created_at", since.toISOString())
  }

  // Tags filtering (array overlap)
  if (tags && tags.length > 0) {
    dbQuery = dbQuery.overlaps("tags", tags)
  }

  const { data, error, count } = await dbQuery

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, count })
}
