import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"

type ThemeTokens = Record<string, string>

interface Swatch {
  token: string
  usage: string
  value: string
  previewBg: string
  previewColor: string
  previewText?: string
  previewBorder?: string
}

interface BorderToken {
  token: string
  value: string
  usage: string
  preview: string
}

interface ContrastPair {
  label: string
  sample: string
  bg: string
  fg: string
  metaColor: string
}

interface ThemePalette {
  key: "main" | "secondary"
  title: string
  edition: string
  summary: string
  tokens: ThemeTokens
  accentSwatches: Swatch[]
  surfaceSwatches: Swatch[]
  textSwatches: Swatch[]
  neutralSwatches: Swatch[]
  borderTokens: BorderToken[]
  contrastPairs: ContrastPair[]
}

const accentOpacityTokens = [
  "--bb-accent-02",
  "--bb-accent-04",
  "--bb-accent-05",
  "--bb-accent-06",
  "--bb-accent-08",
  "--bb-accent-10",
  "--bb-accent-12",
  "--bb-accent-15",
  "--bb-accent-20",
  "--bb-accent-25",
  "--bb-accent-40",
  "--bb-accent-50",
  "--bb-accent-75",
  "--bb-accent-90",
] as const

const mainTokens: ThemeTokens = {
  "--bb-accent": "#DDD1BB",
  "--bb-dark": "#121213",
  "--bb-canvas": "var(--bb-dark)",
  "--bb-surface": "#151517",
  "--bb-surface-alt": "#1D1D20",
  "--bb-surface-deep": "#060607",
  "--bb-surface-overlay": "rgba(18, 18, 19, 0.94)",
  "--bb-surface-panel": "#18181B",
  "--bb-surface-console": "#222225",
  "--bb-surface-hover-strong": "#28282C",
  "--bb-cream": "#F4F4F4",
  "--bb-cream-alt": "#E8E8E8",
  "--bb-warm-white": "#FFFFFF",
  "--bb-cream-ui": "#FFFFFF",
  "--bb-dim": "rgba(244, 244, 244, 0.52)",
  "--bb-muted": "#DDDDDD",
  "--bb-meta": "#AFAFAF",
  "--bb-muted-legacy": "#919191",
  "--bb-border": "rgba(255, 255, 255, 0.09)",
  "--bb-border-soft": "rgba(255, 255, 255, 0.05)",
  "--bb-border-strong": "rgba(255, 255, 255, 0.15)",
  "--bb-border-hover": "rgba(255, 255, 255, 0.18)",
  "--bb-border-input": "rgba(255, 255, 255, 0.12)",
  "--bb-flare": "#C4B7A2",
  "--bb-blue": "oklch(0.669 0.1837 248.81)",
  "--bb-error": "oklch(0.6368 0.2078 25.33)",
  "--bb-ink": "#0C0C0D",
  "--bb-gray-charcoal": "#313131",
  "--bb-gray-dim": "#484848",
  "--bb-gray-muted": "#6E6E6E",
  "--bb-gray-silver": "#919191",
  "--bb-accent-02": "rgba(221, 209, 187, 0.02)",
  "--bb-accent-04": "rgba(221, 209, 187, 0.04)",
  "--bb-accent-05": "rgba(221, 209, 187, 0.05)",
  "--bb-accent-06": "rgba(221, 209, 187, 0.06)",
  "--bb-accent-08": "rgba(221, 209, 187, 0.08)",
  "--bb-accent-10": "rgba(221, 209, 187, 0.1)",
  "--bb-accent-12": "rgba(221, 209, 187, 0.12)",
  "--bb-accent-15": "rgba(221, 209, 187, 0.15)",
  "--bb-accent-20": "rgba(221, 209, 187, 0.2)",
  "--bb-accent-25": "rgba(221, 209, 187, 0.25)",
  "--bb-accent-40": "rgba(221, 209, 187, 0.4)",
  "--bb-accent-50": "rgba(221, 209, 187, 0.5)",
  "--bb-accent-75": "rgba(221, 209, 187, 0.75)",
  "--bb-accent-90": "rgba(221, 209, 187, 0.9)",
}

