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

## Implementation status

Completed:

- All web MapLibre construction and readiness handling now goes through the
  tested `map-runtime` adapter.
- Home, Explore, Favorites, State, River Group, and both River Detail maps use
  the adapter's reduced-motion-aware viewport fitting and marker lifecycle.
  Actual-river overlays are idempotent and reapply after MapLibre style resets.
- Stable `public/scripts` URLs are generated from `src/scripts`, with drift
  checks in development, typechecking, and builds.
- Home and Explore share their first domain/presenter layers: recommendation
  viability, grouping, radius/filter policy, paddle-time parsing, nearby
  sorting, all board sort modes, pagination, travel math, ranking, route facts,
  signal/weather/freshness presentation, score presentation, and manual
  location parsing. Their first board-map model now also owns marker labels,
  accessibility copy, group context, representative-route labels, segment
  labels, and featured access captions while preserving page-specific wording.
  Shared card policy now also owns stronger-call detection, recommendation
  summaries/tags/slots, metadata, warning/action labels, signal rows, weather
  icons/badges, condition markup, tags, and source badges. The two boards also
  use one injected preference store for location, radius, difficulty, and
  paddle-time persistence. Their first shared board-map controller now owns
  mobile list/map state, collapse presentation, popup cleanup, result/route
  counts, selected-result prompts, switch accessibility labels, and selection
  fallback policy. It now also owns map-result markup, event binding, empty
  states, and DOM synchronization, with page-specific hover/selection callbacks.
  Mobile view switching, collapse controls, scroll-to-map behavior, and resize
  scheduling also live there. Rating filters share one predicate, including
  the `all` sentinel used by Explore. Manual-location search, parsed query
  fallback, candidate validation, result shaping, and reverse geocoding now
  use one injected board-location service while each page retains its intended
  candidate-selection policy. Permission probing, browser request options,
  reverse-label fallback, and success/denial/unavailable transitions also use
  one geolocation controller with page-owned rendering callbacks. Same-named
  entry-file functions are down from the original 183 to 75. Score-breakdown
  disclosure modeling and DOM rendering now also live in the shared card
  markup module instead of both entry files. A shared board loader controller
  now owns request cancellation, stale-response protection, cache writes,
  refresh/fallback transitions, and initial-load failure policy. Recommendation
  slot selection—including confidence and grouped-river fallbacks—now comes
  from the shared board domain. Manual-submit empty/loading/not-found/error
  transitions and location-indicator presentation now use one location
  controller. That controller also owns accepted-location state, near-you sort
  activation, pagination reset, distance/radius selectors, and the compact
  location label, so manual search and browser geolocation cannot drift.
  Featured-map rendering now uses one controller for MapLibre readiness,
  route/access layers, marker cleanup, render cancellation, camera fitting,
  captions, and failure states. Shared board-map popup markup and marker
  classes live beside the existing selection controller.
- Home and Explore now use the same recommendation-card, river-card,
  recommendation-grid, and card-grid renderers. Page-specific route facts,
  hover behavior, and route-type copy are injected adapters. Featured-weather
  presentation is shared by the same card module.
- Board status and preference transitions now have dedicated controllers.
  Summary live/degraded/offline counts, refresh and fetch-failure states,
  initial failure copy, cache hydration, radius/difficulty/paddle-time changes,
  nearby sorting, and filter-button state each have one implementation.
  Two unused duplicated summary helpers were removed during the final audit.
- Web and mobile share route snapping, line stitching/deduplication, coordinate
  conversion, coverage centers, and line projection through
  `@paddletoday/geo`.
- Ranking weights, distance/travel policy, email validation, rating tones,
  signed score values, and cap-reason copy are authoritative shared exports.
- SAS parsing, blob URLs, prefix cleaning, JSON writes, and validated
  Blob/local JSON repositories are shared. Alerts, history, snapshots, route
  audits, route contributions, and route-request listing/replies use the
  repository.
- Azure email client reuse, send/poll/error handling, provider aliases, and
  HTML escaping are shared by alerts, feedback, and route-request replies.
- Public browser endpoints now use the environment-neutral
  `@paddletoday/api-client`, including cache policy, abort signals, structured
  errors, river/detail/history/community reads, alerts, requests, and
  contributions. Admin/session, unsubscribe, search-index, and third-party
  calls remain intentionally local; board geocoding now uses the shared
  board-location service.
