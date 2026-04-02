"use client"

import { cn } from "@/lib/utils"
import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

type AnimationType = "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale"

interface ScrollAnimationWrapperProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  className?: string
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 0 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
}

export function ScrollAnimationWrapper({
  children,
  animation = "fadeUp",
  delay = 0,
  className,
}: ScrollAnimationWrapperProps) {
  const variants = animationVariants[animation]

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}
