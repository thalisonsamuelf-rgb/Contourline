# Task: Plan Squad with Deep PRD

**Task ID:** plan-squad
**Purpose:** Criar um PRD profundo para um squad antes da execucao, cobrindo contexto, workflows, arquitetura de agentes, governanca, roadmap e riscos
**Orchestrator:** @squad-chief
**Mode:** Planning
**Pattern:** PRD-DEEP-001
**Execution Type:** `Agent` (sintese arquitetural e decomposicao estrategica)
**Model:** `Opus` (REQUIRED -- planejamento cross-cutting com alto custo de erro estrutural)
**Haiku Eligible:** NO -- um PRD raso ou inconsistente compromete a execucao inteira do squad

---

## Command

```text
*plan-squad {domain} [--purpose "..."] [--target-user "..."] [--reference {path}] [--output {path}] [--business {slug}] [--product {slug}] [--app {id}]
```

Defaults:

- `output`: `docs/projects/{domain}/prd.md`
- `reference`: opcional. Quando presente, serve como benchmark de profundidade e estrutura.
- `template`: `squads/squad-creator-pro/templates/squad-prd-deep-tmpl.md`

Example:

```text
*plan-squad editais --reference docs/projects/editais/epics/epic-editais-squad/epic.md
```

---

## Goal

Transformar um pedido de squad grande ou ambicioso em um documento de planejamento suficientemente profundo para responder, antes da execucao:

1. Qual problema o squad resolve e por que ele precisa existir
2. Quais workflows/capabilities precisam ser cobertos
3. Qual arquitetura de agentes e handoffs faz sentido
4. Quais artefatos, modelos de conhecimento e quality gates sao canonicos
5. Qual roadmap de epics/stories reduz risco de execucao

---

## Veto Conditions

| ID | Condition | Check | Result |
|----|-----------|-------|--------|
| VETO-PS-001 | Planejamento sem problema claramente articulado | Verificar se problema, objetivo e target user foram explicitados ou inferidos com evidencia | VETO - BLOCK. Nao montar PRD profundo sem framing minimo do problema. |
| VETO-PS-002 | PRD profundo sem inventario de workflows/capabilities | Verificar que existe lista estruturada de workflows ou capabilities antes da secao de roadmap | VETO - BLOCK. O PRD nao pode pular do contexto direto para epics. |
| VETO-PS-003 | PRD com profundidade "inspirada" por referencia mas sem separar forma de conteudo | Verificar que o documento referencia a profundidade da fonte sem copiar taxonomia de dominio de forma cega | VETO - BLOCK. Reusar profundidade, nao clonar ontologia indevida. |
| VETO-PS-004 | Planejamento declarado completo sem riscos, gates e open questions | Verificar secoes de governanca, riscos e pendencias | VETO - BLOCK. Sem isso, o PRD vira propaganda e nao plano operacional. |

---

## Canonical Inputs

Use como fontes principais:

- `squads/squad-creator-pro/data/pm-best-practices.md`
- `squads/squad-creator-pro/templates/squad-prd-deep-tmpl.md`
- `squads/squad-creator-pro/workflows/wf-plan-squad.yaml`

Quando o usuario fornecer benchmark de profundidade, ler tambem:

- `{reference_path}`

Se `{reference_path}` nao existir:

- continuar com template + best practices
- registrar que a profundidade foi calibrada sem referencia externa especifica

---

## Output Contract

```yaml
plan_squad:
  domain: "{domain}"
  output_path: "docs/projects/{domain}/prd.md"
  reference_path: "{reference_path|null}"
  planning_depth: "standard|deep"
  workflows_mapped: 0
  agents_estimated: 0
  epics_planned: 0
  handoff_ready: false
  unresolved_items: []
```

Runtime artifacts:

- `docs/projects/{domain}/prd.md`
- `.aiox/squad-runtime/plan-squad/{domain}/planning-summary.yaml`

---

## Phase 0: Planning Contract

Definir o contrato minimo do planejamento:

```yaml
planning_contract:
  domain: "{domain}"
  problem_statement: "..."
  purpose: "..."
  target_user: "..."
  output_path: "docs/projects/{domain}/prd.md"
  reference_path: "{path|null}"
  desired_depth: "deep"
  downstream_execution: "*create-squad {domain}"
```

Rules:

- Se `purpose` ou `target_user` estiverem faltando, inferir apenas quando houver evidencia local suficiente.
- Se a inferencia for fraca, marcar como `assumption`.
- Nao inventar business model, integracoes ou ontologia sem base.

---

