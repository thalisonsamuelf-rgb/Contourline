import { cn } from "@/lib/utils"

/* ═══════════════════════════════════════════════════════════════════════════
   MOTION TOKENS SECTION — Easing curves + duration tokens
   Server component. Static visual representation (no interactive animation).
   ═══════════════════════════════════════════════════════════════════════════ */

const easingCurves = [
  {
    token: "--bb-ease-spring",
    value: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    description: "Bouncy overshoot. Modals, popovers, entrances.",
  },
  {
    token: "--bb-ease-smooth",
    value: "cubic-bezier(0.25, 0.1, 0.25, 1)",
    description: "Natural default. General transitions.",
  },
  {
    token: "--bb-ease-decel",
    value: "cubic-bezier(0, 0, 0.2, 1)",
    description: "Soft landing. Elements entering view.",
  },
  {
    token: "--bb-ease-accel",
    value: "cubic-bezier(0.4, 0, 1, 1)",
    description: "Quick start. Elements leaving view.",
  },
]

const durationTokens = [
  { token: "--bb-dur-fast", value: "0.2s", widthPercent: 20 },
  { token: "--bb-dur-medium", value: "0.4s", widthPercent: 50 },
  { token: "--bb-dur-slow", value: "0.7s", widthPercent: 85 },
]

interface MotionTokensSectionProps {
  className?: string
}

export function MotionTokensSection({ className }: MotionTokensSectionProps) {
  return (
    <section className={cn(className)} style={{ padding: "2rem 0" }}>
      {/* Easing Curves */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1px",
          background: "var(--bb-border)",
        }}
      >
        {easingCurves.map((curve) => (
          <div
            key={curve.token}
            style={{
              background: "var(--bb-dark)",
              padding: "1.5rem 2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                color: "var(--bb-accent)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              {curve.token}
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "var(--bb-dim)",
              }}
            >
              {curve.value}
            </div>
            {/* Static track with diamond marker */}
            <div
              style={{
                width: "100%",
                height: 2,
                background: "var(--bb-border)",
                position: "relative",
                margin: "0.5rem 0",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -5,
                  left: 0,
                  width: 12,
                  height: 12,
                  background: "var(--bb-accent)",
                  transform: "rotate(45deg)",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "var(--bb-dim)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {curve.description}
            </div>
          </div>
        ))}
      </div>

      {/* Duration Tokens */}
      <div style={{ marginTop: "1px", display: "flex", flexDirection: "column", gap: 0 }}>
        {durationTokens.map((dur) => (
          <div
            key={dur.token}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              padding: "1.25rem 2rem",
              borderBottom: "1px solid var(--bb-border)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.6rem",
                color: "var(--bb-accent)",
                minWidth: 160,
                textTransform: "uppercase",
              }}
            >
              {dur.token}
            </span>
            <span
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.55rem",
                color: "var(--bb-dim)",
                minWidth: 40,
              }}
            >
              {dur.value}
            </span>
            <div
              style={{
                flex: 1,
                height: 2,
                background: "var(--bb-border)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -1,
                  left: 0,
                  height: 4,
                  background: "var(--bb-accent)",
                  opacity: 0.4,
                  width: `${dur.widthPercent}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
