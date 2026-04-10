import { Suspense } from "react"
import { getSupabaseServer } from "@/lib/supabase/server"
import RequestsManager from "./requests-manager"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Solicitacoes — PartnerZone Admin",
}

interface PartnerRequest {
  id: string
  nome: string
  email: string
  telefone: string | null
  equipamento: string | null
  assunto: string
  descricao: string
  type: "solicitar" | "reportar"
  status: "pending" | "in_progress" | "resolved" | "rejected"
  admin_notes: string | null
  resolved_at: string | null
  resolved_by: string | null
  created_at: string
  updated_at: string
}

async function RequestsData() {
  let requests: PartnerRequest[] = []

  try {
    const client = getSupabaseServer()

    if (client) {
      const { data, error } = await client
        .from("partnerzone_requests")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200)

      if (!error && data) {
        requests = data as PartnerRequest[]
      }
    }
  } catch {
    // Table may not exist yet -- graceful fallback
  }

  return <RequestsManager initialRequests={requests} />
}

export default function SolicitacoesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <RequestsData />
    </Suspense>
  )
}
