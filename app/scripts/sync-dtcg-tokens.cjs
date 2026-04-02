#!/usr/bin/env node
/**
 * Business DS config -> tenant token bridge
 *
 * Reads workspace/businesses/{slug}/design-system/config.yaml and generates
 * src/app/tenant-tokens.generated.css for the active business.
 *
 * Usage:
 *   node scripts/sync-dtcg-tokens.cjs
 *   node scripts/sync-dtcg-tokens.cjs --write
 *   node scripts/sync-dtcg-tokens.cjs --json
 */

const fs = require("node:fs");
const path = require("node:path");
const { parse } = require("yaml");

const APP_ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(APP_ROOT, "../..");
const STARTER_ROOT = path.join(APP_ROOT, "starter");
const OUTPUT_PATH = path.resolve(APP_ROOT, "src/app/tenant-tokens.generated.css");
const BRAND_DATA_OUTPUT_PATH = path.resolve(
  APP_ROOT,
  "src/components/brandbook/data/runtime-brand-data.generated.ts"
);
const DEV_FALLBACK_SLUG = "aiox";
const DEFAULT_TENANT_SOURCE = "starter";

function isDevelopmentRuntime() {
  const isProduction = process.env.NODE_ENV === "production";
  const isCi = process.env.CI === "true";
  return !isProduction && !isCi;
}

function hasWorkspaceMarkers(candidate) {
  return fs.existsSync(path.join(candidate, "businesses"));
}

function hasStarterMarkers(candidate) {
  return (
    fs.existsSync(path.join(candidate, "site.config.yaml")) &&
    fs.existsSync(path.join(candidate, "design-system.config.yaml")) &&
    fs.existsSync(path.join(candidate, "content"))
  );
}

function searchWorkspaceRoot(startDir) {
  let current = path.resolve(startDir);

  while (true) {
    if (hasWorkspaceMarkers(current)) {
      return current;
    }

    const nestedWorkspace = path.join(current, "workspace");
    if (hasWorkspaceMarkers(nestedWorkspace)) {
      return nestedWorkspace;
    }

    const parent = path.dirname(current);
    if (parent === current) {
      break;
    }
    current = parent;
  }

  throw new Error(
    `Unable to resolve workspace root from "${startDir}". Set WORKSPACE_ROOT explicitly.`
  );
}

function normalizeWorkspaceRoot(explicitRoot) {
  const raw = explicitRoot ?? process.env.WORKSPACE_ROOT ?? "";
  const trimmed = raw.trim();

  if (!trimmed) {
    return searchWorkspaceRoot(APP_ROOT);
  }

  const resolved = path.resolve(trimmed);
  if (hasWorkspaceMarkers(resolved)) {
    return resolved;
  }

  const nestedWorkspace = path.join(resolved, "workspace");
  if (hasWorkspaceMarkers(nestedWorkspace)) {
    return nestedWorkspace;
  }

  throw new Error(
    `WORKSPACE_ROOT "${trimmed}" must point to the workspace directory or repo root containing workspace/.`
  );
}

function getBusinessSlug(explicitSlug) {
  const raw = explicitSlug ?? process.env.BUSINESS_SLUG ?? "";
  const slug = raw.trim();

  if (slug) {
    return slug;
  }

  if (isDevelopmentRuntime()) {
    return DEV_FALLBACK_SLUG;
  }

  throw new Error(
    "BUSINESS_SLUG is required outside development. Set BUSINESS_SLUG or run with NODE_ENV=development."
  );
}

function getTenantSource(explicitSource) {
  const raw = (explicitSource ?? process.env.STARTER_SOURCE ?? DEFAULT_TENANT_SOURCE)
    .trim()
    .toLowerCase();
  return raw === "workspace" ? "workspace" : "starter";
}

function getStarterVariant(explicitVariant) {
  const raw = explicitVariant ?? process.env.STARTER_VARIANT ?? "";
  const variant = raw.trim();
  return variant || undefined;
}

function resolveStarterSourceRoot(starterVariant) {
  const sourceRoot = starterVariant
    ? path.join(STARTER_ROOT, "variants", starterVariant)
    : STARTER_ROOT;

  if (!hasStarterMarkers(sourceRoot)) {
    const label = starterVariant
      ? `starter variant "${starterVariant}"`
      : "starter default config";
    throw new Error(`Unable to resolve ${label}: ${sourceRoot}`);
  }

  return sourceRoot;
}

function normalizeConfigPath(filePath) {
  return filePath.replace(/\\/g, "/");
}

function loadDesignSystemConfig(businessSlug, workspaceRoot) {
  const configPath = path.join(
    workspaceRoot,
    "businesses",
    businessSlug,
    "design-system",
    "config.yaml"
  );

  if (!fs.existsSync(configPath)) {
    throw new Error(`Design system config not found: ${configPath}`);
  }

  const raw = fs.readFileSync(configPath, "utf8");
  const config = parse(raw);

  if (!config || typeof config !== "object") {
    throw new Error(`Design system config is empty: ${configPath}`);
  }

  return config;
}

function loadStarterDesignSystemConfig(sourceRoot) {
  const configPath = path.join(sourceRoot, "design-system.config.yaml");

  if (!fs.existsSync(configPath)) {
    throw new Error(`Starter design system config not found: ${configPath}`);
  }

  const raw = fs.readFileSync(configPath, "utf8");
  const config = parse(raw);

  if (!config || typeof config !== "object") {
    throw new Error(`Starter design system config is empty: ${configPath}`);
  }

  return config;
}

