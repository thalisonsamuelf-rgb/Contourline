"use client"

import { useState } from "react"

/* ═══════════════════════════════════════════════════════════════════════════
   FOUNDER PHOTO // Grayscale → Color on hover
   Client component for interactive photo effect.
   ═══════════════════════════════════════════════════════════════════════════ */

interface FounderPhotoProps {
  src: string
  alt: string
  size?: number
}

export function FounderPhoto({ src, alt, size = 100 }: FounderPhotoProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{
        width: size,
        height: size,
        overflow: "hidden",
        flexShrink: 0,
        border: isHovered ? "3px solid var(--bb-accent)" : "3px solid var(--bb-dark)",
        transition: "border-color 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: isHovered ? "grayscale(0%)" : "grayscale(100%)",
          transition: "filter 0.4s ease",
        }}
      />
    </div>
  )
}