const secondaryTokens: ThemeTokens = {
  "--bb-accent": "#BFA37A",
  "--bb-dark": "#121213",
  "--bb-canvas": "var(--bb-dark)",
  "--bb-surface": "#151517",
  "--bb-surface-alt": "#1D1D20",
  "--bb-surface-deep": "#060607",
  "--bb-surface-overlay": "rgba(18, 18, 19, 0.94)",
  "--bb-surface-panel": "#18181B",
  "--bb-surface-console": "#222225",
  "--bb-surface-hover-strong": "#28282C",
  "--bb-cream": "#F4F4F4",
  "--bb-cream-alt": "#E8E8E8",
  "--bb-warm-white": "#FFFFFF",
  "--bb-cream-ui": "#FFFFFF",
  "--bb-dim": "rgba(244, 244, 244, 0.52)",
  "--bb-muted": "#DDDDDD",
  "--bb-meta": "#AFAFAF",
  "--bb-muted-legacy": "#919191",
  "--bb-border": "rgba(255, 255, 255, 0.09)",
  "--bb-border-soft": "rgba(255, 255, 255, 0.05)",
  "--bb-border-strong": "rgba(255, 255, 255, 0.15)",
  "--bb-border-hover": "rgba(255, 255, 255, 0.18)",
  "--bb-border-input": "rgba(255, 255, 255, 0.12)",
  "--bb-flare": "#A78B60",
  "--bb-blue": "oklch(0.669 0.1837 248.81)",
  "--bb-error": "oklch(0.6368 0.2078 25.33)",
  "--bb-ink": "#0C0C0D",
  "--bb-gray-charcoal": "#313131",
  "--bb-gray-dim": "#484848",
  "--bb-gray-muted": "#6E6E6E",
  "--bb-gray-silver": "#919191",
  "--bb-accent-02": "rgba(191, 163, 122, 0.02)",
  "--bb-accent-04": "rgba(191, 163, 122, 0.04)",
  "--bb-accent-05": "rgba(191, 163, 122, 0.05)",
  "--bb-accent-06": "rgba(191, 163, 122, 0.06)",
  "--bb-accent-08": "rgba(191, 163, 122, 0.08)",
  "--bb-accent-10": "rgba(191, 163, 122, 0.1)",
  "--bb-accent-12": "rgba(191, 163, 122, 0.12)",
  "--bb-accent-15": "rgba(191, 163, 122, 0.15)",
  "--bb-accent-20": "rgba(191, 163, 122, 0.2)",
  "--bb-accent-25": "rgba(191, 163, 122, 0.25)",
  "--bb-accent-40": "rgba(191, 163, 122, 0.4)",
  "--bb-accent-50": "rgba(191, 163, 122, 0.5)",
  "--bb-accent-75": "rgba(191, 163, 122, 0.75)",
  "--bb-accent-90": "rgba(191, 163, 122, 0.9)",
}

