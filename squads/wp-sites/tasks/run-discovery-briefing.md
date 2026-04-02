# Run Discovery Briefing

**Task ID:** `run-discovery-briefing`
**Pattern:** HO-TP-001 (Task Anatomy Standard)
**Version:** 2.0
**Last Updated:** 2026-03-25

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Run Discovery Briefing |
| **status** | `pending` |
| **responsible_executor** | wp-discovery |
| **execution_type** | `Hybrid` |
| **input** | Client availability, project context |
| **output** | Discovery brief document |
| **action_items** | 6 sections of structured interview |
| **acceptance_criteria** | 6 criteria |

**Estimated Time:** 30-60 minutes

## Overview

Conduct a structured client interview across 6 sections to build a comprehensive
discovery brief. This brief becomes the single source of truth for all downstream
agents in the wp-sites pipeline.

## Input

- **Client** (required): Person with decision-making authority for the project
- **Existing materials** (optional): Brand guidelines, old website, competitor list
- **Project context** (optional): Budget range, timeline expectations

## Output

- **Discovery Brief** (markdown): Complete brief covering all 6 sections
  - Destination: `docs/projects/{project-name}/discovery-brief.md`
  - Format: Structured markdown with sections and answers

## Action Items

### Step 1: Business Context
Interview the client about their business:
- [ ] What does your business do in one sentence?
- [ ] Who are your main competitors?
- [ ] What makes you different from competitors?
- [ ] What is the primary business goal for this website?

### Step 2: Target Audience
Understand who the site serves:
- [ ] Who is your ideal customer?
- [ ] What problem do they have that you solve?
- [ ] What do they search for online when looking for your service?
- [ ] What objections do they have before buying?

### Step 3: Content & Pages
Define what the site needs:
- [ ] What pages does the site need?
- [ ] Do you have existing content to migrate?
- [ ] Do you need a blog?
- [ ] Do you need a portfolio/cases section?

### Step 4: Functionality
Capture technical requirements:
- [ ] Do you need contact forms?
- [ ] Do you need e-commerce functionality?
- [ ] Any integrations needed (CRM, email marketing, analytics)?
- [ ] Any specific features (booking, members area)?

### Step 5: Visual Preferences
Understand design direction:
- [ ] Do you have brand guidelines (logo, colors, fonts)?
- [ ] Share 2-3 websites you admire and explain what you like about each
- [ ] Any visual styles you specifically do NOT want?

### Step 6: Constraints
Capture project boundaries:
- [ ] What is your target launch date?
- [ ] Do you already have hosting and a domain?
- [ ] Any technical constraints we should know about?

## Acceptance Criteria

- [ ] **AC-1:** All 6 sections have complete answers (no blank sections)
- [ ] **AC-2:** Business goal is clearly stated and measurable
- [ ] **AC-3:** Target audience is defined with at least one pain point
- [ ] **AC-4:** Page list covers all required content areas
- [ ] **AC-5:** At least 1 reference site is analyzed
- [ ] **AC-6:** Timeline and hosting constraints are documented

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task** | `create-sitemap` |
| **Trigger** | Client approves discovery brief |
| **Executor** | wp-architect |

### Handoff Checklist
- [ ] All 6 sections complete
- [ ] Client has reviewed the brief
- [ ] Client has approved the brief
- [ ] Brief saved to project docs directory

---

_Task Version: 2.0_
_Pattern: HO-TP-001 (Task Anatomy Standard)_
_Last Updated: 2026-03-25_
