import { getCategories } from "@/lib/partnerzone/queries"
import type { Category } from "@/lib/partnerzone/types"
import CoversManager from "./covers-manager"

export default async function CoversPage() {
  let rootCategories: Category[] = []

  try {
    const all = await getCategories()
    rootCategories = all.filter((c) => !c.parent_id).sort((a, b) => a.sort_order - b.sort_order)
  } catch {
    // Supabase not configured or query failed
  }

  return <CoversManager categories={rootCategories} />
}
