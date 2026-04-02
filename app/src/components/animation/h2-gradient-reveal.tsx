"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

type HeadingTag = "h1" | "h2" | "h3"

interface H2GradientRevealProps {
  children: string
  as?: HeadingTag
  className?: string
}

const tagStyles: Record<HeadingTag, string> = {
  h1: "text-5xl md:text-7xl font-bold leading-[1.1] font-display uppercase tracking-tight",
  h2: "text-4xl md:text-6xl font-bold leading-[1.1] font-display uppercase tracking-tight",
  h3: "text-3xl md:text-5xl font-bold leading-[1.1] font-display uppercase tracking-tight",
}

export function H2GradientReveal({
  children,
  as = "h2",
  className,
}: H2GradientRevealProps) {
  const Tag = as

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Tag
        className={cn(
          tagStyles[as],
          "bg-gradient-to-br from-[#F4F4E8] via-[#F4F4E8] to-primary bg-clip-text text-transparent",
          className
        )}
      >
        {children}
      </Tag>
    </motion.div>
  )
}
