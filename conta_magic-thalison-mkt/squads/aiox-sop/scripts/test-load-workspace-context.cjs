#!/usr/bin/env node

const { buildWorkspaceContext } = require('./load-workspace-context.cjs');

function assert(condition, message, details = {}) {
  if (!condition) {
    const error = new Error(message);
    error.details = details;
    throw error;
  }
}

async function main() {
  const ready = await buildWorkspaceContext({
    business: 'aiox',
    includeRaw: false,
  });

  assert(ready.workspace_context.coo_readiness_status === 'ready', 'AIOX business should be ready for operations context', ready);
  assert(ready.workspace_context.runtime_mode === 'full_workspace_mode', 'Explicit business should switch aiox-sop to full_workspace_mode', ready);
  assert(ready.workspace_context.source_of_truth === 'workspace_canonical', 'Business-aware context should use workspace_canonical source of truth', ready);
  assert(ready.workspace_context.business_summary.company_name === 'AIOX Squad', 'Company summary should expose AIOX Squad', ready);
  assert(
    ready.workspace_context.loaded_sources.company.some((item) => item.id === 'company_profile' && item.exists),
    'Company profile must be loaded as a canonical source',
    ready
  );
  assert(
    ready.workspace_context.loaded_sources.operations.some((item) => item.id === 'operations_team_structure' && item.exists),
    'Operations team structure must be loaded as a canonical source',
    ready
  );
  assert(
    ready.workspace_context.loaded_sources.templates.length > 0,
    'Operations template inventory must be exposed',
    ready
  );

  const blocked = await buildWorkspaceContext({
    business: 'business-that-does-not-exist',
    includeRaw: false,
  });

  assert(blocked.workspace_context.blockers.length > 0, 'Missing business should produce blockers', blocked);
  assert(blocked.workspace_context.coo_readiness_status === 'blocked', 'Missing business should be blocked by COO readiness', blocked);

  console.log('PASS: aiox-sop workspace context loader tests passed');
}

main().catch((error) => {
  console.error('ERROR: aiox-sop workspace context loader tests failed');
  console.error(error.message);
  if (error.details) {
    console.error(JSON.stringify(error.details, null, 2));
  }
  process.exit(1);
});