const mainPalette: ThemePalette = {
  key: "main",
  title: "Gold Theme",
  edition: "Starter Gold Edition",
  summary: "Neutral black foundation with a restrained gold accent. Default edition for the starter.",
  tokens: mainTokens,
  accentSwatches: [
    {
      token: "--bb-accent",
      value: mainTokens["--bb-accent"],
      previewBg: "var(--bb-accent)",
      previewColor: "var(--bb-dark)",
      usage: "Primary gold accent. CTA, active states, emphasis, and warm highlights.",
    },
    {
      token: "--bb-blue",
      value: mainTokens["--bb-blue"],
      previewBg: "var(--bb-blue)",
      previewColor: "var(--bb-warm-white)",
      usage: "Info accent. Secondary feedback and utility cues.",
    },
    {
      token: "--bb-flare",
      value: mainTokens["--bb-flare"],
      previewBg: "var(--bb-flare)",
      previewColor: "var(--bb-warm-white)",
      usage: "Warm support accent. Premium contrast and editorial emphasis.",
    },
    {
      token: "--bb-error",
      value: mainTokens["--bb-error"],
      previewBg: "var(--bb-error)",
      previewColor: "var(--bb-warm-white)",
      usage: "Destructive/error state. Validation and danger cues.",
    },
  ],
  surfaceSwatches: [
    {
      token: "--bb-canvas",
      value: mainTokens["--bb-canvas"],
      previewBg: "var(--bb-canvas)",
      previewColor: "var(--bb-cream)",
      usage: "Document canvas. Main route background.",
    },
    {
      token: "--bb-dark",
      value: mainTokens["--bb-dark"],
      previewBg: "var(--bb-dark)",
      previewColor: "var(--bb-accent)",
      usage: "Dark shell. Hero panels, editorial density, hard contrast.",
    },
    {
      token: "--bb-surface",
      value: mainTokens["--bb-surface"],
      previewBg: "var(--bb-surface)",
      previewColor: "var(--bb-cream)",
      usage: "Primary raised surface. Cards, top bars, shell modules.",
    },
    {
      token: "--bb-surface-alt",
      value: mainTokens["--bb-surface-alt"],
      previewBg: "var(--bb-surface-alt)",
      previewColor: "var(--bb-cream)",
      usage: "Secondary surface. Nested blocks and alternate rows.",
    },
    {
      token: "--bb-surface-panel",
      value: mainTokens["--bb-surface-panel"],
      previewBg: "var(--bb-surface-panel)",
      previewColor: "var(--bb-cream)",
      usage: "Panel shell. Sidebars, drawers, utility layers.",
    },
    {
      token: "--bb-surface-console",
      value: mainTokens["--bb-surface-console"],
      previewBg: "var(--bb-surface-console)",
      previewColor: "var(--bb-accent)",
      usage: "Console/terminal zone. Utility output and mono previews.",
    },
    {
      token: "--bb-surface-hover-strong",
      value: mainTokens["--bb-surface-hover-strong"],
      previewBg: "var(--bb-surface-hover-strong)",
      previewColor: "var(--bb-cream)",
      usage: "Heavy hover state. Controls and selected shells.",
    },
  ],
  textSwatches: [
    {
      token: "--bb-cream",
      value: mainTokens["--bb-cream"],
      previewBg: "var(--bb-dark)",
      previewColor: "var(--bb-cream)",
      usage: "Primary reading color. Headlines and body text.",
    },
    {
      token: "--bb-cream-alt",
      value: mainTokens["--bb-cream-alt"],
      previewBg: "var(--bb-dark)",
      previewColor: "var(--bb-cream-alt)",
      usage: "Soft alternate off-white. UI variants and large fields.",
    },
    {
      token: "--bb-warm-white",
      value: mainTokens["--bb-warm-white"],
      previewBg: "var(--bb-dark)",
      previewColor: "var(--bb-warm-white)",
      usage: "Purest light. Mark/logo and maximum contrast details.",
    },
    {
      token: "--bb-dim",
      value: mainTokens["--bb-dim"],
      previewBg: "var(--bb-dark)",
      previewColor: "var(--bb-dim)",
      usage: "Muted copy. Labels, captions, secondary descriptions.",
    },
    {
      token: "--bb-muted",
      value: mainTokens["--bb-muted"],
      previewBg: "var(--bb-dark)",
      previewColor: "var(--bb-muted)",
      usage: "Neutral light support. Tertiary text and subtle separators.",
    },
    {
      token: "--bb-meta",
      value: mainTokens["--bb-meta"],
      previewBg: "var(--bb-dark)",
      previewColor: "var(--bb-meta)",
      usage: "Metadata color. Counters, supporting UI, technical labels.",
    },
  ],
  neutralSwatches: [
    {
      token: "--bb-gray-charcoal",
      value: mainTokens["--bb-gray-charcoal"],
      previewBg: "var(--bb-gray-charcoal)",
      previewColor: "var(--bb-gray-silver)",
      usage: "Heavy neutral. Utility fills and strong separators.",
    },
    {
      token: "--bb-gray-dim",
      value: mainTokens["--bb-gray-dim"],
      previewBg: "var(--bb-gray-dim)",
      previewColor: "var(--bb-cream)",
      usage: "Mid dark neutral. Placeholder surfaces and utility blocks.",
    },
    {
      token: "--bb-gray-muted",
      value: mainTokens["--bb-gray-muted"],
      previewBg: "var(--bb-gray-muted)",
      previewColor: "var(--bb-dark)",
      usage: "Muted support. Soft chip fills and subdued UI.",
    },
    {
      token: "--bb-gray-silver",
      value: mainTokens["--bb-gray-silver"],
      previewBg: "var(--bb-gray-silver)",
      previewColor: "var(--bb-dark)",
      usage: "Light neutral. Delicate fills and border-led components.",
    },
    {
      token: "--bb-muted-legacy",
      value: mainTokens["--bb-muted-legacy"],
      previewBg: "var(--bb-muted-legacy)",
      previewColor: "var(--bb-warm-white)",
      usage: "Legacy neutral bridge. Compatibility layers and old docs.",
    },
  ],
  borderTokens: [
    {
      token: "--bb-border",
      value: mainTokens["--bb-border"],
      preview: "var(--bb-border)",
      usage: "Default border. Grid, rules, low-noise separation.",
    },
    {
      token: "--bb-border-soft",
      value: mainTokens["--bb-border-soft"],
      preview: "var(--bb-border-soft)",
      usage: "Soft border. Hairline dividers and subtle separators.",
    },
    {
      token: "--bb-border-strong",
      value: mainTokens["--bb-border-strong"],
      preview: "var(--bb-border-strong)",
      usage: "Strong border. Active shell and high-contrast framing.",
    },
    {
      token: "--bb-border-hover",
      value: mainTokens["--bb-border-hover"],
      preview: "var(--bb-border-hover)",
      usage: "Hover border. Interactive feedback for surfaces.",
    },
    {
      token: "--bb-border-input",
      value: mainTokens["--bb-border-input"],
      preview: "var(--bb-border-input)",
      usage: "Form border. Inputs, textareas, data entry zones.",
    },
  ],
  contrastPairs: [
    {
      label: "--bb-accent on --bb-dark",
      sample: "Gold / Dark",
      bg: "var(--bb-dark)",
      fg: "var(--bb-accent)",
      metaColor: "var(--bb-accent-40)",
    },
    {
      label: "--bb-cream on --bb-canvas",
      sample: "Cream / Canvas",
      bg: "var(--bb-canvas)",
      fg: "var(--bb-cream)",
      metaColor: "var(--bb-dim)",
    },
    {
      label: "--bb-dark on --bb-accent",
      sample: "Dark / Gold",
      bg: "var(--bb-accent)",
      fg: "var(--bb-dark)",
      metaColor: "rgba(0, 0, 0, 0.45)",
    },
    {
      label: "--bb-blue on --bb-dark",
      sample: "Blue / Dark",
      bg: "var(--bb-dark)",
      fg: "var(--bb-blue)",
      metaColor: "rgba(0, 153, 255, 0.5)",
    },
  ],
}