## Phase 1: Depth Calibration

Objetivo: calibrar o nivel de detalhe desejado sem copiar conteudo de outro dominio.

1. Ler `squads/squad-creator-pro/templates/squad-prd-deep-tmpl.md`.
2. Ler `squads/squad-creator-pro/data/pm-best-practices.md`.
3. Se houver `reference_path`, extrair apenas:
   - densidade das secoes
   - nivel de explicacao arquitetural
   - qualidade de riscos, gates e handoffs
   - profundidade do roadmap
4. Registrar explicitamente:
   - quais elementos sao universais
   - quais sao especificos do dominio de referencia e NAO devem ser carregados

---

## Phase 2: Domain and Capability Mapping

Mapear, no minimo:

```yaml
domain_map:
  problem:
    current_pain: []
    desired_outcomes: []
    opportunity_cost: []
  users:
    primary: []
    secondary: []
  capabilities:
    - capability: ""
      why_it_exists: ""
      outputs: []
  workflows:
    - id: ""
      workflow: ""
      category: ""
      complexity: "low|medium|high"
      automation_potential: "low|medium|high"
      dependencies: []
```

Rules:

- Capabilities explicam "o que o squad precisa habilitar".
- Workflows explicam "o que precisa acontecer".
- Nao pular esta fase, mesmo quando o usuario ja tiver nomes de agents em mente.

---

## Phase 3: Architecture, Knowledge Model, and Governance

Definir no PRD:

1. **Squad thesis**
   - por que este squad deve existir
   - qual diferenca estrategica ele cria

2. **Agent architecture**
   - orchestrator
   - tiers ou grupos funcionais
   - handoffs
   - workflow-to-agent coverage

3. **Knowledge model / canonical artifacts**
   - entidades ou conceitos centrais
   - artefatos canonicos
   - fontes de verdade
   - evidencias vs inferencias vs hipoteses, quando aplicavel

4. **Governance**
   - quality gates
   - human checkpoints
   - veto conditions
   - anti-patterns bloqueados

---

## Phase 4: Epic and Story Decomposition

Transformar o desenho em roadmap executavel:

```yaml
roadmap:
  epics:
    - epic: "Foundation + Orchestrator"
      goal: ""
      agents_created: []
      workflows_enabled: []
      stories: []
      quality_gates: []
```

Rules:

- Epic 1 deve sempre materializar fundacao e orquestrador.
- Cada epic deve entregar funcionalidade utilizavel.
- Historias devem referenciar criacao de agents/workflows, nao embedar implementacao inline.
- O PRD deve terminar com um handoff claro para `*create-squad`.

---

## Phase 5: PRD Assembly

Montar `docs/projects/{domain}/prd.md` usando:

- `squads/squad-creator-pro/templates/squad-prd-deep-tmpl.md` como estrutura principal
- `squads/squad-creator-pro/data/pm-best-practices.md` como guia de cobertura
- `{reference_path}` apenas como benchmark de profundidade, quando houver

Validation before claiming completion:

- problema explicado
- workflows/capabilities mapeados
- arquitetura de agentes definida
- governanca e riscos explicitos
- roadmap de epics/stories presente
- open questions registradas

---

## Acceptance Criteria

- [ ] `docs/projects/{domain}/prd.md` existe.
- [ ] O PRD cobre contexto, problema, tese de solucao, workflows/capabilities, arquitetura de agentes, governanca, roadmap, riscos e metricas.
- [ ] O PRD deixa claro o que e fato, o que e inferencia e o que ainda e pergunta aberta, quando isso for relevante ao dominio.
- [ ] O roadmap termina em handoff acionavel para `*create-squad`.
- [ ] O planejamento summary foi materializado em `.aiox/squad-runtime/plan-squad/{domain}/planning-summary.yaml`.
- [ ] O documento esta profundo o suficiente para servir como `pre_existing_brief` numa execucao posterior.

---

## Governance Block

```yaml
governance_check:
  protocol: squads/squad-creator/protocols/ai-first-governance.md
  canonical_sources_checked:
    - path: "squads/squad-creator-pro/data/pm-best-practices.md"
      status: "implemented"
    - path: "squads/squad-creator-pro/templates/squad-prd-deep-tmpl.md"
      status: "implemented"
    - path: "{reference_path}"
      status: "implemented|partial|not_provided"
  evidence:
    - claim: "PRD follows deep planning structure"
      source: "squads/squad-creator-pro/templates/squad-prd-deep-tmpl.md"
  contradictions_found: []
  unresolved_items: []
```
