#!/usr/bin/env node
/**
 * Backup full partnerzone tables to JSON files.
 */
import { createClient } from "@supabase/supabase-js"
import { config as loadEnv } from "dotenv"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, "..")
;[".env.local", ".env"].forEach((f) => {
  const p = path.join(ROOT_DIR, f)
  if (existsSync(p)) loadEnv({ path: p })
})

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function fetchAll(table) {
  const all = []
  const pageSize = 1000
  let offset = 0
  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .range(offset, offset + pageSize - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    if (data.length < pageSize) break
    offset += pageSize
    process.stdout.write(`\r  ${table}: ${all.length} rows...`)
  }
  process.stdout.write(`\r  ${table}: ${all.length} rows ✓\n`)
  return all
}

async function main() {
  const backupDir = path.join(ROOT_DIR, "backups")
  if (!existsSync(backupDir)) mkdirSync(backupDir)

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)
  const dir = path.join(backupDir, `backup-${timestamp}`)
  mkdirSync(dir)

  console.log(`📦 Backing up to ${dir}\n`)

  for (const table of [
    "partnerzone_categories",
    "partnerzone_materials",
    "partnerzone_favorites",
    "partnerzone_downloads",
    "partnerzone_user_profiles",
    "partnerzone_material_versions",
  ]) {
    try {
      const data = await fetchAll(table)
      writeFileSync(path.join(dir, `${table}.json`), JSON.stringify(data, null, 2))
    } catch (err) {
      console.log(`  ${table}: ❌ ${err.message}`)
    }
  }

  console.log(`\n✅ Backup complete: ${dir}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