const secondaryPalette: ThemePalette = {
  key: "secondary",
  title: "Bronze Theme",
  edition: "Starter Bronze Edition",
  summary: "Secondary edition with a deeper bronze accent. Same shell, warmer emphasis.",
  tokens: secondaryTokens,
  accentSwatches: [
    {
      token: "--bb-accent",
      value: secondaryTokens["--bb-accent"],
      previewBg: "var(--bb-accent)",
      previewColor: "var(--bb-ink)",
      usage: "Primary bronze accent. Premium states, badges, and warmer emphasis.",
    },
    {
      token: "--bb-blue",
      value: secondaryTokens["--bb-blue"],
      previewBg: "var(--bb-blue)",
      previewColor: "var(--bb-warm-white)",
      usage: "Info accent. Preserved for shared system semantics.",
    },
    {
      token: "--bb-flare",
      value: secondaryTokens["--bb-flare"],
      previewBg: "var(--bb-flare)",
      previewColor: "var(--bb-ink)",
      usage: "Warm support accent. Deeper bronze detail for editorial contrast.",
    },
    {
      token: "--bb-error",
      value: secondaryTokens["--bb-error"],
      previewBg: "var(--bb-error)",
      previewColor: "var(--bb-warm-white)",
      usage: "Destructive/error state. Shared semantic warning language.",
    },
  ],
  surfaceSwatches: [
    {
      token: "--bb-canvas",
      value: secondaryTokens["--bb-canvas"],
      previewBg: "var(--bb-canvas)",
      previewColor: "var(--bb-cream)",
      usage: "Document canvas. Neutral black foundation for the edition.",
    },
    {
      token: "--bb-dark",
      value: secondaryTokens["--bb-dark"],
      previewBg: "var(--bb-dark)",
      previewColor: "var(--bb-accent)",
      usage: "Dark shell. Major panels and editorial contrast zones.",
    },
    {
      token: "--bb-surface",
      value: secondaryTokens["--bb-surface"],
      previewBg: "var(--bb-surface)",
      previewColor: "var(--bb-cream)",
      usage: "Primary elevated surface. Cards, nav, foundation blocks.",
    },
    {
      token: "--bb-surface-alt",
      value: secondaryTokens["--bb-surface-alt"],
      previewBg: "var(--bb-surface-alt)",
      previewColor: "var(--bb-cream)",
      usage: "Alternate surface. Nested layers and secondary grouping.",
    },
    {
      token: "--bb-surface-panel",
      value: secondaryTokens["--bb-surface-panel"],
      previewBg: "var(--bb-surface-panel)",
      previewColor: "var(--bb-cream)",
      usage: "Panel shell. Drawers, sidebars, supporting containers.",
    },
    {
      token: "--bb-surface-console",
      value: secondaryTokens["--bb-surface-console"],
      previewBg: "var(--bb-surface-console)",
      previewColor: "var(--bb-accent)",
      usage: "Dark utility console. Dense technical and mono moments.",
    },
    {
      token: "--bb-surface-hover-strong",
      value: secondaryTokens["--bb-surface-hover-strong"],
      previewBg: "var(--bb-surface-hover-strong)",
      previewColor: "var(--bb-cream)",
      usage: "Strong hover/selection shell. Elevated interactivity.",
    },
  ],
  textSwatches: [
    {
      token: "--bb-cream",
      value: secondaryTokens["--bb-cream"],
      previewBg: "var(--bb-dark)",
      previewColor: "var(--bb-cream)",
      usage: "Primary text. Clean neutral reading layer.",
    },
    {
      token: "--bb-cream-alt",
      value: secondaryTokens["--bb-cream-alt"],
      previewBg: "var(--bb-dark)",
      previewColor: "var(--bb-cream-alt)",
      usage: "Alternate light neutral. Secondary fields and tonal variation.",
    },
    {
      token: "--bb-warm-white",
      value: secondaryTokens["--bb-warm-white"],
      previewBg: "var(--bb-dark)",
      previewColor: "var(--bb-warm-white)",
      usage: "Maximum contrast white. Marks and highest-priority detail.",
    },
    {
      token: "--bb-dim",
      value: secondaryTokens["--bb-dim"],
      previewBg: "var(--bb-dark)",
      previewColor: "var(--bb-dim)",
      usage: "Muted copy. Supporting metadata and low-emphasis body.",
    },
    {
      token: "--bb-muted",
      value: secondaryTokens["--bb-muted"],
      previewBg: "var(--bb-dark)",
      previewColor: "var(--bb-muted)",
      usage: "Soft neutral. Utility text and quiet secondary layers.",
    },
    {
      token: "--bb-meta",
      value: secondaryTokens["--bb-meta"],
      previewBg: "var(--bb-dark)",
      previewColor: "var(--bb-meta)",
      usage: "Metadata color. Counters, labels, informational chrome.",
    },
  ],
  neutralSwatches: [
    {
      token: "--bb-gray-charcoal",
      value: secondaryTokens["--bb-gray-charcoal"],
      previewBg: "var(--bb-gray-charcoal)",
      previewColor: "var(--bb-cream)",
      usage: "Dense neutral. Heavy framing and utility surfaces.",
    },
    {
      token: "--bb-gray-dim",
      value: secondaryTokens["--bb-gray-dim"],
      previewBg: "var(--bb-gray-dim)",
      previewColor: "var(--bb-cream)",
      usage: "Mid neutral. Secondary chips, placeholders, subtle blocks.",
    },
    {
      token: "--bb-gray-muted",
      value: secondaryTokens["--bb-gray-muted"],
      previewBg: "var(--bb-gray-muted)",
      previewColor: "var(--bb-ink)",
      usage: "Muted support. Soft UI moments and low-priority contrast.",
    },
    {
      token: "--bb-gray-silver",
      value: secondaryTokens["--bb-gray-silver"],
      previewBg: "var(--bb-gray-silver)",
      previewColor: "var(--bb-ink)",
      usage: "Light neutral. Fine fills and structural detailing.",
    },
    {
      token: "--bb-muted-legacy",
      value: secondaryTokens["--bb-muted-legacy"],
      previewBg: "var(--bb-muted-legacy)",
      previewColor: "var(--bb-warm-white)",
      usage: "Legacy bridge neutral. Compatibility with shared patterns.",
    },
  ],
  borderTokens: [
    {
      token: "--bb-border",
      value: secondaryTokens["--bb-border"],
      preview: "var(--bb-border)",
      usage: "Default border. Neutral separation with no gold tint.",
    },
    {
      token: "--bb-border-soft",
      value: secondaryTokens["--bb-border-soft"],
      preview: "var(--bb-border-soft)",
      usage: "Soft border. Quiet framing and low-noise structure.",
    },
    {
      token: "--bb-border-strong",
      value: secondaryTokens["--bb-border-strong"],
      preview: "var(--bb-border-strong)",
      usage: "High-contrast border. Strong shell framing and active states.",
    },
    {
      token: "--bb-border-hover",
      value: secondaryTokens["--bb-border-hover"],
      preview: "var(--bb-border-hover)",
      usage: "Interactive border. Hover cues without color contamination.",
    },
    {
      token: "--bb-border-input",
      value: secondaryTokens["--bb-border-input"],
      preview: "var(--bb-border-input)",
      usage: "Input border. Neutral form language for the edition.",
    },
  ],
  contrastPairs: [
    {
      label: "--bb-accent on --bb-dark",
      sample: "Bronze / Dark",
      bg: "var(--bb-dark)",
      fg: "var(--bb-accent)",
      metaColor: "var(--bb-accent-40)",
    },
    {
      label: "--bb-cream on --bb-canvas",
      sample: "Cream / Canvas",
      bg: "var(--bb-canvas)",
      fg: "var(--bb-cream)",
      metaColor: "var(--bb-dim)",
    },
    {
      label: "--bb-ink on --bb-accent",
      sample: "Ink / Bronze",
      bg: "var(--bb-accent)",
      fg: "var(--bb-ink)",
      metaColor: "rgba(12, 12, 13, 0.48)",
    },
    {
      label: "--bb-gray-silver on --bb-surface",
      sample: "Silver / Surface",
      bg: "var(--bb-surface)",
      fg: "var(--bb-gray-silver)",
      metaColor: "rgba(145, 145, 145, 0.5)",
    },
  ],
}

