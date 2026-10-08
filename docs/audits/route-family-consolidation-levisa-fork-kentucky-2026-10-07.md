# Levisa Fork route-family consolidation — Kentucky

## Decision

Keep all nine endpoint choices in the Levisa Fork trip selector, while keeping six standalone route pages for the clearest source-backed sections and consolidating three overlapping combinations into their exact trip cards on `/rivers/by-river/levisa-fork/`.

The Pikeville group retains Jubilee–Island Creek, Island Creek–Cedar Creek, Cedar Creek–Thompson Road, and the full 8.5-mile Jubilee–Thompson Road Hatfield–McCoy River Trail. The lower group retains the two directly listed sections, Prestonsburg–Airport and Airport–Levisa Fork Boat Ramp. The named full trail remains a standalone destination because KDFWR describes it as a distinct outing and describes its character, while the direct lower sections cover a separate part of the river.

Consolidate these route pages:

- `levisa-fork-jubilee-cedar-creek` — keep its KDFWR-listed 5.5-mile pairing selectable; the route page overlaps the Jubilee–Island and Island–Cedar sections.
- `levisa-fork-island-creek-thompson-road` — keep the exact endpoints selectable; it combines the Island–Cedar and Cedar–Thompson sections.
- `levisa-fork-prestonsburg-boat-ramp` — keep the 16.3-mile option selectable; it combines the official 8.2-mile Prestonsburg–Airport and 8.1-mile Airport–Boat Ramp sections.

## Reach and gauge review

The hub separates two gauge zones instead of applying one Levisa Fork range to every route:

- Pikeville and the Hatfield–McCoy Trail use USGS 03209500. KDFWR recommends 800–1,400 cfs or 7.4–8.5 ft at Pikeville.
- The downstream Prestonsburg-to-Paintsville chain uses USGS 03209800. KDFWR recommends 800–1,500 cfs or 3.5–5.0 ft at Prestonsburg.

These are local recommendations, not safety limits, and the ranges are not interchangeable. The hub also makes the Cedar Creek–Thompson Road mileage discrepancy explicit: KDFWR’s current fish page says 3.0 miles while its detailed trail map says 3.2 miles. Access reminders retain the source caveat to ask before using the Jubilee church lot and note that the Cedar Creek gravel approach can be difficult for first-time visitors.

Sources: [KDFWR Levisa Fork access mileages and gauge recommendations](https://fw.ky.gov/Fish/Pages/Levisa_Fork.aspx), [KDFWR Hatfield–McCoy River Trail guide](https://fw.ky.gov/Education/Pages/Levisa-Fork.aspx), [KDFWR detailed trail map](https://fw.ky.gov/Education/Documents/bluewatertraillevisafork.pdf), [USGS 03209500 at Pikeville](https://waterdata.usgs.gov/monitoring-location/USGS-03209500/), and [USGS 03209800 at Prestonsburg](https://waterdata.usgs.gov/monitoring-location/USGS-03209800/).

## Implementation

The three former route URLs target their matching trip cards. All nine endpoint pairs and their route-specific distances, access notes, and gauge assignments remain in the hub selector. The hub now organizes the choices into the Pikeville trail and lower Levisa reaches, with direct links to both gauge stations and KDFWR source guidance.

No route data was deleted, and no sitemap or URL indexing request was submitted.
