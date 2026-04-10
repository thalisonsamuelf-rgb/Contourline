#!/usr/bin/env node
/**
 * Reorganizes partnerzone categories into a uniform structure based on Unyque Pro pattern.
 *
 * For each equipment, creates this structure:
 *
 *   {Equipamento}/
 *   ├─ Materiais Apoio de marketing/
 *   │  ├─ Branding/
 *   │  │  ├─ Contourline & Bodyhealth/
 *   │  │  │  ├─ Logos/
 *   │  │  │  │  ├─ Body health/
 *   │  │  │  │  └─ Contourline/
 *   │  │  │  ├─ Manual de Aplicação & Cores/
 *   │  │  │  └─ Tipografia/
 *   │  │  │     ├─ Axiforma/
 *   │  │  │     ├─ Montserrat/
 *   │  │  │     └─ Nature beauty/
 *   │  │  └─ Equipamento/
 *   │  │     └─ Logos/
 *   │  ├─ Documentos/
 *   │  ├─ Imagens/
 *   │  │  ├─ Fotos/
 *   │  │  │  └─ Equipamento/
 *   │  │  │     ├─ Sem fundo/
 *   │  │  │     └─ Studio/
 *   │  │  └─ Resultados/
 *   │  │     ├─ Fotos Antes e Depois - Somente imagens/
 *   │  │     └─ Moldura Padronizada Med - Contourline/
 *   │  ├─ Materiais Gráficos/
 *   │  │  ├─ Folder/
 *   │  │  └─ Mídia Social/
 *   │  ├─ Outros/
 *   │  └─ Videos/
 *   │     └─ Depoimentos/
 *   └─ Termos e Manuais/
 *
 * What it does:
 *  1. Identifies the unique top-level equipments (merging AdellaLED1 + Adella Led)
 *  2. Wipes ALL categories
 *  3. Creates the standard tree for each equipment
 *  4. Re-classifies each material into the correct subfolder using filename heuristics
 *  5. Updates each material's category_id (file_path stays the same — Dropbox is untouched)
 *
 * Usage:
 *   node scripts/reorganize-categories.mjs --dry-run
 *   node scripts/reorganize-categories.mjs --confirm
 */

import { createClient } from "@supabase/supabase-js"
import { config as loadEnv } from "dotenv"
import { existsSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT_DIR = path.resolve(__dirname, "..")
;[".env.local", ".env"].forEach((f) => {
  const p = path.join(ROOT_DIR, f)
  if (existsSync(p)) loadEnv({ path: p })
})

const args = process.argv.slice(2)
const dryRun = args.includes("--dry-run") || !args.includes("--confirm")

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
)

/* ─────────── Equipment merge map ─────────── */

// Maps Dropbox top-level folder name → canonical equipment name
const equipmentMergeMap = {
  // Adella Led merge
  "Adella Led": "Adella Led",
  "ADELLA LED": "Adella Led",
  "AdellaLED1": "Adella Led",
  // Adella Laser stays separate
  "Adella Laser": "Adella Laser",
  "ADELLA LASER": "Adella Laser",
  // Body Health Portugal: 1 file only — keep separate
  "Body Health Portugal": "Body Health Portugal",
  "BODY HEALTH PORTUGAL": "Body Health Portugal",
  // ULTRALIFT
  "UltraLift": "UltraLift",
  "ULTRALIFT DUO": "UltraLift",
}

// Generic equipments to ignore (not real equipment, generic content)
const ignoredCategories = new Set([
  "Fotos",
  "Manuais do Usuário",
  "Materiais",
  "Material Gráfico",
  "Redes Sociais",
  "Renders",
])

function canonicalEquipment(name) {
  if (equipmentMergeMap[name]) return equipmentMergeMap[name]
  return name
}

/* ─────────── Standard tree structure ─────────── */

