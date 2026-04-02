import "@/components/brandbook/styles/patterns.css"

interface HazardPattern {
  name: string
  className: string
  description: string
  isBar?: boolean
}

const patterns: HazardPattern[] = [
  {
    name: "Hazard Stripes",
    className: "pattern-hazard",
    description:
      "Bold 10px repeating diagonal stripes in accent and black. High-visibility warning pattern for critical UI zones.",
  },
  {
    name: "Hazard Thin",
    className: "pattern-hazard--thin",
    description:
      "5px thin stripe variant. Tighter diagonal bands for smaller warning indicators and border accents.",
  },
  {
    name: "Hazard Subtle",
    className: "pattern-hazard--subtle",
    description:
      "15% opacity translucent stripes on black. Background-safe warning texture that does not overpower content.",
  },
  {
    name: "Warning Bar",
    className: "bar-warning",
    description:
      "Solid accent bar with black text and diagonal stripe detail on right edge. Attention-grabbing alert banner.",
    isBar: true,
  },
]

export function HazardSection() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
        gap: "1px",
        background: "var(--bb-border)",
      }}
    >
      {patterns.map((p) => (
        <div key={p.className} style={{ background: "var(--bb-dark)" }}>
          {p.isBar ? (
            <div
              style={{
                aspectRatio: "16/10",
                minHeight: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                background: "var(--bb-surface)",
              }}
            >
              <div className={p.className} style={{ width: "100%" }}>
                WARNING // SYSTEM ACTIVE
              </div>
            </div>
          ) : (
            <div
              className={p.className}
              style={{ aspectRatio: "16/10", minHeight: 200 }}
            />
          )}
          <div
            style={{
              padding: "1rem 1.25rem",
              borderTop: "1px solid var(--bb-border)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-bb-display)",
                fontSize: "0.8rem",
                fontWeight: 800,
                textTransform: "uppercase",
              }}
            >
              {p.name}
            </h2>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                color: "var(--bb-accent)",
              }}
            >
              .{p.className}
            </div>
            <p
              style={{
                fontSize: "0.72rem",
                color: "var(--bb-dim)",
                marginTop: "0.4rem",
              }}
            >
              {p.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
