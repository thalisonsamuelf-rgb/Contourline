"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

type SliderVariant = "default" | "aiox"

const sliderTrackStyles: Record<SliderVariant, string> = {
  default:
    "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
  aiox:
    "relative grow overflow-hidden rounded-full border border-white/10 bg-white/5 data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2",
}

const sliderRangeStyles: Record<SliderVariant, string> = {
  default:
    "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
  aiox:
    "absolute rounded-full bg-[linear-gradient(90deg,rgba(221, 209, 187,0.88),rgba(221, 209, 187,1))] shadow-[0_0_20px_rgba(221, 209, 187,0.38)] data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
}

const sliderThumbStyles: Record<SliderVariant, string> = {
  default:
    "block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
  aiox:
    "block size-5 shrink-0 rounded-full border-2 border-primary bg-bg-surface shadow-[0_0_0_4px_rgba(221, 209, 187,0.12),0_10px_28px_rgba(0,0,0,0.4)] transition-[transform,box-shadow] hover:scale-[1.05] hover:shadow-[0_0_0_5px_rgba(221, 209, 187,0.18),0_14px_30px_rgba(0,0,0,0.46)] focus-visible:ring-[5px] focus-visible:ring-primary/25 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  variant = "default",
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & { variant?: SliderVariant }) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max]
  )

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          sliderTrackStyles[variant]
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
        className={cn(
            sliderRangeStyles[variant]
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className={sliderThumbStyles[variant]}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
