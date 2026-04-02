import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbWorldMap } from "./bb-world-map"

const meta = {
  title: "Organisms/Brandbook/BbWorldMap",
  component: BbWorldMap,
  parameters: { layout: "padded" },
} satisfies Meta<typeof BbWorldMap>

export default meta
type Story = StoryObj<typeof meta>

const sampleMarkers = [
  { coordinates: [-43.17, -22.91] as [number, number], label: "Rio de Janeiro", value: "1.2K users" },
  { coordinates: [-46.63, -23.55] as [number, number], label: "São Paulo", value: "3.4K users" },
  { coordinates: [-73.94, 40.67] as [number, number], label: "New York", value: "890 users" },
  { coordinates: [-0.12, 51.51] as [number, number], label: "London", value: "650 users" },
  { coordinates: [139.69, 35.69] as [number, number], label: "Tokyo", value: "420 users" },
]

export const NoMarkers: Story = {
  args: {
    markers: [],
    height: 400,
  },
}

export const WithMarkers: Story = {
  args: {
    markers: sampleMarkers,
    height: 400,
  },
}

export const Zoomable: Story = {
  args: {
    markers: sampleMarkers,
    zoomable: true,
    height: 450,
  },
}

export const MercatorProjection: Story = {
  args: {
    markers: sampleMarkers,
    projectionType: "geoMercator",
    height: 400,
  },
}
