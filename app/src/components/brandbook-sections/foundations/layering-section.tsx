import { cn } from "@/lib/utils"

/* ═══════════════════════════════════════════════════════════════════════════
   LAYERING SECTION — Z-index scale, breakpoints
   Server component. No interactivity needed.
   ═══════════════════════════════════════════════════════════════════════════ */

const zIndexTokens = [
  { token: "--layer-nav", value: "100", description: "Fixed navigation bars" },
  { token: "--layer-dropdown", value: "200", description: "Dropdowns, tooltips, popovers" },
  { token: "--layer-overlay", value: "300", description: "Backdrop overlays, dimming layers" },
  { token: "--layer-modal", value: "400", description: "Modals, dialogs, drawers" },
  { token: "--layer-toast", value: "500", description: "Toast notifications, snackbars" },
]

const breakpointTokens = [
  { token: "--bp-mobile", value: "767px", description: "Mobile max-width" },
  { token: "--bp-tablet", value: "768px", description: "Tablet min-width" },
  { token: "--bp-desktop", value: "1200px", description: "Desktop min-width" },
]

interface LayeringSectionProps {
  className?: string
}

export function LayeringSection({ className }: LayeringSectionProps) {
  return (
    <section className={cn(className)} style={{ padding: "2rem 0" }}>
      {/* Z-Index Stack visualization */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {zIndexTokens.map((layer, i) => (
          <div
            key={layer.token}
            className="grid grid-cols-1 md:grid-cols-[160px_60px_minmax(0,1fr)]"
            style={{
              display: "grid",
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
                textTransform: "uppercase",
              }}
            >
              {layer.token}
            </span>
            <span
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                color: "var(--bb-cream)",
                textAlign: "right",
              }}
            >
              {layer.value}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              {/* Visual stack bar */}
              <div
                style={{
                  height: 8,
                  width: `${20 + i * 20}%`,
                  background: "var(--bb-accent)",
                  opacity: 0.15 + i * 0.05,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.5rem",
                  color: "var(--bb-dim)",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                }}
              >
                {layer.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Breakpoints */}
      <div style={{ marginTop: "2rem" }}>
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{
            display: "grid",
            gap: "1px",
            background: "var(--bb-border)",
          }}
        >
          {breakpointTokens.map((bp) => (
            <div
              key={bp.token}
              style={{
                background: "var(--bb-dark)",
                padding: "1.5rem 2rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  color: "var(--bb-accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {bp.token}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "1.1rem",
                  color: "var(--bb-cream)",
                  fontWeight: 700,
                }}
              >
                {bp.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.5rem",
                  color: "var(--bb-dim)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {bp.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
