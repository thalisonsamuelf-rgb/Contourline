"use client"

import { useState } from "react"
import { BbCompPageTemplate } from "../templates"
import { BbCompGrid } from "../organisms"
import { BbCompCell, BbBreadcrumb, BbPagination } from "../molecules"
import { BbSearchModal, BbTabs } from "../organisms"
import { BbButton } from "../atoms"
import {
  STARTER_PAGE_CHROME,
  STARTER_RUNTIME_LABELS,
} from "@/components/brandbook/data/starter-brand-data"

const sampleSearchItems = [
  { label: "Dashboard", description: "Main overview panel", category: "Pages", href: "#" },
  { label: "Settings", description: "App configuration", category: "Pages", href: "#" },
  { label: "Users", description: "Manage team members", category: "Pages", href: "#" },
  { label: "Analytics", description: "View metrics and data", category: "Tools", href: "#" },
  { label: "API Keys", description: "Manage integrations", category: "Tools", href: "#" },
  { label: "Export Data", description: "Download as CSV", category: "Actions" },
  { label: "Import Data", description: "Upload from file", category: "Actions" },
  { label: "Notifications", description: "Notification preferences", category: "Pages", href: "#" },
]

const sidebarItems = [
  { icon: "⊞", label: "Dashboard", active: true },
  { icon: "⊟", label: "Biblioteca" },
  { icon: "◈", label: "Produtos" },
  { icon: "⊕", label: "Leads", badge: 12 },
  { icon: "◉", label: "Alunos" },
  { icon: "▢", label: "Repositório" },
  { icon: "⊜", label: "Mentores" },
  { icon: "⊙", label: "Relatórios" },
]

const bottomBarItems = [
  { icon: "⌂", label: "Home" },
  { icon: "♡", label: "Likes", badge: 12 },
  { icon: "☰", label: "Menu", active: true },
  { icon: "⚑", label: "Saved" },
  { icon: "⚙", label: "Config" },
]

