"use client"

import { useState, useEffect, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  User,
  Heart,
  Bell,
  FolderOpen,
  Cpu,
  PlusCircle,
  HelpCircle,
  Shield,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { UserProfile } from "@/lib/partnerzone/types"

const navItems = [
  { href: "/partnerzone", icon: Home, label: "Inicio" },
  { href: "/partnerzone/profile", icon: User, label: "Meu Perfil" },
  { href: "/partnerzone/favorites", icon: Heart, label: "Favoritos" },
  { href: "/partnerzone/notifications", icon: Bell, label: "Notificacoes", badge: true },
  { href: "/partnerzone/categories", icon: FolderOpen, label: "Categorias" },
  { href: "/partnerzone/equipment", icon: Cpu, label: "Equipamentos" },
  { href: "/partnerzone/request", icon: PlusCircle, label: "Solicitar Material" },
  { href: "/partnerzone/help", icon: HelpCircle, label: "Duvidas" },
]

const adminItems = [
  { href: "/partnerzone/admin", icon: Shield, label: "Painel Admin" },
]

export default function PartnerZoneLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    async function loadUser() {
      const supabase = getSupabaseBrowserClient()
      if (!supabase) return

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      setUserEmail(user.email ?? null)

      const { data: profile } = await supabase
        .from("partnerzone_user_profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (profile) {
        setUserProfile(profile as UserProfile)
      }
    }
    loadUser()
  }, [])

  // Login page renders standalone without sidebar/nav
  if (pathname === "/partnerzone/login") {
    return <>{children}</>
  }

  const initials = userProfile?.full_name
    ? userProfile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "CL"

  const displayName = userProfile?.full_name ?? "Colaborador"
  const displayRole = userProfile?.role === "admin"
    ? "Administrador"
    : userProfile?.role === "editor"
    ? "Editor"
    : "Colaborador"

  const isAdmin = userProfile?.role === "admin" || userProfile?.role === "editor"

  return (
    <div className="flex min-h-screen bg-[#07070e]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[272px] flex flex-col",
          "bg-[#0a0a16]/95 backdrop-blur-xl",
          "border-r border-white/[0.06]",
          "transform transition-transform duration-300 ease-in-out",
          "lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between h-[72px] px-5 border-b border-white/[0.06]">
          <Link href="/partnerzone" className="flex items-center gap-3">
            <div className="relative flex items-center justify-center size-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20">
              <FolderOpen className="size-[18px] text-blue-400" />
              <div className="absolute -bottom-0.5 -right-0.5 size-2 rounded-full bg-emerald-400 border border-[#0a0a16]" />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-white tracking-tight leading-tight">
                PartnerZone
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-blue-400/70 font-medium">
                Contourline
              </span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <X className="size-4 text-white/50" />
          </button>
        </div>

        {/* User profile section */}
        <div className="px-4 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
            {userProfile?.avatar_url ? (
              <img
                src={userProfile.avatar_url}
                alt={displayName}
                className="size-10 rounded-xl object-cover border border-white/10"
              />
            ) : (
              <div className="size-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-[13px] font-bold text-white shadow-lg shadow-blue-500/20">
                {initials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-white truncate">{displayName}</p>
              <p className="text-[11px] text-white/40 truncate">{displayRole}</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-0.5 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5">
          <span className="px-3 pt-2 pb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">
            Menu
          </span>
          {navItems.map(({ href, icon: Icon, label, badge }) => {
            const isActive = href === "/partnerzone" ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 text-[13px] rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-500/15 to-purple-500/10 text-white font-semibold border border-blue-500/15 shadow-sm shadow-blue-500/5"
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                )}
              >
                <div className={cn(
                  "flex items-center justify-center size-8 rounded-lg transition-colors",
                  isActive
                    ? "bg-blue-500/20 text-blue-400"
                    : "text-white/40 group-hover:text-white/60"
                )}>
                  <Icon className="size-[18px]" />
                </div>
                <span className="flex-1">{label}</span>
                {badge && (
                  <span className="flex items-center justify-center size-5 rounded-full bg-blue-500 text-[10px] font-bold text-white">
                    3
                  </span>
                )}
                {isActive && (
                  <ChevronRight className="size-3.5 text-blue-400/60" />
                )}
              </Link>
            )
          })}

          {/* Admin section */}
          {isAdmin && (
            <>
              <div className="my-3 mx-3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              <span className="px-3 pt-1 pb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">
                Administracao
              </span>
              {adminItems.map(({ href, icon: Icon, label }) => {
                const isActive = pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 px-3 py-2.5 text-[13px] rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-amber-500/15 to-orange-500/10 text-white font-semibold border border-amber-500/15"
                        : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center size-8 rounded-lg transition-colors",
                      isActive
                        ? "bg-amber-500/20 text-amber-400"
                        : "text-white/40 group-hover:text-white/60"
                    )}>
                      <Icon className="size-[18px]" />
                    </div>
                    <span className="flex-1">{label}</span>
                    {isActive && (
                      <ChevronRight className="size-3.5 text-amber-400/60" />
                    )}
                  </Link>
                )
              })}
            </>
          )}

          {/* Always show admin for non-authed users (fallback) */}
          {!userProfile && (
            <>
              <div className="my-3 mx-3 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
              <span className="px-3 pt-1 pb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/25">
                Administracao
              </span>
              {adminItems.map(({ href, icon: Icon, label }) => {
                const isActive = pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 px-3 py-2.5 text-[13px] rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-amber-500/15 to-orange-500/10 text-white font-semibold border border-amber-500/15"
                        : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                    )}
                  >
                    <div className={cn(
                      "flex items-center justify-center size-8 rounded-lg transition-colors",
                      isActive
                        ? "bg-amber-500/20 text-amber-400"
                        : "text-white/40 group-hover:text-white/60"
                    )}>
                      <Icon className="size-[18px]" />
                    </div>
                    <span className="flex-1">{label}</span>
                  </Link>
                )
              })}
            </>
          )}
        </nav>

        {/* Footer - Logout */}
        <div className="p-3 border-t border-white/[0.06]">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all duration-200">
            <LogOut className="size-[18px]" />
            <span className="text-[13px]">Sair</span>
          </button>
          <div className="mt-2 px-3">
            <p className="text-[10px] text-white/20 truncate">
              {userEmail ?? "contourline.com.br"}
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#07070e]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center h-[64px] px-6 border-b border-white/[0.06] bg-[#07070e]/80 backdrop-blur-xl">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-white/[0.06] transition-colors mr-3"
          >
            <Menu className="size-5 text-white/70" />
          </button>

          {/* Breadcrumb / Page context */}
          <div className="hidden lg:flex items-center gap-2 text-[13px]">
            <span className="text-white/30">PartnerZone</span>
            {pathname !== "/partnerzone" && (
              <>
                <ChevronRight className="size-3 text-white/20" />
                <span className="text-white/60 capitalize">
                  {pathname.split("/").pop()?.replace(/-/g, " ")}
                </span>
              </>
            )}
          </div>

          <div className="flex-1" />

          {/* Right side indicators */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl hover:bg-white/[0.06] transition-colors">
              <Bell className="size-[18px] text-white/50" />
              <span className="absolute top-1 right-1 size-2 rounded-full bg-blue-500 border border-[#07070e]" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white/30">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-5 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
