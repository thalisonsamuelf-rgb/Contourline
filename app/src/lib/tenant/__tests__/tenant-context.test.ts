import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import path from "node:path"
import {
  getBusinessSlug,
  loadSiteConfig,
  resolveTenantContext,
} from "../index"
import { loadBrandbookContentAdapter } from "../content-adapters/brandbook"

function hasWorkspaceMarkers(candidate: string): boolean {
  return existsSync(path.join(candidate, "businesses"))
}

function findWorkspaceRoot(startDir: string): string {
  let current = path.resolve(startDir)

  while (true) {
    if (hasWorkspaceMarkers(current)) {
      return current
    }

    const nestedWorkspace = path.join(current, "workspace")
    if (hasWorkspaceMarkers(nestedWorkspace)) {
      return nestedWorkspace
    }

    const parent = path.dirname(current)
    if (parent === current) {
      break
    }
    current = parent
  }

  throw new Error(`Unable to resolve workspace root from ${startDir}`)
}

async function withEnv(
  overrides: Partial<
    Record<
      | "STARTER_SOURCE"
      | "STARTER_VARIANT"
      | "BUSINESS_SLUG"
      | "WORKSPACE_ROOT"
      | "NODE_ENV"
      | "CI",
      string | undefined
    >
  >,
  run: () => Promise<void> | void
): Promise<void> {
  const previous = {
    STARTER_SOURCE: process.env.STARTER_SOURCE,
    STARTER_VARIANT: process.env.STARTER_VARIANT,
    BUSINESS_SLUG: process.env.BUSINESS_SLUG,
    WORKSPACE_ROOT: process.env.WORKSPACE_ROOT,
    NODE_ENV: process.env.NODE_ENV,
    CI: process.env.CI,
  }

  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) {
      delete process.env[key]
    } else {
      process.env[key] = value
    }
  }

  try {
    await run()
  } finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) {
        delete process.env[key]
      } else {
        process.env[key] = value
      }
    }
  }
}

async function runTest(name: string, testFn: () => Promise<void>): Promise<void> {
  await testFn()
  console.log(`PASS: ${name}`)
}

const workspaceRoot = findWorkspaceRoot(process.cwd())

async function main(): Promise<void> {
  await runTest(
    "uses starter default locally without BUSINESS_SLUG or WORKSPACE_ROOT",
    async () => {
      await withEnv(
        {
          STARTER_SOURCE: undefined,
          STARTER_VARIANT: undefined,
          NODE_ENV: "production",
          BUSINESS_SLUG: undefined,
          WORKSPACE_ROOT: undefined,
        },
        async () => {
          const site = await loadSiteConfig()
          assert.equal(site.slug, "aiox-starter")
          const context = await resolveTenantContext()
          assert.equal(context.businessSlug, "aiox-starter")
          assert.equal(context.source, "starter")
          assert.equal(context.site.default_theme, "main")
          assert.equal(context.content.brandbook.surface, "brandbook")
        }
      )
    }
  )

  await runTest(
    "loads variant2 locally when STARTER_VARIANT is set",
    async () => {
      await withEnv(
        {
          STARTER_SOURCE: undefined,
          STARTER_VARIANT: "variant2",
          NODE_ENV: "production",
          BUSINESS_SLUG: undefined,
          WORKSPACE_ROOT: undefined,
        },
        async () => {
          const site = await loadSiteConfig()
          const context = await resolveTenantContext()
          const brandbook = await loadBrandbookContentAdapter()
          assert.equal(site.slug, "variant2")
          assert.equal(site.assets.logo_light, "/variants/variant2/logo-light.svg")
          assert.equal(site.surface_registry.brandbook?.enabled, true)
          assert.equal(site.navigation.main[0]?.label, "Brandbook")
          assert.equal(site.features.brandbook_theming, true)
          assert.equal(context.designSystem.id, "variant2")
          assert.equal(
            context.designSystem.themes.main.tokens?.primary,
            "starter/variants/variant2/tokens.css"
          )
          assert.equal(context.designSystem.apps[0]?.root, ".")
          assert.equal(
            (context.designSystem.governance as { fallback_theme?: string } | undefined)
              ?.fallback_theme,
            "main"
          )
          assert.equal(brandbook.navigation.navGroups.length, 3)
          assert.equal(brandbook.tokenExport.blocks[0]?.id, "cyan")
        }
      )
    }
  )

  await runTest(
    "loads variant3 locally with the AIOX preset",
    async () => {
      await withEnv(
        {
          STARTER_SOURCE: undefined,
          STARTER_VARIANT: "variant3",
          NODE_ENV: "production",
          BUSINESS_SLUG: undefined,
          WORKSPACE_ROOT: undefined,
        },
        async () => {
          const site = await loadSiteConfig()
          const context = await resolveTenantContext()
          const brandbook = await loadBrandbookContentAdapter()

          assert.equal(site.slug, "aiox")
          assert.equal(site.assets.logo_light, "/logo/AIOX-White.svg")
          assert.equal(site.surface_registry.brandbook?.enabled, true)
          assert.equal(context.businessSlug, "aiox")
          assert.equal(context.source, "starter")
          assert.equal(context.designSystem.id, "aiox")
          assert.equal(
            context.designSystem.themes.main.tokens?.primary,
            "starter/variants/variant3/tokens.css"
          )
          assert.equal(brandbook.shell.homeAriaLabel, "AIOX Brandbook home")
          assert.equal(brandbook.footer.logoLightSrc, "/logo/AIOX-White.svg")
        }
      )
    }
  )

  await runTest("supports explicit workspace bridge override", async () => {
    await withEnv(
      {
        STARTER_SOURCE: "workspace",
        STARTER_VARIANT: undefined,
        NODE_ENV: "production",
        CI: undefined,
        BUSINESS_SLUG: "aiox",
        WORKSPACE_ROOT: workspaceRoot,
      },
      async () => {
        assert.equal(getBusinessSlug(), "aiox")
        const site = await loadSiteConfig()
        assert.equal(site.slug, "aiox")
        assert.equal(site.assets.logo_light, "/logo/AIOX-White.svg")
      }
    )
  })
}

main().catch((error) => {
  console.error("FAIL: tenant runtime tests")
  console.error(error)
  process.exit(1)
})