const themePalettes = [mainPalette, secondaryPalette]

function themeStyle(tokens: ThemeTokens): CSSProperties {
  return tokens as CSSProperties
}

function SwatchGrid({ swatches }: { swatches: Swatch[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
        gap: "1px",
        background: "var(--bb-border)",
      }}
    >
      {swatches.map((swatch) => (
        <div
          key={swatch.token}
          style={{
            background: "var(--bb-dark)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              minHeight: 96,
              padding: "1rem",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "0.75rem",
              background: swatch.previewBg,
              color: swatch.previewColor,
              border: swatch.previewBorder,
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.55rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            <span>{swatch.previewText ?? "Aa"}</span>
            <span>{swatch.value}</span>
          </div>

          <div style={{ padding: "1rem", borderTop: "1px solid var(--bb-border)" }}>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.58rem",
                color: "var(--bb-accent)",
                marginBottom: "0.25rem",
              }}
            >
              {swatch.token}
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.52rem",
                color: "var(--bb-meta)",
                marginBottom: "0.35rem",
              }}
            >
              {swatch.value}
            </div>
            <div
              style={{
                fontSize: "0.62rem",
                color: "var(--bb-dim)",
                lineHeight: 1.45,
              }}
            >
              {swatch.usage}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function BorderTokenTable({ tokens }: { tokens: BorderToken[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
        gap: "1px",
        background: "var(--bb-border)",
      }}
    >
      {tokens.map((token) => (
        <div
          key={token.token}
          style={{
            background: "var(--bb-dark)",
            padding: "1rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              height: 44,
              display: "flex",
              alignItems: "center",
              background: "var(--bb-surface)",
              padding: "0 0.75rem",
            }}
          >
            <div style={{ width: "100%", height: 1, background: token.preview }} />
          </div>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.58rem",
              color: "var(--bb-accent)",
            }}
          >
            {token.token}
          </div>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.52rem",
              color: "var(--bb-meta)",
            }}
          >
            {token.value}
          </div>
          <div
            style={{
              fontSize: "0.62rem",
              color: "var(--bb-dim)",
              lineHeight: 1.45,
            }}
          >
            {token.usage}
          </div>
        </div>
      ))}
    </div>
  )
}

