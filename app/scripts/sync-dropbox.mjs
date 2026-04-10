#!/usr/bin/env node
/**
 * Dropbox → Supabase synchronization script
 *
 * Recursively walks /Drive Clientes in Dropbox and:
 *  1. Creates / updates categories in partnerzone_categories
 *     (preserving the parent_id hierarchy)
 *  2. Creates material records in partnerzone_materials with
 *     file_path = "dropbox:<full path>"
 *
 * Idempotent: re-running will only insert missing items.
 *
 * Usage:
 *   node scripts/sync-dropbox.mjs
 *   node scripts/sync-dropbox.mjs --root "/Drive Clientes/Unyque Pro"   # sync only one folder
 *   node scripts/sync-dropbox.mjs --dry-run                              # don't write to db
 */

import { createClient } from "@supabase/supabase-js"
import { config as loadEnv } from "dotenv"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, "..")

// Load env files
;[".env.local", ".env"].forEach((f) => {
  const p = path.join(ROOT_DIR, f)
  if (existsSync(p)) loadEnv({ path: p })
})

// CLI args
const args = process.argv.slice(2)
const dryRun = args.includes("--dry-run")
const rootIndex = args.indexOf("--root")
const SYNC_ROOT = rootIndex >= 0 ? args[rootIndex + 1] : "/Drive Clientes"

// Env
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const DROPBOX_APP_KEY = process.env.DROPBOX_APP_KEY
const DROPBOX_APP_SECRET = process.env.DROPBOX_APP_SECRET
const DROPBOX_REFRESH_TOKEN = process.env.DROPBOX_REFRESH_TOKEN

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY")
  process.exit(1)
}
if (!DROPBOX_APP_KEY || !DROPBOX_APP_SECRET || !DROPBOX_REFRESH_TOKEN) {
  console.error("❌ Missing DROPBOX_* env vars")
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
})

/* ─────────── Dropbox client ─────────── */

let accessToken = null
let tokenExpiry = 0

async function getAccessToken() {
  if (accessToken && tokenExpiry > Date.now() + 60_000) return accessToken
  const res = await fetch("https://api.dropbox.com/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${DROPBOX_APP_KEY}:${DROPBOX_APP_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: DROPBOX_REFRESH_TOKEN,
    }),
  })
  if (!res.ok) {
    throw new Error(`Dropbox auth failed: ${res.status} ${await res.text()}`)
  }
  const data = await res.json()
  accessToken = data.access_token
  tokenExpiry = Date.now() + data.expires_in * 1000
  return accessToken
}

async function dropboxApi(endpoint, body) {
  const token = await getAccessToken()
  const res = await fetch(`https://api.dropboxapi.com/2${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Dropbox ${endpoint} ${res.status}: ${txt}`)
  }
  return res.json()
}

async function listFolderRecursive(folderPath) {
  const all = []
  let result = await dropboxApi("/files/list_folder", {
    path: folderPath,
    recursive: true,
    include_non_downloadable_files: false,
    limit: 2000,
  })
  all.push(...result.entries)
  while (result.has_more) {
    result = await dropboxApi("/files/list_folder/continue", {
      cursor: result.cursor,
    })
    all.push(...result.entries)
  }
  return all
}

/* ─────────── Helpers ─────────── */

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 200)
}

function getMimeType(filename) {
  const ext = path.extname(filename).toLowerCase().slice(1)
  const map = {
    pdf: "application/pdf",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
    mp4: "video/mp4",
    mov: "video/quicktime",
    avi: "video/x-msvideo",
    mkv: "video/x-matroska",
    mp3: "audio/mpeg",
    wav: "audio/wav",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    zip: "application/zip",
    rar: "application/vnd.rar",
    cdr: "application/vnd.corel-draw",
    ai: "application/postscript",
    psd: "image/vnd.adobe.photoshop",
    txt: "text/plain",
    csv: "text/csv",
  }
  return map[ext] || "application/octet-stream"
}

/* ─────────── Sync logic ─────────── */

const stats = {
  foldersScanned: 0,
  filesScanned: 0,
  categoriesCreated: 0,
  categoriesUpdated: 0,
  materialsCreated: 0,
  materialsSkipped: 0,
  errors: 0,
}

// Cache: dropbox path → category id
const categoryCache = new Map()

