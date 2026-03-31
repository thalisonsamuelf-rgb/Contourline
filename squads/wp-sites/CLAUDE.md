# WP Sites Squad - CLAUDE.md

## Squad Overview

WP Sites is a 6-agent pipeline squad for end-to-end WordPress site creation.
It follows the Asimov Academy reference style and enforces client approval gates
between every phase.

## Architecture

| Agent | Role | Phase |
|-------|------|-------|
| wp-chief | Orchestrator, project coordinator, gate enforcer | All phases |
| wp-discovery | Briefing specialist, structured client interview | Phase 1: Discovery |
| wp-architect | Content architect, sitemap, wireframes, page frameworks | Phase 2: Architecture |
| wp-copywriter | Conversion copywriter, Asimov Academy style | Phase 3: Copywriting |
| wp-designer | Visual designer, Asimov Academy style, mobile-first | Phase 4: Design |
| wp-developer | WordPress dev + QA/Launch merged | Phase 5: Build+QA+Launch |

## Pipeline Flow

```
wp-discovery -> wp-architect -> wp-copywriter -> wp-designer -> wp-developer
     |              |               |               |               |
   [GATE]        [GATE]          [GATE]          [GATE]         [GATE]
   Client        Client          Client          Client         Client
   approves      approves        approves        approves       approves
   brief         sitemap         copy            design         staging
```

wp-chief orchestrates all phases and enforces client approval gates.

## Reference Style: Asimov Academy

- Large bold typography in Hero sections
- Neutral palette: white, black, gray + one accent color
- Direct copy: action verb + clear benefit
- Generous white space between sections
- Single visible CTA per section
- Mobile-first always

## Page Frameworks

- **LP Product/Service:** Hero -> Problem -> Solution -> Social Proof -> CTA
- **Institutional:** Home -> About -> Services -> Cases -> Contact
- **Lead Capture:** Hook -> Benefits -> Short Form

## Tech Stack

- CMS: WordPress
- Builder: Elementor or Gutenberg
- SEO: Yoast SEO or Rank Math
- Cache: WP Rocket or LiteSpeed Cache
- Security: Wordfence
- Forms: WPForms or Contact Form 7

## Entry Point

Start with `wp-chief` agent. Use `*create-site` to begin the full pipeline
or individual phase commands (*discovery, *architecture, *copy, *design, *build, *qa, *launch).

## Key Rules

1. Client approval gates are non-negotiable between phases
2. Copy drives design (Phase 3 before Phase 4)
3. Mobile-first is the default (375px)
4. Every headline starts with an action verb
5. Lighthouse target: 90+ on all categories
6. No phase proceeds without explicit sign-off
