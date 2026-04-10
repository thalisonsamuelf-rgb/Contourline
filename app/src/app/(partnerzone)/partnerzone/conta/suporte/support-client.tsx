"use client"

import { useState, useCallback, type FormEvent } from "react"
import { motion } from "framer-motion"
import {
  Send,
  AlertCircle,
  CheckCircle,
  FileText,
  AlignLeft,
  Flag,
  History,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import type { SupportRequest } from "@/lib/partnerzone/customer-types"

type Priority = "baixa" | "media" | "alta"

interface SupportFormProps {
  defaultName: string
  defaultEmail: string
  defaultPhone: string
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
}

export function SupportForm({ defaultName, defaultEmail, defaultPhone }: SupportFormProps) {
  const [assunto, setAssunto] = useState("")
  const [descricao, setDescricao] = useState("")
  const [priority, setPriority] = useState<Priority>("media")
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault()
      if (!assunto.trim() || !descricao.trim()) {
        setStatus("error")
        setErrorMsg("Preencha o assunto e a descricao.")
        return
      }
      setSubmitting(true)
      setStatus("idle")

      // Prefix the description with priority for the admin team
      const enrichedDescription = `[Prioridade: ${priority.toUpperCase()}]\n\n${descricao}`

      try {
        const res = await fetch("/partnerzone/api/requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nome: defaultName,
            email: defaultEmail,
            telefone: defaultPhone,
            assunto,
            descricao: enrichedDescription,
            type: "reportar",
          }),
        })
        if (!res.ok) throw new Error("Falha")
        setStatus("success")
        setAssunto("")
        setDescricao("")
        setPriority("media")
        // Force refresh of history (simple approach: reload)
        setTimeout(() => window.location.reload(), 1000)
      } catch {
        setStatus("error")
        setErrorMsg("Erro ao enviar o ticket. Tente novamente.")
      } finally {
        setSubmitting(false)
      }
    },
    [assunto, descricao, priority, defaultName, defaultEmail, defaultPhone]
  )

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="rounded-2xl bg-[#0c1220] border border-white/[0.06] p-6"
    >
      <motion.div variants={itemVariants} className="mb-5">
        <h2 className="text-[16px] font-bold text-white">Abrir novo ticket</h2>
        <p className="text-[12px] text-white/40 mt-0.5">
          Conta vinculada a {defaultEmail || "—"}
        </p>
      </motion.div>

      {status === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[13px]"
        >
          <CheckCircle className="size-4 shrink-0" />
          <span>Ticket criado com sucesso. Vamos atualizar sua lista.</span>
        </motion.div>
      )}

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]"
        >
          <AlertCircle className="size-4 shrink-0" />
          <span>{errorMsg}</span>
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Assunto */}
        <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">
            Assunto <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/25" />
            <input
              type="text"
              value={assunto}
              onChange={(e) => setAssunto(e.target.value)}
              placeholder="Resumo do que voce precisa"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#070b14] border border-white/[0.08] text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </motion.div>

        {/* Prioridade */}
        <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">Prioridade</label>
          <div className="grid grid-cols-3 gap-2">
            {(["baixa", "media", "alta"] as const).map((p) => {
              const active = priority === p
              const colors: Record<Priority, string> = {
                baixa: active
                  ? "bg-blue-500/15 border-blue-500/40 text-blue-300"
                  : "bg-[#070b14] border-white/[0.08] text-white/50",
                media: active
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                  : "bg-[#070b14] border-white/[0.08] text-white/50",
                alta: active
                  ? "bg-red-500/15 border-red-500/40 text-red-300"
                  : "bg-[#070b14] border-white/[0.08] text-white/50",
              }
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`h-11 rounded-xl border text-[12px] font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${colors[p]}`}
                >
                  <Flag className="size-3.5" />
                  {p}
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Descricao */}
        <motion.div variants={itemVariants} className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">
            Descricao <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <AlignLeft className="absolute left-3.5 top-4 size-4 text-white/25" />
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Detalhe a sua duvida ou problema"
              rows={5}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#070b14] border border-white/[0.08] text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>
        </motion.div>

        {/* Submit */}
        <motion.button
          variants={itemVariants}
          type="submit"
          disabled={submitting}
          whileHover={{ scale: submitting ? 1 : 1.01 }}
          whileTap={{ scale: submitting ? 1 : 0.98 }}
          className={`flex items-center justify-center gap-2 w-full h-12 rounded-xl text-[14px] font-semibold transition-all duration-200 mt-2 ${
            submitting
              ? "bg-blue-500/50 text-white/50 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/20"
          }`}
        >
          {submitting ? (
            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send className="size-4" />
              Enviar Ticket
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  )
}

const STATUS_MAP: Record<
  SupportRequest["status"],
  { label: string; cls: string; Icon: typeof Clock }
> = {
  pending: {
    label: "Pendente",
    cls: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Icon: Clock,
  },
  in_progress: {
    label: "Em andamento",
    cls: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Icon: History,
  },
  resolved: {
    label: "Resolvido",
    cls: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Icon: CheckCircle2,
  },
  rejected: {
    label: "Rejeitado",
    cls: "bg-red-500/10 text-red-400 border-red-500/20",
    Icon: XCircle,
  },
}

function formatRelativeDate(value: string): string {
  const d = new Date(value)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d)
}

export function SupportHistory({ history }: { history: SupportRequest[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="rounded-2xl bg-[#0c1220] border border-white/[0.06] overflow-hidden"
    >
      <motion.div
        variants={itemVariants}
        className="px-6 py-4 border-b border-white/[0.06] flex items-center gap-2"
      >
        <History className="size-4 text-white/40" />
        <h2 className="text-[15px] font-bold text-white">Historico de tickets</h2>
        <span className="text-[11px] text-white/40 ml-1">({history.length})</span>
      </motion.div>

      {history.length === 0 ? (
        <motion.div
          variants={itemVariants}
          className="px-6 py-10 text-center text-[13px] text-white/40"
        >
          Voce ainda nao abriu nenhum ticket.
        </motion.div>
      ) : (
        <ul className="divide-y divide-white/[0.04]">
          {history.map((req) => {
            const status = STATUS_MAP[req.status]
            return (
              <motion.li
                key={req.id}
                variants={itemVariants}
                className="px-6 py-4 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-white truncate">
                      {req.assunto}
                    </p>
                    <p className="text-[11px] text-white/40 mt-0.5">
                      {formatRelativeDate(req.created_at)}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border whitespace-nowrap ${status.cls}`}>
                    <status.Icon className="size-3" />
                    {status.label}
                  </span>
                </div>
                <p className="text-[12px] text-white/50 line-clamp-2 leading-relaxed">
                  {req.descricao}
                </p>
                {req.admin_notes && (
                  <div className="mt-3 p-3 rounded-lg bg-blue-500/[0.05] border border-blue-500/[0.15]">
                    <p className="text-[10px] uppercase tracking-wider text-blue-400/70 font-bold mb-1">
                      Resposta da equipe
                    </p>
                    <p className="text-[12px] text-white/70 leading-relaxed">{req.admin_notes}</p>
                  </div>
                )}
              </motion.li>
            )
          })}
        </ul>
      )}
    </motion.div>
  )
}
