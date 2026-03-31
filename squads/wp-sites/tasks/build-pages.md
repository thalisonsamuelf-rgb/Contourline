# Build Pages in WordPress

**Task ID:** `build-pages`
**Pattern:** HO-TP-001
**Version:** 2.0
**Last Updated:** 2026-03-25

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Build Pages in WordPress |
| **status** | `pending` |
| **responsible_executor** | wp-developer |
| **execution_type** | `Hybrid` |
| **input** | Design specs, page copy package, sitemap |
| **output** | All pages built on staging |
| **action_items** | Per-page build process |
| **acceptance_criteria** | 5 criteria |

## Action Items (per page)

### For each page:
- [ ] Create WordPress page with correct template
- [ ] Build sections following design layout specs
- [ ] Insert copy from the page copy package
- [ ] Apply typography, colors, spacing from design tokens
- [ ] Configure CTA buttons with correct links
- [ ] Test responsive behavior at 375px, 768px, 1200px
- [ ] Verify on mobile device

### Navigation Setup
- [ ] Configure main navigation menu (5-7 items from sitemap)
- [ ] Configure footer navigation
- [ ] Test mobile hamburger menu

### Global Elements
- [ ] Header: logo, navigation, CTA if applicable
- [ ] Footer: navigation, contact info, copyright
- [ ] 404 page: custom design with search and navigation

## Acceptance Criteria

- [ ] **AC-1:** All sitemap pages are built and accessible
- [ ] **AC-2:** Each page matches design specs (typography, colors, spacing)
- [ ] **AC-3:** All copy matches the copy package
- [ ] **AC-4:** Navigation works correctly on all devices
- [ ] **AC-5:** All pages render correctly at 375px mobile

---

_Task Version: 2.0_
_Pattern: HO-TP-001_
_Last Updated: 2026-03-25_
