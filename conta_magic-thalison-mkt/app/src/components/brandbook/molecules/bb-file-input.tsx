"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface BbFileInputProps {
  accept?: string
  maxSize?: number
  multiple?: boolean
  onUpload: (files: File[]) => void
  preview?: boolean
  className?: string
}

export function BbFileInput({
  accept,
  maxSize,
  multiple = false,
  onUpload,
  preview = false,
  className,
}: BbFileInputProps) {
  const [files, setFiles] = React.useState<File[]>([])
  const [previews, setPreviews] = React.useState<string[]>([])
  const [dragging, setDragging] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const validateFiles = (incoming: File[]): File[] => {
    setError(null)
    if (maxSize) {
      const oversized = incoming.find((f) => f.size > maxSize)
      if (oversized) {
        setError(`File "${oversized.name}" exceeds ${formatSize(maxSize)}`)
        return []
      }
    }
    return incoming
  }

  const addFiles = (incoming: File[]) => {
    const valid = validateFiles(incoming)
    if (valid.length === 0) return
    const next = multiple ? [...files, ...valid] : valid.slice(0, 1)
    setFiles(next)
    onUpload(next)

    if (preview) {
      const urls = next.map((f) =>
        f.type.startsWith("image/") ? URL.createObjectURL(f) : "",
      )
      setPreviews((prev) => {
        prev.forEach((u) => u && URL.revokeObjectURL(u))
        return urls
      })
    }
  }

  const removeFile = (index: number) => {
    if (previews[index]) URL.revokeObjectURL(previews[index])
    const next = files.filter((_, i) => i !== index)
    setFiles(next)
    setPreviews((p) => p.filter((_, i) => i !== index))
    onUpload(next)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const dropped = Array.from(e.dataTransfer.files)
    addFiles(dropped)
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 rounded border-2 border-dashed p-8 transition-colors",
          dragging
            ? "border-[var(--bb-accent)] bg-[var(--bb-accent)]/5"
            : "border-[var(--bb-border)] bg-[var(--bb-surface)] hover:border-[var(--bb-dim)]",
        )}
      >
        <svg className="h-8 w-8 text-[var(--bb-dim)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <span className="font-bb-mono text-[0.65rem] text-[var(--bb-dim)]">
          {dragging ? "Drop files here" : "Drag & drop or click to browse"}
        </span>
        {accept && (
          <span className="font-bb-mono text-[0.5rem] text-[var(--bb-dim)]">
            Accepted: {accept}
          </span>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => {
            if (e.target.files) addFiles(Array.from(e.target.files))
            e.target.value = ""
          }}
          className="hidden"
        />
      </div>

      {error && (
        <span className="font-bb-mono text-[0.6rem] text-[var(--bb-error)]">{error}</span>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="flex flex-col gap-1.5">
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="flex items-center gap-3 rounded border border-[var(--bb-border)] bg-[var(--bb-surface)] px-3 py-2"
            >
              {preview && previews[i] && (
                <img
                  src={previews[i]}
                  alt={file.name}
                  className="h-10 w-10 rounded object-cover"
                />
              )}
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="truncate font-bb-mono text-[0.65rem] text-[var(--bb-cream)]">
                  {file.name}
                </span>
                <span className="font-bb-mono text-[0.5rem] text-[var(--bb-dim)]">
                  {formatSize(file.size)}
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(i) }}
                className="shrink-0 text-[var(--bb-dim)] transition-colors hover:text-[var(--bb-error)]"
                aria-label={`Remove ${file.name}`}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
