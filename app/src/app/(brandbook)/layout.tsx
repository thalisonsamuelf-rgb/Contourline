import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Suspense, type ReactNode } from "react"
import { BrandbookSiteNavLazy } from "@/components/brandbook/layout/brandbook-site-nav-lazy"
import { BrandbookTracking } from "@/components/analytics/brandbook-tracking"
import { BrandbookThemeRoot } from "@/components/brandbook/theme/brandbook-theme-provider"
import { getAppTenantRuntimeOptions } from "@/lib/tenant/app-runtime"
import {
  loadDesignSystemConfig,
  loadSiteConfig,
  resolveBrandbookThemeContract,
} from "@/lib/tenant"
import { loadBrandbookContentAdapter } from "@/lib/tenant/content-adapters"
import {
  filterNavigationLinksBySurface,
  isSurfaceEnabledInRegistry,
} from "@/lib/tenant/surfaces"
import "../tenant-tokens.generated.css"

export default async function BrandbookLayout({ children }: { children: ReactNode }) {
  const runtimeOptions = getAppTenantRuntimeOptions()
  const [site, designSystem] = await Promise.all([
    loadSiteConfig(runtimeOptions),
    loadDesignSystemConfig(runtimeOptions),
  ])
  const brandbookContent = await loadBrandbookContentAdapter(runtimeOptions)
  const visibleTopNavLinks = filterNavigationLinksBySurface(
    brandbookContent.navigation.topNavLinks,
    site.surface_registry
  )
  const themeContract = resolveBrandbookThemeContract({ site, designSystem })
  const visibleNavGroups = isSurfaceEnabledInRegistry(
    site.surface_registry,
    "brandbook"
  )
    ? brandbookContent.navigation.navGroups
    : []

  return (
    <BrandbookThemeRoot
      className={`brandbook-root ${GeistSans.variable} ${GeistMono.variable}`}
      contract={themeContract}
    >
      <BrandbookSiteNavLazy
        topNavLinks={visibleTopNavLinks}
        navGroups={visibleNavGroups}
        homeHref={brandbookContent.shell.homeHref}
        homeAriaLabel={brandbookContent.shell.homeAriaLabel}
        logoLightSrc={brandbookContent.shell.logoLightSrc}
        logoLightAlt={brandbookContent.shell.logoLightAlt}
      />
      <Suspense>
        <BrandbookTracking />
      </Suspense>
      {children}
    </BrandbookThemeRoot>
  )
}
