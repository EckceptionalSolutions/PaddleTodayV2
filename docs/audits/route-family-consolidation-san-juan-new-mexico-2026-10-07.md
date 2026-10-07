# New Mexico San Juan River route-family consolidation

Date: 2026-10-07

## Decision

The Navajo Dam-to-Farmington guide contains 11 endpoint choices across three paddling stretches. Five are source-documented adjacent access sections. Six longer trips join those sections and repeat much of their access, gauge, river, and safety content. Keep every trip selectable on the river hub, with its own endpoints, mileage, intermediate access, gauge reference, and route notes; consolidate the six composite standalone pages into their matching trip cards.

The hub groups the five standalone sections into the upper tailwater, the Vereda del Rio-to-Farmington reach, and the Farmington-to-Kirtland city access chain. These areas have different access details and gauge context, so the guide does not present them as one uniform day run.

## Consolidated composite options

These six routes continue to appear as trip options on `/rivers/by-river/san-juan-river-new-mexico/` and redirect to their exact selected cards:

- `san-juan-river-navajo-dam-vereda`
- `san-juan-river-navajo-dam-among-waters` — retained as a staged multi-day itinerary, not framed as a routine one-day trip
- `san-juan-river-blanco-among-waters`
- `san-juan-river-among-waters-lions-park`
- `san-juan-river-vereda-westland-park`
- `san-juan-river-vereda-lions-park`

## Standalone sections retained

- Navajo Dam–Blanco: regulated upper tailwater, cold water, release changes, and the launch carry.
- Blanco–Vereda del Rio: transition into the lower corridor, with diversion dams and submerged fences.
- Vereda del Rio–Among the Waters: the long lower-valley section and its Farmington-area hazards.
- Among the Waters–Westland Park: the City-listed 2.24-mile segment; Among the Waters is walk-in access.
- Westland Park–Kirtland Lions Park: the City-listed 5.5-mile segment; the map marks Lions Park as the end of navigable segments.

## Gauge, access, and safety context

- The upper reaches use direct USGS telemetry from station 09355500 near Archuleta; lower and Farmington options use station 09365000 at Farmington. The hub tells paddlers to check the station attached to their selected option.
- Southwest Paddler’s 300 cfs minimum and 500 cfs target are community planning cues, not safety limits. Reclamation’s 500–1,000 cfs weekly habitat base-flow objective for the critical habitat reach is not paddling guidance.
- Farmington’s signage identifies the named city accesses, the 2.24-mile and 5.5-mile segments, walk-in access at Among the Waters, hazards, changing difficulty with flow, and Lions Park as the end of navigable city segments.
- The route details retain cold-water precautions, release checks, diversion and fence portages, private and tribal land boundaries, and the limited bailout choices on longer trips.

## Evidence reviewed

- City of Farmington, [San Juan and Animas River access and hazard map](https://www.farmingtonnm.gov/DocumentCenter/View/27318/River-Signage-Penny-Lane).
- Southwest Paddler, [San Juan River New Mexico access and hazards](https://southwestpaddler.com/docs/sanjuannm2.html).
- New Mexico Tourism, [San Juan and Animas rivers](https://www.newmexico.org/things-to-do/outdoor-adventures/rafting-kayaking/san-juan-animas-rivers/).
- USGS, [09355500 near Archuleta](https://waterdata.usgs.gov/monitoring-location/USGS-09355500/) and [09365000 at Farmington](https://waterdata.usgs.gov/monitoring-location/USGS-09365000/).
- Bureau of Reclamation, [Navajo Dam release notices](https://www.usbr.gov/uc/wcao/water/rsvrs/notice/nav_rel.html) and [Navajo Reservoir operations](https://www.usbr.gov/uc/water/crsp/cs/nvd.html).
- New Mexico State Parks, [paddlesports safety guidance](https://www.emnrd.nm.gov/spd/activities/boating-2/paddle-sports/).

## Rollout verification

Verified in production after the October 7 deployment:

- The San Juan hub returns HTTP 200 and contains all 11 trip choices.
- Each of the six former composite URLs serves its generated redirect page with the exact selected hub-card target.
- All six consolidated URLs are absent from the current sitemap; the hub and five standalone sections remain listed.
- The sitemap index and child sitemap both return HTTP 200; the child contains 2,892 URLs.
- The old Big Eau Pleine hub URL returns HTTP 301 to `/rivers/big-eau-pleine-river-cherokee-march-rapids/`.
