// PartnerZone — Type definitions

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  parent_id: string | null
  sort_order: number
  created_at: string
  updated_at: string
  children?: Category[]
  material_count?: number
}

export interface Material {
  id: string
  title: string
  description: string | null
  category_id: string
  file_path: string
  file_name: string
  file_size: number
  file_type: string
  thumbnail_path: string | null
  tags: string[]
  version: number
  is_active: boolean
  uploaded_by: string | null
  download_count: number
  created_at: string
  updated_at: string
  // joined
  category?: Category
  is_favorited?: boolean
}

export interface MaterialVersion {
  id: string
  material_id: string
  version: number
  file_path: string
  file_name: string
  file_size: number
  change_note: string | null
  uploaded_by: string | null
  created_at: string
}

export interface Favorite {
  id: string
  user_id: string
  material_id: string
  created_at: string
}

export interface Download {
  id: string
  user_id: string | null
  material_id: string
  created_at: string
}

export interface UserProfile {
  id: string
  full_name: string | null
  department: string | null
  role: "viewer" | "editor" | "admin"
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export type FileTypeGroup = "pdf" | "image" | "video" | "document" | "spreadsheet" | "presentation" | "other"

export function getFileTypeGroup(mimeType: string): FileTypeGroup {
  if (mimeType === "application/pdf") return "pdf"
  if (mimeType.startsWith("image/")) return "image"
  if (mimeType.startsWith("video/")) return "video"
  if (mimeType.includes("spreadsheet") || mimeType.includes("excel") || mimeType === "text/csv") return "spreadsheet"
  if (mimeType.includes("presentation") || mimeType.includes("powerpoint")) return "presentation"
  if (mimeType.includes("document") || mimeType.includes("word") || mimeType === "text/plain") return "document"
  return "other"
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export function getFileTypeIcon(mimeType: string): string {
  const group = getFileTypeGroup(mimeType)
  const icons: Record<FileTypeGroup, string> = {
    pdf: "FileText",
    image: "Image",
    video: "Video",
    document: "FileText",
    spreadsheet: "Table",
    presentation: "Presentation",
    other: "File",
  }
  return icons[group]
}
