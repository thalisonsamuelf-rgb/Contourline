"use client"

import dynamic from "next/dynamic"

const ComponentsPage = dynamic(
  () => import("@/components/brandbook/pages/components-page").then((module) => module.ComponentsPage),
  {
    ssr: false,
    loading: () => <div className="min-h-screen bg-bb-dark" />,
  },
)

export default function Page() {
  return <ComponentsPage />
}
