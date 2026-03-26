"use client"

import { STARTER_RUNTIME_LABELS } from "@/components/brandbook/data/starter-brand-data"
import { FlowDiagram, type FlowNode, type FlowEdge } from "../flow-diagram"

/* ═══════════════════════════════════════════════════════════════════════════
   SITEMAP FLOW — Large hub-spoke sitemap (Credify-style)
   Tests canvas pan/zoom with 20+ nodes spread across a wide area.
   ═══════════════════════════════════════════════════════════════════════════ */

const nodes: FlowNode[] = [
  // Top entry
  { id: "start",      label: "Get Started",     x: 420, y: 20,  type: "start", active: true },
  { id: "login",      label: "Login / Signup",   x: 420, y: 90,  type: "action" },

  // Center hub
  { id: "hub",        label: STARTER_RUNTIME_LABELS.navigationBrand, sublabel: "hub", x: 420, y: 190, type: "default", active: true },

  // Left branch — Home
  { id: "home",       label: "Home",             x: 240, y: 270, type: "action" },
  { id: "score",      label: "Score",            x: 80,  y: 200, type: "end" },
  { id: "analysis",   label: "Analysis",         x: 80,  y: 270, type: "end" },

  // Left branch — Transfer
  { id: "transfer",   label: "Transfer",         x: 240, y: 370, type: "action" },
  { id: "recent",     label: "Recent",           x: 60,  y: 340, type: "end" },
  { id: "contact",    label: "Contact",          x: 60,  y: 400, type: "end" },
  { id: "favourites", label: "Favourites",       x: 60,  y: 460, type: "end" },
  { id: "deposit",    label: "Check Deposit",    x: 240, y: 460, type: "end" },

  // Right branch — Bills
  { id: "bills",      label: "Pay Bills",        x: 600, y: 270, type: "action" },
  { id: "allbills",   label: "All Bills",        x: 780, y: 200, type: "action" },
  { id: "paid",       label: "Paid",             x: 780, y: 270, type: "end" },
  { id: "send",       label: "Send",             x: 780, y: 340, type: "end" },

  // Right branch — Profile
  { id: "profile",    label: "Profile",          x: 600, y: 400, type: "action" },
  { id: "settings",   label: "Settings",         x: 680, y: 480, type: "end" },
  { id: "alerts",     label: "Alerts",           x: 860, y: 480, type: "end" },

  // Bottom
  { id: "dashboard",  label: "Dashboard",        x: 420, y: 310, type: "action" },
  { id: "reports",    label: "Reports",          sublabel: "analytics", x: 420, y: 400, type: "decision" },
  { id: "weekly",     label: "Weekly",           x: 340, y: 490, type: "end" },
  { id: "monthly",    label: "Monthly",          x: 500, y: 490, type: "end" },
]

const edges: FlowEdge[] = [
  // Entry
  { from: "start",     to: "login" },
  { from: "login",     to: "hub" },

  // Hub → branches
  { from: "hub",       to: "home" },
  { from: "hub",       to: "bills" },
  { from: "hub",       to: "dashboard" },

  // Home sub
  { from: "home",      to: "score" },
  { from: "home",      to: "analysis" },

  // Transfer sub
  { from: "hub",       to: "transfer" },
  { from: "transfer",  to: "recent" },
  { from: "transfer",  to: "contact" },
  { from: "transfer",  to: "favourites" },
  { from: "transfer",  to: "deposit" },

  // Bills sub
  { from: "bills",     to: "allbills" },
  { from: "allbills",  to: "paid" },
  { from: "allbills",  to: "send" },

  // Profile sub
  { from: "hub",       to: "profile" },
  { from: "profile",   to: "settings" },
  { from: "settings",  to: "alerts" },

  // Dashboard → reports
  { from: "dashboard", to: "reports" },
  { from: "reports",   to: "weekly",  label: "7d" },
  { from: "reports",   to: "monthly", label: "30d" },
]

export function SitemapFlow({ className }: { className?: string }) {
  return (
    <FlowDiagram
      nodes={nodes}
      edges={edges}
      canvasWidth={980}
      canvasHeight={550}
      className={className}
    />
  )
}
