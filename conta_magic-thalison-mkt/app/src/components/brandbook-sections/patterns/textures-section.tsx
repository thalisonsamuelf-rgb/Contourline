import "@/components/brandbook/styles/patterns.css"

const patterns = [
  {
    name: "Scanlines",
    className: "pattern-scanlines",
    description:
      "2px repeating horizontal scanlines at 15% opacity. CRT monitor overlay for retro-tech atmosphere.",
  },
  {
    name: "Scanlines Heavy",
    className: "pattern-scanlines--heavy",
    description:
      "1px tight scanlines at 25% opacity. Heavier CRT effect for dramatic overlays and image treatments.",
  },
  {
    name: "Noise Texture",
    className: "pattern-noise",
    description:
      "SVG fractal noise via ::after pseudo-element at 4% opacity with overlay blend. Adds analog grain to any surface.",
  },
  {
    name: "Data Rain",
    className: "pattern-data-rain",
    description:
      "Vertical 40px column lines with top-bottom neon gradient wash. Matrix-inspired data stream background.",
  },
  {
    name: "Industrial Surface",
    className: "pattern-industrial",
    description:
      "Multi-stop dark gradient with inset highlight and shadow. Brushed metal feel for tool panels and sidebars.",
  },
]

export function TexturesSection() {
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
            style={{
              aspectRatio: "16/10",
              minHeight: 200,
              position: "relative",
              backgroundColor:
                p.className === "pattern-scanlines" ||
                p.className === "pattern-scanlines--heavy"
                  ? "var(--bb-surface)"
                  : undefined,
            }}
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