// Defines the tree as nested objects (key = folder name, value = children)
const standardTree = {
  "Materiais Apoio de marketing": {
    "Branding": {
      "Contourline & Bodyhealth": {
        "Logos": {
          "Body health": {},
          "Contourline": {},
        },
        "Manual de Aplicação & Cores": {},
        "Tipografia": {
          "Axiforma": {},
          "Montserrat": {},
          "Nature beauty": {},
        },
      },
      "Equipamento": {
        "Logos": {},
      },
    },
    "Documentos": {},
    "Imagens": {
      "Fotos": {
        "Equipamento": {
          "Sem fundo": {},
          "Studio": {},
        },
      },
      "Resultados": {
        "Fotos Antes e Depois - Somente imagens": {},
        "Moldura Padronizada Med - Contourline": {},
      },
    },
    "Materiais Gráficos": {
      "Folder": {},
      "Mídia Social": {},
    },
    "Outros": {},
    "Videos": {
      "Depoimentos": {},
    },
  },
  "Termos e Manuais": {},
}

/* ─────────── File classification heuristics ─────────── */

function slugify(str) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 200)
}

function classifyFile(material) {
  const name = (material.title + " " + material.file_name).toLowerCase()
  const ext = path.extname(material.file_name).toLowerCase().slice(1)
  const fullPath = (material.file_path || "")
  const lowerPath = fullPath.toLowerCase()

  // Get the segments of the original Dropbox folder path (after equipment name)
  const segments = fullPath.replace(/^dropbox:/, "").split("/").filter(Boolean)
  // segments[0] = "Drive Clientes", segments[1] = equipment, segments[2..n-1] = subfolders
  const subFolders = segments.slice(2, -1).map((s) => s.toLowerCase())
  const subFoldersJoined = subFolders.join("/")

  // ╔══════════════════════════════════════════════════════════
  // ║ 1. TERMOS E MANUAIS (top-level, sibling of Materiais Apoio)
  // ╚══════════════════════════════════════════════════════════
  if (
    /(?:^|\/)termos[-\s]?e[-\s]?manua/i.test(subFoldersJoined) ||
    /(?:^|\/)manuais/i.test(subFoldersJoined) ||
    /\b(manual\s+do\s+usu[aá]rio|manual\s+de\s+forma[cç][aã]o|manual\s+de\s+aplica)\b/i.test(name) ||
    /\b(ficha[-\s]?t[eé]cnica|guia[-\s]?r[aá]pido|termo[-\s]?de[-\s]?(consentimento|ci[eê]ncia|responsabilidade))\b/i.test(name) ||
    /\binstala[cç][aã]o\b/i.test(name)
  ) {
    return ["Termos e Manuais"]
  }

  // ╔══════════════════════════════════════════════════════════
  // ║ 2. VIDEOS
  // ╚══════════════════════════════════════════════════════════
  if (
    ["mp4", "mov", "avi", "mkv", "wmv", "webm", "m4v", "3gp"].includes(ext) ||
    /(?:^|\/)v[ií]deos?(?:\/|$)/i.test(subFoldersJoined)
  ) {
    if (
      /depoiment|testimonial/i.test(name) ||
      subFoldersJoined.includes("depoiment")
    ) {
      return ["Materiais Apoio de marketing", "Videos", "Depoimentos"]
    }
    return ["Materiais Apoio de marketing", "Videos"]
  }

  // ╔══════════════════════════════════════════════════════════
  // ║ 3. BRANDING - Tipografia (specific font folders)
  // ╚══════════════════════════════════════════════════════════
  if (subFoldersJoined.includes("axiforma") || /axiforma/i.test(name)) {
    return ["Materiais Apoio de marketing", "Branding", "Contourline & Bodyhealth", "Tipografia", "Axiforma"]
  }
  if (subFoldersJoined.includes("montserrat") || /montserrat/i.test(name)) {
    return ["Materiais Apoio de marketing", "Branding", "Contourline & Bodyhealth", "Tipografia", "Montserrat"]
  }
  if (subFoldersJoined.includes("nature beauty") || /nature[-_\s]?beauty/i.test(name)) {
    return ["Materiais Apoio de marketing", "Branding", "Contourline & Bodyhealth", "Tipografia", "Nature beauty"]
  }
  if (subFoldersJoined.includes("tipografia")) {
    return ["Materiais Apoio de marketing", "Branding", "Contourline & Bodyhealth", "Tipografia", "Axiforma"]
  }

  // ╔══════════════════════════════════════════════════════════
  // ║ 4. BRANDING - Manual de Aplicação & Cores
  // ╚══════════════════════════════════════════════════════════
  if (
    subFoldersJoined.includes("manual de aplica") ||
    subFoldersJoined.includes("manual de cores") ||
    /manual\s+de\s+cores/i.test(name)
  ) {
    return ["Materiais Apoio de marketing", "Branding", "Contourline & Bodyhealth", "Manual de Aplicação & Cores"]
  }

  // ╔══════════════════════════════════════════════════════════
  // ║ 5. BRANDING - Logos
  // ╚══════════════════════════════════════════════════════════
  const isInLogosFolder = /(?:^|\/)logos?(?:\/|$)/i.test(subFoldersJoined)
  const isLogoFile = /\b(logo|logotipo)\b/i.test(name)

  if (isInLogosFolder || isLogoFile) {
    if (
      /body[-_\s]?health|bodyhealth/i.test(name) ||
      subFoldersJoined.includes("body health") ||
      subFoldersJoined.includes("bodyhealth")
    ) {
      return ["Materiais Apoio de marketing", "Branding", "Contourline & Bodyhealth", "Logos", "Body health"]
    }
    if (/contourline/i.test(name) || subFoldersJoined.includes("contourline")) {
      return ["Materiais Apoio de marketing", "Branding", "Contourline & Bodyhealth", "Logos", "Contourline"]
    }
    return ["Materiais Apoio de marketing", "Branding", "Equipamento", "Logos"]
  }

  // ╔══════════════════════════════════════════════════════════
  // ║ 6. IMAGENS - Resultados (antes e depois)
  // ╚══════════════════════════════════════════════════════════
  if (
    /antes[-_\s]?e?[-_\s]?depois|antes\s*x\s*depois|resultado/i.test(subFoldersJoined) ||
    /antes[-_\s]?e?[-_\s]?depois/i.test(name)
  ) {
    if (subFoldersJoined.includes("moldura")) {
      return ["Materiais Apoio de marketing", "Imagens", "Resultados", "Moldura Padronizada Med - Contourline"]
    }
    return ["Materiais Apoio de marketing", "Imagens", "Resultados", "Fotos Antes e Depois - Somente imagens"]
  }

  // ╔══════════════════════════════════════════════════════════
  // ║ 7. IMAGENS - Fotos do Equipamento
  // ╚══════════════════════════════════════════════════════════
  const imageExts = ["jpg", "jpeg", "png", "webp", "gif", "bmp", "tiff", "tif", "cr2", "cr3", "nef", "arw", "raw", "heic", "heif"]
  const isImage = imageExts.includes(ext)

  if (
    isImage ||
    /(?:^|\/)(fotos?|imagens?|img|images?|renders?)(?:\/|$)/i.test(subFoldersJoined) ||
    subFoldersJoined.includes("fotos equipamento") ||
    subFoldersJoined.includes("foto equipamento")
  ) {
    if (subFoldersJoined.includes("sem fundo") || subFoldersJoined.includes("sin fondo")) {
      return ["Materiais Apoio de marketing", "Imagens", "Fotos", "Equipamento", "Sem fundo"]
    }
    if (
      subFoldersJoined.includes("studio") ||
      subFoldersJoined.includes("stúdio") ||
      subFoldersJoined.includes("estudio") ||
      subFoldersJoined.includes("estúdio")
    ) {
      return ["Materiais Apoio de marketing", "Imagens", "Fotos", "Equipamento", "Studio"]
    }
    return ["Materiais Apoio de marketing", "Imagens", "Fotos", "Equipamento"]
  }

  // ╔══════════════════════════════════════════════════════════
  // ║ 8. MATERIAIS GRÁFICOS - Mídia Social
  // ╚══════════════════════════════════════════════════════════
  if (
    /(?:^|\/)(midia[-\s]?social|m[ií]dia[-\s]?social|social[-\s]?media|posts?|stories?|reels)(?:\/|$)/i.test(subFoldersJoined) ||
    /\b(post|story|stories|reels|instagram|facebook|whats(?:app)?)\b/i.test(name)
  ) {
    return ["Materiais Apoio de marketing", "Materiais Gráficos", "Mídia Social"]
  }

  // ╔══════════════════════════════════════════════════════════
  // ║ 9. MATERIAIS GRÁFICOS - Folder
  // ╚══════════════════════════════════════════════════════════
  if (
    /(?:^|\/)folders?(?:\/|$)/i.test(subFoldersJoined) ||
    /(?:^|\/)materiais[-\s]?(impressos?|gr[aá]ficos?)(?:\/|$)/i.test(subFoldersJoined) ||
    /\b(folder|cat[aá]logo|brochura|panfleto|banner|outdoor|flyer)\b/i.test(name)
  ) {
    return ["Materiais Apoio de marketing", "Materiais Gráficos", "Folder"]
  }

  // ╔══════════════════════════════════════════════════════════
  // ║ 10. DOCUMENTOS - PDFs científicos / apresentações / artigos
  // ╚══════════════════════════════════════════════════════════
  if (
    ext === "pdf" ||
    ext === "doc" || ext === "docx" || ext === "ppt" || ext === "pptx" ||
    /(?:^|\/)(documentos?|materiais[-\s]?cient[ií]ficos?|apresenta|seminario|seminário|cient[ií]fic|embasamento|estudos?|artigos?|papers?)(?:\/|$)/i.test(subFoldersJoined)
  ) {
    return ["Materiais Apoio de marketing", "Documentos"]
  }

  // ╔══════════════════════════════════════════════════════════
  // ║ 11. Default: Outros
  // ╚══════════════════════════════════════════════════════════
  return ["Materiais Apoio de marketing", "Outros"]
}

