# Millers River route family review — 2026-10-07

## Decision

Treat the Millers River catalog as a condition family with three distinct zones: the Athol–Orange impounded Blue Trail, the South Main Street Dam portage boundary, and the Lower Millers whitewater reaches. The catalog contains 22 endpoint records. Retain four source-distinct route pages, consolidate 17 overlapping endpoint combinations to the Millers River hub's matching trip cards, and withhold one route whose listed endpoints run upstream against the river.

The original hub kept all 21 public trip options available. The October 8 curation removes the 17 overlapping composites from public selection and retains the four source-distinct trips. The Erving gauge's 600–2,000 cfs planning range remains attached only to the named Erving-to-Millers Falls Lower Millers run. The alternate endpoint combinations, Blue Trail, Reach 6, and long cross-zone itinerary receive no route-specific Paddle Today score or numeric flow band.

## Retained route pages

1. **Cass Meadow to Orange Riverfront Park** — six-mile Class I flatwater Blue Trail. Orange Riverfront Park is above South Main Street Dam. Use the Orange impoundment, launch status, water-quality information, and current notices to plan this reach. The Erving gauge is downstream and is not a route-level measurement.
2. **Cass Meadow to Arch Street** — long itinerary combining the Blue Trail, mandatory South Main Street Dam portage, and downstream whitewater. Retained as planning-only because one gauge cannot represent both condition zones.
3. **South Main Street Dam below-dam portage put-in to Arch Street** — source-listed Reach 6; planning-only because its source scope does not establish an Erving-gauge scoring band for this section.
4. **Erving Riverfront Park to Millers Falls** — source-documented 6.3-mile Lower Millers run. This is the only retained page with the current route-specific Erving flow range.

## Consolidated and withheld records

- The 17 alternate endpoint combinations previously redirected to matching trip cards. Their source records remain in the internal route inventory, but the public URLs now redirect directly to the hub root and the combinations are not shown as separate trips.
- `millers-river-erving-south-main-dam` is withheld from the trip selector. Its catalog starts at Erving and ends at Orange Riverfront Park, which reverses the river's downstream direction. Its retired URL points to the hub's reach guide without selecting that route.
- The 2025 Royalston-to-Athol launch adds a potential upstream route area, but this catalog does not yet contain a source-verified trip record for that new access. Do not infer endpoints from the launch announcement alone.

## Source review

- [Millers River Watershed Council Blue Trails](https://millerswatershed.org/blue-trails/) describes the six-mile Cass Meadow–Orange flatwater Blue Trail and says the Orange impoundment maintains its level.
- [Town of Erving Millers River access and safety](https://www.erving-ma.gov/210/Millers-River) distinguishes Lower Millers whitewater, describes Class II–IV hazards and Funnel, and identifies local access points and take-outs.
- [American Whitewater Erving to Millers Falls](https://www.americanwhitewater.org/content/River/view/river-detail/695/main) describes the 6.2-mile Lower Millers reach, class, Funnel, Erving gauge context, and alternate access points.
- [Massachusetts Paddler Millers River reaches](https://massachusettspaddler.com/millers-river-50-5-miles) identifies the South Main Street Dam to Arch Street Bridge section as Reach 6 in its reach inventory.
- [USGS 01166500 at Erving](https://waterdata.usgs.gov/monitoring-location/USGS-01166500/) locates the gauge in the downstream Erving section, below the Blue Trail and Arch Street endpoint.
- [Massachusetts 2025 Royalston–Athol access announcement](https://www.mass.gov/news/healey-driscoll-administration-celebrates-new-access-to-outdoor-recreation-on-the-millers-river) describes a new 6.6-mile upstream access stretch and its relationship to the downstream Blue Trail.

## Prior implementation checks, before the 2026-10-08 curation

The hub identifies the distinct zones before the trip selector and links each zone to its source guide. Planning-only route pages say that no route-specific score or flow band is available. The reversed route is held by the access review registry. The 17 alternate composites still appeared as trip cards at that time.

The candidate build generated 2,982 pages, a 2,970-URL sitemap, and 321 exact trip redirects. The indexability audit checked 2,908 internal route links and found no orphaned pages, duplicate route headings, duplicate route descriptions, warnings, or errors. Route-data, route corridor, route deprecation, and route TypeScript audits passed. No automated tests were run for this data and presentation change.

## Curation follow-up (2026-10-08)

- The public Millers River hub now offers four named trips: Cass Meadow–Orange, Cass Meadow–Arch Street, below-dam Reach 6 to Arch Street, and Erving–Millers Falls.
- The 17 alternate endpoint combinations are no longer distinct public trips. Their exact historical route URLs redirect to the Millers River hub root, avoiding anchors for cards that are no longer shown.
- The reversed Erving-to-dam record remains withheld, and the hub retains its guidance for the separate Blue Trail, required dam portage, and Lower Millers whitewater zones.
- All source records remain in the internal route inventory for maintenance and audits.

## Production verification (2026-10-08)

- Frontend workflow [37800689276](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37800689276) passed tests, build, both search-indexability audits, and deployed-origin checks. API workflow [37800689587](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37800689587) passed tests, build, deployment readiness, and smoke checks; Snapshot Worker [37800689263](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37800689263) succeeded.
- The live sitemap index and child sitemap return HTTP 200; the child lists 2,522 URLs, includes the Millers River hub, and excludes the sampled retired composite route.
- The sampled retired route serves a generated redirect page with a canonical link and visible link to the Millers River hub. The frontend indexability audit covers every consolidation mapping and confirms retired route pages stay outside the sitemap.
- No Search Console submission or indexing request was made; Google must recrawl the updated catalog.
