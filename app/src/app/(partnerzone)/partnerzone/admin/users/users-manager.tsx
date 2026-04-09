"use client"

import { useState, useMemo, useCallback, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Users,
  UserPlus,
  Search,
  Shield,
  Edit3,
  Eye,
  Trash2,
  ArrowLeft,
  Loader2,
  X,
  Check,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import type { UserProfile } from "@/lib/partnerzone/types"

// ── Types ──────────────────────────────────────────────────────────────

interface UserWithEmail extends UserProfile {
  email: string | null
}

interface UserStats {
  total: number
  byRole: { admin: number; editor: number; viewer: number }
  byDepartment: Record<string, number>
}

interface UsersManagerProps {
  initialUsers: UserWithEmail[]
  initialStats: UserStats
}

// ── Constants ──────────────────────────────────────────────────────────

type Role = "admin" | "editor" | "viewer"
type Department = "marketing" | "vendas" | "clinical" | "admin" | "operacoes"

const ROLE_CONFIG: Record<Role, { label: string; color: string; bgColor: string; icon: typeof Shield }> = {
  admin: { label: "Admin", color: "text-rose-400", bgColor: "bg-rose-500/15 border-rose-500/20", icon: Shield },
  editor: { label: "Editor", color: "text-blue-400", bgColor: "bg-blue-500/15 border-blue-500/20", icon: Edit3 },
  viewer: { label: "Viewer", color: "text-gray-400", bgColor: "bg-gray-500/15 border-gray-500/20", icon: Eye },
}

const DEPARTMENT_CONFIG: Record<string, { label: string; color: string }> = {
  marketing: { label: "Marketing", color: "bg-purple-500/15 text-purple-400 border-purple-500/20" },
  vendas: { label: "Vendas", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
  clinical: { label: "Clinical", color: "bg-cyan-500/15 text-cyan-400 border-cyan-500/20" },
  admin: { label: "Admin", color: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
  operacoes: { label: "Operacoes", color: "bg-orange-500/15 text-orange-400 border-orange-500/20" },
}

const DEPARTMENTS: Department[] = ["marketing", "vendas", "clinical", "admin", "operacoes"]

const AVATAR_COLORS: Record<Role, string> = {
  admin: "bg-rose-500/20 text-rose-400 border-rose-500/30",
  editor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  viewer: "bg-gray-500/20 text-gray-400 border-gray-500/30",
}

// ── Helpers ────────────────────────────────────────────────────────────

function getInitials(name: string | null): string {
  if (!name) return "?"
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

function formatDate(dateStr: string): string {
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
              ? "border-emerald-500/30 bg-emerald-950/80 text-emerald-300"
              : "border-red-500/30 bg-red-950/80 text-red-300"
          }`}
        >
          {t.type === "success" ? (
            <Check className="size-4 shrink-0" />
          ) : (
            <AlertTriangle className="size-4 shrink-0" />
          )}
          <span>{t.message}</span>
          <button onClick={() => onDismiss(t.id)} className="ml-2 p-0.5 rounded hover:bg-white/10">
            <X className="size-3" />
          </button>
        </motion.div>
      ))}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────

export default function UsersManager({ initialUsers, initialStats }: UsersManagerProps) {
  const router = useRouter()

  // State
  const [users, setUsers] = useState<UserWithEmail[]>(initialUsers)
  const [stats, setStats] = useState(initialStats)
  const [search, setSearch] = useState("")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [filterDept, setFilterDept] = useState<string>("all")

  // Modals
  const [inviteOpen, setInviteOpen] = useState(false)
  const [confirmAction, setConfirmAction] = useState<{
    type: "role" | "delete"
    userId: string
    userName: string
    value?: string
  } | null>(null)

  // Form state
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteName, setInviteName] = useState("")
  const [inviteRole, setInviteRole] = useState<Role>("viewer")
  const [inviteDept, setInviteDept] = useState("")

  // Loading
  const [inviting, setInviting] = useState(false)
  const [updatingUser, setUpdatingUser] = useState<string | null>(null)

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

  // Filtered users
  const filteredUsers = useMemo(() => {
    let result = users

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (u) =>
          (u.full_name ?? "").toLowerCase().includes(q) ||
          (u.email ?? "").toLowerCase().includes(q) ||
          u.id.toLowerCase().includes(q)
      )
    }

    if (filterRole !== "all") {
      result = result.filter((u) => u.role === filterRole)
    }

    if (filterDept !== "all") {
      result = result.filter((u) => u.department === filterDept)
    }

    return result
  }, [users, search, filterRole, filterDept])

  // ── Refresh data ───────────────────────────────────────────────────

  const refreshUsers = async () => {
    try {
      const res = await fetch("/partnerzone/api/users")
      if (res.ok) {
        const json = await res.json()
        setUsers(json.data)
        setStats({
          total: json.stats.total,
          byRole: {
            admin: json.stats.admin,
            editor: json.stats.editor,
            viewer: json.stats.viewer,
          },
          byDepartment: {},
        })
      }
    } catch {
      // Silently fail — stale data is acceptable
    }
  }

  // ── Invite user ────────────────────────────────────────────────────

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return

    setInviting(true)
    try {
      const res = await fetch("/partnerzone/api/users/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inviteEmail.trim(),
          full_name: inviteName.trim() || null,
          role: inviteRole,
          department: inviteDept || null,
        }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error)

      addToast(`Usuario ${inviteEmail} convidado com sucesso`, "success")
      setInviteOpen(false)
      setInviteEmail("")
      setInviteName("")
      setInviteRole("viewer")
      setInviteDept("")
      await refreshUsers()
      router.refresh()
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Erro ao convidar usuario", "error")
    } finally {
      setInviting(false)
    }
  }

  // ── Update role ────────────────────────────────────────────────────

  const handleUpdateRole = async (userId: string, role: string) => {
    setUpdatingUser(userId)
    try {
      const res = await fetch("/partnerzone/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error)

      addToast("Permissao atualizada com sucesso", "success")
      setConfirmAction(null)
      await refreshUsers()
      router.refresh()
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Erro ao atualizar permissao", "error")
    } finally {
      setUpdatingUser(null)
    }
  }

  // ── Update department ──────────────────────────────────────────────

  const handleUpdateDepartment = async (userId: string, department: string) => {
    setUpdatingUser(userId)
    try {
      const res = await fetch("/partnerzone/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, department }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error)

      addToast("Departamento atualizado com sucesso", "success")
      await refreshUsers()
      router.refresh()
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Erro ao atualizar departamento", "error")
    } finally {
      setUpdatingUser(null)
    }
  }

  // ── Delete user ────────────────────────────────────────────────────

  const handleDelete = async (userId: string) => {
    setUpdatingUser(userId)
    try {
      const res = await fetch("/partnerzone/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      })

      const json = await res.json()
      if (!res.ok) throw new Error(json.error)

      addToast("Usuario removido com sucesso", "success")
      setConfirmAction(null)
      await refreshUsers()
      router.refresh()
    } catch (err) {
      addToast(err instanceof Error ? err.message : "Erro ao remover usuario", "error")
    } finally {
      setUpdatingUser(null)
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
          <span className="text-foreground font-medium">Usuarios</span>
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Gestao de Usuarios</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {stats.total} {stats.total === 1 ? "usuario cadastrado" : "usuarios cadastrados"}
            </p>
          </div>
          <Button variant="primary" size="sm" onClick={() => setInviteOpen(true)}>
            <UserPlus className="size-4 mr-1.5" />
            Convidar Usuario
          </Button>
        </motion.div>

        {/* Stats cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total", value: stats.total, icon: Users, color: "text-white" },
            { label: "Admins", value: stats.byRole.admin, icon: Shield, color: "text-rose-400" },
            { label: "Editors", value: stats.byRole.editor, icon: Edit3, color: "text-blue-400" },
            { label: "Viewers", value: stats.byRole.viewer, icon: Eye, color: "text-gray-400" },
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
              placeholder="Buscar por nome, email ou ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterRole} onValueChange={setFilterRole}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Permissao" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="editor">Editor</SelectItem>
              <SelectItem value="viewer">Viewer</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterDept} onValueChange={setFilterDept}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Departamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {DEPARTMENTS.map((d) => (
                <SelectItem key={d} value={d}>
                  {DEPARTMENT_CONFIG[d].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Users table */}
        <motion.div variants={itemVariants} className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-bg-surface">
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Usuario</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Permissao</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Departamento</th>
                  <th className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Criado em</th>
                  <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const roleConfig = ROLE_CONFIG[user.role as Role] ?? ROLE_CONFIG.viewer
                  const deptConfig = user.department ? DEPARTMENT_CONFIG[user.department] : null
                  const isUpdating = updatingUser === user.id

                  return (
                    <tr
                      key={user.id}
                      className="border-b border-border-subtle last:border-0 hover:bg-bg-surface transition-colors"
                    >
                      {/* Avatar + Name */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex items-center justify-center size-8 rounded-full border text-xs font-bold ${AVATAR_COLORS[user.role as Role] ?? AVATAR_COLORS.viewer}`}
                          >
                            {getInitials(user.full_name)}
                          </div>
                          <span className="font-medium text-foreground">
                            {user.full_name || "Sem nome"}
                          </span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-4 py-3 text-muted-foreground">
                        {user.email || (
                          <span className="text-xs text-muted-foreground/50 font-mono">
                            {user.id.slice(0, 8)}...
                          </span>
                        )}
                      </td>

                      {/* Role */}
                      <td className="px-4 py-3">
                        <Select
                          value={user.role}
                          onValueChange={(value) => {
                            setConfirmAction({
                              type: "role",
                              userId: user.id,
                              userName: user.full_name || user.email || user.id.slice(0, 8),
                              value,
                            })
                          }}
                          disabled={isUpdating}
                        >
                          <SelectTrigger className={`h-7 text-xs border px-2.5 py-1 rounded-full w-auto ${roleConfig.bgColor} ${roleConfig.color}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="editor">Editor</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>

                      {/* Department */}
                      <td className="px-4 py-3">
                        <Select
                          value={user.department ?? "none"}
                          onValueChange={(value) => {
                            handleUpdateDepartment(user.id, value === "none" ? "" : value)
                          }}
                          disabled={isUpdating}
                        >
                          <SelectTrigger
                            className={`h-7 text-xs border px-2.5 py-1 rounded-full w-auto ${
                              deptConfig ? deptConfig.color : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                            }`}
                          >
                            <SelectValue placeholder="Nenhum" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Nenhum</SelectItem>
                            {DEPARTMENTS.map((d) => (
                              <SelectItem key={d} value={d}>
                                {DEPARTMENT_CONFIG[d].label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>

                      {/* Created at */}
                      <td className="px-4 py-3 text-muted-foreground text-xs tabular-nums">
                        {formatDate(user.created_at)}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() =>
                            setConfirmAction({
                              type: "delete",
                              userId: user.id,
                              userName: user.full_name || user.email || user.id.slice(0, 8),
                            })
                          }
                          disabled={isUpdating}
                          className="p-1.5 rounded-md hover:bg-destructive/10 transition-colors disabled:opacity-50"
                          title="Remover usuario"
                        >
                          {isUpdating ? (
                            <Loader2 className="size-3.5 text-muted-foreground animate-spin" />
                          ) : (
                            <Trash2 className="size-3.5 text-muted-foreground hover:text-destructive transition-colors" />
                          )}
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                      <Users className="size-8 mx-auto mb-2 opacity-50" />
                      {search || filterRole !== "all" || filterDept !== "all"
                        ? "Nenhum usuario encontrado com os filtros aplicados"
                        : "Nenhum usuario cadastrado"}
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

      {/* ── Invite Modal ──────────────────────────────────────────────── */}
      <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
        <DialogContent className="bg-[#111827] border-white/[0.06]">
          <DialogHeader>
            <DialogTitle className="text-foreground">Convidar Usuario</DialogTitle>
            <DialogDescription>
              Envie um convite para um novo usuario acessar o PartnerZone
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Email *</Label>
              <Input
                type="email"
                placeholder="usuario@contourline.com.br"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label className="text-foreground">Nome completo</Label>
              <Input
                placeholder="Nome do usuario"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground">Permissao</Label>
                <Select value={inviteRole} onValueChange={(v) => setInviteRole(v as Role)}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-foreground">Departamento</Label>
                <Select value={inviteDept || "none"} onValueChange={(v) => setInviteDept(v === "none" ? "" : v)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nenhum</SelectItem>
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d} value={d}>
                        {DEPARTMENT_CONFIG[d].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setInviteOpen(false)} disabled={inviting}>
              Cancelar
            </Button>
            <Button variant="primary" size="sm" onClick={handleInvite} disabled={inviting || !inviteEmail.trim()}>
              {inviting ? (
                <Loader2 className="size-4 mr-1.5 animate-spin" />
              ) : (
                <UserPlus className="size-4 mr-1.5" />
              )}
              Convidar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Confirmation Dialog ───────────────────────────────────────── */}
      <Dialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
        <DialogContent className="bg-[#111827] border-white/[0.06] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {confirmAction?.type === "delete" ? "Remover Usuario" : "Alterar Permissao"}
            </DialogTitle>
            <DialogDescription>
              {confirmAction?.type === "delete" ? (
                <>
                  Tem certeza que deseja remover o perfil de{" "}
                  <span className="font-semibold text-foreground">{confirmAction.userName}</span>?
                  Esta acao nao pode ser desfeita.
                </>
              ) : (
                <>
                  Alterar a permissao de{" "}
                  <span className="font-semibold text-foreground">{confirmAction?.userName}</span>
                  {" "}para{" "}
                  <span className="font-semibold text-foreground">{confirmAction?.value}</span>?
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setConfirmAction(null)}
              disabled={!!updatingUser}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="sm"
              className={confirmAction?.type === "delete" ? "bg-destructive hover:bg-destructive/90" : ""}
              onClick={() => {
                if (!confirmAction) return
                if (confirmAction.type === "delete") {
                  handleDelete(confirmAction.userId)
                } else if (confirmAction.type === "role" && confirmAction.value) {
                  handleUpdateRole(confirmAction.userId, confirmAction.value)
                }
              }}
              disabled={!!updatingUser}
            >
              {updatingUser ? (
                <Loader2 className="size-4 mr-1.5 animate-spin" />
              ) : confirmAction?.type === "delete" ? (
                <Trash2 className="size-4 mr-1.5" />
              ) : (
                <Check className="size-4 mr-1.5" />
              )}
              {confirmAction?.type === "delete" ? "Remover" : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  )
}
