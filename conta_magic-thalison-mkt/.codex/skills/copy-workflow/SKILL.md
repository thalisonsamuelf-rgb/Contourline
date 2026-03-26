---
name: copy-workflow
description: |
  Copy - Elite Copywriting Squad. Orquestra 10+ copywriters lendarios organizados
  por Tier para criar pecas de alta conversao com metodologia research-first.

  Pipeline multi-fase com Decision Matrix: Foundation (Tier 0) -> Strategy (Tier 2) ->
  Copy Creation (Tier 1, paralelo) -> Main Asset -> Email -> Validation (Tier 0).

  Suporta 3 workflows v1.0: Full Launch (wf-1), Paid Traffic (wf-2), Optimization (wf-6).
  Selecao via Decision Matrix de 5 perguntas obrigatorias.

  Use quando: criar copy de alta conversao, lancamentos de produto, campanhas de
  marketing direto, sales pages, VSLs, email sequences, ou otimizar funnels existentes.
---

# Copy - Elite Copywriting Squad

Pipeline multi-agente para criacao de copy de alta conversao usando Teams com copywriters lendarios.

## Overview

```
/copy-workflow "descricao do projeto"

Full Launch Pipeline (wf-1):
  Phase 1: Foundation     [SEQ] schwartz -> hopkins
  Phase 2: Strategy       [SEQ] kennedy -> todd-brown
    | HUMAN CHECKPOINT (Big Idea + Mechanism approval)
  Phase 3: Copy Creation  [PAR] halbert || bencivenga
    | HUMAN CHECKPOINT (Headlines + Bullets review)
  Phase 4: Main Asset     [SEQ] jon-benson OR halbert
  Phase 5: Email          [SEQ] chaperon
  Phase 6: Validation     [SEQ] hopkins + sugarman-check
```

## Input Collection (MANDATORY - all 5 questions required)

### Project Context
Collect: Product/Offer, Market/audience, Goal, Existing assets. Use AskUserQuestion.

### Decision Matrix (5 Questions)
```
Q1 - Awareness Level: 1.Unaware 2.Problem Aware 3.Solution Aware 4.Product Aware 5.Most Aware
Q2 - Sophistication:  1.First to Market 2.Second 3.Matured 4.Skeptical 5.Exhausted
Q3 - Price Point:     1.Low(<$100) 2.Mid($100-1K) 3.High($1K-5K) 4.Premium($5K+)
Q4 - Traffic:         1.Cold 2.Warm 3.Hot
Q5 - Primary Output:  1.VSL 2.Sales Letter 3.Email Sequence 4.Ad Creative 5.Landing Page 6.Funnel Optimization
```

**Validation**: ALL 7 inputs required (context + Q1-Q5). If ANY missing -> AskUserQuestion.

## WORKFLOW_REGISTRY

| Condition | Workflow | Phases |
|-----------|----------|--------|
| Q3=Premium OR (Q3=High + Q4=Cold) | wf-1-full-launch | 6 |
| Q3=High/Mid/Low + Q4=Warm/Hot | wf-2-paid-traffic | 3 |
| Q3=Mid + Q4=Cold | wf-2-paid-traffic | 3 |
| Q5=Funnel Optimization | wf-6-funnel-optimization | 4 |
| Default / Ambiguous | wf-1-full-launch | 6 |

Present recommendation. User can override. Planned (v2+): wf-3, wf-4, wf-5, wf-7.

## Setup

### Artifact Directory
```
outputs/copy/{slug}/
  diagnosis/ research/ foundation/ copy/ email/ testing/ offer/
```
Where `{slug}` = project name in snake_case.

### Team + Task Creation
`TeamCreate(team_name: "copy-{slug}")`

**Full Launch (wf-1):** Tasks 1-6 with blockedBy chain: 2->[1], 3->[2], 4->[3], 5->[4], 6->[5]
**Paid Traffic (wf-2):** Tasks 1-3 with chain: 2->[1], 3->[2]
**Optimization (wf-6):** Tasks 1-4 with chain: 2->[1], 3->[2], 4->[3]

## Context Preamble (include in EVERY agent prompt)
```
## AIOX Context Loading (mandatory)
1. Run `git status --short` and `git log --oneline -5`
2. Read `.aiox/gotchas.json` if exists (filter: Copywriting, Marketing)
3. Read `.aiox-core/development/data/technical-preferences.md`
4. Read `.aiox-core/core-config.yaml`
Do NOT display a greeting - go straight to work.
```

## Execution Pattern (CRITICAL)

