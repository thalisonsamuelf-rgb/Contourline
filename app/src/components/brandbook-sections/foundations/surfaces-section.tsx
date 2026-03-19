import { cn } from "@/lib/utils"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"

/* ═══════════════════════════════════════════════════════════════════════════
   SURFACES & BORDERS SECTION — Surface variants, border tokens, radius, glass
   Server component. No interactivity needed.
   ═══════════════════════════════════════════════════════════════════════════ */

const surfaceTokens = [
  {
    token: "--bb-dark",
    value: "#050505",
    description: "Page base. Canvas background.",
    previewBg: "#050505",
  },
  {
    token: "--bb-surface",
    value: "#0F0F11",
    description: "Elevated cards, panels, headers.",
    previewBg: "#0F0F11",
  },
  {
    token: "--bb-surface-alt",
    value: "#1C1E19",
    description: "Secondary elevation. Nested panels.",
    previewBg: "#1C1E19",
  },
  {
    token: "--bb-surface-deep",
    value: "oklch(0.13 0 0)",
    description: "Deep recessed areas. Code blocks.",
    previewBg: "#1f1f1f",
  },
  {
    token: "--bb-surface-overlay",
    value: "rgba(15,15,17,0.92)",
    description: "Transparent overlay on modals.",
    previewBg: "rgba(15,15,17,0.92)",
  },
  {
    token: "--bb-surface-panel",
    value: "oklch(0.15 0.005 280)",
    description: "Sidebar panels, nav drawers.",
    previewBg: "#242428",
  },
  {
    token: "--bb-surface-console",
    value: "oklch(0.11 0.005 280)",
    description: "Terminal/console backgrounds.",
    previewBg: "#1a1a1e",
  },
  {
    token: "--bb-surface-hover-strong",
    value: "oklch(0.22 0.06 283)",
    description: "Strong hover state. Interactive surfaces.",
    previewBg: "#1a1538",
  },
]

const borderTokens = [
  {
    token: "--bb-border",
    value: "rgba(156,156,156,0.15)",
    description: "Default subtle border. Dividers, grids.",
    preview: "rgba(156,156,156,0.15)",
  },
  {
    token: "--bb-border-soft",
    value: "= --bb-border",
    description: "Alias for default. Semantic clarity.",
    preview: "rgba(156,156,156,0.15)",
  },
  {
    token: "--bb-border-strong",
    value: "#3D3D3D",
    description: "High-contrast border. Active sections.",
    preview: "#3D3D3D",
  },
  {
    token: "--bb-border-hover",
    value: "rgba(156,156,156,0.24)",
    description: "Interactive hover state borders.",
    preview: "rgba(156,156,156,0.24)",
  },
  {
    token: "--bb-border-input",
    value: "rgba(156,156,156,0.2)",
    description: "Form input borders.",
    preview: "rgba(156,156,156,0.2)",
  },
]

const glassTokens = [
  { token: "--glass-blur", value: "blur(10px)", description: "Standard glass effect. Nav, modals." },
  { token: "--glass-blur-soft", value: "blur(5px)", description: "Subtle glass. Tooltips, popovers." },
]

const radiusTokens = [
  { token: "--radius", value: "0.5rem (8px)", description: "Default component radius" },
  { token: "--radius-sm", value: "4px", description: "Small elements. Tags, badges" },
  { token: "--radius-md", value: "8px", description: "Buttons, inputs" },
  { token: "--radius-lg", value: "12px", description: "Cards, panels" },
  { token: "--radius-xl", value: "16px", description: "Large containers" },
  { token: "--radius-2xl", value: "24px", description: "Hero elements" },
  { token: "--radius-full", value: "9999px", description: "Avatars, pills" },
]

interface SurfacesSectionProps {
  className?: string
}

export function SurfacesSection({ className }: SurfacesSectionProps) {
  return (
    <section className={cn(className)} style={{ padding: "2rem 0" }}>
      {/* Surface variants */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
          gap: "1px",
          background: "var(--bb-border)",
        }}
      >
        {surfaceTokens.map((s) => (
          <div
            key={s.token}
            style={{
              background: "var(--bb-dark)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                height: 80,
                background: s.previewBg,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-end",
                padding: "0.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.5rem",
                  color: "var(--bb-accent-40)",
                  textTransform: "uppercase",
                }}
              >
                {s.value}
              </span>
            </div>
            <div style={{ padding: "0.75rem 1rem", borderTop: "1px solid var(--bb-border)" }}>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  color: "var(--bb-accent)",
                  marginBottom: "0.2rem",
                }}
              >
                {s.token}
              </div>
              <div style={{ fontSize: "0.55rem", color: "var(--bb-dim)", lineHeight: 1.4 }}>
                {s.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Border tokens */}
      <div style={{ marginTop: "1px" }}>
        <SectionDivider label="Borders" concept="Border semantic tokens" />
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {borderTokens.map((b) => (
            <div
              key={b.token}
              className="grid grid-cols-1 gap-3 sm:grid-cols-[180px_minmax(0,1fr)_40px] sm:items-center"
              style={{
                gap: "1.5rem",
                padding: "1rem 2rem",
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
                {b.token}
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                <span
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.5rem",
                    color: "var(--bb-dim)",
                  }}
                >
                  {b.value}
                </span>
                <span style={{ fontSize: "0.55rem", color: "var(--bb-dim)" }}>
                  {b.description}
                </span>
              </div>
              <div
                style={{
                  height: 2,
                  width: 40,
                  background: b.preview,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Radius */}
      <div style={{ marginTop: "1px" }}>
        <SectionDivider label="Border Radius" concept="Component rounding scale" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
            gap: "1px",
            background: "var(--bb-border)",
          }}
        >
          {radiusTokens.map((r) => (
            <div
              key={r.token}
              style={{
                background: "var(--bb-dark)",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  border: "2px solid var(--bb-accent)",
                  opacity: 0.4,
                  borderRadius:
                    r.token === "--radius-full"
                      ? "9999px"
                      : r.token === "--radius-2xl"
                        ? "24px"
                        : r.token === "--radius-xl"
                          ? "16px"
                          : r.token === "--radius-lg"
                            ? "12px"
                            : r.token === "--radius-md" || r.token === "--radius"
                              ? "8px"
                              : r.token === "--radius-sm"
                                ? "4px"
                                : "0px",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.55rem",
                  color: "var(--bb-accent)",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                {r.token}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.5rem",
                  color: "var(--bb-dim)",
                  textAlign: "center",
                }}
              >
                {r.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Glass effects */}
      <div style={{ marginTop: "1px" }}>
        <SectionDivider label="Glass & Blur" concept="Backdrop-filter tokens" />
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{
            display: "grid",
            gap: "1px",
            background: "var(--bb-border)",
          }}
        >
          {glassTokens.map((g) => (
            <div
              key={g.token}
              style={{
                background: "var(--bb-dark)",
                padding: "1.5rem 2rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  color: "var(--bb-accent)",
                  textTransform: "uppercase",
                  marginBottom: "0.25rem",
                }}
              >
                {g.token}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.5rem",
                  color: "var(--bb-dim)",
                  marginBottom: "0.25rem",
                }}
              >
                {g.value}
              </div>
              <div style={{ fontSize: "0.55rem", color: "var(--bb-dim)" }}>{g.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
