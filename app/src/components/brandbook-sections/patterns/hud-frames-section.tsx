import "@/components/brandbook/styles/patterns.css"

interface FramePattern {
  name: string
  className: string
  description: string
  isFrame: true
  hasInner?: boolean
}

const patterns: FramePattern[] = [
  {
    name: "Frame Bracket",
    className: "frame-bracket",
    description:
      "Top-left and bottom-right corner brackets in accent. Minimal HUD framing for content panels.",
    isFrame: true,
  },
  {
    name: "Frame Bracket Full",
    className: "frame-bracket--full",
    description:
      "All four corner brackets via ::before/::after plus .frame-bracket__inner pseudo-elements. Full containment frame.",
    isFrame: true,
    hasInner: true,
  },
  {
    name: "Frame Tech",
    className: "frame-tech",
    description:
      "Clipped polygon border with 12px corner cuts. Sci-fi panel frame with accent 1px stroke.",
    isFrame: true,
  },
  {
    name: "Frame Tech Small",
    className: "frame-tech--sm",
    description:
      "8px corner cuts variant. Tighter clip-path for smaller UI elements like badges and tags.",
    isFrame: true,
  },
  {
    name: "Frame Tech Large",
    className: "frame-tech--lg",
    description:
      "20px corner cuts variant. Dramatic angled frame for hero panels and large feature cards.",
    isFrame: true,
  },
  {
    name: "Frame Notch TR",
    className: "frame-notch-tr",
    description:
      "Top-right 16px notch clip-path. Asymmetric cut suggesting a data port or interface slot.",
    isFrame: true,
  },
  {
    name: "Frame Notch BL",
    className: "frame-notch-bl",
    description:
      "Bottom-left 16px notch clip-path. Mirror of TR notch for opposing panel layouts.",
    isFrame: true,
  },
  {
    name: "Frame Notch Both",
    className: "frame-notch-both",
    description:
      "Top-right and bottom-left 16px notches. Diagonal symmetry for balanced technical framing.",
    isFrame: true,
  },
]

export function HudFramesSection() {
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
          {p.hasInner ? (
            <div
              className={p.className}
              style={{
                aspectRatio: "16/10",
                minHeight: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                position: "relative",
              }}
            >
              <div
                className="frame-bracket__inner"
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-bb-mono)",
                    fontSize: "0.7rem",
                    color: "var(--bb-dim)",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  Frame Preview
                </span>
              </div>
            </div>
          ) : (
            <div
              className={p.className}
              style={{
                aspectRatio: "16/10",
                minHeight: 200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                position: "relative",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-bb-mono)",
                  fontSize: "0.7rem",
                  color: "var(--bb-dim)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Frame Preview
              </span>
            </div>
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
