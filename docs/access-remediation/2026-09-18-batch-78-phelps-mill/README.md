# Batch 78: Phelps Mill Carry-in Access

## Decision

Keep the existing coordinate, `46.3821667, -95.8210176`. Minnesota DNR's Water Access Sites feature 2258 / WAS00559 publishes a GPS point at `46.3821666505, -95.8210176143`, effectively identical to the route coordinate. Its attributes identify an Otter Tail County site, a Carry-In launch, and a Natural surface. Minnesota DNR's water-trail guide names Phelps Mill County Park carry-in access and directs paddlers to portage across the park lawn and launch west of the parking area.

The county park page says there are no boat-launch facilities. That is consistent with the DNR GIS classification: this is a hand-carried natural landing, not a conventional trailer ramp. The coordinate is an official access-area marker, not a surveyed wet-toe measurement. Retain it and make the carry and landing constraints clear in the route details.

## Review steps

1. Froze the shared-coordinate candidate from the refreshed public suspicious queue before point-specific research. See `selection.json` and `audit-before-public-cache-only.json`.
2. Queried the current Minnesota DNR Water Access Sites GIS feature 2258 / WAS00559. It identifies Phelps Mill as a public Carry-In access with Natural surface, Otter Tail County administration, 50 car spaces, and river mile 84.6; its GPS geometry matches the stored point.
3. Checked Minnesota DNR's Otter Tail River map and recommended route. It lists Phelps Mill County Park carry-in access at river mile 85 and says to portage across the lawn and launch west of the parking area.
4. Cross-checked the current Otter Tail County park page. It confirms public park grounds and warns that there are no conventional boat-launch facilities. This changes how paddlers should reach the water, not the verified access site's identity or coordinate.
5. Added the route-scoped DNR access control, clarified both route records as carry-in access, and reran targeted and full audits. Targeted results are in `audit-after-west-lost-lake-targeted.json` and `audit-after-west-red-river-lake-targeted.json`.

## Outcome and follow-up

The point is verified as the public Phelps Mill carry-in access, and no coordinate move is justified. The audit's river-line offset remains 521 feet on the West Lost Lake route and 266 feet on the West Red River Lake route, while both occurrences are within 181 feet of mapped water and have complete hydrography coverage. With the official anchor, both route occurrences classify as review rather than suspicious. Use the marked carry across the lawn and confirm park construction or closure notices before visiting; do not assume trailer-ramp access.

The public suspicious count decreased from 47 to 46, and the full-inventory suspicious count decreased from 100 to 99. The public audit covers 2,750 routes / 6,058 endpoints: 2,046 okay, 3,891 review, 46 suspicious, and 75 unknown. The full inventory covers 2,998 routes / 6,641 endpoints: 2,210 okay, 4,195 review, 99 suspicious, 51 failures, and 86 unknown. Source issues remain 271 public and 314 inventory. The registry has 4,042 canonical entries, 1,201 repeated entries, no conflicts, and 1,226 authoritative access matches.

## Sources

- [Minnesota DNR Water Access Sites GIS layer](https://enterprise.gisdata.mn.gov/aghost/rest/services/us_mn_state_dnr/struc_water_access_sites/FeatureServer/0)
- [Minnesota DNR Phelps Mill access feature (WAS00559)](https://enterprise.gisdata.mn.gov/aghost/rest/services/us_mn_state_dnr/struc_water_access_sites/FeatureServer/0/query?where=objectid%3D2258&outFields=*&returnGeometry=true&outSR=4326&f=pjson)
- [Minnesota DNR Otter Tail River segments and maps](https://www.dnr.state.mn.us/state-water-trails/otter-tail-river/segments-maps.html)
- [Minnesota DNR Map 2: Phelps Mill to Breckenridge](https://files.dnr.state.mn.us/maps/canoe_routes/ottertail2.pdf)
- [Otter Tail County Phelps Mill County Park](https://www.co.otter-tail.mn.us/location/phelps-mill/)
