import { Suspense } from "react"
import { notFound } from "next/navigation"
import { getMaterialById, getMaterialVersions } from "@/lib/partnerzone/queries"
import { MaterialDetailClient } from "./material-detail-client"

interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  const material = await getMaterialById(id)
  return {
    title: material ? `${material.title} — PartnerZone` : "Material",
  }
}

async function MaterialData({ id }: { id: string }) {
  const [material, versions] = await Promise.all([
    getMaterialById(id),
    getMaterialVersions(id),
  ])

  if (!material) notFound()

  return <MaterialDetailClient material={material} versions={versions} />
}

export default async function MaterialDetailPage({ params }: Props) {
  const { id } = await params
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="size-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <MaterialData id={id} />
    </Suspense>
  )
}
