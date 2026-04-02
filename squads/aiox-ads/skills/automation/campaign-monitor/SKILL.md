# Campaign Monitor Skill

**ID:** `campaign-monitor`
**Category:** automation
**Domain:** media-buyer
**Version:** 1.1.0

---

## Overview

Sistema autônomo de monitoramento contínuo de campanhas que detecta triggers, executa decisões baseadas em frameworks de experts, e mantém registro completo de todas as ações para auditoria e reporting.

**Activation Command:** `*monitor-campaigns`
**Announce:** "Ativando Campaign Monitor com 47 frameworks de decisão."

---

## Expert Sources

| Expert         | Frameworks | Weight | Focus Area                           |
| -------------- | ---------- | ------ | ------------------------------------ |
| Jeremy Haynes  | 28         | 0.95   | Kill/Scale Rules, DSL, Estrutura     |
| Brian Moncada  | 10         | 0.90   | Andromeda Method, Métricas           |
| Alex Hormozi   | 5          | 0.92   | Unit Economics, LTV/CAC              |
| Brandon Carter | 3          | 0.88   | Constants vs Variables, Hook Testing |
| Jordan Stupar  | 1          | 0.85   | Creative Strategy                    |

---

## v5.0 Addition: monitoring-setup Dependency

The campaign-monitor skill now REQUIRES the monitoring-setup skill to be configured before executing monitoring loops. monitoring-setup CONFIGURES thresholds; campaign-monitor EXECUTES the loop.

```yaml
monitoring_setup_dependency:
  skill_reference: "skills/operational/monitoring-setup/SKILL.md"
  relationship: "monitoring-setup produces campaign-monitors.yaml --> campaign-monitor consumes it"
  config_file: "workspace/businesses/{slug}/ads/{platform}/campaign-monitors.yaml"

  pre_requisite: |
    Before starting a monitoring loop for any campaign:
    1. Verify campaign-monitors.yaml exists for the campaign
    2. If not configured, dispatch: *setup-monitoring {campaign_slug}
    3. Only proceed with monitoring loop AFTER thresholds are persisted

  what_monitoring_setup_provides:
    - "Persistent thresholds per campaign (CPA spike, CTR drop, budget overspend, frequency)"
    - "Schedule tier assignment (first_72h, standard, stable)"
    - "Learning Phase check configuration"
    - "Integration with campaign-state.yaml and pulse-report.md"
```

---

## v5.0 Addition: Persistent Thresholds (from campaign-monitors.yaml)

The monitoring loop now reads thresholds from `campaign-monitors.yaml` instead of using hardcoded defaults. This allows per-campaign customization by @performance-analyst.

```yaml
persistent_thresholds:
  source: "workspace/businesses/{slug}/ads/{platform}/campaign-monitors.yaml"
  managed_by: "@performance-analyst via monitoring-setup skill"

  default_thresholds:
    cpa_spike:
      warn: "CPA > target * 1.5"
      alert: "CPA > target * 3.0"
    ctr_drop:
      warn: "CTR < rolling_7d_avg * 0.80"
      alert: "CTR < rolling_7d_avg * 0.50"
    budget_overspend:
      warn: "daily_spend > daily_budget * 1.10"
      alert: "daily_spend > daily_budget * 1.20"
    frequency:
      warn: "frequency > 2.5"
      alert: "frequency > 3.0"
    learning_phase:
      check: "every_monitoring_cycle"
      ref: "config/safety-rules.yaml > learning_phase"

  customization: |
    @performance-analyst can adjust thresholds per campaign based on:
    - Industry benchmarks (from industry-templates/)
    - Historical performance (from campaign-state.yaml rolling data)
    - Business model specifics (e-commerce vs lead gen vs SaaS)

  fallback: |
    If campaign-monitors.yaml is missing or has no entry for a campaign,
    use the default_thresholds above. Log WARN: "No custom thresholds found,
    using defaults. Run *setup-monitoring to configure."
```

---

## v5.0 Addition: Report Schedule

