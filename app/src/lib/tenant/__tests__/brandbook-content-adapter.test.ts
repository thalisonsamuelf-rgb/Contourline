import assert from "node:assert/strict"
import {
  __resetBrandbookFallbackWarningsForTest,
  loadBrandbookContentAdapter,
} from "../content-adapters/brandbook"

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
  await runTest("brandbook adapter resolves starter default shell and token export content", async () => {
    await withEnv(
      {
        STARTER_SOURCE: undefined,
        STARTER_VARIANT: undefined,
        NODE_ENV: "production",
        BUSINESS_SLUG: undefined,
        WORKSPACE_ROOT: undefined,
      },
      async () => {
        __resetBrandbookFallbackWarningsForTest()
        const content = await loadBrandbookContentAdapter()

        assert.equal(content.shell.homeHref, "/brandbook")
        assert.equal(content.shell.homeAriaLabel, "AIOX Starter Brandbook home")
        assert.equal(content.footer.metaLine, "Brand Identity System // v2.0 // Confidential")
        assert.equal(content.notFound.message, "Page not found in the brandbook")
        assert.equal(content.tokenExport.header.navCenter, "TOKEN EXPORT")
        assert.equal(content.tokenExport.header.navLeft, "AIOX STARTER")
        assert.equal(content.tokenExport.instructions.length, 4)
        assert.equal(content.navigation.navGroups.length, 3)
        assert.equal(content.navigation.navGroups[0]?.label, "Brandbook")
        assert.equal(content.tokenExport.blocks.length, 2)
        assert.equal(content.tokenExport.blocks[0]?.id, "gold")
      }
    )
  })

  await runTest("brandbook adapter resolves variant2 local overrides", async () => {
    await withEnv(
      {
        STARTER_SOURCE: undefined,
        STARTER_VARIANT: "variant2",
        NODE_ENV: "production",
        BUSINESS_SLUG: undefined,
        WORKSPACE_ROOT: undefined,
      },
      async () => {
        __resetBrandbookFallbackWarningsForTest()
        const content = await loadBrandbookContentAdapter()

        assert.equal(content.shell.homeAriaLabel, "Orbit Flow Brandbook home")
        assert.equal(content.footer.logoLightSrc, "/variants/variant2/logo-light.svg")
        assert.equal(content.tokenExport.header.titleAccent, "Toolkit")
        assert.equal(content.tokenExport.blocks.length, 2)
        assert.equal(content.tokenExport.blocks[0]?.id, "cyan")
        assert.equal(content.tokenExport.blocks[1]?.id, "amber")
      }
    )
  })

  await runTest("brandbook adapter inherits base navigation while resolving variant token overrides", async () => {
    await withEnv(
      {
        STARTER_SOURCE: undefined,
        STARTER_VARIANT: "variant2",
        NODE_ENV: "production",
        BUSINESS_SLUG: undefined,
        WORKSPACE_ROOT: undefined,
      },
      async () => {
        __resetBrandbookFallbackWarningsForTest()
        const content = await loadBrandbookContentAdapter()

        assert.equal(content.navigation.navGroups.length > 0, true)
        assert.equal(content.navigation.navGroups[0]?.label, "Brandbook")
        assert.equal(content.navigation.brandbookNavLinks.some((link) => link.href === "/brandbook/token-export"), true)
        assert.equal(content.tokenExport.instructions[3], "All shadcn/ui components will automatically adopt the Orbit Flow visual system.")
        assert.equal(content.tokenExport.blocks.length, 2)
        assert.equal(content.tokenExport.blocks.some((block) => block.id === "cyan"), true)
        assert.equal(content.tokenExport.blocks.some((block) => block.id === "amber"), true)
      }
    )
  })

  await runTest("brandbook adapter resolves variant3 local AIOX preset", async () => {
    await withEnv(
      {
        STARTER_SOURCE: undefined,
        STARTER_VARIANT: "variant3",
        NODE_ENV: "production",
        BUSINESS_SLUG: undefined,
        WORKSPACE_ROOT: undefined,
      },
      async () => {
        __resetBrandbookFallbackWarningsForTest()
        const content = await loadBrandbookContentAdapter()

        assert.equal(content.shell.homeAriaLabel, "AIOX Brandbook home")
        assert.equal(content.footer.logoLightSrc, "/logo/AIOX-White.svg")
        assert.equal(content.notFound.message, "Page not found in the AIOX brandbook")
        assert.equal(content.tokenExport.header.navLeft, "AIOX SQUAD")
        assert.equal(content.tokenExport.header.titleAccent, "Export")
        assert.equal(content.tokenExport.blocks.length, 2)
        assert.equal(content.tokenExport.blocks[0]?.id, "lime")
        assert.equal(content.tokenExport.blocks[1]?.id, "gold")
      }
    )
  })
}

main().catch((error) => {
  console.error("FAIL: brandbook content adapter tests")
  console.error(error)
  process.exit(1)
})
