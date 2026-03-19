import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbFileInput } from "./bb-file-input"

const meta = {
  title: "Molecules/Brandbook/BbFileInput",
  component: BbFileInput,
  args: {
    onUpload: (files) => console.log("Upload:", files),
  },
} satisfies Meta<typeof BbFileInput>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {
  args: {
    accept: ".pdf,.doc,.docx",
  },
}

export const Multiple: Story = {
  args: {
    multiple: true,
    accept: ".pdf,.doc,.docx,.txt",
  },
}

export const ImagePreview: Story = {
  args: {
    accept: "image/*",
    preview: true,
    multiple: true,
  },
}

export const WithMaxSize: Story = {
  args: {
    maxSize: 5 * 1024 * 1024,
    accept: "image/*",
    preview: true,
  },
}
