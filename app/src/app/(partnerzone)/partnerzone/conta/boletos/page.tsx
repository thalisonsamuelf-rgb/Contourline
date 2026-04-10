import { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  ArrowLeft,
  Receipt,
  Download,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { createSupabaseServerClient } from "@/lib/supabase/server-auth"
import {
  formatCurrencyBRL,
  formatDateBR,
  isOverdue,
  type Customer,
  type Invoice,
} from "@/lib/partnerzone/customer-types"
import { CopyButton } from "./copy-button"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Boletos — Minha Conta",
}

type Tab = "pendentes" | "pagos" | "vencidos" | "todos"

const TABS: Array<{ key: Tab; label: string }> = [
  { key: "pendentes", label: "Pendentes" },
  { key: "pagos", label: "Pagos" },
  { key: "vencidos", label: "Vencidos" },
  { key: "todos", label: "Todos" },
]

function filterInvoices(invoices: Invoice[], tab: Tab): Invoice[] {
  if (tab === "todos") return invoices
  if (tab === "pagos") return invoices.filter((i) => i.status === "paid")
  if (tab === "vencidos") return invoices.filter((i) => isOverdue(i) || i.status === "overdue")
  // pendentes (não vencidos)
  return invoices.filter((i) => i.status === "pending" && !isOverdue(i))
}

function StatusPill({ inv }: { inv: Invoice }) {
  const overdue = isOverdue(inv)
  if (overdue && inv.status !== "paid" && inv.status !== "cancelled") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
        <AlertCircle className="size-3" />
        Vencido
      </span>
    )
  }
  if (inv.status === "paid") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
        <CheckCircle2 className="size-3" />
        Pago
      </span>
    )
  }
  if (inv.status === "cancelled") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-white/[0.04] text-white/50 border border-white/10">
        Cancelado
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
      <Clock className="size-3" />
      Pendente
    </span>
  )
}

async function BoletosData({ tab }: { tab: Tab }) {
  const supabase = await createSupabaseServerClient()
  if (!supabase) redirect("/partnerzone/login?redirect=/partnerzone/conta/boletos")

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/partnerzone/login?redirect=/partnerzone/conta/boletos")

  const { data: customer } = await supabase
    .from("partnerzone_customers")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle()

  if (!customer) return null

  const { data: invoicesData } = await supabase
    .from("partnerzone_invoices")
    .select("*")
    .eq("customer_id", (customer as Customer).id)
    .order("due_date", { ascending: false })

  const invoices = (invoicesData ?? []) as Invoice[]
  const filtered = filterInvoices(invoices, tab)

  // Total amount due (pending + overdue, not paid/cancelled)
  const totalDue = invoices
    .filter((i) => i.status !== "paid" && i.status !== "cancelled")
    .reduce((sum, i) => sum + Number(i.amount), 0)

  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      {/* Back */}
      <div>
        <Link
          href="/partnerzone/conta"
          className="inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Voltar para Minha Conta
        </Link>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[24px] lg:text-[28px] font-bold text-white tracking-tight">
            Boletos
          </h1>
          <p className="text-[13px] text-white/40">
            Visualize e copie a linha digitavel ou pix dos seus boletos
          </p>
        </div>

        {/* Total due card */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 to-amber-500/0 border border-amber-500/20 px-5 py-3.5">
          <p className="text-[10px] uppercase tracking-wider text-amber-400/70 font-bold">
            Total em aberto
          </p>
          <p className="text-[20px] font-bold text-white mt-0.5">
            {formatCurrencyBRL(totalDue)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const active = t.key === tab
          return (
            <Link
              key={t.key}
              href={`/partnerzone/conta/boletos?tab=${t.key}`}
              className={`px-4 py-2 rounded-xl text-[12px] font-semibold transition-all ${
                active
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : "bg-[#0c1220] border border-white/[0.08] text-white/50 hover:text-white/80 hover:border-white/[0.15]"
              }`}
            >
              {t.label}
            </Link>
          )
        })}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl bg-[#0c1220] border border-white/[0.06] p-10 text-center">
          <Receipt className="size-10 text-white/20 mx-auto mb-3" />
          <p className="text-[14px] text-white/50">
            Nenhum boleto nesta categoria.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0c1220] border border-white/[0.06] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-white/40 bg-white/[0.02]">
                  <th className="px-5 py-3.5 font-semibold">Numero</th>
                  <th className="px-5 py-3.5 font-semibold">Descricao</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Valor</th>
                  <th className="px-5 py-3.5 font-semibold">Vencimento</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold text-right">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => {
                  const overdue = isOverdue(inv) && inv.status !== "paid" && inv.status !== "cancelled"
                  return (
                    <tr
                      key={inv.id}
                      className={`border-t border-white/[0.04] hover:bg-white/[0.02] transition-colors ${
                        overdue ? "bg-red-500/[0.03]" : ""
                      }`}
                    >
                      <td className="px-5 py-4 font-mono text-white/90 font-semibold">
                        {inv.invoice_number}
                      </td>
                      <td className="px-5 py-4 text-white/60 max-w-[260px] truncate">
                        {inv.description ?? "—"}
                      </td>
                      <td className="px-5 py-4 text-right text-white font-bold">
                        {formatCurrencyBRL(inv.amount)}
                      </td>
                      <td className={`px-5 py-4 ${overdue ? "text-red-400 font-semibold" : "text-white/60"}`}>
                        {formatDateBR(inv.due_date)}
                      </td>
                      <td className="px-5 py-4">
                        <StatusPill inv={inv} />
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          {inv.boleto_url && (
                            <a
                              href={inv.boleto_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Baixar boleto"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-[11px] font-semibold border border-blue-500/20 transition-colors"
                            >
                              <Download className="size-3" />
                              PDF
                            </a>
                          )}
                          {inv.barcode && (
                            <CopyButton
                              value={inv.barcode}
                              label="Codigo"
                              successLabel="Copiado"
                            />
                          )}
                          {inv.pix_code && (
                            <CopyButton
                              value={inv.pix_code}
                              label="Pix"
                              successLabel="Copiado"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

interface PageProps {
  searchParams: Promise<{ tab?: string }>
}

export default async function BoletosPage({ searchParams }: PageProps) {
  const params = await searchParams
  const tab: Tab =
    params.tab === "pagos" || params.tab === "vencidos" || params.tab === "todos"
      ? params.tab
      : "pendentes"

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <BoletosData tab={tab} />
    </Suspense>
  )
}