- Rating and live-status colors have one `@paddletoday/design-tokens` source.
  Native consumes it directly and web CSS variables are generated with a drift
  check.
- Control, card, panel, and pill radius roles now also come from
  `@paddletoday/design-tokens`. Web and native use platform-specific values
  behind the same semantic roles, and existing web radius aliases consume the
  generated variables.
- The `xs` through `xl` spacing scale now follows the same pattern: native
  consumes its platform scale directly and web receives generated spacing
  variables for incremental adoption.
- Web and mobile River Detail share the first pure section view model for score
  breakdown rows, applied limits, cap explanations, and summary copy.
- Web and mobile River Detail now also share effective freshness downgrades,
  go/watch/skip readiness, weather risk and labels, access completeness, and
  warning selection.
- Camping prose classification, support/overnight policy, and compact labels
  now come from `@paddletoday/api-contract`; server/web compatibility imports
  and native River Detail consume the same implementation.
- Astro and native River Detail now consume one route-safety view model for
  risk level, semantic tone, headings, summaries, hazard labels, review state,
  and normalized note deduplication while retaining platform-specific standard
  safety wording.
- Web and native River Detail now share hourly condition classification, rain
  onset selection, display labels, risk thresholds, and paddle-window timing
  decisions. Native icons/styles and the web-only short-route scoring model
  remain platform-local.
- Threshold source strength now has one semantic view model for impact,
  confidence copy, score guidance, water-level labels, compact badges, and
  source-specific detail. Astro River Detail, mobile River Hub, scoring, and
  API serialization select their intended copy variant from that model.
- Astro and native River Detail now share trip-planning headlines, compact
  shuttle/permit/camping values, and conservative access-caveat fallbacks
  through one logistics view model.
- A deterministic Playwright contract now exercises Home, Explore, State,
  River Group, River Detail, and Favorites through fake MapLibre, including
  Home and Explore marker/list selection, Explore all-score reveal/reset, and
  refresh viewport preservation. It also verifies shared manual-location
  behavior on Home and Explore. Run it with `npm run test:maps`.
- `npm run dry:check` enforces thirty-one single-source-of-truth boundaries and runs as
  part of typechecking.

Remaining:

- Treat the remaining Home/Explore overlap as a review queue, not a merge
  target. Most remaining same-named functions bind page-owned state or compose
  intentionally different Home and Explore interfaces; extract a function only
  when a shared decision or lifecycle appears.
- Typography was audited but not forced into cross-platform tokens: the current
  web CSS and native screen styles do not yet expose equivalent semantic roles.
  Introduce shared roles when components are redesigned around the same
  meaning, while retaining platform-specific values.
- Add surface-specific selection or reset/show-all browser cases when those
  interactions are introduced on State, River Group, River Detail, or
  Favorites. Their current shared initialization contract remains covered.

## Current audit evidence

- The only direct `new maplibregl.Map(...)` call is inside `map-runtime.js`;
  the DRY guard rejects new calls elsewhere.
- `summary-board.js` is 3,859 lines and `summary-board-home.js` is 3,237 lines.
  Their same-named function overlap is 38, down from 183. The remaining names
  are primarily page composition and state-bound adapters rather than copied
  map, card, loading, location, or preference lifecycles.
- Four stable `public/scripts` assets are generated from `src/scripts`, and
  both typechecking and builds fail on drift.
- Twelve deterministic browser cases exercise visible maps across all six web
  surfaces plus Home/Explore selection and manual location, all-score reset,
  and viewport preservation.
- Web and mobile geometry consumers compile against `@paddletoday/geo`; local
  platform files retain rendering and camera/permission integration only.
- Shared contract/presentation tests cover ranking, location/travel policy,
  score breakdown, readiness, safety, camping, hourly weather, source
  strength, logistics, validation, and semantic presentation helpers.
- Storage repositories, email modules, public API callers, and request
  validation now consume their shared primitives; the DRY guard rejects the
  original local implementations.
- `npm run dry:check` currently enforces 31 boundaries across 251 source files.
- `npm test` passes 256 root tests and 19 API-contract tests, and includes
  mobile/route typechecking plus route, geometry, gallery, generated-script,
  and semantic-token audits. `npm run build:app` builds all 1,108 pages.

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
