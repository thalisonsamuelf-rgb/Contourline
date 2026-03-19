"use client"

import dynamic from "next/dynamic"

const FormsPage = dynamic(
  () => import("@/components/brandbook/pages/forms-page").then((module) => module.FormsPage),
  {
    ssr: false,
    loading: () => <div className="min-h-screen bg-bb-dark" />,
  },
)

export default function Page() {
  return <FormsPage />
}
