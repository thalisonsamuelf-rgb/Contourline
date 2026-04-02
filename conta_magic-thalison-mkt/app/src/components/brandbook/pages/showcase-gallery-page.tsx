"use client"

import { useState, useCallback, useRef, useEffect, useMemo } from "react"

/** Derives the potential video filename from an image filename */
function deriveVideoPath(imageFile: string): string {
  return imageFile.replace(/\.(jpg|jpeg|png|webp)$/i, ".mp4")
}
import { motion } from "framer-motion"
import { PageHeader } from "../chrome/page-header"
import { SectionDivider } from "../chrome/section-divider"
import { ScrollReveal } from "../chrome/scroll-reveal"
import { FooterBar } from "../chrome/footer-bar"
import { BbTickerStrip } from "../organisms/bb-ticker-strip"
import { BbBadge } from "../atoms/bb-badge"
import { BbTabTrigger } from "../molecules/bb-tab-trigger"
import { ShowcaseLightbox } from "../organisms/bb-lightbox"
import {
  STARTER_BRAND_ASSETS,
  STARTER_PAGE_CHROME,
} from "@/components/brandbook/data/starter-brand-data"

export interface ShowcaseImage {
  file: string
  title: string
  desc?: string
  tags?: string[]
  video?: string
  /** Group label for chapter interstitials (items with the same group are grouped together) */
  group?: string
}

export interface ShowcaseGalleryPageProps {
  categoryNum: string
  categoryLabel: string
  categoryTitle: string
  categoryDesc: string
  images: ShowcaseImage[]
  basePath: string
  gridCols?: 2 | 3 | 4
  aspectRatio?: string
}

// ─── Image Card ──────────────────────────────────────────────

