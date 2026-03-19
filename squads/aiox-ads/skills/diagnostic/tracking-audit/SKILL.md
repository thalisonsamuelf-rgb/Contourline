# Tracking Audit Skill

**ID:** `tracking-audit`
**Category:** diagnostic
**Domain:** media-buyer
**Version:** 1.1.0

---

## Overview

Auditoria completa do setup de tracking incluindo Pixel, CAPI, eventos, deduplicação e match rate. Identifica problemas que afetam atribuição e otimização.

**Activation Command:** `*audit-tracking`
**Announce:** "Ativando Tracking Audit com CAPI Optimization Framework."

---

## Expert Sources

| Expert        | Framework               | Weight | Focus                 |
| ------------- | ----------------------- | ------ | --------------------- |
| Jeremy Haynes | CAPI Optimization       | 0.95   | Server-side tracking  |
| Jeremy Haynes | Pixel Funnel Validation | 0.93   | Hierarquia de eventos |
| Jeremy Haynes | Tracking Validation     | 0.92   | Discrepâncias         |

---

## v5.0 Addition: Page Analyzer Integration

The tracking audit now integrates with the page-analyzer skill for comprehensive landing page + tracking validation.

```yaml
page_analyzer_integration:
  skill_reference: "skills/diagnostic/page-analyzer/SKILL.md"
  relationship: "tracking-audit validates Pixel/CAPI technical setup; page-analyzer evaluates the full landing page experience including Pixel presence"

  integration_flow: |
    When tracking-audit is executed:
    1. Run standard tracking checks (Pixel, CAPI, events, deduplication, match rate)
    2. ADDITIONALLY dispatch page-analyzer for EMQ score
    3. Include EMQ score in tracking audit output as supplementary data
    4. If page-analyzer Pixel dimension < 6.0: flag as tracking concern

  cross_reference: |
    page-analyzer Pixel dimension (weight 20%) checks:
    - Meta Pixel base code present in HTML
    - Pixel ID matches account configuration
    - Standard events configured (PageView, ViewContent, etc.)
    - CAPI signals detected (server-side tracking)
    - Events firing correctly (fbq("track") calls present)

    tracking-audit goes DEEPER into each of these with technical validation.
    page-analyzer provides the SURFACE check + landing page quality context.
```

---

## v5.0 Addition: EMQ Threshold as Hard Gate (NON-NEGOTIABLE)

```yaml
emq_hard_gate:
  threshold: 6.0
  action_if_below: BLOCK
  scope: "Campaign launch is BLOCKED if landing page EMQ < 6.0"

  enforcement: |
    This threshold is enforced at two levels:
    1. page-analyzer skill (primary enforcement)
    2. launch-dod.md Gate 3 (checklist enforcement by @fiscal)
    3. tracking-audit now ALSO checks and reports EMQ status

  tracking_audit_responsibility: |
    During tracking audit:
    - IF EMQ score is available (page-analyzer already ran): include in report
    - IF EMQ score is NOT available: dispatch page-analyzer to generate it
    - IF EMQ < 6.0: add BLOCK recommendation to tracking audit output:
      "EMQ {score}/10.0 -- ABAIXO DO MINIMO. Lancamento BLOQUEADO ate landing page
      ser corrigida. Top melhorias listadas no page-analyzer report."

  reference:
    page_analyzer: "skills/diagnostic/page-analyzer/SKILL.md"
    launch_dod: "checklists/launch-dod.md -- Gate 3"
```

---

## v5.0 Addition: CAPI Verification Step (Browser + Server-Side)

