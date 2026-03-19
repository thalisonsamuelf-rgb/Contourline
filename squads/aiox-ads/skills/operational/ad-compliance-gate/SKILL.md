# Ad Compliance Gate Skill

**ID:** `ad-compliance-gate`
**Category:** operational
**Domain:** aiox-ads
**Version:** 1.1.0

---

## Overview

Gate de compliance pre-publicacao que valida 15+ itens antes de uma campanha ir ao ar. Verifica tracking, unit economics, copy policy, creative specs, audience exclusions e naming conventions. Retorna veredicto PASS (green), WARNING (yellow) ou BLOCK (red) usando Traffic Light Leadership de Ryan Deiss.

**Activation Command:** `*compliance-check`
**Announce:** "Ativando Ad Compliance Gate com Accountability Loop e Traffic Light Leadership."

---

## Expert Sources

| Expert      | Framework                | Weight | Focus                        |
| ----------- | ------------------------ | ------ | ---------------------------- |
| Ryan Deiss  | Accountability Loop      | 0.90   | Ciclo de responsabilizacao   |
| Ryan Deiss  | Mistake Response Protocol| 0.88   | Resposta a erros             |
| Ryan Deiss  | Traffic Light Leadership | 0.85   | Sistema de status semaforo   |

---

## v5.0 Addition: Launch DoD Enforcement (NON-NEGOTIABLE)

This compliance gate now enforces the Launch Definition of Done checklist as a mandatory pre-condition for campaign activation. ALL 8 gates from launch-dod.md must pass.

```yaml
launch_dod_enforcement:
  checklist_reference: "checklists/launch-dod.md"
  enforcement: "ALL 8 gates must be BLOCK-free before campaign activation"
  enforced_by: "@fiscal (Safety Officer)"

  gates:
    1: "Campaign Status == PAUSED (API read-back)"
    2: "Pixel/CAPI validated and firing"
    3: "Landing Page EMQ Score >= 6.0 (via page-analyzer skill)"
    4: "Budget within safety-rules.yaml limits"
    5: "Audience exclusions configured (purchasers 30d excluded from cold)"
    6: "Creatives passed compliance check (this skill)"
    7: "Action ledger completely registered (WAL no gaps)"
    8: "Campaign state YAML updated (all IDs + config)"

  process: |
    When *compliance-check is run in "strict" mode (pre-launch):
    1. Execute all 7 existing compliance checks (copy, tracking, economics, creative, audience, budget, naming)
    2. ADDITIONALLY execute the 8-gate Launch DoD checklist
    3. Both sets of checks must pass for PASS verdict
    4. Any failure in either set = BLOCK

  result_format: |
    COMPLIANCE GATE verdict now includes a "Launch DoD" section:

    Launch DoD: 8/8 PASS  --> Campaign eligible for activation
    Launch DoD: 7/8 FAIL  --> BLOCK: Gate X failed (details)
```

---

## v5.0 Addition: Anti-Hallucination Validation Layer

```yaml
anti_hallucination_validation:
  rule: "Cross-check ALL declared data against real API data before approving compliance"
  rationale: |
    Agents may receive or generate data that doesn't match the actual campaign state
    in the platform. This validation layer ensures compliance decisions are based on
    REAL data from the Meta API, not locally cached or hallucinated values.

  process: |
    For every compliance check:
    1. READ campaign data from API (via MCP) -- this is the source of truth
    2. COMPARE declared values (from campaign-state.yaml, briefing, etc.) against API values
    3. If discrepancy detected:
       a. Log: "DISCREPANCY: {field} -- local: {local_value}, API: {api_value}"
       b. Use API value for compliance evaluation (API is always source of truth)
       c. Update local state file to match API
       d. If critical discrepancy (budget, status, targeting): BLOCK + investigate

  cross_checks:
    - field: "campaign_status"
      local: "campaign-state.yaml > status"
      api: "get_campaigns > status"
      on_mismatch: "BLOCK -- status mismatch is critical"

    - field: "daily_budget"
      local: "campaign-briefing.yaml > budget_diario"
      api: "get_campaigns > daily_budget"
      on_mismatch: "WARN -- update local to match API"

    - field: "targeting"
      local: "campaign-state.yaml > targeting_snapshot"
      api: "get_adsets > targeting"
      on_mismatch: "WARN -- targeting may have been edited outside agent control"

    - field: "creative_ids"
      local: "campaign-state.yaml > ad_ids"
      api: "get_ads > creative IDs"
      on_mismatch: "WARN -- creatives may have changed"
```

