import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const { searchParams } = request.nextUrl
  const categoryId = searchParams.get("category_id")
  const limit = parseInt(searchParams.get("limit") ?? "20", 10)
  const offset = parseInt(searchParams.get("offset") ?? "0", 10)
  const orderBy = searchParams.get("order_by") ?? "created_at"
  const order = searchParams.get("order") ?? "desc"

  let query = client
    .from("partnerzone_materials")
    .select("*, category:partnerzone_categories(*)", { count: "exact" })
    .eq("is_active", true)
    .order(orderBy, { ascending: order === "asc" })
    .range(offset, offset + limit - 1)

  if (categoryId) {
    query = query.eq("category_id", categoryId)
  }

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, count })
}

export async function POST(request: NextRequest) {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const body = await request.json()
  const { title, description, category_id, file_path, file_name, file_size, file_type, tags } = body

  if (!title || !category_id || !file_path || !file_name || !file_size || !file_type) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const { data, error } = await client
    .from("partnerzone_materials")
    .insert({
      title,
      description: description ?? null,
      category_id,
      file_path,
      file_name,
      file_size,
      file_type,
      tags: tags ?? [],
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}
