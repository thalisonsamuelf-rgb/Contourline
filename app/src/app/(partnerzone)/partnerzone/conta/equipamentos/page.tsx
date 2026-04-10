import { Suspense } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ArrowLeft, Wrench, ArrowRight, ShieldCheck, ShieldAlert } from "lucide-react"
import { createSupabaseServerClient } from "@/lib/supabase/server-auth"
import {
  formatDateBR,
  type Customer,
  type CustomerEquipment,
} from "@/lib/partnerzone/customer-types"
import { getEquipmentImage } from "@/lib/partnerzone/equipment-images"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Meus Equipamentos — Minha Conta",
}

interface EquipmentRow extends CustomerEquipment {
  category: { id: string; name: string; slug: string } | null
}

const STATUS_MAP: Record<CustomerEquipment["status"], { label: string; cls: string }> = {
  active: { label: "Ativo", cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  maintenance: { label: "Em manutencao", cls: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
  inactive: { label: "Inativo", cls: "bg-white/[0.04] text-white/50 border-white/10" },
}

function isWarrantyValid(until: string | null): boolean {
  if (!until) return false
  const d = new Date(`${until}T23:59:59`)
  return d.getTime() >= Date.now()
}

async function EquipmentData() {
  const supabase = await createSupabaseServerClient()
  if (!supabase) redirect("/partnerzone/login?redirect=/partnerzone/conta/equipamentos")

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/partnerzone/login?redirect=/partnerzone/conta/equipamentos")

  const { data: customer } = await supabase
    .from("partnerzone_customers")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle()

  if (!customer) return null

  const { data: equipmentData } = await supabase
    .from("partnerzone_customer_equipment")
    .select("*, category:partnerzone_categories(id, name, slug)")
    .eq("customer_id", (customer as Customer).id)
    .order("created_at", { ascending: false })

  const equipment = (equipmentData ?? []) as EquipmentRow[]

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
      <div className="flex flex-col gap-1">
        <h1 className="text-[24px] lg:text-[28px] font-bold text-white tracking-tight">
          Meus Equipamentos
        </h1>
        <p className="text-[13px] text-white/40">
          Equipamentos Contourline vinculados a sua conta
        </p>
      </div>

      {equipment.length === 0 ? (
        <div className="rounded-2xl bg-[#0c1220] border border-white/[0.06] p-12 text-center">
          <Wrench className="size-10 text-white/20 mx-auto mb-3" />
          <p className="text-[14px] text-white/50">
            Voce ainda nao possui equipamentos cadastrados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {equipment.map((eq) => {
            const img = getEquipmentImage(eq.equipment_name)
            const status = STATUS_MAP[eq.status]
            const warrantyValid = isWarrantyValid(eq.warranty_until)
            return (
              <div
                key={eq.id}
                className="group rounded-2xl bg-[#0c1220] border border-white/[0.06] overflow-hidden flex flex-col hover:border-blue-500/30 transition-all"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-[#0f1a2e] to-[#070b14] flex items-center justify-center overflow-hidden">
                  {img ? (
                    <img
                      src={img}
                      alt={eq.equipment_name}
                      className="max-h-[80%] max-w-[80%] object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <Wrench className="size-12 text-white/15" />
                  )}
                  <div className="absolute top-3 right-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${status.cls}`}>
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className="text-[15px] font-bold text-white leading-tight">
                      {eq.equipment_name}
                    </h3>
                    {eq.serial_number && (
                      <p className="text-[11px] text-white/40 font-mono mt-0.5">
                        SN: {eq.serial_number}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 text-[11px]">
                    <div className="flex items-center gap-2">
                      {warrantyValid ? (
                        <ShieldCheck className="size-3.5 text-emerald-400" />
                      ) : (
                        <ShieldAlert className="size-3.5 text-white/30" />
                      )}
                      <span className={warrantyValid ? "text-emerald-400/80" : "text-white/40"}>
                        {warrantyValid
                          ? `Garantia ate ${formatDateBR(eq.warranty_until)}`
                          : eq.warranty_until
                            ? `Garantia expirada em ${formatDateBR(eq.warranty_until)}`
                            : "Sem garantia registrada"}
                      </span>
                    </div>
                    {eq.purchase_date && (
                      <p className="text-white/40">
                        Adquirido em {formatDateBR(eq.purchase_date)}
                      </p>
                    )}
                  </div>

                  <div className="mt-auto pt-3 border-t border-white/[0.06]">
                    {eq.category ? (
                      <Link
                        href={`/partnerzone/categories/${eq.category.slug}`}
                        className="inline-flex items-center justify-center gap-1.5 w-full h-9 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-[12px] font-semibold border border-blue-500/20 transition-colors"
                      >
                        Ver Materiais
                        <ArrowRight className="size-3.5" />
                      </Link>
                    ) : (
                      <span className="block text-center text-[11px] text-white/30">
                        Sem materiais vinculados
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function EquipmentPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <EquipmentData />
    </Suspense>
  )
}
