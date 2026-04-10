"use client"

import { useState, useEffect, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  FileText,
  Search,
  Heart,
  Building2,
  Settings,
  Image,
  Upload,
  BarChart3,
  Menu,
  X,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { UserProfile } from "@/lib/partnerzone/types"

const navItems = [
  { href: "/partnerzone", icon: Home, label: "Inicio" },
  { href: "/partnerzone/solicitacoes", icon: FileText, label: "Solicitacoes" },
  { href: "/partnerzone/search", icon: Search, label: "Buscar" },
  { href: "/partnerzone/favorites", icon: Heart, label: "Favoritos" },
]

const adminItems = [
  { href: "/partnerzone/admin", icon: Settings, label: "Painel Admin" },
  { href: "/partnerzone/admin/covers", icon: Image, label: "Capas Equipamentos" },
  { href: "/partnerzone/admin/upload", icon: Upload, label: "Upload Material" },
  { href: "/partnerzone/admin/solicitacoes", icon: FileText, label: "Solicitacoes" },
  { href: "/partnerzone/admin/analytics", icon: BarChart3, label: "Analytics" },
]

export default function PartnerZoneLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [institucionalExpanded, setInstitucionalExpanded] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    async function loadUser() {
      const supabase = getSupabaseBrowserClient()
      if (!supabase) return

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

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

  const displayName = userProfile?.full_name ?? "Thalison"

  const isAdmin = userProfile?.role === "admin" || userProfile?.role === "editor"

  return (
    <div className="flex min-h-screen bg-[#0c1220]">
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
          "fixed inset-y-0 left-0 z-50 w-[260px] flex flex-col",
          "bg-[#0c1220]",
          "border-r border-white/[0.08]",
          "transform transition-transform duration-300 ease-in-out",
          "lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header - Logo area */}
        <div className="flex items-center justify-between h-[64px] px-5 border-b border-white/[0.08]">
          <Link href="/partnerzone" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-[15px] font-semibold text-white tracking-tight leading-tight lowercase">
                partnerzone
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400/60 font-medium">
                CONTOURLINE
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/partnerzone/admin"
              className="p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              <Settings className="size-4 text-white/40 hover:text-white/60" />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              <X className="size-4 text-white/50" />
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 flex flex-col gap-0.5 px-3 pt-5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/5">
          {/* NAVEGACAO section */}
          <span className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
            Navegacao
          </span>

          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = href === "/partnerzone" ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 text-[13px] rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-[#1a2a40] text-white font-medium border-l-2 border-blue-400 ml-0"
                    : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                )}
              >
                <Icon className={cn(
                  "size-[17px]",
                  isActive ? "text-blue-400" : "text-white/40 group-hover:text-white/60"
                )} />
                <span className="flex-1">{label}</span>
              </Link>
            )
          })}

          {/* Institucional - expandable */}
          <button
            onClick={() => setInstitucionalExpanded(!institucionalExpanded)}
            className={cn(
              "group flex items-center gap-3 px-3 py-2.5 text-[13px] rounded-lg transition-all duration-200 w-full text-left",
              pathname.startsWith("/partnerzone/categories")
                ? "bg-[#1a2a40] text-white font-medium border-l-2 border-blue-400"
                : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
            )}
          >
            <Building2 className={cn(
              "size-[17px]",
              pathname.startsWith("/partnerzone/categories")
                ? "text-blue-400"
                : "text-white/40 group-hover:text-white/60"
            )} />
            <span className="flex-1">Institucional</span>
            <ChevronRight className={cn(
              "size-3.5 text-white/30 transition-transform duration-200",
              institucionalExpanded && "rotate-90"
            )} />
          </button>

          {institucionalExpanded && (
            <div className="ml-6 flex flex-col gap-0.5 mt-0.5">
              <Link
                href="/partnerzone/categories"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-[12px] text-white/40 hover:text-white/70 rounded-lg hover:bg-white/[0.03] transition-all"
              >
                Todas as categorias
              </Link>
            </div>
          )}

          {/* ADMINISTRACAO section */}
          {(isAdmin || !userProfile) && (
            <>
              <div className="my-4 mx-2 h-px bg-white/[0.06]" />
              <span className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/30">
                Administracao
              </span>
              {adminItems.map(({ href, icon: Icon, label }) => {
                const isActive = href === "/partnerzone/admin"
                  ? pathname === href
                  : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 px-3 py-2.5 text-[13px] rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-[#1a2a40] text-white font-medium border-l-2 border-blue-400"
                        : "text-white/50 hover:text-white/80 hover:bg-white/[0.04]"
                    )}
                  >
                    <Icon className={cn(
                      "size-[17px]",
                      isActive ? "text-blue-400" : "text-white/40 group-hover:text-white/60"
                    )} />
                    <span className="flex-1">{label}</span>
                  </Link>
                )
              })}
            </>
          )}
        </nav>

        {/* Footer - User */}
        <div className="p-3 border-t border-white/[0.08]">
          <div className="flex items-center gap-3 px-3 py-2.5">
            {userProfile?.avatar_url ? (
              <img
                src={userProfile.avatar_url}
                alt={displayName}
                className="size-9 rounded-full object-cover border border-white/10"
              />
            ) : (
              <div className="size-9 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center text-[12px] font-bold text-white">
                {initials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-white truncate">{displayName}</p>
            </div>
            <button
              onClick={async () => {
                const { getSupabaseBrowserClient } = await import("@/lib/supabase/client")
                const supabase = getSupabaseBrowserClient()
                if (supabase) await supabase.auth.signOut()
                window.location.href = "/partnerzone/login"
              }}
              title="Sair"
              className="p-1 rounded-md hover:bg-red-500/10 transition-colors shrink-0"
            >
              <LogOut className="size-4 text-white/30 hover:text-red-400 transition-colors" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#111827]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-[56px] px-6 border-b border-white/[0.06] bg-[#111827]/90 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              <Menu className="size-5 text-white/70" />
            </button>

            {/* Breadcrumb */}
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
          </div>

          {/* Right side - Online indicator */}
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-white/30">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Online
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