/* ── Reusable sidebar mockup ── */
function SidebarMockup({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: collapsed ? 56 : 200,
        background: "rgba(255,255,255,0.02)",
        border: "1px solid var(--border)",
        transition: "width 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
        overflow: "hidden",
        height: 360,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          padding: collapsed ? "0.75rem" : "0.75rem 1rem",
          borderBottom: "1px solid var(--border)",
          gap: "0.5rem",
        }}
      >
        <span style={{ color: "var(--bb-accent)", fontSize: "0.75rem", flexShrink: 0 }}>◆</span>
        {!collapsed && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.5625rem",
              fontWeight: 700,
              color: "var(--bb-accent)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
            }}
          >
            {STARTER_RUNTIME_LABELS.navigationBrand}
          </span>
        )}
      </div>

      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 1, padding: "0.375rem" }}>
        {sidebarItems.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: collapsed ? "0.5rem 0" : "0.5rem 0.625rem",
              justifyContent: collapsed ? "center" : "flex-start",
              background: item.active ? "var(--bb-accent-08)" : "transparent",
              borderLeft: item.active ? "2px solid var(--bb-accent)" : "2px solid transparent",
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                color: item.active ? "var(--bb-accent)" : "var(--dim)",
                background: item.active ? "var(--bb-accent-10)" : "rgba(255,255,255,0.03)",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: item.active ? "rgba(221, 209, 187,0.2)" : "var(--border)",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </span>
            {!collapsed && (
              <>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.5625rem",
                    color: item.active ? "var(--cream)" : "var(--dim)",
                    fontWeight: item.active ? 600 : 400,
                    whiteSpace: "nowrap",
                    flex: 1,
                  }}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <span
                    style={{
                      background: "var(--bb-accent)",
                      color: "#050505",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.4375rem",
                      fontWeight: 700,
                      padding: "0.0625rem 0.3125rem",
                      minWidth: 16,
                      textAlign: "center",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "auto",
          padding: "0.5rem",
          borderTop: "1px solid var(--border)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.4375rem",
            color: "var(--dim)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {collapsed ? "v1.0" : STARTER_RUNTIME_LABELS.navigationFooter}
        </span>
      </div>
    </div>
  )
}

/* ── Bottom bar mockup ── */
function BottomBarMockup() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: 320,
      }}
    >
      <div
        style={{
          height: 120,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "0.4375rem",
          color: "var(--dim)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        Content Area
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          borderTop: "1px solid var(--border)",
          padding: "0.5rem 0",
          background: "rgba(0,0,0,0.3)",
        }}
      >
        {bottomBarItems.map((item) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.1875rem",
              position: "relative",
            }}
          >
            <span style={{ fontSize: "0.875rem", color: item.active ? "var(--bb-accent)" : "var(--dim)", position: "relative" }}>
              {item.icon}
              {item.badge && (
                <span
                  style={{
                    position: "absolute",
                    top: -3,
                    right: -8,
                    background: "#FF3B5C",
                    color: "#fff",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.375rem",
                    fontWeight: 700,
                    padding: "0 0.1875rem",
                    minWidth: 12,
                    height: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.375rem",
                color: item.active ? "var(--bb-accent)" : "var(--dim)",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              {item.label}
            </span>
            {item.active && (
              <div
                style={{
                  position: "absolute",
                  top: -8,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 14,
                  height: 2,
                  background: "var(--bb-accent)",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export function NavigationPage() {
  const chrome = STARTER_PAGE_CHROME.navigation
  const [searchOpen, setSearchOpen] = useState(false)
  const [page, setPage] = useState(3)
  const [smoothPage, setSmoothPage] = useState(7)

  return (
    <>
      <BbCompPageTemplate
        header={{
          ...chrome,
          titlePrefix: "Navigation",
          titleHighlight: "Library",
        }}
        sections={[
          /* ── Search Modal ── */
          {
            label: "Search Modal",
            content: (
              <BbCompGrid columns={2}>
                <BbCompCell
                  name="Cmd+K Trigger"
                  preview={
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
                      <BbButton onClick={() => setSearchOpen(true)}>Open Search</BbButton>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", color: "var(--dim)", textTransform: "uppercase" }}>
                        ou pressione ⌘K
                      </span>
                    </div>
                  }
                />
                <BbCompCell
                  name="Props"
                  preview={
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--dim)", display: "flex", flexDirection: "column", gap: "0.1875rem", textAlign: "left", width: "100%" }}>
                      <span style={{ color: "var(--bb-accent)", fontWeight: 700, fontSize: "0.5625rem" }}>BbSearchModal</span>
                      <span>open: boolean</span>
                      <span>onOpenChange: (open) =&gt; void</span>
                      <span>items: BbSearchItem[]</span>
                      <span>placeholder?: string</span>
                      <span>emptyMessage?: string</span>
                    </div>
                  }
                />
              </BbCompGrid>
            ),
          },

          /* ── Pagination ── */
          {
            label: "Pagination",
            content: (
              <BbCompGrid columns={2}>
                <BbCompCell
                  name="Few Pages (5)"
                  preview={<BbPagination page={page} totalPages={5} onPageChange={setPage} />}
                />
                <BbCompCell
                  name="Many Pages (20)"
                  preview={<BbPagination page={smoothPage} totalPages={20} onPageChange={setSmoothPage} />}
                />
                <BbCompCell
                  name="First Page (prev disabled)"
                  preview={<BbPagination page={1} totalPages={10} onPageChange={() => {}} />}
                />
                <BbCompCell
                  name="Single Page (hidden)"
                  preview={
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
                      <BbPagination page={1} totalPages={1} onPageChange={() => {}} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", color: "var(--dim)", fontStyle: "italic" }}>
                        Returns null when totalPages ≤ 1
                      </span>
                    </div>
                  }
                />
              </BbCompGrid>
            ),
          },

          /* ── Breadcrumb ── */
          {
            label: "Breadcrumb",
            content: (
              <BbCompGrid columns={1}>
                <BbCompCell
                  name="Default (3 items)"
                  preview={
                    <BbBreadcrumb items={[{ label: "Home", href: "#" }, { label: "Dashboard", href: "#" }, { label: "Settings" }]} />
                  }
                />
                <BbCompCell
                  name="Deep Nesting (5 items)"
                  preview={
                    <BbBreadcrumb items={[{ label: "Home", href: "#" }, { label: "Products", href: "#" }, { label: "Category", href: "#" }, { label: "Subcategory", href: "#" }, { label: "Item Detail" }]} />
                  }
                />
                <BbCompCell
                  name="Truncation (maxLabelLength=20)"
                  preview={
                    <BbBreadcrumb
                      items={[{ label: "Home", href: "#" }, { label: "Very Long Category Name That Overflows", href: "#" }, { label: "Current Page Title Is Also Quite Long" }]}
                      maxLabelLength={20}
                    />
                  }
                />
              </BbCompGrid>
            ),
          },

          /* ── Tabs ── */
          {
            label: "Tabs",
            content: (
              <BbCompGrid columns={1}>
                <BbCompCell
                  name='variant="default" (backward compatible)'
                  preview={
                    <div style={{ width: "100%" }}>
                      <BbTabs
                        tabs={[
                          { label: "Overview", content: "Overview content — the original BbTabs behavior." },
                          { label: "Tokens", content: "Design tokens documentation." },
                          { label: "Usage", content: "Usage guidelines and examples." },
                        ]}
                      />
                    </div>
                  }
                />
                <BbCompCell
                  name='variant="smooth" (animated indicator)'
                  preview={
                    <div style={{ width: "100%" }}>
                      <BbTabs
                        variant="smooth"
                        tabs={[
                          { label: "Overview", content: "Smooth sliding underline animation on tab switch." },
                          { label: "Metrics", content: "Metrics tab with animated indicator." },
                          { label: "Config", content: "Configuration panel content." },
                          { label: "Logs", content: "System logs and activity." },
                        ]}
                      />
                    </div>
                  }
                />
              </BbCompGrid>
            ),
          },

          /* ── Sidebar ── */
          {
            label: "Sidebar",
            content: (
              <BbCompGrid columns={2}>
                <BbCompCell
                  name="Expanded (240px)"
                  preview={<SidebarMockup collapsed={false} />}
                />
                <BbCompCell
                  name="Collapsed (icon-only)"
                  preview={<SidebarMockup collapsed />}
                />
              </BbCompGrid>
            ),
          },

          /* ── Bottom Bar ── */
          {
            label: "Bottom Bar",
            content: (
              <BbCompGrid columns={2}>
                <BbCompCell
                  name="Mobile Tab Bar"
                  preview={<BottomBarMockup />}
                />
                <BbCompCell
                  name="Patterns Reference"
                  preview={
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem", width: "100%", textAlign: "left" }}>
                      {[
                        { pattern: "Sidebar", status: "DS" },
                        { pattern: "Bottom Bar", status: "DS" },
                        { pattern: "Cmd+K Modal", status: "DS" },
                        { pattern: "Breadcrumb", status: "DS" },
                        { pattern: "Pagination", status: "DS" },
                        { pattern: "Tabs", status: "DS" },
                        { pattern: "Settings Panel", status: "PLANNED" },
                        { pattern: "Stepper", status: "DS" },
                      ].map((p) => (
                        <div key={p.pattern} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.5rem", color: "var(--cream)" }}>{p.pattern}</span>
                          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.4375rem", color: p.status === "DS" ? "var(--bb-accent)" : "var(--dim)", fontWeight: 700 }}>{p.status}</span>
                        </div>
                      ))}
                    </div>
                  }
                />
              </BbCompGrid>
            ),
          },
        ]}
      />

      {/* Search modal (rendered outside template) */}
      <BbSearchModal
        open={searchOpen}
        onOpenChange={setSearchOpen}
        items={sampleSearchItems}
        placeholder="Search pages, tools, actions…"
      />
    </>
  )
}
