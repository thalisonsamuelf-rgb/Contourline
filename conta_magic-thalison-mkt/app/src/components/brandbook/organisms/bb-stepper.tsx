"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState, type HTMLAttributes } from "react"
import { BbStepperStep } from "../molecules"

export interface BbStepperProps extends HTMLAttributes<HTMLDivElement> {
  steps: {
    label: string
    status?: "pending" | "active" | "completed"
  }[]
  direction?: "horizontal" | "vertical"
}

export function BbStepper({ steps, direction = "horizontal", className, style, ...props }: BbStepperProps) {
  const [isCompact, setIsCompact] = useState(false)
  const isHorizontal = direction === "horizontal" && !isCompact

  useEffect(() => {
    const media = window.matchMedia("(max-width: 639px)")
    const sync = () => setIsCompact(media.matches)
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  return (
    <div
      className={cn(className)}
      style={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        alignItems: isHorizontal ? "center" : "flex-start",
        ...style,
      }}
      {...props}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1
        const isConnectorCompleted = step.status === "completed"

        return (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: isHorizontal ? "row" : "column",
              alignItems: isHorizontal ? "center" : "flex-start",
              flex: isHorizontal && !isLast ? 1 : undefined,
            }}
          >
            <BbStepperStep
              step={index + 1}
              label={step.label}
              status={step.status}
            />

            {/* Connector */}
            {!isLast && (
              isHorizontal ? (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    minWidth: 24,
                    background: isConnectorCompleted ? "var(--bb-accent)" : "var(--border)",
                    margin: "0 0.5rem",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 2,
                    height: 24,
                    marginLeft: 13,
                    background: isConnectorCompleted ? "var(--bb-accent)" : "var(--border)",
                  }}
                />
              )
            )}
          </div>
        )
      })}
    </div>
  )
}
