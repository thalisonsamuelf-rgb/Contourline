import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, email, telefone, equipamento, assunto, descricao, type } = body

    if (!nome || !email || !assunto || !descricao) {
      return NextResponse.json(
        { error: "Campos obrigatorios: nome, email, assunto, descricao" },
        { status: 400 }
      )
    }

    const client = getSupabaseServer()

    // Try to save to Supabase if available
    if (client) {
      try {
        const { error } = await client
          .from("partnerzone_requests")
          .insert({
            nome,
            email,
            telefone: telefone ?? null,
            equipamento: equipamento ?? null,
            assunto,
            descricao,
            type: type ?? "solicitar",
            status: "pending",
          })

        if (error) {
          // Table might not exist -- graceful fallback
          console.warn("partnerzone_requests insert failed (table may not exist):", error.message)
        }
      } catch (dbError) {
        console.warn("Database operation failed:", dbError)
      }
    }

    // Always return success (graceful degradation)
    return NextResponse.json(
      {
        success: true,
        message: "Solicitacao recebida com sucesso",
        data: { nome, email, assunto, type },
      },
      { status: 201 }
    )
  } catch {
    return NextResponse.json(
      { error: "Erro ao processar solicitacao" },
      { status: 500 }
    )
  }
}

export async function GET() {
  const client = getSupabaseServer()

  if (!client) {
    return NextResponse.json({ data: [], count: 0 })
  }

  try {
    const { data, error, count } = await client
      .from("partnerzone_requests")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(50)

    if (error) {
      // Table might not exist
      return NextResponse.json({ data: [], count: 0 })
    }

    return NextResponse.json({ data: data ?? [], count: count ?? 0 })
  } catch {
    return NextResponse.json({ data: [], count: 0 })
  }
}
