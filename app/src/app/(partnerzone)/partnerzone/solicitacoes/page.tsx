"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Settings,
  FileText,
  AlignLeft,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

type TabType = "solicitar" | "reportar"

interface FormData {
  nome: string
  email: string
  telefone: string
  equipamento: string
  assunto: string
  descricao: string
  type: TabType
}

const initialFormData: FormData = {
  nome: "",
  email: "",
  telefone: "",
  equipamento: "",
  assunto: "",
  descricao: "",
  type: "solicitar",
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
}

export default function SolicitacoesPage() {
  const [activeTab, setActiveTab] = useState<TabType>("solicitar")
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (submitStatus !== "idle") setSubmitStatus("idle")
  }, [submitStatus])

  const handleTabChange = useCallback((tab: TabType) => {
    setActiveTab(tab)
    setFormData((prev) => ({ ...prev, type: tab }))
    setSubmitStatus("idle")
  }, [])

  const formatPhone = useCallback((value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11)
    if (digits.length <= 2) return digits.length > 0 ? `(${digits}` : ""
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      // Basic validation
      if (!formData.nome.trim() || !formData.email.trim() || !formData.telefone.trim() || !formData.assunto.trim() || !formData.descricao.trim()) {
        setSubmitStatus("error")
        setErrorMessage("Preencha todos os campos obrigatorios.")
        return
      }

      setSubmitting(true)
      setSubmitStatus("idle")

      try {
        const res = await fetch("/partnerzone/api/requests", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        })

        if (!res.ok) {
          throw new Error("Falha ao enviar solicitacao")
        }

        setSubmitStatus("success")
        setFormData(initialFormData)
      } catch {
        setSubmitStatus("error")
        setErrorMessage("Erro ao enviar solicitacao. Tente novamente.")
      } finally {
        setSubmitting(false)
      }
    },
    [formData]
  )

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6 max-w-2xl mx-auto"
    >
      {/* Back button */}
      <motion.div variants={itemVariants}>
        <Link
          href="/partnerzone"
          className="inline-flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Voltar
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-white">Solicitacoes</h1>
        <p className="text-[14px] text-white/40">
          Reporte problemas ou solicite novos materiais
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div variants={itemVariants} className="flex gap-2">
        <button
          onClick={() => handleTabChange("solicitar")}
          className={cn(
            "px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200",
            activeTab === "solicitar"
              ? "bg-blue-500 text-white"
              : "bg-[#0c1220] border border-white/[0.08] text-white/50 hover:text-white/80 hover:border-white/[0.15]"
          )}
        >
          Solicitar Novo Material
        </button>
        <button
          onClick={() => handleTabChange("reportar")}
          className={cn(
            "px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200",
            activeTab === "reportar"
              ? "bg-blue-500 text-white"
              : "bg-[#0c1220] border border-white/[0.08] text-white/50 hover:text-white/80 hover:border-white/[0.15]"
          )}
        >
          Reportar Problema
        </button>
      </motion.div>

      {/* Success message */}
      {submitStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[13px]"
        >
          <CheckCircle className="size-5 shrink-0" />
          <span>Solicitacao enviada com sucesso! Entraremos em contato em breve.</span>
        </motion.div>
      )}

      {/* Error message */}
      {submitStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[13px]"
        >
          <AlertCircle className="size-5 shrink-0" />
          <span>{errorMessage}</span>
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        variants={itemVariants}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        {/* Nome */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">
            Nome <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/25" />
            <input
              type="text"
              value={formData.nome}
              onChange={(e) => updateField("nome", e.target.value)}
              placeholder="Seu nome completo"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0c1220] border border-white/[0.08] text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">
            Email <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/25" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="seu@email.com"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0c1220] border border-white/[0.08] text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {/* Telefone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">
            Telefone <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/25" />
            <input
              type="tel"
              value={formData.telefone}
              onChange={(e) => updateField("telefone", formatPhone(e.target.value))}
              placeholder="(31) 99999-9999"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0c1220] border border-white/[0.08] text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {/* Equipamento */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">
            Equipamento
          </label>
          <div className="relative">
            <Settings className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/25" />
            <input
              type="text"
              value={formData.equipamento}
              onChange={(e) => updateField("equipamento", e.target.value)}
              placeholder="Ex: HIPRO, Enygma..."
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0c1220] border border-white/[0.08] text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {/* Assunto */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">
            Assunto <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-white/25" />
            <input
              type="text"
              value={formData.assunto}
              onChange={(e) => updateField("assunto", e.target.value)}
              placeholder={
                activeTab === "solicitar"
                  ? "Ex: Preciso de fotos do novo HIPRO"
                  : "Ex: Link de download quebrado"
              }
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-[#0c1220] border border-white/[0.08] text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        {/* Descricao */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[12px] font-medium text-white/50">
            Descricao <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <AlignLeft className="absolute left-3.5 top-4 size-4 text-white/25" />
            <textarea
              value={formData.descricao}
              onChange={(e) => updateField("descricao", e.target.value)}
              placeholder={
                activeTab === "solicitar"
                  ? "Descreva o material que precisa..."
                  : "Descreva o problema encontrado..."
              }
              rows={5}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-[#0c1220] border border-white/[0.08] text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none"
            />
          </div>
        </div>

        {/* Submit button */}
        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ scale: submitting ? 1 : 1.01 }}
          whileTap={{ scale: submitting ? 1 : 0.98 }}
          className={cn(
            "flex items-center justify-center gap-2 w-full h-12 rounded-xl text-[14px] font-semibold transition-all duration-200 mt-2",
            submitting
              ? "bg-blue-500/50 text-white/50 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/20"
          )}
        >
          {submitting ? (
            <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send className="size-4" />
              Enviar Solicitacao
            </>
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  )
}
