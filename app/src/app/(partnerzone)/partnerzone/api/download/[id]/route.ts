import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"
import { getTemporaryLink, isDropboxPath } from "@/lib/dropbox/client"

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

  // Dropbox path: generate temporary link via Dropbox API
  if (isDropboxPath(material.file_path)) {
    try {
      const tempLink = await getTemporaryLink(material.file_path)
      return NextResponse.redirect(tempLink)
    } catch (err) {
      console.error("Dropbox temporary link error:", err)
      return NextResponse.json(
        { error: "Erro ao gerar link de download. Tente novamente." },
        { status: 502 }
      )
    }
  }

  // Supabase Storage fallback (for materials uploaded directly)
  const { data: signedUrl } = await client.storage
    .from("partnerzone")
    .createSignedUrl(material.file_path, 60)

  if (signedUrl?.signedUrl) {
    return NextResponse.redirect(signedUrl.signedUrl)
  }

  // Last resort: return the file path directly
  return NextResponse.json({
    url: material.file_path,
    file_name: material.file_name,
  })
}
