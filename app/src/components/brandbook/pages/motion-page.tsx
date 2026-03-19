"use client"

import { PageHeader } from "@/components/brandbook/chrome/page-header"
import {
  STARTER_BRAND_ASSETS,
  STARTER_PAGE_CHROME,
} from "@/components/brandbook/data/starter-brand-data"
import { MotionCell } from "@/components/brandbook-sections/motion/motion-cell"
import { OrchestrationPulseCell } from "@/components/brandbook-sections/motion/orchestration-pulse-cell"
import { SpeedLinesCell } from "@/components/brandbook-sections/motion/speed-lines-cell"
import { ParticleOrbitCell } from "@/components/brandbook-sections/motion/particle-orbit-cell"
import { LogoDissolveCell } from "@/components/brandbook-sections/motion/logo-dissolve-cell"
import { MorphingSquareCell } from "@/components/brandbook-sections/motion/morphing-square-cell"
import { GlitchCell } from "@/components/brandbook-sections/motion/glitch-cell"
import { StaggerTextCell } from "@/components/brandbook-sections/motion/stagger-text-cell"
import { BrandRevealCell } from "@/components/brandbook-sections/motion/brand-reveal-cell"

/* ═══════════════════════════════════════════════════════════════════════════
   Motion Page
   Showcases 8 starter brand motion explorations in a grid of replayable cells.
   Click any cell to replay its animation via MotionCell's replayKey mechanism.
   ═══════════════════════════════════════════════════════════════════════════ */

export function MotionPage() {
  const chrome = STARTER_PAGE_CHROME.motion

  return (
    <>
      <PageHeader
        navLeft={chrome.navLeft}
        navCenter={chrome.navCenter}
        navRight={chrome.navRight}
        title={
          <>
            Motion <span style={{ color: "var(--bb-accent)" }}>Showcase</span>
          </>
        }
        subtitle={chrome.subtitle}
        footerLeft={chrome.footerLeft}
        footerCenter={chrome.footerCenter}
        footerRight={chrome.footerRight}
      />

      {/* Section divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem 1.5rem",
          background: "var(--bb-surface)",
          borderBottom: "1px solid var(--bb-border)",
        }}
      >
        <span
          style={{ flex: 1, height: 1, background: "var(--bb-border)" }}
        />
        <span
          style={{
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.6rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--bb-dim)",
          }}
        >
          01 // Framer Motion Animations
        </span>
        <span
          style={{
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.55rem",
            color: "var(--bb-accent)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          GPU-Accelerated
        </span>
        <span
          style={{ flex: 1, height: 1, background: "var(--bb-border)" }}
        />
      </div>

      {/* Animation grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "1px",
          background: "var(--bb-border)",
        }}
      >
        {/* 1. Orchestration Pulse */}
        <MotionCell
          title="Orchestration Pulse"
          tag="full reveal -- 3.5s -- hero / splash"
          description="Seed dot + stagger por letra + speed lines neon + glow ring pulsante."
        >
          <OrchestrationPulseCell />
        </MotionCell>

        {/* 2. Speed Lines */}
        <MotionCell
          title="Speed Lines"
          tag="emphasis -- pin 1 inspired -- 2s"
          description="Logo cream desliza enquanto speed lines neon se desenham com stagger."
        >
          <SpeedLinesCell />
        </MotionCell>

        {/* 3. Particle Orbit */}
        <MotionCell
          title="Particle Orbit"
          tag="loop -- pin 2 inspired -- agents"
          description="X central com spring + 4 particulas orbitais flutuantes."
        >
          <ParticleOrbitCell />
        </MotionCell>

        {/* 4. Logo Dissolve */}
        <MotionCell
          title="Logo Dissolve"
          tag="transition -- 3s -- exit / fade"
          description={`${STARTER_BRAND_ASSETS.brandShortName} wordmark starts solid, individual letters flicker and dissolve to nothing.`}
        >
          <LogoDissolveCell />
        </MotionCell>

        {/* 5. Morphing Square */}
        <MotionCell
          title="Morphing Square"
          tag="loop -- shape shift -- 3.5s cycle"
          description="Square morphs through shapes: square to rounded to circle and back. Continuous loop."
        >
          <MorphingSquareCell />
        </MotionCell>

        {/* 6. Glitch Reveal */}
        <MotionCell
          title="Glitch Reveal"
          tag="dramatic -- 2s -- tech / hacker"
          description="Scanlines + noise + skew + hue-rotate com settle suave. Estetica terminal."
        >
          <GlitchCell />
        </MotionCell>

        {/* 7. Stagger Letters */}
        <MotionCell
          title="Stagger Letters"
          tag="elegant -- 1.5s -- navbar / footer"
          description="Cada letra sobe com spring + rotateX 3D. Underline neon fecha. Clean e reutilizavel."
        >
          <StaggerTextCell />
        </MotionCell>

        {/* 8. Brand Reveal */}
        <MotionCell
          title="Brand Reveal"
          tag="premium -- 3s -- landing page hero"
          description={`Black blinds slide open from center, revealing ${STARTER_BRAND_ASSETS.brandShortName} with scale + glow + decorative lines.`}
        >
          <BrandRevealCell />
        </MotionCell>
      </div>
    </>
  )
}
