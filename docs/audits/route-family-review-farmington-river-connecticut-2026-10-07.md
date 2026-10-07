# Farmington River route-family review — Connecticut — 2026-10-07

## Findings

The route family had six scored combinations. Three treated Lake McDonough as a downstream river take-out. The [MDC's current Lake McDonough rules](https://themdc.org/lake-mcdonough/) say canoe and kayak launching is allowed with a day-boat fee, but boaters may not exit along the shoreline except at the designated launch. The lake is a separate reservoir outing, not a take-out for a West Branch river run. Those three combinations were removed from the public route catalog; their old route URLs now redirect to the hub's reservoir-access note.

The stored Route 181/318 endpoint was `41.878549, -72.958845`, which the coordinate audit matches to the East Branch, far downstream of the named bridge. The current [FRCC recreation map](https://farmingtonriver.org/wp-content/uploads/2026/03/619c00c50fd8f88b63cc717e_FRCC_RecArea2.pdf) gives the Route 181/318 bridge access (FRCC AP8) as `41.9129, -72.986908`. The route data and traces now end at the adjacent West Branch water-edge point `41.913239, -72.987967`, about 266 feet from the map pin; the [Town of Riverton guide](https://www.rivertonct.com/product/canoeing-kayaking) places parking at the bridge on river left. The two affected route geometries were clipped to that bridge reach, instead of continuing several miles downstream onto another branch.

The stored Lake McDonough endpoint was `41.867099, -72.954567`, roughly 2.6 miles south of the FRCC map's Lake McDonough access point (`41.904718, -72.956449`). The old route traces therefore ended on the river, not at the named lake launch. The route set no longer presents those endpoints as river itineraries.

## Current route options

| Public trip option | Approx. traced distance | Notes |
| --- | ---: | --- |
| Route 20 Riverton to People’s State Forest | 3.0 mi | Short upper West Branch reach. |
| People’s State Forest to Route 181/318 bridge | 1.2 mi | Short moving-water reach; bridge landing is on river left. |
| Route 20 Riverton to Route 181/318 bridge | 4.1 mi | Combined run; People’s State Forest is retained as an intermediate access and possible early take-out. |

These mileages are rounded from the existing NHD route traces, clipped to the corrected AP8 water-edge location. The FRCC map's “8 miles” refers to the broader AP5–AP10 recreation-area section; it is not the distance for any of these individual Route 20–bridge options. The River hub now keeps all three choices together, while individual route pages are consolidated into the hub. The three retired Lake combinations redirect to the explanatory hub section, and are removed from the sitemap as route pages.

The targeted fresh NHD request timed out before writing a new trace. The two bridge routes use the existing NHD paths, clipped at the nearest water-edge vertex to the published AP8 location; no straight-line geometry was substituted. The final route geometry audit passed with 2,772 of 2,804 current route assets matched and all 48 state bundles present.

## Access-anchor follow-up

The official map pin for Route 20 AP6 is `41.96262, -73.01797`; the selected on-water entry point in route data remains `41.959027, -73.018056`, about 0.25 mile downstream. People’s State Forest's current map pin is about 500 feet east of the selected West Branch water-edge point. These offsets may reflect parking/area markers versus the actual carry-in edge, but the maps do not identify the exact carry path. The source guide confirms public access in both places; confirm the precise launch locations against current site signage or a manager map before making more exact access claims.

The FRCC map uses AP7 for People’s State Forest and AP8 for the Route 181/318 bridge. The older Town of Riverton page calls the same places AP9 and AP10 because it also numbers intermediate West River Road access points. The hub uses place names alongside numbers to prevent staging confusion.

## Indexing context

Search Console's `farmington-river` performance filter showed no clicks or impressions for April 28–October 4, 2026. That does not identify an indexing cause or prove that these edits will recover traffic. The route-family change reduces six similar pages to one source-backed hub with three selectable trips, and removes three invalid river combinations. No sitemap submission or URL inspection request was made.

The production-mode static build completed with 2,785 pages. The SEO indexability audit reported zero errors and warnings: the Farmington hub is in the sitemap, the three trip URLs and three retired lake URLs are not, and all six redirect pages point to the intended hub selection or access note. The three active trip cards are present on the hub.

## Sources

- FRCC, [Hartland to New Hartford access map](https://farmingtonriver.org/wp-content/uploads/2026/03/619c00c50fd8f88b63cc717e_FRCC_RecArea2.pdf) and [full access map](https://farmingtonriver.org/wp-content/uploads/2026/03/619c00ea775fd35dd36e0877_FRCC_RecFull.pdf)
- Town of Riverton, [Canoeing and kayaking guidance](https://www.rivertonct.com/product/canoeing-kayaking)
- MDC, [Lake McDonough launch rules and fees](https://themdc.org/lake-mcdonough/)
- Connecticut State Parks, [People’s State Forest boating access](https://ctparks.com/parks/peoples-state-forest)
- USGS, [West Branch Farmington River at Riverton](https://waterdata.usgs.gov/monitoring-location/USGS-01186000/)