---

## v5.0 Addition: PAUSED Verification Post-Creation

```yaml
paused_verification:
  rule: "After campaign creation via API, perform a read-back to CONFIRM status == PAUSED"
  enforcement: "BLOCK activation if read-back fails or status != PAUSED"

  process: |
    After any create-campaign-api call:
    1. WAIT 2-3 seconds (API propagation)
    2. Execute GET campaign via API (read-back)
    3. Verify response.status == "PAUSED"
    4. If status == "PAUSED": log confirmation in action-ledger, proceed
    5. If status != "PAUSED":
       a. IMMEDIATELY execute pause-campaign (HITL)
       b. Log incident: "Campaign created with non-PAUSED status -- auto-corrected"
       c. Investigate cause (template error? API parameter issue?)
       d. BLOCK any further operations until root cause identified

  reference:
    safety_rules: "safety-rules.yaml -- paused_by_default: true"
    autonomy_tiers: "autonomy-tiers.yaml -- create-campaign-api constraints"
    ban_prevention: "checklists/ban-prevention.md -- check 2.4"
```

---

## v5.0 Addition: Ban Prevention Rules Check

```yaml
ban_prevention_enforcement:
  checklist_reference: "checklists/ban-prevention.md"
  enforcement: "Pre-automation checks (Section 1) must ALL pass before any API operation"

  integration: |
    The compliance gate now includes ban prevention validation:
    1. Pre-automation (Section 1, 5 checks): validated ONCE per account setup
       - BM verified + identity confirmed
       - 2FA on all connected accounts
       - Fixed IP for API calls
       - No VPN/proxy in use
       - Account age >= 30 days of manual activity
    2. During operation (Section 2, 6 checks): validated CONTINUOUSLY
       - Budget increases <= 20%/day
       - Max 5 campaigns/day (accounts < 90 days)
       - No API call spikes
       - PAUSED-by-default respected
       - Learning Phase not interrupted
       - Action ledger up to date

  compliance_gate_addition: |
    A new check item "ban_prevention" is added to the compliance gate output:
    - item: "ban_prevention"
      status: "PASS | WARN | BLOCK"
      details: "Pre-automation: 5/5 PASS, Operation: 6/6 PASS"
```

---

## Compliance Framework

### Gate Decision Tree

```
Campaign Ready to Publish?
    |
    +-- 1. Copy Policy Check
    |       |
    |       +-- Health/finance claims SEM disclaimer? --> BLOCK
    |       +-- Income claims SEM evidencia? ----------> BLOCK
    |       +-- Prohibited words detected? ------------> BLOCK
    |       +-- Clean? -------------------------------> PASS
    |
    +-- 2. Tracking Validation
    |       |
    |       +-- Dispatch tracking-audit
    |       +-- Score < 60%? --------------------------> BLOCK
    |       +-- Score 60-80%? -------------------------> WARNING
    |       +-- Score > 80%? --------------------------> PASS
    |
    +-- 3. Unit Economics Check
    |       |
    |       +-- Calculado? ----------------------------> PASS
    |       +-- Nao calculado? --> Redirect *calculate-economics --> BLOCK
    |
    +-- 4. Creative Specs
    |       |
    |       +-- Format/size/aspect ratio ok? ----------> PASS
    |       +-- Sem creative-brief? -------------------> WARNING
    |       +-- Specs fora do padrao? -----------------> BLOCK
    |
    +-- 5. Audience Validation
    |       |
    |       +-- Existing customers excluded (cold)? ---> PASS
    |       +-- Audience size < 1000? -----------------> WARNING
    |       +-- No exclusions configured? -------------> BLOCK
    |
    +-- 6. Budget Check
    |       |
    |       +-- Diario > 3x historico medio? ----------> WARNING (spike alert)
    |       +-- Dentro do range? ----------------------> PASS
    |
    +-- 7. Naming Convention
            |
            +-- Segue padrao? -------------------------> PASS
            +-- Fora do padrao? -----------------------> BLOCK
```

