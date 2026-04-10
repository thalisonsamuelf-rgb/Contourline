#!/usr/bin/env node
/**
 * Delete categories that have ZERO materials AND zero children.
 * Repeats until no more orphans exist (to cascade up).
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

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

async function fetchAll(table, select) {
  const all = []
  let offset = 0
  const PAGE = 1000
  while (true) {
    const { data, error } = await supabase
      .from(table)
      .select(select)
      .range(offset, offset + PAGE - 1)
    if (error) throw error
    if (!data || data.length === 0) break
    all.push(...data)
    if (data.length < PAGE) break
    offset += PAGE
  }
  return all
}

async function main() {
  let pass = 0
  while (true) {
    pass++
    console.log(`\n🔁 Pass ${pass}`)

    const [cats, mats] = await Promise.all([
      fetchAll("partnerzone_categories", "id, name, parent_id"),
      fetchAll("partnerzone_materials", "category_id"),
    ])

    console.log(`   Total categories: ${cats.length}`)

    // Categories that have materials
    const catsWithMats = new Set()
    for (const m of mats) {
      if (m.category_id) catsWithMats.add(m.category_id)
    }

    // Categories that are parents of other categories
    const catsWithChildren = new Set()
    for (const c of cats) {
      if (c.parent_id) catsWithChildren.add(c.parent_id)
    }

    // Orphans = no materials AND no children
    const orphans = cats.filter(
      (c) => !catsWithMats.has(c.id) && !catsWithChildren.has(c.id)
    )

    console.log(`   Orphans found:    ${orphans.length}`)

    if (orphans.length === 0) {
      console.log(`\n✅ No more orphans. Final: ${cats.length} categories.`)
      break
    }

    // Delete in chunks
    const ids = orphans.map((c) => c.id)
    let deleted = 0
    for (let i = 0; i < ids.length; i += 200) {
      const chunk = ids.slice(i, i + 200)
      const { error } = await supabase
        .from("partnerzone_categories")
        .delete()
        .in("id", chunk)
      if (!error) deleted += chunk.length
    }
    console.log(`   Deleted:          ${deleted}`)

    if (pass > 20) {
      console.log("⚠  Safety stop after 20 passes")
      break
    }
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
