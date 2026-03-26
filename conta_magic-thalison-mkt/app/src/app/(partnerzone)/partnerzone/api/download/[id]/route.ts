import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const { id } = await params

  // Get material info
  const { data: material, error } = await client
    .from("partnerzone_materials")
    .select("file_path, file_name, file_type")
    .eq("id", id)
    .eq("is_active", true)
    .single()

  if (error || !material) {
    return NextResponse.json({ error: "Material not found" }, { status: 404 })
  }

  // Track download
  await client.from("partnerzone_downloads").insert({ material_id: id })

  // Increment download count
  const { data: current } = await client
    .from("partnerzone_materials")
    .select("download_count")
    .eq("id", id)
    .single()

  await client
    .from("partnerzone_materials")
    .update({ download_count: (current?.download_count ?? 0) + 1 })
    .eq("id", id)

  // Generate signed URL for private storage
  const { data: signedUrl } = await client.storage
    .from("partnerzone")
    .createSignedUrl(material.file_path, 60) // 60 seconds expiry

  if (signedUrl?.signedUrl) {
    return NextResponse.redirect(signedUrl.signedUrl)
  }

  // Fallback: return the file path directly
  return NextResponse.json({
    url: material.file_path,
    file_name: material.file_name,
  })
}