**Sequential**: Task tool blocks until agent completes. No sleep needed.
**Parallel (Phase 3 only)**: Spawn with `run_in_background: true`, collect with `TaskOutput(block: true)`.
**Phase Gate**: After each phase, verify output files exist and have content. If missing, offer re-run.

### NEVER DO THIS

**Orchestration**: No sleep loops. No polling. No SendMessage polling. No spawning copy-chief as intermediary. Trust Task blocking.

**Copy Domain**: No headlines before awareness diagnosis. No skip Schwartz for cold traffic. No Sugarman as writer (checklist only). No all-30-triggers (15-20 max). No Halbert+Carlton same piece (voice conflict). No Ogilvy+Makepeace same piece (tone conflict). No bullets without headline context. No emails before main asset. No skip mental conversation for cold traffic.

---

## Phase Execution - Full Launch (wf-1)

All agents use: `subagent_type: "general-purpose"`, `team_name: "copy-{slug}"`, `mode: "bypassPermissions"`

### Phase 1: Foundation [SEQ: schwartz -> hopkins]

**Agent 1: @eugene-schwartz** (name: "schwartz")
```
Read your complete agent file at: squads/copy/agents/eugene-schwartz.md. Adopt persona.
{Context Preamble}
## Frameworks to Load
- squads/copy/frameworks/schwartz/five-levels-of-awareness.yaml
- squads/copy/frameworks/schwartz/five-stages-of-sophistication.yaml
- squads/copy/frameworks/schwartz/mass-desire-channeling.yaml
## Context
Project: {project_context} | Decision Matrix: Q1={q1}, Q2={q2}, Q3={q3}, Q4={q4}, Q5={q5}
## Mission
1. Diagnose EXACT awareness level (1-5) 2. Diagnose sophistication stage (1-5)
3. Define mass desire to channel 4. Headline direction per awareness level
5. Document implications for subsequent phases
## Output: outputs/copy/{slug}/diagnosis/awareness-diagnosis.md
```

**Agent 2: @claude-hopkins** (name: "hopkins") - AFTER schwartz completes
```
Read your complete agent file at: squads/copy/agents/claude-hopkins.md. Adopt persona.
{Context Preamble}
## Frameworks: Read squads/copy/frameworks/hopkins/ + squads/copy/checklists/hopkins-audit-checklist.md
## Previous Input: outputs/copy/{slug}/diagnosis/awareness-diagnosis.md
## Mission
1. Define measurable outcomes 2. Set tracking framework + baselines
3. Create testing hypotheses 4. Document scientific principles
5. Establish audit criteria for Phase 6
## Output: outputs/copy/{slug}/diagnosis/scientific-foundation.md
```

**Phase Gate**: Verify both files in diagnosis/. **TaskUpdate 1 -> completed**

---

### Phase 2: Strategy [SEQ: kennedy -> todd-brown]

**Agent 1: @dan-kennedy** (name: "kennedy")
```
Read your complete agent file at: squads/copy/agents/dan-kennedy.md. Adopt persona.
{Context Preamble}
## Frameworks
- squads/copy/frameworks/kennedy/3ms-triangle.yaml
- squads/copy/frameworks/kennedy/market-selection.yaml
- squads/copy/frameworks/kennedy/magnetic-marketing.yaml
Also: squads/copy/tasks/avatar-research.md
## Previous Inputs: Read outputs/copy/{slug}/diagnosis/*.md
## Context: Project: {project_context} | DM: Q1={q1}-Q5={q5}
## Mission
1. Market: Who is buyer? (starving crowd, pains, language) 2. Message: Core promise, urgency, objections
3. Media: Channels, formats 4. Offer Strategy: Core + bonuses + guarantee + pricing
## Output: outputs/copy/{slug}/research/avatar-profile.md + outputs/copy/{slug}/offer/offer-strategy.md
```

**Agent 2: @todd-brown** (name: "todd-brown") - AFTER kennedy completes
```
Read your complete agent file at: squads/copy/agents/todd-brown.md. Adopt persona.
{Context Preamble}
## Frameworks: Read all at squads/copy/frameworks/todd-brown/
## Previous Inputs: Read outputs/copy/{slug}/diagnosis/*.md + research/avatar-profile.md + offer/offer-strategy.md
## Mission
1. Problem Mechanism (why they failed, hidden cause, name it)
2. Solution Mechanism (why THIS works differently)
3. Big Marketing Idea (one sentence: intellectually interesting, emotionally compelling, impossible to ignore)
4. Proof Architecture
## Output: outputs/copy/{slug}/foundation/big-idea.md + outputs/copy/{slug}/foundation/unique-mechanism.md
```

