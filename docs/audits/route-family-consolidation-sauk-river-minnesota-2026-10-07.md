# Sauk River route-family review — Minnesota — 2026-10-07

## Search Console evidence

For April 28–October 4, 2026, the Search Console performance report filtered to Sauk River showed 7 clicks, 297 impressions, 2.4% CTR, and average position 7.5. Four route pages accounted for all seven clicks:

| Route | Clicks | Impressions | Decision |
| --- | ---: | ---: | --- |
| Spring Hill–St. Martin | 2 | 47 | Keep: route near the St. Martin gauge and a search performer |
| Pineview Park–Heims Mill | 2 | 17 | Keep: short lower-river option that includes the mapped rapid finish |
| Miller Landing–Heims Mill | 2 | 6 | Keep: distinct lower-river option that includes the mapped rapid finish |
| Oak Township–Spring Hill | 1 | 16 | Keep: Minnesota DNR-recommended day trip and search performer |

The other visible rows had no clicks. This sample supports protecting these four route pages, while Search Console performance alone does not establish that a route deserves a separate page.

The same report also showed four older Sauk route URLs outside the current catalog. They had 23 combined impressions and no clicks. Live checks returned HTTP 404 for each:

| Historical URL | Impressions | Decision |
| --- | ---: | --- |
| St. Martin–Rockville | 12 | 301 to the Sauk River hub; this endpoint pair is no longer offered |
| Spring Hill–Frogtown | 6 | 301 to the Sauk River hub; this long option is not in the current catalog |
| St. Martin–Frogtown | 3 | 301 to the Sauk River hub; this endpoint pair is no longer offered |
| St. Martin–Eagle Park | 2 | 301 to the Sauk River hub; this endpoint pair is no longer offered |

## Route-page decision

The Sauk River hub contains 21 endpoint choices across Minnesota DNR Map 1 (Osakis Lake to County Road 14) and Map 2 (County Road 14 to the Mississippi). The DNR names three recommended day trips: Sauk Centre Dam–Mill Pond (16.6 mi), Oak Township–Spring Hill (10.8 mi), and Eagle Park–Miller Landing (8.6 mi). It also explicitly suggests extending Eagle–Miller by starting at Frogtown, a 14.2-mile option in the catalog.

Keep seven standalone guides:

- Sauk Centre Dam–Mill Pond — DNR-recommended Map 1 trip.
- Oak Township–Spring Hill — DNR-recommended Map 1 trip and a search performer.
- Eagle Park–Miller Landing — DNR-recommended Map 2 trip.
- Frogtown–Miller Landing — DNR-documented extension of the recommended Map 2 trip.
- Spring Hill–St. Martin — search performer near the St. Martin gauge.
- Miller Landing–Heims Mill — search performer that includes the final rapid reach.
- Pineview Park–Heims Mill — search performer that includes the final rapid reach.

Consolidate these 14 overlapping endpoint combinations to their matching selection on the Sauk River hub:

- Eagle Park–Heims Mill
- Eagle Park–Knights of Columbus Park
- Frogtown–Eagle Park
- Frogtown–Heims Mill
- Frogtown–Knights of Columbus Park
- Frogtown–Rockville County Park
- Horseshoe Lake–Lions Park
- Knights of Columbus Park–Heims Mill
- Mill Pond–Oak Township
- Miller Landing–Knights of Columbus Park
- Richmond–Horseshoe Lake
- Rockville County Park–Heims Mill
- Rockville County Park–Knights of Columbus Park
- Rockville County Park–Miller Landing

All 21 choices retain their route-specific mileage, access, gauge context, and hazard details on the hub. This reduces the number of overlapping standalone pages without removing route choices. The seven pages retained as standalone guides protect DNR-named trips and all four pages with clicks in this Search Console window.

## Source and condition context

The DNR's Map 1 describes low water above Guernsey Lake and the Chain of Lakes around Richmond. Map 2 says Eagle–Miller is not recommended in late summer when water is low, notes thick vegetation, and describes nearly continuous Class I–II rapids in the final 2.5 river miles when there is enough water. Routes ending at Heims Mill include that lower finish; Miller Landing and Knights of Columbus Park are upstream take-outs.

The hub distinguishes those reaches and links the DNR's current segment page, both official maps, and the Sauk River gauge near St. Martin. The gauge is described as context for nearby stretches; it is not presented as a river-wide condition or safety rating. Route cards continue to show the selected trip's own gauge source and planning caveats.

## Implementation and candidate verification

Fourteen current route URLs now resolve to their exact Sauk hub trip cards and are omitted from the sitemap. Four older route URLs return a server-side 301 to the hub instead of 404. Seven retained route pages continue to have self-canonicals and sitemap entries. The hub includes all 21 trip choices and a source-linked section guide that links directly to all seven retained pages.

The production build and typecheck passed. The candidate has 2,797 sitemap URLs, 2,807 public route options, 2,357 standalone published route pages, and 450 consolidated route options across the catalog. Its indexability audit checked 2,736 route links and found no orphaned public pages, missing state or hub links, duplicate route H1s or descriptions, errors, or warnings. A Sauk-specific check confirmed all 21 hub cards, all seven retained guides in the sitemap with self-canonicals and hub links, and all 14 exact selected-card fallback targets outside the sitemap. Search Console settings remain unchanged; no sitemap submission or URL Inspection indexing request was made. Production release verification is pending.

## Sources

- Minnesota DNR, [Sauk River segments and maps](https://www.dnr.state.mn.us/state-water-trails/sauk-river/segments-maps.html)
- Minnesota DNR, [Map 1 — Osakis Lake to County Road 14](https://files.dnr.state.mn.us/maps/canoe_routes/sauk1.pdf)
- Minnesota DNR, [Map 2 — County Road 14 to the Mississippi River](https://files.dnr.state.mn.us/maps/canoe_routes/sauk2.pdf)
- Minnesota DNR, [Sauk River near St. Martin gauge](https://www.dnr.state.mn.us/waters/csg/site.html?id=16051001)