```yaml
capi_verification:
  rule: "Tracking audit must verify BOTH browser-side (Pixel) AND server-side (CAPI) tracking"
  rationale: |
    With iOS 14.5+ privacy changes, browser-only tracking loses approximately 40% of
    attribution data. A complete tracking setup REQUIRES both:
    1. Browser-side: Meta Pixel firing events on the page
    2. Server-side: Conversions API (CAPI) sending events from the server

    Verifying only Pixel is insufficient. CAPI is now a CRITICAL requirement for
    accurate attribution and algorithm optimization.

  verification_process:
    browser_side:
      checks:
        - "Meta Pixel base code present (fbq init)"
        - "PageView event firing on load"
        - "Conversion events configured (Lead, Purchase, AddToCart, etc.)"
        - "Advanced Matching enabled (em, ph, fn, ln, etc.)"
        - "Event parameters complete (value, currency, content_ids)"
      tool: "WebFetch page analysis + MCP get_pixels"

    server_side:
      checks:
        - "CAPI endpoint configured and receiving events"
        - "Deduplication active (event_id matching between Pixel and CAPI)"
        - "Event Match Quality (EMQ) >= 6.0"
        - "Required user data parameters sent (external_id OR fbp/fbc, client_ip, user_agent)"
        - "High-priority parameters included (em, ph hashed SHA-256)"
        - "Events arriving within acceptable latency (< 1 hour of browser event)"
      tool: "MCP API diagnostics + Events Manager data"

  combined_score: |
    The tracking audit score now weights browser + server separately:
    - Browser-side (Pixel): 40% of total score
    - Server-side (CAPI): 40% of total score
    - Match rate & deduplication: 20% of total score

    A campaign with Pixel-only tracking (no CAPI) has a MAXIMUM possible score of
    60/100 -- which falls below the 80% "good" threshold and triggers a WARNING.

  emq_integration: |
    Event Match Quality (EMQ) is the Meta-provided quality score for CAPI data.
    - EMQ >= 8.0: Excellent (all user data params, low latency)
    - EMQ 6.0-7.9: Good (core params present, acceptable matching)
    - EMQ < 6.0: BLOCK -- tracking quality insufficient for campaign optimization

    EMQ < 6.0 is a hard gate that BLOCKS campaign launch (aligned with launch-dod.md Gate 2
    and page-analyzer EMQ threshold).

  reference:
    knowledge: "data/knowledge/meta/core_concepts.md (Pixel + CAPI section)"
    launch_dod: "checklists/launch-dod.md -- Gate 2"
    page_analyzer: "skills/diagnostic/page-analyzer/SKILL.md"
```

---

## Audit Checklist

### 1. Pixel Installation

```yaml
checks:
  - id: 'PIX-001'
    name: 'Base Code Present'
    check: 'Pixel base code em todas as páginas'
    severity: 'critical'

  - id: 'PIX-002'
    name: 'Single Installation'
    check: 'Apenas uma instalação do pixel'
    severity: 'high'
    common_issue: 'Duplicação via GTM + hardcode'

  - id: 'PIX-003'
    name: 'Correct Pixel ID'
    check: 'ID corresponde ao Business Manager'
    severity: 'critical'
```

### 2. Event Configuration

```yaml
event_hierarchy:
  required_events:
    - event: 'PageView'
      location: 'Todas as páginas'
      validates: 'Instalação básica'

    - event: 'ViewContent'
      location: 'Páginas de produto/vendas'
      validates: 'Interesse inicial'
      parameters: ['content_ids', 'content_type', 'value', 'currency']

    - event: 'AddToCart'
      location: 'Botão adicionar ao carrinho'
      validates: 'Intenção de compra'
      parameters: ['content_ids', 'value', 'currency']

    - event: 'InitiateCheckout'
      location: 'Início do checkout'
      validates: 'Alta intenção'
      parameters: ['value', 'currency', 'num_items']

    - event: 'Purchase'
      location: 'Página de obrigado'
      validates: 'Conversão final'
      parameters: ['value', 'currency', 'content_ids', 'order_id']
      critical: true

    - event: 'Lead'
      location: 'Formulário enviado'
      validates: 'Captura de contato'
      parameters: ['value', 'currency']

funnel_validation:
  rule: 'PageView > ViewContent > ATC > IC > Purchase'
  ratio_check:
    vc_to_pv: '> 10%'
    atc_to_vc: '> 5%'
    ic_to_atc: '> 30%'
    purchase_to_ic: '> 20%'
```

### 3. CAPI Configuration

```yaml
capi_checks:
  - id: 'CAPI-001'
    name: 'CAPI Active'
    check: 'Conversions API configurada'
    severity: 'critical'

  - id: 'CAPI-002'
    name: 'Event Match Quality'
    check: 'EMQ >= 6.0'
    severity: 'high'
    current_benchmark: 6.0

  - id: 'CAPI-003'
    name: 'Deduplication'
    check: 'event_id único por evento'
    severity: 'high'

  - id: 'CAPI-004'
    name: 'User Data Parameters'
    check: 'email, phone, name hasheados'
    severity: 'medium'

required_parameters:
  mandatory:
    - external_id: 'ou fbp/fbc'
    - client_ip_address: 'IP do usuário'
    - client_user_agent: 'User agent'

  high_priority:
    - em: 'Email hasheado SHA-256'
    - ph: 'Telefone hasheado'
    - fn: 'Primeiro nome hasheado'

  medium_priority:
    - ln: 'Sobrenome hasheado'
    - ct: 'Cidade hasheada'
    - zp: 'CEP hasheado'
```

### 4. Match Rate Analysis

