# Create Sitemap & Hierarchy

**Task ID:** `create-sitemap`
**Pattern:** HO-TP-001
**Version:** 2.0
**Last Updated:** 2026-03-25

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Create Sitemap & Hierarchy |
| **status** | `pending` |
| **responsible_executor** | wp-architect |
| **execution_type** | `Agent` |
| **input** | Discovery brief, objectives document |
| **output** | Sitemap with page hierarchy and navigation |
| **action_items** | 4 steps |
| **acceptance_criteria** | 5 criteria |

## Overview

Define all site pages, their parent-child relationships, navigation structure,
and page objectives. The sitemap is the structural blueprint for the entire site.

## Action Items

### Step 1: Extract Pages from Brief
- [ ] List all pages mentioned in the discovery brief
- [ ] Add standard pages if missing (Home, Contact, Privacy Policy)
- [ ] Remove duplicates and consolidate similar pages

### Step 2: Define Hierarchy
- [ ] Organize into parent-child relationships
- [ ] Maximum 2 levels deep for most sites
- [ ] Each page gets a clear URL slug

### Step 3: Design Navigation
- [ ] Select 5-7 main navigation items
- [ ] Define footer navigation
- [ ] Define mobile navigation behavior

### Step 4: Assign Page Objectives
- [ ] Each page gets one primary objective
- [ ] Objective maps to a conversion action or information goal

## Acceptance Criteria

- [ ] **AC-1:** All pages from discovery brief are represented
- [ ] **AC-2:** Main navigation has 5-7 items maximum
- [ ] **AC-3:** Every page has a clear primary objective
- [ ] **AC-4:** URL structure is clean and SEO-friendly
- [ ] **AC-5:** Page hierarchy tree is documented

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task** | `create-wireframes` |
| **Trigger** | Sitemap approved by client |
| **Executor** | wp-architect |

---

_Task Version: 2.0_
_Pattern: HO-TP-001_
_Last Updated: 2026-03-25_
