import { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { createSupabaseServerClient } from "@/lib/supabase/server-auth"
import type { Customer, SupportRequest } from "@/lib/partnerzone/customer-types"
import { SupportForm, SupportHistory } from "./support-client"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Suporte — Minha Conta",
}

async function SupportData() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) redirect("/partnerzone/login?redirect=/partnerzone/conta/suporte")

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/partnerzone/login?redirect=/partnerzone/conta/suporte")

  const { data: customer } = await supabase
    .from("partnerzone_customers")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle()

  if (!customer) return null

  // Pre-fill name and email
  const c = customer as Customer
  const defaultName = c.nome_fantasia ?? c.razao_social ?? user.email?.split("@")[0] ?? ""
  const defaultEmail = user.email ?? ""
  const defaultPhone = c.whatsapp ?? c.telefone ?? ""

  // Fetch user's previous requests by email
  let history: SupportRequest[] = []
  if (defaultEmail) {
    const { data: requests } = await supabase
      .from("partnerzone_requests")
      .select("*")
      .eq("email", defaultEmail)
      .order("created_at", { ascending: false })
      .limit(20)
    history = (requests ?? []) as SupportRequest[]
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      {/* Back */}
      <div>
        <Link
          href="/partnerzone/conta"
          className="inline-flex items-center gap-2 text-[13px] text-black/50 hover:text-black/80 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Voltar para Minha Conta
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-[24px] lg:text-[28px] font-bold text-black/80 tracking-tight">
          Suporte
        </h1>
        <p className="text-[13px] text-black/50">
          Abra um ticket com a nossa equipe de atendimento
        </p>
      </div>

      <SupportForm
        defaultName={defaultName}
        defaultEmail={defaultEmail}
        defaultPhone={defaultPhone}
      />

      <SupportHistory history={history} />
    </div>
  )
}

export default function SuportePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-[#24336E] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SupportData />
    </Suspense>
  )
}
