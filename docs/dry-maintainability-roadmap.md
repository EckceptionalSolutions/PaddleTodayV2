# DRY Maintainability Roadmap

## Goal

A behavior change should be implemented once and reach every surface where that
behavior applies. Start with maps, then extend the same single-source-of-truth
rule to shared domain policy and infrastructure.

This is not a goal to remove every repeated line. Platform rendering, page
composition, and route-specific content should stay local. The target is
duplicated behavior and policy: code that can drift and produce different
answers or interactions.

## Completion signals

- Web pages create and operate maps through one tested map adapter.
- Home and Explore compose one board engine instead of maintaining parallel
  copies of the same behavior.
- Web and mobile consume the same pure geometry, ranking, route-planning, and
  display-policy functions.
- Server storage, email delivery, and request validation use shared primitives.
- Tests fail when a shared behavior is bypassed or when mirrored/generated
  assets drift.
- A map behavior change has one implementation point and a test matrix that
  covers Home, Explore, State, River Group, River Detail, and Favorites.

## Audit evidence

- There are nine direct `new maplibregl.Map(...)` calls across six web scripts.
  Each call repeats some combination of creation defaults, readiness handling,
  controls, bounds, marker cleanup, popup behavior, and route-layer setup.
- `src/scripts/summary-board.js` is about 5,700 lines and
  `src/scripts/summary-board-home.js` is about 5,000 lines. They define 248 and
  218 named functions respectively, with 183 function names in common.
- `src/scripts/map-runtime.js` and `public/scripts/map-runtime.js` have already
  drifted. The public copy lacks newer asset-readiness behavior, score-zone
  labels, river-name aliases, and actual-river layer synchronization.
  `ui-taxonomy.js` has also drifted between `src` and `public`.
- Current visual tests deliberately hide maps, so the highest-risk behavior has
  no end-to-end regression coverage.
- Pure geometry algorithms are implemented separately in web and mobile:
  endpoint snapping, line measurement, slicing, stitching, and fingerprints.
  River coverage grouping and anchor calculations are also duplicated.
- Rating, confidence, weather, difficulty, freshness, distance, and score
  breakdown presentation rules recur across many web scripts and mobile
  screens. `ratingToneKey` exists in eight web scripts; `signedPoints` and
  `friendlyCapReason` each exist across five web/mobile surfaces.
- Shared ranking policy exists in `@paddletoday/api-contract`, but clients still
  define local confidence/status weights and comparison functions.
- Azure Blob SAS parsing is implemented eight times. Path cleaning, blob URL
  construction, local fallback storage, and JSON read/write behavior recur
  across alerts, history, snapshots, route requests, route audits, route
  contributions, feedback, and request handlers.
- Azure email client setup, sending, polling, and HTML escaping are repeated in
  the alert, feedback, and route-request email modules.
- Email validation appears in four server routes and again in mobile. Request
  contracts are shared as TypeScript types, but runtime validation rules are
  not.

## Prioritized backlog

### P0. Establish map behavior contracts

Create a small web map adapter around MapLibre. Do this in layers rather than as
one large "map manager."

1. Centralize map creation and readiness:
   - style URL and asset loading;
   - navigation-control defaults;
   - load/style readiness and timeouts;
   - interactive versus static-preview profiles;
   - common error/fallback state.
2. Centralize viewport policy:
   - fit points, fit route, fit selected route, and fit user area;
   - named padding and maximum-zoom profiles;
   - whether data refresh preserves the current viewport;
   - reduced-motion/animation behavior.
3. Centralize overlay lifecycle:
   - marker registries and cleanup;
   - selected/dimmed marker state;
   - popup visibility correction and dismissal;
   - idempotent source/layer add, update, and removal;
   - canonical geometry with access-point fallback.
4. Keep page-specific popup HTML, data selection, and captions as callbacks or
   adapters. The shared layer owns interaction behavior, not page copy.

First consumers: Home and Explore. Then migrate River Detail, River Group,
State, and Favorites one at a time.

Acceptance criteria:

- No direct `new maplibregl.Map(...)` outside the adapter.
- A fake-MapLibre unit suite verifies profiles, readiness, fit policy, marker
  cleanup, popup behavior, and source/layer updates.
- A small Playwright matrix verifies selection, "show all," and refresh
  viewport behavior on every web map surface. Do not hide the map under test.

### P0. Replace the parallel Home and Explore board engines

Extract the 183 same-named functions incrementally:

- `board-domain`: grouping, ranking, filtering, pagination, distance/travel
  calculations, and recommendation selection;
- `board-presenters`: route facts, score breakdown rows, weather state,
  freshness, confidence, and shared card view models;
- `board-map-controller`: map item derivation, selection, overlays, viewport,
  and mobile list/map state;
- page adapters: Home-specific hero/recommendation composition and
  Explore-specific controls/layout.

Do not begin by mechanically merging both files. Add characterization tests for
the pure functions, extract one coherent slice, and delete the old copy after
each migration.

Acceptance criteria:

- Home and Explore import one implementation for shared behavior.
- Their entry files contain orchestration and page-specific rendering only.
- Sorting, filtering, location, map selection, and refresh behavior have shared
  tests with page-specific fixtures.

### P0. Remove unmanaged `public/scripts` mirrors

Determine whether the four files mirrored under both `src/scripts` and
`public/scripts` still have external consumers.

- If they do not, delete the public copies.
- If stable public URLs are required, generate them from `src/scripts` during
  the build and add a no-drift check.
