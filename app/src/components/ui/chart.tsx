"use client"

import * as React from "react"
import {
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
} from "recharts"
import type { Payload } from "recharts/types/component/DefaultTooltipContent"
import { cn } from "@/lib/utils"

// AIOX uses single dark theme
const THEMES = { light: "", dark: ".dark" } as const

export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode
    icon?: React.ComponentType
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  )
}

type ChartContextProps = { config: ChartConfig }

const ChartContext = React.createContext<ChartContextProps | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) throw new Error("useChart must be used within <ChartContainer />")
  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<typeof ResponsiveContainer>["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        ref={ref}
        className={cn(
          "w-full text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-bb-dim",
          "[&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-bb-border",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-bb-border",
          "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-layer]:outline-none",
          "[&_.recharts-polar-grid_[stroke='#ccc']]:stroke-bb-border",
          "[&_.recharts-radial-bar-background-sector]:fill-bb-surface",
          "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-bb-surface",
          "[&_.recharts-reference-line_[stroke='#ccc']]:stroke-bb-border",
          "[&_.recharts-sector[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-sector]:outline-none",
          "[&_.recharts-surface]:outline-none",
          "[&_.recharts-cartesian-axis-tick_text]:font-bb-mono",
          "[&_.recharts-cartesian-axis-tick_text]:text-[11px]",
          "[&_.recharts-legend-item-text]:!font-bb-mono",
          "[&_.recharts-legend-item-text]:!text-bb-dim",
          "[&_.recharts-legend-item-text]:!text-[11px]",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        {isMounted ? (
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        ) : (
          <div aria-hidden="true" className="h-full w-full rounded-[inherit]" />
        )}
      </div>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "Chart"

const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(([, cfg]) => cfg.theme || cfg.color)
  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color = itemConfig.theme?.[theme as keyof typeof itemConfig.theme] || itemConfig.color
    return color ? `  --color-${key}: ${color};` : null
  })
  .join("\n")}
}`,
          )
          .join("\n"),
      }}
    />
  )
}

// Re-export Recharts primitives
const ChartTooltip = RechartsTooltip
const ChartLegend = RechartsLegend

// Tooltip content adapted for AIOX bb-* tokens
interface ChartTooltipContentProps {
  active?: boolean
  payload?: ReadonlyArray<Payload<number, string>>
  label?: string
  hideLabel?: boolean
  hideIndicator?: boolean
  indicator?: "line" | "dot" | "dashed"
  nameKey?: string
  labelKey?: string
  className?: string
}

const ChartTooltipContent = React.forwardRef<HTMLDivElement, ChartTooltipContentProps>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      nameKey,
    },
    ref,
  ) => {
    const { config } = useChart()

    if (!active || !payload?.length) return null

    return (
      <div
        ref={ref}
        className={cn(
          "grid min-w-[8rem] items-start gap-1.5 border px-2.5 py-1.5 text-xs shadow-xl font-bb-mono",
          "bg-[var(--bb-chart-tooltip-bg)] border-[var(--bb-chart-tooltip-border)] text-[var(--bb-chart-tooltip-text)]",
          className,
        )}
      >
        {!hideLabel && label && (
          <div className="font-medium text-bb-cream">{label}</div>
        )}
        <div className="grid gap-1.5">
          {payload.map((item: Payload<number, string>, index: number) => {
            const key = nameKey || item.name || item.dataKey || "value"
            const itemConfig = typeof key === "string" ? config[key] : undefined
            const indicatorColor = (item.payload as Record<string, unknown>)?.fill || item.color

            return (
              <div
                key={index}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2",
                  indicator === "dot" && "items-center",
                )}
              >
                {!hideIndicator && (
                  <div
                    className={cn("shrink-0", {
                      "h-2.5 w-2.5": indicator === "dot",
                      "w-1": indicator === "line",
                      "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                    })}
                    style={{
                      backgroundColor: indicator !== "dashed" ? (indicatorColor as string) : undefined,
                      borderColor: indicator === "dashed" ? (indicatorColor as string) : undefined,
                    }}
                  />
                )}
                <div className="flex flex-1 justify-between items-center leading-none">
                  <span className="text-bb-dim">
                    {itemConfig?.label || item.name}
                  </span>
                  {item.value != null && (
                    <span className="font-bb-mono font-medium tabular-nums text-bb-cream ml-2">
                      {typeof item.value === "number" ? item.value.toLocaleString() : item.value}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  },
)
ChartTooltipContent.displayName = "ChartTooltipContent"

// Legend content adapted for AIOX bb-* tokens
interface ChartLegendContentProps {
  payload?: Array<{ value: string; color?: string; dataKey?: string }>
  verticalAlign?: "top" | "bottom"
  hideIcon?: boolean
  nameKey?: string
  className?: string
}

const ChartLegendContent = React.forwardRef<HTMLDivElement, ChartLegendContentProps>(
  ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
    const { config } = useChart()

    if (!payload?.length) return null

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className,
        )}
      >
        {payload.map((item) => {
          const key = nameKey || item.dataKey || item.value || "value"
          const itemConfig = config[key]

          return (
            <div
              key={item.value}
              className="flex items-center gap-1.5 text-[11px] font-bb-mono text-bb-dim"
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0"
                  style={{ backgroundColor: item.color }}
                />
              )}
              {itemConfig?.label || item.value}
            </div>
          )
        })}
      </div>
    )
  },
)
ChartLegendContent.displayName = "ChartLegendContent"

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  useChart,
}
