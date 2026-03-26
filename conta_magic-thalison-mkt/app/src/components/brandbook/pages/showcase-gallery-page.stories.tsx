import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { ShowcaseGalleryPage, type ShowcaseImage } from "./showcase-gallery-page"

const tennisImages: ShowcaseImage[] = [
  {
    file: "nike_aiox_airmax.jpg",
    title: "Airmax Neural",
    desc: "Running silhouette with lime contrast.",
    tags: ["tenis", "runner"],
    group: "Performance",
  },
  {
    file: "nike_aiox_af1.jpg",
    title: "AF1 Platform",
    desc: "Street base in dark cockpit palette.",
    tags: ["tenis", "street"],
    group: "Street",
  },
  {
    file: "allstar_aiox_black_lime.jpg",
    title: "Allstar Black Lime",
    desc: "High contrast casual profile.",
    tags: ["casual", "classic"],
    group: "Street",
  },
  {
    file: "sneaker_tactical_aiox.jpg",
    title: "Tactical Hybrid",
    desc: "Utility-focused design with robust sole.",
    tags: ["utility", "tenis"],
    group: "Performance",
  },
  {
    file: "sneaker_nb_aiox.jpg",
    title: "NB Modern",
    desc: "Balanced silhouette for daily wear.",
    tags: ["daily", "runner"],
    group: "Performance",
  },
  {
    file: "sneaker_vans_aiox.jpg",
    title: "Skate Core",
    desc: "Flat profile for lifestyle campaigns.",
    tags: ["street", "skate"],
    group: "Street",
  },
]

const meta = {
  title: "Pages/ShowcaseGalleryPage",
  component: ShowcaseGalleryPage,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    categoryNum: "06",
    categoryLabel: "Tennis Collection",
    categoryTitle: "Brand Showcase",
    categoryDesc: "Curated product visuals for campaign and editorial use",
    images: tennisImages,
    basePath: "/images/tenis",
    gridCols: 3,
    aspectRatio: "3 / 4",
  },
} satisfies Meta<typeof ShowcaseGalleryPage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FourColumns: Story = {
  args: {
    gridCols: 4,
    aspectRatio: "4 / 5",
  },
}

export const JacketsCollection: Story = {
  args: {
    categoryNum: "07",
    categoryLabel: "Jackets Collection",
    categoryTitle: "Outerwear Showcase",
    categoryDesc: "Techwear and tactical jackets",
    basePath: "/images/06_jaquetas",
    images: [
      {
        file: "jacket_techwear_v2.webp",
        title: "Techwear V2",
        tags: ["techwear", "outerwear"],
        group: "Core",
      },
      {
        file: "jacket_windbreaker_v2.webp",
        title: "Windbreaker V2",
        tags: ["windbreaker", "lightweight"],
        group: "Core",
      },
      {
        file: "jacket_softshell_multibolso.webp",
        title: "Softshell Multibolso",
        tags: ["utility", "softshell"],
        group: "Utility",
      },
      {
        file: "jacket_puffer_aiox.webp",
        title: "Puffer AIOX",
        tags: ["winter", "puffer"],
        group: "Utility",
      },
    ],
  },
}
