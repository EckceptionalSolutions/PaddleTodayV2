# Minnesota Pre-Share Audit

Generated: 2026-07-24

This is the repository-backed portion of the Minnesota data audit before promoting the mobile app. It separates automated findings from items that still need source or field confirmation.

## Current inventory

- Minnesota routes: 241
- Minnesota routes with safety profiles: 179
- Minnesota routes without safety profiles: 62
- Minnesota whitewater routes with safety profiles: 19 of 19
- MN DNR gauge routes: 223
- USGS gauge routes: 18
- Direct gauges: 141
- Proxy gauges: 100
- Route-data audit: passed for 947 routes
- Route-data typecheck: passed

## Completed fixes

### Cloquet River safety profile

Added a reviewed `caution` safety profile to `cloquet-river-island-lake-bachelor-road`. This exact route is recommended by MN DNR, but the source also documents Island Lake Dam release dependence, Class I-II rapids, scouting/portaging, and low-flow scraping. The profile now exposes dam-release, whitewater, cold-water, and remote-route hazards in the app.

Source: [MN DNR Cloquet River segments and maps](https://www.dnr.state.mn.us/state-water-trails/cloquet-river/segments-maps.html)

### Minnesota paddle-guide link

Corrected the Crow Wing guide entry for “Stigman's Mound to Little White Dog” to point to the live route slug `crow-wing-river-stigmans-mound-little-white-dog`.

The route-data audit now checks Minnesota guide `trackedSlug` references so this class of broken link fails the audit in the future.

### Root River Rushford-to-Houston access coordinates

Corrected both endpoints from stale/off-river coordinates to the current Minnesota DNR public-water-access records:

- Rushford: WAS00264 at 43.803006, -91.760355
- Houston: WAS02188 at 43.769008, -91.571222

The targeted coordinate audit now reports both endpoints as `ok`. The trip copy now distinguishes the actual DNR access sites from nearby Historic Depot and Houston Nature Center trailhead support.

Source: [Minnesota DNR public-water-access feature service](https://arcgis.metc.state.mn.us/server/rest/services/GDRS/DNR_loc_water_access_sites_in_mn_ad/FeatureServer/0)

## Findings requiring review

### 1. Sixty-two recreational routes lack safety profiles

This is not automatically a publication blocker because the missing profiles are overwhelmingly recreational rather than whitewater routes. It is still a quality gap for promoted routes, especially the Minnesota guide entries and routes involving cold water, remote stretches, dams, or fast rises.

Recommended next pass: add conservative reviewed profiles to promoted routes first, using `standard` or `caution` only when supported by the route sources. Do not bulk-fill profiles from generic river language.

### 2. Apparent duplicate route choices — resolved as intentional

The overlap audit found five Minnesota `duplicate_or_reversed` pairs because some nearby access points are less than 0.08 miles apart. A source review resolved them as distinct choices:

- MN DNR's Sauk Map 2 lists Rockville County Park at river mile 16.8 and Eagle Park at river mile 16.2, with County Road 139 between them. The corresponding route pairs are valid alternate starts or finishes.
- MN DNR's Whitewater materials distinguish the County Road 26 / Beaver access from the longer 10.4-mile Elba-to-Highway-74 reach. The shorter route should remain a separate option.

No route removal or data change is warranted from these overlap flags. Keep the overlap audit as a review signal, not an automatic deduplication rule.

Source: [MN DNR Sauk River Map 2](https://files.dnr.state.mn.us/maps/canoe_routes/sauk2.pdf), [MN DNR Whitewater River water-trail map](https://mobile-maps-files.dnr.state.mn.us/file/Water_Trail/Zumbro%202%20-%20east%20and%20main%20branch%20GEO.pdf)

### 3. Cloquet take-out coordinate needs a local/map review

The targeted NHD coordinate audit found the Cloquet put-in acceptable and the Bachelor Road take-out 174 feet from the matched named flowline. MN DNR's official route map supports Bachelor Road as the route endpoint, so this is more likely an access/parking anchor than a wrong river coordinate. It should remain marked for arrival-point verification rather than being silently moved onto the water.

### 4. William O'Brien access is condition-dependent

The St. Croix Osceola-to-William O'Brien route already includes a same-day access caveat and the February 2026 DNR update as a source. Current DNR guidance says the river access may reopen as water levels allow during 2026 while the broader Lake Alice reconstruction continues. This route should be rechecked immediately before promotion and the caveat should remain visible.

Source: [MN DNR Lake Alice construction update](https://www.dnr.state.mn.us/state_parks/lake-alice-construction.html)

## Automated checks run

- `npm run routes:audit` — passed
- `npm run typecheck:routes` — passed
- `npm run routes:safety:audit` — no critical Minnesota issues; remaining flags include heuristic warnings for dams, whitewater language, obstructions, and condition language
- `npm run routes:audit:overlap` — completed; Minnesota duplicate/overlap candidates recorded above
- Targeted coordinate audit for Cloquet — completed; one endpoint marked for review
- Targeted coordinate audit for Root River Rushford-to-Houston — passed; both corrected endpoints are now `ok`
- `npm run mobile:typecheck` — passed
- `npm run mobile:release-check` — 51 checks passed
- `npm run mobile:api-smoke` — 8 production API checks passed
- Static build — passed; all nine Minnesota guide route pages checked were generated

The full unfiltered coordinate audit was not used as a release gate because its NHD requests exceeded the command timeout in this environment. Targeted checks remain usable and cached.

## Release recommendation

The repaired guide link and missing Cloquet safety profile are high-confidence fixes. Before the Facebook post, manually review the five potential duplicate pairs, every route featured in the post, and the current William O'Brien access status. The remaining 62 missing recreational profiles should be treated as a prioritized follow-up rather than filled mechanically.
