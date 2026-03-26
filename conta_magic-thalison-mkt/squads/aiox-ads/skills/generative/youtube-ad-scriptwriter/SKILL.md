# YouTube Ad Scriptwriter Skill

**ID:** `youtube-ad-scriptwriter`
**Category:** generative
**Domain:** aiox-ads
**Version:** 1.0.0

---

## Overview

Generates complete YouTube Ads scripts with per-section timing (7 parts), applies the YouTube-specific 5-Second Hook Formula and validates the Relevance Triangle between ad group, ad content and landing page.

**Activation Command:** `*youtube-script`
**Announce:** "Activating YouTube Ad Scriptwriter with 7-Part Script Structure and 5-Second Hook Formula."

---

## Expert Sources

| Expert        | Framework                   | Weight | Focus                         |
| ------------- | --------------------------- | ------ | ----------------------------- |
| Brian Moncada | 7-Part YouTube Ad Script    | 0.95   | Complete script with timing   |
| Brian Moncada | 5-Second Hook Formula       | 0.92   | YouTube-specific hook         |
| Brian Moncada | YouTube Relevance Triangle  | 0.88   | Ad-audience alignment         |

---

## 7-Part Script Structure

### Script Architecture

```
YOUTUBE AD SCRIPT TIMELINE

0s          5s         15s         30s         45s         60s         90s        120s
|-----------|----------|-----------|-----------|-----------|-----------|----------|
|   HOOK    | PROBLEM  | SOLUTION  |CREDIBILITY|   PROOF   |   OFFER   |   CTA    |
| (0-5s)    | (5-15s)  | (15-30s)  | (30-45s)  | (45-60s)  | (60-90s)  | (90-120s)|
|           |          |           |           |           |           |          |
| Capture   | Amplify  | Present   | Establish | Show      | Detail    | Clear    |
| attention | the pain | way out   | authority | results   | the offer | action   |
|-----------|----------|-----------|-----------|-----------|-----------|----------|

NOTE: Timing adjusts based on objective (see IF/THEN rules)
```

### Part-by-Part Breakdown

```yaml
script_parts:
  1_hook:
    timing: '0-5 seconds'
    purpose: 'Capture attention before SKIP'
    format: 'Verbal + Visual (YouTube hooks are multimodal)'
    critical: true
    note: 'Viewer decides in 5s whether to watch or skip'
    elements:
      verbal: 'Impact phrase or question'
      visual: 'Quick cut, text on screen, movement'
      audio: 'Energetic tone, impact music'

  2_problem:
    timing: '5-15 seconds'
    purpose: 'Amplify the pain the viewer feels'
    format: 'Describe painful situation with specificity'
    elements:
      verbal: 'You are probably [situation]...'
      visual: 'B-roll of frustration, negative graphs'
      connection: 'Viewer needs to think "that is me"'

  3_solution:
    timing: '15-30 seconds'
    purpose: 'Present the way out (unique mechanism)'
    format: 'Introduce method/framework/system'
    elements:
      verbal: 'There is a method that [solves]...'
      visual: 'Diagram, visual framework, positive transition'
      note: 'Do not sell yet, just present that a way out exists'

  4_credibility:
    timing: '30-45 seconds'
    purpose: 'Establish authority and trust'
    format: 'Who you are, why they should listen to you'
    elements:
      verbal: 'My name is [X], in the last [Y] years...'
      visual: 'Client logos, screenshots, certifications'
      variants:
        - 'Personal results'
        - 'Client results'
        - 'Credentials and experience'
        - 'Media mentions'

  5_proof:
    timing: '45-60 seconds'
    purpose: 'Show concrete results (social proof)'
    format: 'Numbers, testimonials, case studies'
    elements:
      verbal: '[Number] of [people] achieved [result]...'
      visual: 'Screenshots, graphs, video testimonials'
      types:
        - 'Aggregate numbers (500+ students, R$10M managed)'
        - 'Specific case study (from X to Y in Z time)'
        - 'Testimonial (video or text with photo)'

  6_offer:
    timing: '60-90 seconds'
    purpose: 'Detail what they are getting'
    format: 'Value stack with price'
    elements:
      verbal: 'When you join, you get...'
      visual: 'Benefits list, mockups, value vs price'
      structure:
        - 'Benefit 1 (value R$X)'
        - 'Benefit 2 (value R$X)'
        - 'Benefit 3 (value R$X)'
        - 'Bonus (value R$X)'
        - 'Total: R$XX.XXX for only R$X.XXX'

  7_cta:
    timing: '90-120 seconds'
    purpose: 'Clear action and urgency'
    format: 'What to do now + why now'
    elements:
      verbal: 'Click the link below/the button now...'
      visual: 'Arrow to link, highlighted button, countdown'
      urgency:
        - 'Limited spots'
        - 'Price goes up on [date]'
        - 'Exclusive bonus for those who join today'
      note: 'Repeat CTA 2x (start and end of section)'
```

