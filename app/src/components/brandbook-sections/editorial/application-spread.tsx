import { cn } from "@/lib/utils"
import { STARTER_RUNTIME_LABELS } from "@/components/brandbook/data/starter-brand-data"
import {
  SpreadSection,
  Page,
  SectionNumber,
  HugeNumber,
} from "./spread-section"

/* ═══════════════════════════════════════════════════════════════════════════
   APPLICATION SPREAD // Terminal mockup + brand touchpoints
   Server component. Dark variant. Left page shows terminal CSS art,
   right page shows brand usage contexts and file formats.
   ═══════════════════════════════════════════════════════════════════════════ */

interface ApplicationSpreadProps {
  className?: string
}

const touchpoints = [
  { icon: ">_", name: "CLI", desc: "Terminal interface" },
  { icon: "DOC", name: "Docs", desc: "Documentation site" },
  { icon: "@", name: "Agent Personas", desc: "AI agent identities" },
  { icon: "[]", name: "Stories", desc: "Dev story templates" },
  { icon: "//", name: "VS Code", desc: "Editor integration" },
  { icon: "##", name: "Dashboard", desc: "Analytics & status" },
  { icon: ">>", name: "Presentations", desc: "Pitch & keynote" },
  { icon: "\u25FB", name: "Social", desc: "Social media assets" },
]

const fileFormats = [
  { ext: "SVG", desc: "Logo assets" },
  { ext: "PNG", desc: "Raster exports" },
  { ext: "MD", desc: "Documentation" },
  { ext: "TSX", desc: "Components" },
  { ext: "CSS", desc: "Design tokens" },
  { ext: "FIG", desc: "Design source" },
  { ext: "PDF", desc: "Print collateral" },
  { ext: "JSON", desc: "Configuration" },
]

