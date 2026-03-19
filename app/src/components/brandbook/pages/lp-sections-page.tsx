import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"
import {
  STARTER_PAGE_CHROME,
  STARTER_TYPOGRAPHY,
} from "@/components/brandbook/data/starter-brand-data"
/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Badge({ level }: { level: "low" | "med" | "high" }) {
  const map = {
    low: { label: "LOW", color: "var(--bb-accent)" },
    med: { label: "MED", color: "var(--bb-warning)" },
    high: { label: "HIGH", color: "var(--bb-flare)" },
  }
  const { label, color } = map[level]
  return (
    <span
      style={{
        fontFamily: "var(--font-bb-mono)",
        fontSize: "0.55rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        color,
        border: `1px solid ${color}`,
        padding: "0.15rem 0.5rem",
      }}
    >
      {label}
    </span>
  )
}

function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-bb-mono)",
        fontSize: "0.6rem",
        color: "var(--bb-dim)",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
      }}
    >
      {children}
    </span>
  )
}

function TokenRow({ token, value }: { token: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "0.4rem 0",
        borderBottom: "1px solid var(--bb-border)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-bb-mono)",
          fontSize: "0.6rem",
          color: "var(--bb-accent)",
          letterSpacing: "0.04em",
        }}
      >
        {token}
      </span>
      <span
        style={{
          fontFamily: "var(--font-bb-mono)",
          fontSize: "0.6rem",
          color: "var(--bb-cream)",
        }}
      >
        {value}
      </span>
    </div>
  )
}

