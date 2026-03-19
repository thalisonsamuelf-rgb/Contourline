"use client"

import { FlowDiagram, type FlowNode, type FlowEdge } from "../flow-diagram"

/* ═══════════════════════════════════════════════════════════════════════════
   ORG CHART FLOW — Hierarchical tree (Architecture-style)
   Tests deep multi-level hierarchy with 30+ nodes.
   ═══════════════════════════════════════════════════════════════════════════ */

// Column positions
const c0 = 30,  c1 = 160, c2 = 290, c3 = 420, c4 = 550, c5 = 680, c6 = 810, c7 = 940

const nodes: FlowNode[] = [
  // Level 0 — Top navigation bar (horizontal)
  { id: "signup",       label: "Sign up",         x: c0,  y: 20,  type: "action" },
  { id: "dashboard",    label: "Dashboard",        x: c1,  y: 20,  type: "action" },
  { id: "investors",    label: "Investors",        x: c2,  y: 20,  type: "action" },
  { id: "transactions", label: "Transactions",     x: c3,  y: 20,  type: "action", active: true },
  { id: "referral",     label: "Referral",         x: c4,  y: 20,  type: "action" },
  { id: "exchanges",    label: "Exchanges",        x: c5,  y: 20,  type: "action" },
  { id: "userprofile",  label: "Profile",          x: c6,  y: 20,  type: "action" },
  { id: "team",         label: "Team",             x: c7,  y: 20,  type: "action" },

  // Level 1 — Sub-sections under Transactions
  { id: "invoices",     label: "Invoices",         x: 160,  y: 110, type: "default" },
  { id: "payouts",      label: "Payouts",          x: 370,  y: 110, type: "default" },
  { id: "txsettings",   label: "Settings",         x: 620,  y: 110, type: "default" },

  // Level 2 — Invoice children
  { id: "inv-list",     label: "Invoices List",    x: 60,  y: 190, type: "end" },
  { id: "inv-new",      label: "New Invoice",      x: 210, y: 190, type: "end" },

  // Level 2 — Payout children
  { id: "pay-new",      label: "New Payout",       x: 290, y: 190, type: "end" },
  { id: "pay-list",     label: "Payouts List",     x: 420, y: 190, type: "end" },

  // Level 2 — Analytics (under payouts)
  { id: "analytics",    label: "Analytics",        x: 500, y: 190, type: "default", active: true },

  // Level 2 — Settings children
  { id: "billing-addr", label: "Billing Address",  x: 590, y: 190, type: "end" },
  { id: "billing-meth", label: "Billing Methods",  x: 740, y: 190, type: "end" },

  // Level 3 — Invoice list details
  { id: "inv-pic",      label: "Profile Picture",  x: 10,  y: 280, type: "end" },
  { id: "inv-name",     label: "Investor Name",    x: 10,  y: 320, type: "end" },
  { id: "inv-method",   label: "Payment Method",   x: 10,  y: 360, type: "end" },
  { id: "inv-sent",     label: "Sent Date",        x: 10,  y: 400, type: "end" },
  { id: "inv-due",      label: "Date Due",         x: 10,  y: 440, type: "end" },
  { id: "inv-status",   label: "Status",           x: 10,  y: 480, type: "end" },

  // Level 3 — New invoice details
  { id: "newinv-title", label: "Title",            x: 160, y: 280, type: "end" },
  { id: "newinv-bill",  label: "Billed To",        x: 160, y: 320, type: "end" },
  { id: "newinv-date",  label: "Date Due",         x: 160, y: 360, type: "end" },
  { id: "newinv-items", label: "Items",            x: 160, y: 400, type: "end" },
  { id: "newinv-pdf",   label: "Download PDF",     x: 160, y: 440, type: "end" },
  { id: "newinv-send",  label: "Send",             x: 160, y: 480, type: "end" },

  // Level 3 — Payout details
  { id: "newpay-recip", label: "Recipient",        x: 290, y: 280, type: "end" },
  { id: "newpay-date",  label: "Date Due",         x: 290, y: 320, type: "end" },
  { id: "newpay-bill",  label: "Billing Details",  x: 290, y: 360, type: "end" },
  { id: "newpay-meth",  label: "Payment Method",   x: 290, y: 400, type: "end" },
  { id: "newpay-save",  label: "\"Save\"",         x: 290, y: 440, type: "end" },

  // Level 3 — Analytics sub
  { id: "an-paid",      label: "Already Paid",     x: 440, y: 280, type: "default" },
  { id: "an-need",      label: "Need to Payout",   x: 570, y: 280, type: "default" },
  { id: "an-views",     label: "Views",            x: 440, y: 340, type: "end" },
  { id: "an-pie",       label: "Pie Chart",        x: 440, y: 380, type: "end" },
  { id: "an-line",      label: "Line Chart",       x: 440, y: 420, type: "end" },
  { id: "an-filters",   label: "Filters",          x: 570, y: 340, type: "end" },
  { id: "an-currency",  label: "Currency",         x: 570, y: 380, type: "end" },
  { id: "an-dates",     label: "Dates",            x: 570, y: 420, type: "end" },

  // Level 3 — Billing methods sub
  { id: "bm-setup",     label: "Setup Method",     x: 700, y: 280, type: "end" },
  { id: "bm-wallets",   label: "Avail. Wallets",   x: 850, y: 280, type: "end" },
  { id: "bm-token",     label: "Token Name",       x: 700, y: 340, type: "end" },
  { id: "bm-crypto",    label: "Crypto Address",   x: 700, y: 380, type: "end" },
  { id: "bm-wallet",    label: "Wallet Address",   x: 700, y: 420, type: "end" },
  { id: "bm-save",      label: "\"Save\"",         x: 700, y: 460, type: "end" },
]

