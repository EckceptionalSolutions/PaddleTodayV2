# Web map maintenance

Use this guide when changing the public site's map behavior or styles. The
implementation is shared where behavior is shared; each page still owns its
route data, selection model, and wording.

## Code ownership

| Concern | Source |
| --- | --- |
| Asset loading, map creation, readiness, recovery, popups, viewport profiles, GeoJSON overlays | `src/scripts/map-runtime.js` |
| Home results and map lifecycle | `src/scripts/summary-board-home.js` |
| Explore results, viewport filtering, and map lifecycle | `src/scripts/summary-board.js` |
| Shared featured route previews | `src/scripts/board-featured-map-controller.js` |
| Explore canvas score badges and accessible marker controls | `src/scripts/explore-score-layer.js` |
| Saved, Weekend, State, river comparison, route detail | Their corresponding `src/scripts/*-page.js` files |

Home and Explore are separate entry points. A fix in one does not automatically
reach the other; check both when changing shared board behavior. Prefer extending
their existing shared controllers over adding another copy of a lifecycle rule.

`public/scripts/map-runtime.js` is generated from the source. After editing the
source, run `npm run scripts:public:sync`. Do not maintain the public copy by hand.
`npm run scripts:public:check` detects drift.

## Readiness is not one state

1. **Assets available:** the MapLibre library and stylesheet have loaded.
2. **Style usable:** a parsed style can accept route sources and layers.
3. **Initial background loaded:** the map's first tile/source loading cycle has
   completed. Later pans and source updates can require more tiles.

Public map entry points use `waitForMapReady` with `waitForTiles: false` and a
strict style deadline. Slow background tiles must not discard a usable map,
route markers, filters, or links. Use full `isMapReady` for work that actually
depends on complete readiness, such as broad automatic style refreshes.

Publish ready copy with
`statusController.ready({ message, backgroundMap: mapRuntime })`. The controller
adds and clears initial-background feedback, detaches obsolete callbacks, and
exposes `data-map-background-loading` for the small visual loading label.
Use the controller for subsequent selection messages too: direct `textContent`
writes can briefly erase loading feedback or leave a stale completion callback.

An individual failed tile is not proof that the entire map is unusable. Keep
asset/style failure and retry behavior separate from recoverable background work.

## Recovery and asynchronous work

- Create maps through `createPaddleMap`. Its graphics recovery preserves the
  current camera, DOM markers, and open popups while rebuilding the style.
- Use `syncGeoJsonOverlay` and `removeMapOverlay` for route overlays. They retain
  ordered changes during that rebuild. Use `updateLayerStyle: true` when supplied
  paint, layout, or selection filters must update existing layers with the data.
  The default preserves existing layer styling for source-only updates.
- Bind delegated interactions once per map instance, not once per source. Style
  recovery can replace sources while existing map listeners survive.
- Guard late geometry and render callbacks with the page's current render/version
  token. Optional route geometry must not block usable access markers.
- Automatic refreshes should preserve the user's camera, selected route, popup,
  and keyboard focus when the corresponding item still exists. If it disappears,
  move focus to a useful remaining result rather than a detached element.
- Use shared viewport profiles and reduced-motion behavior. Reserve space for
  controls and attribution before late source metadata expands its text.

## Stylesheet boundaries

`src/layouts/BaseLayout.astro` defines stylesheet inclusion and order. Keep new
page-specific rules out of the end of `public/global.css`.

| Stylesheet | Ownership |
| --- | --- |
| `public/styles/map-markers.css` | Shared MapLibre markers, popups, controls, and graphics-recovery status |
| `public/styles/map-panels.css` | Result/map panels, switches, legends, and loading labels for Home, Explore, Weekend, and Saved |
| `public/styles/home-map.css` | Home map layout and mobile List/Map presentation |
| `public/styles/home-base.css` | Private Home hero, featured-pick, and recommendation styles; loaded before map panels and Home refinements |
| `public/styles/home-page.css`, `explore-page.css`, `weekend-page.css`, `favorites-page.css` | Their page composition |
| `public/styles/route-choices.css` | Shared State and river-comparison route cards |
| `public/styles/river-picker.css` | River comparison and its map layout |
| `public/styles/state-map.css`, `state-pages.css` | State map and directory layout |
| `public/styles/route-base.css`, `route-maps.css`, `route-page.css` | Route-detail base styles, maps, and page refinements, in that order |

When moving CSS, preserve selector specificity, media conditions, and load order.
Check other consumers of a class: `river-group-page__panel`, for example, also
appears on State and Explore. A selector name alone does not prove page ownership.
Remove an old override only when its replacement covers the same states and
viewport range. Include both sides of the 540/541 and 760/761 boundaries when
changing those media queries.

Seven Home padding declarations intentionally remain in `global.css`: later
shared wide-hero rules override them. Moving them after those shared rules would
change the desktop layout. The other Home base rules are isolated.

## Focused verification

- Start the local web/API pair with `npm run dev:all -- --web-port 4323` when it is
  not already running. Keep an existing development session available for review.
- Run relevant runtime/controller units with Vitest. `npm run styles:check`
  validates all stylesheets; `npm run build:app` includes the project checks.
- Use the controlled MapLibre harness for deterministic lifecycle, filter, focus,
  and asynchronous race tests. It cannot prove that real WebGL pixels render.
- Use native MapLibre tests for delayed tiles, graphics restoration, glyph
  recovery, popup bounds, and rendered geometry. The reusable
  `tests/visual/map-background-fixture.ts` holds valid background tiles and
  releases them without replacing the map. Always release held requests in
  `finally` so failed assertions do not strand test cleanup.
- Relevant native suites include `map-background-loading`, `map-graphics-recovery`,
  `map-font-recovery`, `map-online-recovery`, `map-popup-visibility`, and the
  Weekend/State line suites under `tests/visual`.
- Check desktop and phone widths, narrow 320px layouts, doubled text, List/Map
  switching, keyboard activation/Escape, and unavailable/retry states as relevant.
  Preserve the location-dependent Home preview and lazy route-map setup in tests.

Synthetic fixtures verify behavior, not today's river conditions. Record fixture
use in validation notes. The originally reported transient white rectangle while
scrolling Home has not been reproduced conclusively; the confirmed tile,
graphics, layout, and asynchronous fixes should not be described as proof of its
root cause. Keep concise change and verification notes in `UI_POLISH_LOG.md`.
