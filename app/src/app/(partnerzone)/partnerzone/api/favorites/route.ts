import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const userId = request.headers.get("x-user-id")
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await client
    .from("partnerzone_favorites")
    .select("material:partnerzone_materials(*, category:partnerzone_categories(*))")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data: (data ?? []).map((f: Record<string, unknown>) => f.material) })
}

export async function POST(request: NextRequest) {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const body = await request.json()
  const { user_id, material_id } = body

  if (!user_id || !material_id) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Toggle: check if already favorited
  const { data: existing } = await client
    .from("partnerzone_favorites")
    .select("id")
    .eq("user_id", user_id)
    .eq("material_id", material_id)
    .single()

  if (existing) {
    // Remove favorite
    await client
      .from("partnerzone_favorites")
      .delete()
      .eq("id", existing.id)

    return NextResponse.json({ favorited: false })
  }

  // Add favorite
  const { error } = await client
    .from("partnerzone_favorites")
    .insert({ user_id, material_id })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ favorited: true }, { status: 201 })
}
