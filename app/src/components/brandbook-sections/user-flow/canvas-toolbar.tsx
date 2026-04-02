"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Toggle } from "@/components/ui/toggle"
import { Separator } from "@/components/ui/separator"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/* ═══════════════════════════════════════════════════════════════════════════
   CANVAS TOOLBAR — Shared controls for all diagram components
   shadcn: Button, Badge, Slider, Toggle, ToggleGroup, Separator, Tooltip, DropdownMenu
   ═══════════════════════════════════════════════════════════════════════════ */

export type CanvasMode = "pan" | "select"

export interface CanvasToolbarProps {
  zoom: number
  onZoomChange: (zoom: number) => void
  onFit: () => void
  isDark: boolean
  onToggleTheme: () => void
  minZoom?: number
  maxZoom?: number
  mode?: CanvasMode
  onModeChange?: (mode: CanvasMode) => void
  className?: string
}

const ZOOM_PRESETS = [
  { label: "25%", value: 0.25 },
  { label: "50%", value: 0.5 },
  { label: "75%", value: 0.75 },
  { label: "100%", value: 1 },
  { label: "150%", value: 1.5 },
  { label: "200%", value: 2 },
]

export function CanvasToolbar({
  zoom,
  onZoomChange,
  onFit,
  isDark,
  onToggleTheme,
  minZoom = 0.3,
  maxZoom = 3,
  mode = "pan",
  onModeChange,
  className,
}: CanvasToolbarProps) {
  return (
    <TooltipProvider>
      <div className={cn(
        "absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-lg px-2 py-1 backdrop-blur-sm",
        isDark ? "bg-[var(--bb-surface)]/80 border border-white/[0.08]" : "bg-white/60 border border-black/[0.08]",
        className,
      )}>
        {/* Mode toggle */}
        {onModeChange && (
          <>
            <ToggleGroup type="single" variant="outline" size="sm" value={mode} onValueChange={(v) => { if (v) onModeChange(v as CanvasMode) }}>
              <ToggleGroupItem value="pan" className="h-7 w-7 p-0" aria-label="Pan mode">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" /><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" /><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" /><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 13" />
                </svg>
              </ToggleGroupItem>
              <ToggleGroupItem value="select" className="h-7 w-7 p-0" aria-label="Select mode">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" /><path d="M13 13l6 6" />
                </svg>
              </ToggleGroupItem>
            </ToggleGroup>
            <Separator orientation="vertical" className={cn("h-4", isDark ? "bg-white/10" : "bg-black/10")} />
          </>
        )}

        {/* Theme toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle variant="outline" size="sm" pressed={!isDark} onPressedChange={onToggleTheme} className={cn("h-7 w-7 p-0 border-0 data-[state=on]:bg-accent", !isDark && "text-[#1a1a1a]")} aria-label="Toggle theme">
              {isDark ? "☀" : "☾"}
            </Toggle>
          </TooltipTrigger>
          <TooltipContent side="bottom">{isDark ? "Light mode" : "Dark mode"}</TooltipContent>
        </Tooltip>

        <Separator orientation="vertical" className={cn("h-4", isDark ? "bg-white/10" : "bg-black/10")} />

        {/* Zoom slider */}
        <div className="flex items-center gap-2 px-1">
          <Button variant="ghost" size="sm" className={cn("h-6 w-6 p-0 text-xs font-mono", !isDark && "text-[#1a1a1a] hover:bg-black/10")} onClick={() => onZoomChange(Math.max(minZoom, zoom - 0.15))}>−</Button>
          <Slider variant="aiox" min={minZoom * 100} max={maxZoom * 100} value={[zoom * 100]} onValueChange={([v]) => onZoomChange(v / 100)} className="w-20" />
          <Button variant="ghost" size="sm" className={cn("h-6 w-6 p-0 text-xs font-mono", !isDark && "text-[#1a1a1a] hover:bg-black/10")} onClick={() => onZoomChange(Math.min(maxZoom, zoom + 0.15))}>+</Button>
        </div>

        {/* Zoom presets */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Badge variant="outline" className={cn("cursor-pointer font-mono text-[0.5rem] uppercase tracking-wider tabular-nums", !isDark && "border-black/12 bg-black/[0.04] text-[#1a1a1a]")}>
              {Math.round(zoom * 100)}%
            </Badge>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[80px]">
            {ZOOM_PRESETS.map((p) => (
              <DropdownMenuItem key={p.value} onClick={() => onZoomChange(p.value)} className="font-mono text-xs justify-center">{p.label}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className={cn("h-4", isDark ? "bg-white/10" : "bg-black/10")} />

        {/* Fit */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className={cn("h-7 px-2 font-mono text-[0.5rem] uppercase tracking-wider", !isDark && "text-[#1a1a1a] hover:bg-black/10")} onClick={onFit}>FIT</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Fit to view</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}

/* ─── Legend ─────────────────────────────────────────────────────────────── */

export interface LegendItem {
  label: string
  color?: string
  shape?: "square" | "diamond" | "line" | "circle" | "dot"
  fill?: string
  border?: string
}

export interface CanvasLegendProps {
  items: LegendItem[]
  isDark: boolean
  hint?: string
  className?: string
}

export function CanvasLegend({ items, isDark, hint = "scroll to zoom · drag to pan", className }: CanvasLegendProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2 px-4 py-2", isDark ? "border-t border-white/[0.12]" : "border-t border-black/10", className)}>
      {items.map((item) => (
        <Badge key={item.label} variant="outline" className={cn("gap-1.5 font-mono text-[0.45rem] uppercase", !isDark && "border-black/12 bg-black/[0.04] text-[#1a1a1a]")}>
          <LegendSwatch item={item} />
          {item.label}
        </Badge>
      ))}
      <span className={cn("ml-auto font-mono text-[0.45rem] uppercase tracking-wider opacity-50", isDark ? "text-[var(--bb-dim)]" : "text-black/35")}>{hint}</span>
    </div>
  )
}

function LegendSwatch({ item }: { item: LegendItem }) {
  const base = "inline-block"
  const style: React.CSSProperties = {}
  if (item.fill) style.background = item.fill
  if (item.border) style.border = `1px solid ${item.border}`
  if (item.color) { style.background = item.color; style.border = `1px solid ${item.color}` }

  switch (item.shape) {
    case "diamond": return <span className={cn(base, "w-1.5 h-1.5 rounded-[1px] rotate-45")} style={style} />
    case "line": return <span className={cn(base, "w-3 h-px")} style={style} />
    case "circle": return <span className={cn(base, "w-2 h-2 rounded-full")} style={style} />
    case "dot": return <span className={cn(base, "w-1.5 h-1.5 rounded-full")} style={style} />
    default: return <span className={cn(base, "w-2 h-2 rounded-sm")} style={style} />
  }
}
