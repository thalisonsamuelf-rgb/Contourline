import { cn } from "@/lib/utils"
import type { HTMLAttributes } from "react"
import { BbFooterBar } from "../molecules/bb-footer-bar"

export interface BbPageFooterProps extends HTMLAttributes<HTMLElement> {
  brand?: string
  links?: { label: string; href: string }[]
}

export function BbPageFooter({ brand, links, className, style, ...props }: BbPageFooterProps) {
  return (
    <BbFooterBar className={cn(className)} style={style} {...props}>
      {brand && (
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6rem",
            color: "var(--dim)",
          }}
        >
          {brand}
        </span>
      )}
      {links && links.length > 0 && (
        <div style={{ display: "flex", gap: "1rem" }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                color: "var(--dim)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </BbFooterBar>
  )
}
