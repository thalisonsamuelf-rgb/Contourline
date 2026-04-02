"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const fieldVariants = cva("flex flex-col", {
  variants: {
    spacing: {
      none: "gap-0",
      compact: "gap-1.5",
      cozy: "gap-2",
      relaxed: "gap-3",
    },
  },
  defaultVariants: {
    spacing: "compact",
  },
});

const fieldGroupVariants = cva("grid gap-4", {
  variants: {
    columns: {
      single: "grid-cols-1",
      split: "grid-cols-1 sm:grid-cols-2",
    },
  },
  defaultVariants: {
    columns: "single",
  },
});

const fieldLabelVariants = cva("", {
  variants: {
    tone: {
      surface:
        "flex min-h-11 items-center font-mono text-[11px] font-bold uppercase tracking-wider text-gray-silver",
      ghost:
        "block font-mono text-[11px] font-medium uppercase tracking-wider text-gray-dim",
      light:
        "flex min-h-11 items-center font-mono text-[11px] font-medium uppercase tracking-wider text-gray-dim",
      srOnly: "sr-only",
    },
  },
  defaultVariants: {
    tone: "surface",
  },
});

const fieldControlVariants = cva("", {
  variants: {
    tone: {
      surface:
        "min-h-11 bg-bg-elevated border-border rounded px-4 py-3 text-[15px] md:text-[15px] text-bb-cream placeholder:text-gray-dim focus-visible:border-primary focus-visible:ring-0 dark:bg-bg-elevated transition-colors",
      ghost:
        "w-full bg-white/5 border-bb-border-input text-bb-warm-white text-[14px] md:text-[14px] px-4 py-3 rounded-md transition-colors focus-visible:border-ring focus-visible:ring-0 dark:bg-white/5 placeholder:text-gray-dim",
      light:
        "min-h-11 w-full bg-white border-bb-border-input text-bb-dark text-[14px] md:text-[14px] px-4 py-3 rounded-md transition-colors focus-visible:border-gray-silver focus-visible:ring-0 dark:bg-white placeholder:text-gray-muted",
    },
  },
  defaultVariants: {
    tone: "surface",
  },
});

export interface FieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldVariants> {}

function Field({ className, spacing, ...props }: FieldProps) {
  return <div className={cn(fieldVariants({ spacing }), className)} {...props} />;
}

export interface FieldGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fieldGroupVariants> {}

function FieldGroup({ className, columns, ...props }: FieldGroupProps) {
  return (
    <div className={cn(fieldGroupVariants({ columns }), className)} {...props} />
  );
}

export interface FieldLabelProps
  extends React.ComponentProps<typeof Label>,
    VariantProps<typeof fieldLabelVariants> {}

function FieldLabel({ className, tone, ...props }: FieldLabelProps) {
  return (
    <Label className={cn(fieldLabelVariants({ tone }), className)} {...props} />
  );
}

export {
  Field,
  FieldGroup,
  FieldLabel,
  fieldControlVariants,
  fieldGroupVariants,
  fieldLabelVariants,
};
