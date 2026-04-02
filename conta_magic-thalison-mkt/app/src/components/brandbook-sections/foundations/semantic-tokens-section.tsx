import { cn } from "@/lib/utils"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"

/* ═══════════════════════════════════════════════════════════════════════════
   SEMANTIC TOKENS SECTION — Semantic aliases, glow/neon, focus, selection,
   font weights, status colors, shadcn mapping
   Server component. No interactivity needed.
   ═══════════════════════════════════════════════════════════════════════════ */

const semanticBgTokens = [
  { token: "--color-bg-void", value: "#000000", description: "Absolute black. Overlays, blackout." },
  { token: "--color-bg-base", value: "#121213", description: "Page background. Main dark canvas." },
  { token: "--color-bg-surface", value: "#151517", description: "Elevated surface. Cards, panels." },
  { token: "--color-bg-surface-alt", value: "#1D1D20", description: "Secondary surface. Nested cards." },
  { token: "--color-bg-elevated", value: "#151517", description: "Alias for elevated surface." },
  { token: "--color-bg-overlay", value: "rgba(18,18,19,0.94)", description: "Modal backdrop dim." },
]

const semanticTextTokens = [
  { token: "--color-text-base", value: "#F4F4F4", description: "Primary text. Neutral light foreground." },
  { token: "--color-text-secondary", value: "rgba(244,244,244,0.7)", description: "Secondary text. Descriptions." },
  { token: "--color-text-tertiary", value: "rgba(244,244,244,0.55)", description: "Tertiary text. Metadata." },
  { token: "--color-text-muted", value: "rgba(244,244,244,0.52)", description: "Muted text. Dim labels." },
]

const glowTokens = [
  { token: "--neon", value: "#DDD1BB", description: "Legacy glow alias. Maps to the starter accent." },
  { token: "--neon-dim", value: "rgba(221,209,187,0.15)", description: "Subtle accent tint. Backgrounds." },
  { token: "--neon-glow", value: "rgba(221,209,187,0.4)", description: "Strong glow. Active focus." },
  { token: "--accent-glow", value: "rgba(221,209,187,0.25)", description: "Accent glow for CTAs and highlights." },
  { token: "--accent-glow-soft", value: "rgba(221,209,187,0.1)", description: "Soft accent glow. Hover states." },
]

const stateTokens = [
  { token: "--focus-brand", value: "#DDD1BB", description: "Focus ring on brand elements.", previewBg: "#DDD1BB" },
  { token: "--focus-neutral", value: "#919191", description: "Focus ring on neutral elements.", previewBg: "#919191" },
  { token: "--selection-bg", value: "#121213", description: "Text selection background.", previewBg: "#121213" },
  { token: "--selection-fg", value: "#DDD1BB", description: "Text selection foreground.", previewBg: "#DDD1BB" },
  { token: "--warning-bg", value: "rgba(245,158,11,0.05)", description: "Warning state background.", previewBg: "rgba(245,158,11,0.15)" },
  { token: "--warning-border", value: "rgba(245,158,11,0.2)", description: "Warning state border.", previewBg: "rgba(245,158,11,0.4)" },
]

const fontWeightTokens = [
  { token: "--font-weight-thin", value: "300", sample: "Thin" },
  { token: "--font-weight-regular", value: "400", sample: "Regular" },
  { token: "--font-weight-medium", value: "500", sample: "Medium" },
  { token: "--font-weight-semibold", value: "600", sample: "Semibold" },
  { token: "--font-weight-bold", value: "700", sample: "Bold" },
  { token: "--font-weight-extrabold", value: "800", sample: "Extrabold" },
  { token: "--font-weight-black", value: "900", sample: "Black" },
]

const shadcnMapping = [
  { shadcn: "--background", mapsTo: "--bb-dark", value: "#121213" },
  { shadcn: "--foreground", mapsTo: "--bb-cream", value: "#F4F4F4" },
  { shadcn: "--card / --popover", mapsTo: "--bb-surface", value: "#151517" },
  { shadcn: "--primary", mapsTo: "--bb-accent", value: "#DDD1BB" },
  { shadcn: "--primary-foreground", mapsTo: "--bb-dark", value: "#121213" },
  { shadcn: "--accent", mapsTo: "--bb-accent", value: "#DDD1BB" },
  { shadcn: "--accent-foreground", mapsTo: "--bb-dark", value: "#121213" },
  { shadcn: "--muted", mapsTo: "--bb-gray-charcoal", value: "#313131" },
  { shadcn: "--muted-foreground", mapsTo: "--bb-gray-dim", value: "#484848" },
  { shadcn: "--destructive", mapsTo: "--bb-error", value: "#EF4444" },
  { shadcn: "--ring", mapsTo: "--bb-accent", value: "#DDD1BB" },
  { shadcn: "--radius", mapsTo: "—", value: "0.5rem" },
]

interface SemanticTokensSectionProps {
  className?: string
}

