import type { Metadata } from "next"
import { TokenExportPage } from "@/components/brandbook/pages/token-export-page"
import { getAppTenantRuntimeOptions } from "@/lib/tenant/app-runtime"
import { loadBrandbookContentAdapter } from "@/lib/tenant/content-adapters"
import { loadSiteConfig } from "@/lib/tenant"

export async function generateMetadata(): Promise<Metadata> {
  const runtimeOptions = getAppTenantRuntimeOptions()
  const site = await loadSiteConfig(runtimeOptions)

  return {
    title: "Token Export",
    description: `Copy ${site.name} design tokens as CSS for Tailwind + shadcn/ui projects`,
  }
}

export default async function Page() {
  const brandbookContent = await loadBrandbookContentAdapter(
    getAppTenantRuntimeOptions()
  )

  return <TokenExportPage content={brandbookContent.tokenExport} />
}
