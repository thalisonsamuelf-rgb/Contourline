import { getMaterials } from "@/lib/partnerzone/queries"
import MaterialsTable from "./materials-table"

export default async function ManageMaterialsPage() {
  const { data: materials, count } = await getMaterials({
    limit: 100,
    orderBy: "created_at",
    order: "desc",
  })

  return <MaterialsTable materials={materials} totalCount={count} />
}