### Gate Modes

```
strict:   BLOCK on ANY warning (pre-launch de campanhas novas)
advisory: WARNING only, nunca bloqueia (fase de otimizacao)
auto:     strict para campanhas novas, advisory para estabelecidas (>7 dias)
```

---

## Gate Process

### Step 1: Copy Policy Scan

```yaml
policy_checks:
  health_claims:
    - pattern: "cura|emagrece|elimina gordura|garantido"
    - action: BLOCK se presente SEM disclaimer
    - disclaimer_required: true

  income_claims:
    - pattern: "ganhe R\\$|fature|renda extra garantida"
    - action: BLOCK se presente SEM evidencia
    - evidence_required: true

  prohibited_words:
    - platform_facebook: "crypto|MLM|armas|tabaco"
    - platform_google: "superlativo sem prova|melhor do mundo"
    - action: BLOCK imediato
```

### Step 2: Tracking Validation

```yaml
tracking_check:
  dispatch: tracking-audit
  threshold_block: 60
  threshold_warning: 80
  checks:
    - pixel_installed: boolean
    - events_configured: boolean
    - utm_parameters: boolean
    - conversion_api: boolean
    - attribution_window: string
```

### Step 3: Unit Economics Verification

```yaml
economics_check:
  required: true
  if_missing:
    action: BLOCK
    redirect: "*calculate-economics"
    message: "Unit economics nao calculado. Execute *calculate-economics antes de publicar."
  verify:
    - cpa_target: defined
    - roas_target: defined
    - breakeven_point: calculated
```

### Step 4: Creative Specs Validation

```yaml
creative_specs:
  facebook:
    image: { formats: [jpg, png], max_size_mb: 30, ratio: ["1:1", "4:5", "9:16"] }
    video: { formats: [mp4, mov], max_size_mb: 4096, ratio: ["1:1", "4:5", "9:16"], max_duration_s: 240 }
  google:
    image: { formats: [jpg, png], max_size_mb: 5, ratio: ["1.91:1", "1:1", "4:5"] }
    video: { formats: [mp4], max_size_mb: 256, max_duration_s: 180 }
  creative_brief_check:
    if_missing: WARNING
    message: "Criativo nao passou por creative-brief. Recomendado mas nao obrigatorio."
```

### Step 5: Audience Validation

```yaml
audience_checks:
  exclusion_cold:
    rule: "Existing customers MUST be excluded from cold campaigns"
    if_missing: BLOCK
  audience_size:
    minimum: 1000
    if_below: WARNING
    message: "Audiencia com menos de 1000 pessoas. Performance pode ser inconsistente."
  overlap_check:
    threshold: 30
    if_above: WARNING
```

### Step 6: Budget Spike Detection

```yaml
budget_check:
  spike_threshold: 3.0
  compare_against: "media dos ultimos 7 dias"
  if_spike: WARNING
  message: "Budget diario {budget} e {multiplier}x o historico medio ({average}). Confirme intencao."
```

### Step 7: Naming Convention

```yaml
naming_convention:
  pattern: "[Platform]_[CampaignType]_[Audience]_[Creative]_[Date]"
  example: "FB_CONV_COLD-LOOKALIKE_VID01_20260316"
  if_invalid: BLOCK
  message: "Nomenclatura fora do padrao. Corrija antes de publicar."
```

---

## SE/ENTAO Rules

