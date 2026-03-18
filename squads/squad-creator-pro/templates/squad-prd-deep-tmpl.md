# Deep Squad PRD Template

> **Template ID:** squad-prd-deep-template
> **Version:** 1.0.0
> **Purpose:** Planejamento profundo de squads grandes ou estrategicos antes da execucao
> **Primary Use:** `*plan-squad`
> **Reference Depth Benchmark:** `docs/projects/editais/epics/epic-editais-squad/epic.md`

---

# {{SQUAD_TITLE}} - Product Requirements Document

## PRD Metadata

```yaml
prd_id: {{PRD_ID}}
title: "{{SQUAD_TITLE}}"
status: draft
priority: {{PRIORITY}}
owner: squad-chief
created: {{DATE}}
updated: {{DATE}}
planning_mode: deep
source_of_truth: "docs/projects/{{DOMAIN}}/prd.md"
reference_depth_source: "{{REFERENCE_PATH_OR_NONE}}"
```

---

## 1. Strategic Context

### 1.1 Problem

{{PROBLEM_STATEMENT}}

### 1.2 Why Now

- {{WHY_NOW_1}}
- {{WHY_NOW_2}}
- {{WHY_NOW_3}}

### 1.3 Desired Outcomes

- {{OUTCOME_1}}
- {{OUTCOME_2}}
- {{OUTCOME_3}}

### 1.4 Success from Not Building vs Building

| Scenario | Impact |
|----------|--------|
| If we do nothing | {{DO_NOTHING_COST}} |
| If we build this squad | {{BUILDING_UPSIDE}} |

---

## 2. Squad Thesis

### 2.1 Core Thesis

{{SQUAD_THESIS}}

### 2.2 What This Squad Is

- {{IS_1}}
- {{IS_2}}
- {{IS_3}}

### 2.3 What This Squad Is Not

- {{IS_NOT_1}}
- {{IS_NOT_2}}
- {{IS_NOT_3}}

### 2.4 Operating Modes

| Mode | Trigger | What happens | Human checkpoint |
|------|---------|--------------|------------------|
| {{MODE_1}} | {{TRIGGER}} | {{BEHAVIOR}} | {{CHECKPOINT}} |
| {{MODE_2}} | {{TRIGGER}} | {{BEHAVIOR}} | {{CHECKPOINT}} |

---

## 3. Users, Decisions, and Deliverables

### 3.1 Primary Users

| User | Job to be done | Pain today | Desired outcome |
|------|----------------|------------|-----------------|
| {{USER_1}} | {{JOB}} | {{PAIN}} | {{OUTCOME}} |

### 3.2 Key Decisions the Squad Must Support

| Decision | Inputs needed | Output produced | Risk if wrong |
|----------|---------------|-----------------|---------------|
| {{DECISION_1}} | {{INPUTS}} | {{OUTPUT}} | {{RISK}} |

### 3.3 Canonical Deliverables

| Artifact | Purpose | Format | Source of truth |
|----------|---------|--------|-----------------|
| {{ARTIFACT_1}} | {{PURPOSE}} | {{FORMAT}} | {{SSOT}} |

---

## 4. Capability and Workflow Map

### 4.1 Capability Map

| Capability | Why it exists | Primary outputs | Dependencies |
|------------|---------------|-----------------|--------------|
| {{CAPABILITY_1}} | {{WHY}} | {{OUTPUTS}} | {{DEPS}} |

### 4.2 Workflow Inventory

| # | Workflow | Category | Complexity | Automation Potential | Notes |
|---|----------|----------|------------|----------------------|-------|
| 1 | {{WORKFLOW_1}} | {{CATEGORY}} | {{COMPLEXITY}} | {{AUTOMATION}} | {{NOTES}} |

### 4.3 Workflow Dependencies

```yaml
workflow_dependencies:
  {{WORKFLOW_ID}}:
    depends_on: [{{UPSTREAM_WORKFLOW_IDS}}]
    enables: [{{DOWNSTREAM_WORKFLOW_IDS}}]
```

