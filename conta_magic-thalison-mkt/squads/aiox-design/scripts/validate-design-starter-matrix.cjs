#!/usr/bin/env node

const { execFileSync } = require("node:child_process");
const path = require("node:path");

const ROOT = process.cwd();

function runStep(label, command, args, options = {}) {
  console.log(`== ${label} ==`);
  execFileSync(command, args, {
    cwd: options.cwd || ROOT,
    stdio: "inherit",
    env: {
      ...process.env,
      ...(options.env || {}),
    },
  });
}

function main() {
  const sourceApp = path.join(ROOT, "apps", "aiox-design-system");
  const starterApp = path.join(ROOT, "apps", "aiox-design-starter");

  runStep("Source App Build", "npm", ["run", "build"], { cwd: sourceApp });
  runStep("Starter Lint", "npm", ["run", "lint"], { cwd: starterApp });
  runStep("Starter Typecheck", "npm", ["run", "typecheck"], { cwd: starterApp });
  runStep("Starter Tenant Runtime Tests", "npm", ["run", "test:tenant-runtime"], {
    cwd: starterApp,
  });
  runStep("Starter Default Build", "npm", ["run", "build"], { cwd: starterApp });
  runStep("Starter Variant2 Build", "npm", ["run", "build:variant2"], {
    cwd: starterApp,
  });

  console.log("PASS: design starter matrix validated");
}

try {
  main();
} catch (error) {
  console.error("FAIL: design starter matrix validation");
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
