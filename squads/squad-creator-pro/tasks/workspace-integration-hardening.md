# Task: Workspace Integration Hardening

**Task ID:** workspace-integration-hardening
**Purpose:** Padronizar e corrigir integração de um squad com o workspace de forma determinística (contrato, templates, outputs canônicos, validação final)
**Orchestrator:** @squad-chief
**Mode:** Audit + Remediation
**Pattern:** GOVERNANCE-WSP-001
**Execution Type:** `Agent` (coordena auditoria + ajuste estrutural)
**Model:** `Opus` (REQUIRED — decisões de governança e remediação cruzada em config/tasks/workflows/agents)
**Haiku Eligible:** NO — erros de classificação de contrato workspace geram drift sistêmico

---

## Veto Conditions

| ID | Condition | Check | Result |
|----|-----------|-------|--------|
| VETO-WIH-001 | Workspace contract validation must pass baseline audit before remediation | Run validate-workspace-contract.py in audit mode and verify it completes without crash | VETO - BLOCK. Fix validation script errors before attempting remediation. |
| VETO-WIH-002 | Squad config.yaml must be backed up before any workspace integration changes | Verify backup exists at a timestamped path before --apply mode modifies config | VETO - BLOCK. Create config.yaml backup before applying remediation. |
| VETO-WIH-003 | Remediation must not run in --apply mode without prior --audit pass | Check that audit report exists at .aiox/squad-runtime/squad-upgrade/{squad_name}/ before applying changes | VETO - BLOCK. Run --audit first and review results before using --apply. |

## Checklist Reference

Before marking this task complete, verify against: `checklists/quality-gate-checklist.md`

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Workspace Integration Hardening |
| **status** | `active` |
| **responsible_executor** | @squad-chief |
| **execution_type** | Agent |
| **input** | `squad_name` ou `squad_path` |
| **output** | Relatório de auditoria + relatório de remediação + score final |
| **action_items** | Auditar contrato, mapear gaps, corrigir, revalidar |
| **acceptance_criteria** | Contrato workspace válido + templates 1:1 com outputs canônicos |

---

## Command

```text
*workspace-hardening {squad_name}
```

Flags:

- `--audit` (default): somente diagnóstico
- `--apply`: aplicar remediação guiada
- `--strict`: bloquear se qualquer output canônico não tiver template 1:1
- `--report {path}`: caminho explícito do relatório

---

## Objetivo Operacional

Transformar o processo manual de "adequar squad ao workspace, conferir e ajustar" em execução replicável:

1. **Auditar contrato workspace**
2. **Detectar gaps de template/output**
3. **Corrigir estrutura e governança**
4. **Validar com quality gates**

---

## Fase 0: Baseline

Executar:

```bash
bash squads/squad-creator-pro/scripts/validate-squad.sh {squad_name}
python3 squads/squad-creator-pro/scripts/validate-workspace-contract.py {squad_name} --strict --report .aiox/squad-runtime/squad-upgrade/{squad_name}/workspace-hardening-audit.yaml
```

Saída:

- `.aiox/squad-runtime/squad-upgrade/{squad_name}/workspace-hardening-audit.yaml`

---

## Fase 1: Gap Map

Mapear:

- `workspace_integration.level` e contrato (`rationale`, `read_paths`, `write_paths`, `template_namespace`)
- referências canônicas em `workspace/businesses/{slug}/...`
- cobertura de templates em `workspace/_templates/...`
- presença de scripts obrigatórios para `workspace_first`:
  - `scripts/bootstrap-*-workspace.sh`
  - `scripts/validate-*-essentials.sh`

---

## Fase 2: Remediação (`--apply`)

Aplicar correções em ordem:

1. Ajustar `config.yaml` com contrato workspace coerente.
2. Ajustar tasks/workflows/agents para usar paths canônicos.
3. Garantir regra **template-first** para qualquer output canônico.
4. Criar templates faltantes em `workspace/_templates/{namespace}/` (sem dados reais).
5. Garantir scripts bootstrap/essentials para squads `workspace_first`.
6. Atualizar README com seção de governança workspace.
7. Verificar presença de `squads/c-level/` antes de manter `controlled_runtime_consumer` ou `workspace_first`.

---

## Fase 3: Revalidação

Executar novamente:

```bash
bash squads/squad-creator-pro/scripts/validate-squad.sh {squad_name}
python3 squads/squad-creator-pro/scripts/validate-workspace-contract.py {squad_name} --strict --report .aiox/squad-runtime/squad-upgrade/{squad_name}/workspace-hardening-final.yaml
```

---

## Acceptance Criteria

- [ ] `workspace_integration.level` declarado e válido.
- [ ] Contrato workspace explícito (rationale/read_paths/write_paths/template_namespace).
- [ ] Se `controlled_runtime_consumer` ou `workspace_first`, `squads/c-level/` existe.
- [ ] Para todo output canônico em `workspace/businesses/{slug}/...`, existe template correspondente em `workspace/_templates/...`.
- [ ] Se `workspace_first`, bootstrap + essentials validator existem.
- [ ] `validate-squad` e `validate-workspace-contract.py` retornam `PASS`.

---

## Output Contract

```yaml
workspace_hardening:
  squad_name: "{squad_name}"
  mode: "audit|apply"
  workspace_level: "none|read_only|controlled_runtime_consumer|workspace_first"
  canonical_outputs_detected: []
  missing_templates: []
  remediations_applied: []
  final_result: "PASS|FAIL"
```