---

## IF/THEN Rules

```
IF objective = awareness
  THEN script 30-60s (TrueView InStream)
  STRUCTURE: Hook (5s) + Problem (10s) + Solution (15s) + CTA (10s)
  SKIP: Credibility and Proof (no time)

IF objective = conversion
  THEN script 90-120s (complete format, 7 parts)
  STRUCTURE: All 7 parts with standard timing

IF product high-ticket (>R$2000)
  THEN include extended Proof section (+30s)
  REASON: High-ticket requires more social proof to convert
  TIMING: Proof becomes 45-90s (instead of 45-60s)

IF remarketing (viewer already knows)
  THEN skip Problem, go straight to Offer
  STRUCTURE: Hook (5s) + Offer (15s) + CTA (10s) = 30s total
  REASON: Viewer already knows the problem and the solution

IF Relevance Triangle broken (ad != LP)
  THEN rewrite script before publishing
  REASON: Ad-LP mismatch destroys Quality Score and conversion
```

---

## 5-Second Hook Formula

### Hook Types

```yaml
hook_types:
  1_question:
    format: 'Direct question about the pain'
    example: 'Are you still struggling to get clients online?'
    best_for: 'Problem-aware audience'
    visual: 'Close-up on face, curiosity expression'

  2_statistic:
    format: 'Impactful number + implication'
    example: '97% of YouTube ads are ignored. Here is why...'
    best_for: 'Analytical audience, B2B'
    visual: 'Large number on screen, animation'

  3_contrarian:
    format: 'Challenge common belief'
    example: 'Stop spending on Google Ads right now. Seriously.'
    best_for: 'Experienced audience, pattern interrupt'
    visual: '"Stop" gesture, serious expression'

  4_story:
    format: 'Start of personal narrative'
    example: 'I was broke, with R$47 in my account, when I discovered...'
    best_for: 'Personal branding, high-ticket'
    visual: 'Informal setting, looking at camera'

  5_curiosity:
    format: 'Reveal something unexpected'
    example: 'The weird trick that tripled my sales in 30 days...'
    best_for: 'Broad audience, cold traffic'
    visual: 'Surprise expression, screen with result'

  6_direct:
    format: 'Get straight to the point'
    example: 'If you want to scale your business to 7 figures, watch this.'
    best_for: 'High-intent audience, remarketing'
    visual: 'Direct look at camera, confident tone'
```

### Hook Variant Generation

```
HOOK VARIANT GENERATION FLOW

For each script body:
    |
    +-- Generate 3-5 different hooks
    |   |
    |   +-- Hook 1: Question (safest)
    |   +-- Hook 2: Contrarian (pattern interrupt)
    |   +-- Hook 3: Statistic (credibility)
    |   +-- Hook 4: Story (emotional connection)
    |   +-- Hook 5: Direct (high-intent)
    |
    +-- Test all with same body
    |
    +-- Measure View Rate per hook (>20% = good)
    |
    +-- Scale winner, kill losers in 24-48h
```

---

## Relevance Triangle

```
YOUTUBE RELEVANCE TRIANGLE (Brian Moncada)

              Ad Group Keywords
                   /\
                  /  \
                 /    \
                / MATCH \
               / REQUIRED\
              /    ALL    \
             /    THREE    \
            /________________\
    Ad Content ----MATCH---- Landing Page

RULE: All three vertices MUST be aligned.

CORRECT example:
  Keywords: "business mentorship"
  Ad Script: Talks about business mentorship
  LP: Headline = "Business Mentorship"

INCORRECT example:
  Keywords: "business mentorship"
  Ad Script: Talks about digital marketing course
  LP: Generic services page

IF any pair is misaligned --> REWRITE before publishing
```

---

## Process

### Step 1: Define Objective

```yaml
inputs:
  objective: 'awareness | consideration | conversion'
  product:
    name: ''
    ticket: 0
    unique_mechanism: ''
    guarantee: ''
  audience:
    temperature: 'cold | warm | hot'
    main_pain: ''
    main_desire: ''
    awareness_level: 'unaware | problem_aware | solution_aware | product_aware'
  campaign:
    format: 'trueview_instream | bumper | discovery'
    targeting: ''
```

### Step 2: Select Hook Type

```yaml
hook_selection:
  cold_traffic:
    recommended: ['question', 'curiosity', 'statistic']
    avoid: ['direct']
    reason: 'Cold needs pattern interrupt'

  warm_traffic:
    recommended: ['story', 'contrarian', 'statistic']
    avoid: []
    reason: 'Warm already has some familiarity'

  hot_traffic:
    recommended: ['direct', 'story']
    avoid: ['question']
    reason: 'Hot already knows the problem, wants solution'
```

