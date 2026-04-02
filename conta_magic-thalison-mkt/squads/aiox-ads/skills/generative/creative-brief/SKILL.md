# Creative Brief Skill

**ID:** `creative-brief`
**Category:** generative
**Domain:** media-buyer
**Version:** 1.0.0

---

## Overview

Generates complete briefs for ad creative production, including visual direction, copy, technical specs and references. Aligns expectations between strategist and designer/editor.

**Activation Command:** `*create-brief {product}`
**Announce:** "Activating Creative Brief with Jordan Stupar and Jeremy Haynes frameworks."

---

## Expert Sources

| Expert         | Framework         | Weight | Focus                 |
| -------------- | ----------------- | ------ | --------------------- |
| Jordan Stupar  | Creative Strategy | 0.85   | Creative concept      |
| Jeremy Haynes  | DSL Revolution    | 0.95   | Content structure     |
| Jeremy Haynes  | Ad Science        | 0.93   | Variable testing      |
| Brandon Carter | Hook Methodology  | 0.88   | First seconds         |

---

## Brief Structure

### 1. Overview Section

```yaml
overview:
  project_name: ''
  client: ''
  product_service: ''
  campaign_objective: 'awareness|traffic|conversions|leads'
  target_cpa: ''
  deadline: ''
  deliverables_count: ''
```

### 2. Audience Definition

```yaml
audience:
  primary:
    demographics:
      age_range: ''
      gender: ''
      location: ''
      income_level: ''

    psychographics:
      interests: []
      pain_points: []
      desires: []
      beliefs: []
      objections: []

  awareness_level:
    type: 'unaware|problem_aware|solution_aware|product_aware|most_aware'
    implications: ''

  current_state: 'What are they doing now?'
  desired_state: 'Where do they want to get?'
```

### 3. Creative Direction

```yaml
creative_direction:
  tone:
    primary: 'educational|inspirational|urgent|provocative|empathetic'
    secondary: ''

  visual_style:
    aesthetic: 'clean|bold|minimal|luxury|casual|professional'
    colors:
      primary: ''
      secondary: ''
      accent: ''
    typography: 'serif|sans-serif|script|bold'

  mood: 'aspirational|urgent|trustworthy|exclusive|accessible'

  references:
    - url: ''
      what_to_use: ''
    - url: ''
      what_to_use: ''
```

### 4. Content Structure (DSL Revolution)

```yaml
content_structure:
  format: 'video|static|carousel|dsl'

  video_structure:
    hook:
      duration: '0-3 seconds'
      goal: 'Stop the scroll'
      type: 'problem|outcome|curiosity|contrarian'
      script: ''

    problem:
      duration: '3-10 seconds'
      goal: 'Identify the pain'
      script: ''

    solution:
      duration: '10-25 seconds'
      goal: 'Present the product'
      script: ''

    proof:
      duration: '25-40 seconds'
      goal: 'Show results'
      elements: ['testimonials', 'numbers', 'demonstration']

    cta:
      duration: '40-60 seconds'
      goal: 'Call to action'
      script: ''
      urgency: ''

  dsl_structure: # Jeremy Haynes
    slide_1:
      content: 'Introduction + offer'
      text_limit: '50 words'

    slide_2_3:
      content: 'Why it is a good offer'
      text_limit: '100 words'

    slide_4_5:
      content: 'FAQ / Objections'
      text_limit: '100 words'
      note: '77% reach here - essential content'

    arrow_prompt:
      text: 'Press to continue'
      note: '+20% → 77% slide 5 reach'
```

### 5. Copy Elements

```yaml
copy:
  primary_text:
    max_length: '125 visible characters + expanded'
    hook: ''
    body: ''
    cta: ''

  headline:
    max_length: '40 characters'
    options:
      - ''
      - ''
      - ''

  description:
    max_length: '30 characters'
    text: ''

  cta_button: 'Saiba Mais|Comprar|Inscreva-se|Baixar'
```

### 6. Technical Specs

