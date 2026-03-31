# Configure Performance

**Task ID:** `configure-performance`
**Pattern:** HO-TP-001
**Version:** 2.0
**Last Updated:** 2026-03-25

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Configure Performance |
| **status** | `pending` |
| **responsible_executor** | wp-developer |
| **execution_type** | `Hybrid` |
| **input** | Built WordPress site on staging |
| **output** | Optimized site with Lighthouse 90+ |
| **action_items** | 5 steps |
| **acceptance_criteria** | 4 criteria |

## Action Items

### Step 1: Image Optimization
- [ ] Compress all images (WebP format preferred)
- [ ] Set appropriate image dimensions (no oversized images)
- [ ] Add lazy loading for below-the-fold images
- [ ] Ensure all images have alt text

### Step 2: Caching Configuration
- [ ] Enable page caching (WP Rocket or LiteSpeed)
- [ ] Enable browser caching
- [ ] Configure cache preloading
- [ ] Set cache expiration rules

### Step 3: Minification
- [ ] Minify CSS
- [ ] Minify JavaScript
- [ ] Combine files where beneficial
- [ ] Defer non-critical JS

### Step 4: CDN Setup (if applicable)
- [ ] Configure CDN (Cloudflare or plugin CDN)
- [ ] Verify static assets served from CDN

### Step 5: Performance Audit
- [ ] Run Lighthouse audit
- [ ] Run GTmetrix audit
- [ ] Check Core Web Vitals
- [ ] Fix any issues below threshold

## Target Metrics

| Metric | Target |
|--------|--------|
| Lighthouse Performance | >= 90 |
| Lighthouse Accessibility | >= 90 |
| Lighthouse Best Practices | >= 90 |
| Lighthouse SEO | >= 90 |
| LCP | < 2.5s |
| FID | < 100ms |
| CLS | < 0.1 |

## Acceptance Criteria

- [ ] **AC-1:** Lighthouse Performance >= 90
- [ ] **AC-2:** Core Web Vitals within targets
- [ ] **AC-3:** All images optimized and lazy-loaded
- [ ] **AC-4:** Caching active and verified

---

_Task Version: 2.0_
_Pattern: HO-TP-001_
_Last Updated: 2026-03-25_
