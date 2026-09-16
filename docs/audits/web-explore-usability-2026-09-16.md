# Explore usability and coverage audit

Audited September 16, 2026: production Explore, production public APIs, and the current checkout. This is an audit; no application or deployment changes were made. Browser checks used the existing saved city, inspected All routes and advanced filters, selected Arizona, and applied Full day. Layout was visually inspected at the available desktop-width viewport. Mobile behavior was reviewed in source, not tested on a device.

## Main finding

Explore promises catalog browsing but operates on a conditions-scoring subset. Its geography, trip preferences, conditions, sorting, and map limits overlap without a clear scope model. Missing regions are a real data/discovery defect, not merely user confusion about filters.

## Production evidence

The public catalog returned **2,704 routes across 48 states**. The fresh summary returned **901 routes across 22 states**, generated at `2026-09-16T18:37:52.162Z`. Comparing slugs found **1,803 catalog routes absent from the summary**. These numbers describe the observation time, not a permanent inventory.

| State | Public catalog routes | Explore summary routes |
| --- | ---: | ---: |
| Alabama | 30 | 0 |
| Arizona | 23 | 0 |
| Florida | 49 | 0 |
| Georgia | 86 | 0 |
| Louisiana | 50 | 0 |
| Mississippi | 28 | 0 |
| Nevada | 30 | 0 |
| New Mexico | 26 | 0 |
| South Carolina | 46 | 0 |
| North Carolina | 45 | 8 |

