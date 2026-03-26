#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const TMP_ROOT = path.join(ROOT, '.tmp', 'tenant-runtime-test');
const TSC_BIN = path.join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc');
const TESTS_DIR = path.join(ROOT, 'src', 'lib', 'tenant', '__tests__');

function ensureTypeScriptBinary() {
  if (!fs.existsSync(TSC_BIN)) {
    throw new Error(`TypeScript compiler not found: ${TSC_BIN}`);
  }
}

function resetTmpDir() {
  fs.rmSync(TMP_ROOT, { recursive: true, force: true });
  fs.mkdirSync(TMP_ROOT, { recursive: true });
}

function compileTenantRuntime() {
  const testFiles = fs
    .readdirSync(TESTS_DIR)
    .filter((file) => file.endsWith('.test.ts'))
    .map((file) => path.join(TESTS_DIR, file));

  execFileSync(
    process.execPath,
    [
      TSC_BIN,
      '--module',
      'commonjs',
      '--target',
      'es2020',
      '--esModuleInterop',
      '--skipLibCheck',
      '--outDir',
      TMP_ROOT,
      '--rootDir',
      path.join(ROOT, 'src'),
      path.join(ROOT, 'src', 'lib', 'tenant', 'index.ts'),
      path.join(ROOT, 'src', 'lib', 'tenant', 'cache.ts'),
      path.join(ROOT, 'src', 'lib', 'tenant', 'types.ts'),
      path.join(ROOT, 'src', 'lib', 'tenant', 'surfaces.ts'),
      ...testFiles,
    ],
    {
      cwd: ROOT,
      stdio: 'inherit',
    }
  );
}

function stubServerOnlyModule() {
  const serverOnlyDir = path.join(TMP_ROOT, 'node_modules', 'server-only');
  fs.mkdirSync(serverOnlyDir, { recursive: true });
  fs.writeFileSync(path.join(serverOnlyDir, 'index.js'), 'module.exports = {};\n', 'utf8');
}

function collectCompiledTests(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectCompiledTests(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.test.js')) {
      files.push(fullPath);
    }
  }

  return files.sort();
}

function runCompiledTest() {
  const compiledTests = collectCompiledTests(TMP_ROOT);

  for (const file of compiledTests) {
    execFileSync(process.execPath, [file], {
      cwd: ROOT,
      stdio: 'inherit',
      env: {
        ...process.env,
        WORKSPACE_ROOT: process.env.WORKSPACE_ROOT || path.resolve(ROOT, '..', '..'),
      },
    });
  }
}

function main() {
  ensureTypeScriptBinary();
  resetTmpDir();
  compileTenantRuntime();
  stubServerOnlyModule();
  runCompiledTest();
}

try {
  main();
} catch (error) {
  console.error('FAIL: tenant runtime test runner');
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
