import "@/components/brandbook/styles/patterns.css"

const patterns = [
  {
    name: "Tech Divider",
    className: "divider-tech",
    description:
      "Centered gradient line fading from transparent to accent from both edges. Clean section separator with tech glow.",
  },
  {
    name: "Arrow Divider",
    className: "divider-arrow",
    description:
      "Left-extending line with right-facing arrow triangle. Directional separator indicating flow or progression.",
  },
  {
    name: "Dashed Divider",
    className: "divider-dashed",
    description:
      "Repeating 8px accent dashes at 50% opacity. Lightweight separator for secondary content breaks.",
  },
  {
    name: "Double Divider",
    className: "divider-double",
    description:
      "Two parallel gradient lines 5px apart, fading from transparent to accent. Emphatic section break for major transitions.",
  },
]

export function DividersSection() {
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
            <div className={p.className} style={{ width: "100%" }} />
          </div>
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
