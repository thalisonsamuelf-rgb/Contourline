// PartnerZone — Customer Area type definitions

export type CustomerStatus = "active" | "inactive" | "suspended"
export type ContractStatus = "active" | "finished" | "cancelled" | "pending"
export type InvoiceStatus = "pending" | "paid" | "overdue" | "cancelled"
export type EquipmentStatus = "active" | "maintenance" | "inactive"

export interface Customer {
  id: string
  user_id: string | null
  customer_code: string
  razao_social: string | null
  nome_fantasia: string | null
  cnpj: string | null
  cpf: string | null
  telefone: string | null
  whatsapp: string | null
  endereco: string | null
  cidade: string | null
  estado: string | null
  cep: string | null
  status: CustomerStatus
  created_at: string
  updated_at: string
}

export interface Contract {
  id: string
  customer_id: string
  contract_number: string
  contract_type: string | null
  status: ContractStatus
  start_date: string | null
  end_date: string | null
  monthly_value: number | null
  total_value: number | null
  installments_total: number | null
  installments_paid: number
  contract_pdf_url: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  customer_id: string
  contract_id: string | null
  invoice_number: string
  description: string | null
  amount: number
  due_date: string
  paid_date: string | null
  status: InvoiceStatus
  boleto_url: string | null
  barcode: string | null
  pix_code: string | null
  created_at: string
  updated_at: string
}

export interface CustomerEquipment {
  id: string
  customer_id: string
  equipment_name: string
  equipment_category_id: string | null
  serial_number: string | null
  purchase_date: string | null
  warranty_until: string | null
  status: EquipmentStatus
  notes: string | null
  created_at: string
}

export interface SupportRequest {
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

export function formatCurrencyBRL(value: number | null | undefined): string {
  if (value === null || value === undefined) return "—"
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export function formatDateBR(value: string | null | undefined): string {
  if (!value) return "—"
  const date = new Date(value.length === 10 ? `${value}T12:00:00Z` : value)
  if (Number.isNaN(date.getTime())) return "—"
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

export function isOverdue(invoice: Invoice): boolean {
  if (invoice.status === "paid" || invoice.status === "cancelled") return false
  const due = new Date(`${invoice.due_date}T23:59:59`)
  return due.getTime() < Date.now()
}
