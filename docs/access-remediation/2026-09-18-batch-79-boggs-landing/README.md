# Batch 79: St. George / Boggs Landing Access Ramp

## Decision

Retain `39.18726, -96.42202`. Friends of the Kaw's current Kansas River access page identifies the St. George/Boggs Landing Access Ramp at river mile 137 and publishes that exact GPS coordinate. The listing describes a one-vehicle concrete ramp, parking, restrooms, lighting, and community-developed public access. The City of St. George independently lists Boggs Landing Boat Ramp, and the Kansas Department of Wildlife & Parks access guide lists St. George/Boggs Landing at river mile 137.

The coordinate is an official public ramp/access-area anchor, not a surveyed wet-toe coordinate. No coordinate move is justified. The flowline offset is explained by the ramp being an access facility near the river edge; retain the review label after adding authoritative evidence.

## Review steps

1. Froze the shared-coordinate candidate from the refreshed public suspicious queue before point-specific source review. See `selection.json` and `audit-before-public-cache-only.json`.
2. Checked the Friends of the Kaw access page. It gives the exact stored GPS, river mile 137, river-left position, ramp description, directions, parking, and amenities.
3. Cross-checked the City of St. George attractions page, which names Boggs Landing Boat Ramp, and the KDWP access-point guide, which lists St. George/Boggs Landing at river mile 137.
4. Added a route-scoped public access control for the shared point and reran both affected routes. Targeted results are in `audit-after-junction-city-targeted.json` and `audit-after-ogden-targeted.json`.

## Outcome and follow-up

Both route occurrences now match the authoritative public access-area control and classify as review rather than suspicious. The Junction City route still has one hydrography source issue because its NHD response is incomplete; this is separate from the access verification. The Ogden route has no source issue after refresh.

The public suspicious count decreased from 46 to 45, and the full-inventory suspicious count decreased from 99 to 98. The public audit covers 2,750 routes / 6,058 endpoints: 2,046 okay, 3,892 review, 45 suspicious, and 75 unknown. The full inventory covers 2,998 routes / 6,641 endpoints: 2,210 okay, 4,196 review, 98 suspicious, 51 failures, and 86 unknown. Source issues remain 271 public and 314 inventory. The registry has 4,042 canonical entries, 1,201 repeated entries, no conflicts, and 1,227 authoritative access matches.

## Sources

- [Friends of the Kaw St. George / Boggs Landing access ramp](https://kansasriver.org/river-access-map/river-mile-137-st-george-access-ramp/)
- [Friends of the Kaw Kansas River access map](https://kansasriver.org/river-access-map/)
- [City of St. George attractions](https://www.stgeorgeks.gov/attractions)
- [Kansas Department of Wildlife & Parks Kaw River access points](https://ksoutdoors.gov/content/download/23853/158141/version/1/file/Kaw%2BRiver%2BAccess%2BPoints.pdf)
