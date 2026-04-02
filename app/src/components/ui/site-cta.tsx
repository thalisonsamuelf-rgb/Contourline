"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { PixelArrowIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const siteCtaVariants = cva(
  [
    "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg border",
    "px-6 py-3 font-display text-[13px] font-bold uppercase tracking-[0.14em]",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/60",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      tone: {
        solid:
          "border-primary bg-primary text-bg-surface shadow-[0_14px_32px_rgba(221, 209, 187,0.16)] hover:-translate-y-0.5 hover:brightness-110",
        surface:
          "border-bb-border bg-bg-elevated text-bb-cream hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary",
        inverse:
          "border-bb-dark/10 bg-bb-dark text-bb-cream hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-bb-dark",
      },
      size: {
        md: "min-h-11",
        lg: "min-h-[52px] px-8 py-4",
      },
      state: {
        idle: "",
        loading: "cursor-wait",
        success: "border-primary/30 bg-primary/20 text-primary shadow-none",
        error: "border-red-500/30 bg-red-500/10 text-red-400 shadow-none hover:bg-red-500/20",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      tone: "solid",
      size: "md",
      state: "idle",
      fullWidth: false,
    },
  }
);

type SiteCtaVariantProps = VariantProps<typeof siteCtaVariants>;

interface SiteCtaBaseProps extends SiteCtaVariantProps {
  className?: string;
  showArrow?: boolean;
}

const SiteCtaInner = ({
  children,
  showArrow = false,
}: { children: React.ReactNode; showArrow?: boolean }) => (
  <>
    <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    <span className="relative z-10 inline-flex items-center gap-2">
      <span>{children}</span>
      {showArrow && (
        <PixelArrowIcon
          className="size-3.5 shrink-0 -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          size={14}
        />
      )}
    </span>
  </>
);

export interface SiteCtaButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    SiteCtaBaseProps {
  children: React.ReactNode;
}

const SiteCtaButton = React.forwardRef<HTMLButtonElement, SiteCtaButtonProps>(
  (
    {
      children,
      className,
      tone,
      size,
      state,
      fullWidth,
      showArrow,
      type = "button",
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        siteCtaVariants({ tone, size, state, fullWidth }),
        className
      )}
      {...props}
    >
      <SiteCtaInner showArrow={showArrow}>{children}</SiteCtaInner>
    </button>
  )
);
SiteCtaButton.displayName = "SiteCtaButton";

export interface SiteCtaLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    Omit<SiteCtaBaseProps, "state"> {
  href: string;
  children: React.ReactNode;
}

const SiteCtaLink = React.forwardRef<HTMLAnchorElement, SiteCtaLinkProps>(
  (
    {
      children,
      className,
      tone,
      size,
      fullWidth,
      showArrow,
      href,
      ...props
    },
    ref
  ) => (
    <a
      ref={ref}
      href={href}
      className={cn(siteCtaVariants({ tone, size, fullWidth }), className)}
      {...props}
    >
      <SiteCtaInner showArrow={showArrow}>{children}</SiteCtaInner>
    </a>
  )
);
SiteCtaLink.displayName = "SiteCtaLink";

export { SiteCtaButton, SiteCtaLink, siteCtaVariants };
