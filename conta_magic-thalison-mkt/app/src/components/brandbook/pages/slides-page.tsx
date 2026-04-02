"use client"

import { useMemo, useState } from "react"

import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"
import { SlideFullscreen, SlidePreview } from "@/components/brandbook/slides"
import { allSlideTemplates, CATEGORIES } from "@/components/brandbook/slides/registry"
import { SlidesToolbar } from "@/components/brandbook/slides/slides-toolbar"
import { useBrandbookTheme } from "@/components/brandbook/theme/brandbook-theme-provider"

export function SlidesPage() {
  const { meta } = useBrandbookTheme()
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null)
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("TODOS")
  const chrome = STARTER_PAGE_CHROME.slides

  const filtered = useMemo(
    () => (filter === "TODOS" ? allSlideTemplates : allSlideTemplates.filter((slide) => slide.category === filter)),
    [filter],
  )

  return (
    <>
      <PageHeader
        navLeft={chrome.navLeft}
        navCenter={chrome.navCenter}
        navRight={`V1.0 // ${meta.editionLabel.toUpperCase()}`}
        title={
          <>
            Slide <span className="text-bb-accent">Deck</span>
          </>
        }
        subtitle={chrome.subtitle}
        footerLeft={chrome.footerLeft}
        footerCenter={`${allSlideTemplates.length} Slides`}
        footerRight={chrome.footerRight}
      />
      <SlidesToolbar filter={filter} onFilterChange={setFilter} onPresent={() => setFullscreenIndex(0)} />

      <main className="grid grid-cols-1 gap-6 p-[var(--bb-gutter,1.5rem)] md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((slide) => {
          const globalIndex = allSlideTemplates.findIndex((entry) => entry.id === slide.id)
          return (
            <div key={slide.id} className="flex flex-col gap-3">
              <SlidePreview onClick={() => setFullscreenIndex(globalIndex)} version={slide.version}>
                <slide.Component />
              </SlidePreview>
              <div className="flex items-center justify-between">
                <span className="font-bb-mono text-[0.6rem] text-bb-cream">{slide.label}</span>
                <div className="flex items-center gap-2">
                  {slide.version === 2 && (
                    <span className="font-bb-mono text-[0.4rem] uppercase tracking-[0.15em] text-bb-accent">V2</span>
                  )}
                  <span className="font-bb-mono text-[0.45rem] uppercase tracking-[0.15em] text-bb-dim">{slide.category}</span>
                </div>
              </div>
            </div>
          )
        })}
      </main>

      {fullscreenIndex !== null && (
        <SlideFullscreen
          slides={allSlideTemplates.map((slide) => (
            <slide.Component key={slide.id} />
          ))}
          versions={allSlideTemplates.map((slide) => slide.version)}
          initialIndex={fullscreenIndex}
          onClose={() => setFullscreenIndex(null)}
        />
      )}
    </>
  )
}
