# Lower American River route-family consolidation — 2026-10-07

## Decision

Treat the ten Lower American River records as one Parkway access chain, not ten separately indexed route articles. Keep all ten start/end pairs in the river hub trip selector and send each former route URL to its exact selected trip option. The records share the same reach, Fair Oaks gauge context, and core safety guidance; their meaningful differences are endpoint, distance, estimated time, and shuttle.

The downstream access order is Sailor Bar / Illinois, Upper Sunrise, Harrington, Watt Avenue, and Howe Avenue. The shortest cataloged examples are Sailor Bar–Upper Sunrise (about 2 miles) and Watt–Howe (about 1.4 miles); the longest is Sailor Bar–Howe (about 14.5 miles). The hub overview groups representative choices into short, middle, and longer floats while the selector retains every pair.

## Source and safety review

- [California State Parks boating facilities for the American River](https://dbw.parks.ca.gov/BoatingFacilities/Body-of-Water/American%20River) lists Sailor Bar / Illinois, Upper Sunrise, Harrington, Watt Avenue, and Howe Avenue as public launches.
- [California State Parks American River Parkway boating guide](https://dbw.parks.ca.gov/?page_id=29488) covers the Lower American Parkway reach, cold-water and snag hazards, scouting Suicide Bend, San Juan Rapids, and Arden Rapids, and the 150-foot Nimbus Dam exclusion.
- [Sacramento County Upper and Lower Sunrise guide](https://regionalparks.saccounty.gov/us/en/parks/american-river-parkway/sunrise-recreation-area--upper-and-lower.html) confirms the Upper Sunrise small-boat launch, sunrise-to-sunset hours, and parking fees. [Sailor Bar access details](https://regionalparks.saccounty.gov/us/en/parks/american-river-parkway/sailor-bar.html) document its popular launch and park hours.
- [USGS 11446500 at Fair Oaks](https://waterdata.usgs.gov/monitoring-location/USGS-11446500/) supplies the live gauge. The route records' 1,400–3,100 cfs comfortable band and 5,000 cfs maximum reference are community-derived planning cues, not official safety limits.

## Implementation

The hub adds a source-backed guide and trip-length examples. All ten route records remain unchanged as selectable options; all ten standalone route URLs are consolidated to the hub with the exact trip selected. The corridor registry and review ledger record the shared access chain and common condition context.

## Verification

Run route-data, corridor, deprecation, typecheck, and candidate-build indexability checks before deployment. Do not run the automated test suite for this data and presentation change.
