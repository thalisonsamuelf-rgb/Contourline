# SOP Factory Architecture

## Intent

`gerador-pop` turns operational knowledge into structured SOP artifacts for humans and AI systems. It is enterprise-aware locally, but it must remain safe when copied into a less capable repository.

## Architecture Layers

1. Orchestrator layer: `pop-chief` routes requests and enforces quality.
2. Specialist layer: analyst, creator, extractor, ML architect, auditor.
3. Workflow layer: creation, audit, and extraction pipelines.
4. Runtime contract layer: environment detection decides which context surfaces may be used.

## Environment Contract

The squad resolves a shared contract with these fields:

- `access_tier`: `opensource|pro|enterprise`
- `runtime_mode`: `portable_docs_mode|full_workspace_mode`
- `source_of_truth`: `docs_projection|workspace_canonical`
- `reason`
- `evidence_paths`

Decision rules:

- `enterprise` requires explicit proof.
- `pro` is allowed when the Pro pack exists and enterprise is not proven.
- `portable_docs_mode` remains the default when explicit business context is absent or readiness is not proven.
- `full_workspace_mode` is allowed only when explicit runtime context and canonical COO readiness are both proven.

## Non-Sensitive Projection

Portable mode consumes:

- `docs/squad/gerador-pop/operational-projection.yaml`

This projection may describe safe outputs, mode rules, and evidence surfaces, but it must not embed private workspace topology.

## Output Zones

- `outputs/gerador-pop/`: shared-safe generated artifacts
- `outputs/gerador-pop/extractions/`: extracted draft SOPs and logs
- `outputs/gerador-pop/audits/`: audit reports and dashboards
- `outputs/gerador-pop/analysis/`: analysis and benchmark reports
- `outputs/gerador-pop/converted/`: format conversion outputs
- `outputs/gerador-pop/checklists/`: generated checklists
- `outputs/gerador-pop/certificates/`: certification artifacts

## Current Constraint

`gerador-pop` now has canonical readiness support in the COO resolver through the `operations` context. The correct runtime behavior is:

- without explicit `business`, runtime remains `portable_docs_mode`
- with explicit `business` and ready operations namespace, runtime may become `full_workspace_mode`
- shared-safe docs projection remains the default fallback source of truth
