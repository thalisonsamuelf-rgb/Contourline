import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { useState } from "react"
import { ShowcaseLightbox } from "./bb-lightbox"

const demoImages = [
  {
    file: "showcase-01.jpg",
    title: "Brand Identity Direction",
    desc: "Visual system exploration with high-contrast typography and editorial composition.",
    tags: ["identity", "typography"],
  },
  {
    file: "showcase-02.jpg",
    title: "Digital Product Motion",
    desc: "Interaction sequence for key product transitions and section reveals.",
    tags: ["motion", "ui"],
  },
  {
    file: "showcase-03.jpg",
    title: "Campaign Launch Assets",
    desc: "Cross-channel campaign kit adapted for social, landing page, and paid media.",
    tags: ["campaign", "assets"],
  },
]

function InteractiveLightbox() {
  const [currentIndex, setCurrentIndex] = useState<number | null>(0)

  return (
    <div style={{ minHeight: "80vh", padding: "2rem", background: "var(--bb-dark)" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: "1rem",
          maxWidth: "960px",
          margin: "0 auto 1.5rem",
        }}
      >
        {demoImages.map((image, index) => (
          <button
            key={image.file}
            onClick={() => setCurrentIndex(index)}
            style={{
              border: "1px solid var(--bb-border)",
              background: "var(--bb-surface-panel)",
              color: "var(--bb-cream)",
              fontFamily: "var(--font-bb-mono)",
              fontSize: "0.6rem",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "1.25rem 0.75rem",
              cursor: "pointer",
            }}
          >
            {image.title}
          </button>
        ))}
      </div>

      <ShowcaseLightbox
        images={[...demoImages]}
        basePath="/images/brandbook/showcase"
        currentIndex={currentIndex}
        onClose={() => setCurrentIndex(null)}
        onNavigate={(index) => setCurrentIndex(index)}
      />
    </div>
  )
}

const meta = {
  title: "Organisms/Brandbook/BbLightbox",
  component: ShowcaseLightbox,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ShowcaseLightbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => <InteractiveLightbox />,
  args: {
    images: demoImages,
    basePath: "/images/brandbook/showcase",
    currentIndex: 0,
    onClose: () => {},
    onNavigate: () => {},
  },
}
