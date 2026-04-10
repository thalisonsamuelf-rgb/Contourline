"use client"

import { useState, useMemo, useCallback, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  MessageSquare,
  AlertTriangle,
  Search,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  ArrowLeft,
  X,
  Check,
  Eye,
  Inbox,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ── Types ──────────────────────────────────────────────────────────────

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

interface RequestsManagerProps {
  initialRequests: PartnerRequest[]
}

// ── Constants ──────────────────────────────────────────────────────────

const TYPE_CONFIG = {
  solicitar: {
    label: "Solicitacao",
    color: "text-[#1D4ED8]",
    bgColor: "bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#1D4ED8]",
    icon: MessageSquare,
  },
  reportar: {
    label: "Reclamacao",
    color: "text-[#B91C1C]",
    bgColor: "bg-[#EF4444]/10 border-[#EF4444]/20 text-[#B91C1C]",
    icon: AlertTriangle,
  },
} as const

const STATUS_CONFIG = {
  pending: {
    label: "Pendente",
    color: "text-[#B45309]",
    bgColor: "bg-[#F59E0B]/10 border-[#F59E0B]/20 text-[#B45309]",
    icon: Clock,
  },
  in_progress: {
    label: "Em Andamento",
    color: "text-[#1D4ED8]",
    bgColor: "bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#1D4ED8]",
    icon: Loader2,
  },
  resolved: {
    label: "Resolvida",
    color: "text-[#047857]",
    bgColor: "bg-[#10B981]/10 border-[#10B981]/20 text-[#047857]",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Rejeitada",
    color: "text-[#B91C1C]",
    bgColor: "bg-[#EF4444]/10 border-[#EF4444]/20 text-[#B91C1C]",
    icon: XCircle,
  },
} as const

// ── Helpers ────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr))
  } catch {
    return dateStr
  }
}

function formatDateShort(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(dateStr))
  } catch {
    return dateStr
  }
}

function truncate(text: string, maxLen: number): string {
  if (text.length <= maxLen) return text
  return text.slice(0, maxLen) + "..."
}

// ── Animation ──────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

// ── Toast ──────────────────────────────────────────────────────────────

interface Toast {
  id: number
  message: string
  type: "success" | "error"
}

