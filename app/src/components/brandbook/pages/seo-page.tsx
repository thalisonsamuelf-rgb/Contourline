"use client"

import {
  STARTER_BRAND_ASSETS,
  STARTER_PAGE_CHROME,
  STARTER_SOCIAL_LINKS,
} from "@/components/brandbook/data/starter-brand-data"
import { BbCompPageTemplate } from "../templates"

export function SeoPage() {
  const chrome = STARTER_PAGE_CHROME.seo

  return (
    <BbCompPageTemplate
      header={{
        navLeft: chrome.navLeft,
        navCenter: chrome.navCenter,
        navRight: chrome.navRight,
        titlePrefix: "SEO &",
        titleHighlight: "Digital Identity",
        subtitle: chrome.subtitle,
        footerLeft: chrome.footerLeft,
        footerCenter: chrome.footerCenter,
        footerRight: chrome.footerRight,
      }}
      sections={[
        {
          label: "Meta Tags",
          concept: "HTML Head Metadata",
          content: (
            <div style={{ padding: "2rem" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "1px",
                  background: "var(--bb-border)",
                }}
              >
                {[
                  { tag: "title", value: STARTER_BRAND_ASSETS.seo.title, desc: "Primary page title. Max 60 chars." },
                  { tag: "description", value: STARTER_BRAND_ASSETS.seo.description, desc: "Meta description. Max 155 chars." },
                  { tag: "robots", value: "index, follow", desc: "Search engine crawl directives." },
                  { tag: "canonical", value: `${STARTER_BRAND_ASSETS.seo.url}/`, desc: "Canonical URL to prevent duplicates." },
                ].map((item) => (
                  <div key={item.tag} style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
                    <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.55rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                      {`<meta name="${item.tag}">`}
                    </div>
                    <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-cream)", marginBottom: "0.35rem" }}>
                      {item.value}
                    </div>
                    <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.55rem", color: "var(--bb-dim)" }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          label: "Open Graph",
          concept: "Social Sharing Protocol",
          content: (
            <div style={{ padding: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "var(--bb-border)" }}>
                <div style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
                  <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.55rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "1rem" }}>
                    OG Properties
                  </div>
                  {[
                    { prop: "og:title", value: STARTER_BRAND_ASSETS.seo.title },
                    { prop: "og:description", value: STARTER_BRAND_ASSETS.seo.description },
                    { prop: "og:type", value: "website" },
                    { prop: "og:image", value: STARTER_BRAND_ASSETS.seo.socialImage },
                    { prop: "og:url", value: STARTER_BRAND_ASSETS.seo.url },
                  ].map((item) => (
                    <div key={item.prop} style={{ display: "flex", gap: "1rem", padding: "0.5rem 0", borderBottom: "1px solid var(--bb-border)" }}>
                      <span style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.55rem", color: "var(--bb-dim)", minWidth: 100 }}>{item.prop}</span>
                      <span style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.55rem", color: "var(--bb-cream)" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "var(--bb-dark)", padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                  <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.55rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    OG Image Preview (1200x630)
                  </div>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: 400,
                      aspectRatio: "1200/630",
                      background: "var(--bb-surface)",
                      border: "1px solid var(--bb-border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img src={STARTER_BRAND_ASSETS.logoLightSrc} alt={STARTER_BRAND_ASSETS.logoAlt} style={{ height: 32 }} />
                  </div>
                </div>
              </div>
            </div>
          ),
        },
        {
          label: "Twitter Cards",
          concept: "X/Twitter Social Cards",
          content: (
            <div style={{ padding: "2rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--bb-border)" }}>
                {[
                  { prop: "twitter:card", value: "summary_large_image", desc: "Large image card format" },
                  { prop: "twitter:site", value: STARTER_BRAND_ASSETS.seo.twitterHandle, desc: "Site Twitter handle" },
                  { prop: "twitter:title", value: STARTER_BRAND_ASSETS.seo.title, desc: "Card title" },
                  { prop: "twitter:image", value: STARTER_BRAND_ASSETS.seo.socialImage, desc: "Current placeholder. 1200x600 recommended." },
                ].map((item) => (
                  <div key={item.prop} style={{ background: "var(--bb-dark)", padding: "1.5rem" }}>
                    <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.55rem", color: "var(--bb-accent)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                      {item.prop}
                    </div>
                    <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.65rem", color: "var(--bb-cream)", marginBottom: "0.25rem" }}>{item.value}</div>
                    <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.5rem", color: "var(--bb-dim)" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ),
        },
        {
          label: "Structured Data",
          concept: "JSON-LD Schema.org",
          content: (
            <div style={{ padding: "2rem" }}>
              <div style={{ background: "var(--bb-surface)", border: "1px solid var(--bb-border)", padding: "1.5rem", fontFamily: "var(--font-bb-mono)", fontSize: "0.6rem", color: "var(--bb-dim)", overflowX: "auto", whiteSpace: "pre" }}>
{`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${STARTER_BRAND_ASSETS.seo.organizationName}",
  "url": "${STARTER_BRAND_ASSETS.seo.url}",
  "logo": "${STARTER_BRAND_ASSETS.seo.logoUrl}",
  "description": "${STARTER_BRAND_ASSETS.seo.description}",
  "sameAs": [
    "${STARTER_SOCIAL_LINKS.xUrl}",
    "${STARTER_SOCIAL_LINKS.linkedinUrl}"
  ]
}`}
              </div>
            </div>
          ),
        },
      ]}
    />
  )
}
