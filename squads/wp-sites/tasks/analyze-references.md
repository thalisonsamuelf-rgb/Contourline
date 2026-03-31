# Analyze Reference Sites

**Task ID:** `analyze-references`
**Pattern:** HO-TP-001
**Version:** 2.0
**Last Updated:** 2026-03-25

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Analyze Reference Sites |
| **status** | `pending` |
| **responsible_executor** | wp-discovery |
| **execution_type** | `Agent` |
| **input** | Reference site URLs from discovery brief |
| **output** | Reference analysis document |
| **action_items** | 3 steps per reference site |
| **acceptance_criteria** | 3 criteria |

## Overview

Analyze each reference site the client provided during discovery. Extract patterns,
layouts, and elements that resonate with the client. Categorize into "adopt",
"adapt", and "avoid" for downstream agents.

## Action Items (per reference site)

### Step 1: Structural Analysis
- [ ] Identify page count and navigation structure
- [ ] Note hero section approach
- [ ] Document section patterns (benefits grid, testimonials, CTAs)

### Step 2: Visual Analysis
- [ ] Color palette used
- [ ] Typography approach
- [ ] White space and density
- [ ] Mobile responsiveness

### Step 3: Categorize Findings
- [ ] **Adopt:** Patterns to replicate directly
- [ ] **Adapt:** Patterns to modify for client brand
- [ ] **Avoid:** Patterns that do not fit the project

## Acceptance Criteria

- [ ] **AC-1:** Each reference site has a complete analysis
- [ ] **AC-2:** Adopt/Adapt/Avoid categories are populated
- [ ] **AC-3:** Analysis aligns with Asimov Academy style principles

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task** | `create-sitemap` |
| **Trigger** | Analysis complete |
| **Executor** | wp-architect |

---

_Task Version: 2.0_
_Pattern: HO-TP-001_
_Last Updated: 2026-03-25_
