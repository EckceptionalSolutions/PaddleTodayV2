# Barren River route-family review — October 7, 2026

## Finding

The public catalog has 10 Lower Barren route choices. Five match individual KDFWR access-to-access mileage segments, while five use endpoint combinations across those segments. The family covers two different condition contexts: USGS 03313000 at Finney reports stage in feet for tailwater-to-Martinsville trips; USGS 03314500 at Bowling Green reports discharge in cfs for downstream trips. These gauge bands cannot be treated as one river-wide threshold.

KDFWR also limits the Beech Bend campground ramps to registered campers, a route-specific access constraint retained on the trip cards.

## Decision

Keep standalone pages for the five catalog trips matching KDFWR's individual mileage segments:

- Barren River VPA #3 to Martinsville Ford / Claypool Ramp
- Martinsville Ford / Claypool Ramp to Potter/Combs Ramp
- State Street Bridge Access to Beech Bend Campground Ramp
- Beech Bend Campground Ramp to James R. Hines Boat Landing Ramp
- James R. Hines Boat Landing Ramp to Lonnie White Boat Ramp

Consolidate these five composite route pages to their exact trip cards on `/rivers/by-river/barren-river/`:

- `barren-river-tailwater-martinsville`
- `barren-river-vpa-3-potter-combs`
- `barren-river-beech-bend-lonnie-white`
- `barren-river-state-street-james-r-hines`
- `barren-river-state-street-lonnie-white`

All 10 choices remain available in the hub selector with their own endpoints, mileage, gauge assignment, access conditions, and hazards. The hub now separates the Finney stage and Bowling Green discharge guidance and links to KDFWR's mileage and access source.

The legacy `/rivers/barren-river-tailwater-vpa-3` URL now redirects directly to the Tailwater–Martinsville trip card, avoiding a redirect through a consolidated-away standalone page.

## Sources

- Kentucky Department of Fish and Wildlife Resources, [Lower Barren River access mileages, gauge bands, and ramp notes](https://fw.ky.gov/Fish/Pages/Lower-Barren-River.aspx)
- Kentucky Department of Fish and Wildlife Resources, [Barren River Below the Dam float guidance](https://fw.ky.gov/Education/pages/barren-river-below-the-dam.aspx)
- USGS, [Barren River near Finney](https://waterdata.usgs.gov/monitoring-location/USGS-03313000/)
- USGS, [Barren River at Bowling Green](https://waterdata.usgs.gov/monitoring-location/USGS-03314500/)

No sitemap submission or URL Inspection indexing request was made. CI and production verification are pending.
