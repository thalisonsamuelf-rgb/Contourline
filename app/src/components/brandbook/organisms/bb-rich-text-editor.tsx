"use client"

import { lazy, useCallback } from "react"
import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import CodeBlock from "@tiptap/extension-code-block"
import { cn } from "@/lib/utils"
import { Toggle } from "@/components/ui/toggle"

export type ToolbarItem =
  | "bold"
  | "italic"
  | "underline"
  | "h1"
  | "h2"
  | "h3"
  | "bulletList"
  | "orderedList"
  | "link"
  | "image"
  | "codeBlock"

const DEFAULT_TOOLBAR: ToolbarItem[] = [
  "bold",
  "italic",
  "h1",
  "h2",
  "bulletList",
  "orderedList",
  "link",
]

export interface BbRichTextEditorProps {
  value: string
  onChange: (html: string) => void
  toolbar?: ToolbarItem[]
  placeholder?: string
  readOnly?: boolean
  className?: string
}

interface ToolbarButtonProps {
  editor: Editor
  item: ToolbarItem
}

function ToolbarButton({ editor, item }: ToolbarButtonProps) {
  const config: Record<ToolbarItem, { label: string; icon: string; action: () => void; isActive: () => boolean }> = {
    bold: {
      label: "Bold",
      icon: "B",
      action: () => { editor.chain().focus().toggleBold().run() },
      isActive: () => editor.isActive("bold"),
    },
    italic: {
      label: "Italic",
      icon: "I",
      action: () => { editor.chain().focus().toggleItalic().run() },
      isActive: () => editor.isActive("italic"),
    },
    underline: {
      label: "Underline",
      icon: "U",
      action: () => { editor.chain().focus().toggleUnderline().run() },
      isActive: () => editor.isActive("underline"),
    },
    h1: {
      label: "Heading 1",
      icon: "H1",
      action: () => { editor.chain().focus().toggleHeading({ level: 1 }).run() },
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    h2: {
      label: "Heading 2",
      icon: "H2",
      action: () => { editor.chain().focus().toggleHeading({ level: 2 }).run() },
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    h3: {
      label: "Heading 3",
      icon: "H3",
      action: () => { editor.chain().focus().toggleHeading({ level: 3 }).run() },
      isActive: () => editor.isActive("heading", { level: 3 }),
    },
    bulletList: {
      label: "Bullet List",
      icon: "•",
      action: () => { editor.chain().focus().toggleBulletList().run() },
      isActive: () => editor.isActive("bulletList"),
    },
    orderedList: {
      label: "Ordered List",
      icon: "1.",
      action: () => { editor.chain().focus().toggleOrderedList().run() },
      isActive: () => editor.isActive("orderedList"),
    },
    link: {
      label: "Link",
      icon: "🔗",
      action: () => {
        const url = window.prompt("URL:")
        if (url) {
          editor.chain().focus().setLink({ href: url }).run()
        }
      },
      isActive: () => editor.isActive("link"),
    },
    image: {
      label: "Image",
      icon: "🖼",
      action: () => {
        const url = window.prompt("Image URL:")
        if (url) {
          editor.chain().focus().setImage({ src: url }).run()
        }
      },
      isActive: () => false,
    },
    codeBlock: {
      label: "Code Block",
      icon: "</>",
      action: () => { editor.chain().focus().toggleCodeBlock().run() },
      isActive: () => editor.isActive("codeBlock"),
    },
  }

  const btn = config[item]
  const active = btn.isActive()

  return (
    <Toggle
      size="sm"
      pressed={active}
      onPressedChange={() => btn.action()}
      aria-label={btn.label}
      className={cn(
        "font-mono text-xs font-bold text-white/60",
        "hover:bg-white/5 hover:text-bb-accent",
        "data-[state=on]:bg-white/10 data-[state=on]:text-bb-accent",
      )}
    >
      {btn.icon}
    </Toggle>
  )
}

export function BbRichTextEditor({
  value,
  onChange,
  toolbar = DEFAULT_TOOLBAR,
  placeholder,
  readOnly = false,
  className,
}: BbRichTextEditorProps) {
  const handleUpdate = useCallback(
    ({ editor }: { editor: Editor }) => {
      const html = editor.getHTML()
      onChange(html === "<p></p>" ? "" : html)
    },
    [onChange],
  )

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: false,
      }),
      Underline,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-bb-accent underline" } }),
      Image,
      CodeBlock,
    ],
    content: value,
    editable: !readOnly,
    onUpdate: handleUpdate,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-invert prose-sm max-w-none min-h-[150px] px-3 py-2 outline-none",
          "prose-headings:text-white prose-p:text-white/80 prose-strong:text-white",
          "prose-a:text-bb-accent prose-code:text-bb-accent prose-code:bg-white/5 prose-code:px-1 prose-code:rounded",
          "prose-li:text-white/80",
        ),
        ...(placeholder ? { "data-placeholder": placeholder } : {}),
      },
    },
  })

  if (!editor) return null

  return (
    <div
      className={cn(
        "rounded-lg border border-bb-border bg-bb-dark overflow-hidden",
        readOnly && "opacity-60 pointer-events-none",
        className,
      )}
    >
      {!readOnly && (
        <div className="flex flex-wrap items-center gap-0.5 px-2 py-1.5 border-b border-bb-border bg-white/[0.02]">
          {toolbar.map((item) => (
            <ToolbarButton key={item} editor={editor} item={item} />
          ))}
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  )
}

export const BbRichTextEditorLazy = lazy(() =>
  import("./bb-rich-text-editor").then((m) => ({ default: m.BbRichTextEditor })),
)
