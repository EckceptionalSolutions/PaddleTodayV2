# Blackfoot River route-family consolidation review

Reviewed October 7, 2026. This is a source and candidate-build review; production and Search Console were not changed.

## Findings and changes

- The catalog contains 36 endpoint pairs across the Blackfoot’s upper corridor, lower corridor, and mellow section below Johnsrud. The west-flowing river, named rapids, access rules, and section-specific flow guidance make the endpoint order and reach boundaries important.
- Keep five source-documented runs as standalone pages: Russell Gates–Roundup, Roundup–Johnsrud, Whitaker–Johnsrud, Scotty Brown–Johnsrud, and Johnsrud–Weigh Station. Consolidate the other 31 URLs to matching selectable trip cards on the Blackfoot hub. All 36 trip records remain available with their own endpoints, mileage, access, shuttle, camping, and hazard information.
- Limit numeric score bands to the five reaches Riverbeta documents. The four upper-corridor runs use its 1,050 cfs low guard, 1,500–6,000 cfs prime band, and 9,000 cfs high guard; Johnsrud–Weigh Station uses its distinct 350 / 500–5,000 / 7,500 cfs cues. These community indicators are planning references, not safety limits. The other 31 options are planning-only and show USGS 12340000 as same-river context without a route score.
- Corrected four route pairs whose old endpoint order ran against the Blackfoot’s westward flow: K. Ross Toole–Johnsrud becomes Johnsrud–K. Ross Toole; Angevine–Johnsrud becomes Johnsrud–Angevine; Marco Flats–Johnsrud becomes Johnsrud–Marco Flats; Russell Gates–Scotty Brown becomes Scotty Brown–Russell Gates. The last is five river miles based on FWP’s Scotty Brown mile 45 and Russell Gates mile 40 references. The old paths resolve to the corrected hub cards through generated exact redirect pages.
- The hub now introduces the five named sections and links Montana FWP’s current corridor, access/camping map, and closure guidance alongside Riverbeta’s reach-specific sources and the direct Bonner gauge. It explains that FWP prohibits camping in the Russell Gates–Johnsrud Recreation Corridor outside designated float-in sites that require advance reservation and permit.

## Candidate verification

- Candidate build: `.local/seo-candidate-2026-10-07k`; Astro built 3,024 static pages and its sitemap contains 3,012 URLs.
- Built-page indexability audit: 2,572 standalone route pages and 236 consolidated options across reviewed families; 2,950 route links checked; zero orphaned public pages, zero routes missing state-page or river-hub inlinks, unique route H1s and descriptions, and no audit errors or warnings.
- Focused Blackfoot check: 36 options, five standalone pages, 31 consolidated options, five scored and 31 planning-only. All consolidated route slugs, including the four legacy direction aliases, resolve to their selected Blackfoot hub cards. All five named sections and their exact Riverbeta threshold sources appear in the candidate. See the [redirect delivery audit](route-consolidation-redirect-delivery-2026-10-07.md) for the current build mechanism.
- `routes:audit:corridors` passed with 224 definitions and 811 covered routes. `routes:audit:deprecations` passed with 20 ledger rows and no premature archives.
- Full `npm run typecheck` remains blocked after route-data and runtime TypeScript checks by the generated canonical-geometry count: it records 2,814 public routes while the current catalog has 2,808. The route and runtime TypeScript phases completed before that mismatch. No tests were run.

## Sources

- [Montana FWP Blackfoot River recreation guide](https://fwp.mt.gov/activities/boating/blackfoot-river)
- [Montana FWP Blackfoot access and camping map](https://fwp.mt.gov/binaries/content/assets/fwp/activities/river-recreation/blackfoot-river-float-map.pdf)
- [Montana FWP current closures and restrictions](https://fwp.mt.gov/news/current-closures-restrictions)
- [FWP Scotty Brown Bridge site assessment](https://www.leg.mt.gov/content/publications/mepa/2007/fwp0323_2007002.pdf)
- [Riverbeta Blackfoot River sections](https://riverbeta.app/blackfoot-river)
- [Riverbeta Russell Gates–Roundup](https://riverbeta.app/blackfoot-river/blackfoot-russell-gates-to-roundup), [Roundup–Johnsrud](https://riverbeta.app/blackfoot-river/blackfoot-roundup-to-johnsrud), [Whitaker–Johnsrud](https://riverbeta.app/blackfoot-river/blackfoot-whitaker-to-johnsrud), [Scotty Brown–Johnsrud](https://riverbeta.app/blackfoot-river/blackfoot-scotty-brown-to-johnsrud), and [Johnsrud–Weigh Station](https://riverbeta.app/blackfoot-river/blackfoot-johnsrud-to-weigh-station)
- [USGS Blackfoot River near Bonner gauge, station 12340000](https://waterdata.usgs.gov/monitoring-location/USGS-12340000/)