function ImageCard({
  image,
  basePath,
  onClick,
  aspectRatio = "3 / 4",
}: {
  image: ShowcaseImage
  basePath: string
  onClick: () => void
  aspectRatio?: string
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [probeResult, setProbeResult] = useState<{ key: string; video: string | null }>({
    key: "",
    video: null,
  })
  const [imgError, setImgError] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const explicitVideo = image.video ?? null
  const probeKey = `${basePath}/${image.file}`
  const videoFile = explicitVideo || deriveVideoPath(image.file)
  const videoSrc = `${basePath}/${videoFile}`

  useEffect(() => {
    if (explicitVideo) {
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
  }, [explicitVideo, probeKey, videoFile, videoSrc])

  const detectedVideo = explicitVideo ?? (probeResult.key === probeKey ? probeResult.video : null)
  const hasVideo = !!detectedVideo

  if (imgError) return null

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {})
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <motion.div
      style={{
        background: "var(--dark)",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 8px 32px var(--bb-accent-15), 0 0 0 1px var(--bb-accent-25)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video indicator badge */}
      {hasVideo && (
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            right: "0.75rem",
            zIndex: 3,
            background: isHovered ? "rgba(255,50,50,0.9)" : "rgba(221, 209, 187,0.9)",
            color: isHovered ? "#fff" : "#000",
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.45rem",
            fontWeight: 700,
            padding: "0.25rem 0.5rem",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            transition: "all 0.2s ease",
          }}
        >
          <span style={{ fontSize: "0.6rem" }}>{isHovered ? "\u25CF" : "\u25B6"}</span> {isHovered ? "REC" : "MP4"}
        </div>
      )}

      {/* Media container */}
      <div style={{ position: "relative", borderBottom: "1px solid var(--border)", overflow: "hidden", aspectRatio }}>
        <img
          src={`${basePath}/${image.file}`}
          alt={image.title}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: hasVideo && isHovered ? 0 : 1,
            transform: isHovered ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
          }}
        />
        {hasVideo && detectedVideo && (
          <video
            ref={videoRef}
            src={`${basePath}/${detectedVideo}`}
            muted
            loop
            playsInline
            preload="metadata"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        )}

        {/* Shine sweep overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(105deg, transparent 40%, rgba(221, 209, 187,0.07) 45%, rgba(221, 209, 187,0.13) 50%, rgba(221, 209, 187,0.07) 55%, transparent 60%)",
            transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
            transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        {/* Bottom gradient vignette on hover */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top, rgba(5,5,5,0.6), transparent)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.4s ease",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      </div>
      <div
        style={{
          padding: "1rem 1.25rem",
          borderTop: isHovered ? "1px solid rgba(221, 209, 187,0.25)" : "1px solid transparent",
          transition: "border-color 0.3s ease",
        }}
      >
        <div style={{ marginBottom: "0.35rem" }}>
          <span
            style={{
              fontFamily: "var(--font-bb-display)",
              fontSize: "0.7rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.02em",
              color: isHovered ? "var(--bb-accent)" : "var(--cream)",
              transition: "color 0.3s ease",
            }}
          >
            {image.title}
          </span>
          {image.desc && (
            <p
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.45rem",
                color: "var(--dim)",
                lineHeight: 1.6,
                marginTop: "0.3rem",
                letterSpacing: "0.02em",
              }}
            >
              {image.desc}
            </p>
          )}
        </div>
        {image.tags && image.tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem", marginTop: "0.5rem" }}>
            {image.tags.map((tag) => (
              <BbBadge
                key={tag}
                variant={isHovered ? "accent" : "surface"}
                style={{
                  fontSize: "0.4rem",
                  padding: "0.15rem 0.5rem",
                  transition: "all 0.3s ease",
                }}
              >
                {tag}
              </BbBadge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Sub-collection Chapter Header ───────────────────────────

function ChapterInterstitial({ num, label }: { num: string; label: string }) {
  return (
    <div
      style={{
        gridColumn: "1 / -1",
        position: "relative",
        padding: "clamp(1.5rem, 4vw, 3rem) clamp(1rem, 3vw, 2.5rem)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        background: "var(--dark)",
      }}
    >
      {/* Circuit trace decoration */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, var(--bb-accent), transparent 15%, transparent 85%, var(--bb-accent))",
          opacity: 0.15,
          pointerEvents: "none",
        }}
      />
      {/* Large background number */}
      <div
        style={{
          position: "absolute",
          right: "2rem",
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-bb-display)",
          fontSize: "clamp(4rem, 8vw, 8rem)",
          fontWeight: 800,
          color: "rgba(221, 209, 187,0.04)",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {num}
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.55rem",
            color: "var(--bb-accent)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          Sec. {num}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-bb-display)",
            fontSize: "clamp(1rem, 2vw, 1.5rem)",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "-0.01em",
            color: "var(--cream)",
            marginTop: "0.25rem",
          }}
        >
          {label}
        </h3>
      </div>
    </div>
  )
}

// ─── Filter Tab Bar ──────────────────────────────────────────

function FilterBar({
  tags,
  activeTag,
  onSelect,
  total,
  filteredCount,
}: {
  tags: string[]
  activeTag: string | null
  onSelect: (tag: string | null) => void
  total: number
  filteredCount: number
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        borderBottom: "1px solid var(--border)",
        background: "var(--surface)",
        overflowX: "auto",
      }}
    >
      <BbTabTrigger
        active={activeTag === null}
        onClick={() => onSelect(null)}
      >
        All ({total})
      </BbTabTrigger>
      {tags.map((tag) => (
        <BbTabTrigger
          key={tag}
          active={activeTag === tag}
          onClick={() => onSelect(tag)}
        >
          {tag}
        </BbTabTrigger>
      ))}
      {activeTag && (
        <span
          style={{
            marginLeft: "auto",
            paddingRight: "1rem",
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.5rem",
            color: "var(--dim)",
          }}
        >
          {filteredCount} resultado{filteredCount !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  )
}

// ─── Main Gallery Page ───────────────────────────────────────

export function ShowcaseGalleryPage({
  categoryNum,
  categoryLabel,
  categoryTitle,
  categoryDesc,
  images,
  basePath,
  gridCols = 3,
  aspectRatio = "3 / 4",
}: ShowcaseGalleryPageProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  // Extract unique tags for filter bar
  const allTags = useMemo(() => {
    const tagSet = new Set<string>()
    images.forEach((img) => img.tags?.forEach((t) => tagSet.add(t)))
    return Array.from(tagSet).sort()
  }, [images])

  // Filter images by active tag
  const filteredImages = useMemo(() => {
    if (!activeTag) return images
    return images.filter((img) => img.tags?.includes(activeTag))
  }, [images, activeTag])

  // Derive ticker items from tags + collection info
  const tickerItems = useMemo(() => {
    const base = [
      categoryLabel.toUpperCase(),
      `CAT.${categoryNum}`,
      `${images.length} ITEMS`,
      STARTER_BRAND_ASSETS.brandName.toUpperCase(),
      STARTER_BRAND_ASSETS.collectionLabel,
    ]
    const topTags = allTags.slice(0, 8).map((t) => t.toUpperCase())
    return [...base, ...topTags]
  }, [categoryLabel, categoryNum, images.length, allTags])

  // Group items by explicit `group` field. No group = flat list (no chapter headers).
  const hasGroups = filteredImages.some((img) => img.group)
  const groupedItems = useMemo(() => {
    if (!hasGroups) return [{ label: "", items: filteredImages.map((img) => ({ image: img, originalIndex: images.indexOf(img) })) }]

    const groups: { label: string; items: { image: ShowcaseImage; originalIndex: number }[] }[] = []
    let currentGroup: string | null = null

    filteredImages.forEach((img) => {
      const groupKey = img.group || ""
      if (groupKey !== currentGroup) {
        currentGroup = groupKey
        groups.push({ label: groupKey, items: [] })
      }
      groups[groups.length - 1].items.push({ image: img, originalIndex: images.indexOf(img) })
    })
    return groups
  }, [filteredImages, images, hasGroups])

  const gridTemplate = {
    2: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
    3: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
    4: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  }

  // Detect videos at runtime (explicit + auto-derived)
  const [videoCount, setVideoCount] = useState(0)
  useEffect(() => {
    let count = 0
    let checked = 0
    const total = images.length

    images.forEach((img) => {
      if (img.video) {
        count++
        checked++
        if (checked === total) setVideoCount(count)
        return
      }
      const videoSrc = `${basePath}/${deriveVideoPath(img.file)}`
      const v = document.createElement("video")
      v.preload = "metadata"
      v.onloadedmetadata = () => {
        count++
        checked++
        if (checked === total) setVideoCount(count)
      }
      v.onerror = () => {
        checked++
        if (checked === total) setVideoCount(count)
      }
      v.src = videoSrc
    })
  }, [images, basePath])

  const tagCount = allTags.length
  const chrome = STARTER_PAGE_CHROME.showcaseGallery

  return (
    <>
      <PageHeader
        navLeft={chrome.navLeft}
        navCenter={chrome.navCenter}
        navRight={chrome.navRight}
        title={<>{categoryLabel.split(" ")[0]}<span style={{ color: "var(--bb-accent)" }}>{categoryLabel.split(" ").slice(1).join(" ") || ""}</span></>}
        subtitle={`${categoryDesc} // 2026`}
        footerLeft={`Categoria ${categoryNum}`}
        footerCenter={`${images.length} Items`}
        footerRight={chrome.footerRight}
      />

      {/* Ticker Strip */}
      <BbTickerStrip items={tickerItems} speed={35} />

      {/* Stats bar with pattern background */}
      <div
        className="flex flex-wrap sm:flex-nowrap"
        style={{
          gap: 0,
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
        }}
      >
        {/* Subtle crosshair pattern */}
        <div
          className="pattern-crosshair-grid--tight"
          style={{ position: "absolute", inset: 0, opacity: 0.3, pointerEvents: "none" }}
        />
        {[
          { value: images.length.toString(), label: "Total Items", accent: true },
          ...(videoCount > 0 ? [{ value: videoCount.toString(), label: "Videos" }] : []),
          { value: tagCount.toString(), label: "Categorias" },
          { value: categoryNum, label: "Cole\u00E7\u00E3o" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              flex: "1 1 auto",
              minWidth: "25%",
              padding: "1rem 1.5rem",
              borderRight: "1px solid var(--border)",
              textAlign: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-bb-display)",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: stat.accent ? "var(--bb-accent)" : "var(--cream)",
                letterSpacing: "-0.02em",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: "var(--font-bb-mono)",
                fontSize: "0.5rem",
                color: "var(--dim)",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                marginTop: "0.25rem",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <main>
        <SectionDivider num={categoryNum} label={categoryTitle} concept={`${images.length} items // 2026`} />

        {/* Filter bar */}
        <FilterBar
          tags={allTags}
          activeTag={activeTag}
          onSelect={setActiveTag}
          total={images.length}
          filteredCount={filteredImages.length}
        />

        {/* Grouped grid with chapter interstitials */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridTemplate[gridCols],
            gap: "1px",
            background: "var(--border)",
          }}
        >
          {activeTag
            ? // Flat grid when filtering
              filteredImages.map((image, i) => {
                const originalIndex = images.indexOf(image)
                return (
                  <ScrollReveal key={image.file} direction="up" delay={Math.min(i * 0.05, 0.3)}>
                    <ImageCard
                      image={image}
                      basePath={basePath}
                      aspectRatio={aspectRatio}
                      onClick={() => setLightboxIndex(originalIndex)}
                    />
                  </ScrollReveal>
                )
              })
            : // Grouped grid with chapter interstitials
              groupedItems.map((group, gi) => (
                <div key={group.label || gi} style={{ display: "contents" }}>
                  {group.label && (
                    <ChapterInterstitial
                      num={String(gi + 1).padStart(2, "0")}
                      label={group.label}
                    />
                  )}
                  {group.items.map(({ image, originalIndex }, i) => (
                    <ScrollReveal key={image.file} direction="up" delay={Math.min(i * 0.05, 0.3)}>
                      <ImageCard
                        image={image}
                        basePath={basePath}
                        aspectRatio={aspectRatio}
                        onClick={() => setLightboxIndex(originalIndex)}
                      />
                    </ScrollReveal>
                  ))}
                </div>
              ))
          }
        </div>
      </main>

      <FooterBar
        left={`${STARTER_BRAND_ASSETS.brandName.toUpperCase()} // ${chrome.navCenter}`}
        center={`${categoryLabel.toUpperCase()} — ${images.length} ITEMS`}
        right={STARTER_BRAND_ASSETS.collectionLabel}
      />

      <ShowcaseLightbox
        images={images}
        basePath={basePath}
        currentIndex={lightboxIndex}
        onClose={closeLightbox}
        onNavigate={setLightboxIndex}
      />
    </>
  )
}
