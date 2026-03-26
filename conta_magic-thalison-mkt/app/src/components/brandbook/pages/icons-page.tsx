"use client"

import { BbCompPageTemplate } from "../templates"
import { STARTER_PAGE_CHROME } from "@/components/brandbook/data/starter-brand-data"

function MonoLabel({ children, color = "var(--bb-accent)" }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.6rem", color, textTransform: "uppercase" as const, letterSpacing: "0.08em" }}>
      {children}
    </span>
  )
}

/** Inline SVG icon */
function SvgIcon({ children, size = 24, color = "var(--cream)" }: { children: React.ReactNode; size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      stroke={color}
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

const sampleIcons: { name: string; path: React.ReactNode }[] = [
  { name: "Check", path: <path d="m5 12 5 5L20 7" /> },
  { name: "Close", path: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> },
  { name: "Plus", path: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></> },
  { name: "Minus", path: <line x1="5" y1="12" x2="19" y2="12" /> },
  { name: "Chevron R", path: <polyline points="9 18 15 12 9 6" /> },
  { name: "Chevron L", path: <polyline points="15 18 9 12 15 6" /> },
  { name: "Chevron D", path: <polyline points="6 9 12 15 18 9" /> },
  { name: "Arrow R", path: <><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></> },
  { name: "Search", path: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></> },
  { name: "Sun", path: <><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></> },
  { name: "Grid", path: <><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></> },
  { name: "Moon", path: <path d="M12 2a7 7 0 0 0 0 14 5 5 0 0 1 0-10 3 3 0 0 0 0 6" /> },
]

const sizes = [
  { label: "16px", size: 16, desc: "Inline, tight spaces" },
  { label: "24px", size: 24, desc: "Default / UI" },
  { label: "32px", size: 32, desc: "Cards, emphasis" },
  { label: "48px", size: 48, desc: "Hero, feature" },
]

const usageRules = [
  { num: "01", text: "Always use 2px stroke width at all sizes.", sub: "Maintains visual consistency across the scale." },
  { num: "02", text: "Round caps and round joins only.", sub: "stroke-linecap: round; stroke-linejoin: round;" },
  { num: "03", text: "24px viewBox as canonical base.", sub: "Scale up/down from 24x24 viewBox." },
  { num: "04", text: "Stroke only, no fills.", sub: "Icons are outline-based. Use fill: none." },
  { num: "05", text: "Use currentColor for inheritance.", sub: "Icons inherit color from parent text color." },
  { num: "06", text: "Minimum touch target: 44x44px.", sub: "Icons smaller than 24px need padding for accessibility." },
]

const colorVariants: { label: string; color: string; varName: string; iconPath: React.ReactNode }[] = [
  { label: "Default / Cream", color: "var(--cream)", varName: "var(--cream)", iconPath: <path d="m5 12 5 5L20 7" /> },
  { label: "Brand / Lime", color: "var(--bb-accent)", varName: "var(--bb-accent)", iconPath: <path d="m5 12 5 5L20 7" /> },
  { label: "Muted / Dim", color: "var(--dim)", varName: "var(--dim)", iconPath: <path d="m5 12 5 5L20 7" /> },
  { label: "Error / Destructive", color: "var(--error)", varName: "var(--error)", iconPath: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> },
  { label: "Info / Blue", color: "var(--blue)", varName: "var(--blue)", iconPath: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></> },
  { label: "Warning / Flare", color: "var(--flare)", varName: "var(--flare)", iconPath: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></> },
]

export function IconsPage() {
  const chrome = STARTER_PAGE_CHROME.icons

  return (
    <BbCompPageTemplate
      header={{
        ...chrome,
        titlePrefix: "Icon",
        titleHighlight: "System",
      }}
      sections={[
        {
          label: "Icon Grid",
          content: (
            <>
              {/* Size scale */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "var(--border)" }}>
                {sizes.map((s) => (
                  <div key={s.label} style={{ background: "var(--dark)", padding: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                    <MonoLabel>{s.label}</MonoLabel>
                    <SvgIcon size={s.size}>
                      <polyline points="13 17 18 12 13 7" />
                      <polyline points="6 17 11 12 6 7" />
                    </SvgIcon>
                    <span style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.5rem", color: "var(--dim)" }}>{s.desc}</span>
                  </div>
                ))}
              </div>
              <div style={{ height: 1, background: "var(--border)" }} />
              {/* Sample icon grid at 24px */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "1px", background: "var(--border)" }}>
                {sampleIcons.map((icon) => (
                  <div
                    key={icon.name}
                    style={{
                      background: "var(--dark)",
                      padding: "1.5rem 1rem",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <SvgIcon>{icon.path}</SvgIcon>
                    <span style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.5rem", color: "var(--dim)", textTransform: "uppercase", letterSpacing: "0.06em", textAlign: "center" }}>
                      {icon.name}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ),
        },
        {
          label: "Usage Rules",
          content: (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1px", background: "var(--border)" }}>
              {usageRules.map((rule) => (
                <div key={rule.num} style={{ background: "var(--dark)", padding: "1.5rem 2rem", display: "flex", alignItems: "flex-start", gap: "1rem" }}>
                  <span style={{ fontFamily: "var(--font-bb-display)", fontSize: "1.2rem", fontWeight: 800, color: "var(--bb-accent)", lineHeight: 1 }}>
                    {rule.num}
                  </span>
                  <div style={{ fontSize: "0.75rem", color: "var(--cream)", lineHeight: 1.5 }}>
                    {rule.text}
                    <small style={{ display: "block", color: "var(--dim)", fontSize: "0.65rem", marginTop: "0.25rem" }}>{rule.sub}</small>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
        {
          label: "Color Variants",
          content: (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1px", background: "var(--border)" }}>
              {colorVariants.map((cv) => (
                <div key={cv.label} style={{ background: "var(--dark)", padding: "2rem", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <SvgIcon color={cv.color}>{cv.iconPath}</SvgIcon>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                    <MonoLabel>{cv.label}</MonoLabel>
                    <span style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.5rem", color: "var(--dim)" }}>{cv.varName}</span>
                  </div>
                </div>
              ))}
            </div>
          ),
        },
      ]}
    />
  )
}
