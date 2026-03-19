import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { BbMultiLanguageInput } from "./bb-multi-language-input"
import { useState } from "react"

const meta = {
  title: "Molecules/Brandbook/BbMultiLanguageInput",
  component: BbMultiLanguageInput,
  args: {
    value: {},
    onChange: () => {},
    languages: [
      { code: "pt", label: "PT", flag: "🇧🇷" },
      { code: "en", label: "EN", flag: "🇺🇸" },
    ],
  },
} satisfies Meta<typeof BbMultiLanguageInput>

export default meta
type Story = StoryObj<typeof meta>

const twoLanguages = [
  { code: "pt", label: "PT", flag: "🇧🇷" },
  { code: "en", label: "EN", flag: "🇺🇸" },
]

const threeLanguages = [
  { code: "pt", label: "PT", flag: "🇧🇷" },
  { code: "en", label: "EN", flag: "🇺🇸" },
  { code: "es", label: "ES", flag: "🇪🇸" },
]

export const TwoLanguages: Story = {
  args: { languages: twoLanguages, placeholder: "Enter text..." },
  render: function Render(args) {
    const [val, setVal] = useState<Record<string, string>>({ pt: "Olá mundo", en: "" })
    return (
      <div className="max-w-sm">
        <BbMultiLanguageInput {...args} value={val} onChange={setVal} />
      </div>
    )
  },
}

export const ThreeLanguages: Story = {
  args: { languages: threeLanguages, placeholder: "Translate..." },
  render: function Render(args) {
    const [val, setVal] = useState<Record<string, string>>({ pt: "", en: "", es: "" })
    return (
      <div className="max-w-sm">
        <BbMultiLanguageInput {...args} value={val} onChange={setVal} />
      </div>
    )
  },
}

export const TextareaMode: Story = {
  args: { languages: twoLanguages, inputType: "textarea", placeholder: "Enter description..." },
  render: function Render(args) {
    const [val, setVal] = useState<Record<string, string>>({ pt: "Descrição em português", en: "Description in English" })
    return (
      <div className="max-w-md">
        <BbMultiLanguageInput {...args} value={val} onChange={setVal} />
      </div>
    )
  },
}