```yaml
report_schedule:
  pulse_daily:
    frequency: "Daily"
    format: "templates/pulse-report.md"
    output_path: "workspace/businesses/{slug}/ads/{platform}/{campaign_slug}/reports/daily/pulse-{date}.md"
    content: |
      # Pulse -- {campaign_name} -- {date}
      Spend: R${spend} | CPA: R${cpa} ({trend} vs 7d avg) | ROAS: {roas}
      Top Winner: {best_ad_name} (CTR {ctr}%)
      Alert: {alert_or_none}
      Action: {auto_action_taken_or_none} | Tier: {Auto/HITL/Human}
    note: "5 lines, scannable in 15 seconds. Generated at end of each monitoring cycle."

  digest_weekly:
    frequency: "Weekly (every Monday)"
    format: "templates/digest-report.md"
    output_path: "workspace/businesses/{slug}/ads/{platform}/{campaign_slug}/reports/weekly/digest-{week}.md"
    content: |
      6 fixed sections:
      1. 7-day performance table (daily metrics)
      2. Top 3 insights (patterns, anomalies, trends)
      3. Recommendations with autonomy tier (Auto/HITL/Human)
      4. Decision log summary (actions taken this week)
      5. Creative fatigue assessment (3 tiers: OK/FADIGA/CRITICO)
      6. Next week priorities
    note: "3-minute read. Aggregates pulse data into strategic overview."

  templates_reference:
    pulse: "templates/pulse-report.md"
    digest: "templates/digest-report.md"
    error: "templates/error-notification.md"
```

---

## v5.0 Addition: Learning Phase Awareness in Monitoring Cycle

```yaml
learning_phase_monitoring:
  check: "EVERY monitoring cycle"
  position: "FIRST check in the cycle, before threshold evaluation"

  process: |
    1. Read campaign-state.yaml > learning_phase section
    2. If learning_phase.status == "active":
       a. Include in pulse-report: "Campanha em Learning Phase (dia N/7, X/50 conversoes)"
       b. BLOCK all kill/scale recommendations for this cycle
       c. If N > 14 (stuck in learning): escalate to HITL with restructuring recommendation
    3. If learning_phase.status == "reset":
       a. ALERT: "Learning Phase reiniciado -- instabilidade detectada"
       b. Increment reset counter in campaign-state.yaml
       c. Investigate cause (budget change > 20%? targeting edit? creative swap?)
    4. If learning_phase.status == "complete":
       a. Proceed with normal threshold evaluation
       b. Note in pulse: "Learning Phase complete -- full optimization active"

  skill_reference: "skills/diagnostic/learning-phase-detector/SKILL.md"
  knowledge_reference: "data/knowledge/meta/learning_phase.md"
```

---

## Core Capabilities

### 1. Continuous Monitoring Loop

```
┌─────────────────────────────────────────────────────┐
│               CAMPAIGN MONITOR LOOP                 │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐       │
│   │ FETCH   │───▶│ ANALYZE │───▶│ DECIDE  │       │
│   │ METRICS │    │ TRIGGERS│    │ ACTION  │       │
│   └─────────┘    └─────────┘    └─────────┘       │
│        │              │              │             │
│        ▼              ▼              ▼             │
│   ┌─────────┐    ┌─────────┐    ┌─────────┐       │
│   │ META    │    │ ROUTER  │    │ EXECUTE │       │
│   │ ADS API │    │ MATCH   │    │ OR ALERT│       │
│   └─────────┘    └─────────┘    └─────────┘       │
│                                      │             │
│                       ┌──────────────┘             │
│                       ▼                            │
│                 ┌───────────┐                      │
│                 │  LOG &    │                      │
│                 │  REPORT   │                      │
│                 └───────────┘                      │
│                                                     │
│   Interval: 15 min │ Cooldown: 30 min per adset   │
└─────────────────────────────────────────────────────┘
```

### 2. Decision Engine

O motor de decisão aplica regras dos 47 frameworks em ordem de prioridade:

