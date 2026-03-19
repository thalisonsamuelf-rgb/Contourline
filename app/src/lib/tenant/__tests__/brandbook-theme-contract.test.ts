import assert from "node:assert/strict"
import { loadDesignSystemConfig, loadSiteConfig } from "../index"
import { resolveBrandbookThemeContract } from "../theme"

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
  await runTest("starter theme contract derives metadata from local DS config", async () => {
    await withEnv(
      {
        STARTER_SOURCE: undefined,
        STARTER_VARIANT: undefined,
        NODE_ENV: "production",
        BUSINESS_SLUG: undefined,
        WORKSPACE_ROOT: undefined,
      },
      async () => {
        const [site, designSystem] = await Promise.all([
          loadSiteConfig(),
          loadDesignSystemConfig(),
        ])
        const contract = resolveBrandbookThemeContract({ site, designSystem })
        const mainTheme = contract.themes.find((theme) => theme.value === "main")
        const secondaryTheme = contract.themes.find(
          (theme) => theme.value === "secondary"
        )

        assert.equal(contract.businessSlug, "aiox-starter")
        assert.equal(contract.defaultTheme, "main")
        assert.equal(mainTheme?.label, "Gold")
        assert.equal(mainTheme?.meta.editionLabel, "Starter Gold Edition")
        assert.equal(mainTheme?.meta.accentHex, "#DDD1BB")
        assert.deepEqual(mainTheme?.legacyIds, ["lime", "gold"])
        assert.equal(secondaryTheme?.label, "Bronze")
        assert.equal(secondaryTheme?.meta.accentHex, "#BFA37A")
        assert.deepEqual(secondaryTheme?.legacyIds, [])
      }
    )
  })

  await runTest("variant2 theme contract resolves custom accent metadata", async () => {
    await withEnv(
      {
        STARTER_SOURCE: undefined,
        STARTER_VARIANT: "variant2",
        NODE_ENV: "production",
        BUSINESS_SLUG: undefined,
        WORKSPACE_ROOT: undefined,
      },
      async () => {
        const [site, designSystem] = await Promise.all([
          loadSiteConfig(),
          loadDesignSystemConfig(),
        ])
        const contract = resolveBrandbookThemeContract({ site, designSystem })
        const mainTheme = contract.themes.find((theme) => theme.value === "main")
        const secondaryTheme = contract.themes.find((theme) => theme.value === "secondary")

        assert.equal(contract.businessSlug, "variant2")
        assert.equal(mainTheme?.label, "Cyan")
        assert.equal(mainTheme?.meta.accentHex, "#46D6FF")
        assert.equal(secondaryTheme?.label, "Amber")
        assert.equal(secondaryTheme?.meta.accentHex, "#FFB36B")
      }
    )
  })
}

main().catch((error) => {
  console.error("FAIL: brandbook theme contract tests")
  console.error(error)
  process.exit(1)
})
