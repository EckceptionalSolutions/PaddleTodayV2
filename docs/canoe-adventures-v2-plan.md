# canoe-adventures-v2 Plan

## 1. Existing Repo Assessment

### What PaddleToday currently does

PaddleToday is a route discovery and route publishing product. It combines:

- a homepage map finder
- route detail pages
- state landing pages
- route cards and browse flows
- a route request form
- guide articles
- conditions overlays
- content and research tooling

It does have pieces that touch river conditions, but those are secondary to the broader route catalog.

### Current stack, architecture, routing, data flow, and content model

- Stack
  - Astro
  - React only where the map finder needs it
  - Markdown content collections for routes and guides
  - Astro API routes plus a separate Azure Functions lane
- Routing
  - `/`
  - `/routes`
  - `/routes/[...slug]`
  - `/states/[state]`
  - `/guides/...`
  - `/api/...`
- Data flow
  - Route markdown becomes the source of truth for route pages.
  - A derived conditions snapshot is generated separately.
  - The homepage map consumes route metadata plus the snapshot.
  - Route detail pages independently fetch live weather and gauge data.
- Content model
  - `Route` is the core object.
  - Route entries carry access, hazards, camping, shuttle, maps, hero images, and optional gauge metadata.
  - The model is built to support route publishing breadth rather than tight condition decisions.

### Main pages, components, and services

- Main pages
  - homepage map
  - route detail page
  - state browse pages
  - guides pages
- Main components
  - map-route-finder
  - route card shell
  - route weather
  - USGS gauge card
  - comments and community widgets
- Main services
  - USGS IV fetch and proxy
  - Open-Meteo fetch and proxy
  - route conditions snapshot generation
  - route validation and content QA

### What appears reusable

- USGS fetch patterns and parsing approach.
- Weather fetch patterns and timeout/retry behavior.
- Cache-header utilities.
- A few route files as seed evidence for initial river profiles.
- The data-quality mindset from the trust and validation docs.

### What appears overly cluttered, off-strategy, dead, or low-value

- Route catalog and state browse pages.
- Guides surface.
- Comments and review prompts.
- Affiliate surfaces.
- Route request form.
- Proposal and research queues.
- Broad route-content operations.
- Offline placeholder condition snapshots that do not answer the real product question.

### UX or architectural issues that push it toward a generic catalog instead of a river decision engine

- The user is encouraged to browse, not decide.
- Conditions are widgets around a route page, not the main output.
- Route detail pages are too long for a "should I launch?" moment.
- The architecture optimizes publishing many pages instead of maintaining a small number of high-confidence river decisions.

## 2. Reuse / Rewrite / Remove

### Reuse as-is

- Basic HTTP cache helper patterns.
- USGS request construction and input validation ideas.
- Open-Meteo request construction and timeout handling ideas.
- Seed metadata and source links from a few selected route files.

### Reuse with refactor

- Weather scoring heuristics.
- Confidence and trust-language concepts.
- Gauge proxy ideas, but only after the direct-gauge MVP.

### Rebuild from scratch

- Product model.
- River scoring engine.
- Summary and detail pages.
- API shape.
- Data ingestion orchestration.
- Storage model.

### Remove / ignore

- Route catalog browse model.
- State pages.
- Guide and article system.
- Community features.
- Affiliate features.
- Research queues and publishing workflow.
- Most legacy content operations.

## 3. New Product Definition

`canoe-adventures-v2` is a river conditions product, not a route catalog.

The product should answer:

`Is it good today?`

Each river page and the summary page should provide:

- river score
- confidence
- short explanation
- key factors

Key factors should include:

- current level
- level trend
- weather
- difficulty
- seasonality

The product should feel closer to a weather app for paddlers than to an adventure portal.

## 4. MVP Scope

The MVP stays intentionally small:

- 5 to 10 rivers max in the near-term plan
- 3 rivers in the first implementation slice
- summary and list page
- detail page per river
- "today" score required
- "this weekend" score deferred
- no accounts
- no social features
- no reviews
- no large map feature
- no SEO filler content

## 5. Data Strategy

### External data sources

- USGS NWIS Instantaneous Values
  - best source for direct gauge data where available
- Open-Meteo
  - practical free source for current weather and short forecast
