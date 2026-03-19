"use client"

import { PageHeader } from "@/components/brandbook/chrome/page-header"
import { SectionDivider } from "@/components/brandbook/chrome/section-divider"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import type { TokenExportBlock } from "@/lib/tenant/types"

interface TokenExportContent {
  header: {
    navLeft: string
    navCenter: string
    navRight: string
    titlePrefix: string
    titleAccent: string
    subtitle: string
    footerLeft: string
    footerCenter: string
    footerRight: string
  }
  instructions: string[]
  compatibilityNote: string
  blocks: TokenExportBlock[]
}

function ThemePreviewStrip({ block }: { block: TokenExportBlock }) {
  const swatches = [
    { label: "Accent", color: block.accentHex },
    { label: "Surface", color: block.surfaceHex },
    { label: "Text", color: block.textHex },
    { label: "Border", color: block.borderPreview },
  ]

  return (
    <div className="flex gap-3 py-4" style={{ paddingInline: "var(--bb-gutter, 1.5rem)" }}>
      {swatches.map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          <div
            className="h-6 w-6 shrink-0 rounded border"
            style={{
              backgroundColor: s.color,
              borderColor: "var(--bb-border)",
            }}
          />
          <div style={{ fontFamily: "var(--font-bb-mono)", fontSize: "0.6rem", color: "var(--bb-dim)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <span style={{ color: "var(--bb-cream)" }}>{s.label}</span>
            <br />
            {s.color}
          </div>
        </div>
      ))}
    </div>
  )
}

function CopyableCodeBlock({ block }: { block: TokenExportBlock }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <div className="mb-8 overflow-hidden rounded-lg border" style={{ marginInline: "var(--bb-gutter, 1.5rem)", borderColor: "var(--bb-border)" }}>
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{
          background: "var(--bb-surface)",
          borderColor: "var(--bb-border)",
          fontFamily: "var(--font-bb-mono)",
          fontSize: "0.65rem",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        <span style={{ color: "var(--bb-dim)" }}>
          {block.title} — CSS Variables
        </span>
        <button
          onClick={() => copy(block.css)}
          className="rounded px-3 py-1 transition-colors"
          style={{
            background: copied ? "var(--bb-accent-15)" : "var(--bb-accent-06)",
            color: copied ? "var(--bb-accent)" : "var(--bb-cream)",
            fontFamily: "var(--font-bb-mono)",
            fontSize: "0.6rem",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            border: "1px solid var(--bb-border)",
          }}
        >
          {copied ? "Copied!" : "Copy CSS"}
        </button>
      </div>
      <pre
        className="overflow-auto"
        style={{
          maxHeight: "400px",
          padding: "1rem 1.25rem",
          margin: 0,
          background: "var(--bb-dark)",
          fontFamily: "var(--font-bb-mono)",
          fontSize: "0.7rem",
          lineHeight: 1.7,
          color: "var(--bb-cream)",
          tabSize: 2,
        }}
      >
        <code>{block.css}</code>
      </pre>
    </div>
  )
}

export function TokenExportPage({ content }: { content: TokenExportContent }) {
  return (
    <>
      <PageHeader
        navLeft={content.header.navLeft}
        navCenter={content.header.navCenter}
        navRight={content.header.navRight}
        title={
          <>
            {content.header.titlePrefix}{" "}
            <span style={{ color: "var(--bb-accent)" }}>
              {content.header.titleAccent}
            </span>
          </>
        }
        subtitle={content.header.subtitle}
        footerLeft={content.header.footerLeft}
        footerCenter={content.header.footerCenter}
        footerRight={content.header.footerRight}
      />
      <main>
        <SectionDivider num="01" label="Instructions" concept="Copy · Paste · Ship" />
        <div className="py-8" style={{ paddingInline: "var(--bb-gutter, 1.5rem)", fontFamily: "var(--font-bb-mono)", fontSize: "0.75rem", lineHeight: 1.8, color: "var(--bb-dim)" }}>
          <ol className="list-decimal list-inside space-y-2" style={{ maxWidth: "40rem" }}>
            {content.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
          <p className="mt-4" style={{ color: "var(--bb-meta)", fontSize: "0.65rem" }}>
            {content.compatibilityNote}
          </p>
        </div>

        {content.blocks.map((block, index) => (
          <div key={block.id}>
            <SectionDivider
              num={String(index + 2).padStart(2, "0")}
              label={`${block.title} Theme`}
              concept={block.edition}
            />
            <ThemePreviewStrip block={block} />
            <CopyableCodeBlock block={block} />
          </div>
        ))}
      </main>
    </>
  )
}
