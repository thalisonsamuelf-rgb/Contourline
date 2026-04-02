# Task: Create Greeting Script

**Task ID:** create-greeting-script
**Execution Type:** Agent (structured generation from template + squad context)
**Purpose:** Gerar greeting script determinístico (.cjs) para qualquer squad, seguindo o padrão GREETING-CONTINUITY-001
**Orchestrator:** @squad-chief
**Mode:** Guided with elicitation
**Model:** `Sonnet` (template filling + code generation)
**Haiku Eligible:** NO — requer análise de context sources e inferência de gap map

**Frameworks Used:**
- `templates/greeting-script-tmpl.cjs` → Estrutura base do script
- `checklists/greeting-script-checklist.md` → Validação pós-geração
- `squads/squad-creator-pro/tasks/next-action.md` → Padrão GREETING-CONTINUITY-001

---

## Overview

Esta task gera um `generate-{squad}-greeting.cjs` completo para qualquer squad, garantindo que toda ativação de squad mostre contexto relevante e um **Next Action** determinístico.

```
INPUT (squad_name, entry_agent)
    ↓
[PHASE 1: DISCOVERY]
    → Ler config.yaml do squad alvo
    → Identificar context sources (runtime, workspace, scripts)
    → Mapear comandos do entry_agent
    ↓
[PHASE 2: GAP MAP]
    → Definir sinais observáveis (arquivos, readiness, state)
    → Construir tabela signal → severity → next_action
    → Priorizar: blocking > non_blocking > intake
    ↓
[PHASE 3: GENERATION]
    → Carregar greeting-script-tmpl.cjs
    → Preencher com dados do squad
    → Gerar inferNextAction() com gap map
    → Gerar buildGreeting() com seções contextuais
    ↓
[PHASE 4: INTEGRATION]
    → Salvar em squads/{squad}/scripts/generate-{squad}-greeting.cjs
    → Atualizar entry_agent activation-instructions (STEP 3.5)
    → Registrar script no config.yaml do squad
    ↓
[PHASE 5: VALIDATION]
    → Executar script e verificar output
    → Validar contra greeting-script-checklist.md
    → Testar 3 cenários (no context, blocking gap, ready state)
    ↓
OUTPUT: Script funcional + agent atualizado + checklist passed
```

---

## Inputs

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `squad_name` | string | Yes | Nome do squad alvo (kebab-case) | "c-level", "aiox-copy" |
| `entry_agent` | string | No | ID do agente orchestrator (default: lido do config.yaml) | "coo-orchestrator" |

---

## Preconditions

- [ ] Squad existe: `squads/{squad_name}/` presente
- [ ] `config.yaml` existe e é parseable
- [ ] Entry agent .md existe
- [ ] Template carregado: `templates/greeting-script-tmpl.cjs`

---

## PHASE 1: DISCOVERY

### Step 1.1: Carregar Config do Squad

```yaml
action: read
files:
  - "squads/{squad_name}/config.yaml"
  - "squads/{squad_name}/agents/{entry_agent}.md"
extract:
  - name (squad name)
  - entry_agent
  - workspace_integration.level
  - workspace_integration.read_paths
  - workspace_integration.write_paths
  - agents[].id (lista de agentes)
  - tasks[].id (lista de tasks)
  - commands (do entry_agent)
```

### Step 1.2: Identificar Context Sources

Verificar quais fontes de contexto o squad usa:

```yaml
context_sources:
  # Runtime (squad tem estado persistente?)
  runtime_dir: ".aiox/squad-runtime/{squad_name}/"
  has_runtime: "{exists}"

  # Workspace (squad lê workspace?)
  workspace_level: "{none|read_only|controlled_runtime_consumer|workspace_first}"
  workspace_paths: "{read_paths do config}"

  # Scripts de contexto existentes
  load_context_script: "squads/{squad_name}/scripts/load-context.*"
  runtime_paths_script: "squads/{squad_name}/scripts/runtime-paths.*"
  set_context_script: "squads/{squad_name}/scripts/set-active-context.*"

  # Diagnósticos (squad gera diagnósticos?)
  diagnostics_dir: "docs/diagnostics/"
  has_diagnostics: "{exists}"

  # Backlog (squad usa backlog?)
  backlog_path: "workspace/businesses/*/operations/diagnostic-backlog.yaml"
  has_backlog: "{exists}"
```

