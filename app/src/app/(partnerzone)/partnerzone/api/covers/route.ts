import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

const BUCKET = "equipamentos"

/**
 * GET /partnerzone/api/covers
 * Returns all root categories (equipment) with their cover status.
 * Checks Supabase Storage bucket "equipamentos" for uploaded covers.
 */
export async function GET() {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  // Fetch all categories that have NO parent (root = equipment)
  const { data: categories, error: catError } = await client
    .from("partnerzone_categories")
    .select("id, name, slug")
    .is("parent_id", null)
    .order("sort_order")

  if (catError) {
    return NextResponse.json({ error: catError.message }, { status: 500 })
  }

  // List all files in the storage bucket to check which covers exist
  const { data: files } = await client.storage
    .from(BUCKET)
    .list("", { limit: 500 })

  const fileSet = new Set((files ?? []).map((f) => f.name))

  const result = (categories ?? []).map((cat) => {
    // Check for uploaded cover in storage (try slug-based name)
    const slug = cat.slug
    const possibleNames = [
      `${slug}.png`,
      `${slug}.jpg`,
      `${slug}.jpeg`,
      `${slug}.webp`,
    ]

    let coverFileName: string | null = null
    for (const name of possibleNames) {
      if (fileSet.has(name)) {
        coverFileName = name
        break
      }
    }

    let cover_url: string | null = null
    if (coverFileName) {
      const { data: urlData } = client.storage
        .from(BUCKET)
        .getPublicUrl(coverFileName)
      cover_url = urlData.publicUrl
    }

    return {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      has_cover: coverFileName !== null,
      cover_url,
    }
  })

  return NextResponse.json({ data: result })
}

/**
 * POST /partnerzone/api/covers
 * Upload a cover image for an equipment category.
 * Expects multipart form data with "file" and "slug" fields.
 */
export async function POST(request: NextRequest) {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File | null
  const slug = formData.get("slug") as string | null

  if (!file || !slug) {
    return NextResponse.json(
      { error: "Campos obrigatorios: file, slug" },
      { status: 400 }
    )
  }

  // Validate file type
  const allowedTypes = ["image/png", "image/jpeg", "image/webp"]
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Tipo de arquivo invalido. Use PNG, JPEG ou WebP." },
      { status: 400 }
    )
  }

  // Determine extension from mime type
  const extMap: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/webp": "webp",
  }
  const ext = extMap[file.type] ?? "png"
  const fileName = `${slug}.${ext}`

  const fileBuffer = await file.arrayBuffer()

  // Upload (upsert = true to allow replacing existing covers)
  const { error: uploadError } = await client.storage
    .from(BUCKET)
    .upload(fileName, fileBuffer, {
      contentType: file.type,
      upsert: true,
    })

  if (uploadError) {
    return NextResponse.json(
      { error: `Upload falhou: ${uploadError.message}` },
      { status: 500 }
    )
  }

  // Get public URL
  const { data: urlData } = client.storage
    .from(BUCKET)
    .getPublicUrl(fileName)

  return NextResponse.json({
    data: {
      slug,
      file_name: fileName,
      cover_url: urlData.publicUrl,
    },
  })
}

/**
 * DELETE /partnerzone/api/covers?slug=xxx
 * Remove cover image for an equipment category.
 */
export async function DELETE(request: NextRequest) {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug")

  if (!slug) {
    return NextResponse.json(
      { error: "Parametro 'slug' obrigatorio" },
      { status: 400 }
    )
  }

  // Try to remove all possible extensions
  const possibleFiles = [
    `${slug}.png`,
    `${slug}.jpg`,
    `${slug}.jpeg`,
    `${slug}.webp`,
  ]

  const { error } = await client.storage
    .from(BUCKET)
    .remove(possibleFiles)

  if (error) {
    return NextResponse.json(
      { error: `Falha ao remover: ${error.message}` },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