Sources: [production catalog](https://paddletoday.com/api/rivers/catalog.json), [production scoring summary](https://paddletoday.com/api/rivers/summary.json). Coverage is the lower 48; this does not establish Alaska or Hawaii coverage.

This is not explained entirely by planning routes. Both of these individual production detail endpoints returned HTTP 200, `scoreEligibility: scored`, and score/rating data despite their routes being absent from the summary:

- [Arizona: Verde River, Lower TAPCO to Tuzigoot](https://paddletoday.com/api/rivers/verde-river-lower-tapco-tuzigoot.json), generated at `2026-09-16T18:50:54.300Z`.
- [Alabama: Hatchet Creek, Highway 280 to Highway 231](https://paddletoday.com/api/rivers/hatchet-creek-highway-280-highway-231.json), generated at `2026-09-16T18:50:56.096Z`.

The live UI reproduced the contradiction: All routes + All route types + All scores + Arizona + Any drive distance produced **0 results**, while the same page's Browse by state directory advertised **23 Arizona routes**.

The checkout is newer/different: 2,869 public routes, 1,817 scoring-eligible routes, and 1,052 planning routes. Do not substitute those numbers for deployed coverage or attribute the entire production gap to planning eligibility. A stale worker/catalog deployment or snapshot generation mismatch is a strong hypothesis, but identifying the exact deployed worker revision requires infrastructure inspection.

## Findings, in priority order

### P1 — All routes cannot show the public catalog

`board-loader-controller.js:79` loads `getSummary()`. All routes changes client filters only (`summary-board.js:1845`); it does not change the dataset. Planning routes never enter that scoring feed. Separately, published scored routes are missing from the current production snapshot.

`public-rivers.ts:76` returns an available stored summary as-is. `river-snapshots.ts:179` removes unpublished slugs from that summary, but does not add missing catalog routes or validate completeness against the currently deployed scored inventory. A fresh timestamp therefore does not prove current catalog coverage.

**Recommendation:** give Explore a complete public discovery dataset with coordinates, route facts, eligibility, and explicit conditions availability; overlay scores by slug. Keep reviewed planning routes discoverable with “No live conditions score,” and distinguish them from scored routes temporarily missing a reading. The current minimal catalog endpoint needs enrichment or a dedicated discovery endpoint. Investigate snapshot-worker/API revision alignment and add expected-slug/state coverage validation alongside freshness checks. Preserve publication and safety gates.

### P1 — Map truncation looks like geographic absence

The live All routes view showed **271 grouped results** in the list, while the map said **437 routes across 100 supported rivers**, with “Showing 100 of 271 results in this map area.” The map uses the first 100 ranked items (`explore-map-viewport.js:9`, `summary-board.js:3746`), and initial bounds are assembled from that displayed subset. National coverage is consequently represented by a ranked subset, not the whole matching catalog.

The suggested “show more” action is inside `.summary-map-results-panel` (`SummaryMapPanel.astro:102`), which desktop CSS hides at widths above 760px (`explore-page.css:20`). No such action appeared in the desktop accessibility tree.

**Recommendation:** show all matching geography through clustering or aggregate layers, and limit only detailed rendering. Fit national/state bounds using all matching routes. In the interim, move the load-more action outside the hidden panel and state the display limit prominently. A “Show all matching routes” action must be accessible on desktop and mobile.

### P1 — Geography is split across competing controls

The location panel contains GPS/city selection, trip presets, and All routes. The Filters panel contains sort, search, and conditions; state and radius are buried in More filters. A separate state directory is below the results. This makes the most basic tasks—browse nationally or browse one state—harder than selecting advanced trip attributes.

Setting a city changes Top picks today to Best nearby but does not itself impose a distance limit (`board-location-controller.js:76`). Best near me imposes an automatically chosen radius; Full day does not. Both appear in the same shortcut group. State and radius are independent AND filters, so selecting a distant state can retain a radius around the saved city and produce an unexplained empty result.

**Recommendation:** put a single visible geographic scope first: **Anywhere | Near a location | In a state**. Show city and radius only for nearby scope, and state selection only for state scope. Retain the saved city as a preference without making it an invisible restriction on state/national browsing. Show one scope summary, such as “Arizona · All conditions · All route types.”

### P2 — Shortcuts replace unrelated choices and can retain incompatible ones

All presets clear state, search, difficulty, camping, and radius before applying their own choices. Live reproduction: selecting Arizona, then Full day, changed the state back to All states without an explicit warning.

Source also shows inconsistent clearing of trip fields: Full day leaves a previous paddle-length filter; Long camping route leaves a previous paddle-time filter; Quick float leaves a previous paddle-length filter (`summary-board.js:1851–1885`). A sequence such as Long camping route → Quick float can retain 10+ miles alongside under 3 hours.

**Recommendation:** presets should preserve geography and text search, and replace only their documented trip attributes. Define each preset completely enough to clear conflicting duration/length choices. Present presets as trip choices outside the location panel.

### P2 — Multiple meanings of “All” and “Reset”

- All states clears only state; it does not remove radius, conditions, route-type, or trip filters.
- Scores → All clears the conditions restriction, but can leave whitewater excluded.
- All routes clears most filters, but still cannot access missing records in the scoring feed.
- Reset all filters restores Paddle routes and Non-whitewater, rather than an unrestricted view (`summary-board.js:1728`).

“Paddle routes” actually means routes whose current condition/readiness call is paddle (`board-domain.js:109`). It reads like the whole product category. The map introduction says these routes are “shown first,” although the default hides the others.

**Recommendation:** use “All published routes” as the broad browse mode, rename the positive-condition choice to “Paddle today,” and separate conditions availability from route type. Either reset to a truly unrestricted browse or label the action “Restore recommended filters.” Explain active exclusions visibly.

### P2 — Counts and empty states obscure what happened

The header counts public routes and rivers; the list counts grouped river results; the quick-filter summary incorrectly calls those grouped items routes (`summary-board.js:1915`). During this audit, 2,704 tracked routes, 271 results, and 437 displayed map routes all appeared in the same experience.

Arizona's empty state said only “No results match the current filters,” even though the page knew there were 23 public routes there. The nearby Request a route prompt can imply missing inventory when the actual problem is the discovery feed.

**Recommendation:** display consistent units: “N routes on M rivers,” plus a separate map display count when limited. Empty states must distinguish no catalog coverage, filters excluding existing routes, no live scores, and a feed failure. Offer a state catalog link and a scoped clear-filters action when routes already exist.

## Recommended behavior contract

| User action | Expected behavior |
| --- | --- |
| Browse all routes | Show all published routes across supported states, including planning routes; no location required. |
| Choose Arizona | Show Arizona's public routes; no residual radius restriction from another city. |
| Choose Near a location | Ask for/use a location and show an explicit radius; explain distance estimates. |
| Choose Full day or Quick float | Preserve geography; set coherent trip filters and disclose them. |
| Choose Paddle today | Explicitly restrict to qualifying current condition calls; preserve geography and route preferences. |
| Pan the map | Make whether the list follows the map explicit; provide a visible reset-area action. |
| Clear filters | Remove optional restrictions without silently switching geographic scope. |

Prioritize data completeness and snapshot consistency first, geographic scope and full-coverage map rendering second, then preset behavior and terminology. Styling alone will leave the missing-state defect intact.

## Acceptance checks for the eventual fix

1. Every published catalog slug is discoverable in unrestricted Explore, regardless of score availability; unpublished/withheld routes remain excluded.
2. The production scored inventory and snapshot have an explicit completeness check, including per-state coverage and catalog revision identification.
3. Arizona and Florida state browsing returns catalog routes even if the score service is unavailable.
4. A saved city does not constrain Anywhere or In a state. Nearby scope always displays its radius.
5. Switching trip presets preserves the chosen state and removes incompatible time/length restrictions.
6. National/state map bounds include all matching geography, and any rendering cap has a visible accessible explanation/action.
7. Header, summary, map, and list identify routes versus grouped rivers consistently.
8. Validate at desktop and phone widths, with keyboard navigation, saved preferences, shared links, and no saved location.

Until fixed, the [state directory](https://paddletoday.com/states/) and individual state pages provide a more complete catalog entry point than Explore.