### 4.4 Capability Gaps and Non-Goals

| Gap or Non-Goal | Why it remains out | Mitigation |
|-----------------|--------------------|------------|
| {{GAP_1}} | {{WHY_OUT}} | {{MITIGATION}} |

---

## 5. Knowledge Model and Canonical Artifacts

### 5.1 Core Concepts or Entities

| Concept | Definition | Why it matters | Canonical artifact |
|---------|------------|----------------|--------------------|
| {{CONCEPT_1}} | {{DEFINITION}} | {{WHY}} | {{ARTIFACT}} |

### 5.2 Evidence and Assumption Model

Use this section to distinguish:

- official or canonical facts
- verified operational facts
- supported inferences
- assumptions and open hypotheses

```yaml
evidence_model:
  canonical_fact: "{{DEFINITION}}"
  verified_fact: "{{DEFINITION}}"
  supported_inference: "{{DEFINITION}}"
  assumption: "{{DEFINITION}}"
```

### 5.3 Canonical Artifacts

| Artifact | Owner | Lifecycle stage | Schema-first? | Required for execution? |
|----------|-------|-----------------|---------------|-------------------------|
| {{ARTIFACT_1}} | {{OWNER}} | {{STAGE}} | {{YES_NO}} | {{YES_NO}} |

---

## 6. Agent Architecture

### 6.1 Orchestrator

```yaml
orchestrator:
  id: "{{SQUAD_SLUG}}-chief"
  purpose: "{{ORCHESTRATOR_PURPOSE}}"
  routes:
    - "{{ROUTE_1}}"
    - "{{ROUTE_2}}"
```

### 6.2 Agents by Tier or Function

```yaml
agents:
  tier_0:
    - id: "{{AGENT_ID}}"
      purpose: "{{PURPOSE}}"
      workflows: [{{WORKFLOW_IDS}}]
  tier_1:
    - id: "{{AGENT_ID}}"
      purpose: "{{PURPOSE}}"
      workflows: [{{WORKFLOW_IDS}}]
```

### 6.3 Handoff Map

| From | To | Trigger | Context passed | Exit condition |
|------|----|---------|----------------|----------------|
| {{FROM}} | {{TO}} | {{TRIGGER}} | {{CONTEXT}} | {{EXIT}} |

### 6.4 Workflow Coverage Matrix

| Workflow | Primary agent | Support agent | Quality gate |
|----------|---------------|---------------|--------------|
| {{WORKFLOW_1}} | {{AGENT}} | {{AGENT}} | {{GATE}} |

---

## 7. Tooling, Automation, and Boundaries

### 7.1 Tooling Strategy

| Need | Tool or pattern | Why selected | Human fallback |
|------|------------------|--------------|----------------|
| {{NEED_1}} | {{TOOL}} | {{WHY}} | {{FALLBACK}} |

### 7.2 Worker vs Agent Boundaries

| Operation | Preferred executor | Reason |
|-----------|--------------------|--------|
| {{OPERATION_1}} | {{WORKER_OR_AGENT}} | {{WHY}} |

### 7.3 External Integrations and Constraints

| Integration | Status | Constraint | Risk |
|-------------|--------|------------|------|
| {{INTEGRATION_1}} | {{STATUS}} | {{CONSTRAINT}} | {{RISK}} |

---

## 8. Governance, Quality, and Failure Modes

### 8.1 Quality Gates

| Gate | Trigger | What must be true | Blocking? |
|------|---------|-------------------|-----------|
| {{GATE_1}} | {{TRIGGER}} | {{CRITERIA}} | {{YES_NO}} |

### 8.2 Human Checkpoints

| Checkpoint | When | Decision required |
|------------|------|-------------------|
| {{CHECKPOINT_1}} | {{WHEN}} | {{DECISION}} |

### 8.3 Anti-Patterns and Veto Conditions

