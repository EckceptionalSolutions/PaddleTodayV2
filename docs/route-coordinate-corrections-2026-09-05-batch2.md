# Access-coordinate corrections — 2026-09-05, batch 2

Two more public launches corrected using primary-source access identification and visible shoreline access in aerial imagery. Both were independently checked against NHD hydrography before adding their reviewed controls.

| Access | Previous coordinate | Corrected water entry | Move | Independent check |
| --- | --- | --- | --- | --- |
| Alton Riverfront public boat launch, Illinois | 38.8855000354463, -90.1759188990604 | 38.884220, -90.174440 | 628 ft | Failure → review; 24 ft from NHD water polygon |
| Mauston Dam downstream access, Wisconsin | 43.799400, -90.068400 | 43.796840, -90.068933 | 944 ft | Failure → OK; 25 ft from NHD water polygon, 90 ft from river flowline |

Coordinates are imagery-derived with approximately 40-foot uncertainty, not surveyed agency GPS. The machine-readable [evidence ledger](route-coordinate-corrections-2026-09-05-batch2.json) preserves full before/after audit rows, imagery bounds, pixel locations, image hashes and source links.

## Evidence and decisions

**Alton:** The [Mississippi River Water Trail organizer](https://mississippiriverwatertrail.org/great-rivers-rendezvous/) names the City of Alton boat launch at Alton Marina as the take-out. [OSM slipway 12549669381](https://www.openstreetmap.org/node/12549669381) corroborates the facility. Aerial imagery places the public concrete ramp under Clark Bridge, entering the connected marina channel. The previous coordinate was inland in marina parking. Its remaining 1,681-foot distance to the Mississippi main flowline is informational; moving the pin into the main channel would lose the actual ramp.

**Mauston:** The [city's activity guide](https://www.mauston.com/top10) recommends the dam-to-19th-Street paddle. [Wisconsin River Trips](https://www.wisconsinrivertrips.com/segments/lemonweir-river/mauston) documents the north-bank landing below the dam and photographs the gravel approach. Its trip-map marker identifies the adjacent parking area; imagery resolves the shoreline entry. Existing warnings to launch below the dam and stay clear of spillway current remain applicable.

## Scope and validation

Updated matching route and trip-detail coordinates in Illinois and Wisconsin; compared source snapshots to verify that unrelated route blocks did not change. Added two reviewed controls, refreshed access evidence and registry, removed stale correction/research items, refreshed route withholding and affected public map geometry. Both corrected routes now clear the coordinate withholding gate. No deployment was performed.

- 53 targeted tests passed across six test files.
- Route-data audit passed for 1,998 routes.
- Canonical geometry audit passed: 1,924/1,925 routes matched, 30 state assets. The inventory grew concurrently during this batch.
- Coordinate hold coverage passed; the prior Moser Park manual hold remains.
- Route typecheck encountered three unsupported hazard tags in separately changing Idaho data (`low_bridges`, `railroad`, `industrial_debris`, line 8363). These were outside this correction batch.

## Research retained

Blackwater Wayside/The Ford coordinates match Google Maps viewport centers, but county documentation conflicts on access status and exact landing placement remains unresolved. Cooper Hill needs verification of its south-bank carry path near Third Creek; the opposite-bank clearing is not a substitute. Nichols Landing's old point is in woods south of the river, but the exact designated north-bank landing still needs map-to-imagery verification. These sites were not moved or released by this batch.
