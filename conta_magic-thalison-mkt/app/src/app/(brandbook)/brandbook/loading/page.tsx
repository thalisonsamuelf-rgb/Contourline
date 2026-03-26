import { Suspense } from "react"
import { LoadingPage } from "@/components/brandbook/pages/loading-page"


export default function Page() {
  return (
    <Suspense fallback={null}>
      <LoadingPage />
    </Suspense>
  )
}
