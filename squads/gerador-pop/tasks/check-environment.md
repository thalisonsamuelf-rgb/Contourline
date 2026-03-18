# Task: Check SOP Factory Environment Contract

## Task Anatomy

| Field | Value |
|-------|-------|
| **Task ID** | `check-environment` |
| **Version** | `1.0.0` |
| **Status** | `active` |
| **Responsible Executor** | `pop-chief` |
| **Execution Type** | `Worker` |

## Metadata
```yaml
id: check-environment
name: "Check SOP Factory Environment Contract"
category: governance
agent: pop-chief
elicit: false
autonomous: true
description: "Resolve access tier, runtime mode, and source of truth before assuming enterprise or workspace-canonical surfaces."
```

## Command

```bash
node squads/gerador-pop/scripts/resolve-environment-contract.cjs --format=yaml
```

For canonical workspace eligibility, provide an explicit business:

```bash
node squads/gerador-pop/scripts/resolve-environment-contract.cjs --business={business} --format=yaml
```

## Acceptance Criteria

- [ ] Contract includes `access_tier`, `runtime_mode`, `source_of_truth`, `reason`, and `evidence_paths`
- [ ] Contract is fail-closed when enterprise capability is not proven
- [ ] `gerador-pop` stays in `portable_docs_mode` when explicit business context is absent or readiness is not proven
- [ ] `gerador-pop` can enter `full_workspace_mode` when explicit business context and COO operations readiness are both proven
