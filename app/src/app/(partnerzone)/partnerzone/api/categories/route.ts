import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET() {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const { data, error } = await client
    .from("partnerzone_categories")
    .select("*")
    .order("sort_order")

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const body = await request.json()
  const { name, slug, description, icon, parent_id, sort_order } = body

  if (!name || !slug) {
    return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
  }

  const { data, error } = await client
    .from("partnerzone_categories")
    .insert({
      name,
      slug,
      description: description ?? null,
      icon: icon ?? null,
      parent_id: parent_id ?? null,
      sort_order: sort_order ?? 0,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data }, { status: 201 })
}

export async function PUT(request: NextRequest) {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const body = await request.json()
  const { id, name, slug, description, icon, parent_id, sort_order } = body

  if (!id) {
    return NextResponse.json({ error: "Category ID is required" }, { status: 400 })
  }

  const updates: Record<string, unknown> = {}
  if (name !== undefined) updates.name = name
  if (slug !== undefined) updates.slug = slug
  if (description !== undefined) updates.description = description
  if (icon !== undefined) updates.icon = icon
  if (parent_id !== undefined) updates.parent_id = parent_id
  if (sort_order !== undefined) updates.sort_order = sort_order

  const { data, error } = await client
    .from("partnerzone_categories")
    .update(updates)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

export async function DELETE(request: NextRequest) {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const { searchParams } = request.nextUrl
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "Category ID is required" }, { status: 400 })
  }

  // Check for children first
  const { count: childCount } = await client
    .from("partnerzone_categories")
    .select("id", { count: "exact", head: true })
    .eq("parent_id", id)

  if (childCount && childCount > 0) {
    return NextResponse.json(
      { error: "Cannot delete category with subcategories. Remove subcategories first." },
      { status: 409 }
    )
  }

  // Check for materials
  const { count: materialCount } = await client
    .from("partnerzone_materials")
    .select("id", { count: "exact", head: true })
    .eq("category_id", id)
    .eq("is_active", true)

  if (materialCount && materialCount > 0) {
    return NextResponse.json(
      { error: "Cannot delete category with active materials. Move or remove materials first." },
      { status: 409 }
    )
  }

  const { error } = await client
    .from("partnerzone_categories")
    .delete()
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