**Phase Gate**: Verify research/, foundation/, offer/ files.

**HUMAN CHECKPOINT**: Present Big Idea (one sentence) + Mechanism summary + Avatar key points. Wait for approval.

**TaskUpdate 2 -> completed**

---

### Phase 3: Copy Creation [PARALLEL: halbert || bencivenga]

Spawn BOTH in a SINGLE message with `run_in_background: true`.

**Agent A: @gary-halbert** (name: "halbert", run_in_background: true)
```
Read your complete agent file at: squads/copy/agents/gary-halbert.md. Adopt persona.
{Context Preamble}
## Frameworks
- squads/copy/frameworks/halbert/headline-formulas.yaml
- squads/copy/frameworks/halbert/sales-letter-structure.yaml
- squads/copy/frameworks/halbert/bullet-writing.yaml
## Previous Inputs: Read outputs/copy/{slug}/diagnosis/*.md + research/*.md + foundation/*.md + offer/*.md
## Mission
Create Top 25 headlines: 8 story/curiosity + 8 direct benefit + 5 mechanism-based + 4 emotional.
Rank all 25, select Top 5 for testing with rationale per awareness level.
## Output: outputs/copy/{slug}/copy/headlines-top25.md
```

**Agent B: @gary-bencivenga** (name: "bencivenga", run_in_background: true)
```
Read your complete agent file at: squads/copy/agents/gary-bencivenga.md. Adopt persona.
{Context Preamble}
## Frameworks
- squads/copy/frameworks/bencivenga/fascinations.yaml
- squads/copy/frameworks/bencivenga/persuasion-equation.yaml
- squads/copy/frameworks/bencivenga/proof-elements.yaml
## Previous Inputs: Read outputs/copy/{slug}/diagnosis/*.md + research/*.md + foundation/*.md
## Mission
Create 30 fascination bullets + 20 benefit bullets. Select Top 15 for sales asset, Top 5 for ads.
Tag persuasion principles per bullet.
## Output: outputs/copy/{slug}/copy/bullets-fascinations.md
```

Collect: `TaskOutput(halbert_id, block: true)` + `TaskOutput(bencivenga_id, block: true)`

**Phase Gate**: Verify both copy/ files.

**HUMAN CHECKPOINT**: Present Top 5 headlines + Top 15 bullets. Wait for approval.

**TaskUpdate 3 -> completed**

---

### Phase 4: Main Asset [SEQ: 1 agent based on Q5]

If Q5=VSL -> @jon-benson. If Q5=Sales Letter or default -> @gary-halbert.

**If VSL: @jon-benson** (name: "benson")
```
Read your complete agent file at: squads/copy/agents/jon-benson.md. Adopt persona.
{Context Preamble}
## Frameworks: Read all at squads/copy/frameworks/benson/
## Previous Inputs: Read ALL outputs/copy/{slug}/ files (diagnosis, research, foundation, offer, copy)
## Mission: Complete VSL script using 5-Step: 1.Snap Suggestion Opening 2.Problem Amplification
3.Reluctant Hero Story 4.Solution Preview (Big Idea + Mechanism) 5.Offer & Ethical Close
Integrate top headlines, best bullets, offer structure, awareness-appropriate language.
## Output: outputs/copy/{slug}/copy/vsl-script.md
```

**If Sales Letter: @gary-halbert** (name: "halbert-letter")
```
Read your complete agent file at: squads/copy/agents/gary-halbert.md. Adopt persona.
{Context Preamble}
## Frameworks: squads/copy/frameworks/halbert/sales-letter-structure.yaml + boron-letters.yaml
## Previous Inputs: Read ALL outputs/copy/{slug}/ files
## Mission: Complete sales letter: 1.Headline (top from Phase 3) 2.Lead (story, awareness-matched)
3.Body (Problem->Mechanism->Solution->Proof) 4.Bullets (top from Phase 3) 5.Offer (full stack)
6.Close (urgency+guarantee+CTA) 7.P.S. (restate benefit+deadline)
## Output: outputs/copy/{slug}/copy/sales-letter.md
```

**Phase Gate + TaskUpdate 4 -> completed**

---

### Phase 5: Email [SEQ: chaperon]

