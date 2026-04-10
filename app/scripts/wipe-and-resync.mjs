#!/usr/bin/env node
/**
 * Wipes all partnerzone_materials and partnerzone_categories,
 * then runs a fresh sync from Dropbox.
 *
 * Preserves: user_profiles, favorites, downloads (will be cleared because of FK).
 *
 * Usage:
 *   node scripts/wipe-and-resync.mjs --confirm
 */
import { createClient } from "@supabase/supabase-js"
import { config as loadEnv } from "dotenv"
import { existsSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, "..")
;[".env.local", ".env"].forEach((f) => {
  const p = path.join(ROOT_DIR, f)
  if (existsSync(p)) loadEnv({ path: p })
})

if (!process.argv.includes("--confirm")) {
  console.error("❌ Refusing to run without --confirm flag")
  console.error("   This will DELETE all materials and categories.")
  process.exit(1)
}

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function deleteAll(table) {
  // Use a "delete where always-true" trick that works in Supabase
  // We use neq on a column that always exists.
  const { error } = await supabase
    .from(table)
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000")
  if (error) {
    console.error(`\nDelete error in ${table}:`, JSON.stringify(error))
    throw error
  }
  // Verify
  const { count } = await supabase
    .from(table)
    .select("*", { count: "exact", head: true })
  console.log(`  ${table}: cleared (remaining: ${count ?? 0})`)
}

async function main() {
  console.log("🗑  Wiping partnerzone tables...\n")

  // Order matters: child tables first
  await deleteAll("partnerzone_downloads")
  await deleteAll("partnerzone_favorites")
  await deleteAll("partnerzone_material_versions")
  await deleteAll("partnerzone_materials")
  await deleteAll("partnerzone_categories")

  console.log("\n✅ Wipe complete. Run sync next:\n   node scripts/sync-dropbox.mjs\n")
}

main().catch((err) => {
  console.error("❌ Error:", err.message)
  process.exit(1)
})
