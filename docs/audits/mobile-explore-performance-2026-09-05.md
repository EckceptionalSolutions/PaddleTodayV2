# Mobile Explore performance and usability audit

September 5, 2026. Scope: the Expo mobile app's Explore screen, native map, shared drawer, and Expo web fallback. This follows the September 4 pass already present in the working tree. Unrelated edits were preserved. Changes are local; nothing was deployed.

## Findings addressed

| Priority | Finding | Change |
| --- | --- | --- |
| High | Every new route selection requested a camera fit. Nearby tap targets moved, and a fit could cross the threshold that replaces condition zones with individual routes. | Route taps preview without moving the camera. The explicit **Center selected route** button still fits the route with drawer padding; it appears only with a selection. Filter/location changes retain their existing camera actions. |
| High | The first 200 input routes expanded into more than 200 native markers after sibling grouping. All those markers mounted even when offscreen, while other matching rivers were excluded. | All matching routes enter the map model. Native rendering uses a viewport grid with 64-point cells and a 20% margin beyond each screen edge. Nearby locations cluster; taps zoom in. At very close zoom, a virtualized chooser makes overlapping locations selectable. The selected marker remains available even inside a cluster. |
| High | Opening or dismissing the first selection dimmed every other marker, re-enabling their 450 ms snapshot-tracking windows. | Explore keeps other markers unchanged. Only the selected marker changes appearance on opening/closing; switching selections updates the old and new selected markers. Other map consumers retain their existing dimming behavior. |
| High | The photo and expanded details used the same sibling React key. Repeated selections retained duplicate photos and pushed route details below the visible drawer. | Separate `photo:` and `details:` keys preserve intentional per-route resets without key collisions. Reproduced visually and verified after the fix. |
| Medium | Small zoom changes near 8.5 repeatedly replaced the complete zone/route marker set. | Enter individual-route mode at 8.8; leave below 8.2. Marker clustering updates after the map camera settles, not on every animation frame. |
| Medium | Drawer spring animations updated layout through JavaScript on every frame, competing with map work. Drag release also started a spring that the snap-state effect restarted. | Reanimated runs native settling springs on the UI thread. Each changed snap starts one spring. Short drags to the same snap still settle. PanResponder drag events themselves remain on JavaScript. |
| Medium | The closed filter sheet still recalculated its draft matches. | Draft match calculation runs only while the sheet is open. |
| Low | Map/list tabs and map action buttons had small targets. The status described individual-route mode as “zones.” | Tabs and map action buttons have 44-point targets. The status reports matching route and river counts; its accessibility description explains clustering. |

The marker snapshot concern is consistent with the library's [marker documentation](https://github.com/react-native-maps/react-native-maps/blob/master/docs/marker.md?plain=1), which describes the cost of child-view tracking. This pass retains the existing initial tracking window to avoid introducing unverified marker-paint changes.

## Measured rendering workload

The saved 929-route catalog from the prior audit was reused. Each scenario uses the same **unfiltered** catalog and a fixed 390 × 844 viewport. “Minnesota” and “Twin Cities” below are camera positions, not state filters. Before counts are the native markers produced by the prior first-200-input strategy; after counts include both single locations and clusters from the full catalog.

| Camera scenario | Before native markers | After native markers | After clusters | Median viewport calculation |
| --- | ---: | ---: | ---: | ---: |
| Nationwide, zones | 236 | 27 | 23 | 0.145 ms |
| Minnesota, zones | 236 | 78 | 48 | 0.048 ms |
| Twin Cities, individual routes | 321 | 10 | 1 | 0.019 ms |

The complete catalog produces 621 condition-zone locations or 929 individual-route locations before viewport processing. Calculations used 30 warmups and 200 samples in Node. These are model/workload measurements, **not device frame rates or measured end-to-end speedups**. A synthetic 5,000-location test also confirms fewer than 120 rendered markers at this phone size while preserving every in-view location in cluster membership.

## Validation

- Mobile TypeScript check passed.
- All 23 mobile tests passed across seven files. Six new viewport tests cover dense coverage, offscreen culling, routes beyond the old cap, stable membership IDs, invalid coordinates, wrapped longitudes, cluster zoom and grouping hysteresis. Camera tests now assert viewport preservation on route taps.
- Production Expo exports passed for iOS, Android and web, including native Hermes bundles and 20 web routes. This validates bundling; it is not a native installation/device test. Exports use the local audit API fixture and are not release artifacts.
- The tracked `apps/mobile/tests/explore-interactions.mjs` browser regression passed at 320px and 390px. It verifies repeated selections retain exactly one photo, expansion, marker identity/position, dismissal, center-button visibility, 44px tabs, and list switching.
- The prior audit's broader browser harness also passed against the updated export: delayed geometry, rapid double-open protection, restored selection and drawer on Back, list scroll restored at 1,250px, and Back during a delayed cold detail request.
- Final drawer screenshot was inspected: duplicate photo removed and distance, paddle time and difficulty visible again.
- Changed tracked files passed `git diff --check`.

Local diagnostic files live under the ignored `apps/mobile/.expo/explore-audit/`: `viewport-benchmark.ts`, `viewport-benchmark.json`, `performance-smoke.mjs`, `performance-smoke-results.json`, and `performance-drawer.png`. The Expo export is under `.expo/explore-performance-after`. The tracked regression can be run with:

```powershell
node apps/mobile/tests/explore-interactions.mjs http://127.0.0.1:4391
```

It expects a served Expo web export with a populated Minnesota catalog. It invokes some marker presses directly because the expanded drawer covers part of the projected fallback; it does not verify native touch hit-testing.

## Remaining work and limits

1. **Native device profiling is the next validation step.** No Android/iOS device interaction or frame-time measurements were completed in this pass. Verify release-build panning, rapid selection, cluster expansion and close-zoom chooser behavior, marker paint after snapshot tracking stops, VoiceOver/TalkBack, and drawer drags on a lower-end Android phone and an iPhone. Native clustering and the Reanimated spring are compiled and source/model tested, but browser results do not validate them.
2. **Search still performs filtering, sorting, map-model work and preference writes per keystroke.** A measured follow-up should debounce applied search while keeping the input immediate and coalescing camera fits. This needs a single applied-search state so the camera cannot fit stale results.
3. **Map/list switching remounts the map.** Returning from route details preserves the existing mounted screen, but toggling list/map does not preserve a manually panned viewport. Saving/restoring the last native viewport would improve continuity.
4. **Drawer dragging still crosses the JavaScript thread.** The settling spring is now independent of JavaScript; gesture handling would need a UI-thread gesture implementation to remove that dependency during active drag. The drawer still animates height and performs layout, rather than using a fixed-height translated surface.
5. **The Expo web map remains a projected fallback.** It does not implement geographic panning/zoom or the new native clustering. The existing React hydration error #418 occurred again before the app recovered. Both limitations predate this pass. Gallery images are absent from the local fixture server, so image decode/network performance was not measured.
6. **Preview deliberately preserves the viewport.** A route near the lower edge may be covered by the opened drawer. Center selected route is the explicit way to bring it into view. A later refinement could pan only obscured selections without changing zoom, with device-tested projection and safe-area handling.