function AccentOpacityGrid({ tokens }: { tokens: ThemeTokens }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
        gap: "1px",
        background: "var(--bb-border)",
      }}
    >
      {accentOpacityTokens.map((token) => (
        <div
          key={token}
          style={{
            background: "var(--bb-dark)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              minHeight: 84,
              padding: "1rem",
              background: "var(--bb-surface)",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <div
              style={{
                width: "100%",
                height: 44,
                border: "1px solid var(--bb-border)",
                background: tokens[token],
              }}
            />
          </div>
          <div style={{ padding: "0.85rem 1rem", borderTop: "1px solid var(--bb-border)" }}>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.56rem",
                color: "var(--bb-accent)",
                marginBottom: "0.2rem",
              }}
            >
              {token}
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "var(--bb-meta)",
              }}
            >
              {tokens[token]}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function ContrastGrid({ pairs }: { pairs: ContrastPair[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
        gap: "1px",
        background: "var(--bb-border)",
      }}
    >
      {pairs.map((pair) => (
        <div
          key={pair.label}
          style={{
            minHeight: 140,
            padding: "1.4rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: pair.bg,
            color: pair.fg,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-bb-display)",
              fontWeight: 800,
              fontSize: "1.2rem",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
            }}
          >
            {pair.sample}
          </div>
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.54rem",
              color: pair.metaColor,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {pair.label}
          </div>
        </div>
      ))}
    </div>
  )
}

