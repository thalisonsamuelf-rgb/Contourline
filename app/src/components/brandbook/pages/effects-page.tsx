"use client"

import { BbCompPageTemplate } from "../templates"
import { BbTickerStrip } from "../organisms"
import { BbBadge, BbSpinner } from "../atoms"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"

export function EffectsPage() {
  const chrome = STARTER_PAGE_CHROME.effects

  return (
    <BbCompPageTemplate
      header={{
        ...chrome,
        titlePrefix: "Visual",
        titleHighlight: "Effects",
      }}
      sections={[
        {
          label: "Ticker Strip",
          content: (
            <div style={{ padding: "1.5rem 0" }}>
              <BbTickerStrip items={["Python", "ChatGPT", "AWS", "Zapier", "Docker", "Claude", "NodeJS", "Vercel", "Stripe"]} speed={25} />
            </div>
          ),
        },
        {
          label: "Badge Variants",
          content: (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", padding: "1.5rem" }}>
              <BbBadge variant="accent">Accent</BbBadge>
              <BbBadge variant="blue">Blue</BbBadge>
              <BbBadge variant="error">Error</BbBadge>
              <BbBadge variant="surface">Surface</BbBadge>
              <BbBadge variant="solid">Solid</BbBadge>
            </div>
          ),
        },
        {
          label: "Glow & Pulse",
          content: (
            <div style={{ display: "flex", gap: "2rem", alignItems: "center", padding: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "var(--bb-accent)",
                    boxShadow: "0 0 16px var(--accent-glow, var(--bb-accent-25)), 0 0 48px var(--accent-glow-soft, var(--bb-accent-15))",
                  }}
                />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Neon Glow</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                <BbSpinner size="lg" />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Spin</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    background: "var(--surface)",
                    animation: "bb-pulse 1.5s ease-in-out infinite",
                  }}
                />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.55rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Pulse</span>
              </div>
            </div>
          ),
        },
        {
          label: "Hover Effects",
          content: (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", padding: "1.5rem" }}>
              {["Automation", "Intelligence", "Orchestration", "Integration"].map((label) => (
                <div
                  key={label}
                  style={{
                    padding: "1rem 1.5rem",
                    border: "1px solid var(--border)",
                    background: "var(--surface)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--cream)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = "var(--bb-accent)"
                    el.style.color = "var(--bb-accent)"
                    el.style.boxShadow = "0 0 12px var(--bb-accent-10)"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = "var(--border)"
                    el.style.color = "var(--cream)"
                    el.style.boxShadow = "none"
                  }}
                >
                  {label}
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  )
}