```yaml
rules:
  - se: "ad menciona health/finance claims SEM disclaimer"
    entao: "BLOCK + alert para @ad-midas"
    severity: critical

  - se: "tracking-audit score < 60%"
    entao: "BLOCK publicacao"
    severity: critical

  - se: "unit-economics nao calculado"
    entao: "BLOCK com redirect para *calculate-economics"
    severity: critical

  - se: "creative nao passou por creative-brief"
    entao: "WARNING (nao block)"
    severity: medium

  - se: "audience size < 1000"
    entao: "WARNING (audiencia muito pequena)"
    severity: medium

  - se: "budget diario > 3x do historico medio"
    entao: "WARNING (spike alert)"
    severity: medium

  - se: "naming convention nao segue padrao"
    entao: "BLOCK (nomenclatura obrigatoria)"
    severity: high
```

---

## Output Format

```yaml
compliance_gate:
  campaign: "FB_CONV_COLD-LOOKALIKE_VID01_20260316"
  mode: "strict"
  timestamp: "2026-03-16T14:30:00Z"
  verdict: "BLOCK"

  checks:
    - item: "copy_policy"
      status: "PASS"
      details: "Nenhuma claim proibida detectada"

    - item: "tracking"
      status: "BLOCK"
      details: "Tracking audit score 45% (threshold: 60%)"
      dispatched: "tracking-audit"

    - item: "unit_economics"
      status: "PASS"
      details: "CPA target R$25, ROAS target 2.5x definidos"

    - item: "creative_specs"
      status: "WARNING"
      details: "Criativo nao passou por creative-brief"

    - item: "audience"
      status: "PASS"
      details: "Exclusoes configuradas, audiencia 45k"

    - item: "budget"
      status: "PASS"
      details: "Budget R$150/dia dentro do range historico"

    - item: "naming"
      status: "PASS"
      details: "Nomenclatura segue padrao"

  summary:
    pass: 5
    warning: 1
    block: 1
    final_verdict: "BLOCK"
    blocking_items:
      - "tracking: score 45% abaixo do threshold 60%"
    action_required:
      - "Corrigir tracking antes de publicar (dispatch tracking-audit em andamento)"
```

---

## Integration

### Dispatches To

- `tracking-audit` - quando tracking score esta abaixo do threshold
- `unit-economics` - quando unit economics nao foi calculado (redirect)
- `creative-brief` - recomendacao quando criativo nao passou por brief

### Receives From

- `publish-campaign` - trigger automatico (gate obrigatorio pre-publicacao)
- User command - `*compliance-check`

### Agent Assignment

- **Primary:** @fiscal (Sentinel)
- **Reports to:** @ad-midas

---

## Usage Examples

### Command Line

```
*compliance-check campaign_456

*compliance-check --mode strict --campaign FB_CONV_COLD_VID01

*compliance-check --mode advisory --all-active
```

### Sample Output

```
COMPLIANCE GATE - FB_CONV_COLD-LOOKALIKE_VID01_20260316
Mode: strict

+-----+------------------+----------+----------------------------------------+
|  #  | Check            | Status   | Details                                |
+-----+------------------+----------+----------------------------------------+
|  1  | Copy Policy      | PASS     | Nenhuma claim proibida detectada       |
|  2  | Tracking         | BLOCK    | Score 45% (min: 60%) - audit dispatch  |
|  3  | Unit Economics   | PASS     | CPA R$25, ROAS 2.5x definidos         |
|  4  | Creative Specs   | WARNING  | Sem creative-brief (nao obrigatorio)   |
|  5  | Audience         | PASS     | 45k users, exclusoes ok                |
|  6  | Budget           | PASS     | R$150/dia dentro do range              |
|  7  | Naming           | PASS     | Nomenclatura conforme padrao           |
+-----+------------------+----------+----------------------------------------+

VERDICT: BLOCK
Blocking items: tracking (score 45%)
Action: Corrigir tracking. Dispatch tracking-audit iniciado.
```

---

_Ad Compliance Gate Skill v1.1.0_
_AIOX Ads Squad - AIOS Synkra_