```yaml
technical_specs:
  formats:
    - format: 'Feed 1:1'
      dimensions: '1080x1080'
      duration: '15-60s'
      file_size: 'Max 4GB'

    - format: 'Stories 9:16'
      dimensions: '1080x1920'
      duration: '15s'
      file_size: 'Max 4GB'

    - format: 'Reels 9:16'
      dimensions: '1080x1920'
      duration: '15-30s'
      file_size: 'Max 4GB'

  requirements:
    - 'Text in video: max 20% of image'
    - 'Subtitles mandatory'
    - 'Logo in last 3s'
    - 'Safe zones respected'

  file_format: 'MP4 H.264'
  audio: 'AAC stereo'
```

### 7. Variations Required

```yaml
variations:
  hook_variations: 5
  reason: 'Scientific testing (Brandon Carter)'

  a_b_tests:
    - element: 'Hook'
      variations: 5
      constant: 'Body + CTA'

    - element: 'CTA'
      variations: 3
      constant: 'Hook + Body'

  deliverables:
    - '5x Video Feed 1:1'
    - '5x Video Stories 9:16'
    - '1x Thumbnail per video'
```

---

## Output Format

```yaml
creative_brief:
  meta:
    version: '1.0'
    created: '2026-02-01'
    created_by: '@creative-analyst'
    approved_by: '@media-strategist'

  project:
    name: 'Campanha Curso Meta Ads - Q1 2026'
    product: 'Curso Meta Ads Mastery'
    deadline: '2026-02-07'

  audience:
    persona: 'Empreendedor digital, 25-45 anos, já investiu em ads sem resultado'
    pain: 'Gasta dinheiro em ads sem retorno'
    desire: 'Escalar negócio com tráfego pago previsível'
    awareness: 'Problem-aware (sabe que precisa de tráfego)'

  creative_direction:
    tone: 'Educativo + Urgente'
    style: 'Profissional mas acessível'
    colors: '#1877F2 (Meta blue), #FFFFFF, #000000'

  hook_options:
    - type: 'problema'
      script: 'Cansado de gastar com ads que não convertem?'

    - type: 'resultado'
      script: 'De R$0 a R$50k/mês em 90 dias'

    - type: 'curiosidade'
      script: 'O segredo que aprendi depois de R$1M em ads...'

    - type: 'controverso'
      script: 'Esqueça tudo sobre CBO...'

    - type: 'social_proof'
      script: '+500 alunos já dominam isso'

  body_constant:
    script: |
      Eu criei um método simples que qualquer pessoa pode aplicar.
      Não importa se você é iniciante ou avançado.
      Em [X] dias você vai saber exatamente como criar campanhas
      que vendem no automático.

  cta_constant:
    script: 'Clica no link e começa agora'
    button: 'Saiba Mais'
    urgency: 'Vagas limitadas para essa turma'

  specs:
    primary_format: 'Video 1:1'
    secondary_format: 'Video 9:16'
    duration: '45-60s'
    variations: 5

  references:
    - url: 'link_para_referencia_1'
      note: 'Usar estilo de edição similar'
    - url: 'link_para_referencia_2'
      note: 'Usar transições similares'

  checklist:
    - '[ ] Hook nos primeiros 3s'
    - '[ ] Legendas em todo vídeo'
    - '[ ] CTA claro no final'
    - '[ ] Logo nos últimos 3s'
    - '[ ] Texto < 20% do vídeo'
    - '[ ] Entregue em 1:1 e 9:16'

  expert_attribution:
    structure: 'Jeremy Haynes - DSL Revolution'
    testing: 'Brandon Carter - Constants vs Variables'
    creative: 'Jordan Stupar - Creative Strategy'
```

---

## Integration

### Triggered By

- `hook-generator` - after generating hooks
- `creative-fatigue-detector` - for new creatives
- User command - `*create-brief`

### Dispatches To

- Designer/Editor (external)
- `copy-generator` - for copy variations

### Agent Assignment

- **Primary:** @creative-analyst
- **Approval:** @media-strategist

---

## Usage Examples

```
*create-brief "Curso Meta Ads"

*create-brief "Mentoria High Ticket" --format dsl --variations 10

*create-brief --from-winner ad_123 --refresh
```

---

_Creative Brief Skill v1.0.0_
_Media Buyer Squad - AIOS Synkra_
