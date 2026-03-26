import { cn } from "@/lib/utils"

/* ═══════════════════════════════════════════════════════════════════════════
   SPACING SECTION — Visual spacing scale with token bars
   Server component. No interactivity needed.
   ═══════════════════════════════════════════════════════════════════════════ */

const spacingTokens = [
  { token: "--spacing-xs", value: "0.5rem / 8px", widthPx: 8 },
  { token: "--spacing-sm", value: "1rem / 16px", widthPx: 16 },
  { token: "--spacing-md", value: "2rem / 32px", widthPx: 32 },
  { token: "--spacing-lg", value: "3rem / 48px", widthPx: 48 },
  { token: "--spacing-xl", value: "4rem / 64px", widthPx: 64 },
]

interface SpacingSectionProps {
  className?: string
}

export function SpacingSection({ className }: SpacingSectionProps) {
  return (
    <section className={cn(className)} style={{ padding: "2rem 0" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {spacingTokens.map((row) => (
          <div
            key={row.token}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              padding: "1.25rem 2rem",
              borderBottom: "1px solid var(--bb-border)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                color: "var(--bb-accent)",
                minWidth: 120,
                textTransform: "uppercase",
              }}
            >
              {row.token}
            </span>
            <span
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.55rem",
                color: "var(--bb-dim)",
                minWidth: 60,
              }}
            >
              {row.value}
            </span>
            <div
              style={{
                height: 24,
                width: row.widthPx,
                background: "var(--bb-accent)",
                opacity: 0.3,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