export function ApplicationSpread({ className }: ApplicationSpreadProps) {
  return (
    <SpreadSection className={cn(className)} variant="dark">
      {/* LEFT PAGE // Terminal Mockup */}
      <Page side="left" pageNumber={23} variant="dark" sectionName="Application">
        <SectionNumber variant="dark">23. TERMINAL INTERFACE.</SectionNumber>

        {/* Terminal Window */}
        <div
          style={{
            background: "#1E1E1E",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid rgba(244, 244, 232, 0.1)",
          }}
        >
          {/* Title Bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "0.75rem 1rem",
              background: "#2D2D2D",
              gap: "0.5rem",
            }}
          >
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FEBC2E" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--bb-accent)" }} />
            <span
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                color: "rgba(244, 244, 232, 0.4)",
                marginLeft: "0.5rem",
              }}
            >
              Terminal — aiox
            </span>
          </div>

          {/* Terminal Content */}
          <div
            style={{
              padding: "1.25rem",
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.7rem",
              lineHeight: 1.8,
            }}
          >
            {/* aiox init */}
            <div>
              <span style={{ color: "var(--bb-accent)" }}>$ </span>
              <span style={{ color: "var(--bb-cream)" }}>aiox init</span>
            </div>
            <div style={{ color: "rgba(244, 244, 232, 0.4)" }}>
              <span style={{ color: "var(--bb-accent)" }}>{"✓"}</span> {STARTER_RUNTIME_LABELS.workspaceLabel} initialized
            </div>
            <div style={{ height: "0.5rem" }} />

            {/* aiox create-story */}
            <div>
              <span style={{ color: "var(--bb-accent)" }}>$ </span>
              <span style={{ color: "var(--bb-cream)" }}>aiox create-story --epic 3</span>
            </div>
            <div style={{ color: "rgba(244, 244, 232, 0.4)" }}>
              {"  "}<span style={{ color: "var(--bb-accent)" }}>{"→"}</span> Story 3.1 created: <span style={{ color: "var(--bb-accent)" }}>&ldquo;User Authentication Flow&rdquo;</span>
            </div>
            <div style={{ color: "rgba(244, 244, 232, 0.4)" }}>
              {"  "}<span style={{ color: "var(--bb-accent)" }}>{"→"}</span> Status: <span style={{ color: "var(--bb-accent)" }}>Draft</span> {"→"} <span style={{ color: "var(--bb-accent)" }}>Ready</span>
            </div>
            <div style={{ height: "0.5rem" }} />

            {/* aiox dev --mode yolo */}
            <div>
              <span style={{ color: "var(--bb-accent)" }}>$ </span>
              <span style={{ color: "var(--bb-cream)" }}>aiox dev --mode yolo</span>
            </div>
            <div style={{ color: "rgba(244, 244, 232, 0.4)" }}>
              {"  "}<span style={{ color: "var(--bb-accent)" }}>[YOLO]</span> Autonomous mode activated
            </div>
            <div style={{ color: "rgba(244, 244, 232, 0.4)" }}>
              {"  "}<span style={{ color: "var(--bb-accent)" }}>{"✓"}</span> Reading story 3.1...
            </div>
            <div style={{ color: "rgba(244, 244, 232, 0.4)" }}>
              {"  "}<span style={{ color: "var(--bb-accent)" }}>{"✓"}</span> Implementing auth flow...
            </div>
            <div style={{ color: "rgba(244, 244, 232, 0.4)" }}>
              {"  "}<span style={{ color: "var(--bb-accent)" }}>{"✓"}</span> Tests passing (14/14)
            </div>
            <div style={{ color: "rgba(244, 244, 232, 0.4)" }}>
              {"  "}<span style={{ color: "var(--bb-accent)" }}>{"✓"}</span> Story complete {"→"} <span style={{ color: "var(--bb-accent)" }}>InReview</span>
            </div>
            <div style={{ height: "0.5rem" }} />

            {/* aiox qa --gate */}
            <div>
              <span style={{ color: "var(--bb-accent)" }}>$ </span>
              <span style={{ color: "var(--bb-cream)" }}>aiox qa --gate</span>
            </div>
            <div style={{ color: "rgba(244, 244, 232, 0.4)" }}>
              {"  VERDICT: "}<span style={{ color: "var(--bb-accent)" }}>PASS</span>{" "}<span style={{ color: "var(--bb-accent)" }}>{"████████████"}</span>{" 7/7"}
            </div>
          </div>
        </div>
      </Page>

      {/* RIGHT PAGE // Brand Touchpoints + File Formats */}
      <Page side="right" pageNumber={24} variant="dark" sectionName="Application">
        <HugeNumber variant="dark">12</HugeNumber>

        <SectionNumber variant="dark">24. BRAND TOUCHPOINTS.</SectionNumber>

        {/* Brand Usage Contexts */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "rgba(244, 244, 232, 0.06)",
            marginBottom: "2rem",
          }}
        >
          {touchpoints.map((tp) => (
            <div
              key={tp.name}
              style={{
                background: "var(--bb-dark)",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "1rem",
                  marginBottom: "0.5rem",
                  color: "var(--bb-accent)",
                }}
              >
                {tp.icon}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-sans)",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: "var(--bb-cream)",
                  textTransform: "uppercase",
                  marginBottom: "0.15rem",
                }}
              >
                {tp.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.55rem",
                  color: "var(--bb-dim)",
                }}
              >
                {tp.desc}
              </div>
            </div>
          ))}
        </div>

        {/* File Formats */}
        <div>
          <div style={metaLabelStyle}>FILE FORMATS</div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "0.5rem",
            }}
          >
            {fileFormats.map((fmt) => (
              <div
                key={fmt.ext}
                style={{
                  border: "1px solid rgba(244, 244, 232, 0.1)",
                  padding: "0.75rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "var(--bb-accent)",
                    marginBottom: "0.25rem",
                  }}
                >
                  .{fmt.ext.toLowerCase()}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.5rem",
                    color: "var(--bb-dim)",
                  }}
                >
                  {fmt.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Page>
    </SpreadSection>
  )
}

const metaLabelStyle = {
  fontFamily: "var(--font-bb-mono)" as const,
  fontSize: "0.6rem",
  fontWeight: 700,
  color: "var(--bb-dim)" as const,
  textTransform: "uppercase" as const,
  letterSpacing: "0.08em",
  marginBottom: "0.75rem",
}
