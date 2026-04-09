import { getCategoriesWithCount } from "@/lib/partnerzone/queries"
import type { Category } from "@/lib/partnerzone/types"
import CategoriesManager from "./categories-manager"

interface CategoryTreeNode extends Category {
  children?: CategoryTreeNode[]
}

function buildTree(categories: Category[]): CategoryTreeNode[] {
  const roots = categories.filter((c) => !c.parent_id)
  return roots.map((root) => ({
    ...root,
    children: categories
      .filter((c) => c.parent_id === root.id)
      .sort((a, b) => a.sort_order - b.sort_order),
  }))
}

export default async function ManageCategoriesPage() {
  let tree: CategoryTreeNode[] = []

  try {
    const categories = await getCategoriesWithCount()
    tree = buildTree(categories)
  } catch {
    // Supabase not configured or query failed — render empty state
  }

  return <CategoriesManager initialCategories={tree} />
}
