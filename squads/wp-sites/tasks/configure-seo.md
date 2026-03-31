# Configure SEO Plugin

**Task ID:** `configure-seo`
**Pattern:** HO-TP-001
**Version:** 2.0
**Last Updated:** 2026-03-25

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Configure SEO Plugin |
| **status** | `pending` |
| **responsible_executor** | wp-developer |
| **execution_type** | `Hybrid` |
| **input** | SEO metadata from copy package |
| **output** | Fully configured SEO plugin |
| **action_items** | 5 steps |
| **acceptance_criteria** | 5 criteria |

## Action Items

### Step 1: Plugin Setup
- [ ] Complete Yoast/RankMath setup wizard
- [ ] Connect Google Search Console
- [ ] Configure social profiles

### Step 2: Per-Page Metadata
- [ ] Set title tag for each page
- [ ] Set meta description for each page
- [ ] Set focus keyword for each page
- [ ] Configure OG tags for social sharing

### Step 3: Schema Markup
- [ ] Add Organization schema
- [ ] Add LocalBusiness schema (if applicable)
- [ ] Add breadcrumb schema

### Step 4: Technical SEO
- [ ] Generate XML sitemap
- [ ] Configure robots.txt
- [ ] Set canonical URLs
- [ ] Enable breadcrumbs

### Step 5: Verification
- [ ] Run Yoast/RankMath analysis on each page (target green)
- [ ] Verify sitemap is accessible
- [ ] Check robots.txt is correct

## Acceptance Criteria

- [ ] **AC-1:** Title tags set on all pages (within 60 chars)
- [ ] **AC-2:** Meta descriptions set on all pages (within 160 chars)
- [ ] **AC-3:** XML sitemap generated and accessible
- [ ] **AC-4:** Schema markup present (Organization + LocalBusiness)
- [ ] **AC-5:** All pages show green in SEO plugin analysis

---

_Task Version: 2.0_
_Pattern: HO-TP-001_
_Last Updated: 2026-03-25_
