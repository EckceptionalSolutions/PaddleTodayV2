# Mobile Explore experience improvements

Implemented September 4, 2026. Scope: Explore map/list selection, opening route details, and returning to Explore. Existing unrelated workspace edits were preserved.

## Findings and changes

1. **Competing camera updates.** Explore scheduled a selection fit after 120 ms and refit the map or nearby area after 500 ms when a selection was cleared. The Android map also retained its default movement on marker taps. Camera intent now follows explicit selection/filter/location changes, waits for map readiness, and pauses while Explore is unfocused. Dismissing the drawer, returning from details, and receiving geometry do not request another camera movement. Selected route endpoints are used while canonical geometry loads instead of fitting the entire condition group.
2. **Selection and zoom rebuilt too much map data.** Selection reordered the capped input, every numerical zoom change reran grouping, and each represented river rescanned all matching routes. The displayed input stays stable; grouping changes only when crossing the existing individual-route zoom threshold. A single index replaces repeated full-catalog scans. Bounds and native marker signatures are memoized.
3. **All native markers resumed snapshot tracking on every selection.** Tracking now belongs to each memoized marker and responds to its actual appearance changes. Switching between two selected routes can update those two markers without restarting tracking for unchanged markers. The initial dimming of other markers and grouping transitions still legitimately update more markers. This is a source-level improvement; native frame-time gains were not measured.
4. **Filtered segments could share marker IDs.** Two selected segments on the same river with the same zone and score received identical keys. Segment markers now have route-specific identities. Web markers also retain their keys when selected or when score visibility changes.
5. **Unnecessary detail requests.** The initial Today section fetched history and reports it did not display, then fetched a complete river group merely to count sibling routes. It now uses the cached Explore catalog for identity/counts, with the group-query fallback retained for direct visits without that catalog. History, reports, and geometry load when the relevant sections or trip-planning UI need them. Pull-to-refresh refreshes the current section.
6. **No preview warming or duplicate-open protection.** A map selection settled for 200 ms warms the detail query; the detail screen joins that request using the same key and freshness policy. List press-in warms its intended route or river group. Navigation starts immediately, and a synchronous guard prevents rapid repeated taps from pushing multiple screens. Returning to Explore releases the guard.
7. **Generic loading and drawer churn.** Loading now shows the requested river/reach and reserves the photo and title layout, without showing summary scores as current detail data. Cards and the drawer's Open button have press feedback. Changing map selections preserves drawer expansion, resets the new route's internal content position, and clears the previous route photo by remounting only that photo.

## Before-and-after evidence

Production Expo web exports were tested with Chromium at 390 × 844 using a captured public API summary containing 929 routes. A local read-only fixture server replayed identical responses with an 800 ms detail delay and 150 ms delay for other API responses. Both builds received the same 1.2 seconds of preview inspection before Open was pressed. Five fresh browser contexts were tested per build.

| Measurement | Before | After |
| --- | ---: | ---: |
| Median Open-to-detail-ready after preview | 886 ms | 96 ms |
| Median marker-to-drawer | 30 ms | 33 ms |
| Median cached repeat Open-to-detail-ready | 62 ms | 110 ms |
| Unique API endpoints needed from preview through Today detail, excluding summary | 5 | 2 |

The major gain comes from overlapping the detail request with preview inspection and removing unrelated work. It does not imply an 89% improvement to every navigation or to the backend. Drawer and cached-navigation timing did not show an improvement in this small desktop-browser sample. Immediately opening an uncached route still waits for its detail response, with a named loading view and a working Back action.

A separate Node benchmark used the same 929-route catalog, 20 warmups and 100 samples, and checked exact output equality for unsegmented routes:

| Map model calculation | Before median | After median |
| --- | ---: | ---: |
| Condition zones, 236 resulting markers | 2.152 ms | 0.653 ms |
| Individual routes, 321 resulting markers | 1.732 ms | 0.536 ms |

The existing 200-input-route limit can expand to more than 200 markers when including siblings. Coverage was preserved; this change does not impose a new hard marker cap.

## Validation

- Mobile TypeScript check passed.
- Mobile suite: 17 tests passed, including 11 new tests covering camera intent, distinct segment identities, grouping, request deduplication, stale revalidation, late response isolation, and cancellation on Back.
- API client suite: 5 tests passed using its Vitest configuration directly. That workspace currently has no npm `test` script.
- Production Expo web export passed for all 20 routes.
- Browser checks passed: marker node/position stability through selection and delayed geometry; drawer expansion retained across selections; rapid double-open creates one stack entry; Back restores selection, filters, expansion and list scroll at 1,250 px; cold loading names the selected route and retains identical title position/dimensions when data arrives; late completion after Back does not reopen it; controlled HTTP 503 displays retry and recovers; Reports and More fetch on demand; cached detail opens offline.
- Final diff whitespace check passed.

Local raw measurements, scripts, fixtures and screenshots are in `apps/mobile/.expo/explore-audit/` (ignored diagnostic output). `compare.mjs`, `smoke.mjs`, and `recovery.mjs` exercise the before/after exports using the local `serve.mjs` fixture server. No production writes or deployments were performed.

## Limits

The Android emulator booted and Expo Go was available, but automatic approval review rejected both the regular and localhost-only Expo development-server commands with “blocked by policy.” No native Android or iOS interaction/frame-time verification was completed. Native camera and snapshot-tracking changes still need a device pass, particularly rapid selections across the zoom threshold and returning from details after manually panning.

The web map is the existing projected fallback, not the native map implementation. Browser timing therefore demonstrates request/navigation behavior, not native map smoothness. The fixture server did not supply production gallery image assets. A pre-existing React hydration error (#418) occurred in both baseline and updated web runs; the app recovered and the interaction checks passed. It remains outside this focused change.
