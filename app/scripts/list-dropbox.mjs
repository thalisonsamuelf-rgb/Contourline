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

async function listAll(token, path) {
  const all = []
  let r = await fetch("https://api.dropboxapi.com/2/files/list_folder", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ path, recursive: true, limit: 2000 }),
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

// Build a tree
const tree = {}
const fileCountByFolder = {}

for (const e of entries) {
  const segs = e.path_display.split("/").filter(Boolean)
  let node = tree
  for (let i = 0; i < segs.length; i++) {
    const seg = segs[i]
    if (!node[seg]) node[seg] = { _files: 0, _children: {} }
    if (i === segs.length - 1 && e[".tag"] === "folder") {
      node = node[seg]._children
    } else if (i === segs.length - 1 && e[".tag"] === "file") {
      // increment file count of parent folder
    } else {
      node = node[seg]._children
    }
  }
}

// Count files per folder by walking paths
for (const f of files) {
  const segs = f.path_display.split("/").filter(Boolean)
  // increment count for all ancestor folders
  let p = ""
  for (let i = 0; i < segs.length - 1; i++) {
    p += "/" + segs[i]
    fileCountByFolder[p] = (fileCountByFolder[p] || 0) + 1
  }
}

// Print as tree
function printNode(node, prefix = "", basePath = "") {
  const keys = Object.keys(node).sort()
  keys.forEach((key, idx) => {
    const isLast = idx === keys.length - 1
    const path = basePath + "/" + key
    const count = fileCountByFolder[path] || 0
    const childCount = Object.keys(node[key]._children).length
    const branch = isLast ? "└─ " : "├─ "
    const childPrefix = isLast ? "   " : "│  "
    console.log(`${prefix}${branch}${key}  ${count > 0 ? `(${count} arquivos${childCount > 0 ? `, ${childCount} subpastas` : ""})` : childCount > 0 ? `(${childCount} subpastas)` : "(vazio)"}`)
    if (childCount > 0 && Object.keys(node[key]._children).length < 20) {
      printNode(node[key]._children, prefix + childPrefix, path)
    } else if (childCount > 0) {
      console.log(`${prefix}${childPrefix}└─ [${childCount} subpastas]`)
    }
  })
}

console.log(`\n📁 /Drive Clientes (${folders.length} pastas, ${files.length} arquivos)\n`)
printNode(tree["Drive Clientes"]?._children || {}, "")

// Stats per top-level folder
console.log("\n📊 RESUMO POR EQUIPAMENTO:\n")
const topFolders = Object.keys(tree["Drive Clientes"]?._children || {}).sort()
for (const top of topFolders) {
  const path = "/Drive Clientes/" + top
  const count = fileCountByFolder[path] || 0
  console.log(`  ${top}: ${count} arquivos`)
}
