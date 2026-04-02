# create-from-sop

Transforma SOPs YAML canônicos do workspace em artefatos de squad (tasks, workflows, guardrails).

---

## Quando Usar

Use quando tiver SOPs já estruturados em `workspace/businesses/{slug}/` e quiser transformá-los em um squad operacional sem reextrair processos do zero.

---

## Pré-requisitos

- Business com workspace configurado (`workspace/businesses/{slug}/`)
- SOPs em formato YAML canônico no workspace
- Squad Creator PRO instalado (`squads/squad-creator-pro/`)

---

## Execução

Este comando ativa o Squad Architect (@squad-chief) em modo PRO e executa a task `create-from-sop`:

1. Ativar @squad-chief (se não ativo)
2. Carregar task: `squads/squad-creator-pro/tasks/create-from-sop.md`
3. Seguir o workflow completo da task (5 steps)

### Uso

```
/SquadCreator:create-from-sop
```

O agente vai solicitar:
- `--business={slug}` (obrigatório)
- `--namespace={dir}` e/ou `--paths={a,b}` (pelo menos um obrigatório)

### Exemplo

```
*create-from-sop --business=aiox --namespace=operations
```

---

## Pipeline

```
Step 0: Environment + Source Package (loader determinístico)
Step 1: Source Classification (executable_process / supporting_context / governance_signal)
Step 2: Process Mapping (tasks candidatas com executor + guardrails)
Step 3: Workflow Synthesis (fases, checkpoints, handoffs)
Step 4: Gap Surface (open questions marcadas como [MISSING], [AMBIGUOUS], [CONFLICT])
Step 5: Creation Brief (tese de criação derivada dos SOPs)
```

---

## Outputs

| Output | Tipo | Descrição |
|--------|------|-----------|
| `business_sops_package` | YAML/JSON | Pacote determinístico do loader |
| `squad_creation_brief` | MD/YAML | Tese de criação derivada dos SOPs |
| `task_inventory` | YAML | Tasks candidatas com executor e guardrails |
| `workflow_map` | YAML | Fases, checkpoints e handoffs |
| `open_questions` | MD | Gaps que não podem ser inventados |

---

## Task Source

`squads/squad-creator-pro/tasks/create-from-sop.md`

**Orchestrator:** @pedro-valerio
**Model:** Opus (cross-file synthesis)
