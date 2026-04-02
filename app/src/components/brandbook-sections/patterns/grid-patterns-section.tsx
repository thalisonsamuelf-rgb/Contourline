import "@/components/brandbook/styles/patterns.css"

const patterns = [
  {
    name: "Dot Grid",
    className: "pattern-dot-grid",
    description:
      "16px spaced accent dots on dark surface. Default density for backgrounds and empty states.",
  },
  {
    name: "Dot Grid Dense",
    className: "pattern-dot-grid--dense",
    description:
      "8px spaced dots, tighter weave. Use for small panels or thumbnail backgrounds where detail matters.",
  },
  {
    name: "Dot Grid Sparse",
    className: "pattern-dot-grid--sparse",
    description:
      "32px spacing with larger dots. Subtle backdrop for hero sections and large content areas.",
  },
  {
    name: "Crosshair Grid",
    className: "pattern-crosshair-grid",
    description:
      "80px grid lines with centered crosshair dots. Technical blueprint feel for header and footer sections.",
  },
  {
    name: "Crosshair Grid Tight",
    className: "pattern-crosshair-grid--tight",
    description:
      "40px tight grid variant. Higher density crosshair pattern for smaller panels and technical overlays.",
  },
  {
    name: "Wireframe Perspective",
    className: "pattern-wireframe-perspective",
    description:
      "60px wireframe grid with radial glow center. Creates depth illusion for 3D-feel backgrounds.",
  },
  {
    name: "Symbol Grid",
    className: "pattern-symbol-grid",
    description:
      "32px SVG X-marks repeating tile. Adds branded texture with subtle accent cross symbols.",
  },
  {
    name: "Plus Grid",
    className: "pattern-plus-grid",
    description:
      "32px SVG plus-sign repeating tile. Minimal technical grid using additive cross markers.",
  },
]

export function GridPatternsSection() {
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
          <div
            className={p.className}
            style={{ aspectRatio: "16/10", minHeight: 200 }}
          />
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
