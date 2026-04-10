import { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft, Download, FileSignature, ExternalLink } from "lucide-react"
import { createSupabaseServerClient } from "@/lib/supabase/server-auth"
import {
  formatCurrencyBRL,
  formatDateBR,
  type Contract,
  type Customer,
} from "@/lib/partnerzone/customer-types"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Contratos — Minha Conta",
}

const STATUS_MAP: Record<Contract["status"], { label: string; cls: string }> = {
  active: { label: "Ativo", cls: "bg-[#10B981]/10 text-[#047857] border-[#10B981]/20" },
  finished: { label: "Finalizado", cls: "bg-[#3B82F6]/10 text-[#1D4ED8] border-[#3B82F6]/20" },
  cancelled: { label: "Cancelado", cls: "bg-[#EF4444]/10 text-[#B91C1C] border-[#EF4444]/20" },
  pending: { label: "Pendente", cls: "bg-[#F59E0B]/10 text-[#B45309] border-[#F59E0B]/20" },
}

async function ContractsData() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) redirect("/partnerzone/login?redirect=/partnerzone/conta/contrato")

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/partnerzone/login?redirect=/partnerzone/conta/contrato")

  const { data: customer } = await supabase
    .from("partnerzone_customers")
    .select("id, customer_code")
    .eq("user_id", user.id)
    .maybeSingle()

  if (!customer) return null

  const { data: contractsData } = await supabase
    .from("partnerzone_contracts")
    .select("*")
    .eq("customer_id", (customer as Customer).id)
    .order("start_date", { ascending: false })

  const contracts = (contractsData ?? []) as Contract[]

  return (
    <div className="flex flex-col gap-6 max-w-6xl">
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
          Contratos
        </h1>
        <p className="text-[13px] text-black/50">
          Visualize todos os seus contratos com a Contourline
        </p>
      </div>

      {contracts.length === 0 ? (
        <div className="rounded-2xl bg-white border border-black/[0.08] p-10 text-center">
          <FileSignature className="size-10 text-black/30 mx-auto mb-3" />
          <p className="text-[14px] text-black/50">
            Nenhum contrato registrado ainda.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white border border-black/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-black/50 bg-black/[0.02]">
                  <th className="px-5 py-3.5 font-semibold">Numero</th>
                  <th className="px-5 py-3.5 font-semibold">Tipo</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Mensal</th>
                  <th className="px-5 py-3.5 font-semibold">Inicio</th>
                  <th className="px-5 py-3.5 font-semibold">Fim</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((c) => {
                  const status = STATUS_MAP[c.status]
                  return (
                    <tr
                      key={c.id}
                      className="border-t border-black/[0.06] hover:bg-black/[0.02] transition-colors"
                    >
                      <td className="px-5 py-4 font-mono text-black/90 font-semibold">
                        {c.contract_number}
                      </td>
                      <td className="px-5 py-4 text-black/60">{c.contract_type ?? "—"}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${status.cls}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right text-black/80 font-semibold">
                        {formatCurrencyBRL(c.monthly_value)}
                      </td>
                      <td className="px-5 py-4 text-black/60">{formatDateBR(c.start_date)}</td>
                      <td className="px-5 py-4 text-black/60">{formatDateBR(c.end_date)}</td>
                      <td className="px-5 py-4 text-right">
                        {c.contract_pdf_url ? (
                          <a
                            href={c.contract_pdf_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24336E]/10 hover:bg-[#24336E]/20 text-[#24336E] text-[12px] font-semibold border border-[#24336E]/20 transition-colors"
                          >
                            <Download className="size-3.5" />
                            PDF
                          </a>
                        ) : (
                          <span className="text-black/30 text-[12px]">—</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Cards (mobile-friendly extra info) */}
      {contracts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contracts.map((c) => (
            <div
              key={`card-${c.id}`}
              className="rounded-2xl bg-white border border-black/[0.08] p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-black/50 font-semibold">
                    Contrato
                  </p>
                  <p className="text-[16px] font-bold text-black/80 font-mono">{c.contract_number}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${STATUS_MAP[c.status].cls}`}>
                  {STATUS_MAP[c.status].label}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <Field label="Tipo" value={c.contract_type ?? "—"} />
                <Field label="Mensal" value={formatCurrencyBRL(c.monthly_value)} />
                <Field label="Total" value={formatCurrencyBRL(c.total_value)} />
                <Field
                  label="Parcelas"
                  value={
                    c.installments_total
                      ? `${c.installments_paid}/${c.installments_total}`
                      : "—"
                  }
                />
                <Field label="Inicio" value={formatDateBR(c.start_date)} />
                <Field label="Fim" value={formatDateBR(c.end_date)} />
              </div>
              {c.notes && (
                <div className="mt-4 pt-4 border-t border-black/[0.08]">
                  <p className="text-[11px] uppercase tracking-wider text-black/50 font-semibold mb-1.5">
                    Observacoes
                  </p>
                  <p className="text-[12px] text-black/60 leading-relaxed">{c.notes}</p>
                </div>
              )}
              {c.contract_pdf_url && (
                <a
                  href={c.contract_pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-[12px] text-[#24336E] hover:text-[#1B2655] transition-colors"
                >
                  Abrir contrato
                  <ExternalLink className="size-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] uppercase tracking-wider text-black/50 font-semibold">
        {label}
      </span>
      <span className="text-black/80">{value}</span>
    </div>
  )
}

export default function ContractsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-[#24336E] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ContractsData />
    </Suspense>
  )
}
