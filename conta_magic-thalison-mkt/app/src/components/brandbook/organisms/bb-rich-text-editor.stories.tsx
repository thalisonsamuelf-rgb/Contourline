"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { useState } from "react"
import { BbRichTextEditor } from "./bb-rich-text-editor"
import type { ToolbarItem } from "./bb-rich-text-editor"

const noop = () => {}

const meta = {
  title: "Brandbook/Organisms/BbRichTextEditor",
  component: BbRichTextEditor,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: { value: "", onChange: noop },
} satisfies Meta<typeof BbRichTextEditor>

export default meta
type Story = StoryObj<typeof meta>

function RichTextEditorWrapper(props: {
  toolbar?: ToolbarItem[]
  placeholder?: string
  readOnly?: boolean
  initialValue?: string
}) {
  const [value, setValue] = useState(props.initialValue ?? "")
  return (
    <div className="max-w-2xl">
      <BbRichTextEditor
        value={value}
        onChange={setValue}
        toolbar={props.toolbar}
        placeholder={props.placeholder}
        readOnly={props.readOnly}
      />
      {!props.readOnly && (
        <details className="mt-4">
          <summary className="text-xs text-white/40 font-mono cursor-pointer">HTML Output</summary>
          <pre className="mt-2 p-2 rounded bg-white/5 text-xs text-white/60 overflow-auto max-h-40">
            {value || "(empty)"}
          </pre>
        </details>
      )}
    </div>
  )
}

export const MinimalToolbar: Story = {
  render: () => (
    <RichTextEditorWrapper
      toolbar={["bold", "italic", "bulletList"]}
      placeholder="Minimal toolbar — bold, italic, bullet list..."
    />
  ),
}

export const FullToolbar: Story = {
  render: () => (
    <RichTextEditorWrapper
      toolbar={["bold", "italic", "underline", "h1", "h2", "h3", "bulletList", "orderedList", "link", "image", "codeBlock"]}
      placeholder="Full toolbar — all formatting options..."
    />
  ),
}

export const ReadOnly: Story = {
  render: () => (
    <RichTextEditorWrapper
      readOnly
      initialValue="<h2>Read-Only Content</h2><p>This editor is in <strong>read-only</strong> mode. The toolbar is hidden and the content cannot be edited.</p><ul><li>Item one</li><li>Item two</li></ul>"
    />
  ),
}

export const DefaultToolbar: Story = {
  render: () => (
    <RichTextEditorWrapper
      placeholder="Default toolbar — bold, italic, h1, h2, bullet list, ordered list, link..."
    />
  ),
}

export const WithContent: Story = {
  render: () => (
    <RichTextEditorWrapper
      initialValue="<h1>Welcome</h1><p>This is a <strong>rich text editor</strong> built with <a href='https://tiptap.dev'>TipTap</a>.</p><ul><li>Configurable toolbar</li><li>HTML output</li><li>Lazy-loadable</li></ul>"
    />
  ),
}