function ToastContainer({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: number) => void }) {
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <motion.div
          key={t.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg backdrop-blur-sm ${
            t.type === "success"
              ? "border-[#10B981]/30 bg-[#10B981]/10 text-[#047857]"
              : "border-[#EF4444]/30 bg-[#EF4444]/10 text-[#B91C1C]"
          }`}
        >
          {t.type === "success" ? (
            <Check className="size-4 shrink-0" />
          ) : (
            <AlertTriangle className="size-4 shrink-0" />
          )}
          <span>{t.message}</span>
          <button onClick={() => onDismiss(t.id)} className="ml-2 p-0.5 rounded hover:bg-black/10">
            <X className="size-3" />
          </button>
        </motion.div>
      ))}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────

export default function RequestsManager({ initialRequests }: RequestsManagerProps) {
  const router = useRouter()

  // State
  const [requests, setRequests] = useState<PartnerRequest[]>(initialRequests)
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  // Detail modal
  const [selectedRequest, setSelectedRequest] = useState<PartnerRequest | null>(null)
  const [editStatus, setEditStatus] = useState<string>("")
  const [editNotes, setEditNotes] = useState<string>("")
  const [saving, setSaving] = useState(false)

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([])
  const toastIdRef = useRef(0)

  const addToast = useCallback((message: string, type: "success" | "error") => {
    const id = Date.now() + toastIdRef.current++
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  // Stats
  const stats = useMemo(() => {
    const total = requests.length
    const pending = requests.filter((r) => r.status === "pending").length
    const inProgress = requests.filter((r) => r.status === "in_progress").length
    const resolved = requests.filter((r) => r.status === "resolved").length
    return { total, pending, inProgress, resolved }
  }, [requests])

  // Filtered requests
  const filteredRequests = useMemo(() => {
    let result = requests

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (r) =>
          r.nome.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.assunto.toLowerCase().includes(q)
      )
    }

    if (filterType !== "all") {
      result = result.filter((r) => r.type === filterType)
    }

    if (filterStatus !== "all") {
      result = result.filter((r) => r.status === filterStatus)
    }

    return result
  }, [requests, search, filterType, filterStatus])

  // ── Open detail modal ──────────────────────────────────────────────

  const openDetail = (request: PartnerRequest) => {
    setSelectedRequest(request)
    setEditStatus(request.status)
    setEditNotes(request.admin_notes ?? "")
  }

  const closeDetail = () => {
    setSelectedRequest(null)
    setEditStatus("")
    setEditNotes("")
  }

  // ── Refresh data ───────────────────────────────────────────────────

  const refreshRequests = async () => {
    try {
      const res = await fetch("/partnerzone/api/requests")
      if (res.ok) {
        const json = await res.json()
        setRequests(json.data ?? [])
      }
    } catch {
      // Silently fail
    }
  }

  // ── Save changes ───────────────────────────────────────────────────

  const handleSave = async () => {
    if (!selectedRequest) return

    setSaving(true)
    try {
      const res = await fetch("/partnerzone/api/requests", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: selectedRequest.id,
          status: editStatus,
          admin_notes: editNotes,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error)

      addToast("Solicitacao atualizada com sucesso", "success")
      closeDetail()
      await refreshRequests()
      router.refresh()
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Erro ao atualizar solicitacao", "error")
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-6"
      >
        {/* Breadcrumb */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/partnerzone/admin" className="hover:text-foreground transition-colors">
            Admin
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">Solicitacoes</span>
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-2xl font-bold text-foreground">Gestao de Solicitacoes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {stats.total} {stats.total === 1 ? "solicitacao recebida" : "solicitacoes recebidas"}
          </p>
        </motion.div>

        {/* Stats cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total de Solicitacoes", value: stats.total, icon: FileText, color: "text-[#24336E]" },
            { label: "Pendentes", value: stats.pending, icon: Clock, color: "text-[#B45309]" },
            { label: "Em Andamento", value: stats.inProgress, icon: Loader2, color: "text-[#1D4ED8]" },
            { label: "Resolvidas", value: stats.resolved, icon: CheckCircle2, color: "text-[#047857]" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card"
            >
              <div className={`flex items-center justify-center size-9 rounded-lg bg-bg-surface ${color}`}>
                <Icon className="size-4" />
              </div>
              <div>
                <p className="text-xl font-bold tabular-nums text-foreground">{value}</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Search & filters */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou assunto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="solicitar">Solicitacoes</SelectItem>
              <SelectItem value="reportar">Reclamacoes</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="in_progress">Em Andamento</SelectItem>
              <SelectItem value="resolved">Resolvida</SelectItem>
              <SelectItem value="rejected">Rejeitada</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Requests table */}
        <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-bg-surface">
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Tipo</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Solicitante</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Assunto</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Equipamento</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Data</th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req) => {
                  const typeConfig = TYPE_CONFIG[req.type]
                  const statusConfig = STATUS_CONFIG[req.status]
                  const TypeIcon = typeConfig.icon
                  const StatusIcon = statusConfig.icon

                  return (
                    <tr
                      key={req.id}
                      className="border-b border-border-subtle last:border-0 hover:bg-bg-surface transition-colors"
                    >
                      {/* Type badge */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-2.5 py-1 ${typeConfig.bgColor}`}>
                          <TypeIcon className="size-3" />
                          {typeConfig.label}
                        </span>
                      </td>

                      {/* Nome + Email */}
                      <td className="px-4 py-3">
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{req.nome}</span>
                          <span className="text-xs text-muted-foreground">{req.email}</span>
                        </div>
                      </td>

                      {/* Assunto */}
                      <td className="px-4 py-3 text-foreground">
                        {truncate(req.assunto, 40)}
                      </td>

                      {/* Equipamento */}
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                        {req.equipamento || <span className="text-muted-foreground/40">--</span>}
                      </td>

                      {/* Status badge */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-2.5 py-1 ${statusConfig.bgColor}`}>
                          <StatusIcon className={`size-3 ${req.status === "in_progress" ? "animate-spin" : ""}`} />
                          {statusConfig.label}
                        </span>
                      </td>

                      {/* Data */}
                      <td className="px-4 py-3 text-muted-foreground text-xs tabular-nums hidden sm:table-cell">
                        {formatDateShort(req.created_at)}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => openDetail(req)}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors px-2 py-1.5 rounded-md hover:bg-black/[0.04]"
                        >
                          <Eye className="size-3.5" />
                          <span className="hidden sm:inline">Ver detalhes</span>
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {filteredRequests.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                      <Inbox className="size-8 mx-auto mb-2 opacity-50" />
                      {search || filterType !== "all" || filterStatus !== "all"
                        ? "Nenhuma solicitacao encontrada com os filtros aplicados"
                        : "Nenhuma solicitacao recebida ainda"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Back link */}
        <motion.div variants={itemVariants}>
          <Link
            href="/partnerzone/admin"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-fit"
          >
            <ArrowLeft className="size-3.5" />
            Voltar ao Admin
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Detail Modal ──────────────────────────────────────────────── */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => { if (!open) closeDetail() }}>
        <DialogContent className="bg-white border-black/[0.08] sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              {selectedRequest && (
                <>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-2.5 py-1 ${TYPE_CONFIG[selectedRequest.type].bgColor}`}>
                    {TYPE_CONFIG[selectedRequest.type].label}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-medium border rounded-full px-2.5 py-1 ${STATUS_CONFIG[selectedRequest.status].bgColor}`}>
                    {STATUS_CONFIG[selectedRequest.status].label}
                  </span>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              {selectedRequest ? `Recebida em ${formatDate(selectedRequest.created_at)}` : ""}
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <div className="flex flex-col gap-4 py-2">
              {/* Requester info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <Label className="text-muted-foreground text-xs">Nome</Label>
                  <p className="text-sm text-foreground font-medium">{selectedRequest.nome}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <Label className="text-muted-foreground text-xs">Email</Label>
                  <p className="text-sm text-foreground">{selectedRequest.email}</p>
                </div>
                {selectedRequest.telefone && (
                  <div className="flex flex-col gap-1">
                    <Label className="text-muted-foreground text-xs">Telefone</Label>
                    <p className="text-sm text-foreground">{selectedRequest.telefone}</p>
                  </div>
                )}
                {selectedRequest.equipamento && (
                  <div className="flex flex-col gap-1">
                    <Label className="text-muted-foreground text-xs">Equipamento</Label>
                    <p className="text-sm text-foreground">{selectedRequest.equipamento}</p>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-black/[0.08]" />

              {/* Subject & Description */}
              <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground text-xs">Assunto</Label>
                <p className="text-sm text-foreground font-medium">{selectedRequest.assunto}</p>
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-muted-foreground text-xs">Descricao</Label>
                <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed rounded-lg bg-black/[0.03] border border-black/[0.08] p-3">
                  {selectedRequest.descricao}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-black/[0.08]" />

              {/* Admin controls */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-foreground text-xs font-semibold">Alterar Status</Label>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="in_progress">Em Andamento</SelectItem>
                      <SelectItem value="resolved">Resolvida</SelectItem>
                      <SelectItem value="rejected">Rejeitada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-foreground text-xs font-semibold">Notas do Administrador</Label>
                  <Textarea
                    placeholder="Adicionar observacoes internas sobre esta solicitacao..."
                    value={editNotes}
                    onChange={(e) => setEditNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Resolved info */}
              {selectedRequest.resolved_at && (
                <p className="text-xs text-muted-foreground">
                  Resolvida em {formatDate(selectedRequest.resolved_at)}
                </p>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={closeDetail} disabled={saving}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={saving || !selectedRequest}
            >
              {saving ? (
                <Loader2 className="size-4 mr-1.5 animate-spin" />
              ) : (
                <Check className="size-4 mr-1.5" />
              )}
              Salvar Alteracoes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  )
}
