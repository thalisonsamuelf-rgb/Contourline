# Task: Create Squad Artifacts From Workspace SOPs

**Task ID:** create-from-sop
**Purpose:** Carregar SOPs YAML canonicos de `workspace/businesses/{slug}` e transformar esses insumos em artefatos de criacao de squad sem reextrair processo do zero
**Orchestrator:** @pedro-valerio
**Mode:** Business-aware operationalization
**Pattern:** SC-PV-SOP-001
**Execution Type:** `Agent`
**Model:** `Opus` (cross-file synthesis de processos canonicos em tasks, workflows, guardrails e gaps)
**Haiku Eligible:** NO - erro de leitura de contrato ou selecao de fonte gera drift estrutural

---

## Veto Conditions

| ID | Condition | Check | Result |
|----|-----------|-------|--------|
| VETO-CFS-001 | Business slug must be explicit | Verify `--business=<slug>` is present | VETO - BLOCK. No business-aware loading without explicit business. |
| VETO-CFS-002 | Environment contract must resolve to `full_workspace_mode` | Run `load-business-sops.cjs` and verify `runtime_mode == full_workspace_mode` | VETO - BLOCK. Stay in docs mode; do not treat workspace files as SSOT. |
| VETO-CFS-003 | Source of truth must be `workspace_canonical` | Verify loader output `source_of_truth == workspace_canonical` | VETO - BLOCK. Do not operationalize from non-canonical projection data. |
| VETO-CFS-004 | User must explicitly define at least one SOP selector | Verify `--namespace=<dir>` and/or `--paths=<a,b>` is present | VETO - BLOCK. Do not guess which business YAMLs represent the process scope. |
| VETO-CFS-005 | Every requested selector must resolve inside `workspace/businesses/{slug}` | Verify loader returns zero `missing_requested_sources` | VETO - BLOCK. Fix selectors before mapping artifacts. |

## Checklist Reference

Before marking this task complete, verify against: `checklists/quality-gate-checklist.md`

---

## Command

```text
*create-from-sop --business={slug} --namespace=operations [--namespace=products/{product}] [--paths=operations/team-structure.yaml,products/{product}/offerbook.yaml]
```

Deterministic loader:

```bash
node squads/squad-creator-pro/scripts/load-business-sops.cjs \
  --business=aiox \
  --namespace=operations \
  --paths=products/cohort_advanced/offerbook.yaml \
  --format=yaml
```

Optional flags:

- `--include-raw` -> inclui o parse bruto dos YAMLs no payload
- `--format=json|yaml` -> formato de saida do pacote

---

## Objective

Usar SOPs YAML ja canonizados no workspace como SSOT para criacao de artefatos pelo `@pedro-valerio`, sem precisar reextrair processo de transcript, meeting notes ou docs projetadas.

O foco nao e "achar qualquer YAML interessante". O foco e:

1. receber um `business` explicito
2. receber seletores explicitos de escopo
3. carregar apenas os YAMLs canonicos pedidos
4. separar processo executavel de contexto de suporte
5. derivar tasks, workflows, guardrails e open questions sem inventar

---

## Inputs

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `business` | string | Yes | Business slug em `workspace/businesses/{slug}` |
| `namespace` | string[] | No | Diretórios relativos ao business root a serem varridos por YAML |
| `paths` | string[] | No | Arquivos YAML relativos ao business root |
| `existing_squad` | string | No | Squad que sera atualizado em vez de criado do zero |
| `creation_goal` | string | No | Qual capability o squad deve operacionalizar |

**Critical rule:** `namespace` e `paths` sao seletores de fonte, nao instrucoes de output. O output nasce depois da leitura e classificacao.

---

## Outputs

| Output | Type | Description |
|--------|------|-------------|
| `business_sops_package` | YAML/JSON | Pacote deterministico do loader com ambiente, seletores, fontes e blockers |
| `squad_creation_brief` | MD/YAML | Tese de criacao derivada dos SOPs selecionados |
| `task_inventory` | YAML | Lista de tasks candidatas com executor, inputs, outputs e guardrails |
| `workflow_map` | YAML | Fases, checkpoints e handoffs derivados dos SOPs |
| `open_questions` | MD | Gaps que nao podem ser inventados a partir dos YAMLs |

---

## Execution

### Step 0: Environment + Source Package

1. Executar `load-business-sops.cjs` com `--business` e seletores explicitos.
2. Confirmar:
   - `coo_readiness_status == ready`
   - `runtime_mode == full_workspace_mode`
   - `source_of_truth == workspace_canonical`
   - `missing_requested_sources == []`
3. Se qualquer gate falhar: parar.

### Step 1: Source Classification

Para cada YAML carregado, classificar em uma destas classes:

- `executable_process` -> descreve processo, rotina, operacao, scorecard, estrutura ou fluxo que vira task/workflow
- `supporting_context` -> contexto de negocio, posicionamento, oferta, narrativa, restricao
- `governance_signal` -> ownership, status, score, version, evidence, sources

**Rules:**

- `operations/*.yaml` tende a ser `executable_process`
- `products/*/offerbook.yaml` tende a ser `supporting_context`
- metadata, evidence e sources nunca viram task diretamente; viram guardrail

### Step 2: Process Mapping

Para cada `executable_process`, extrair:

```yaml
mapped_process:
  source_path: string
  task_name: string
  executor: Human | Agent | Hybrid | Worker
  inputs: []
  outputs: []
  checkpoints: []
  guardrails: []
  dependencies: []
```

Rules:

- Nao transformar contexto em passo operacional sem evidencia no YAML
- Nao fundir processos diferentes so porque vivem no mesmo namespace
- Nao perder ownership; cada output precisa de owner ou guardian

### Step 3: Workflow Synthesis

1. Agrupar processos por fase.
2. Desenhar fluxo unidirecional.
3. Declarar checkpoints obrigatorios.
4. Converter sinais de metadata/status em guardrails ou quality gates.

### Step 4: Gap Surface

Gerar `open_questions` sempre que:

- um processo depende de informacao que nao existe em nenhum YAML selecionado
- ha ambiguidade de owner/responsavel
- o YAML descreve estado mas nao descreve acao
- ha conflito entre fontes selecionadas

**Mandatory notation:** marcar como `[MISSING]`, `[AMBIGUOUS]` ou `[CONFLICT]`.

### Step 5: Creation Brief

Montar `squad_creation_brief` com:

- objetivo do squad
- fontes usadas como SSOT
- processos executaveis mapeados
- contexto de suporte incorporado
- guardrails obrigatorios
- gaps que impedem automacao completa

---

## Acceptance Criteria

- [ ] Loader executado com `business` explicito e seletores explicitos.
- [ ] Nenhuma fonte fora de `workspace/businesses/{slug}` foi considerada valida.
- [ ] `runtime_mode` validado como `full_workspace_mode`.
- [ ] `source_of_truth` validado como `workspace_canonical`.
- [ ] Cada processo executavel virou task candidate com executor + guardrails.
- [ ] Contexto de suporte foi separado de processo executavel.
- [ ] Gaps ficaram marcados sem invencao.

---

## Output Contract

```yaml
create_from_sop:
  business_slug: "{slug}"
  selectors:
    namespaces: []
    explicit_paths: []
  source_package:
    runtime_mode: full_workspace_mode
    source_of_truth: workspace_canonical
    loaded_sources: []
    missing_requested_sources: []
  creation_brief:
    objective: ""
    canonical_sources: []
    executable_processes: []
    supporting_context: []
    guardrails: []
    open_questions: []
```
