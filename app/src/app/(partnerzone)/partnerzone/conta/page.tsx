import { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import {
  FileSignature,
  Receipt,
  Wrench,
  CalendarClock,
  ArrowRight,
  LifeBuoy,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react"
import { createSupabaseServerClient } from "@/lib/supabase/server-auth"
import {
  formatCurrencyBRL,
  formatDateBR,
  isOverdue,
  type Contract,
  type Customer,
  type Invoice,
} from "@/lib/partnerzone/customer-types"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Minha Conta — PartnerZone",
}

function StatusBadge({ status }: { status: Customer["status"] }) {
  const map: Record<Customer["status"], { label: string; cls: string }> = {
    active: {
      label: "Ativo",
      cls: "bg-[#10B981]/10 text-[#047857] border-[#10B981]/20",
    },
    inactive: {
      label: "Inativo",
      cls: "bg-black/[0.04] text-black/60 border-black/10",
    },
    suspended: {
      label: "Suspenso",
      cls: "bg-[#F59E0B]/10 text-[#B45309] border-[#F59E0B]/20",
    },
  }
  const m = map[status]
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${m.cls}`}>
      {m.label}
    </span>
  )
}

function InvoiceStatusPill({ status, overdue }: { status: Invoice["status"]; overdue: boolean }) {
  if (overdue && status === "pending") {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#EF4444]/10 text-[#B91C1C] border border-[#EF4444]/20">
        <AlertCircle className="size-3" />
        Vencido
      </span>
    )
  }
  const map: Record<Invoice["status"], { label: string; cls: string; Icon: typeof CheckCircle2 }> = {
    pending: { label: "Pendente", cls: "bg-[#F59E0B]/10 text-[#B45309] border-[#F59E0B]/20", Icon: Clock },
    paid: { label: "Pago", cls: "bg-[#10B981]/10 text-[#047857] border-[#10B981]/20", Icon: CheckCircle2 },
    overdue: { label: "Vencido", cls: "bg-[#EF4444]/10 text-[#B91C1C] border-[#EF4444]/20", Icon: AlertCircle },
    cancelled: { label: "Cancelado", cls: "bg-black/[0.04] text-black/60 border-black/10", Icon: AlertCircle },
  }
  const m = map[status]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${m.cls}`}>
      <m.Icon className="size-3" />
      {m.label}
    </span>
  )
}