### Step 3: Write 7-Part Script

```yaml
writing_process:
  1: 'Write Section 2 (Problem) first -- anchors the entire script'
  2: 'Write Section 3 (Solution) -- direct answer to the problem'
  3: 'Write Sections 4-5 (Credibility + Proof) -- build trust'
  4: 'Write Section 6 (Offer) -- value stack'
  5: 'Write Section 7 (CTA) -- clear action'
  6: 'Write Section 1 (Hook) LAST -- hook is derived from the script'
  note: 'Writing hook last ensures it connects with the body'
```

### Step 4: Generate Hook Variants

```yaml
variant_generation:
  quantity: '3-5 hooks per script'
  types: 'Use at least 3 different types'
  format:
    per_variant:
      verbal: 'O que o presenter fala'
      visual: 'O que aparece na tela'
      timing: '0-5 segundos'
  testing:
    method: 'Mesmo body, hooks diferentes'
    kill_criteria: 'View Rate < 15% em 48h'
    scale_criteria: 'View Rate > 25%'
```

### Step 5: Validate Relevance Triangle

```yaml
validation_checklist:
  keyword_to_ad:
    check: 'Do ad group keywords appear in the script?'
    fix: 'Include primary keywords in hook and problem sections'

  ad_to_lp:
    check: 'Does script promise = LP headline?'
    fix: 'Align LP headline with offer section of script'

  keyword_to_lp:
    check: 'Do ad group keywords appear on the LP?'
    fix: 'Include keywords in H1, meta title and LP body'

  verdict:
    pass: 'All three pairs aligned'
    fail: 'Any pair misaligned -> rewrite before publishing'
```

---

## Output Format

```yaml
youtube_ad_script:
  product: 'Mentoria Empresarial'
  objective: 'conversion'
  total_duration: '120 seconds'
  format: 'TrueView InStream'
  generation_date: '2026-03-16'

  script:
    hook:
      timing: '0-5s'
      verbal: 'Voce sabia que 83% dos empresarios nunca passam de R$50k/mes? Vou te mostrar o que os outros 17% fazem diferente.'
      visual: 'Close-up, numero 83% na tela, expressao seria'
      type: 'statistic'

    problem:
      timing: '5-15s'
      verbal: 'Voce trabalha 12h por dia, investe em marketing, contrata equipe... mas o faturamento nao sai do lugar. Cada mes parece uma luta. E o pior: voce nao sabe exatamente o que esta errado.'
      visual: 'B-roll de escritorio, graficos estagnados, expressao de frustracao'

    solution:
      timing: '15-30s'
      verbal: 'Existe um metodo chamado Escala Inteligente que identifica os 3 gargalos do seu negocio e cria um plano de acao especifico para destrava-los. Nao e teoria -- e um framework testado com mais de 500 empresarios.'
      visual: 'Diagrama do framework, animacao dos 3 gargalos, transicao positiva'

    credibility:
      timing: '30-45s'
      verbal: 'Meu nome e [Nome]. Nos ultimos 8 anos, ajudei mais de 500 empresarios a escalar de 5 para 7 digitos. Ja fui mentorado por [referencia] e meu metodo foi validado em [X] nichos diferentes.'
      visual: 'Logos de clientes, screenshots de resultados, certificacoes'

    proof:
      timing: '45-60s'
      verbal: 'O Carlos chegou com faturamento de R$40k/mes. Em 90 dias de mentoria, ele bateu R$127k -- e nao parou. Hoje esta em R$200k/mes com margem de 45%. E o Carlos nao e excecao.'
      visual: 'Foto do Carlos, grafico de crescimento, depoimento em video'

    offer:
      timing: '60-90s'
      verbal: 'Quando voce entra na Mentoria Escala Inteligente, voce recebe: diagnostico completo do seu negocio, plano de acao personalizado, 12 sessoes 1:1 comigo, acesso a comunidade de empresarios e garantia incondicional de 30 dias.'
      visual: 'Visual benefit stack, material mockup, price with anchor'

    cta:
      timing: '90-120s'
      verbal: 'Clica no link aqui embaixo ou no botao nesta tela. Agenda uma sessao estrategica gratuita de 30 minutos. Sem compromisso. Eu vou pessoalmente analisar seu negocio e te mostrar os gargalos. Vagas limitadas -- clica agora.'
      visual: 'Seta para link, botao destacado, "Vagas Limitadas" na tela'

  hook_variants:
    variant_1:
      type: 'question'
      verbal: 'Voce sabe qual e o maior gargalo do seu negocio agora? A maioria dos empresarios nao sabe -- e por isso nao escala.'
      visual: 'Close-up, expressao de curiosidade, "?" na tela'

    variant_2:
      type: 'contrarian'
      verbal: 'Pare de investir em marketing agora. Serio. Se voce nao resolver ISSO primeiro, mais trafego so vai amplificar seus problemas.'
      visual: 'Gesto de "pare", expressao seria, texto "PARE" na tela'

    variant_3:
      type: 'story'
      verbal: 'Dois anos atras eu estava prestes a fechar minha empresa. Faturamento caindo, equipe desmotivada. Ate que descobri uma coisa...'
      visual: 'Ambiente informal, olhar na camera, tom vulneravel'

    variant_4:
      type: 'direct'
      verbal: 'Se voce fatura entre R$30k e R$100k por mes e quer chegar a R$300k, este video e pra voce. Preste atencao.'
      visual: 'Olhar direto na camera, fundo limpo, tom autoritativo'

  relevance_triangle:
    keywords: ['mentoria empresarial', 'escalar negocio', 'coaching para empresarios']
    ad_alignment: 'Script fala sobre mentoria para escalar negocio'
    lp_alignment: 'LP headline: Mentoria Empresarial para Escalar seu Negocio'
    verdict: 'PASS - Triangulo alinhado'

  testing_plan:
    method: 'Mesmo body, 4 hooks diferentes'
    budget_per_hook: 'R$50/dia'
    test_duration: '48-72h'
    kill_metric: 'View Rate < 15%'
    scale_metric: 'View Rate > 25% + CPA < target'

  expert_attribution:
    script_structure: 'Brian Moncada - 7-Part YouTube Ad Script'
    hooks: 'Brian Moncada - 5-Second Hook Formula'
    alignment: 'Brian Moncada - YouTube Relevance Triangle'
```

