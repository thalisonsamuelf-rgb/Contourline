"use client"

import { useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Search,
  Heart,
  Shield,
  Menu,
  X,
  FolderOpen,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/partnerzone", icon: Home, label: "Início" },
  { href: "/partnerzone/search", icon: Search, label: "Buscar" },
  { href: "/partnerzone/favorites", icon: Heart, label: "Favoritos" },
]

const adminItems = [
  { href: "/partnerzone/admin", icon: Shield, label: "Admin" },
]

export default function PartnerZoneLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Login page renders standalone without sidebar/nav
  if (pathname === "/partnerzone/login") {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 flex flex-col bg-bg-elevated border-r border-border",
          "transform transition-transform duration-300 ease-in-out",
          "lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-border">
          <Link href="/partnerzone" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10">
              <FolderOpen className="size-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground tracking-tight">PartnerZone</span>
              <span className="text-[9px] uppercase tracking-widest text-muted-foreground">Contourline</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-bg-surface transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-1 p-3 overflow-y-auto">
          <span className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Navegação
          </span>
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = href === "/partnerzone" ? pathname === href : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-bg-surface"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </Link>
            )
          })}

          <div className="my-3 h-px bg-border-subtle" />

          <span className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Administração
          </span>
          {adminItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 text-sm rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-bg-surface"
                )}
              >
                <Icon className="size-4 shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-bg-surface">
            <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
              CL
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">Colaborador</p>
              <p className="text-[10px] text-muted-foreground truncate">contourline.com.br</p>
            </div>
            <button className="p-1 rounded-md hover:bg-bg-surface-hover transition-colors">
              <LogOut className="size-3.5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center h-16 px-6 border-b border-border bg-background/80 backdrop-blur-md">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-md hover:bg-bg-surface transition-colors mr-3"
          >
            <Menu className="size-5" />
          </button>

          <div className="flex-1" />

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Online
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
