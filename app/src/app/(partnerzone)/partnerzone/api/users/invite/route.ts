import { NextRequest, NextResponse } from "next/server"
import { getSupabaseServer } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const client = getSupabaseServer()
  if (!client) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 503 })
  }

  const body = await request.json()
  const { email, role, department, full_name } = body

  if (!email) {
    return NextResponse.json({ error: "Email e obrigatorio" }, { status: 400 })
  }

  const validRoles = ["viewer", "editor", "admin"]
  const userRole = validRoles.includes(role) ? role : "viewer"

  try {
    // Create the auth user via admin API
    const { data: authData, error: authError } = await client.auth.admin.createUser({
      email,
      email_confirm: true,
      user_metadata: {
        full_name: full_name || null,
        department: department || null,
      },
    })

    if (authError) {
      // Check for duplicate email
      if (authError.message?.includes("already")) {
        return NextResponse.json(
          { error: "Este email ja esta cadastrado" },
          { status: 409 }
        )
      }
      return NextResponse.json({ error: authError.message }, { status: 500 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Falha ao criar usuario" }, { status: 500 })
    }

    // Create the partnerzone user profile
    const { error: profileError } = await client
      .from("partnerzone_user_profiles")
      .insert({
        id: authData.user.id,
        full_name: full_name || null,
        department: department || null,
        role: userRole,
      })

    if (profileError) {
      // Try to clean up the auth user if profile creation fails
      try {
        await client.auth.admin.deleteUser(authData.user.id)
      } catch {
        // Best-effort cleanup
      }
      return NextResponse.json({ error: profileError.message }, { status: 500 })
    }

    return NextResponse.json(
      {
        data: {
          id: authData.user.id,
          email,
          full_name: full_name || null,
          department: department || null,
          role: userRole,
        },
      },
      { status: 201 }
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro inesperado"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