- Seeded curated metadata
  - gauge range guidance
  - difficulty notes
  - seasonality notes
  - hazard notes
  - evidence links

### Where the data is strong

- Rivers with direct USGS gauges near the paddled segment.
- Reaches with published recommended levels from a river manager, paddling club, watershed district, or credible outfitter.
- Weather data for immediate launch decisions.

### Where the data is weak

- Rivers without direct gauges.
- Segments whose "good level" guidance only exists in trip reports.
- Small flashy rivers where local rain changes conditions faster than the nearest gauge represents.
- Reaches with unclear public access, changing obstructions, or stale threshold guidance.

### How to handle rivers with direct gauges

- Use the direct gauge as the primary condition signal.
- Store ideal range and hard low/high thresholds in the river profile.
- Fetch current reading plus a recent trend window.
- Keep confidence higher when the gauge is direct and the thresholds are well sourced.

### How to handle rivers without direct gauges

- Do not target them in the earliest MVP unless there is a very defensible proxy.
- When added later, store:
  - proxy gauge id
  - proxy rationale
  - watershed relationship
  - correlation notes
  - explicit confidence penalty

### How to model proxy gauges, weather signals, rainfall sensitivity, and confidence

- Proxy gauges
  - treated as second-class evidence
  - lower confidence by default
  - explanation must say it is a proxy
- Weather signals
  - affect comfort, safety, and short-term uncertainty
  - should not overpower a strong direct gauge signal
- Rainfall sensitivity
  - stored as `low`, `medium`, or `high`
  - high-sensitivity rivers get bigger confidence penalties around heavy rain or sharp trend moves
- Confidence
  - should reflect source quality, gauge directness, completeness of thresholds, and data freshness

### How to deal with incomplete or uncertain ideal range data

- Store the source and source quality for every threshold.
- Allow one-sided thresholds when that is all that is defensible.
- Model those rivers explicitly as `minimum-only` instead of faking a two-sided sweet spot.
- Show medium or low confidence when thresholds are community-sourced or incomplete.
- Prefer "marginal" or cautious explanations over false precision.
- Keep unguided rivers out of the MVP rather than forcing weak heuristics too early.

## 6. Scoring Strategy

The scoring model must be explainable.

### River profile fields

Each river profile should include:

- `id`
- `slug`
- `name`
- `state`
- `region`
- `summary`
- `primary_gauge_source_id`
- `gauge_proxy_source_id` optional
- `ideal_min`
- `ideal_max`
- `too_low`
- `too_high`
- `difficulty`
- `difficulty_notes`
- `season_notes`
- `rainfall_sensitivity`
- `confidence_notes`
- `status_text`

### Score inputs

- current gauge value
- recent trend
- current weather
- short-term forecast
- seasonality context

### Score outputs

- `score`
- `confidence`
- `explanation`
- `factors`

### MVP scoring approach

- Gauge position is the dominant factor.
  - inside the ideal window should score well
  - outside the ideal window but inside hard bounds should be marginal
  - outside hard bounds should trend toward no-go
- Recent trend is a modifier.
  - rising toward the ideal zone can help
  - moving away from the ideal zone can hurt
- Weather is a secondary modifier.
  - storms, heavy precipitation risk, and strong wind reduce the score
- Seasonality is contextual.
  - outside the known season can reduce the score slightly or lower confidence

### Explainability requirement

Every score should be explainable in plain language, for example:

- "Good today because the gauge is inside the target window and still rising slightly, with light wind and no storm risk."
- "Marginal today because the river is still below the preferred level even though the weather is fine."
- "Skip today because the gauge is above the high threshold and more rain is forecast."

## 7. Technical Architecture for canoe-adventures-v2

### Stack choice

Use Astro again, but with a much leaner architecture:

- Astro static pages
- thin Node API/cache layer for live scoring
- plain TypeScript
- no React for MVP

Justification:

- Astro is already familiar and is good for low-complexity pages.
- The new product does not need a client-heavy map UI.
- A thin app-owned API keeps USGS and weather fetch behavior, caching, and degraded states out of the browser.
- The first slice should still prove the product model before adding a database, scheduled jobs, or a heavier backend framework.
- This supports fast delivery without dragging in a larger framework.

### Current bootstrap decision