function resolveAppBinding(config) {
  const appRelativePath = normalizeConfigPath(path.relative(REPO_ROOT, APP_ROOT));
  const apps = Array.isArray(config.apps) ? config.apps : [];
  const portableRoots = new Set([".", "./"]);

  return (
    apps.find((app) => {
      const root = normalizeConfigPath(app.root || "");
      return root === appRelativePath || portableRoots.has(root);
    }) ||
    apps.find((app) => app.id === "aiox-design-starter") ||
    apps.find((app) => app.id === "site-aiox") ||
    apps[0] ||
    null
  );
}

function collectTokenFiles(config, appBinding) {
  const files = new Set();

  for (const theme of Object.values(config.themes || {})) {
    if (theme?.tokens?.primary) {
      files.add(theme.tokens.primary);
    }

    for (const file of theme?.tokens?.files || []) {
      files.add(file);
    }
  }

  for (const file of appBinding?.token_files || []) {
    files.add(file);
  }

  return Array.from(files).filter(Boolean);
}

function toImportPath(filePath) {
  const absolutePath = path.resolve(APP_ROOT, filePath);
  const relative = normalizeConfigPath(path.relative(path.dirname(OUTPUT_PATH), absolutePath));
  return relative.startsWith(".") ? relative : `./${relative}`;
}

function buildThemeSelectors(themeId, legacyIds) {
  const ids = [themeId, ...(legacyIds || [])].filter(Boolean);
  return ids.map((id) => `.brandbook-root[data-bb-theme="${id}"]`).join(",\n");
}

function buildCss(sourceLabel, config, appBinding) {
  const tokenFiles = collectTokenFiles(config, appBinding);
  const imports = tokenFiles.map((filePath) => `@import "${toImportPath(filePath)}";`);
  const lines = [
    "/* ==========================================================================",
    "   Tenant Tokens Bridge (auto-generated)",
    `   Source Label: ${sourceLabel}`,
    `   Source: ${config.__sourcePath || "starter/design-system.config.yaml"}`,
    `   Generated: ${new Date().toISOString().split("T")[0]}`,
    "   DO NOT EDIT — re-run: npm run tokens:sync:write",
    "   ========================================================================== */",
    "",
    ...imports,
    "",
    "@layer tenant-tokens {",
  ];

  for (const [themeId, theme] of Object.entries(config.themes || {})) {
    const accentHex = theme?.brandbook?.accent_hex;
    const legacyIds = theme?.brandbook?.legacy_ids || [];

    if (!accentHex && legacyIds.length === 0) {
      continue;
    }

    lines.push(`  ${buildThemeSelectors(themeId, legacyIds)} {`);
    if (accentHex) {
      lines.push(`    --bb-accent: ${accentHex};`);
    }
    lines.push("  }");
    lines.push("");
  }

  lines.push("}");
  lines.push("");

  return {
    businessSlug: sourceLabel,
    appBindingId: appBinding?.id || null,
    tokenFiles,
    css: lines.join("\n"),
  };
}

function resolveBrandDataModule(starterVariant) {
  if (starterVariant === "variant3") {
    return "./aiox-brand-data";
  }

  return "./starter-brand-data.starter";
}

function buildBrandDataModuleSource(starterVariant) {
  const modulePath = resolveBrandDataModule(starterVariant);
  return [
    "/* Auto-generated by scripts/sync-dtcg-tokens.cjs */",
    "/* DO NOT EDIT — re-run: npm run tokens:sync:write */",
    `export * from "${modulePath}"`,
    "",
  ].join("\n");
}

function main() {
  const args = process.argv.slice(2);
  const isWrite = args.includes("--write");
  const isJson = args.includes("--json");
  const tenantSource = getTenantSource();
  let sourceLabel = "starter";
  let starterVariant;
  let config;

  if (tenantSource === "workspace") {
    const workspaceRoot = normalizeWorkspaceRoot();
    const businessSlug = getBusinessSlug();
    config = loadDesignSystemConfig(businessSlug, workspaceRoot);
    config.__sourcePath = `workspace/businesses/${businessSlug}/design-system/config.yaml`;
    sourceLabel = businessSlug;
  } else {
    starterVariant = getStarterVariant();
    const sourceRoot = resolveStarterSourceRoot(starterVariant);
    config = loadStarterDesignSystemConfig(sourceRoot);
    config.__sourcePath = path.relative(APP_ROOT, path.join(sourceRoot, "design-system.config.yaml"));
    sourceLabel = starterVariant || config.id || "starter";
  }

  const appBinding = resolveAppBinding(config);
  const result = buildCss(sourceLabel, config, appBinding);

  if (isJson) {
    console.log(
      JSON.stringify(
        {
          businessSlug: result.businessSlug,
          appBindingId: result.appBindingId,
          tokenFiles: result.tokenFiles,
          outputPath: OUTPUT_PATH,
          brandDataOutputPath: BRAND_DATA_OUTPUT_PATH,
          brandDataModule: resolveBrandDataModule(starterVariant),
        },
        null,
        2
      )
    );
    return;
  }

  if (isWrite) {
    fs.writeFileSync(OUTPUT_PATH, result.css, "utf8");
    fs.writeFileSync(
      BRAND_DATA_OUTPUT_PATH,
      buildBrandDataModuleSource(starterVariant),
      "utf8"
    );
    console.log(
      `Written tenant token bridge for ${result.businessSlug} (${result.tokenFiles.length} imports) to ${OUTPUT_PATH}`
    );
    console.log(
      `Written runtime brand data preset "${resolveBrandDataModule(starterVariant)}" to ${BRAND_DATA_OUTPUT_PATH}`
    );
    return;
  }

  console.log(result.css);
}

main();
