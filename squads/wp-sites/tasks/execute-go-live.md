# Execute Go-Live

**Task ID:** `execute-go-live`
**Pattern:** HO-TP-001
**Version:** 2.0
**Last Updated:** 2026-03-25

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_name** | Execute Go-Live |
| **status** | `pending` |
| **responsible_executor** | wp-developer |
| **execution_type** | `Hybrid` |
| **input** | QA report (GO verdict), client staging approval |
| **output** | Live website + monitoring setup |
| **action_items** | 6 steps |
| **acceptance_criteria** | 6 criteria |

## Pre-Conditions

- [ ] QA report verdict is GO
- [ ] Client has approved the staging site
- [ ] Backup of staging exists
- [ ] Rollback plan documented

## Action Items

### Step 1: Pre-Launch Final Check
- [ ] All forms tested one final time
- [ ] Backup created and verified
- [ ] Rollback procedure documented
- [ ] Low-traffic window selected for migration

### Step 2: DNS Migration
- [ ] Update A record to production server IP
- [ ] Update CNAME records if applicable
- [ ] Wait for DNS propagation (check via DNS checker tool)
- [ ] Verify site resolves on production domain

### Step 3: SSL Configuration
- [ ] Activate SSL certificate (Let's Encrypt or provider cert)
- [ ] Configure HTTP to HTTPS redirect
- [ ] Verify no mixed content warnings
- [ ] Test HTTPS on all pages

### Step 4: WordPress Production Settings
- [ ] Enable search engine visibility (Settings > Reading)
- [ ] Update WordPress URL and Site URL to production domain
- [ ] Update internal links if needed
- [ ] Submit sitemap to Google Search Console

### Step 5: Post-Launch Verification
- [ ] Site loads on production domain
- [ ] All pages render correctly
- [ ] All forms submit and emails are received
- [ ] Analytics tracking confirmed (GA4 or alternative)
- [ ] Google Search Console property verified
- [ ] Social media OG tags display correctly

### Step 6: 48-Hour Monitoring
- [ ] Uptime monitoring activated (UptimeRobot or similar)
- [ ] Error reporting enabled
- [ ] Monitor server resources (CPU, memory, disk)
- [ ] Check for 404 errors in Search Console
- [ ] Verify no email delivery issues

## Rollback Plan

If critical issues found after go-live:
1. Revert DNS to previous server
2. Restore from pre-launch backup
3. Document issues found
4. Fix issues on staging
5. Re-execute go-live when fixed

## Acceptance Criteria

- [ ] **AC-1:** Site live on production domain with HTTPS
- [ ] **AC-2:** All forms working on production
- [ ] **AC-3:** Analytics tracking confirmed
- [ ] **AC-4:** Search Console verified and sitemap submitted
- [ ] **AC-5:** 48-hour monitoring active
- [ ] **AC-6:** No critical issues in monitoring period

---

_Task Version: 2.0_
_Pattern: HO-TP-001_
_Last Updated: 2026-03-25_