const edges: FlowEdge[] = [
  // Transactions → sub-sections
  { from: "transactions", to: "invoices" },
  { from: "transactions", to: "payouts" },
  { from: "transactions", to: "txsettings" },

  // Invoices → children
  { from: "invoices",     to: "inv-list" },
  { from: "invoices",     to: "inv-new" },

  // Payouts → children
  { from: "payouts",      to: "pay-new" },
  { from: "payouts",      to: "pay-list" },
  { from: "payouts",      to: "analytics" },

  // Settings → children
  { from: "txsettings",   to: "billing-addr" },
  { from: "txsettings",   to: "billing-meth" },

  // Invoice list → details
  { from: "inv-list",     to: "inv-pic" },
  { from: "inv-list",     to: "inv-name" },
  { from: "inv-list",     to: "inv-method" },
  { from: "inv-list",     to: "inv-sent" },
  { from: "inv-list",     to: "inv-due" },
  { from: "inv-list",     to: "inv-status" },

  // New invoice → details
  { from: "inv-new",      to: "newinv-title" },
  { from: "inv-new",      to: "newinv-bill" },
  { from: "inv-new",      to: "newinv-date" },
  { from: "inv-new",      to: "newinv-items" },
  { from: "inv-new",      to: "newinv-pdf" },
  { from: "inv-new",      to: "newinv-send" },

  // New payout → details
  { from: "pay-new",      to: "newpay-recip" },
  { from: "pay-new",      to: "newpay-date" },
  { from: "pay-new",      to: "newpay-bill" },
  { from: "pay-new",      to: "newpay-meth" },
  { from: "pay-new",      to: "newpay-save" },

  // Analytics → sub
  { from: "analytics",    to: "an-paid" },
  { from: "analytics",    to: "an-need" },
  { from: "an-paid",      to: "an-views" },
  { from: "an-paid",      to: "an-pie" },
  { from: "an-paid",      to: "an-line" },
  { from: "an-need",      to: "an-filters" },
  { from: "an-need",      to: "an-currency" },
  { from: "an-need",      to: "an-dates" },

  // Billing methods → sub
  { from: "billing-meth", to: "bm-setup" },
  { from: "billing-meth", to: "bm-wallets" },
  { from: "bm-setup",     to: "bm-token" },
  { from: "bm-setup",     to: "bm-crypto" },
  { from: "bm-setup",     to: "bm-wallet" },
  { from: "bm-setup",     to: "bm-save" },
]

export function OrgChartFlow({ className }: { className?: string }) {
  return (
    <FlowDiagram
      nodes={nodes}
      edges={edges}
      canvasWidth={1080}
      canvasHeight={520}
      className={className}
    />
  )
}