function ThemePaletteBlock({ palette }: { palette: ThemePalette }) {
  return (
    <div style={themeStyle(palette.tokens)}>
      <div
        style={{
          background: "var(--bb-dark)",
          border: "1px solid var(--bb-border)",
        }}
      >
        <div
          className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]"
          style={{ gap: "1px", background: "var(--bb-border)" }}
        >
          <div
            style={{
              background: "var(--bb-dark)",
              padding: "1.75rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.58rem",
                color: "var(--bb-accent)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom: "0.75rem",
              }}
            >
              Theme Edition
            </div>
            <h3
              style={{
                fontFamily: "var(--font-bb-display)",
                fontSize: "clamp(1.4rem, 2vw, 2rem)",
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "-0.03em",
                color: "var(--bb-cream)",
                marginBottom: "0.5rem",
              }}
            >
              {palette.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.56rem",
                color: "var(--bb-meta)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginBottom: "0.9rem",
              }}
            >
              {palette.edition}
            </p>
            <p
              style={{
                fontSize: "0.68rem",
                lineHeight: 1.6,
                color: "var(--bb-dim)",
                maxWidth: "56ch",
              }}
            >
              {palette.summary}
            </p>
          </div>

          <div
            style={{
              background: "var(--bb-surface)",
              padding: "1.75rem",
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "1px",
            }}
          >
            {[
              { label: "Accent", token: "--bb-accent", bg: "var(--bb-accent)", fg: palette.key === "secondary" ? "var(--bb-ink)" : "var(--bb-dark)" },
              { label: "Canvas", token: "--bb-canvas", bg: "var(--bb-canvas)", fg: "var(--bb-cream)" },
              { label: "Surface", token: "--bb-surface", bg: "var(--bb-surface)", fg: "var(--bb-cream)" },
              { label: "Text", token: "--bb-cream", bg: "var(--bb-cream)", fg: "var(--bb-ink)" },
            ].map((chip) => (
              <div
                key={chip.token}
                style={{
                  minHeight: 92,
                  padding: "1rem",
                  background: chip.bg,
                  color: chip.fg,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.52rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    opacity: 0.72,
                  }}
                >
                  {chip.label}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.52rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {chip.token}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "1px" }}>
          <SectionDivider label="Accent & Signals" concept="Primary accent, info, flare, error" />
          <SwatchGrid swatches={palette.accentSwatches} />
        </div>

        <div style={{ marginTop: "1px" }}>
          <SectionDivider label="Surface Stack" concept="Canvas, shells, panels, console" />
          <SwatchGrid swatches={palette.surfaceSwatches} />
        </div>

        <div style={{ marginTop: "1px" }}>
          <SectionDivider label="Text & Reading Layer" concept="Text hierarchy and light neutrals" />
          <SwatchGrid swatches={palette.textSwatches} />
        </div>

        <div style={{ marginTop: "1px" }}>
          <SectionDivider label="Neutral Scale" concept="Gray system and bridge tones" />
          <SwatchGrid swatches={palette.neutralSwatches} />
        </div>

        <div style={{ marginTop: "1px" }}>
          <SectionDivider label="Border System" concept="Neutral separation tokens" />
          <BorderTokenTable tokens={palette.borderTokens} />
        </div>

        <div style={{ marginTop: "1px" }}>
          <SectionDivider label="Accent Opacity Ladder" concept="Theme glow and overlay scale" />
          <AccentOpacityGrid tokens={palette.tokens} />
        </div>

        <div style={{ marginTop: "1px" }}>
          <SectionDivider label="Contrast Pairs" concept="Approved high-contrast combinations" />
          <ContrastGrid pairs={palette.contrastPairs} />
        </div>
      </div>
    </div>
  )
}

interface ColorSectionProps {
  className?: string
}

export function ColorSection({ className }: ColorSectionProps) {
  return (
    <section className={cn(className)} style={{ padding: "2rem 0" }}>
      <div
        style={{
          display: "grid",
          gap: "1px",
          background: "var(--bb-border)",
          marginBottom: "1px",
        }}
      >
        <div
          style={{
            background: "var(--bb-dark)",
            padding: "1.5rem 1.75rem",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.58rem",
              color: "var(--bb-accent)",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "0.65rem",
            }}
          >
            Canonical Color System
          </div>
          <p
            style={{
              maxWidth: "72ch",
              fontSize: "0.68rem",
              lineHeight: 1.65,
              color: "var(--bb-dim)",
            }}
          >
            `foundations` is now the canonical route for color presentation. Both brandbook editions are documented here with complete accent, surface, text, border and contrast systems. `globals.css` remains the runtime source of truth.
          </p>
        </div>
      </div>

      <div className="flex flex-col" style={{ gap: "1.5rem" }}>
        {themePalettes.map((palette) => (
          <ThemePaletteBlock key={palette.key} palette={palette} />
        ))}
      </div>
    </section>
  )
}
