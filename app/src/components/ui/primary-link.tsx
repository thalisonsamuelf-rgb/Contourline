"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { PixelArrowIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/** Animated anchor link with pixel arrow and underline reveal on hover. */
export interface PrimaryLinkProps
  extends Omit<HTMLMotionProps<"a">, "ref"> {
  /** Destination URL */
  href: string;
  /** Open link in a new tab with noopener noreferrer. @default false */
  newTab?: boolean;
  /** Link label text */
  children?: React.ReactNode;
}

const PrimaryLink = React.forwardRef<HTMLAnchorElement, PrimaryLinkProps>(
  ({ className, href, newTab = false, children, ...props }, ref) => {
    const externalProps = newTab
      ? { target: "_blank" as const, rel: "noopener noreferrer" }
      : {};

    return (
      <motion.a
        ref={ref}
        href={href}
        whileHover="hover"
        initial="initial"
        className={cn(
          "inline-flex items-center gap-1.5",
          "text-primary font-bold text-[13px] uppercase tracking-wider",
          "transition-colors duration-300",
          "cursor-pointer group",
          className
        )}
        {...externalProps}
        {...props}
      >
        <span className="relative overflow-hidden">
          {children}
          <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </span>
        <motion.div
          variants={{
            initial: { x: 0, y: 0 },
            hover: { x: 2, y: -2 },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <PixelArrowIcon className="size-3.5 shrink-0 -rotate-45" size={14} />
        </motion.div>
      </motion.a>
    );
  }
);
PrimaryLink.displayName = "PrimaryLink";

export { PrimaryLink };
