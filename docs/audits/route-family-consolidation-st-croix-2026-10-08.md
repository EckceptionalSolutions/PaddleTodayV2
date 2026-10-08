# St. Croix route-family review — 2026-10-08

## Search Console evidence

The Search Console Performance report filtered to St. Croix route pages covers July 6–October 5, 2026 (last updated about 25 hours before review). It reports 44 clicks, 862 impressions, 5.1% CTR, and average position 7.8 across 14 rows. The rows include the 12 current trip URLs, the river hub, and both host variants of Fox Landing–Highway 70.

| Route page | Clicks | Impressions | Decision |
| --- | ---: | ---: | --- |
| Sand Creek–Highway 70 | 12 | 173 | Keep: NPS Map 6 corridor and strongest indexed St. Croix route page |
| Highway 70–Sunrise | 1 | 55 | Keep: separate NPS Map 7 reach |
| Sunrise–Wild River | 4 | 143 | Keep: separate NPS Map 7 reach and useful access split |
| Norway Point–Fox | 2 | 84 | Keep: short rapid reach with a consequential main-channel/Kettle River Slough choice |
| Fox–Highway 70 | 4 | 65 | Consolidate to its exact St. Croix hub trip card; this is a nested start within Map 6 |

The report lists Fox–Highway 70 under `www.paddletoday.com` for its four clicks, plus one impression on the canonical host. The production `www` URL currently redirects to the canonical `paddletoday.com` host, so the separate report row is historical host reporting rather than a current duplicate-response issue.

## Route-page decision

The NPS identifies Map 6 as Sand Creek Landing to Highway 70. The catalog's Fox Landing–Highway 70 choice is 9.75 miles and shares its take-out and the downstream corridor with that 15-mile Map 6 trip. It has little standalone search demand compared with the Map 6 page. Consolidate its landing page into the exact Fox–Highway 70 option on the St. Croix hub.

This only removes the separate search landing page. The Fox–Highway 70 trip remains a selectable hub option with its original endpoint pair, 9.75-mile distance, 3 hr 15 min–4 hr 30 min estimate, shuttle notes, access caveats, wind and low-water cautions, and approximately 1,000 cfs minimum-only guidance. The retained Sand Creek–Highway 70 page covers the full Map 6 section and its optional Kettle River Slough decision.

Keep the other St. Croix route pages as separate guides. NPS maps 4–10 divide a long riverway into distinct landing sections, while the catalog also preserves route choices whose rapid features, access constraints, gauges, or trip lengths differ. In particular, Norway Point–Fox stays standalone because its short reach centers on the Class I–II rapid split and the Kettle River Slough option; that is a different planning decision from the broader Map 6 paddle.

## Source and implementation

- National Park Service, [St. Croix Riverway maps](https://www.nps.gov/sacn/planyourvisit/maps.htm), updated July 4, 2026; Map 6 is Sand Creek Landing to Highway 70.
- National Park Service, [Map 6 PDF](https://www.nps.gov/sacn/planyourvisit/upload/Section-6_St-Croix_Sand-Creek-Landing-to-Highway-70_2024_508.pdf); identifies the main-channel choice, the optional Class II Kettle River Slough, and that the Slough route misses Fox Landing.
- Wisconsin Trail Guide, [St. Croix River section III](https://milespaddled.com/st-croix-river-iii/); supports the Fox Landing–Highway 70 endpoints and conservative low-water floor.
- USGS, [St. Croix River near Danbury](https://waterdata.usgs.gov/monitoring-location/USGS-05333500/).

`st-croix-river-fox-highway-70` now resolves to `/rivers/by-river/st-croix-river/#trip-st-croix-river-fox-highway-70`. The public route option remains in the 12-choice family and retains its route record and detailed planning data.

## Deployment verification

The October 8 frontend, API, Snapshot Worker, and River Alerts workflows all succeeded. Production serves the old route URL with an immediate fallback link to the exact trip card; the St. Croix hub returns HTTP 200 and includes that card. The sitemap index resolves to the canonical sitemap index, and its current child sitemap returns HTTP 200 with 2,536 URLs. It includes the St. Croix hub and omits the consolidated standalone route page. No Search Console sitemap submission or indexing request was made.
