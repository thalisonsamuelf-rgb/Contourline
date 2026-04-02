import assert from "node:assert/strict"
import { loadSiteConfig, isSurfaceEnabled } from "../index"
import {
  filterNavigationLinksBySurface,
  getVisibleSiteNavigation,
  isSurfaceEnabledInRegistry,
} from "../surfaces"

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

async function main(): Promise<void> {
  await runTest("starter surface registry resolves enabled local surfaces", async () => {
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
        assert.equal(isSurfaceEnabledInRegistry(site.surface_registry, "brandbook"), true)
        assert.equal(await isSurfaceEnabled("pitch_deck"), false)
        assert.equal(await isSurfaceEnabled("about"), false)
        assert.equal(await isSurfaceEnabled("cohort"), false)
        assert.equal(await isSurfaceEnabled("workspace"), false)
      }
    )
  })

  await runTest("visible navigation hides disabled surfaces", async () => {
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
        const hiddenRegistry = {
          ...site.surface_registry,
          brandbook: {
            ...site.surface_registry.brandbook,
            enabled: false,
          },
        }

        const visibleNavigation = getVisibleSiteNavigation({
          ...site,
          surface_registry: hiddenRegistry,
        })
        const filteredNavigation = filterNavigationLinksBySurface(
          site.navigation.main,
          hiddenRegistry
        )

        assert.deepEqual(
          visibleNavigation.map((link) => link.surface),
          filteredNavigation.map((link) => link.surface)
        )
        assert.equal(
          visibleNavigation.some((link) => link.surface === "brandbook"),
          false
        )
      }
    )
  })
}

main().catch((error) => {
  console.error("FAIL: surface registry tests")
  console.error(error)
  process.exit(1)
})
