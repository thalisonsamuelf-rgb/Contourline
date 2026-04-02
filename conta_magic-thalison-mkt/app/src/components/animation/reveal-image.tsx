"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

type RevealDirection = "left" | "right" | "up"

interface RevealImageProps {
  src: string
  alt: string
  className?: string
  direction?: RevealDirection
}

const clipPathMap: Record<RevealDirection, { hidden: string; visible: string }> = {
  left: {
    hidden: "inset(0 100% 0 0)",
    visible: "inset(0 0% 0 0)",
  },
  right: {
    hidden: "inset(0 0 0 100%)",
    visible: "inset(0 0 0 0%)",
  },
  up: {
    hidden: "inset(100% 0 0 0)",
    visible: "inset(0% 0 0 0)",
  },
}

export function RevealImage({
  src,
  alt,
  className,
  direction = "left",
}: RevealImageProps) {
  const paths = clipPathMap[direction]

  return (
    <motion.div
      className={cn("overflow-hidden rounded-[24px]", className)}
      initial={{ clipPath: paths.hidden, opacity: 0 }}
      whileInView={{ clipPath: paths.visible, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover"
        initial={{ scale: 1.15, filter: "blur(10px)" }}
        whileInView={{ scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.div>
  )
}