async function ContaDashboardData() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) redirect("/partnerzone/login?redirect=/partnerzone/conta")

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/partnerzone/login?redirect=/partnerzone/conta")

  const { data: customer } = await supabase
    .from("partnerzone_customers")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle()

  if (!customer) return null

  const customerId = (customer as Customer).id

  const [contractsRes, invoicesRes, equipmentRes] = await Promise.all([
    supabase
      .from("partnerzone_contracts")
      .select("*")
      .eq("customer_id", customerId)
      .order("start_date", { ascending: false }),
    supabase
      .from("partnerzone_invoices")
      .select("*")
      .eq("customer_id", customerId)
      .order("due_date", { ascending: false }),
    supabase
      .from("partnerzone_customer_equipment")
      .select("id", { count: "exact", head: true })
      .eq("customer_id", customerId),
  ])

  const contracts = (contractsRes.data ?? []) as Contract[]
  const invoices = (invoicesRes.data ?? []) as Invoice[]
  const equipmentCount = equipmentRes.count ?? 0

  const activeContracts = contracts.filter((c) => c.status === "active")
  const pendingInvoices = invoices.filter((i) => i.status === "pending" || i.status === "overdue")
  const recentInvoices = invoices.slice(0, 5)

  const nextDueInvoice = pendingInvoices
    .slice()
    .sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime())[0] ?? null

  const c = customer as Customer

  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      {/* Welcome Card */}
      <section className="rounded-2xl bg-white border border-black/[0.08] p-6 lg:p-8">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#24336E] font-bold">
              Area do Cliente
            </span>
            <h1 className="text-[24px] lg:text-[28px] font-bold text-black/80 tracking-tight">
              Ola, {c.nome_fantasia ?? c.razao_social ?? "cliente"}
            </h1>
            <p className="text-[13px] text-black/50">
              Codigo do cliente:{" "}
              <span className="text-black/80 font-mono">{c.customer_code}</span>
            </p>
          </div>
          <StatusBadge status={c.status} />
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={FileSignature}
          label="Contratos Ativos"
          value={activeContracts.length.toString()}
          accent="blue"
        />
        <StatCard
          icon={Receipt}
          label="Boletos Pendentes"
          value={pendingInvoices.length.toString()}
          accent="amber"
        />
        <StatCard
          icon={Wrench}
          label="Equipamentos"
          value={equipmentCount.toString()}
          accent="teal"
        />
        <StatCard
          icon={CalendarClock}
          label="Proximo Vencimento"
          value={nextDueInvoice ? formatDateBR(nextDueInvoice.due_date) : "—"}
          subValue={nextDueInvoice ? formatCurrencyBRL(nextDueInvoice.amount) : undefined}
          accent="purple"
        />
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <QuickAction
          href="/partnerzone/conta/boletos"
          icon={Receipt}
          label="Ver Boletos"
          desc="Acesse seus boletos e linha digitavel"
        />
        <QuickAction
          href="/partnerzone/conta/contrato"
          icon={FileSignature}
          label="Ver Contratos"
          desc="Detalhes dos seus contratos ativos"
        />
        <QuickAction
          href="/partnerzone/conta/suporte"
          icon={LifeBuoy}
          label="Suporte"
          desc="Abra um ticket com o nosso time"
        />
      </section>

      {/* Recent Invoices */}
      <section className="rounded-2xl bg-white border border-black/[0.08] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/[0.08]">
          <div>
            <h2 className="text-[15px] font-semibold text-black/80">Boletos recentes</h2>
            <p className="text-[12px] text-black/50 mt-0.5">Ultimos 5 lancamentos</p>
          </div>
          <Link
            href="/partnerzone/conta/boletos"
            className="inline-flex items-center gap-1 text-[12px] text-[#24336E] hover:text-[#1B2655] transition-colors"
          >
            Ver todos
            <ArrowRight className="size-3" />
          </Link>
        </div>
        {recentInvoices.length === 0 ? (
          <div className="px-5 py-10 text-center text-[13px] text-black/50">
            Nenhum boleto registrado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-black/50 bg-black/[0.02]">
                  <th className="px-5 py-3 font-semibold">Numero</th>
                  <th className="px-5 py-3 font-semibold">Descricao</th>
                  <th className="px-5 py-3 font-semibold">Vencimento</th>
                  <th className="px-5 py-3 font-semibold text-right">Valor</th>
                  <th className="px-5 py-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentInvoices.map((inv) => {
                  const overdue = isOverdue(inv)
                  return (
                    <tr
                      key={inv.id}
                      className="border-t border-black/[0.06] hover:bg-black/[0.02] transition-colors"
                    >
                      <td className="px-5 py-3.5 font-mono text-black/80">{inv.invoice_number}</td>
                      <td className="px-5 py-3.5 text-black/60 max-w-[280px] truncate">
                        {inv.description ?? "—"}
                      </td>
                      <td className="px-5 py-3.5 text-black/60">{formatDateBR(inv.due_date)}</td>
                      <td className="px-5 py-3.5 text-right text-black/80 font-semibold">
                        {formatCurrencyBRL(inv.amount)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <InvoiceStatusPill status={inv.status} overdue={overdue} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  subValue,
  accent,
}: {
  icon: typeof FileSignature
  label: string
  value: string
  subValue?: string
  accent: "blue" | "amber" | "teal" | "purple"
}) {
  const accents: Record<typeof accent, string> = {
    blue: "bg-[#24336E]/10 text-[#24336E]",
    amber: "bg-[#F59E0B]/10 text-[#B45309]",
    teal: "bg-[#10B981]/10 text-[#047857]",
    purple: "bg-[#3B82F6]/10 text-[#1D4ED8]",
  }
  return (
    <div className="rounded-2xl bg-white border border-black/[0.08] p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wider text-black/50 font-semibold">
          {label}
        </span>
        <div className={`size-9 rounded-xl ${accents[accent]} flex items-center justify-center`}>
          <Icon className="size-4" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-[24px] font-bold text-black/80 tracking-tight">{value}</span>
        {subValue && <span className="text-[12px] text-black/50">{subValue}</span>}
      </div>
    </div>
  )
}

function QuickAction({
  href,
  icon: Icon,
  label,
  desc,
}: {
  href: string
  icon: typeof Receipt
  label: string
  desc: string
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl bg-white border border-black/[0.08] hover:border-[#24336E]/30 hover:bg-[#F5F5F5] p-5 flex items-center gap-4 transition-all"
    >
      <div className="size-10 rounded-xl bg-[#24336E]/10 border border-[#24336E]/20 flex items-center justify-center text-[#24336E] group-hover:bg-[#24336E]/20 transition-colors">
        <Icon className="size-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-black/80">{label}</p>
        <p className="text-[11px] text-black/50 mt-0.5">{desc}</p>
      </div>
      <ArrowRight className="size-4 text-black/40 group-hover:text-[#24336E] group-hover:translate-x-0.5 transition-all" />
    </Link>
  )
}

export default function ContaPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-[#24336E] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ContaDashboardData />
    </Suspense>
  )
}
