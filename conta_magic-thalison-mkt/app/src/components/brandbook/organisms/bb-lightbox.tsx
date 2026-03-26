"use client"

import { useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { ShowcaseImage } from "../pages/showcase-gallery-page"
import { BbBadge } from "../atoms/bb-badge"

/** Derives the potential video filename from an image filename */
function deriveVideoPath(imageFile: string): string {
  return imageFile.replace(/\.(jpg|jpeg|png|webp)$/i, ".mp4")
}

/** Hook to auto-detect video availability */
function useDetectedVideo(image: ShowcaseImage, basePath: string) {
  const [probeResult, setProbeResult] = useState<{ key: string; video: string | null }>({
    key: "",
    video: null,
  })

  const explicitVideo = image.video ?? null
  const probeKey = `${basePath}/${image.file}`
  const videoFile = explicitVideo || deriveVideoPath(image.file)
  const videoSrc = `${basePath}/${videoFile}`

  useEffect(() => {
    if (explicitVideo || !image.file) {
      return
    }

    let cancelled = false
    const video = document.createElement("video")
    video.preload = "metadata"
    video.onloadedmetadata = () => {
      if (!cancelled) {
        setProbeResult({ key: probeKey, video: videoFile })
      }
    }
    video.onerror = () => {
      if (!cancelled) {
        setProbeResult({ key: probeKey, video: null })
      }
    }
    video.src = videoSrc

    return () => {
      cancelled = true
      video.onloadedmetadata = null
      video.onerror = null
      video.src = ""
    }
  }, [explicitVideo, image.file, probeKey, videoFile, videoSrc])

  const detectedVideo = explicitVideo ?? (probeResult.key === probeKey ? probeResult.video : null)
  const isChecking = !explicitVideo && image.file.length > 0 && probeResult.key !== probeKey

  return { detectedVideo, isChecking }
}

export interface ShowcaseLightboxProps {
  images: ShowcaseImage[]
  basePath: string
  currentIndex: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function ShowcaseLightbox({
  images,
  basePath,
  currentIndex,
  onClose,
  onNavigate,
}: ShowcaseLightboxProps) {
  const isOpen = currentIndex !== null
  const image = currentIndex !== null ? images[currentIndex] : null

  // Detect video for current image
  const { detectedVideo, isChecking } = useDetectedVideo(
    image || { file: "", title: "" },
    basePath
  )
  const isVideoMode = !isChecking && !!detectedVideo

  const goPrev = useCallback(() => {
    if (currentIndex === null) return
    onNavigate(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
  }, [currentIndex, images.length, onNavigate])

  const goNext = useCallback(() => {
    if (currentIndex === null) return
    onNavigate(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
  }, [currentIndex, images.length, onNavigate])

  useEffect(() => {
    if (!isOpen) return

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, isVideoMode, onClose, goPrev, goNext])

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && image && (
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: "var(--layer-modal)",
            background: isVideoMode ? "rgba(0,0,0,0.96)" : "rgba(5,5,5,0.92)",
            backdropFilter: isVideoMode ? "blur(40px)" : "blur(8px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Close button — glassmorphism */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1.5rem",
              zIndex: 3,
              background: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "var(--cream)",
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.55rem",
              padding: "0.5rem 0.85rem",
              minWidth: 44,
              minHeight: 44,
              cursor: "pointer",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            ESC
          </button>

          {/* Counter — glassmorphism pill */}
          <span
            style={{
              position: "absolute",
              top: "1rem",
              left: "1.5rem",
              zIndex: 3,
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.65rem",
              color: isVideoMode ? "rgba(255,255,255,0.5)" : "var(--dim)",
              letterSpacing: "0.08em",
              background: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.06)",
              padding: "0.3rem 0.7rem",
            }}
          >
            {currentIndex! + 1} / {images.length}
          </span>

          {/* Navigation arrows — glassmorphism */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              goPrev()
            }}
            aria-label="Previous"
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--cream)",
              fontSize: "1.25rem",
              width: "2.75rem",
              height: "2.75rem",
              minWidth: 44,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            &#8249;
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              goNext()
            }}
            aria-label="Next"
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--cream)",
              fontSize: "1.25rem",
              width: "2.75rem",
              height: "2.75rem",
              minWidth: 44,
              minHeight: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            &#8250;
          </button>

          {/* Media content */}
          <motion.div
            key={image.file}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: isVideoMode ? "92vw" : "85vw",
              maxHeight: isVideoMode ? "92vh" : "80vh",
            }}
          >
            {isVideoMode ? (
              <video
                key={detectedVideo}
                src={`${basePath}/${detectedVideo}`}
                autoPlay
                loop
                playsInline
                style={{
                  maxWidth: "100%",
                  maxHeight: "92vh",
                  objectFit: "contain",
                  display: "block",
                  borderRadius: "2px",
                }}
              />
            ) : (
              <>
                <img
                  src={`${basePath}/${image.file}`}
                  alt={image.title}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "70vh",
                    objectFit: "contain",
                    display: "block",
                  }}
                />
                {/* Caption — only in image mode */}
                <div style={{ marginTop: "1rem", textAlign: "center" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-bb-display)",
                      fontSize: "0.8rem",
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      color: "var(--cream)",
                    }}
                  >
                    {image.title}
                  </div>
                  {image.desc && (
                    <p
                      style={{
                        fontFamily: "var(--font-bb-mono)",
                        fontSize: "0.5rem",
                        color: "var(--dim)",
                        lineHeight: 1.6,
                        marginTop: "0.4rem",
                        maxWidth: 480,
                      }}
                    >
                      {image.desc}
                    </p>
                  )}
                  {image.tags && image.tags.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.35rem",
                        marginTop: "0.5rem",
                        justifyContent: "center",
                      }}
                    >
                      {image.tags.map((tag) => (
                        <BbBadge key={tag} variant="accent" style={{ fontSize: "0.45rem", padding: "0.15rem 0.5rem" }}>
                          {tag}
                        </BbBadge>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
