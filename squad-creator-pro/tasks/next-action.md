# Task: Next Action

**Task ID:** next-action
**Purpose:** Padronizar greetings stateful com `Next Action` final, inferido de gaps atuais e continuidade operacional
**Orchestrator:** @squad-chief
**Mode:** Audit + Implementation
**Pattern:** GREETING-CONTINUITY-001
**Execution Type:** `Agent` (exige leitura estrutural de runtime, greeting e contratos de contexto)
**Model:** `Opus` (REQUIRED — erro de heurística no próximo passo degrada UX operacional e pode empurrar o usuário para a ação errada)
**Haiku Eligible:** NO — a classificação de gaps e o desenho do CTA dependem de julgamento estrutural cross-file

---

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Next Action |
| **status** | `active` |
| **responsible_executor** | @squad-chief |
| **execution_type** | Agent |
| **input** | `squad_name` ou `greeting_script_path` |
| **output** | Greeting atualizado + heurística de `Next Action` + teste unitário |
| **action_items** | Auditar runtime, mapear gaps, inferir próximo passo, adicionar CTA final |
| **acceptance_criteria** | Greeting termina com `**Next Action:** \`...\`` coerente com gaps/continuidade |

---

## Command

```text
*next-action {squad_name}
```

Flags:

- `--audit` (default): diagnosticar sem editar
- `--apply`: implementar o padrão no squad alvo
- `--strict`: bloquear se não houver teste automatizado do greeting
- `--report {path}`: salvar relatório explícito

Examples:

```text
*next-action design
*next-action copy --apply
*next-action traffic-masters --apply --strict
```

---

## Objetivo Operacional

Transformar greetings contextuais em um mecanismo consistente de continuidade:

1. Detectar o contexto/runtimes que o squad já usa
2. Identificar o gap atual mais útil para orientar a pessoa
3. Inferir um único próximo passo determinístico
4. Encerrar o greeting com um CTA final visível

O padrão alvo é:

```text
**Next Action:** `*algum-comando-ou-script`
```

Este CTA deve aparecer no **fim** do greeting, mesmo quando o contexto detalhado também for exibido no meio do texto.

---

## Quando Esta Task Se Aplica

Use esta task quando o squad alvo:

- possui greeting custom (`generate-*-greeting.*`)
- usa runtime ou contexto ativo em `.aiox/squad-runtime/`
- depende de bootstrap, readiness, blockers ou handoffs
- sofre de ambiguidade sobre “qual é o próximo passo?”

Squads candidatos imediatos:

- `squad-creator`
- `design` / `aiox-design`
- `copy` / `aiox-copy`
- `traffic-masters`
- `application-forms`
- `storytelling`
- `hormozi`
- `movement`

Nao use esta task para agentes simples que só consomem o greeting genérico da `.aiox-core`.

---

## Veto Conditions

| ID | Condition | Check | Result |
|----|-----------|-------|--------|
| VETO-NA-001 | Squad sem greeting custom | Verificar se existe `generate-*-greeting.*` ou equivalente | VETO - BLOCK. Sem greeting custom, aplicar outro padrão primeiro. |
| VETO-NA-002 | Heurística de próximo passo sem fonte estrutural de contexto | Verificar se o squad possui `load-context`, `runtime-paths`, `session-context`, `state`, `readiness` ou fontes equivalentes | VETO - BLOCK. Não inferir `Next Action` por intuição solta. |
| VETO-NA-003 | CTA final contradiz gap bloqueante explícito | Se houver blocker/readiness `not_ready`/`missing_*`, o `Next Action` deve priorizar remediação, não intake genérico | VETO - BLOCK. Corrigir a prioridade da heurística. |
| VETO-NA-004 | Greeting alterado sem teste mínimo | Verificar teste unitário ou de contrato cobrindo o CTA final | VETO - BLOCK. Não deixar heurística de continuidade sem proteção automatizada. |

---

## Checklist Reference

Before marking this task complete, verify against: `checklists/quality-gate-checklist.md`

---

## Contrato Mínimo do Padrão

O squad alvo deve implementar, no mínimo:

1. Uma função explícita de inferência, por exemplo:

```js
function inferNextAction(context) {
  // heurística determinística
}
```

2. Um construtor de callout:

```js
function buildNextActionCallout(context) {
  return `**Next Action:** \`${nextAction}\``;
}
```

3. Inserção do callout no **fim** do greeting
4. Teste cobrindo:
   - bootstrap sem contexto
   - contexto pronto sem blocker
   - contexto com blocker/gap explícito

---

## Heurística Obrigatória

O próximo passo deve ser inferido por prioridade:

### Prioridade 1: Gap bloqueante

Exemplos:

- `campaign-brief.yaml` ausente -> `*create-campaign-brief ...`
- DS context não inicializado -> `set-active-context`
- readiness não resolvido -> `*show-context` ou comando de preflight
- credenciais ausentes -> `*setup-credentials`

### Prioridade 2: Gap estrutural não-bloqueante

Exemplos:

- contexto incompleto mas utilizável -> `*show-context`
- blueprint/token faltando -> `*review-plan ...`
- rota ainda ambígua -> `*resolve-ds ...`

### Prioridade 3: Intake operacional

Se não houver gap relevante:

- usar intake/triage/briefing como próximo passo
- exemplo: `*triage {request}`

### Regra dura

Se existir blocker explícito, **nunca** usar CTA genérico como:

- `*triage`
- `*diagnose`
- `*route`

antes de oferecer a remediação do blocker.

---

## Fase 0: Discovery

Mapear no squad alvo:

```yaml
discovery:
  greeting_script: "squads/{squad}/scripts/generate-*-greeting.*"
  context_loader: "load-context.*"
  runtime_resolver: "runtime-paths.*"
  context_writer: "set-active-context.*"
  runtime_files:
    - ".aiox/squad-runtime/{namespace}/.../session-context.yaml"
    - ".aiox/squad-runtime/{namespace}/.../state.json|state.yaml"
```

Extrair:

- como o contexto é lido
- quais status/readiness/blockers já existem
- quais comandos canônicos o squad expõe
- onde o usuário costuma travar hoje

---

## Fase 1: Gap Map

Construir uma tabela de decisão:

```yaml
gap_map:
  - signal: "missing_campaign_brief"
    severity: "blocking"
    next_action: "*create-campaign-brief --business={business} --product={product} --campaign={campaign}"
  - signal: "no_active_context"
    severity: "blocking"
    next_action: "node squads/{squad}/scripts/set-active-context.cjs ..."
  - signal: "context_ready"
    severity: "non_blocking"
    next_action: "*triage {request}"
```

Rules:

- mapear apenas sinais observáveis no código/runtime
- evitar heurísticas dependentes de memória de sessão do LLM
- preferir comandos já existentes do squad

---

## Fase 2: Implementation (`--apply`)

Aplicar no greeting script:

1. criar `inferNextAction(context)`
2. criar `buildNextActionCallout(context)`
3. preservar o bloco de contexto atual
4. adicionar o CTA no fim do output

Exemplo alvo:

```text
## Starter Commands

- `*help`
- `*show-context`
- `*triage {request}`

**Next Action:** `*triage {request}`
```

---

## Fase 3: Validation

Criar teste automatizado cobrindo:

```yaml
tests:
  - scenario: "no runtime context"
    expected_next_action: "bootstrap command"
  - scenario: "blocking gap present"
    expected_next_action: "gap remediation command"
  - scenario: "ready context"
    expected_next_action: "intake or execution command"
```

Validation output:

- greeting renderiza sem erro
- CTA final está no fim do output
- comando do CTA é consistente com o gap/contexto do cenário

---

## Output Contract

```yaml
next_action_upgrade:
  squad_name: "{squad_name}"
  mode: "audit|apply"
  greeting_script: "..."
  context_sources: []
  gaps_detected: []
  next_action_rules:
    blocking: []
    non_blocking: []
    ready_state: ""
  cta_added: true
  tests_added: []
  final_result: "PASS|FAIL"
```

---

## Acceptance Criteria

- [ ] Squad alvo possui `Next Action` final no greeting.
- [ ] O `Next Action` é inferido de gaps/contexto atuais, não apenas do runtime ativo.
- [ ] Gaps bloqueantes são priorizados sobre comandos genéricos.
- [ ] O callout final usa o formato `**Next Action:** \`...\``.
- [ ] Existe teste automatizado cobrindo os cenários principais.

---

## Recommended Rollout Order

1. `copy`
2. `design`
3. `traffic-masters`
4. `application-forms`
5. `storytelling`
6. `hormozi`
7. `movement`

Motivo:

- `copy` e `traffic-masters` tendem a ter blockers operacionais claros
- `design` tende a ter gaps estruturais previsíveis
- os demais já são context-driven e podem absorver o padrão depois com baixo risco