---

## Integration

### Triggered By

- User command - `*youtube-script`
- `creative-brief` - when platform=youtube
- `youtube-campaign-launcher` - when scripts are needed for campaigns

### Dispatches To

- `creative-brief` - for video production
- `youtube-campaign-launcher` - script ready for campaign
- `ad-compliance-gate` - pre-publish validation

### Agent Assignment

- **Primary:** @tom-breeze
- **Support:** @creative-analyst (copy review)
- **Escalation:** @ad-midas (positioning decisions)

---

## Usage Examples

```
*youtube-script "Mentoria Empresarial" --objective conversion --ticket 5000

*youtube-script --objective awareness --duration 30s

*youtube-script "Curso de Ads" --remarketing --short

*youtube-script "SaaS Product" --hooks-only --quantity 5
```

### Sample Output

```
YOUTUBE AD SCRIPTWRITER

+======================================================+
| PRODUTO: Mentoria Empresarial                         |
| OBJETIVO: Conversao | DURACAO: 120s | HOOKS: 4       |
+======================================================+
|                                                       |
| SCRIPT STRUCTURE (7 Parts)                            |
|                                                       |
| [0-5s] HOOK (statistic)                               |
| "83% dos empresarios nunca passam de R$50k/mes..."    |
|                                                       |
| [5-15s] PROBLEM                                       |
| "Voce trabalha 12h/dia mas o faturamento..."          |
|                                                       |
| [15-30s] SOLUTION                                     |
| "Metodo Escala Inteligente identifica 3 gargalos..."  |
|                                                       |
| [30-45s] CREDIBILITY                                  |
| "8 anos, 500+ empresarios, 5 a 7 digitos..."         |
|                                                       |
| [45-60s] PROOF                                        |
| "Carlos: R$40k --> R$127k em 90 dias..."              |
|                                                       |
| [60-90s] OFFER                                        |
| "Diagnostico + Plano + 12 sessoes + Comunidade..."    |
|                                                       |
| [90-120s] CTA                                         |
| "Clica no link, agenda sessao gratuita..."            |
|                                                       |
+-------------------------------------------------------+
| HOOK VARIANTS                                         |
|                                                       |
| V1 (question): "Qual e o maior gargalo...?"          |
| V2 (contrarian): "Pare de investir em marketing..."  |
| V3 (story): "Dois anos atras, prestes a fechar..."   |
| V4 (direct): "Se voce fatura R$30-100k/mes..."       |
|                                                       |
+-------------------------------------------------------+
| RELEVANCE TRIANGLE: PASS                              |
| Keywords <-> Ad <-> LP: Alinhados                     |
+-------------------------------------------------------+
| EXPERT: Brian Moncada - 7-Part YouTube Ad Script     |
+======================================================+
```

---

_YouTube Ad Scriptwriter Skill v1.0.0_
_AIOX Ads Squad - AIOS Synkra_
