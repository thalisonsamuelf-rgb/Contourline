import { cn } from "@/lib/utils"

interface PanelHeaderProps {
  label: string
  concept?: string
  num?: string
  className?: string
}

export function PanelHeader({ label, concept, num, className }: PanelHeaderProps) {
  return (
    <div
      className={cn("flex items-center gap-0", className)}
      style={{
        padding: "0.6rem 1.25rem",
        fontFamily: "var(--font-bb-mono)",
        fontSize: "0.6rem",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        borderBottom: "1px solid var(--bb-border)",
      }}
    >
      <span className="h-px" style={{ width: "20px", background: "var(--bb-border)" }} />
      <span style={{ color: "var(--bb-cream)", padding: "0 0.75rem", whiteSpace: "nowrap" }}>
        {label}
      </span>
      <span className="h-px flex-1" style={{ background: "var(--bb-border)" }} />
      {concept && (
        <span style={{ color: "var(--bb-dim)", padding: "0 0.75rem", whiteSpace: "nowrap" }}>
          {concept}
        </span>
      )}
      {num && (
        <>
          <span className="h-px" style={{ width: "20px", background: "var(--bb-border)" }} />
          <span style={{ color: "var(--bb-accent)", paddingLeft: "0.5rem", fontSize: "0.55rem" }}>
            {num}
          </span>
        </>
      )}
    </div>
  )
}
