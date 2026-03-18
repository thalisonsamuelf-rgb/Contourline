# DS Theme Coverage Validation — 2026-03-16

## Scope
- Business: `aiox`
- App: `site-aiox`
- Design System: `aiox`
- Themes audited: `lime`, `gold`
- Base URL audited: `http://127.0.0.1:3100`

## Method
- Visited all `48` static `/brandbook*` routes from the built route manifest.
- For each route, loaded the page in `lime` and `gold` by setting `localStorage["aiox-brandbook-theme"]`.
- Captured comparative screenshots for the main DS pages required by the story:
  - `/brandbook/components`
  - `/brandbook/tables`
  - `/brandbook/forms`
  - `/brandbook/charts`
  - `/brandbook/cards`
  - `/brandbook/effects`
  - `/brandbook/patterns`
- Ran a computed-style scan in `gold` looking for residual `rgb(209, 255, 0)` / `rgba(209,255,0,...)` values on visible DOM/SVG nodes.

## Summary
- Total routes visited in both themes: `48 / 48`
- Main story pages clean in Gold: `7 / 7`
- Global Gold routes fully clean: `30 / 48`
- Global Gold routes with intentional/documental/semantic lime: `11 / 48`
- Global Gold routes with residual hardcoded lime gaps: `7 / 48`

### Interpretation
- Core DS theming validation passes.
- The original audit undercounted theme support because it searched for React variant props instead of validating CSS cascade.
- Residual issues are concentrated in hardcoded showcase/demo pages, not in the main DS audit pages.

## Main Pages

| Route | Gold Result | Notes | Screenshots |
| --- | --- | --- | --- |
| `/brandbook/components` | PASS | No residual lime hits in Gold | `screenshots/components--lime.png`, `screenshots/components--gold.png` |
| `/brandbook/tables` | PASS | No residual lime hits in Gold | `screenshots/tables--lime.png`, `screenshots/tables--gold.png` |
| `/brandbook/forms` | PASS | No residual lime hits in Gold | `screenshots/forms--lime.png`, `screenshots/forms--gold.png` |
| `/brandbook/charts` | PASS | No residual lime hits in Gold | `screenshots/charts--lime.png`, `screenshots/charts--gold.png` |
| `/brandbook/cards` | PASS | No residual lime hits in Gold | `screenshots/cards--lime.png`, `screenshots/cards--gold.png` |
| `/brandbook/effects` | PASS | No residual lime hits in Gold | `screenshots/effects--lime.png`, `screenshots/effects--gold.png` |
| `/brandbook/patterns` | PASS | No residual lime hits in Gold | `screenshots/patterns--lime.png`, `screenshots/patterns--gold.png` |

Contact sheet: `../artifacts/ds-theme-coverage-validation/main-pages-contact-sheet.png`

## Residual Gaps

| Route Cluster | File | Lines | Problem | Follow-up |
| --- | --- | --- | --- | --- |
| `/brandbook/advanced` | `apps/site-aiox/src/components/brandbook/molecules/bb-stepper-step.tsx` | `10-13` | Active step uses hardcoded lime `rgba(209, 255, 0, 0.1)` background in Gold | `2026-03-16-ds-gold-residual-accent-core-pages.story.md` |
| `/brandbook/navigation` | `apps/site-aiox/src/components/brandbook/pages/navigation-page.tsx` | `95-111` | Sidebar active item background and border use hardcoded lime rgba values | `2026-03-16-ds-gold-residual-accent-core-pages.story.md` |
| `/brandbook/sections` | `apps/site-aiox/src/components/brandbook/pages/sections-page.tsx` | `249-251` | Hero headline brackets use hardcoded `text-[#d1ff00]` | `2026-03-16-ds-gold-residual-accent-core-pages.story.md` |
| `/brandbook/showcase/apparel`, `/brandbook/showcase/outfits`, `/brandbook/showcase/sneakers` | `apps/site-aiox/src/components/brandbook/pages/showcase-gallery-page.tsx` | `126`, `141`, `202`, `229`, `322` | Shared gallery page keeps lime glows, badge backgrounds, and accent borders hardcoded | `2026-03-16-ds-gold-residual-accent-showcase-pages.story.md` |
| `/brandbook/showcase/calc-squad` | `apps/site-aiox/src/app/(brandbook)/brandbook/showcase/calc-squad/page.tsx` | `43`, `96`, `107` | Marketing/category colors are fixed to `#D1FF00` | `2026-03-16-ds-gold-residual-accent-showcase-pages.story.md` |

## Intentional Exceptions

These routes still show lime in Gold, but the audit classifies them as acceptable because they document the lime palette, expose semantic success state, or were explicitly approved to remain as-is:

- `/brandbook/aiox`
- `/brandbook/color-tokens`
- `/brandbook/editorial`
- `/brandbook/feedback`
- `/brandbook/flow-diagram`
- `/brandbook/logo`
- `/brandbook/moodboard`
- `/brandbook/movimento`
- `/brandbook/semantic-tokens`
- `/brandbook/surfaces`
- `/brandbook/token-export`

### Flow Diagram Note
- User review on `2026-03-16`: `/brandbook/flow-diagram` should remain as-is.
- The page exposes its own internal light/dark canvas behavior; residual lime there is not being treated as a defect for this story.

## Global Route Coverage