export function SemanticTokensSection({ className }: SemanticTokensSectionProps) {
  return (
    <section className={cn(className)} style={{ padding: "2rem 0" }}>
      {/* Semantic Backgrounds */}
      <TokenTable title="Semantic Backgrounds" tokens={semanticBgTokens} />

      {/* Semantic Text */}
      <div style={{ marginTop: "1px" }}>
        <SectionDivider label="Semantic Text" concept="Text color aliases" />
        <TokenTable tokens={semanticTextTokens} />
      </div>

      {/* Glow / Neon */}
      <div style={{ marginTop: "1px" }}>
        <SectionDivider label="Glow & Neon" concept="Brand luminance tokens" />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            display: "grid",
            gap: "1px",
            background: "var(--bb-border)",
          }}
        >
          {glowTokens.map((g) => (
            <div
              key={g.token}
              style={{ background: "var(--bb-dark)", padding: "1.25rem" }}
            >
              <div
                style={{
                  width: "100%",
                  height: 32,
                  background: g.value,
                  marginBottom: "0.75rem",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  color: "var(--bb-accent)",
                  textTransform: "uppercase",
                  marginBottom: "0.15rem",
                }}
              >
                {g.token}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.5rem",
                  color: "var(--bb-dim)",
                  marginBottom: "0.15rem",
                }}
              >
                {g.value}
              </div>
              <div style={{ fontSize: "0.5rem", color: "var(--bb-dim)" }}>{g.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Focus / Selection / Warning */}
      <div style={{ marginTop: "1px" }}>
        <SectionDivider label="Interactive States" concept="Focus, selection, warning" />
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            display: "grid",
            gap: "1px",
            background: "var(--bb-border)",
          }}
        >
          {stateTokens.map((s) => (
            <div
              key={s.token}
              style={{ background: "var(--bb-dark)", padding: "1.25rem" }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  background: s.previewBg,
                  marginBottom: "0.75rem",
                  border: "1px solid var(--bb-border)",
                }}
              />
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  color: "var(--bb-accent)",
                  textTransform: "uppercase",
                  marginBottom: "0.15rem",
                }}
              >
                {s.token}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.5rem",
                  color: "var(--bb-dim)",
                  marginBottom: "0.15rem",
                }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "0.5rem", color: "var(--bb-dim)" }}>{s.description}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Weights */}
      <div style={{ marginTop: "1px" }}>
        <SectionDivider label="Font Weights" concept="Weight scale tokens" />
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {fontWeightTokens.map((fw) => (
            <div
              key={fw.token}
              className="grid grid-cols-1 md:grid-cols-[200px_50px_minmax(0,1fr)]"
              style={{
                display: "grid",
                alignItems: "center",
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
                {fw.token}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  color: "var(--bb-dim)",
                  textAlign: "right",
                }}
              >
                {fw.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontSize: "1.1rem",
                  fontWeight: Number(fw.value),
                  color: "var(--bb-cream)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {fw.sample}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* shadcn/ui Mapping */}
      <div style={{ marginTop: "1px" }}>
        <SectionDivider label="shadcn/ui Mapping" concept="Component library token bridge" />
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <div
            className="grid grid-cols-1 md:grid-cols-[180px_180px_minmax(0,1fr)]"
            style={{
              display: "grid",
              gap: "1.5rem",
              padding: "0.75rem 2rem",
              borderBottom: "1px solid var(--bb-accent)",
              opacity: 0.6,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "var(--bb-accent)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              shadcn token
            </span>
            <span
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "var(--bb-accent)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              maps to
            </span>
            <span
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "var(--bb-accent)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              resolved value
            </span>
          </div>
          {shadcnMapping.map((row) => (
            <div
              key={row.shadcn}
              className="grid grid-cols-1 md:grid-cols-[180px_180px_minmax(0,1fr)]"
              style={{
                display: "grid",
                alignItems: "center",
                gap: "1.5rem",
                padding: "0.75rem 2rem",
                borderBottom: "1px solid var(--bb-border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.6rem",
                  color: "var(--bb-cream)",
                }}
              >
                {row.shadcn}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.55rem",
                  color: "var(--bb-dim)",
                }}
              >
                {row.mapsTo}
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div
                  style={{
                    width: 16,
                    height: 16,
                    background: row.value,
                    border: "1px solid var(--bb-border)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.55rem",
                    color: "var(--bb-dim)",
                  }}
                >
                  {row.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Helper ─────────────────────────────────────────────────────────────── */

function TokenTable({
  title,
  tokens,
}: {
  title?: string
  tokens: { token: string; value: string; description: string }[]
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {title && (
        <span
          style={{
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.58rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--bb-dim)",
            padding: "0.7rem 2rem",
            borderBottom: "1px solid var(--bb-border)",
          }}
        >
          {title}
        </span>
      )}
      {tokens.map((t) => (
        <div
          key={t.token}
          className="grid grid-cols-1 md:grid-cols-[200px_200px_minmax(0,1fr)]"
          style={{
            display: "grid",
            alignItems: "center",
            gap: "1.5rem",
            padding: "0.85rem 2rem",
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
            {t.token}
          </span>
          <span
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.5rem",
              color: "var(--bb-dim)",
            }}
          >
            {t.value}
          </span>
          <span style={{ fontSize: "0.55rem", color: "var(--bb-dim)" }}>{t.description}</span>
        </div>
      ))}
    </div>
  )
}
