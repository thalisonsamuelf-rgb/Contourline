# Launch Checklist Template

**Project:** [Project Name]
**Launch Date:** [YYYY-MM-DD]
**Production Domain:** [domain.com]
**Engineer:** wp-developer

---

## Pre-Launch

- [ ] QA report verdict: GO
- [ ] Client staging approval received
- [ ] Final backup created and verified
- [ ] Rollback plan documented
- [ ] Low-traffic window selected: [time]

## DNS Migration

- [ ] A record updated to: [IP address]
- [ ] CNAME records updated (if applicable)
- [ ] DNS propagation verified
- [ ] Site resolves on production domain

## SSL

- [ ] SSL certificate activated
- [ ] HTTP to HTTPS redirect configured
- [ ] No mixed content warnings
- [ ] All pages load on HTTPS

## WordPress Settings

- [ ] Search engine visibility: ENABLED
- [ ] WordPress URL updated to production domain
- [ ] Site URL updated to production domain
- [ ] Internal links verified
- [ ] Sitemap submitted to Google Search Console

## Post-Launch Verification

- [ ] Site loads on https://[domain.com]
- [ ] All pages render correctly
- [ ] All forms submit and emails received
- [ ] Analytics tracking confirmed (real-time test)
- [ ] Google Search Console property verified
- [ ] Social media OG tags display correctly
- [ ] No console errors in browser

## Monitoring (48 hours)

- [ ] Uptime monitoring activated: [tool]
- [ ] Error reporting enabled
- [ ] Server resources monitored
- [ ] No 404 errors in Search Console
- [ ] No email delivery issues
- [ ] Hour 24 check: [status]
- [ ] Hour 48 check: [status]

## Final Status

- **Launch Status:** SUCCESS / ISSUES
- **Issues Found Post-Launch:** [count]
- **Rollback Needed:** YES / NO
- **Monitoring Complete:** [YYYY-MM-DD]
