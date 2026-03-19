#!/usr/bin/env node

const path = require('path');

const {
  buildBusinessSopContext,
  loadBusinessSops,
} = require(path.resolve(
  __dirname,
  '..',
  'load-business-sops.cjs'
));

function assert(condition, message, details = {}) {
  if (!condition) {
    const error = new Error(message);
    error.details = details;
    throw error;
  }
}

async function main() {
  const operationsPayload = await loadBusinessSops({
    business: 'aiox',
    namespaces: ['operations'],
  });

  assert(
    operationsPayload.business_sops.runtime_mode === 'full_workspace_mode',
    'operations package should require full_workspace_mode',
    operationsPayload
  );
  assert(
    operationsPayload.business_sops.source_of_truth === 'workspace_canonical',
    'operations package should use workspace_canonical as source of truth',
    operationsPayload
  );
  assert(
    operationsPayload.business_sops.loaded_sources.sops.some(
      (source) => source.path === 'workspace/businesses/aiox/operations/team-structure.yaml'
    ),
    'operations package should include team-structure.yaml',
    operationsPayload
  );

  const mixedPayload = await loadBusinessSops({
    business: 'aiox',
    namespaces: ['operations'],
    paths: ['products/cohort_advanced/offerbook.yaml'],
  });

  assert(
    mixedPayload.business_sops.loaded_sources.sops.some(
      (source) => source.path === 'workspace/businesses/aiox/products/cohort_advanced/offerbook.yaml'
    ),
    'mixed package should include the explicitly requested product offerbook',
    mixedPayload
  );
  assert(
    mixedPayload.business_sops.loaded_sources.sops.some(
      (source) =>
        source.path === 'workspace/businesses/aiox/products/cohort_advanced/offerbook.yaml' &&
        source.selector_origin === 'explicit_path'
    ),
    'explicit product offerbook should preserve selector_origin',
    mixedPayload
  );

  const missingSelectorPayload = await buildBusinessSopContext({
    business: 'aiox',
  });
  assert(
    missingSelectorPayload.business_sops.blockers.some((item) => item.includes('At least one selector is required')),
    'missing selectors should block the loader',
    missingSelectorPayload
  );

  const missingFilePayload = await buildBusinessSopContext({
    business: 'aiox',
    paths: ['operations/does-not-exist.yaml'],
  });
  assert(
    missingFilePayload.business_sops.missing_requested_sources.length === 1,
    'missing explicit path should be reported',
    missingFilePayload
  );
  assert(
    missingFilePayload.business_sops.blockers.some((item) => item.includes('requested SOP selectors')),
    'missing explicit path should block package creation',
    missingFilePayload
  );

  console.log('PASS: load-business-sops tests passed');
}

main().catch((error) => {
  console.error('ERROR: load-business-sops test failed');
  console.error(error.message);
  if (error.details) {
    console.error(JSON.stringify(error.details, null, 2));
  }
  process.exit(1);
});
