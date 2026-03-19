# Kill Scale Rules Skill

**ID:** `kill-scale-rules`
**Category:** optimization
**Domain:** media-buyer
**Version:** 1.1.0

---

## Overview

Regras sistemáticas para pausar (kill) ou escalar ads/adsets/campanhas baseado em dados. Remove subjetividade das decisões de otimização.

**Activation Command:** `*apply-kill-scale`
**Announce:** "Ativando Kill Scale Rules com frameworks Jeremy Haynes e Brian Moncada."

---

## Expert Sources

| Expert        | Framework        | Weight | Focus                 |
| ------------- | ---------------- | ------ | --------------------- |
| Jeremy Haynes | Kill Rules       | 0.95   | Regras de pausa       |
| Jeremy Haynes | Scaling Rules    | 0.93   | Regras de escala      |
| Brian Moncada | Andromeda Method | 0.90   | Thresholds otimizados |
| Alex Hormozi  | Hydra Strategy   | 0.85   | Escala agressiva      |

---

## v5.0 Addition: Learning Phase Gate (FIRST STEP -- NON-NEGOTIABLE)

Before evaluating ANY kill or scale rule, the agent MUST check Learning Phase status.

```yaml
learning_phase_gate:
  step: 0  # Executes BEFORE all kill/scale rules
  check: "Run learning-phase-detector OR read campaign-state.yaml learning_phase section"
  if_active: "BLOCK ALL kill/scale actions. Return message: 'Learning Phase active -- no modifications allowed.'"
  sole_exception: "Campaign violating policy OR burning budget with ZERO results after 2x expected learning period"
  exception_tier: Human

  rationale: |
    During Learning Phase, Meta's algorithm is exploring optimal delivery.
    Performance metrics (CPA, ROAS, CTR) are artificially volatile and NOT representative
    of steady-state performance. Kill/scale decisions based on Learning Phase data
    will waste budget and reset the learning counter, compounding the damage.

  reference: "data/knowledge/meta/learning_phase.md"
  skill_reference: "skills/diagnostic/learning-phase-detector/SKILL.md"
```

---

## v5.0 Addition: Breakdown Effect Disclaimer (NON-NEGOTIABLE)

```yaml
breakdown_effect_disclaimer:
  rule: "NEVER make kill/scale decisions based solely on breakdown data"
  applies_to: "All kill rules AND all scale rules below"

  context: |
    Meta's breakdown metrics (by age, gender, placement, device) do NOT sum to the
    campaign/ad set total. Breakdowns are diagnostic tools for directional insight,
    NOT decision-making anchors. An age group showing high CPA in breakdowns may
    not reflect reality due to cross-device attribution and statistical sampling.

  agent_instruction: |
    When evaluating kill/scale triggers:
    1. ALWAYS use aggregate (total) metrics as the primary decision input
    2. Breakdowns may be used as SUPPORTING evidence only
    3. NEVER kill an ad set because one breakdown dimension looks bad
    4. NEVER scale based on a single breakdown showing good results
    5. If breakdown data contradicts aggregate data, aggregate wins

  reference: "data/knowledge/meta/breakdown_effect.md"
```

---

## v5.0 Addition: Auction Overlap Check (Pre-Scale Gate)

Before executing any SCALE action, verify no self-competition exists between ad sets.

```yaml
auction_overlap_pre_scale:
  step: 0.5  # After Learning Phase gate, before scale rules
  applies_to: "All scale rules (vertical, horizontal, hydra)"
  check: "Run auction-overlap-detector OR review last overlap report"

  if_overlap_above_30_percent:
    action: "BLOCK scale action for the overlapping ad sets"
    message: "Auction overlap > 30% detected between ad sets. Scaling will amplify self-competition and waste budget."
    recommendation: "Consolidate overlapping ad sets or apply mutual exclusions BEFORE scaling"
    tier: HITL

  if_overlap_15_to_30_percent:
    action: "WARN -- scale allowed with caution"
    message: "Moderate overlap (15-30%) detected. Monitor CPM and delivery after scaling."

  if_overlap_below_15_percent:
    action: "PASS -- proceed with scale"

  reference: "data/knowledge/meta/auction_overlap.md"
  skill_reference: "skills/diagnostic/auction-overlap-detector/SKILL.md"
```

---

## Knowledge Base References

| Document | Path | Relevance |
|----------|------|-----------|
| Learning Phase | `data/knowledge/meta/learning_phase.md` | MUST check before any kill/scale decision |
| Breakdown Effect | `data/knowledge/meta/breakdown_effect.md` | NEVER decide from breakdown data alone |
| Auction Overlap | `data/knowledge/meta/auction_overlap.md` | MUST check overlap before scaling |

