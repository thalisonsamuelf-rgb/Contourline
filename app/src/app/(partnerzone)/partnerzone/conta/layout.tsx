import type { ReactNode } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { AlertTriangle } from "lucide-react"
import { createSupabaseServerClient } from "@/lib/supabase/server-auth"

export const dynamic = "force-dynamic"

export default async function ContaLayout({ children }: { children: ReactNode }) {
  const supabase = await createSupabaseServerClient()

  if (!supabase) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="max-w-md text-center px-6 py-8 rounded-2xl bg-white border border-black/[0.08]">
          <p className="text-[14px] text-black/70">
            Servico de autenticacao indisponivel. Tente novamente em instantes.
          </p>
        </div>
      </div>
    )
  }

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/partnerzone/login?redirect=/partnerzone/conta")
  }

  // Try to fetch the linked customer record. If none, render a soft warning.
  const { data: customer } = await supabase
    .from("partnerzone_customers")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle()

  if (!customer) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="max-w-lg w-full px-6 py-8 rounded-2xl bg-white border border-black/[0.08] flex flex-col items-center text-center gap-4">
          <div className="size-14 rounded-full bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center">
            <AlertTriangle className="size-6 text-[#B45309]" />
          </div>
          <div className="flex flex-col gap-1">
            <h2 className="text-[18px] font-semibold text-black/80">
              Conta nao vinculada
            </h2>
            <p className="text-[13px] text-black/60 leading-relaxed">
              Sua conta de acesso ainda nao esta vinculada a um cliente
              Contourline. Entre em contato com o nosso time para concluir
              a vinculacao.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full pt-2">
            <Link
              href="/partnerzone/conta/suporte"
              className="inline-flex items-center justify-center h-10 rounded-xl bg-[#24336E] hover:bg-[#1B2655] text-white text-[13px] font-semibold transition-colors"
            >
              Falar com o suporte
            </Link>
            <Link
              href="/partnerzone"
              className="inline-flex items-center justify-center h-10 rounded-xl bg-black/[0.04] hover:bg-black/[0.08] text-black/70 text-[13px] font-medium transition-colors"
            >
              Voltar para o catalogo
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
