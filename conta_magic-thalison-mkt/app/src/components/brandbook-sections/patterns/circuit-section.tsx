import "@/components/brandbook/styles/patterns.css"

const patterns = [
  {
    name: "Circuit Trace Horizontal",
    className: "pattern-circuit-h",
    description:
      "SVG horizontal circuit path with solder points. Repeats on x-axis at 20px height. Use as a decorative trace divider.",
    isTrace: true,
  },
  {
    name: "Circuit Board",
    className: "pattern-circuit-board",
    description:
      "80px tiling SVG with vertical and horizontal PCB traces plus junction nodes. Full-surface circuit texture.",
    isTrace: false,
  },
]

export function CircuitSection() {
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
          {p.isTrace ? (
            <div
              style={{
                aspectRatio: "16/10",
                minHeight: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--bb-surface)",
              }}
            >
              <div className={p.className} style={{ width: "100%" }} />
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
