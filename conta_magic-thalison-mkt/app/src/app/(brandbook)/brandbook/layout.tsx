import type { Metadata } from "next"
import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { BrandbookPageFooter } from "@/components/brandbook/layout/brandbook-page-footer"
import { getAppTenantRuntimeOptions } from "@/lib/tenant/app-runtime"
import { isSurfaceEnabled, loadSiteConfig } from "@/lib/tenant"
import { resolveBrandbookMetadata } from "@/lib/tenant/chrome"
import { loadBrandbookContentAdapter } from "@/lib/tenant/content-adapters"

export async function generateMetadata(): Promise<Metadata> {
  const runtimeOptions = getAppTenantRuntimeOptions()
  const site = await loadSiteConfig(runtimeOptions)

  return resolveBrandbookMetadata(site).metadata
}

export default async function BrandbookPagesLayout({
  children,
}: {
  children: ReactNode
}) {
  const runtimeOptions = getAppTenantRuntimeOptions()

  if (!(await isSurfaceEnabled("brandbook", runtimeOptions))) {
    notFound()
  }

  const brandbookContent = await loadBrandbookContentAdapter(runtimeOptions)

  return (
    <>
      {children}
      <BrandbookPageFooter
        logoLightSrc={brandbookContent.footer.logoLightSrc}
        logoLightAlt={brandbookContent.footer.logoLightAlt}
        metaLine={brandbookContent.footer.metaLine}
      />
    </>
  )
}