- Never maintain the same runtime by hand in both directories.

Start with `map-runtime.js` and `ui-taxonomy.js`, which are already different.

### P1. Move pure map and route geometry into a shared package

Create a platform-neutral TypeScript package for:

- coordinate validation and conversion;
- bounds and center calculations;
- point-to-line projection;
- endpoint-snapped route geometry;
- line measurement, slicing, deduplication, stitching, and fingerprints;
- river coverage grouping and anchor selection;
- map point/route span types.

Use it from web MapLibre and React Native Maps. Keep actual rendering,
permissions, and native camera calls in platform adapters.

The native and `.web.tsx` `RoutePlotMap` files should also import their shared
props, marker-label policy, bounds math, rating tones, and footer/legend view
model from one module. The native map and the schematic web fallback should
remain separate renderers.

### P1. Make domain ranking and UI taxonomy authoritative

Extend the existing shared packages instead of adding more local helpers:

- move all confidence/status weights and board comparators to
  `@paddletoday/api-contract` (or a new domain package if the contract package
  should remain data-only);
- share rating verdicts, tone keys, confidence labels, difficulty labels,
  freshness labels, score-delta formatting, cap-reason copy, gauge formatting,
  and route-count labels;
- use the existing shared route-planning functions everywhere instead of local
  `routeAccessPoints`, paddle-time parsing, and route filter implementations.

Return semantic values or view models from shared code. Web class names and
React Native styles should map those values locally.

### P1. Extract river-detail view models

The web river-detail script and mobile river-detail screen are both over 4,000
lines and repeat interpretation logic for:

- score breakdown and cap reasons;
- weather values and timing;
- checklist lookup and tone;
- access coordinates and route spans;
- logistics, camping, safety, and source summaries;
- freshness and offline/degraded states.

Create small pure selectors/view-model builders by section. Keep Astro DOM code
and React Native components separate. Apply the same selectors to river-group
and mobile river-hub screens where applicable.

### P1. Create a reusable storage adapter

Build one tested storage primitive with configurable environment names, prefixes,
local directories, serializers, and content types:

- parse and validate Azure container SAS URLs;
- construct blob URLs;
- sanitize prefixes/path segments;
- read/write/list/delete blobs;
- provide local filesystem fallback;
- handle JSON encoding and upstream errors consistently.

Alerts, history, snapshots, route requests, route audits, and route
contributions should configure this primitive rather than reimplement it.
Feedback and direct route handlers should call the domain repository rather
than write blobs independently.

### P1. Create a shared email transport and HTML utility

Centralize:

- Azure `EmailClient` creation and reuse;
- `beginSend`/polling/error normalization;
- sender configuration;
- HTML and attribute escaping;
- a base email layout.

Alert, feedback, and route-request modules should only build typed message
content and pass it to the transport.

### P2. Share runtime request validation

Add runtime decoders/schemas beside the request types in
`@paddletoday/api-contract`:

- email normalization and validation;
- string length limits;
- enums such as category, threshold, sentiment, and delivery method;
- photo metadata and payload limits;
- consistent field-error results.

Use the same validators in the server, browser forms, and mobile forms. Server
validation remains authoritative.

### P2. Adopt the shared API client in browser entry points

The mobile app already uses `@paddletoday/api-client`; browser scripts still
repeat raw fetch, error parsing, and endpoint construction.

Make the client environment-neutral, then use it for public river, group,
history, alert, feedback, request, and contribution calls. Keep cache policy and
AbortSignal support injectable so browser pages can retain their request guards
and local cache behavior.

### P2. Consolidate design tokens without forcing identical UIs

Web CSS variables and React Native tokens use separate palettes, spacing, and
status colors. Establish a shared semantic token source for rating/status colors,
spacing names, radii, and typography roles, then generate or adapt web CSS and
native token objects.

Platform-specific layout values may differ, but `Strong`, `Good`, `Fair`,
`No-go`, live, degraded, and offline should not drift semantically.

### P2. Add a focused duplication guard

After the initial extractions, add CI checks that:

- forbid direct MapLibre construction outside the map adapter;
- forbid local confidence/status weight tables;
- verify generated public assets;
- run a clone detector over application logic while excluding route data,
  generated assets, tests/fixtures, and platform renderer files.

Treat the clone report as a review signal, not a requirement to deduplicate
content or trivial one-line helpers.

## Recommended implementation sequence

1. Add map behavior characterization tests and a MapLibre adapter.
2. Migrate Home and Explore maps to the adapter.
3. Extract shared Home/Explore board domain and presenter modules.
4. Migrate River Detail, River Group, State, and Favorites maps.
5. Remove or generate the `public/scripts` mirrors.
6. Move pure geometry and coverage code into a shared package and migrate
   mobile.
7. Centralize ranking, taxonomy, and river-detail selectors.
8. Consolidate storage, email, request validation, and browser API access.
9. Add narrow CI enforcement once the approved extension points exist.

## Intentional duplication and exclusions

Do not force these into one implementation:

- MapLibre DOM rendering and React Native Maps rendering.
- The native map and the web schematic fallback component.
- Astro markup and React Native JSX.
- Route-specific descriptions, evidence, hazards, logistics, and calibration.
- Generated state route files and route-order output when their generator is
  the actual source of truth.
- Small local glue functions whose abstraction would require more knowledge or
  parameters than the duplicated code.

The useful boundary is shared decisions and lifecycle, with local rendering and
content.
