import { cn } from "../lib/cn"

export interface SectionDividerProps {
  label: string
  concept?: string
  num?: string
  className?: string
}

export function SectionDivider({
  label,
  concept,
  num,
  className,
}: SectionDividerProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-y-2 border-y border-[var(--bb-border)] bg-[var(--bb-dark)] px-[var(--bb-gutter,1.5rem)] py-[0.7rem] font-bb-mono text-[0.65rem] font-medium uppercase md:flex-nowrap",
        className
      )}
    >
      {num && <span className="pr-2 text-[0.6rem] text-[var(--bb-accent)]">{num}</span>}
      <span className="h-px flex-1 bg-[var(--bb-border)]" />
      <span className="px-4 tracking-[0.1em] text-[var(--bb-cream)]">{label}</span>
      {concept && <span className="px-3 text-[var(--bb-dim)]">{concept}</span>}
      <span className="h-px flex-1 bg-[var(--bb-border)]" />
    </div>
  )
}
