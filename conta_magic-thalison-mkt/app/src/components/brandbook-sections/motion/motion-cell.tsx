"use client"

import { useState, type ReactNode } from "react"

interface MotionCellProps {
  title: string
  tag: string
  description: string
  children: ReactNode
}

export function MotionCell({
  title,
  tag,
  description,
  children,
}: MotionCellProps) {
  const [replayKey, setReplayKey] = useState(0)

  return (
    <div
      onClick={() => setReplayKey((k) => k + 1)}
      style={{
        background: "var(--bb-dark)",
        cursor: "pointer",
        minHeight: 440,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Stage area -- animation lives here, remounted on replayKey change */}
      <div
        key={replayKey}
        style={{
          flex: 1,
          aspectRatio: "16/10",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background: "var(--bb-surface)",
          backgroundImage:
            "linear-gradient(to right, rgba(245,244,231,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,244,231,0.04) 1px, transparent 1px)",
          backgroundSize: "2vw 2vw",
        }}
      >
        {children}

        {/* Replay hint */}
        <span
          style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.55rem",
            color: "var(--bb-dim)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            opacity: 0,
            transition: "opacity 0.3s",
            pointerEvents: "none",
          }}
          className="motion-cell-hint"
        >
          click to replay
        </span>
      </div>

      {/* Info footer */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderTop: "1px solid var(--bb-border)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-bb-display)",
            fontSize: "0.85rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
            color: "var(--bb-cream)",
            margin: 0,
            marginBottom: "0.25rem",
          }}
        >
          {title}
        </h2>
        <span
          style={{
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.6rem",
            color: "var(--bb-accent)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          {tag}
        </span>
        <p
          style={{
            fontSize: "0.72rem",
            color: "var(--bb-dim)",
            marginTop: "0.4rem",
            lineHeight: 1.45,
            fontFamily: "var(--font-bb-sans)",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
