# QA Report Template

**Project:** [Project Name]
**Date:** [YYYY-MM-DD]
**Tester:** wp-developer
**Staging URL:** [URL]

---

## Cross-Browser Testing

| Browser | Version | Result | Notes |
|---------|---------|--------|-------|
| Chrome | [latest] | PASS/FAIL | [notes] |
| Firefox | [latest] | PASS/FAIL | [notes] |
| Safari | [latest] | PASS/FAIL | [notes] |
| Edge | [latest] | PASS/FAIL | [notes] |

---

## Mobile Testing

| Device | Width | Result | Notes |
|--------|-------|--------|-------|
| iPhone SE | 375px | PASS/FAIL | [notes] |
| iPhone 14 | 390px | PASS/FAIL | [notes] |
| Samsung Galaxy | 412px | PASS/FAIL | [notes] |
| iPad | 768px | PASS/FAIL | [notes] |
| iPad Pro | 1024px | PASS/FAIL | [notes] |

---

## Performance (Lighthouse)

| Metric | Score | Target | Result |
|--------|-------|--------|--------|
| Performance | [score] | >= 90 | PASS/FAIL |
| Accessibility | [score] | >= 90 | PASS/FAIL |
| Best Practices | [score] | >= 90 | PASS/FAIL |
| SEO | [score] | >= 90 | PASS/FAIL |

### Core Web Vitals

| Metric | Value | Target | Result |
|--------|-------|--------|--------|
| LCP | [X.X]s | < 2.5s | PASS/FAIL |
| FID | [X]ms | < 100ms | PASS/FAIL |
| CLS | [X.XX] | < 0.1 | PASS/FAIL |

---

## Functionality

| Test | Result | Notes |
|------|--------|-------|
| Contact forms | PASS/FAIL | [notes] |
| Internal links | PASS/FAIL | [broken count] |
| External links | PASS/FAIL | [broken count] |
| Images/alt text | PASS/FAIL | [missing count] |
| Navigation | PASS/FAIL | [notes] |
| 404 page | PASS/FAIL | [notes] |

---

## SEO

| Check | Result | Notes |
|-------|--------|-------|
| Title tags | PASS/FAIL | [missing count] |
| Meta descriptions | PASS/FAIL | [missing count] |
| H1 structure | PASS/FAIL | [issues] |
| XML sitemap | PASS/FAIL | [URL] |
| Schema markup | PASS/FAIL | [types] |

---

## Issues Found

| # | Severity | Description | Page | Status |
|---|----------|-------------|------|--------|
| 1 | [Critical/Major/Minor] | [description] | [page] | [Open/Fixed] |

---

## Verdict

**VERDICT:** GO / NO-GO

**Rationale:** [Explanation]

**Blocking Issues:** [Count -- 0 for GO]

**Minor Issues:** [Count -- acceptable for GO]