The current implementation uses static Astro pages plus a thin Node API/cache layer.

Why:

- it builds cleanly with minimal moving parts
- the backend owns USGS and Open-Meteo fetches, degraded states, and short-lived in-memory caching
- the MVP is still small enough that a single lightweight process is sufficient

Tradeoff:

- the current cache is in-memory only
- there is no persistence or scheduled snapshot generation yet
- once the app expands further or moves into its own repo, deployment packaging and basic runtime health checks should be tightened

### App structure

- `src/data/rivers.ts`
  - curated river metadata
- `src/lib/types.ts`
  - domain models
- `src/lib/usgs.ts`
  - gauge ingestion
- `src/lib/weather.ts`
  - weather ingestion
- `src/lib/scoring.ts`
  - explainable scoring engine
- `src/lib/rivers.ts`
  - orchestration layer
- `src/server/api-server.ts`
  - thin app-owned API plus static preview runtime
- `src/pages/index.astro`
  - summary page
- `src/pages/rivers/[slug].astro`
  - detail page
- `public/global.css`
  - single stylesheet for the MVP shell

### Data models

- `River`
- `RiverGaugeSource`
- `RiverConditionSnapshot`
- `RiverScoringProfile`
- `RiverScoreResult`
- `WeatherSnapshot`
- `GaugeProxyMapping` later if needed
- `RiverEvidenceNote`

### Services and fetchers

- USGS service for current and recent gauge history
- Open-Meteo service for current weather and short forecast
- scoring service that merges live data with curated river profiles

### Storage approach

- Curated river metadata in source-controlled TypeScript for MVP.
- No database yet.
- This keeps the surface small and reviewable while the model settles.

### Caching approach

- Use a thin server/API cache now.
- Keep short-lived in-memory caching for USGS and Open-Meteo requests.
- Return explicit `live`, `degraded`, and `offline` status based on source freshness and availability.
- Add scheduled snapshot generation only after the scoring model is stable.

### Jobs and tasks needed

- none for the first slice beyond live request-time fetches
- later:
  - periodic score snapshot generation
  - threshold audit task
  - stale metadata audit

### Frontend structure

- summary page with a small seeded set of score cards
- detail page with explanation, factors, evidence, and live inputs
- clear signal-first hierarchy

### Backend and API structure

- `GET /api/rivers/summary.json`
- `GET /api/rivers/[slug].json`
- `GET /health`

These endpoints already back the current summary and detail pages.

## 8. Execution Plan

### Phase 0: audit PaddleToday and establish migration boundaries

- inspect current routes, APIs, content model, and condition flows
- identify what is useful versus distracting
- lock the new product boundary

### Phase 1: scaffold canoe-adventures-v2

- create a fresh app
- choose the lean runtime shape
- add docs and a clean directory structure
- ship with static pages plus direct live fetches before adding a backend layer

### Phase 2: define river metadata model and seed data

- define `River` and scoring profile types
- seed 3 river reaches with gauge ids, thresholds, notes, and evidence links

### Phase 3: implement live gauge and weather ingestion

- add USGS fetcher
- add Open-Meteo fetcher
- normalize readings into common internal types

### Phase 4: implement scoring engine

- gauge positioning
- trend modifier
- weather modifier
- seasonality context
- confidence calculation
- explanation generation

### Phase 5: build summary and detail UI

- ship a summary page for the MVP rivers
- ship a detail page per river
- keep the UI signal-first and compact

### Phase 6: polish, cleanup, and deployment readiness

- add tests for score heuristics
- tighten copy
- add server/API caching if the direct-fetch MVP proves useful
- prep for moving the app into its own repo

## 9. First Slice Definition

Immediate target:

`Show a live score + confidence + explanation for 3 rivers.`

That slice should prove:

- the river-first product framing works
- the score can be explained
- confidence is visible
- live gauge and weather data can be normalized into one actionable output

Initial three river reaches for the slice:

- Cannon River: Cannon Falls to Welch
- Straight River: Krogh's Landing to Faribault
- Zumbro River: Green Bridge to Zumbro Falls

Success for this first slice:

- a paddler can open the summary page and quickly see which of the 3 looks worth paddling today
- each result includes a score, confidence level, short explanation, and key factors
- the detail page makes the decision traceable without turning into a long route guide