```yaml
decision_priority:
  1_critical: # ROAS < 0.5, CPA > 3x target
    action: immediate_pause_or_alert
    requires_approval: false (pause) / true (scale down >50%)

  2_high: # CTR < 0.5%, Hook Rate < 15%
    action: pause_and_generate_new
    triggers_skill: hook-generator

  3_medium: # Frequência > 3, CPM subindo
    action: expand_or_refresh
    triggers_skill: creative-fatigue-detector

  4_low: # Otimizações incrementais
    action: log_for_review
    batch_recommendations: true
```

### 3. Agent Dispatch Matrix

```yaml
agent_dispatch:
  '@media-strategist':
    receives:
      - strategic_decisions
      - escalations
      - campaign_health_summary
    can_override: all_decisions

  '@performance-analyst':
    receives:
      - metric_anomalies
      - diagnosis_requests
    auto_dispatch_when:
      - condition: 'CPA variance > 30%'
      - condition: 'ROAS drop > 25% in 24h'

  '@creative-analyst':
    receives:
      - creative_fatigue_alerts
      - hook_generation_requests
    auto_dispatch_when:
      - condition: 'CTR < benchmark * 0.7'
      - condition: 'Hook Rate < 15%'

  '@pixel-specialist':
    receives:
      - tracking_issues
      - conversion_anomalies
    auto_dispatch_when:
      - condition: 'conversions == 0 AND clicks > 100'
      - condition: 'event_match_rate < 50%'
```

---

## Trigger Types

### Metric Triggers (Quantitative)

| ID     | Metric    | Condition         | Urgency  | Action          | Expert Source |
| ------ | --------- | ----------------- | -------- | --------------- | ------------- |
| MT-001 | ROAS      | < 0.5             | critical | alert + pause   | Jeremy Haynes |
| MT-002 | CPA       | > target \* 2     | critical | pause adset     | Jeremy Haynes |
| MT-003 | CTR       | < 0.5%            | high     | pause ad        | Brian Moncada |
| MT-004 | Hook Rate | < 15%             | high     | generate hooks  | Jeremy Haynes |
| MT-005 | Frequency | > 3               | medium   | expand audience | Jeremy Haynes |
| MT-006 | CPM       | > baseline \* 1.5 | medium   | test broad      | Brian Moncada |

### Semantic Triggers (Qualitative)

Detectados via análise de padrões em relatórios e comunicações:

```yaml
semantic_patterns:
  campaign_problem:
    - "campanha não está convertendo"
    - "ROAS caiu muito"
    - "gastando sem resultado"
    triggers: metric-diagnosis + kill-scale-rules

  creative_problem:
    - "criativos cansados"
    - "CTR despencou"
    - "ninguém clica"
    triggers: creative-fatigue-detector + hook-generator

  scaling_intent:
    - "quero escalar"
    - "aumentar investimento"
    - "dobrar o budget"
    triggers: scale-readiness-check + budget-allocation
```

---

## Safety Mechanisms

### Budget Protection

```javascript
const SafetyLimits = {
  maxBudgetChangePercent: 20, // Max 20% por ação
  requireApprovalAbove: 50, // >50% requer aprovação
  maxDailyActions: 10, // Max 10 ações/dia por campanha
  cooldownMinutes: 30, // 30 min entre ações no mesmo adset
};
```

### Rollback Capability

```javascript
const RollbackConfig = {
  checkpoint_before_action: true,
  store_previous_state: true,
  max_rollback_window: '24h',
  auto_rollback_conditions: [
    'ROAS drops > 50% within 2h of action',
    'CPA increases > 100% within 2h of action',
  ],
};
```

### Human Escalation

```yaml
escalation_rules:
  immediate:
    - 'ROAS < 0.3 sustained 4h'
    - 'Daily spend > budget * 1.5'
    - 'Suspicious activity detected'

  review_queue:
    - 'Multiple failed optimization attempts'
    - 'Conflicting signals (high CTR, low conversion)'
    - 'New campaign type without baseline'
```

---

## Decision Logging

Cada decisão autônoma é registrada com:

