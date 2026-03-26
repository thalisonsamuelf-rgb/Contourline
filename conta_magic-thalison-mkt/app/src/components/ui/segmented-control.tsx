"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

export interface SegmentedControlOption {
  value: string;
  label: React.ReactNode;
}

const segmentedItemVariants = cva(
  [
    "inline-flex min-h-11 items-center justify-center rounded-lg border px-4 py-3",
    "font-mono text-[11px] uppercase tracking-wider",
    "transition-all duration-300 cursor-pointer",
  ],
  {
    variants: {
      tone: {
        surface:
          "bg-bg-elevated border-border text-gray-muted hover:border-primary/40 hover:text-bb-cream",
        ghost:
          "bg-white/5 border-bb-border-input text-gray-silver hover:border-primary/40 hover:text-bb-warm-white",
      },
      selected: {
        true: "border-primary bg-primary/[0.1] text-primary shadow-[0_12px_28px_rgba(221, 209, 187,0.1)]",
        false: "",
      },
    },
    defaultVariants: {
      tone: "surface",
      selected: false,
    },
  }
);

export interface SegmentedControlProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof RadioGroup>,
    "children"
  > {
  options: readonly (SegmentedControlOption | string)[];
  tone?: "surface" | "ghost";
  itemClassName?: string;
}

const normalizeOption = (
  option: SegmentedControlOption | string
): SegmentedControlOption =>
  typeof option === "string" ? { value: option, label: option } : option;

function SegmentedControl({
  options,
  value: valueProp,
  defaultValue,
  onValueChange,
  tone = "surface",
  className,
  itemClassName,
  ...props
}: SegmentedControlProps) {
  const isControlled = valueProp !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const value = isControlled ? valueProp : uncontrolledValue;

  const handleValueChange = (nextValue: string) => {
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }

    onValueChange?.(nextValue);
  };

  return (
    <RadioGroup
      value={value}
      onValueChange={handleValueChange}
      className={className}
      {...props}
    >
      {options.map((option) => {
        const normalizedOption = normalizeOption(option);
        const isSelected = normalizedOption.value === value;

        return (
          <label
            key={normalizedOption.value}
            className={cn(
              segmentedItemVariants({ tone, selected: isSelected }),
              "focus-within:border-primary/70 focus-within:text-bb-cream focus-within:ring-2 focus-within:ring-primary/60",
              itemClassName
            )}
          >
            <RadioGroupItem value={normalizedOption.value} className="sr-only" />
            <span>{normalizedOption.label}</span>
          </label>
        );
      })}
    </RadioGroup>
  );
}

export { SegmentedControl };
