# Task: Scaffold Templates

```yaml
task:
  id: scaffold-templates
  name: Scaffold Templates YAML para Negócio
  agent: coo-orchestrator
  elicit: false
  output_format: yaml
```

## Descrição

Copia os templates YAML de `workspace/_templates/` para o diretório do negócio, criando a estrutura completa para preenchimento via pipeline de elicitação.

## Prerequisites

- Bootstrap executado (`workspace/user.yaml` existe)
- Negócio criado (`workspace/businesses/{slug}/` existe)
- Preflight workspace-first executado com sucesso:
  - `bash squads/aiox-workspace/scripts/bootstrap-workspace.sh`
  - `bash squads/aiox-workspace/scripts/validate-workspace-essentials.sh`

## Usage

```
*scaffold-templates {slug}
```

**Exemplo:**
```
*scaffold-templates lendaria
*scaffold-templates synkra
```

## Workflow

### Fase 0: Validação

1. Verificar se `workspace/businesses/{slug}/` existe. Se não, abortar com mensagem: "Negócio não encontrado. Execute `*add-business {slug}` primeiro."
2. Verificar se templates já foram scaffolded (existência de `company/founder-dna.yaml`):
   - **Se existe:** Perguntar se deseja sobrescrever ou manter existentes.
   - **Se não existe:** Prosseguir com scaffold completo.

### Fase 1: Criar Diretórios

```bash
mkdir -p workspace/businesses/{slug}/company
mkdir -p workspace/businesses/{slug}/operations
mkdir -p workspace/businesses/{slug}/tech
mkdir -p workspace/businesses/{slug}/ai
mkdir -p workspace/businesses/{slug}/evidence
```

### Fase 2: Copiar Templates Company

Copiar os seguintes templates de `workspace/_templates/company/` para `workspace/businesses/{slug}/company/`:

| Template Source | Target | Método |
|----------------|--------|--------|
| `company/founder-dna.yaml` | `company/founder-dna.yaml` | Cópia direta |
| `company/credentials.yaml` | `company/credentials.yaml` | Cópia direta |
| `company/company-profile.yaml` | `company/company-profile.yaml` | Cópia direta |
| `company/brand.yaml` | `company/brand.yaml` | Cópia direta |
| `company/icp.yaml` | `company/icp.yaml` | Cópia direta |
| `company/diagnosis.yaml` | `company/diagnosis.yaml` | Cópia direta |
| `company/analytics.yaml` | `company/analytics.yaml` | Cópia direta (placeholder) |
| `company/authority-story.yaml` | `company/authority-story.yaml` | Cópia direta (placeholder, sintetizado na Fase 6) |

### Fase 3: Copiar Templates Operations

Copiar os seguintes templates de `workspace/_templates/operations/` para `workspace/businesses/{slug}/operations/`:

| Template Source | Target | Método |
|----------------|--------|--------|
| `operations/team-structure.yaml` | `operations/team-structure.yaml` | Cópia direta |
| `operations/pricing-strategy.yaml` | `operations/pricing-strategy.yaml` | Cópia direta |
| `operations/kpi-scorecards.yaml` | `operations/kpi-scorecards.yaml` | Cópia direta (placeholder) |
| `operations/commission-design.yaml` | `operations/commission-design.yaml` | Cópia direta (placeholder) |

### Fase 4: Copiar Templates Tech, AI e Evidence

Copiar os seguintes templates:

| Template Source | Target | Método |
|----------------|--------|--------|
| `tech/strategy.yaml` | `tech/strategy.yaml` | Cópia direta |
| `tech/stack.yaml` | `tech/stack.yaml` | Cópia direta |
| `ai/strategy.yaml` | `ai/strategy.yaml` | Cópia direta |
| `evidence/workspace-context-summary.yaml` | `evidence/workspace-context-summary.yaml` | Cópia direta |

### Fase 5: Atualizar Metadata

Para cada arquivo copiado, atualizar o campo `metadata.company_name` (ou equivalente) com o nome do negócio baseado no slug.

### Fase 6: Relatório

Gerar relatório de scaffold:

```
Scaffold completo para: {slug}

Company (8 arquivos):
  ✅ founder-dna.yaml
  ✅ credentials.yaml
  ✅ company-profile.yaml
  ✅ brand.yaml
  ✅ icp.yaml
  ✅ diagnosis.yaml
  ✅ analytics.yaml (placeholder)
  ✅ authority-story.yaml (placeholder)

Operations (4 arquivos):
  ✅ team-structure.yaml
  ✅ pricing-strategy.yaml
  ✅ kpi-scorecards.yaml (placeholder)
  ✅ commission-design.yaml (placeholder)

Tech + AI + Evidence (4 arquivos):
  ✅ tech/strategy.yaml
  ✅ tech/stack.yaml
  ✅ ai/strategy.yaml
  ✅ evidence/workspace-context-summary.yaml

Total: 16 arquivos scaffolded
Próximo passo: *setup-business-profile {slug}
```

## Outputs

| Diretório | Arquivos | Status |
|-----------|----------|--------|
| `workspace/businesses/{slug}/company/` | 8 YAMLs | Template (vazio) |
| `workspace/businesses/{slug}/operations/` | 4 YAMLs | Template (vazio) |
| `workspace/businesses/{slug}/tech/` | 2 YAMLs | Template (vazio) |
| `workspace/businesses/{slug}/ai/` | 1 YAML | Template (vazio) |
| `workspace/businesses/{slug}/evidence/` | 1 YAML | Template (vazio) |

## Validation

- [ ] Diretórios company/, operations/, tech/, ai/ e evidence/ existem
- [ ] 8 arquivos em company/ copiados
- [ ] 4 arquivos em operations/ copiados
- [ ] 4 arquivos em tech/ai/evidence copiados
- [ ] Metadata atualizado com nome do negócio
- [ ] Nenhum arquivo existente sobrescrito sem confirmação

## Next Steps

Após scaffold:
1. `*setup-business-profile {slug}` - Pipeline completo de elicitação
2. Ou executar tasks individuais: `*elicit-founder-dna`, `*elicit-company-profile`, etc.

---

*Task do Squad AIOX Workspace - COO Orchestrator*