---

## Kill Rules (Quando Pausar)

### Critical Kill Rules (Ação Imediata)

```yaml
kill_critical:
  - id: 'K-CRIT-001'
    name: 'ROAS Critical'
    condition: 'ROAS < 0.5'
    duration: '4h+'
    action: 'Pausar campanha'
    requires_approval: false
    expert: 'Jeremy Haynes'

  - id: 'K-CRIT-002'
    name: 'Zero Conversions'
    condition: 'Conversões = 0 AND Spend > 50% daily budget'
    action: 'Pausar + verificar tracking'
    requires_approval: false
    dispatch: 'tracking-audit'
    expert: 'Jeremy Haynes'
```

### High Priority Kill Rules

```yaml
kill_high:
  - id: 'K-HIGH-001'
    name: 'CPA 2x Rule'
    condition: 'CPA > target × 2'
    min_data: '1000 impressões'
    action: 'Pausar adset'
    requires_approval: false
    expert: 'Jeremy Haynes'

  - id: 'K-HIGH-002'
    name: 'CTR Floor'
    condition: 'CTR < 0.5%'
    min_data: '500 impressões'
    action: 'Pausar ad'
    requires_approval: false
    expert: 'Brian Moncada'

  - id: 'K-HIGH-003'
    name: 'Hook Rate Critical'
    condition: 'Hook Rate < 15%'
    min_data: '1000 impressões'
    action: 'Pausar ad + gerar novos hooks'
    dispatch: 'hook-generator'
    expert: 'Jeremy Haynes'

  - id: 'K-HIGH-004'
    name: 'Frequency Without Conversion'
    condition: 'Frequency > 3 AND Conversões = 0 in 48h'
    action: 'Pausar adset'
    expert: 'Jeremy Haynes'
```

### Medium Priority Kill Rules

```yaml
kill_medium:
  - id: 'K-MED-001'
    name: 'CPM Spike'
    condition: 'CPM > baseline × 2'
    window: '24h'
    action: 'Pausar + testar broad'
    expert: 'Brian Moncada'

  - id: 'K-MED-002'
    name: 'Learning Phase Stuck'
    condition: 'Learning Limited > 7 dias'
    action: 'Reestruturar adset'
    requires_approval: true
    expert: 'Jeremy Haynes'

  - id: 'K-MED-003'
    name: 'Cost Per Result Spike'
    condition: 'CPR > historical × 1.5'
    window: '3 dias'
    action: 'Pausar + diagnosticar'
    dispatch: 'metric-diagnosis'
    expert: 'Brian Moncada'
```

---

## Scale Rules (Quando Escalar)

### Vertical Scaling (Aumentar Budget)

```yaml
scale_vertical:
  - id: 'S-VERT-001'
    name: 'ROAS Stable 3 Days'
    condition: 'ROAS > 2.5 AND stable ±10% por 3 dias'
    action: 'Aumentar budget +20%'
    max_increase: '20% por 48h'
    requires_approval: false
    expert: 'Jeremy Haynes'

  - id: 'S-VERT-002'
    name: 'CPA Below Target'
    condition: 'CPA < target × 0.7 por 5 dias'
    action: 'Aumentar budget +30%'
    requires_approval: true
    expert: 'Alex Hormozi'

  - id: 'S-VERT-003'
    name: 'Winner Creative'
    condition: 'CTR > média × 1.5 AND ROAS > média'
    action: 'Aumentar share do ad +25%'
    requires_approval: false
    expert: 'Brandon Carter'
```

### Horizontal Scaling (Expandir)

```yaml
scale_horizontal:
  - id: 'S-HOR-001'
    name: 'Duplicate with New Audience'
    condition: 'ROAS > 3.0 AND Frequency < 2'
    action: 'Duplicar adset com nova audiência'
    requires_approval: true
    expert: 'Jeremy Haynes'

  - id: 'S-HOR-002'
    name: 'Lookalike Expansion'
    condition: 'Audience Saturation > 70% AND ROAS > 2.0'
    action: 'Expandir LAL de 1% para 3%'
    requires_approval: true
    expert: 'Jeremy Haynes'

  - id: 'S-HOR-003'
    name: 'Test Broad'
    condition: 'LAL 3% performando AND CPM < benchmark'
    action: 'Testar Broad targeting'
    requires_approval: true
    expert: 'Brian Moncada'
```

### Aggressive Scaling (Hydra Strategy)

