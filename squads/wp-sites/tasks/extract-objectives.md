# Extract Objectives

**Task ID:** `extract-objectives`
**Pattern:** HO-TP-001
**Version:** 2.0
**Last Updated:** 2026-03-25

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Extract Objectives |
| **status** | `pending` |
| **responsible_executor** | wp-discovery |
| **execution_type** | `Agent` |
| **input** | Completed discovery brief |
| **output** | Structured objectives document |
| **action_items** | 4 steps |
| **acceptance_criteria** | 4 criteria |

## Overview

Transform the raw discovery briefing answers into a structured objectives document
with primary/secondary goals, success metrics, and measurable targets.

## Action Items

### Step 1: Identify Primary Objective
- [ ] Extract the single most important business goal from the brief
- [ ] Frame it as a measurable outcome (e.g., "Generate 10+ leads/month via contact form")

### Step 2: Identify Secondary Objectives
- [ ] List 2-4 supporting objectives from the brief
- [ ] Each must support the primary objective

### Step 3: Define Success Metrics
- [ ] For each objective, define how success will be measured
- [ ] Include target numbers where possible

### Step 4: Compile Objectives Document
- [ ] Write structured objectives document
- [ ] Include primary objective, secondary objectives, and success metrics

## Acceptance Criteria

- [ ] **AC-1:** Primary objective is stated with a measurable target
- [ ] **AC-2:** At least 2 secondary objectives are defined
- [ ] **AC-3:** Each objective has a success metric
- [ ] **AC-4:** Objectives trace back to discovery brief answers

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task** | `create-sitemap` |
| **Trigger** | Objectives approved |
| **Executor** | wp-architect |

---

_Task Version: 2.0_
_Pattern: HO-TP-001_
_Last Updated: 2026-03-25_
