# PaddleToday Reuse Audit

## Summary

PaddleToday is useful as a source of lessons, patterns, and a few pockets of river metadata. It is not the right primary foundation for the new product direction.

The old repo is optimized around route coverage, state browse pages, map discovery, research queues, proposals, and SEO/content surfaces. The new product needs the opposite posture: a small set of river reaches, strong live data, explainable heuristics, and very clear confidence signaling.

## What PaddleToday currently is

- Astro site with route markdown content collections.
- React map finder on the homepage.
- Route detail pages with many supporting sections.
- Static-site-first deployment with runtime API endpoints and a separate Azure Functions lane.
- Large research, proposal, queue, and admin workflow footprint.
- Guide/article surface area that competes with the decision engine.

## Audit signals from the current repo

- About 438 route markdown files.
- 9 guide articles.
- 106 routes declare a gauge.
- 17 routes declare a sourced `flowRange`.
- The checked-in conditions snapshot is an offline placeholder and mostly unknown values.

This matters because the new product only works when each river can answer "is it good today?" with enough evidence to stand behind the answer.

## Architecture assessment

### Strengths

- Astro is a reasonable fit for lightweight UI and content-light pages.
- The repo already has solid fetch timeout, retry, and cache-header patterns for USGS and weather calls.
- Some route pages contain useful seed metadata: gauge ids, threshold ranges, hazard notes, seasonal notes, and access summaries.
- The old team has already done real curation work on a few rivers.

### Weaknesses

- The product center of gravity is route discovery, not river decision quality.
- There are too many surfaces: homepage map, routes page, state pages, guides, comments, affiliate links, admin pages, request forms, and research tooling.
- The current content model encourages breadth before confidence.
- The deployment shape is more complex than the MVP needs because it mixes static pages, Astro API routes, and separate Azure Functions.
- The route details page is large and noisy for a user who just wants a launch decision.

## Reuse as-is

- `src/lib/http-cache.ts`
  - Small, clean utility with reusable cache-header parsing.
- Fetch-and-retry patterns in:
  - `src/pages/api/usgs-iv.json.ts`
  - `src/pages/api/weather.json.ts`
  - `src/lib/usgs.ts`
  - `src/lib/weather.ts`
- A few route markdown files as seed evidence only, not as a runtime content system:
  - `src/content/routes/mn/cannon-river-ii.md`
  - `src/content/routes/mn/straight-river-kroghs-landing-to-two-rivers-landing-park-faribault.md`
  - `src/content/routes/mn/zumbro-river-green-bridge-to-zumbro-falls-lively-valley.md`

## Reuse with refactor

- Weather scoring ideas from `src/lib/weatherScore.ts`
  - Useful starting point, but the new app needs river-aware weighting and clearer factor output.
- USGS proxy and fallback thinking from `src/components/UsgsGauge.astro`
  - Useful reliability lessons, but the UI itself is too heavy and route-page specific.
- Confidence language and data quality rules from:
  - `docs/TRUST_SCALE.md`
  - `src/lib/routeValidationCore.js`
  - `src/lib/routeView.ts`
  - Keep the idea of source strength and completeness. Drop the route-catalog framing.

## Rebuild from scratch

- Product model
  - Move from `Route` to `River`, `RiverScoringProfile`, `RiverConditionSnapshot`, and `RiverScoreResult`.
- Information architecture
  - Summary page and river detail pages should be built around score, confidence, explanation, and factors.
- Scoring engine
  - The new engine must be explicitly explainable and factor-based.
- Data ingestion orchestration
  - Build around a small number of river profiles first, not a generic route snapshot for hundreds of pages.
- UI
  - No state browse, no giant route page, no map-first UX, no content rails.

## Remove or ignore

- Homepage map finder and map filter stack.
- State pages and browse-by-state flows.
- Guides and article taxonomy.
- Comments, review prompts, and community surfaces.
- Affiliate link components.
- Route request form.
- Proposal publishing workflow.
- Research queues and content-pipeline tooling.
- Most of `src/content/_proposals`.
- Most of the `tools/routes` and `tools/research` surface.

## Why the old UX is off-strategy

The old UX assumes the user wants to discover routes and read long pages. The new product assumes the user already has a river in mind or wants a tight shortlist and needs a launch decision quickly.

Specific misalignments:

- Map-first homepage pushes browse behavior before decision quality.
- Route pages stack many blocks before the core go or no-go answer is clear.
- State and route indexes reward page count and catalog breadth.
- Guides and supporting content pull attention away from the decision engine.
- Conditions are presented as supporting widgets, not as the primary output.

## Migration boundary

The right move is a clean app with selective copying, not a pivot-in-place.

Boundary:

- Copy patterns, not structure.
- Copy seed metadata for a few river reaches, not the full route corpus.
- Keep the MVP focused on direct-gauge rivers only.
- Do not import the old content model, guide system, map system, or admin pipeline.
