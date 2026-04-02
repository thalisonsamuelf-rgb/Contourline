# Define Visual Direction

**Task ID:** `define-visual-direction`
**Pattern:** HO-TP-001
**Version:** 2.0
**Last Updated:** 2026-03-25

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Define Visual Direction |
| **status** | `pending` |
| **responsible_executor** | wp-designer |
| **execution_type** | `Agent` |
| **input** | Discovery brief (brand assets), copy package, reference analysis |
| **output** | Visual direction document with design tokens |
| **action_items** | 4 steps |
| **acceptance_criteria** | 5 criteria |

## Overview

Establish the complete visual system following Asimov Academy style: typography scale,
color palette (neutral + one accent), spacing system, and component specifications.

## Action Items

### Step 1: Define Typography Scale
- [ ] Select primary font (geometric sans-serif recommended)
- [ ] Define H1-H3, body, small, caption sizes for desktop and mobile
- [ ] Define weights and line heights

### Step 2: Define Color Palette
- [ ] Background: #FFFFFF
- [ ] Text primary: #1A1A1A
- [ ] Text secondary: #666666
- [ ] Accent: Client brand color (single color)
- [ ] Accent hover: Darkened accent
- [ ] Surface: #F5F5F5
- [ ] Divider: #E5E5E5

### Step 3: Define Spacing System
- [ ] Section gap desktop and mobile
- [ ] Content padding desktop and mobile
- [ ] Max width container
- [ ] Card gap

### Step 4: Define Component Specs
- [ ] CTA button: background, text, padding, radius, hover
- [ ] Card: background, padding, radius, shadow
- [ ] Testimonial: quote format, attribution style

## Acceptance Criteria

- [ ] **AC-1:** Typography scale covers H1-caption with desktop/mobile sizes
- [ ] **AC-2:** Color palette has max 7 tokens
- [ ] **AC-3:** Spacing system is documented with desktop/mobile values
- [ ] **AC-4:** CTA button spec is complete
- [ ] **AC-5:** All tokens follow Asimov Academy style principles

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task** | `create-layout-specs` |
| **Trigger** | Visual direction approved |
| **Executor** | wp-designer |

---

_Task Version: 2.0_
_Pattern: HO-TP-001_
_Last Updated: 2026-03-25_
