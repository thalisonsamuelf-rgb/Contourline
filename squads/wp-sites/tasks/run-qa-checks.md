# Run QA Checks

**Task ID:** `run-qa-checks`
**Pattern:** HO-TP-001
**Version:** 2.0
**Last Updated:** 2026-03-25

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Run QA Checks |
| **status** | `pending` |
| **responsible_executor** | wp-developer |
| **execution_type** | `Hybrid` |
| **input** | Built WordPress site on staging |
| **output** | QA report with go/no-go recommendation |
| **action_items** | 5 check categories |
| **acceptance_criteria** | 5 criteria |

## Action Items

### Category 1: Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
Note: Test key pages (Home, Services, Contact) in each browser

### Category 2: Mobile Testing
- [ ] iPhone SE (375px)
- [ ] iPhone 14 (390px)
- [ ] Samsung Galaxy (412px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
Note: Verify navigation, CTAs, forms, and text readability

### Category 3: Performance Audit
- [ ] Lighthouse Performance >= 90
- [ ] Lighthouse Accessibility >= 90
- [ ] Lighthouse Best Practices >= 90
- [ ] Lighthouse SEO >= 90
- [ ] Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1

### Category 4: Functionality Testing
- [ ] All contact forms submit correctly and emails are received
- [ ] All internal links work (no 404 errors)
- [ ] All external links work and open in new tab
- [ ] All images load with alt text
- [ ] Navigation works on all devices
- [ ] Footer links work
- [ ] Social media links open in new tab
- [ ] 404 page displays correctly
- [ ] Search function works (if applicable)

### Category 5: SEO Verification
- [ ] Title tags on all pages
- [ ] Meta descriptions on all pages
- [ ] One H1 per page
- [ ] XML sitemap generated and accessible
- [ ] Robots.txt configured correctly
- [ ] Schema markup present
- [ ] Canonical URLs set

## QA Report Format

```
QA REPORT: [Project Name]
Date: YYYY-MM-DD

CROSS-BROWSER: [PASS/FAIL per browser]
MOBILE: [PASS/FAIL per device]
PERFORMANCE: [Scores]
FUNCTIONALITY: [PASS/FAIL per item]
SEO: [PASS/FAIL per item]

ISSUES FOUND: [List with severity]
VERDICT: GO / NO-GO
```

## Acceptance Criteria

- [ ] **AC-1:** All browsers pass
- [ ] **AC-2:** All mobile devices pass
- [ ] **AC-3:** Lighthouse scores >= 90 in all categories
- [ ] **AC-4:** All forms and links work
- [ ] **AC-5:** SEO checklist complete

## Handoff

| Attribute | Value |
|-----------|-------|
| **Next Task** | `execute-go-live` |
| **Trigger** | QA report shows GO and client approves staging |
| **Executor** | wp-developer |

---

_Task Version: 2.0_
_Pattern: HO-TP-001_
_Last Updated: 2026-03-25_