function SpecCard({
  title,
  badge,
  children,
}: {
  title: string
  badge: "low" | "med" | "high"
  children: React.ReactNode
}) {
  return (
    <div style={{ background: "var(--bb-dark)", padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-bb-display)",
            fontSize: "1rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h3>
        <Badge level={badge} />
      </div>
      {children}
    </div>
  )
}

function DataTable({
  headers,
  rows,
}: {
  headers: string[]
  rows: string[][]
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontFamily: "var(--font-bb-mono)",
          fontSize: "0.6rem",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "0.5rem 0.75rem",
                  color: "var(--bb-dim)",
                  borderBottom: "1px solid var(--bb-border)",
                  fontWeight: 500,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "0.5rem 0.75rem",
                    color: j === 0 ? "var(--bb-accent)" : "var(--bb-cream)",
                    borderBottom: "1px solid var(--bb-border)",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CodeSnippet({ code }: { code: string }) {
  return (
    <pre
      style={{
        fontFamily: "var(--font-bb-mono)",
        fontSize: "0.6rem",
        color: "var(--bb-cream)",
        background: "var(--bb-surface)",
        padding: "1rem",
        overflowX: "auto",
        borderLeft: "2px solid var(--bb-accent)",
        lineHeight: 1.6,
      }}
    >
      {code}
    </pre>
  )
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <MonoLabel>{title}</MonoLabel>
      <div style={{ marginTop: "0.5rem" }}>{children}</div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Section content                                                    */
/* ------------------------------------------------------------------ */

function AtomsSection() {
  return (
    <section style={{ padding: "2rem clamp(1rem, 3vw, 2rem)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1px",
          background: "var(--bb-border)",
        }}
      >
        {/* SectionShell */}
        <SpecCard title="SectionShell" badge="low">
          <Subsection title="Purpose">
            <p style={{ fontFamily: "var(--font-bb-sans)", fontSize: "0.8rem", color: "var(--bb-cream)", lineHeight: 1.6 }}>
              Wrapper for all page sections. Controls variant (dark/light), optional full-bleed mode, and consistent padding.
            </p>
          </Subsection>
          <Subsection title="Props">
            <DataTable
              headers={["Prop", "Type", "Default"]}
              rows={[
                ["variant", "'dark' | 'light'", "'light'"],
                ["fullBleed", "boolean", "false"],
                ["id", "string?", "—"],
              ]}
            />
          </Subsection>
          <Subsection title="Layout">
            <TokenRow token="padding" value="py-24 md:py-32" />
            <TokenRow token="max-width" value="1400px (when !fullBleed)" />
            <TokenRow token="dark bg" value="bg-brand-dark (#121213)" />
            <TokenRow token="light bg" value="bg-brand-light (#F4F4F4)" />
          </Subsection>
        </SpecCard>

        {/* SectionHeader */}
        <SpecCard title="SectionHeader" badge="low">
          <Subsection title="Purpose">
            <p style={{ fontFamily: "var(--font-bb-sans)", fontSize: "0.8rem", color: "var(--bb-cream)", lineHeight: 1.6 }}>
              Mono-styled numbered label at the top of each section. Pattern: [number] label_
            </p>
          </Subsection>
          <Subsection title="Props">
            <DataTable
              headers={["Prop", "Type", "Default"]}
              rows={[
                ["number", "string", "—"],
                ["label", "string", "—"],
                ["variant", "'dark' | 'light'", "'light'"],
              ]}
            />
          </Subsection>
          <Subsection title="Visual">
            <TokenRow token="font" value={`${STARTER_TYPOGRAPHY.mono.family} 11px`} />
            <TokenRow token="tracking" value="0.2em" />
            <TokenRow token="number color (dark)" value="brand-accent (#DDD1BB)" />
            <TokenRow token="label color (dark)" value="white/40" />
            <TokenRow token="margin-bottom" value="mb-14 (3.5rem)" />
          </Subsection>
        </SpecCard>

        {/* AccentButton */}
        <SpecCard title="AccentButton" badge="low">
          <Subsection title="Purpose">
            <p style={{ fontFamily: "var(--font-bb-sans)", fontSize: "0.8rem", color: "var(--bb-cream)", lineHeight: 1.6 }}>
              CTA button with arrow glyph. Three variants: accent (primary), dark, ghost.
            </p>
          </Subsection>
          <Subsection title="Props">
            <DataTable
              headers={["Prop", "Type", "Default"]}
              rows={[
                ["variant", "'accent' | 'dark' | 'ghost'", "'accent'"],
                ["arrow", "boolean", "true"],
                ["href", "string?", "—"],
              ]}
            />
          </Subsection>
          <Subsection title="Visual">
            <TokenRow token="text" value="11px bold uppercase tracking-[0.15em]" />
            <TokenRow token="padding" value="px-5 py-3.5" />
            <TokenRow token="min-width" value="200px" />
            <TokenRow token="arrow glyph" value="↗" />
          </Subsection>
        </SpecCard>

        {/* StatCard */}
        <SpecCard title="StatCard" badge="low">
          <Subsection title="Purpose">
            <p style={{ fontFamily: "var(--font-bb-sans)", fontSize: "0.8rem", color: "var(--bb-cream)", lineHeight: 1.6 }}>
              Metric display with large value + mono label. Three sizes, three color variants.
            </p>
          </Subsection>
          <Subsection title="Sizes">
            <TokenRow token="sm" value="text-xl" />
            <TokenRow token="md" value="text-3xl" />
            <TokenRow token="lg" value="text-4xl md:text-[3.5rem]" />
          </Subsection>
          <Subsection title="Variants">
            <TokenRow token="light" value="black value + muted-smoke label" />
            <TokenRow token="dark" value="white value + white/30 label" />
            <TokenRow token="accent" value="gold value + white/30 label" />
          </Subsection>
        </SpecCard>

        {/* QuoteBlock */}
        <SpecCard title="QuoteBlock" badge="low">
          <Subsection title="Purpose">
            <p style={{ fontFamily: "var(--font-bb-sans)", fontSize: "0.8rem", color: "var(--bb-cream)", lineHeight: 1.6 }}>
              Testimonial block with oversized quote mark, author avatar + name/role.
            </p>
          </Subsection>
          <Subsection title="Props">
            <DataTable
              headers={["Prop", "Type", "Default"]}
              rows={[
                ["quote", "string", "—"],
                ["author", "string", "—"],
                ["role", "string", "—"],
                ["variant", "'dark' | 'light'", "'light'"],
                ["avatarSize", "'sm' | 'md'", "'sm'"],
              ]}
            />
          </Subsection>
          <Subsection title="Visual">
            <TokenRow token="quote mark" value='text-5xl font-black, 15% opacity' />
            <TokenRow token="quote text" value="text-lg md:text-xl" />
            <TokenRow token="avatar" value="rounded-full, pravatar.cc" />
          </Subsection>
        </SpecCard>

        {/* AvatarStack */}
        <SpecCard title="AvatarStack" badge="low">
          <Subsection title="Purpose">
            <p style={{ fontFamily: "var(--font-bb-sans)", fontSize: "0.8rem", color: "var(--bb-cream)", lineHeight: 1.6 }}>
              Overlapping avatar row with +N remaining count and optional label.
            </p>
          </Subsection>
          <Subsection title="Props">
            <DataTable
              headers={["Prop", "Type", "Default"]}
              rows={[
                ["count", "number", "—"],
                ["label", "string?", "—"],
                ["variant", "'dark' | 'light'", "'light'"],
              ]}
            />
          </Subsection>
          <Subsection title="Visual">
            <TokenRow token="avatar size" value="w-8 h-8 rounded-full" />
            <TokenRow token="overlap" value="-space-x-2" />
            <TokenRow token="max displayed" value="5" />
            <TokenRow token="label" value="10px mono uppercase tracking-[0.2em]" />
          </Subsection>
        </SpecCard>
      </div>
    </section>
  )
}

function NavbarSection() {
  return (
    <section style={{ padding: "2rem clamp(1rem, 3vw, 2rem)" }}>
      <SpecCard title="Navbar" badge="med">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          <div>
            <Subsection title="Fixed Bar">
              <TokenRow token="position" value="fixed top-0, z-50" />
              <TokenRow token="background" value="aiox-dark/95 + backdrop-blur-sm" />
              <TokenRow token="border" value="border-b border-white/[0.06]" />
              <TokenRow token="max-width" value="1400px" />
              <TokenRow token="padding" value="px-6 md:px-10 py-4" />
            </Subsection>
            <Subsection title="Elements">
              <TokenRow token="logo" value="aiox-logo-white.svg h-5" />
              <TokenRow token="tagline" value="10px mono white/50, hidden md:block" />
              <TokenRow token="clock" value="10px mono white/30, live BRT" />
              <TokenRow token="menu btn" value="border white/15, 10px bold uppercase" />
            </Subsection>
          </div>
          <div>
            <Subsection title="Fullscreen Overlay">
              <TokenRow token="background" value="aiox-cream (100vh)" />
              <TokenRow token="z-index" value="z-[100]" />
              <TokenRow token="layout" value="grid md:grid-cols-[400px_1fr]" />
              <TokenRow token="link size" value="clamp(2.5rem, 6vw, 5.5rem)" />
              <TokenRow token="link style" value="font-black uppercase tracking-tight" />
            </Subsection>
            <Subsection title="Unique Patterns">
              <CodeSnippet
                code={`// Body scroll lock on menu open
useEffect(() => {
  document.body.style.overflow = menuOpen ? "hidden" : "";
}, [menuOpen]);

// Left panel: dark feature card with stats
// Right panel: full-height nav links`}
              />
            </Subsection>
          </div>
        </div>
      </SpecCard>
    </section>
  )
}

function HeroSection() {
  return (
    <section style={{ padding: "2rem clamp(1rem, 3vw, 2rem)" }}>
      <SpecCard title="HeroSection" badge="high">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}
        >
          <div>
            <Subsection title="Layout">
              <TokenRow token="height" value="min-h-screen flex-col" />
              <TokenRow token="content align" value="justify-end pb-12 md:pb-20" />
              <TokenRow token="grid" value="md:grid-cols-[1fr_1fr]" />
              <TokenRow token="max-width" value="1400px" />
            </Subsection>
            <Subsection title="Typography">
              <TokenRow token="headline" value="clamp(2.2rem, 7vw, 6.5rem)" />
              <TokenRow token="weight" value="font-black (900)" />
              <TokenRow token="leading" value="0.92" />
              <TokenRow token="tracking" value="-0.02em" />
              <TokenRow token="lime brackets" value="[10x] [100]" />
            </Subsection>
            <Subsection title="AI Watermark">
              <CodeSnippet
                code={`// Giant "AI" text behind content
font-size: 45vw
opacity: white/[0.04]
tracking: -0.05em
translate-y: 30%`}
              />
            </Subsection>
          </div>
          <div>
            <Subsection title="Video Preview (desktop only)">
              <TokenRow token="aspect" value="16/10" />
              <TokenRow token="grid overlay" value="30px squares, white/6%" />
              <TokenRow token="play button" value="lime circle w-12 h-12" />
              <TokenRow token="diamond shapes" value="rotated 45deg borders" />
            </Subsection>
            <Subsection title="Logo Ticker">
              <TokenRow token="background" value="aiox-cream" />
              <TokenRow token="border" value="border-t border-white/10" />
              <TokenRow token="animation" value="animate-ticker 30s linear infinite" />
              <TokenRow token="pattern" value="3x array duplication" />
            </Subsection>
            <Subsection title="Motion">
              <CodeSnippet
                code={`// Headline reveal
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}

// Video preview
initial={{ opacity: 0, scale: 0.97 }}
transition={{ duration: 0.8, delay: 0.3 }}`}
              />
            </Subsection>
          </div>
        </div>
      </SpecCard>
    </section>
  )
}

function PainProofSection() {
  return (
    <section style={{ padding: "2rem clamp(1rem, 3vw, 2rem)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1px",
          background: "var(--bb-border)",
        }}
      >
        {/* PainPoints */}
        <SpecCard title="PainPoints" badge="med">
          <Subsection title="Layout">
            <TokenRow token="structure" value="2 sections: dark + light" />
            <TokenRow token="dark height" value="min-h-[70vh] md:min-h-screen" />
            <TokenRow token="light height" value="min-h-[50vh] md:min-h-screen" />
          </Subsection>
          <Subsection title="Dual Ticker">
            <TokenRow token="top ticker" value="animate-ticker (→ direction)" />
            <TokenRow token="bottom ticker" value="animate-ticker-reverse (← direction)" />
            <TokenRow token="dot" value="w-2 h-2 rounded-full bg-bb-accent/60" />
            <TokenRow token="text" value="11px mono white/50 uppercase" />
          </Subsection>
          <Subsection title="Center Headline">
            <TokenRow token="font-size" value="clamp(2.2rem, 5.5vw, 5rem)" />
            <TokenRow token="motion" value="whileInView fade-up, duration 0.7" />
          </Subsection>
          <Subsection title="Data Shape">
            <CodeSnippet
              code={`const topTicker = string[]   // duplicated 3x
const bottomTicker = string[] // duplicated 3x`}
            />
          </Subsection>
        </SpecCard>

        {/* WhoWeAre */}
        <SpecCard title="WhoWeAre" badge="med">
          <Subsection title="Layout">
            <TokenRow token="variant" value="light (SectionShell)" />
            <TokenRow token="grid" value="md:grid-cols-2 gap-16" />
          </Subsection>
          <Subsection title="Stat Cascade">
            <CodeSnippet
              code={`// Staircase padding — each row offset 6%
{stats.map((stat, i) => (
  <div style={{ paddingLeft: \`\${i * 6}%\` }}>
    <StatCard size="lg" />
    <div className="flex-1 h-3 bg-black/4%" />
  </div>
))}`}
            />
          </Subsection>
          <Subsection title="Components Used">
            <TokenRow token="atoms" value="SectionShell, SectionHeader" />
            <TokenRow token="molecules" value="StatCard (lg), QuoteBlock, AvatarStack (inline)" />
          </Subsection>
        </SpecCard>

        {/* CustomerStory */}
        <SpecCard title="CustomerStory" badge="med">
          <Subsection title="Layout">
            <TokenRow token="grid" value="md:grid-cols-2 gap-0" />
            <TokenRow token="border" value="border white/[0.08]" />
            <TokenRow token="left panel" value="bg-white/[0.03] p-8 md:p-10" />
            <TokenRow token="right panel" value="full-bleed image" />
          </Subsection>
          <Subsection title="Content Grid">
            <TokenRow token="meta row" value="grid-cols-3 (Background, Experience, Prazo)" />
            <TokenRow token="stats row" value="2x StatCard variant=lime" />
            <TokenRow token="CTA" value="underline link with ArrowRight icon" />
          </Subsection>
        </SpecCard>

        {/* Testimonials */}
        <SpecCard title="Testimonials" badge="high">
          <Subsection title="Layout">
            <TokenRow token="grid" value="sm:grid-cols-2 lg:grid-cols-4" />
            <TokenRow token="gap trick" value="gap-px bg-black/[0.06]" />
            <TokenRow token="card min-h" value="320px sm:420px" />
          </Subsection>
          <Subsection title="Highlight Card">
            <TokenRow token="bg" value="bg-brand-accent (lime)" />
            <TokenRow token="span" value="sm:col-span-2 lg:col-span-1" />
            <TokenRow token="content" value="2x StatCard + headline + brand mark" />
          </Subsection>
          <Subsection title="Data Shape">
            <CodeSnippet
              code={`interface Testimonial {
  quote: string
  author: string
  role: string
  stats: { value: string; label: string }[]
}`}
            />
          </Subsection>
        </SpecCard>
      </div>
    </section>
  )
}

function ServicesProcessSection() {
  return (
    <section style={{ padding: "2rem clamp(1rem, 3vw, 2rem)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1px",
          background: "var(--bb-border)",
        }}
      >
        {/* Services */}
        <SpecCard title="Services" badge="med">
          <Subsection title="Table Layout">
            <TokenRow token="grid" value="md:grid-cols-[50px_180px_1fr_1fr]" />
            <TokenRow token="header row" value="10px mono white/20 uppercase" />
            <TokenRow token="dividers" value="divide-y divide-white/[0.06]" />
            <TokenRow token="hover" value="bg-white/[0.015]" />
          </Subsection>
          <Subsection title="Capability Tags">
            <TokenRow token="style" value="10px mono white/25" />
            <TokenRow token="border" value="border white/[0.08]" />
            <TokenRow token="padding" value="px-2.5 py-0.5" />
          </Subsection>
          <Subsection title="Data Shape">
            <CodeSnippet
              code={`interface Service {
  id: string         // "01"-"06"
  name: string
  description: string
  capabilities: string[]  // 4 items
}`}
            />
          </Subsection>
        </SpecCard>

        {/* HowItWorks */}
        <SpecCard title="HowItWorks" badge="high">
          <Subsection title="Interactive Staircase">
            <CodeSnippet
              code={`// Cards offset vertically by index
marginTop: isMobile ? '24px' : \`\${i * 50 + 24}px\`

// Progress bar tracks hovered step
width: \`\${((hovered + 1) / steps.length) * 100}%\`

// 48-column tick marks below bar
Array.from({ length: 48 }).map(() =>
  <div className="flex-1 border-l border-black/15" />
)`}
            />
          </Subsection>
          <Subsection title="Layout">
            <TokenRow token="grid" value="md:grid-cols-4" />
            <TokenRow token="card min-h" value="220px" />
            <TokenRow token="variant" value="light (SectionShell)" />
          </Subsection>
          <Subsection title="Post-Launch Grid">
            <TokenRow token="grid" value="md:grid-cols-3 gap-px" />
            <TokenRow token="gap trick" value="bg-black/[0.06] with white cards" />
            <TokenRow token="icons" value="Activity, Zap, HeadphonesIcon (lucide)" />
          </Subsection>
        </SpecCard>

        {/* TechStack */}
        <SpecCard title="TechStack" badge="low">
          <Subsection title="Marquee">
            <TokenRow token="animation" value="animate-marquee 20s linear infinite" />
            <TokenRow token="duplication" value="[...techs, ...techs]" />
            <TokenRow token="item style" value="border white/[0.08] px-6 py-3" />
            <TokenRow token="text" value="white/35 text-sm font-medium" />
          </Subsection>
          <Subsection title="Layout">
            <TokenRow token="variant" value="dark (SectionShell fullBleed)" />
            <TokenRow token="items" value="18 tech names" />
          </Subsection>
        </SpecCard>
      </div>
    </section>
  )
}

function CommerceSection() {
  return (
    <section style={{ padding: "2rem clamp(1rem, 3vw, 2rem)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1px",
          background: "var(--bb-border)",
        }}
      >
        {/* Pricing */}
        <SpecCard title="Pricing" badge="med">
          <Subsection title="Layout">
            <TokenRow token="grid" value="sm:grid-cols-2 md:grid-cols-3" />
            <TokenRow token="border" value="border-r border-b white/[0.08]" />
            <TokenRow token="popular highlight" value="bg-white/[0.025]" />
          </Subsection>
          <Subsection title="Toggle (Mensal/Anual)">
            <TokenRow token="track" value="w-10 h-5 border white/25" />
            <TokenRow token="thumb" value="w-4 bg-white translate-x" />
            <TokenRow token="discount" value="price * 0.8 for annual" />
          </Subsection>
          <Subsection title="Card Anatomy">
            <TokenRow token="header" value="tier name + popular badge" />
            <TokenRow token="price" value="text-5xl font-black" />
            <TokenRow token="features" value="Check icon + mono text" />
            <TokenRow token="CTA" value="full-width row with ↗" />
          </Subsection>
          <Subsection title="Data Shape">
            <CodeSnippet
              code={`interface Tier {
  name: string      // Explorer | Creator | Pro
  monthly: number   // 0 | 497 | 1997
  description: string
  features: string[]
  cta: string
  popular: boolean
}`}
            />
          </Subsection>
        </SpecCard>

        {/* ROICalculator */}
        <SpecCard title="ROICalculator" badge="high">
          <Subsection title="Layout">
            <TokenRow token="bg" value="brand-cream (standalone section)" />
            <TokenRow token="calculator bg" value="brand-dark" />
            <TokenRow token="max-width" value="3xl (max-w-3xl)" />
          </Subsection>
          <Subsection title="Sliders">
            <TokenRow token="component" value="shadcn/ui Slider" />
            <TokenRow token="thumb" value="bg-brand-accent border-brand-accent" />
            <TokenRow token="track" value="bg-white/15" />
            <TokenRow token="fill" value="bg-brand-accent" />
          </Subsection>
          <Subsection title="Inputs">
            <DataTable
              headers={["Slider", "Range", "Step"]}
              rows={[
                ["Employees", "1–100", "1"],
                ["Hours/week", "5–40", "5"],
                ["Hourly cost", "R$15–200", "5"],
              ]}
            />
          </Subsection>
          <Subsection title="Calculation">
            <CodeSnippet
              code={`const baseCost = employees * hours * cost * 52
const annual = includeBenefits
  ? Math.round(baseCost * 1.3)
  : baseCost`}
            />
          </Subsection>
        </SpecCard>
      </div>
    </section>
  )
}

function ContentCommunitySection() {
  return (
    <section style={{ padding: "2rem clamp(1rem, 3vw, 2rem)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1px",
          background: "var(--bb-border)",
        }}
      >
        {/* FAQ */}
        <SpecCard title="FAQ" badge="med">
          <Subsection title="Layout">
            <TokenRow token="bg" value="aiox-cream (standalone section)" />
            <TokenRow token="headline" value="clamp(2.2rem, 7vw, 6rem)" />
          </Subsection>
          <Subsection title="Accordion">
            <TokenRow token="dividers" value="divide-y divide-dark/[0.08]" />
            <TokenRow token="active bg" value="aiox-dark/[0.03]" />
            <TokenRow token="number badge" value="h-6 w-6 bg-bb-accent text-dark" />
            <TokenRow token="toggle icon" value="Plus, rotates 45deg on open" />
            <TokenRow token="default open" value="first item (id='01')" />
          </Subsection>
          <Subsection title="Data Shape">
            <CodeSnippet
              code={`interface FAQ {
  id: string   // "01"-"06"
  q: string
  a: string
}`}
            />
          </Subsection>
        </SpecCard>

        {/* Articles */}
        <SpecCard title="Articles" badge="med">
          <Subsection title="Layout">
            <TokenRow token="grid" value="md:grid-cols-3 gap-px" />
            <TokenRow token="gap trick" value="bg-white/[0.06]" />
            <TokenRow token="image aspect" value="16/9" />
          </Subsection>
          <Subsection title="Card Interactions">
            <TokenRow token="image hover" value="scale-105 duration-500" />
            <TokenRow token="border hover" value="white/[0.06] → white/15" />
            <TokenRow token="title hover" value="white → brand-accent" />
          </Subsection>
          <Subsection title="Data Shape">
            <CodeSnippet
              code={`interface Article {
  date: string
  category: string
  author: string
  authorTitle: string
  title: string
  excerpt: string
}`}
            />
          </Subsection>
        </SpecCard>

        {/* Team */}
        <SpecCard title="Team" badge="med">
          <Subsection title="Portrait Cards">
            <TokenRow token="grid" value="sm:grid-cols-2 max-w-3xl" />
            <TokenRow token="gap trick" value="gap-px bg-black/[0.06]" />
            <TokenRow token="image aspect" value="3/4" />
            <TokenRow token="meta bar" value="ID[num] + country/year" />
          </Subsection>
          <Subsection title="CTA Banner">
            <TokenRow token="bg" value="brand-dark with AccentButton" />
            <TokenRow token="pattern" value="full-width dark block inside light section" />
          </Subsection>
        </SpecCard>

        {/* Contact */}
        <SpecCard title="Contact" badge="med">
          <Subsection title="Layout">
            <TokenRow token="grid" value="md:grid-cols-2 gap-10 md:gap-16" />
            <TokenRow token="variant" value="light (SectionShell)" />
          </Subsection>
          <Subsection title="Form">
            <TokenRow token="container" value="bg-white border black/[0.06]" />
            <TokenRow token="labels" value="10px mono bold uppercase" />
            <TokenRow token="focus" value="border-brand-accent" />
            <TokenRow token="submit" value="full-width bg-black text-white" />
          </Subsection>
          <Subsection title="Left Panel">
            <TokenRow token="checklist" value="Check icon + mono items" />
            <TokenRow token="quote" value="QuoteBlock variant=dark in black box" />
            <TokenRow token="social proof" value="AvatarStack + 5 stars" />
          </Subsection>
        </SpecCard>
      </div>
    </section>
  )
}

function DesignPatternsSection() {
  return (
    <section style={{ padding: "2rem clamp(1rem, 3vw, 2rem)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1px",
          background: "var(--bb-border)",
        }}
      >
        {/* Hairline Grid */}
        <SpecCard title="Hairline Grid (gap-px)" badge="low">
          <Subsection title="Technique">
            <p style={{ fontFamily: "var(--font-bb-sans)", fontSize: "0.8rem", color: "var(--bb-cream)", lineHeight: 1.6 }}>
              Parent has colored background + gap-px. Children have opaque background.
              The 1px gap reveals the parent color as grid lines.
            </p>
          </Subsection>
          <Subsection title="Usage">
            <CodeSnippet
              code={`// Dark variant
<div className="grid gap-px bg-white/[0.06]">
  <div className="bg-brand-dark">...</div>
</div>

// Light variant
<div className="grid gap-px bg-black/[0.06]">
  <div className="bg-brand-light">...</div>
</div>`}
            />
          </Subsection>
          <Subsection title="Used In">
            <TokenRow token="Testimonials" value="lg:grid-cols-4" />
            <TokenRow token="Articles" value="md:grid-cols-3" />
            <TokenRow token="Team" value="sm:grid-cols-2" />
            <TokenRow token="HowItWorks" value="md:grid-cols-3 (post-launch)" />
          </Subsection>
        </SpecCard>

        {/* Ticker / Marquee */}
        <SpecCard title="Ticker & Marquee" badge="low">
          <Subsection title="CSS Animations">
            <CodeSnippet
              code={`@keyframes ticker {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes ticker-reverse {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}`}
            />
          </Subsection>
          <Subsection title="Durations">
            <TokenRow token="ticker" value="30s linear infinite" />
            <TokenRow token="ticker-reverse" value="35s linear infinite" />
            <TokenRow token="marquee" value="20s linear infinite" />
          </Subsection>
          <Subsection title="Usage">
            <TokenRow token="HeroSection" value="logo ticker (cream bg)" />
            <TokenRow token="PainPoints" value="dual tickers (opposite dirs)" />
            <TokenRow token="TechStack" value="tech marquee" />
          </Subsection>
        </SpecCard>

        {/* Mono Labels */}
        <SpecCard title="Mono Label System" badge="low">
          <Subsection title="Standard Pattern">
            <CodeSnippet
              code={`font-family: ${STARTER_TYPOGRAPHY.mono.family}
font-size: 10-11px
text-transform: uppercase
letter-spacing: 0.15em – 0.2em
font-weight: 400-700`}
            />
          </Subsection>
          <Subsection title="Variants">
            <TokenRow token="section number" value="[01] — lime/black, 11px" />
            <TokenRow token="section label" value="Label_ — white/40 or muted-smoke" />
            <TokenRow token="meta text" value="dates, roles, categories — white/20-50" />
            <TokenRow token="stat labels" value="10px tracking-[0.2em]" />
          </Subsection>
        </SpecCard>

        {/* Staircase Pattern */}
        <SpecCard title="Staircase Pattern" badge="med">
          <Subsection title="Technique">
            <p style={{ fontFamily: "var(--font-bb-sans)", fontSize: "0.8rem", color: "var(--bb-cream)", lineHeight: 1.6 }}>
              Items are offset progressively to create a descending staircase visual.
            </p>
          </Subsection>
          <Subsection title="Implementations">
            <CodeSnippet
              code={`// HowItWorks: vertical offset
marginTop: isMobile ? '24px' : \`\${i * 50 + 24}px\`

// WhoWeAre: horizontal offset
paddingLeft: \`\${i * 6}%\``}
            />
          </Subsection>
        </SpecCard>

        {/* Framer Motion Reveals */}
        <SpecCard title="Framer Motion Reveals" badge="low">
          <Subsection title="Standard Patterns">
            <CodeSnippet
              code={`// Fade-up (most common)
initial={{ opacity: 0, y: 20-40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6-0.7 }}

// Staggered children
transition={{ delay: i * 0.04-0.1 }}

// Scale reveal (hero video)
initial={{ opacity: 0, scale: 0.97 }}
animate={{ opacity: 1, scale: 1 }}`}
            />
          </Subsection>
        </SpecCard>

        {/* Color Mode Switch */}
        <SpecCard title="Dark/Light Section Alternation" badge="low">
          <Subsection title="Pattern">
            <p style={{ fontFamily: "var(--font-bb-sans)", fontSize: "0.8rem", color: "var(--bb-cream)", lineHeight: 1.6 }}>
              LP alternates between dark (#050505) and light (#F5F4E7) sections.
              Some sections (PainPoints, FAQ, ROICalculator) use standalone backgrounds
              outside SectionShell for custom layouts.
            </p>
          </Subsection>
          <Subsection title="Section Flow">
            <DataTable
              headers={["Section", "Background"]}
              rows={[
                ["Navbar", "dark/95 (fixed)"],
                ["Hero", "dark"],
                ["WhoWeAre", "light"],
                ["PainPoints", "dark → light"],
                ["ROICalculator", "cream"],
                ["Services", "dark"],
                ["HowItWorks", "light"],
                ["CustomerStory", "dark"],
                ["Testimonials", "light"],
                ["TechStack", "dark"],
                ["Team", "light"],
                ["Pricing", "dark"],
                ["FAQ", "cream"],
                ["Articles", "dark"],
                ["Contact", "light"],
                ["Footer", "dark"],
              ]}
            />
          </Subsection>
        </SpecCard>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export function LpSectionsPage() {
  const chrome = STARTER_PAGE_CHROME.lpSections

  return (
    <>
      <PageHeader
        navLeft={chrome.navLeft}
        navCenter={chrome.navCenter}
        navRight={chrome.navRight}
        title={
          <>
            LP Starter — Section{" "}
            <span className="text-bb-accent">Catalog</span>
          </>
        }
        subtitle={chrome.subtitle}
        footerLeft={chrome.footerLeft}
        footerCenter={chrome.footerCenter}
        footerRight={chrome.footerRight}
      />

      <main>
        <SectionDivider num="01" label="Atoms & Molecules" concept="Reusable Primitives" />
        <AtomsSection />

        <SectionDivider num="02" label="Navigation" concept="Fixed Bar + Fullscreen Overlay" />
        <NavbarSection />

        <SectionDivider num="03" label="Hero & Impact" concept="Watermark, Ticker, Video Preview" />
        <HeroSection />

        <SectionDivider num="04" label="Pain & Proof" concept="Tickers, Stats, Testimonials" />
        <PainProofSection />

        <SectionDivider num="05" label="Services & Process" concept="Table Layout, Staircase, Marquee" />
        <ServicesProcessSection />

        <SectionDivider num="06" label="Commerce" concept="Pricing Toggle, ROI Calculator" />
        <CommerceSection />

        <SectionDivider num="07" label="Content & Community" concept="FAQ, Articles, Team, Contact" />
        <ContentCommunitySection />

        <SectionDivider num="08" label="Design Patterns" concept="Recurring Techniques" />
        <DesignPatternsSection />
      </main>
    </>
  )
}
