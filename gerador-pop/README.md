# SOP Factory

Enterprise-aware SOP creation and audit squad that remains portable when shared.

## Operating Contract

- Shared default is fail-closed. The squad must not assume `enterprise` just because `workspace/`, `c-level`, or `pro` exist.
- The runtime source of truth is resolved by `scripts/resolve-environment-contract.cjs`.
- When canonical readiness is not proven, the squad stays in `portable_docs_mode` and uses `docs/squad/gerador-pop/operational-projection.yaml`.
- When an explicit `--business=<slug>` is provided and the COO resolves `operations` readiness, the squad may enter `full_workspace_mode`.
- Generated artifacts remain under `outputs/gerador-pop/`.

## Core Surfaces

- `config.yaml`: squad manifest and distribution contract
- `agents/`: orchestrator and specialists
- `tasks/`: creation, extraction, audit, and maintenance tasks
- `workflows/`: end-to-end SOP pipelines
- `docs/`: local squad docs and optimization report landing zone
- `../docs/squad/gerador-pop/operational-projection.yaml`: non-sensitive portable projection

## Runtime Modes

- `portable_docs_mode`: default. Use docs projection and shared-safe outputs only.
- `full_workspace_mode`: only allowed after explicit business context plus canonical `operations` readiness from the COO.

## Environment Detection

Run:

```bash
node squads/gerador-pop/scripts/resolve-environment-contract.cjs --format=yaml
```

To check workspace-backed readiness for a real business:

```bash
node squads/gerador-pop/scripts/resolve-environment-contract.cjs --business=aiox --format=yaml
```

`enterprise` is only proven by the canonical marker `workspace/license/enterprise-runtime.capability.yaml`. Without that proof, the access tier stays fail-closed.
