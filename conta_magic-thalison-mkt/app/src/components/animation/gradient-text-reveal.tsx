"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface GradientTextRevealProps {
  children: string
  className?: string
  delay?: number
}

const containerVariants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: {
      staggerChildren: 0.05,
      delayChildren: delay,
    },
  }),
}

const wordVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
}

export function GradientTextReveal({
  children,
  className,
  delay = 0,
}: GradientTextRevealProps) {
  const words = children.split(" ")

  return (
    <motion.p
      className={cn("text-lg md:text-xl leading-relaxed text-[#F5F4E7]", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={delay}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          variants={wordVariants}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  )
}