/* ─────────── Helpers ─────────── */

async function fetchAllPaginated(table, select = "*") {
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

/* ─────────── Main reorganization ─────────── */

async function main() {
  console.log(`\n🔄 Category Reorganization`)
  console.log(`   Mode: ${dryRun ? "DRY RUN" : "LIVE"}\n`)

  // Step 1: Load all current categories and materials
  console.log("📥 Loading current state...")
  const allCategories = await fetchAllPaginated(
    "partnerzone_categories",
    "id, name, slug, parent_id"
  )
  const allMaterials = await fetchAllPaginated(
    "partnerzone_materials",
    "id, title, file_name, file_path, file_type, category_id"
  )
  console.log(`   ${allCategories.length} categories`)
  console.log(`   ${allMaterials.length} materials\n`)

  // Step 2: Determine which top-level equipment each material belongs to
  // by parsing file_path: dropbox:/Drive Clientes/{Equipamento}/...
  const materialsByEquipment = new Map()
  let unmatched = 0

  for (const m of allMaterials) {
    if (!m.file_path) {
      unmatched++
      continue
    }
    const stripped = m.file_path.replace(/^dropbox:/, "")
    const segments = stripped.split("/").filter(Boolean)
    // expected: ["Drive Clientes", "Equipamento", ...]
    if (segments[0] !== "Drive Clientes" || segments.length < 2) {
      unmatched++
      continue
    }
    const rawEquipment = segments[1]
    if (ignoredCategories.has(rawEquipment)) {
      unmatched++
      continue
    }
    const canonical = canonicalEquipment(rawEquipment)
    if (!materialsByEquipment.has(canonical)) {
      materialsByEquipment.set(canonical, [])
    }
    materialsByEquipment.get(canonical).push(m)
  }

  console.log(`📦 Equipments detected: ${materialsByEquipment.size}`)
  console.log(`   Unmatched materials:  ${unmatched}\n`)

  const sortedEquipments = [...materialsByEquipment.keys()].sort()
  for (const eq of sortedEquipments) {
    console.log(`   ${eq}: ${materialsByEquipment.get(eq).length} files`)
  }

  // Step 3: Classify each material into the standard tree
  console.log("\n🏷  Classifying materials...")
  const classification = new Map() // material_id → { equipment, path: [] }
  const subfolderStats = new Map() // "Equipment > path" → count

  for (const [eq, mats] of materialsByEquipment) {
    for (const m of mats) {
      const folderPath = classifyFile(m)
      classification.set(m.id, { equipment: eq, path: folderPath })
      const key = `${eq} > ${folderPath.join(" > ")}`
      subfolderStats.set(key, (subfolderStats.get(key) ?? 0) + 1)
    }
  }

  // Step 4: Show classification preview
  console.log("\n📊 Classification preview (top 30):")
  const topStats = [...subfolderStats.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
  for (const [key, count] of topStats) {
    console.log(`   ${count.toString().padStart(5)} ${key}`)
  }

  if (dryRun) {
    // Save full classification to file for review
    const previewFile = path.join(ROOT_DIR, "backups", "reorg-preview.json")
    const allStats = [...subfolderStats.entries()].sort((a, b) => b[1] - a[1])
    writeFileSync(
      previewFile,
      JSON.stringify(
        {
          equipments: sortedEquipments,
          materialsByEquipment: Object.fromEntries(
            sortedEquipments.map((eq) => [
              eq,
              materialsByEquipment.get(eq).length,
            ])
          ),
          unmatched,
          subfolderStats: allStats.map(([key, count]) => ({ key, count })),
        },
        null,
        2
      )
    )
    console.log(`\n📝 Preview saved: ${previewFile}`)
    console.log("\n💡 Run with --confirm to apply changes\n")
    return
  }

  // ── LIVE MODE ──
  console.log("\n⚠  LIVE MODE - Applying changes...\n")

  // Strategy: create new categories alongside the old ones, then update materials,
  // then delete old categories.
  //
  // To avoid slug conflicts, prefix new categories with "v2-" temporarily,
  // then rename after old ones are deleted. Actually simpler: use unique suffixes
  // and rename after.

  // Step 5: Create new structure for each equipment (with temp suffix on slugs)
  console.log("🏗  Creating new category tree...")
  const categoryIds = new Map() // "Equipment > Sub > Sub" → id
  const newCategoryIdsList = [] // for cleanup if needed

  async function createCategory(name, parentId, sortOrder, fullKey) {
    // Use unique slug with timestamp to avoid clashing with existing
    const slug = `_new_${slugify(fullKey)}`.slice(0, 200)
    const { data, error } = await supabase
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
      console.error(`   ❌ Failed: ${fullKey}: ${error.message}`)
      return null
    }
    categoryIds.set(fullKey, data.id)
    newCategoryIdsList.push(data.id)
    return data.id
  }

  async function createTreeRecursive(tree, parentId, parentKey, sortOrder = 0) {
    let i = 0
    for (const [name, children] of Object.entries(tree)) {
      const fullKey = parentKey ? `${parentKey} > ${name}` : name
      const id = await createCategory(name, parentId, sortOrder + i, fullKey)
      if (id && Object.keys(children).length > 0) {
        await createTreeRecursive(children, id, fullKey, 0)
      }
      i++
    }
  }

  let eqIndex = 0
  for (const eq of sortedEquipments) {
    eqIndex++
    process.stdout.write(`\r   ${eqIndex}/${sortedEquipments.length} ${eq.padEnd(40)}`)
    const rootId = await createCategory(eq, null, eqIndex, eq)
    if (!rootId) continue
    await createTreeRecursive(standardTree, rootId, eq)
  }
  console.log(`\n   ✓ ${newCategoryIdsList.length} new categories created\n`)

  // Step 6: Update each material's category_id (in batches by category to be fast)
  console.log("📝 Re-assigning materials to new categories...")

  // Group materials by target category for batch updates
  const byTargetCat = new Map() // newCatId → [materialIds]
  let unassignable = 0
  for (const [materialId, { equipment, path: folderPath }] of classification) {
    const fullKey = `${equipment} > ${folderPath.join(" > ")}`
    const newCategoryId = categoryIds.get(fullKey)
    if (!newCategoryId) {
      unassignable++
      continue
    }
    if (!byTargetCat.has(newCategoryId)) byTargetCat.set(newCategoryId, [])
    byTargetCat.get(newCategoryId).push(materialId)
  }

  let updated = 0
  let errors = 0
  for (const [newCatId, materialIds] of byTargetCat) {
    // Batch in chunks of 200 to avoid URL length issues
    for (let i = 0; i < materialIds.length; i += 200) {
      const chunk = materialIds.slice(i, i + 200)
      const { error } = await supabase
        .from("partnerzone_materials")
        .update({ category_id: newCatId })
        .in("id", chunk)
      if (error) {
        console.error(`   ❌ Update error: ${error.message}`)
        errors += chunk.length
      } else {
        updated += chunk.length
      }
      process.stdout.write(`\r   ${updated} materials updated...`)
    }
  }
  console.log(`\r   ✓ ${updated} materials updated, ${errors} errors, ${unassignable} unassignable\n`)

  // Step 7: Delete OLD categories (those that don't belong to the new tree)
  console.log("🗑  Deleting old categories...")
  const newIdSet = new Set(newCategoryIdsList)
  // Fetch all current category ids
  const { data: allCats } = await supabase
    .from("partnerzone_categories")
    .select("id")
  const oldIds = (allCats ?? []).filter((c) => !newIdSet.has(c.id)).map((c) => c.id)

  // Delete in chunks
  let deletedCats = 0
  for (let i = 0; i < oldIds.length; i += 200) {
    const chunk = oldIds.slice(i, i + 200)
    const { error } = await supabase
      .from("partnerzone_categories")
      .delete()
      .in("id", chunk)
    if (!error) deletedCats += chunk.length
  }
  console.log(`   ✓ ${deletedCats} old categories deleted\n`)

  // Step 8: Rename slugs from "_new_..." to clean version
  console.log("🏷  Renaming new category slugs...")
  let renamed = 0
  for (const [fullKey, catId] of categoryIds) {
    const cleanSlug = slugify(fullKey)
    const { error } = await supabase
      .from("partnerzone_categories")
      .update({ slug: cleanSlug })
      .eq("id", catId)
    if (!error) renamed++
  }
  console.log(`   ✓ ${renamed} categories renamed\n`)

  // Final summary
  const { count: finalCatCount } = await supabase
    .from("partnerzone_categories")
    .select("*", { count: "exact", head: true })
  const { count: finalMatCount } = await supabase
    .from("partnerzone_materials")
    .select("*", { count: "exact", head: true })

  console.log("✅ Reorganization complete!\n")
  console.log("📊 Final state:")
  console.log(`   Categories: ${finalCatCount}`)
  console.log(`   Materials:  ${finalMatCount}`)
  console.log(`   Updated:    ${updated}`)
  console.log(`   Errors:     ${errors}\n`)
}

main().catch((err) => {
  console.error("\n❌ Fatal error:", err)
  process.exit(1)
})
