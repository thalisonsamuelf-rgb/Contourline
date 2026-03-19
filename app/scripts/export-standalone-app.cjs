#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const APP_ROOT = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(APP_ROOT, "../..");
const EXPORT_ITEMS = [
  ".coderabbit.yaml",
  ".env.example",
  ".gitignore",
  "README.md",
  "components.json",
  "eslint.config.mjs",
  "next-env.d.ts",
  "next.config.ts",
  "package-lock.json",
  "package.json",
  "postcss.config.mjs",
  "public",
  "scripts/export-standalone-app.cjs",
  "scripts/run-tenant-runtime-test.cjs",
  "scripts/scaffold-starter-variant.cjs",
  "scripts/sync-dtcg-tokens.cjs",
  "src",
  "starter",
  "tsconfig.json",
  "vercel.json",
];

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {
    target: "",
  };

  for (const raw of argv) {
    if (raw.startsWith("--target=")) {
      args.target = raw.slice("--target=".length).trim();
    }
  }

  if (!args.target) {
    fail("Missing --target=/absolute/or/relative/path");
  }

  return args;
}

function resolveTarget(targetArg) {
  if (path.isAbsolute(targetArg)) {
    return targetArg;
  }

  return path.resolve(REPO_ROOT, targetArg);
}

function ensurePathExists(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`Source item not found: ${filePath}`);
  }
}

function copyItem(relativePath, targetRoot) {
  const sourcePath = path.join(APP_ROOT, relativePath);
  const targetPath = path.join(targetRoot, relativePath);

  ensurePathExists(sourcePath);
  fs.rmSync(targetPath, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.cpSync(sourcePath, targetPath, { recursive: true });
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const targetRoot = resolveTarget(args.target);

  fs.mkdirSync(targetRoot, { recursive: true });

  for (const item of EXPORT_ITEMS) {
    copyItem(item, targetRoot);
  }

  console.log(`Standalone export complete: ${targetRoot}`);
  console.log(`Exported ${EXPORT_ITEMS.length} items from ${APP_ROOT}`);
}

main();
