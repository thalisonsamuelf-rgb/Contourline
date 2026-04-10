import { createClient } from "@supabase/supabase-js"
import { config as loadEnv } from "dotenv"
import { existsSync } from "node:fs"
import path from "node:path"
const ROOT = "/Users/thalison/Documents/Claude Code/iacontourline.com/app"
;[".env.local",".env"].forEach(f => { const p = path.join(ROOT,f); if (existsSync(p)) loadEnv({path:p}) })
const sb = createClient(process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {auth:{autoRefreshToken:false,persistSession:false}})
const ignored = ["Manuais do Usuário","Materiais","Fotos","Material Gráfico","Redes Sociais","Renders"]
for (const name of ignored) {
  // Find the category and all descendants, then delete their materials and the categories
  const {data: roots} = await sb.from("partnerzone_categories").select("id").eq("name", name).is("parent_id", null)
  if (!roots || roots.length === 0) { console.log(`${name}: not found as root`); continue }
  const rootId = roots[0].id
  // Collect all descendant ids recursively
  const all = [rootId]
  let queue = [rootId]
  while (queue.length > 0) {
    const {data} = await sb.from("partnerzone_categories").select("id").in("parent_id", queue)
    const ids = (data||[]).map(c=>c.id)
    all.push(...ids)
    queue = ids
  }
  // Delete materials in these categories
  const {error:mErr} = await sb.from("partnerzone_materials").delete().in("category_id", all)
  // Delete categories (in reverse depth order would be ideal, but FK should handle)
  // Go backwards through the list (deepest first)
  const reversed = [...all].reverse()
  let catDel = 0
  for (let i = 0; i < reversed.length; i += 200) {
    const chunk = reversed.slice(i, i+200)
    const {error} = await sb.from("partnerzone_categories").delete().in("id", chunk)
    if (!error) catDel += chunk.length
  }
  console.log(`${name}: deleted ${all.length} categories (${catDel})`)
}
