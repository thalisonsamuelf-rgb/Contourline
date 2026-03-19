import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes } from "react"

export interface BbButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive"
  size?: "sm" | "md" | "lg"
  loading?: boolean
}

export function BbButton({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  className,
  children,
  ...props
}: BbButtonProps) {
  const base: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    fontFamily: "var(--font-mono)",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    border: "none",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",
    textDecoration: "none",
    opacity: disabled ? 0.4 : 1,
    pointerEvents: disabled || loading ? "none" : "auto",
  }

  const sizes: Record<string, React.CSSProperties> = {
    sm: { minHeight: 44, padding: "0.65rem 1rem", fontSize: "0.55rem" },
    md: { minHeight: 44, padding: "0.65rem 1.5rem", fontSize: "0.65rem" },
    lg: { minHeight: 48, padding: "0.85rem 2rem", fontSize: "0.7rem" },
  }

  const variants: Record<string, React.CSSProperties> = {
    primary: { background: "var(--bb-accent)", color: "var(--dark)" },
    secondary: { background: "transparent", color: "var(--cream)", border: "1px solid var(--border)" },
    ghost: { background: "transparent", color: "var(--dim)" },
    destructive: { background: "var(--error)", color: "white" },
  }

  return (
    <button
      className={cn(className)}
      style={{ ...base, ...sizes[size], ...variants[variant] }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span
          style={{
            width: 14,
            height: 14,
            border: "2px solid currentColor",
            borderRightColor: "transparent",
            borderRadius: "50%",
            animation: "bb-spin 0.6s linear infinite",
          }}
        />
      ) : (
        children
      )}
    </button>
  )
}
