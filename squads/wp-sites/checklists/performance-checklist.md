# Performance Checklist

**Checklist ID:** `performance-checklist`
**Phase:** Development
**Agent:** wp-developer

## Core Web Vitals
- [ ] LCP (Largest Contentful Paint) < 2.5 seconds
- [ ] FID (First Input Delay) < 100 milliseconds
- [ ] CLS (Cumulative Layout Shift) < 0.1

## Lighthouse Scores
- [ ] Performance >= 90
- [ ] Accessibility >= 90
- [ ] Best Practices >= 90
- [ ] SEO >= 90

## Images
- [ ] All images compressed (WebP format preferred)
- [ ] No oversized images (proper dimensions set)
- [ ] Lazy loading enabled for below-the-fold images
- [ ] No unused images in media library

## Caching
- [ ] Page caching enabled (WP Rocket or LiteSpeed)
- [ ] Browser caching configured
- [ ] Cache preloading active
- [ ] Object caching (if server supports)

## Assets
- [ ] CSS minified
- [ ] JavaScript minified
- [ ] Non-critical CSS deferred
- [ ] Non-critical JS deferred
- [ ] No render-blocking resources

## Server
- [ ] GZIP/Brotli compression enabled
- [ ] CDN configured (if applicable)
- [ ] PHP version is 8.0+ (latest stable)
- [ ] Database optimized (no overhead)

## Third-Party
- [ ] Google Fonts loaded locally (no external requests)
- [ ] Minimal third-party scripts
- [ ] Analytics loaded asynchronously
