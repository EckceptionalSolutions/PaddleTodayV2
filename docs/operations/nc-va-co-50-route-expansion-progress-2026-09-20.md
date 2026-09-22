# North Carolina, Virginia, and Colorado route expansion progress

Updated 2026-09-20 while working toward the active goal of up to 50 public routes per state.

## Current counts

The route-universe report currently shows:

| State | Public routes | Scored routes | Remaining to 50 public |
| --- | ---: | ---: | ---: |
| North Carolina | 46 | 13 | 4 |
| Virginia | 38 | 27 | 12 |
| Colorado | 40 | 24 | 10 |

## North Carolina disposition

Added `new-river-nc88-wagoner`, a five-mile planning route from the NCWRC-listed N.C. 88 Bridge canoe access to New River State Park Wagoner Access. The current New River State Park map provides the section mileage and paddle-time estimate, NCWRC provides the public canoe-access coordinate, and USGS 03161000 is retained as clearly labeled same-river proxy context. The route includes explicit shallow-water, minor-rapid, portage, cold-water, storm-debris, access-hours, and camping controls. Canonical geometry and the generated access registry were regenerated; corridor and safety audits pass.

The next New River map pair, Kings Creek to Alleghany, is a five-mile paddle-in-only section. It remains deferred because Alleghany is not a vehicle shuttle endpoint and its available coordinates are campsite or access-area anchors rather than a published water-entry coordinate. The remaining New River bridge/campsite pairs would overlap existing routes or depend on unverified bridge or private-bank landings. Deep River has real route leads, but the strongest lower sections currently document steep banks, locked or unsafe access, dam portages, or bridge-only entries. No scored North Carolina addition cleared this pass.

## Virginia disposition

Added `jackson-river-indian-draft-interstate` as a scored route. The current Alleghany Highlands Blueway publishes the 7.5-mile Indian Draft-to-Intervale float, public endpoint coordinates, Class I–II character, and a 200–1,000 cfs Section 2 band tied to the Gathright gauge. The same Blueway and Virginia DWR sources document cold-water releases, private-property closures, no river camping, and the mandatory Covington industrial boundary; the app ends at the mapped Interstate Park access before that boundary. Canonical geometry and the access registry were regenerated, and route-data and safety audits pass.

Added `jackson-river-fort-young-teddy-dressler` as a second scored route. The Blueway publishes this distinct 3.9-mile Fort Young to Teddy Dressler float, public city-ramp coordinates, mild Class I character, and a 500–1,900 cfs Section 3 band. The route carries direct Gathright telemetry, release/low-water/cold-water/private-bank warnings, nearby-basecamp camping classification, a rights-clean Jackson River gallery image, and canonical geometry. It ends at the named Teddy Dressler ramp rather than duplicating the longer Indian Draft-to-Interstate section.

Added `cowpasture-river-sharon-evans` as a third scored route. Blueway Section 4 publishes the distinct 4.5-mile Sharon Park to Evans Tract float, Class I–II character, public shoreline-access coordinates, and a 200–1,400 cfs passable band tied to direct USGS 02016000 Cowpasture telemetry. The route carries rain-rise, low-water, cold-water, strainer, and private-farm controls, nearby-basecamp camping classification, a public-domain Cowpasture image, and canonical geometry. It uses both named public water accesses and does not duplicate either Jackson River section.

Virginia’s remaining route-capable families are still explicitly blocked in `docs/operations/virginia-expansion-audit.json`. The next retry candidates are additional Jackson Blueway sections, the Smith River release-sensitive access chain, and Shenandoah/New River corridors. Each still needs a complete distinct endpoint, station-specific operating band, or dam/release safety package; do not transfer a neighboring gauge threshold.

The current opportunity queue has no unresolved North Carolina or Virginia records. The remaining Colorado queue entries are Arkansas River candidates near Malta and Leadville; both remain blocked on station-specific thresholds, lawful endpoint pairs, and a complete safety/logistics package, so the active goal should stop those states early until materially better evidence appears.

## Colorado disposition

Added `gunnison-river-chukar-gunnison-forks` as a planning route. BLM and Recreation.gov document the public Chukar boat launch, one-mile wilderness carry, Gunnison Forks public take-out, designated river camps, permits/fees, and the Class III–IV rapid sequence. USGS 09128000 provides direct telemetry, but BLM’s feature-specific notes (large holes above 2,000 cfs and a changing Gate Keeper below 600 cfs) are not a station-tied runnable band; the route is therefore deliberately excluded from scoring. The record includes explicit expert-only/high-class rapid handling, cold-water/remote-rescue controls, on-route camping classification, a rights-clean Gunnison River gallery image, source-backed water access anchors, and canonical geometry.

Colorado now has 40 public routes and a large reviewed gauge network; its saturation dossier still lists 126 uncovered route-capable gauges. Remaining retry families include upper Roaring Fork, Fryingpan, Dolores, Yampa, Ruby-Horsethief, and lower Uncompahgre. They remain no-add candidates until a complete current endpoint, station-tied threshold, camping/permit, safety, imagery, coordinate, and geometry package clears the publication bar.

## Quality gates applied

- No duplicate route IDs or slugs were introduced.
- The North Carolina planning route has named public water access at both endpoints, route-specific safety and camping prose, proxy-gauge labeling, source links, and canonical route geometry.
- All three new Virginia routes have named public water access at both endpoints, direct station-linked operating bands, route-specific safety/camping prose, route-specific gallery coverage, source links, and canonical geometry.
- The Colorado Gunnison Gorge route has BLM/USGS source links, water access anchors, designated-camp and permit controls, explicit Class III–IV handling, planning-only score posture, route-specific gallery coverage, and canonical geometry.
- `scripts/audit-route-data.ts` passed for 3,003 routes.
- The route corridor audit passed for 216 definitions and 508 covered routes.
- The route safety audit generated zero issues for 1,824 scored routes.
- Route data typecheck remains blocked by pre-existing unrelated errors in New York, Wisconsin, and Iowa; no error points to the North Carolina, Virginia, or Colorado additions.
