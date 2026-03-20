import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File | null
  const title = formData.get("title") as string | null
  const description = formData.get("description") as string | null
  const categorySlug = formData.get("category") as string | null
  const tagsRaw = formData.get("tags") as string | null

  if (!file || !title || !categorySlug) {
    return NextResponse.json({ error: "Missing required fields: file, title, category" }, { status: 400 })
  }

  // Resolve category ID from slug
  const { data: category, error: catError } = await client
    .from("partnerzone_categories")
    .select("id")
    .eq("slug", categorySlug)
    .single()

  if (catError || !category) {
    return NextResponse.json({ error: `Category "${categorySlug}" not found` }, { status: 400 })
  }

  // Upload file to Supabase Storage
  const fileBuffer = await file.arrayBuffer()
  const filePath = `materials/${categorySlug}/${Date.now()}-${file.name}`

  const { error: uploadError } = await client.storage
    .from("partnerzone")
    .upload(filePath, fileBuffer, {
      contentType: file.type,
      upsert: false,
    })

  if (uploadError) {
    return NextResponse.json({ error: `Upload failed: ${uploadError.message}` }, { status: 500 })
  }

  // Get public URL
  const { data: urlData } = client.storage
    .from("partnerzone")
    .getPublicUrl(filePath)

  // Parse tags
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : []

  // Insert material record
  const { data: material, error: insertError } = await client
    .from("partnerzone_materials")
    .insert({
      title,
      description: description ?? null,
      category_id: category.id,
      file_path: urlData.publicUrl,
      file_name: file.name,
      file_size: file.size,
      file_type: file.type,
      tags,
    })
    .select("*, category:partnerzone_categories(*)")
    .single()

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  return NextResponse.json({ data: material }, { status: 201 })
}