async function ensureCategory(dropboxPath, name, parentId, sortOrder) {
  if (categoryCache.has(dropboxPath)) return categoryCache.get(dropboxPath)

  const slug = slugify(dropboxPath.replace(/^\/Drive Clientes\//i, "").replace(/\//g, "-"))

  // Try to find existing
  const { data: existing } = await supabase
    .from("partnerzone_categories")
    .select("id")
    .eq("slug", slug)
    .maybeSingle()

  if (existing) {
    categoryCache.set(dropboxPath, existing.id)
    return existing.id
  }

  if (dryRun) {
    const fakeId = `dry-${slug}`
    categoryCache.set(dropboxPath, fakeId)
    stats.categoriesCreated++
    return fakeId
  }

  const { data: created, error } = await supabase
    .from("partnerzone_categories")
    .insert({
      name,
      slug,
      parent_id: parentId,
      sort_order: sortOrder,
    })
    .select("id")
    .single()

  if (error) {
    console.error(`  ❌ Failed to create category ${name}:`, error.message)
    stats.errors++
    return null
  }

  categoryCache.set(dropboxPath, created.id)
  stats.categoriesCreated++
  return created.id
}

async function ensureMaterial(file, categoryId) {
  // Check if material already exists by file_path
  const filePath = `dropbox:${file.path_display}`

  const { data: existing } = await supabase
    .from("partnerzone_materials")
    .select("id")
    .eq("file_path", filePath)
    .maybeSingle()

  if (existing) {
    stats.materialsSkipped++
    return
  }

  if (dryRun) {
    stats.materialsCreated++
    return
  }

  const title = path.basename(file.name, path.extname(file.name))
  const fileType = getMimeType(file.name)

  const { error } = await supabase.from("partnerzone_materials").insert({
    title,
    description: null,
    category_id: categoryId,
    file_path: filePath,
    file_name: file.name,
    file_size: file.size || 0,
    file_type: fileType,
    is_active: true,
  })

  if (error) {
    console.error(`  ❌ Failed to insert material ${file.name}:`, error.message)
    stats.errors++
    return
  }

  stats.materialsCreated++
}

/* ─────────── Main ─────────── */

async function main() {
  console.log(`\n🚀 Dropbox sync starting`)
  console.log(`   Root: ${SYNC_ROOT}`)
  console.log(`   Dry run: ${dryRun}\n`)

  console.log("📥 Listing Dropbox...")
  const entries = await listFolderRecursive(SYNC_ROOT)
  console.log(`   Found ${entries.length} entries\n`)

  // Group folders first (so parents exist before children)
  const folders = entries
    .filter((e) => e[".tag"] === "folder")
    .sort((a, b) => a.path_display.localeCompare(b.path_display))

  const files = entries.filter((e) => e[".tag"] === "file")

  // Add the SYNC_ROOT itself if it's not /Drive Clientes (treat it as root category)
  // Otherwise we use the folders directly under /Drive Clientes as root categories

  console.log(`📁 Processing ${folders.length} folders...`)
  for (const folder of folders) {
    stats.foldersScanned++
    const segments = folder.path_display.split("/").filter(Boolean)
    // Skip "Drive Clientes" itself
    if (segments[0].toLowerCase() === "drive clientes" && segments.length === 1) continue

    const parentPath = "/" + segments.slice(0, -1).join("/")
    const parentId =
      segments.length === 2 ? null : categoryCache.get(parentPath) || null

    const sortOrder = segments.length === 2 ? stats.foldersScanned : 0

    await ensureCategory(folder.path_display, folder.name, parentId, sortOrder)

    if (stats.foldersScanned % 50 === 0) {
      console.log(`   ${stats.foldersScanned}/${folders.length} folders...`)
    }
  }

  console.log(`\n📄 Processing ${files.length} files...`)
  for (const file of files) {
    stats.filesScanned++
    const parentPath = path.dirname(file.path_display)
    const categoryId = categoryCache.get(parentPath)

    if (!categoryId) {
      // Parent folder wasn't synced (shouldn't happen, but skip)
      console.log(`  ⚠ Skipping ${file.name} - no category for ${parentPath}`)
      continue
    }

    await ensureMaterial(file, categoryId)

    if (stats.filesScanned % 100 === 0) {
      console.log(
        `   ${stats.filesScanned}/${files.length} files (created: ${stats.materialsCreated}, skipped: ${stats.materialsSkipped})`
      )
    }
  }

  console.log("\n✅ Sync complete!\n")
  console.log("📊 Stats:")
  console.log(`   Folders scanned:      ${stats.foldersScanned}`)
  console.log(`   Files scanned:        ${stats.filesScanned}`)
  console.log(`   Categories created:   ${stats.categoriesCreated}`)
  console.log(`   Materials created:    ${stats.materialsCreated}`)
  console.log(`   Materials skipped:    ${stats.materialsSkipped} (already exist)`)
  console.log(`   Errors:               ${stats.errors}`)
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err)
  process.exit(1)
})
