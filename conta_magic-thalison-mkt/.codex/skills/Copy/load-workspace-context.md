# Load Workspace Context Task

Task para carregar contexto operacional do `workspace` antes de executar qualquer task de copy.

## Metadata

```yaml
task:
  name: Load Workspace Context
  id: load-workspace-context
  version: "1.0.0"
  category: research
  estimated_time: "10-20 min"
  dependencies:
    - squads/aiox-copy/data/copy-governance.yaml
    - workspace/_templates/product-offerbook/
    - workspace/_templates/sales-process/
  outputs:
    - outputs/workspace-context/workspace-context-brief.yaml
```

---

## Objective

Garantir que o squad de copy use dados reais e regras vigentes do workspace.

---

## Phase 1: Governance Snapshot

1. Ler `squads/aiox-copy/data/copy-governance.yaml`.
2. Extrair:
   - princípios obrigatórios
   - regras por superfície (`S1`, `S2`, `S3`)
   - quality gates aplicáveis ao deliverable solicitado
3. Registrar em `governance_constraints`.

---

## Phase 2: Domain Model Snapshot

2. Mapear entidades relevantes para o job atual:
   - `ContentPiece`
   - `ContentBrief`
   - `Asset`
3. Registrar:
   - campos críticos
   - relacionamentos que impactam copy
   - termos canônicos do domínio

---

## Phase 3: Workflow Snapshot

2. Identificar fluxo alvo (briefing, revisão, publicação, etc.).
3. Extrair:
   - triggers
   - etapas de decisão
   - pontos de handoff para copy

---

## Phase 4: Template Snapshot

1. Carregar templates relevantes em `workspace/_templates/product-offerbook/`.
2. Carregar templates relevantes em `workspace/_templates/sales-process/`.
3. Para cada template usado, mapear:
   - campos obrigatórios
   - campos opcionais
   - lacunas de input do usuário

---

## Output Contract

Salvar arquivo `outputs/workspace-context/workspace-context-brief.yaml` com:

```yaml
workspace_context_brief:
  generated_at: "YYYY-MM-DDTHH:mm:ssZ"
  request_type: "<sales-page|email-sequence|ad-copy|...>"
  governance_constraints:
    surface: "S1|S2|S3"
    required_rules: []
    quality_gates: {}
  domain_entities:
    content_piece_fields: []
    content_brief_fields: []
    asset_fields: []
  workflow_map:
    selected_workflow: ""
    trigger: ""
    key_steps: []
    handoff_points: []
  templates_loaded:
    - path: ""
      required_fields: []
      missing_inputs: []
  assumptions: []
  blockers: []
```

---

## Quality Checklist

- [ ] Selecionou superfície correta (`S1`, `S2` ou `S3`).
- [ ] Mapeou workflow com trigger + handoffs.
- [ ] Carregou pelo menos 1 template de `product-offerbook` ou `sales-process`.
- [ ] Registrou `assumptions` e `blockers` no output final.

---

## Fallback

Se algum arquivo obrigatório do workspace não existir:

1. Reportar exatamente o caminho faltante.
2. Não inventar schema/campos.
3. Pedir insumo mínimo faltante antes de continuar execução de copy.