| Anti-Pattern | Why blocked | Detection |
|--------------|-------------|-----------|
| {{ANTI_PATTERN_1}} | {{WHY}} | {{DETECTION}} |

### 8.4 Failure Modes

| Failure mode | Signal | Mitigation | Rollback |
|--------------|--------|------------|----------|
| {{FAILURE_1}} | {{SIGNAL}} | {{MITIGATION}} | {{ROLLBACK}} |

---

## 9. Roadmap

### 9.1 Epic Overview

| Epic | Goal | Agents delivered | Workflows enabled | Dependencies |
|------|------|------------------|-------------------|--------------|
| 1 | Foundation + Orchestrator | {{AGENTS}} | {{WORKFLOWS}} | {{DEPS}} |

### 9.2 Epic Details

#### Epic {{EPIC_NUMBER}}: {{EPIC_TITLE}}

**Goal:** {{EPIC_GOAL}}

**Stories:**

| Story | Purpose | Acceptance summary | Gate |
|-------|---------|--------------------|------|
| {{STORY_ID}} | {{PURPOSE}} | {{AC_SUMMARY}} | {{GATE}} |

**Definition of Done:**

- [ ] {{DOD_1}}
- [ ] {{DOD_2}}
- [ ] {{DOD_3}}

### 9.3 Story Slicing Rules

- {{SLICING_RULE_1}}
- {{SLICING_RULE_2}}
- {{SLICING_RULE_3}}

### 9.4 Workflow Compliance (Mandatory)

> Stories that create workflows MUST include structural compliance ACs.
> Canonical schema: `squads/squad-creator/config/workflow-yaml-schema.yaml`

**Mandatory ACs for ANY story that creates a workflow:**

| AC | Reason |
|----|--------|
| Workflow uses `workflow.sequence[]` as canonical contract | Ensures dashboard rendering and CI validation |
| Workflow includes `workflow.type` field | Documentation and automatic classification |
| Agent names WITHOUT `@` prefix (e.g., `scanner`, NOT `@scanner`) | Filenames are `scanner.md`, validator resolves without `@` |
| `handoff_prompts` defined when workflow has agent transitions | Ensures context between handoffs |
| `validate-squad` PASSES after workflow creation | Final integrity gate |

---

## 10. Metrics and Readiness

### 10.1 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| {{METRIC_1}} | {{TARGET}} | {{MEASUREMENT}} |

### 10.2 Execution Readiness Checklist

- [ ] Problem and outcomes are explicit
- [ ] Workflow inventory is complete enough to start execution
- [ ] Agent architecture is defensible
- [ ] Governance and checkpoints are defined
- [ ] Epic 1 is ready to start

---

## 11. Risks, Assumptions, and Open Questions

### 11.1 Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| {{RISK_1}} | {{IMPACT}} | {{PROBABILITY}} | {{MITIGATION}} |

### 11.2 Assumptions

- {{ASSUMPTION_1}}
- {{ASSUMPTION_2}}

### 11.3 Open Questions

- [ ] {{OPEN_QUESTION_1}}
- [ ] {{OPEN_QUESTION_2}}

---

## 12. Handoff to Execution

### Next Command

```text
*create-squad {{DOMAIN}}
```

### Required Context for Execution

- `docs/projects/{{DOMAIN}}/prd.md`
- `epic_1` scope and stories clarified
- workflow priorities validated
- governance constraints preserved

---

## Appendix A: Source Inventory

| Source | Type | Why used |
|--------|------|----------|
| {{SOURCE_1}} | {{TYPE}} | {{WHY}} |

## Appendix B: Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| {{DATE}} | 1.0.0 | Initial deep PRD | @squad-chief |

## Appendix C: Planning Summary

```yaml
planning_summary:
  workflows_mapped: {{WORKFLOW_COUNT}}
  agents_estimated: {{AGENT_COUNT}}
  epics_planned: {{EPIC_COUNT}}
  handoff_ready: {{YES_NO}}
```
