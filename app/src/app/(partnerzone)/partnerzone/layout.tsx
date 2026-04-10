"use client"

import { useState, useEffect, useRef, type ReactNode } from "react"
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
  User as UserIcon,
  FileSignature,
  Receipt,
  Wrench,
  LifeBuoy,
  LogIn,
} from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
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

const accountMenuItems = [
  { href: "/partnerzone/conta", icon: UserIcon, label: "Minha Conta" },
  { href: "/partnerzone/conta/contrato", icon: FileSignature, label: "Contrato" },
  { href: "/partnerzone/conta/boletos", icon: Receipt, label: "Boletos" },
  { href: "/partnerzone/conta/equipamentos", icon: Wrench, label: "Meus Equipamentos" },
  { href: "/partnerzone/conta/suporte", icon: LifeBuoy, label: "Suporte" },
]

interface AuthState {
  loaded: boolean
  email: string | null
  profile: UserProfile | null
}

export default function PartnerZoneLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [institucionalExpanded, setInstitucionalExpanded] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [auth, setAuth] = useState<AuthState>({ loaded: false, email: null, profile: null })
  const userMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function loadUser() {
      const supabase = getSupabaseBrowserClient()
      if (!supabase) {
        setAuth({ loaded: true, email: null, profile: null })
        return
      }

      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setAuth({ loaded: true, email: null, profile: null })
        return
      }

      const { data: profile } = await supabase
        .from("partnerzone_user_profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      setAuth({
        loaded: true,
        email: user.email ?? null,
        profile: (profile as UserProfile | null) ?? null,
      })
    }
    loadUser()
  }, [])

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false)
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setUserMenuOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscape)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscape)
    }
  }, [userMenuOpen])

  // Login page renders standalone without sidebar/nav
  if (pathname === "/partnerzone/login") {
    return <>{children}</>
  }

  const userProfile = auth.profile
  const isLoggedIn = Boolean(userProfile || auth.email)

  const initials = userProfile?.full_name
    ? userProfile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : auth.email
      ? auth.email.slice(0, 2).toUpperCase()
      : "CL"

  const displayName = userProfile?.full_name ?? auth.email?.split("@")[0] ?? "Usuario"
  const isAdmin = userProfile?.role === "admin" || userProfile?.role === "editor"

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient()
    if (supabase) await supabase.auth.signOut()
    window.location.href = "/partnerzone"
  }

  return (
    <div className="flex min-h-screen bg-[var(--pz-bg)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-[260px] flex flex-col",
          "bg-[var(--pz-sidebar-bg)]",
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
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium">
                CONTOURLINE
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link
                href="/partnerzone/admin"
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Settings className="size-4 text-white/60 hover:text-white" />
              </Link>
            )}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="size-4 text-white/70" />
            </button>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 flex flex-col gap-0.5 px-3 pt-5 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
          {/* NAVEGACAO section */}
          <span className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
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
                    ? "bg-[var(--pz-sidebar-active)] text-white font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon className={cn(
                  "size-[17px]",
                  isActive ? "text-white" : "text-white/60 group-hover:text-white"
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
                ? "bg-[var(--pz-sidebar-active)] text-white font-medium"
                : "text-white/70 hover:text-white hover:bg-white/10"
            )}
          >
            <Building2 className={cn(
              "size-[17px]",
              pathname.startsWith("/partnerzone/categories")
                ? "text-white"
                : "text-white/60 group-hover:text-white"
            )} />
            <span className="flex-1">Institucional</span>
            <ChevronRight className={cn(
              "size-3.5 text-white/50 transition-transform duration-200",
              institucionalExpanded && "rotate-90"
            )} />
          </button>

          {institucionalExpanded && (
            <div className="ml-6 flex flex-col gap-0.5 mt-0.5">
              <Link
                href="/partnerzone/categories"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-[12px] text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-all"
              >
                Todas as categorias
              </Link>
            </div>
          )}

          {/* AREA DO CLIENTE section (logged-in only) */}
          {isLoggedIn && (
            <>
              <div className="my-4 mx-2 h-px bg-white/[0.08]" />
              <span className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
                Area do Cliente
              </span>
              {accountMenuItems.map(({ href, icon: Icon, label }) => {
                const isActive = href === "/partnerzone/conta"
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
                        ? "bg-[var(--pz-sidebar-active)] text-white font-medium"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <Icon className={cn(
                      "size-[17px]",
                      isActive ? "text-white" : "text-white/60 group-hover:text-white"
                    )} />
                    <span className="flex-1">{label}</span>
                  </Link>
                )
              })}
            </>
          )}

          {/* ADMINISTRACAO section (admins/editors only) */}
          {isAdmin && (
            <>
              <div className="my-4 mx-2 h-px bg-white/[0.08]" />
              <span className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-white/50">
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
                        ? "bg-[var(--pz-sidebar-active)] text-white font-medium"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    )}
                  >
                    <Icon className={cn(
                      "size-[17px]",
                      isActive ? "text-white" : "text-white/60 group-hover:text-white"
                    )} />
                    <span className="flex-1">{label}</span>
                  </Link>
                )
              })}
            </>
          )}
        </nav>

        {/* Footer - User (only if logged in) */}
        {isLoggedIn && (
          <div className="p-3 border-t border-white/[0.08]">
            <div className="flex items-center gap-3 px-3 py-2.5">
              {userProfile?.avatar_url ? (
                <img
                  src={userProfile.avatar_url}
                  alt={displayName}
                  className="size-9 rounded-full object-cover border border-white/20"
                />
              ) : (
                <div className="size-9 rounded-full bg-white/15 flex items-center justify-center text-[12px] font-bold text-white">
                  {initials}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-white truncate">{displayName}</p>
              </div>
              <button
                onClick={handleLogout}
                title="Sair"
                className="p-1 rounded-md hover:bg-white/10 transition-colors shrink-0"
              >
                <LogOut className="size-4 text-white/60 hover:text-white transition-colors" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[var(--pz-bg)]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-[56px] px-6 border-b border-black/[0.08] bg-white/90 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-black/[0.04] transition-colors"
            >
              <Menu className="size-5 text-black/70" />
            </button>

            {/* Breadcrumb */}
            <div className="hidden lg:flex items-center gap-2 text-[13px]">
              <span className="text-black/40">PartnerZone</span>
              {pathname !== "/partnerzone" && (
                <>
                  <ChevronRight className="size-3 text-black/30" />
                  <span className="text-black/70 capitalize">
                    {pathname.split("/").pop()?.replace(/-/g, " ")}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Online indicator */}
            <div className="hidden sm:flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] text-black/40">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online
            </div>

            {/* User menu / Login button */}
            {!auth.loaded ? (
              <div className="size-9 rounded-full bg-black/[0.06] animate-pulse" />
            ) : isLoggedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((open) => !open)}
                  className={cn(
                    "flex items-center gap-2 p-1 pr-2 rounded-full transition-all duration-200",
                    userMenuOpen
                      ? "bg-black/[0.06] ring-1 ring-[#24336E]/30"
                      : "hover:bg-black/[0.04]"
                  )}
                  aria-haspopup="true"
                  aria-expanded={userMenuOpen}
                  aria-label="Menu do usuario"
                >
                  {userProfile?.avatar_url ? (
                    <img
                      src={userProfile.avatar_url}
                      alt={displayName}
                      className="size-8 rounded-full object-cover border border-black/10"
                    />
                  ) : (
                    <div className="size-8 rounded-full bg-[#24336E] flex items-center justify-center text-[11px] font-bold text-white">
                      {initials}
                    </div>
                  )}
                  <span className="hidden md:block text-[12px] font-medium text-black/80 max-w-[120px] truncate">
                    {displayName}
                  </span>
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute right-0 top-[calc(100%+8px)] w-[260px] rounded-xl bg-white border border-black/[0.08] shadow-xl shadow-black/10 overflow-hidden"
                    >
                      {/* Header */}
                      <div className="flex items-center gap-3 px-4 py-3.5 border-b border-black/[0.08] bg-black/[0.02]">
                        {userProfile?.avatar_url ? (
                          <img
                            src={userProfile.avatar_url}
                            alt={displayName}
                            className="size-10 rounded-full object-cover border border-black/10"
                          />
                        ) : (
                          <div className="size-10 rounded-full bg-[#24336E] flex items-center justify-center text-[12px] font-bold text-white">
                            {initials}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-semibold text-black/80 truncate">
                            {displayName}
                          </p>
                          {auth.email && (
                            <p className="text-[11px] text-black/50 truncate">{auth.email}</p>
                          )}
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-1.5">
                        {accountMenuItems.map(({ href, icon: Icon, label }) => (
                          <Link
                            key={href}
                            href={href}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-[13px] text-black/70 hover:text-black hover:bg-black/[0.04] transition-colors"
                          >
                            <Icon className="size-4 text-black/50" />
                            <span>{label}</span>
                          </Link>
                        ))}
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-black/[0.08]" />

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-[13px] text-[#B91C1C] hover:bg-[#EF4444]/10 transition-colors"
                      >
                        <LogOut className="size-4" />
                        <span>Sair</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                href={`/partnerzone/login?redirect=${encodeURIComponent(pathname)}`}
                className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-[#24336E] hover:bg-[#1B2655] text-white text-[12px] font-semibold transition-colors shadow-lg shadow-[#24336E]/20"
              >
                <LogIn className="size-4" />
                Entrar
              </Link>
            )}
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
