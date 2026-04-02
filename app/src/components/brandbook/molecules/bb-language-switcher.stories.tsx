"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { BbLanguageSwitcher } from "./bb-language-switcher"

const meta = {
  title: "Brandbook/Molecules/BbLanguageSwitcher",
  component: BbLanguageSwitcher,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    currentLocale: "pt",
    locales: [
      { code: "pt", label: "Português", flag: "🇧🇷" },
      { code: "en", label: "English", flag: "🇺🇸" },
    ],
    onChange: () => {},
  },
} satisfies Meta<typeof BbLanguageSwitcher>

export default meta
type Story = StoryObj<typeof meta>

function InteractiveWrapper() {
  const [locale, setLocale] = useState("pt")
  return (
    <BbLanguageSwitcher
      currentLocale={locale}
      locales={[
        { code: "pt", label: "Português", flag: "🇧🇷" },
        { code: "en", label: "English", flag: "🇺🇸" },
        { code: "es", label: "Español", flag: "🇪🇸" },
      ]}
      onChange={setLocale}
    />
  )
}

export const Default: Story = {}

export const ThreeLanguages: Story = {
  render: () => <InteractiveWrapper />,
}
