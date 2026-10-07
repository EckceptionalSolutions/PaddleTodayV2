# Millers River route family review — 2026-10-07

## Decision

Treat the Millers River catalog as a condition family with three distinct zones: the Athol–Orange impounded Blue Trail, the South Main Street Dam portage boundary, and the Lower Millers whitewater reaches. The catalog contains 22 endpoint records. Retain four source-distinct route pages, consolidate 17 overlapping endpoint combinations to the Millers River hub's matching trip cards, and withhold one route whose listed endpoints run upstream against the river.

All underlying trip options remain available on the hub. The Erving gauge's 600–2,000 cfs planning range remains attached only to the named Erving-to-Millers Falls Lower Millers run. The alternate endpoint combinations, Blue Trail, Reach 6, and long cross-zone itinerary receive no route-specific Paddle Today score or numeric flow band.

## Retained route pages

1. **Cass Meadow to Orange Riverfront Park** — six-mile Class I flatwater Blue Trail. Orange Riverfront Park is above South Main Street Dam. Use the Orange impoundment, launch status, water-quality information, and current notices to plan this reach. The Erving gauge is downstream and is not a route-level measurement.
2. **Cass Meadow to Arch Street** — long itinerary combining the Blue Trail, mandatory South Main Street Dam portage, and downstream whitewater. Retained as planning-only because one gauge cannot represent both condition zones.
3. **South Main Street Dam below-dam portage put-in to Arch Street** — source-listed Reach 6; planning-only because its source scope does not establish an Erving-gauge scoring band for this section.
4. **Erving Riverfront Park to Millers Falls** — source-documented 6.3-mile Lower Millers run. This is the only retained page with the current route-specific Erving flow range.

## Consolidated and withheld records

- 17 alternate endpoint combinations redirect to their corresponding selected trip option on the river hub. Route names, distance, access details, hazards, portages, and gauge context are preserved in trip details.
- `millers-river-erving-south-main-dam` is withheld from the trip selector. Its catalog starts at Erving and ends at Orange Riverfront Park, which reverses the river's downstream direction. Its retired URL points to the hub's reach guide without selecting that route.
- The 2025 Royalston-to-Athol launch adds a potential upstream route area, but this catalog does not yet contain a source-verified trip record for that new access. Do not infer endpoints from the launch announcement alone.

## Source review

- [Millers River Watershed Council Blue Trails](https://millerswatershed.org/blue-trails/) describes the six-mile Cass Meadow–Orange flatwater Blue Trail and says the Orange impoundment maintains its level.
- [Town of Erving Millers River access and safety](https://www.erving-ma.gov/210/Millers-River) distinguishes Lower Millers whitewater, describes Class II–IV hazards and Funnel, and identifies local access points and take-outs.
- [American Whitewater Erving to Millers Falls](https://www.americanwhitewater.org/content/River/view/river-detail/695/main) describes the 6.2-mile Lower Millers reach, class, Funnel, Erving gauge context, and alternate access points.
- [Massachusetts Paddler Millers River reaches](https://massachusettspaddler.com/millers-river-50-5-miles) identifies the South Main Street Dam to Arch Street Bridge section as Reach 6 in its reach inventory.
- [USGS 01166500 at Erving](https://waterdata.usgs.gov/monitoring-location/USGS-01166500/) locates the gauge in the downstream Erving section, below the Blue Trail and Arch Street endpoint.
- [Massachusetts 2025 Royalston–Athol access announcement](https://www.mass.gov/news/healey-driscoll-administration-celebrates-new-access-to-outdoor-recreation-on-the-millers-river) describes a new 6.6-mile upstream access stretch and its relationship to the downstream Blue Trail.

## Implementation checks

The hub identifies the distinct zones before the trip selector and links each zone to its source guide. Planning-only route pages say that no route-specific score or flow band is available. Trip details retain endpoint-specific access and hazard notes. The reversed route is held by the access review registry.

The candidate build generated 2,982 pages, a 2,970-URL sitemap, and 321 exact trip redirects. The indexability audit checked 2,908 internal route links and found no orphaned pages, duplicate route headings, duplicate route descriptions, warnings, or errors. Route-data, route corridor, route deprecation, and route TypeScript audits passed. No automated tests were run for this data and presentation change.