```yaml
scale_hydra:
  - id: 'S-HYDRA-001'
    name: 'Multiple Structures'
    condition: 'Daily Spend > R$5k AND ROAS > 2.0 stable 7d'
    action: 'Criar campanha paralela'
    requires_approval: true
    expert: 'Alex Hormozi'
    note: 'Mesmo criativo, novo pixel, nova conta se possível'

  - id: 'S-HYDRA-002'
    name: 'LTV-Based Aggressive'
    condition: 'LTV/CAC > 3'
    action: 'Escalar +50%'
    requires_approval: true
    expert: 'Alex Hormozi'
```

---

## Decision Matrix

```
                 │ Low CPA      │ Target CPA   │ High CPA     │ 2x+ CPA
─────────────────┼──────────────┼──────────────┼──────────────┼──────────────
High ROAS        │ SCALE +30%   │ SCALE +20%   │ MONITOR      │ DIAGNOSE
(>2.5)           │              │              │              │
─────────────────┼──────────────┼──────────────┼──────────────┼──────────────
Target ROAS      │ SCALE +20%   │ MAINTAIN     │ OPTIMIZE     │ PAUSE/DIAG
(1.5-2.5)        │              │              │              │
─────────────────┼──────────────┼──────────────┼──────────────┼──────────────
Low ROAS         │ MONITOR      │ OPTIMIZE     │ PAUSE        │ KILL
(1.0-1.5)        │              │              │              │
─────────────────┼──────────────┼──────────────┼──────────────┼──────────────
Critical ROAS    │ DIAGNOSE     │ PAUSE        │ KILL         │ KILL NOW
(<1.0)           │              │              │              │
```

---

## Output Format

```yaml
kill_scale_analysis:
  campaign_id: '123456'
  analysis_date: '2026-02-01'

  current_metrics:
    roas: 2.8
    cpa: 25
    cpa_target: 30
    ctr: 1.8
    frequency: 1.5
    spend_today: 450

  rules_triggered:
    - rule_id: 'S-VERT-001'
      rule_name: 'ROAS Stable 3 Days'
      condition_met: true
      metrics:
        roas: 2.8
        stability: '±8% 3 dias'
      action: 'SCALE +20%'
      new_budget: 'R$540/dia'
      expert: 'Jeremy Haynes'

  rules_not_triggered:
    - rule_id: 'K-HIGH-001'
      reason: 'CPA dentro do target'

  recommendation:
    action: 'SCALE'
    type: 'vertical'
    change: '+20%'
    from: 'R$450/dia'
    to: 'R$540/dia'
    confidence: 0.93
    requires_approval: false

  safety_check:
    max_increase_respected: true
    cooldown_respected: true
    daily_limit_ok: true

  next_review: '48h'
```

---

## Integration

### Triggered By

- `campaign-monitor` - loop automático
- `metric-diagnosis` - após diagnóstico
- User command - `*apply-kill-scale`

### Dispatches To

- `metric-diagnosis` - para investigar
- `hook-generator` - quando CTR baixo
- `tracking-audit` - quando zero conversões

### Agent Assignment

- **Primary:** @performance-analyst
- **Approval:** @media-strategist

---

## Usage Examples

```
*apply-kill-scale campaign_123

*apply-kill-scale --all-active --dry-run

*apply-kill-scale --focus adset_456 --force-evaluate
```

### Sample Output

```
⚡ KILL/SCALE ANALYSIS - Campaign_123

╔══════════════════════════════════════════════════════╗
║ MÉTRICAS ATUAIS                                      ║
╠══════════════════════════════════════════════════════╣
║ ROAS: 2.8 ✅ | CPA: R$25 ✅ | CTR: 1.8% ✅           ║
║ Frequency: 1.5 ✅ | Spend: R$450/dia                 ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║ 🟢 REGRA TRIGGERED: S-VERT-001                      ║
║ "ROAS Stable 3 Days" (Jeremy Haynes)                ║
║                                                      ║
║ ROAS 2.8 estável (±8%) por 3 dias                   ║
║                                                      ║
╠══════════════════════════════════════════════════════╣
║ DECISÃO: SCALE +20%                                  ║
║ DE: R$450/dia → PARA: R$540/dia                     ║
║ CONFIANÇA: 93%                                       ║
║ APROVAÇÃO: Não requerida                             ║
╠══════════════════════════════════════════════════════╣
║ [Executar] [Adiar] [Revisar]                        ║
╚══════════════════════════════════════════════════════╝
```

---

_Kill Scale Rules Skill v1.1.0_
_Media Buyer Squad - AIOS Synkra_
