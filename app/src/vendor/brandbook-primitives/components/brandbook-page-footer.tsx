import { cn } from "../lib/cn"

export interface BrandbookPageFooterProps {
  className?: string
  logoLightSrc: string
  logoLightAlt: string
  metaLine: string
}

export function BrandbookPageFooter({
  className,
  logoLightSrc,
  logoLightAlt,
  metaLine,
}: BrandbookPageFooterProps) {
  return (
    <footer
      className={cn(
        "relative overflow-hidden border-t border-[var(--bb-border)] bg-[var(--bb-dark)] px-[var(--bb-gutter,2rem)] py-12 text-center",
        className
      )}
    >
      <div className="mb-6">
        <img
          src={logoLightSrc}
          alt={logoLightAlt}
          className="mx-auto h-[clamp(2rem,6vw,4rem)]"
        />
      </div>
      <div className="font-bb-mono text-[0.6rem] uppercase tracking-[0.12em] text-[var(--bb-dim)]">
        {metaLine}
      </div>
    </footer>
  )
}
