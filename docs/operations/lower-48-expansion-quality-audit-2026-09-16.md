# Lower 48 expansion route quality audit

Prepared: 2026-09-16
Scope: the 832 route entries in the 17-state expansion set.

## Coverage

| State | Routes |
| --- | ---: |
| Alabama | 50 |
| Arizona | 50 |
| California | 50 |
| Connecticut | 50 |
| Florida | 50 |
| Louisiana | 50 |
| Massachusetts | 50 |
| Mississippi | 50 |
| Montana | 50 |
| Nevada | 43 |
| New Hampshire | 50 |
| New Mexico | 38 |
| Oregon | 51 |
| Rhode Island | 50 |
| South Carolina | 50 |
| Vermont | 50 |
| Washington | 50 |
| **Total** | **832** |

All 832 route IDs resolve in the current route inventory.

## Safety and camping

Every route has a reviewed safety profile, hazards, and safety guidance. The catalog safety audit reported **0 issues across 1,865 scored routes**; the 832 expansion routes also have **0 missing safety fields**.

Every route has camping guidance and a classification. Fifteen records had been labeled `unknown` even though their text already described a day trip with no overnight site included or established. Those classifications are now `none`; the text retains any important exceptions, including camping that requires prior permission or separate lawful arrangements. The expansion set now has **0 unknown camping classifications**:

| Classification | Routes |
| --- | ---: |
| None for the selected itinerary | 379 |
| Nearby basecamp | 304 |
| On-route campsite | 29 |
| Overnight capable | 28 |
| Sandbar or gravel bar | 80 |
| Endpoint campground | 12 |

## Access-point review

All routes have put-in and take-out coordinates. Their access-point lists begin and end at the matching put-in and take-out, with **0 chain mismatches**. That structural check does not establish that every coordinate is on the water.

The latest hydrography report (2026-09-16) covers **1,679 endpoints on 826 of the 832 routes**. Within the expansion set, it classifies 617 endpoints as `ok`, 842 as `review`, 168 as `suspicious`, 50 as `failure`, and 2 as `unknown`. These ratings compare mapped access anchors with named hydrography; ramps, parks, confluences, and dock approaches can be offset from a named flowline, so a flag is a research signal rather than proof that an access is wrong. The high-priority flags cluster around named access facilities in Louisiana, Rhode Island, South Carolina, Vermont, and Washington. The 50 `failure` findings affect 46 routes; they need source review before coordinates are moved.

The six routes missing from that full-catalog snapshot were checked separately. The East Fork Carson and Rio Grande Red River-confluence routes had all four endpoints pass. The four Animas River routes had 11 endpoints pass and three review flags at the same source-identified Riverside Park landing. This separately reviewed set has no failure or unknown endpoint.

Counts of the more severe findings by state:

| State | Failure | Suspicious | Unknown |
| --- | ---: | ---: | ---: |
| Alabama | 0 | 1 | 2 |
| Arizona | 0 | 16 | 0 |
| Florida | 0 | 9 | 0 |
| Louisiana | 12 | 29 | 0 |
| Mississippi | 0 | 7 | 0 |
| Montana | 0 | 40 | 0 |
| New Hampshire | 0 | 9 | 0 |
| New Mexico | 0 | 2 | 0 |
| Rhode Island | 16 | 14 | 0 |
| South Carolina | 6 | 12 | 0 |
| Vermont | 11 | 8 | 0 |
| Washington | 5 | 21 | 0 |

Examples for follow-up include the Bayou Teche municipal docks, Blackstone and Woonasquatucket launches, Catawba landings, Winooski and Otter Creek access points, and Spokane River boat launches. The detailed findings and their coordinates remain in `docs/route-coordinate-river-audit.json`. Do not snap these to a river centerline without checking an authoritative access source; a launch ramp or landing edge is the intended pin when evidence supports it.

## Gallery review

All 832 routes have a non-placeholder preview image and gallery metadata. There are **833 gallery photo entries**, **106 unique preview sources**, **0 missing local assets**, and **0 cross-river preview-image reuse**. The source mapping is route-specific on 93 routes and river-group based on 739 routes. The river-group photos are river-specific but can repeat among routes on the same river; they are not unique route photos.

The gallery audit found and fixed one oversized asset: `public/gallery/housatonic-berkshire/housatonic-village.jpg` was reduced from 1920×2560 to fit the 2000-pixel maximum. The full gallery audit now passes for all 346 assets.

## Consolidation and duplicate review

The overlap run examined 1,852 route spans across the catalog. For the expansion set, it recorded 7,063 overlap relationships: 62 access-chain containment, 696 contained connectors, 907 crossing segments, 2,082 near-collinear overlaps, and 3,316 shared endpoints. These are useful route-family review signals. The run found **0 duplicate-or-reversed route pairs**.

Three Bartram Canoe Trail families share exact launch coordinates but describe different loop or itinerary choices: French’s Lake–Hubbard, Upper Bryant, and Rice Creek. Their route distances and day-trip/overnight plans differ, so they are not direct duplicates. Keep them as distinct choices and present the families clearly together. Across the expansion set, 29 routes already carry consolidation metadata and 24 include intermediate access points.

## Class IV rapid review

The current 17-state set contains **six Class IV routes** and no Class V or VI routes. All six are public planning records, are not score eligible, and have safety, camping, access, and gallery fields. No score was enabled as part of this audit.

| State | Route | Reach | Current record |
| --- | --- | --- | --- |
| Arizona | `verde-river-beasley-flat-childs` | Beasley Flat RAP to Childs River Access | Class IV; remote 17-mile Wild and Scenic expedition |
| Arizona | `verde-river-clear-creek-childs` | Clear Creek RAP to Childs River Access | Class IV; remote Verde expedition through the Beasley Flat reach |
| Arizona | `verde-river-white-bridge-childs` | White Bridge RAP to Childs River Access | Class IV; long remote combination with the Wild and Scenic reach |
| Massachusetts | `deerfield-river-monroe-bridge-dunbar` | Monroe Bridge launch to Dunbar Brook Picnic Area | Class IV; upper Deerfield Dryway |
| Nevada | `truckee-river-floriston-crystal-peak` | Floriston I-80 bridge to Crystal Peak Park | Class IV; technical upper Truckee whitewater |
| New Mexico | `rio-grande-john-dunn-taos-junction` | John Dunn Bridge to Taos Junction Bridge (Lower Taos Box) | Class III–IV; committing 15-mile gorge run |

These records are not scored, but remain publicly discoverable as planning routes. Deciding how to present or gate Class IV trips is still open; this audit leaves that policy unchanged for review.

## Validation

- `npm run routes:audit` — passed for 2,998 routes; 137 planning-route issues remain tracked and 84 planning checks are explicitly deferred.
- `npm run routes:safety:audit` — 0 issues for 1,865 scored routes.
- `npm run typecheck:routes` — passed.
- `npm run photos:audit` — no placeholders or missing required photo assets.
- `npm run gallery:optimize -- --write` — gallery audit passed for 346 images; one image optimized.
- `npm run routes:audit:overlap` — completed; no exact duplicate-or-reversed expansion pairs.
- Focused catalog, safety, and publication tests — 18 passed.