### Step 1.3: Mapear Comandos

Extrair do entry_agent os comandos para exibir no greeting:

```yaml
commands:
  starter: "Top 8-10 comandos mais usados"
  always_available: "Comandos que funcionam sem contexto (help, status, exit)"
  context_required: "Comandos que precisam de contexto ativo"
```

---

## PHASE 2: GAP MAP

Construir tabela de decisão baseada nos context_sources identificados:

```yaml
gap_map:
  # Template — preencher baseado no squad
  - signal: "{signal_observável}"
    check: "{como verificar: fs.existsSync, yaml.load, etc}"
    severity: "blocking|non_blocking|intake"
    next_action: "{comando do squad}"
    reason: "{por que esta é a ação certa}"
```

### Heurística de Prioridade (OBRIGATÓRIA)

```
P1: Gap bloqueante (arquivo crítico ausente, readiness falhou, state corrompido)
    → Ação de remediação (bootstrap, preflight, fix)

P2: Gap estrutural não-bloqueante (contexto incompleto mas utilizável)
    → Ação de completude (show-context, setup)

P3: Intake operacional (tudo ok, pronto para trabalhar)
    → Comando principal do squad (triage, diagnose, create)
```

### Regra Dura

Se existe blocker explícito, **NUNCA** sugerir CTA genérico (`*help`, `*triage`) antes de oferecer a remediação do blocker.

### Exemplos por Tipo de Squad

**Squad com workspace integration (c-level, brand, movement):**
```yaml
- signal: "no_businesses"
  check: "countBusinesses() === 0"
  severity: "blocking"
  next_action: "*bootstrap"

- signal: "diagnostic_with_critical_gaps"
  check: "recent diagnostic has critical_gaps.length > 0"
  severity: "blocking"
  next_action: "*diagnose-business {slug}"

- signal: "all_diagnostics_healthy"
  check: "all diagnostics score >= 70"
  severity: "ready"
  next_action: "*progress-check {slug}"
```

**Squad com session context (copy, traffic-masters):**
```yaml
- signal: "no_session_context"
  check: "!fs.existsSync(sessionPath)"
  severity: "blocking"
  next_action: "node squads/{squad}/scripts/set-active-context.cjs --business=<slug>"

- signal: "context_loaded_no_campaign"
  check: "context exists but campaign_slug is null"
  severity: "non_blocking"
  next_action: "*briefing"

- signal: "context_ready"
  check: "context + campaign loaded"
  severity: "ready"
  next_action: "*diagnose"
```

**Squad com design system context (design):**
```yaml
- signal: "no_ds_context"
  check: "!context.design_system"
  severity: "blocking"
  next_action: "set-active-context"

- signal: "ds_context_loaded"
  check: "context.design_system exists"
  severity: "ready"
  next_action: "*ds-query"
```

---

## PHASE 3: GENERATION

### Step 3.1: Carregar Template

```yaml
action: read
file: "templates/greeting-script-tmpl.cjs"
```

### Step 3.2: Preencher Template

Substituir placeholders com dados do squad:

| Placeholder | Valor |
|-------------|-------|
| `{{SQUAD_NAME}}` | Nome do squad (kebab-case) |
| `{{ENTRY_AGENT}}` | ID do entry agent |
| `{{SQUAD_DIR}}` | Path relativo ao squad |
| `{{CONTEXT_SOURCES}}` | Funções de data collection |
| `{{GAP_MAP}}` | Heurística de inferNextAction |
| `{{GREETING_SECTIONS}}` | Seções contextuais do greeting |
| `{{COMMANDS_TABLE}}` | Tabela de comandos do entry agent |
| `{{RUNTIME_DIRECTIVES_PREFIX}}` | Prefixo do bloco de directives |

### Step 3.3: Gerar Funções Core

Cada script DEVE implementar:

```javascript
// 1. Data Collection (deterministic, no LLM)
function collectContext() { /* lê arquivos, parseia YAML, conta items */ }

// 2. Next Action Inference (deterministic heuristics)
function inferNextAction(context) { /* gap map com prioridades */ }

// 3. Greeting Builder (formatting)
function buildGreeting(context, nextAction) { /* monta markdown */ }

// 4. Runtime Directives (metadata para o agent)
function buildDirectives(context, nextAction) { /* <!-- DIRECTIVES --> */ }

// 5. Main
function main() {
  const context = collectContext();
  const nextAction = inferNextAction(context);
  const greeting = buildGreeting(context, nextAction);
  const directives = buildDirectives(context, nextAction);
  console.log(directives);
  console.log('');
  console.log(greeting);
}
```

---

## PHASE 4: INTEGRATION

### Step 4.1: Salvar Script

```yaml
action: write
path: "squads/{squad_name}/scripts/generate-{squad_name}-greeting.cjs"
```

### Step 4.2: Atualizar Entry Agent

Adicionar ou atualizar activation-instructions no entry agent:

```yaml
# Localizar activation-instructions no agent .md
# Adicionar/atualizar STEP 3.5:

"- STEP 3.5: Run greeting script (DETERMINISTIC, MANDATORY):
     Execute: node squads/{squad_name}/scripts/generate-{squad_name}-greeting.cjs
     Capture complete output. Display EXACTLY as returned.
     If script fails: fallback to inline greeting (STEP 4)."
```

### Step 4.3: Registrar no Config

Se o squad config tem seção `scripts:`, adicionar:

```yaml
scripts:
  - id: generate-greeting
    file: "scripts/generate-{squad_name}-greeting.cjs"
    description: "Greeting determinístico com Next Action (GREETING-CONTINUITY-001)"
    trigger: on_activation
```

---

## PHASE 5: VALIDATION

### Step 5.1: Executar Script

```bash
node squads/{squad_name}/scripts/generate-{squad_name}-greeting.cjs
```

Verificar:
- Exit code = 0
- Output contém `<!-- *_RUNTIME_DIRECTIVES`
- Output contém `**Next Action:**`
- Output é markdown válido

### Step 5.2: Testar 3 Cenários

```yaml
tests:
  - scenario: "no context (fresh start)"
    expected: "Next Action severity = blocking ou intake"

  - scenario: "blocking gap present"
    expected: "Next Action = remediação, NOT intake genérico"

  - scenario: "ready state"
    expected: "Next Action = comando operacional principal"
```

### Step 5.3: Checklist

Executar `checklists/greeting-script-checklist.md` no script gerado.

---

## Outputs

| Output | Format | Location |
|--------|--------|----------|
| Greeting script | .cjs | `squads/{squad}/scripts/generate-{squad}-greeting.cjs` |
| Agent updated | .md | `squads/{squad}/agents/{entry_agent}.md` (STEP 3.5) |
| Config updated | .yaml | `squads/{squad}/config.yaml` (scripts section) |

---

## Veto Conditions

```yaml
veto:
  - condition: "Script gerado sem inferNextAction()"
    action: "BLOCK — toda greeting DEVE ter Next Action"

  - condition: "Next Action usa CTA genérico quando blocker existe"
    action: "BLOCK — blocker sempre priorizado"

  - condition: "Script não produz Runtime Directives"
    action: "BLOCK — directives são obrigatórias para agent consumption"

  - condition: "Script depende de estado da LLM em vez de filesystem"
    action: "BLOCK — 100% determinístico, zero LLM"

  - condition: "Script escrito sem carregar template primeiro"
    action: "BLOCK — template enforcement rule"
```

---

## Command Integration

```bash
# Criar greeting script para um squad
*create-greeting-script c-level

# Criar para squad com agent específico
*create-greeting-script aiox-copy --agent copy-chief

# Audit mode (verificar se greeting existe e está correto)
*create-greeting-script c-level --audit
```

---

## Acceptance Criteria

- [ ] Script gerado e funcional (exit code 0)
- [ ] Output contém Runtime Directives block
- [ ] Output contém Next Action com severity icon
- [ ] inferNextAction() implementa gap map com 3+ prioridades
- [ ] 3 cenários de teste passam
- [ ] Entry agent atualizado com STEP 3.5
- [ ] Config atualizado com script registration
- [ ] Checklist greeting-script-checklist.md PASS

---

_Task Version: 1.0.0_
_Created: 2026-03-18_
_Author: squad-chief_
_Pattern: GREETING-CONTINUITY-001_
