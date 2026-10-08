# Bayou Teche National Paddle Trail route-family review

Date: 2026-10-07

## Finding

The source catalog contains 44 Bayou Teche dock-pair routes across the official trail. Nine are already withheld during endpoint-coordinate review, leaving 35 public route choices. Most public records combine multiple adjacent docks into longer variants and repeat the same planning-only gauge caveat, general bayou hazards, source links, and access information.

TECHE Project's current dock guide lists official trail docks with river-mile markers and identifies the Bayou Courtableau connection at Port Barre, the mile-52.6 St. Martinville obstruction, and the hard downstream structures around miles 119 and 133. Its parish maps add different skill and portage guidance above and below St. Martinville. The Port Barre USGS station reports stage, but its discharge record ended in 2024 and the route records have no verified stage-based scoring range.

## Decision

Keep 11 currently available adjacent dock-to-dock trail legs as standalone pages. Two additional adjacent legs touch Poche's Bridge and remain withheld pending endpoint review. Consolidate the other 24 currently public composite pages into their matching options on the Bayou Teche hub. Keep all 35 available trips in the picker; the nine unavailable route records still redirect to the hub's access-review note.

The hub presents two planning areas: Port Barre through St. Martinville, and the downstream sections from St. Martinville to Centerville. The downstream section explicitly identifies the mile-52.6 portage/lock boundary. The catalog stops at Centerville (mile 114); it does not offer trips through the Atchafalaya levee at mile 119 or Berwick Lock at mile 133.

## Changes

- Added exact redirect pages for 33 route URLs: 24 public composites select their matching trip card, and nine coordinate-held URLs lead to the access-review note. The pages are generated at build time and excluded from the sitemap; see the [redirect delivery audit](route-consolidation-redirect-delivery-2026-10-07.md).
- Added a source-linked hub section with named adjacent segments grouped around the St. Martinville obstruction, current route-coordinate review status, stage-only gauge limitations, and the Centerville boundary.
- Kept all route records, per-trip distances, named access, portage notes, and planning status intact.
- Registered the river as a condition family with no generalized continuous-route edges.

## Rollout limits

This reduces standalone Bayou Teche route pages from 35 to 11 while retaining all 35 currently available trip choices. The final production-mode candidate at `.local/seo-candidate-2026-10-07f` built successfully with 3,119 sitemap URLs and 2,679 standalone route pages, 24 fewer than the Suwannee candidate. It retains 129 active consolidated options across the five reviewed families. The built-page audit checked 3,057 route links and found no orphaned public pages, missing directory inlinks, duplicate route headings or descriptions, errors, or warnings. All 33 Bayou Teche redirects match their source mappings. A rendered-HTML spot check also confirmed proper spacing before the source link. These are candidate-build results; production and Google change only after deployment and recrawl. The held routes remain absent from the public catalog until their endpoint review is cleared.

Source: [TECHE Project official dock locations and mile markers](https://www.techeproject.org/bayou-teche-paddle-trail/dock-locations/), [official parish maps and safety notes](https://www.techeproject.org/bayou-teche-paddle-trail/map/), [Bayou Teche Paddle Planner](https://www.techeproject.org/bayou-teche-paddle-trail/paddle-planner/), [USGS Port Barre gauge](https://waterdata.usgs.gov/monitoring-location/USGS-07385450/), and [Teche-Vermilion water-level readings](https://teche-vermilion.gov/teche-vermilion-water-levels/).

## Public trip-choice curation (2026-10-08)

The earlier decision to keep all 35 available choices in the picker is superseded. The official TECHE Project overview describes the trail as town-to-town trips generally 6–12 miles long; its dock guide supplies the access sequence and river miles. The existing 11 adjacent, verified dock-to-dock legs cover the supported public section choices. The other 24 available routes are longer combinations of those same stops, many 20–50 miles long, and are not distinct named sections in the current official dock guide.

The public hub and picker now expose those 11 adjacent sections. The 24 composite route records remain in the source inventory for reference, while their legacy paths lead to the hub's dock-to-dock section guide. The nine coordinate-held routes continue to lead to the access-review notice. This retains the local mileage, access, and hazard details on the section pages while reducing the picker from 35 choices to 11. The upper/downstream distinction and the mile-52.6 obstruction remain explicit in the hub guidance.

Sources checked for this follow-up: [TECHE Project overview](https://www.techeproject.org/), [current dock locations and mile markers](https://www.techeproject.org/bayou-teche-paddle-trail/dock-locations/), [paddle-trail maps and parish safety notes](https://www.techeproject.org/bayou-teche-paddle-trail/map/), and [Paddle Planner information](https://www.techeproject.org/bayou-teche-paddle-trail/paddle-planner/).

## Production verification (2026-10-08)

Frontend workflow [37806444604](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37806444604) and API workflow [37806444593](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37806444593) succeeded. The Snapshot Worker workflow [37805848319](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37805848319), triggered by the catalog change, also succeeded.

On production, the Bayou Teche hub returns HTTP 200 and renders exactly 11 public trip cards. The Port Barre–St. Martinville composite URL returns the generated redirect page targeting the dock-to-dock section guide; a Poche’s Bridge route under access review points to the access notice. The sitemap index and child sitemap both return HTTP 200. The child sitemap contains 2,521 URLs, includes the Bayou Teche hub, and omits the retired composite route page.