```typescript
interface DecisionLog {
  id: string; // DEC-{timestamp}
  timestamp: string; // ISO 8601

  trigger: {
    type: 'metric' | 'semantic' | 'scheduled';
    rule_id: string;
    rule_name: string;
    metric?: string;
    current_value?: number;
    threshold?: number;
  };

  decision: {
    type: string; // pause_ad, scale_budget, etc.
    target: string; // adset_id, ad_id, campaign_id
    confidence: number; // 0-1
    reasoning: string; // Explicação legível
  };

  expert_source: {
    name: string; // Jeremy Haynes, etc.
    framework: string; // Constants vs Variables, etc.
    weight: number; // Peso do expert
  };

  execution: {
    status: 'executed' | 'pending_approval' | 'failed' | 'rolled_back';
    result?: string;
    error?: string;
  };

  agents_notified: string[]; // [@media-strategist, @creative-analyst]
}
```

---

## Skill Chaining

O Campaign Monitor pode acionar cadeias de skills:

### Chain: Campaign Optimization

```
1. metric-diagnosis      → Diagnosticar problema
2. kill-scale-rules      → Decidir pausar/escalar
3. budget-allocation     → Realocar budget
4. [REPORT]              → Gerar relatório
```

### Chain: Creative Refresh

```
1. creative-fatigue-detector → Detectar fadiga
2. hook-generator            → Gerar novos hooks
3. creative-brief            → Criar brief para designer
4. [DISPATCH @creative-analyst]
```

### Chain: Scale Campaign

```
1. scale-readiness-check → Verificar prontidão
2. budget-allocation     → Planejar alocação
3. audience-expansion    → Identificar novos públicos
4. [APPROVAL GATE]       → Aguardar aprovação humana
5. [EXECUTE]             → Aplicar escala
```

---

## Configuration

### Runtime Config

```yaml
monitor_config:
  enabled: true
  check_interval_minutes: 15
  active_hours: '08:00-22:00' # Horário comercial BR
  timezone: 'America/Sao_Paulo'

  campaigns:
    include_patterns: ['*']
    exclude_patterns: ['test_*', 'draft_*']

  notifications:
    slack_webhook: '${SLACK_WEBHOOK_URL}'
    email: '${ALERT_EMAIL}'

  logging:
    level: 'info'
    decision_log_path: '.aios-core/logs/campaign-decisions/'
    retention_days: 90
```

---

## Usage Examples

### Iniciar Monitoramento

```
User: *monitor-campaigns
Agent: Ativando Campaign Monitor com 47 frameworks de decisão.

Configuração:
- Intervalo: 15 min
- Campanhas ativas: 5
- Frameworks carregados: 47
- Experts: Jeremy Haynes (28), Brian Moncada (10), Alex Hormozi (5)...

Iniciando loop de monitoramento...
```

### Relatório de Decisões

```
User: *monitor-report today

📊 Relatório de Decisões Autônomas - Hoje

| Hora  | Decisão | Target | Trigger | Expert | Status |
|-------|---------|--------|---------|--------|--------|
| 09:15 | Pause Ad | ad_123 | CTR 0.3% | Moncada | ✅ |
| 11:30 | Scale +20% | adset_456 | ROAS 3.2x 3d | Haynes | ✅ |
| 14:45 | Alert Human | camp_789 | ROAS 0.4 | - | ⚠️ |

Resumo:
- 3 decisões tomadas
- 2 executadas automaticamente
- 1 escalada para revisão humana
- R$150 economizado (pausas preventivas)
```

---

## Files

| File                               | Purpose                                     |
| ---------------------------------- | ------------------------------------------- |
| `SKILL.md`                         | Esta documentação                           |
| `rules/decision-rules.yaml`        | 47 regras de decisão com expert attribution |
| `scripts/campaign-monitor-loop.js` | Loop autônomo de monitoramento              |
| `templates/decision-report.md`     | Template de relatório de decisões           |

---

## Dependencies

```yaml
requires:
  skills:
    - metric-diagnosis
    - kill-scale-rules
    - hook-generator
    - creative-fatigue-detector
    - scale-readiness-check
    - budget-allocation

  external:
    - meta-ads-api
    - google-ads-api (optional)

  agents:
    - '@media-strategist'
    - '@performance-analyst'
    - '@creative-analyst'
    - '@pixel-specialist'
```

---

_Campaign Monitor Skill v1.1.0_
_Part of Media Buyer Squad Skills System_