| Route | Gold Result | Classification | Lime Hits |
| --- | --- | --- | ---: |
| /brandbook | PASS | clean | 0 |
| /brandbook/advanced | RESIDUAL_GAP | needs follow-up story | 2 |
| /brandbook/aiox | PASS_WITH_INTENTIONAL_LIME | intentional/documental or semantic | 25 |
| /brandbook/buttons | PASS | clean | 0 |
| /brandbook/cards | PASS | clean | 0 |
| /brandbook/charts | PASS | clean | 0 |
| /brandbook/color-tokens | PASS_WITH_INTENTIONAL_LIME | intentional/documental or semantic | 15 |
| /brandbook/components | PASS | clean | 0 |
| /brandbook/editorial | PASS_WITH_INTENTIONAL_LIME | intentional/documental or semantic | 25 |
| /brandbook/effects | PASS | clean | 0 |
| /brandbook/feedback | PASS_WITH_INTENTIONAL_LIME | intentional/documental or semantic | 1 |
| /brandbook/flow-diagram | PASS_WITH_INTENTIONAL_LIME | intentional/documental or semantic | 5 |
| /brandbook/forms | PASS | clean | 0 |
| /brandbook/foundations | PASS | clean | 0 |
| /brandbook/guidelines | PASS | clean | 0 |
| /brandbook/icons | PASS | clean | 0 |
| /brandbook/layering | PASS | clean | 0 |
| /brandbook/lists | PASS | clean | 0 |
| /brandbook/loading | PASS | clean | 0 |
| /brandbook/logo | PASS_WITH_INTENTIONAL_LIME | intentional/documental or semantic | 5 |
| /brandbook/lp-sections | PASS | clean | 0 |
| /brandbook/moodboard | PASS_WITH_INTENTIONAL_LIME | intentional/documental or semantic | 25 |
| /brandbook/motion | PASS | clean | 0 |
| /brandbook/movimento | PASS_WITH_INTENTIONAL_LIME | intentional/documental or semantic | 25 |
| /brandbook/navigation | RESIDUAL_GAP | needs follow-up story | 4 |
| /brandbook/patterns | PASS | clean | 0 |
| /brandbook/sections | RESIDUAL_GAP | needs follow-up story | 2 |
| /brandbook/semantic-tokens | PASS_WITH_INTENTIONAL_LIME | intentional/documental or semantic | 10 |
| /brandbook/seo | PASS | clean | 0 |
| /brandbook/showcase | PASS | clean | 0 |
| /brandbook/showcase/apparel | RESIDUAL_GAP | needs follow-up story | 6 |
| /brandbook/showcase/avatars | PASS | clean | 0 |
| /brandbook/showcase/calc-squad | RESIDUAL_GAP | needs follow-up story | 5 |
| /brandbook/showcase/jackets | PASS | clean | 0 |
| /brandbook/showcase/mockups | PASS | clean | 0 |
| /brandbook/showcase/outfits | RESIDUAL_GAP | needs follow-up story | 15 |
| /brandbook/showcase/slides | PASS | clean | 0 |
| /brandbook/showcase/sneakers | RESIDUAL_GAP | needs follow-up story | 13 |
| /brandbook/spacing | PASS | clean | 0 |
| /brandbook/spacing-layout | PASS | clean | 0 |
| /brandbook/spacing-scale | PASS | clean | 0 |
| /brandbook/states | PASS | clean | 0 |
| /brandbook/surfaces | PASS_WITH_INTENTIONAL_LIME | intentional/documental or semantic | 8 |
| /brandbook/tables | PASS | clean | 0 |
| /brandbook/templates | PASS | clean | 0 |
| /brandbook/token-export | PASS_WITH_INTENTIONAL_LIME | intentional/documental or semantic | 3 |
| /brandbook/typography | PASS | clean | 0 |
| /brandbook/vfx | PASS | clean | 0 |

## Artifacts
- Raw audit results: `../artifacts/ds-theme-coverage-validation/audit-results.json`
- Contact sheet: `../artifacts/ds-theme-coverage-validation/main-pages-contact-sheet.png`
- Main screenshots:
  - `../artifacts/ds-theme-coverage-validation/screenshots/components--lime.png`
  - `../artifacts/ds-theme-coverage-validation/screenshots/components--gold.png`
  - `../artifacts/ds-theme-coverage-validation/screenshots/tables--lime.png`
  - `../artifacts/ds-theme-coverage-validation/screenshots/tables--gold.png`
  - `../artifacts/ds-theme-coverage-validation/screenshots/forms--lime.png`
  - `../artifacts/ds-theme-coverage-validation/screenshots/forms--gold.png`
  - `../artifacts/ds-theme-coverage-validation/screenshots/charts--lime.png`
  - `../artifacts/ds-theme-coverage-validation/screenshots/charts--gold.png`
  - `../artifacts/ds-theme-coverage-validation/screenshots/cards--lime.png`
  - `../artifacts/ds-theme-coverage-validation/screenshots/cards--gold.png`
  - `../artifacts/ds-theme-coverage-validation/screenshots/effects--lime.png`
  - `../artifacts/ds-theme-coverage-validation/screenshots/effects--gold.png`
  - `../artifacts/ds-theme-coverage-validation/screenshots/patterns--lime.png`
  - `../artifacts/ds-theme-coverage-validation/screenshots/patterns--gold.png`
