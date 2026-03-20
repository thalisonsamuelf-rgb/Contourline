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
  const fileType = searchParams.get("file_type")
  const limit = parseInt(searchParams.get("limit") ?? "20", 10)
  const offset = parseInt(searchParams.get("offset") ?? "0", 10)

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 })
  }

  let dbQuery = client
    .from("partnerzone_materials")
    .select("*, category:partnerzone_categories(*)", { count: "exact" })
    .eq("is_active", true)
    .textSearch("search_vector", query, { type: "websearch", config: "portuguese" })
    .range(offset, offset + limit - 1)

  if (categoryId) dbQuery = dbQuery.eq("category_id", categoryId)
  if (fileType) dbQuery = dbQuery.eq("file_type", fileType)

  const { data, error, count } = await dbQuery

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, count })
}