**Agent: @andre-chaperon** (name: "chaperon")
```
Read your complete agent file at: squads/copy/agents/andre-chaperon.md. Adopt persona.
If file not found, proceed as expert email copywriter for Soap Opera Sequences.
{Context Preamble}
## Previous Inputs: Read main asset (vsl-script OR sales-letter) + avatar-profile + big-idea + offer-strategy
## Mission
1. SOS Launch Sequence (5 emails): Set Stage -> High Drama -> Epiphany -> Hidden Benefits -> Urgency
   Each: cliffhanger ending, Big Idea reference, link to sales asset, awareness-matched
2. Cart Abandonment (4 emails): 1h soft reminder -> 24h story+proof -> 48h objection -> 72h final urgency
## Output: outputs/copy/{slug}/email/sos-launch-sequence.md + cart-abandonment.md
```

**Phase Gate + TaskUpdate 5 -> completed**

---

### Phase 6: Validation [SEQ: hopkins -> sugarman-check]

**Agent 1: @claude-hopkins** (name: "hopkins-audit")
```
Read your complete agent file at: squads/copy/agents/claude-hopkins.md. Adopt persona.
{Context Preamble}
## Frameworks: squads/copy/checklists/hopkins-audit-checklist.md + squads/copy/frameworks/hopkins/
## Previous Inputs: Read ALL outputs/copy/{slug}/ files (all phases)
## Mission: Scientific audit of ALL copy. Score 7 dimensions 1-10 (specificity, reason-why, proof,
waste, consistency, headline validation, offer). Overall /100. Recommendations for scores <7. A/B suggestions.
## Output: outputs/copy/{slug}/testing/hopkins-audit.md
```

**Agent 2: Sugarman Triggers** (name: "sugarman-check")
```
You are applying Joe Sugarman's 30 Psychological Triggers as a CHECKLIST TOOL (not writing persona).
Read triggers: squads/copy/checklists/sugarman-30-triggers.md OR squads/copy/agents/joe-sugarman.md
{Context Preamble}
## Copy to Audit: Read main asset (vsl-script OR sales-letter)
## Mission: 1. Identify present triggers 2. Count (expect 15-20) 3. Gap: missing high-impact
(#1 Consistency, #5 Reason Why, #7 Honesty, #14 Storytelling, #16 Specificity, #26 Hope)
4. Recommend adding 3-5 naturally. WARNING: max 20 total.
## Output: outputs/copy/{slug}/testing/sugarman-triggers.md
```

**Phase Gate + TaskUpdate 6 -> completed**

---

## Workflow Variations

### Paid Traffic (wf-2) - 3 Phases

**Phase 1: Diagnosis** - @schwartz (awareness+sophistication) then @kennedy (avatar). Output: diagnosis/ + research/
**Phase 2: Ad Copy** - @halbert (20+ headlines + multi-platform ads). Output: copy/headlines.md + ad-variations.md
**Phase 3: Landing Page + Email** - @halbert (landing page) then @kennedy (thank-you + 5-email nurture). Output: copy/ + email/
No parallel. Human checkpoints at Phase 1 and 2.

### Funnel Optimization (wf-6) - 4 Phases

For EXISTING funnels with data.
**Phase 1: Diagnostic** - @hopkins (scientific audit) + @schwartz (awareness check). 6-dimension gap analysis.
**Phase 2: Fixes** - @halbert (headlines+lead) + @kennedy (offer+CTA). Priority: Headline>Lead>Offer>CTA>Proof.
**Phase 3: Triggers** - Sugarman audit (add 5-10 missing) + Hopkins verification (specificity maintained).
**Phase 4: A/B Test Setup** - @hopkins. Sample sizes, one variable per test, 95% confidence.
Human checkpoints at Phase 1 and 2.

---

## Finalization

### 1. Summary
Present: workflow used, decision matrix answers, all artifact paths, Hopkins score, Sugarman count, agents used, next steps (review, implement changes, set up A/B tests, launch).

### 2. Cleanup
`shutdown_request` to all agents -> `TeamDelete(team_name: "copy-{slug}")`

### 3. Follow-up
Offer: review artifact in detail, re-run phase, start complementary workflow.

## Implementation Notes
- Communication between phases via FILES (not messages)
- If agent fails, create NEW task (never revert completed)
- Agents load frameworks on-demand (atomic architecture)
- Agent source of truth: `squads/copy/agents/{agent}.md`
- Interactive workflows (@copy-chief, *commands) remain functional
- Scripts (copy.sh, copy-discovery.sh) preserved as legacy fallback
- Parallel execution ONLY Phase 3 (cap: 2 agents)
- SKILL.md IS the modernized copy-chief - do NOT spawn copy-chief as agent
