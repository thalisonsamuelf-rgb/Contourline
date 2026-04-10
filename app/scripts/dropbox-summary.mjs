import { config as loadEnv } from "dotenv"
import { existsSync } from "node:fs"
import path from "node:path"

const ROOT = "/Users/thalison/Documents/Claude Code/iacontourline.com/app"
;[".env.local", ".env"].forEach((f) => {
  const p = path.join(ROOT, f)
  if (existsSync(p)) loadEnv({ path: p })
})

async function getToken() {
  const res = await fetch("https://api.dropbox.com/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${process.env.DROPBOX_APP_KEY}:${process.env.DROPBOX_APP_SECRET}`).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.DROPBOX_REFRESH_TOKEN,
    }),
  })
  return (await res.json()).access_token
}

async function listAll(token, p) {
  const all = []
  let r = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ path: p, recursive: true, limit: 2000 }),
  }).then((r) => r.json())
  all.push(...r.entries)
  while (r.has_more) {
    r = await fetch("https://api.dropboxapi.com/2/files/list_folder/continue", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ cursor: r.cursor }),
    }).then((r) => r.json())
    all.push(...r.entries)
  }
  return all
}

const token = await getToken()
const entries = await listAll(token, "/Drive Clientes")

const folders = entries.filter((e) => e[".tag"] === "folder")
const files = entries.filter((e) => e[".tag"] === "file")

// Count files per top-level folder (recursive)
const topLevelStats = {}
for (const f of files) {
  const segs = f.path_display.split("/").filter(Boolean)
  if (segs.length >= 2) {
    const top = segs[1]
    topLevelStats[top] = (topLevelStats[top] || { files: 0, totalSize: 0 })
    topLevelStats[top].files++
    topLevelStats[top].totalSize += f.size || 0
  }
}

// Count subfolders per top-level
const subfoldersStats = {}
for (const f of folders) {
  const segs = f.path_display.split("/").filter(Boolean)
  if (segs.length >= 2) {
    const top = segs[1]
    if (!subfoldersStats[top]) subfoldersStats[top] = new Set()
    if (segs.length === 3) subfoldersStats[top].add(segs[2])
  }
}

console.log(`\n📁 /Drive Clientes\n   ${folders.length} pastas total | ${files.length} arquivos total\n`)
console.log("─".repeat(80))
console.log(`${"EQUIPAMENTO".padEnd(40)} ${"ARQUIVOS".padStart(10)} ${"SUBPASTAS".padStart(12)} ${"TAMANHO".padStart(12)}`)
console.log("─".repeat(80))

const sorted = Object.entries(topLevelStats).sort((a, b) => b[1].files - a[1].files)
for (const [name, stats] of sorted) {
  const subs = subfoldersStats[name]?.size || 0
  const sizeMB = (stats.totalSize / 1024 / 1024).toFixed(1)
  console.log(`${name.padEnd(40)} ${String(stats.files).padStart(10)} ${String(subs).padStart(12)} ${(sizeMB + " MB").padStart(12)}`)
}

const totalSize = Object.values(topLevelStats).reduce((a, b) => a + b.totalSize, 0)
console.log("─".repeat(80))
console.log(`${"TOTAL".padEnd(40)} ${String(files.length).padStart(10)} ${String(folders.length).padStart(12)} ${((totalSize / 1024 / 1024 / 1024).toFixed(2) + " GB").padStart(12)}`)
console.log()

// Identify common subfolder patterns
console.log("\n📋 PADRÕES DE ESTRUTURA (subpastas mais comuns no nível 2):\n")
const patternCount = {}
for (const f of folders) {
  const segs = f.path_display.split("/").filter(Boolean)
  if (segs.length === 3) {
    const subName = segs[2]
    patternCount[subName] = (patternCount[subName] || 0) + 1
  }
}
const patterns = Object.entries(patternCount).sort((a, b) => b[1] - a[1]).slice(0, 20)
for (const [name, count] of patterns) {
  console.log(`  ${count.toString().padStart(3)}× ${name}`)
}