```yaml
match_rate_benchmarks:
  excellent: '> 90%'
  good: '80% - 90%'
  acceptable: '60% - 80%'
  poor: '< 60%'

improvement_actions:
  - action: 'Adicionar email hasheado'
    impact: '+15-20% match rate'
  - action: 'Adicionar telefone hasheado'
    impact: '+10-15% match rate'
  - action: 'Adicionar external_id'
    impact: '+5-10% match rate'
```

---

## Audit Process

### Step 1: Data Collection

```javascript
const auditData = {
  // From Events Manager
  pixelEvents: await getPixelEvents(),
  capiEvents: await getCAPIEvents(),
  eventMatchQuality: await getEMQ(),

  // From website
  pixelInstallation: await checkPixelInstallation(),
  eventFiring: await testEventFiring(),

  // From backend
  capiLogs: await getCAPILogs(),
  deduplicationCheck: await checkDeduplication(),
};
```

### Step 2: Validation

```javascript
const validations = [
  validatePixelInstallation(auditData),
  validateEventHierarchy(auditData),
  validateCAPISetup(auditData),
  validateDeduplication(auditData),
  validateMatchRate(auditData),
];
```

### Step 3: Issue Identification

```javascript
const issues = validations
  .filter((v) => !v.passed)
  .map((v) => ({
    id: v.checkId,
    severity: v.severity,
    description: v.issue,
    recommendation: v.fix,
    expert: v.expert,
  }));
```

---

## Output Format

```yaml
tracking_audit:
  audit_date: '2026-02-01'
  domain: 'example.com'
  pixel_id: '123456789'

  overall_health: 'needs_attention' # healthy, needs_attention, critical
  score: 72 # 0-100

  checks:
    pixel_installation:
      status: 'passed'
      details: 'Pixel instalado corretamente'

    event_configuration:
      status: 'warning'
      details: 'ViewContent sem parâmetros value/currency'
      fix: "Adicionar fbq('track', 'ViewContent', {value: X, currency: 'BRL'})"

    capi:
      status: 'critical'
      details: 'CAPI não configurada'
      impact: '~40% perda de atribuição iOS'
      fix: 'Implementar CAPI via integração nativa ou GTM Server'

    deduplication:
      status: 'warning'
      details: 'event_id não encontrado'
      impact: 'Possível duplicação de eventos'

    match_rate:
      current: 58
      benchmark: 80
      status: 'poor'
      missing_params: ['em', 'ph']

  issues:
    critical: 1
    high: 2
    medium: 1

  recommendations:
    - priority: 1
      action: 'Implementar CAPI'
      impact: '+40% atribuição'
      expert: 'Jeremy Haynes'

    - priority: 2
      action: 'Adicionar event_id para deduplicação'
      impact: 'Dados mais precisos'
      expert: 'Jeremy Haynes'

    - priority: 3
      action: 'Enviar email e telefone hasheados'
      impact: '+25% match rate'
      expert: 'Jeremy Haynes'
```

---

## Integration

### Triggers

```yaml
triggers:
  - condition: 'conversions == 0 AND clicks > 100'
    action: 'run_tracking_audit'
    urgency: 'critical'

  - condition: 'event_match_quality < 5'
    action: 'run_tracking_audit'
    urgency: 'high'

  - condition: 'platform_conversions != backend_conversions > 30%'
    action: 'run_tracking_audit'
    urgency: 'critical'
```

### Dispatches To

- `metric-diagnosis` - após corrigir tracking
- `campaign-monitor` - para reavaliação

### Agent Assignment

- **Primary:** @pixel-specialist
- **Reports to:** @media-strategist

---

## Usage Examples

```
*audit-tracking

*audit-tracking --domain example.com

*audit-tracking --focus capi --detailed
```

### Sample Output

```
📍 AUDITORIA DE TRACKING

╔══════════════════════════════════════════════════════╗
║ DOMÍNIO: example.com                                 ║
║ PIXEL ID: 123456789                                  ║
╠══════════════════════════════════════════════════════╣
║                                                      ║
║ HEALTH SCORE: 72/100 - NEEDS ATTENTION              ║
║                                                      ║
║ ✅ Pixel Installation: OK                            ║
║ ⚠️  Event Configuration: Warning                     ║
║ 🔴 CAPI: Not Configured                             ║
║ ⚠️  Deduplication: Missing event_id                 ║
║ 🔴 Match Rate: 58% (benchmark: 80%)                 ║
║                                                      ║
╠══════════════════════════════════════════════════════╣
║ AÇÃO PRIORITÁRIA: Implementar CAPI                   ║
║ IMPACTO: +40% atribuição (Jeremy Haynes)            ║
╚══════════════════════════════════════════════════════╝
```

---

_Tracking Audit Skill v1.1.0_
_Media Buyer Squad - AIOS Synkra_
