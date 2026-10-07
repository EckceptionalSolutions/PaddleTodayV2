# Spokane River, Washington route-family review — 2026-10-07

## Decision

Keep six focused, standalone pages that follow the Spokane River Water Trail's distinct sections:

- Harvard Road–Barker Road: 2 miles, Class I.
- Barker Road–Mirabeau: 4.5 miles, Class II.
- Mirabeau–Plante's Ferry: 1 mile, mostly flatwater.
- Plante's Ferry–Boulder Beach: 4.5 miles, mostly flatwater with Coyote Rock.
- TJ Meenach–Plese Flats: about 7 miles, expert-only Class III–IV.
- Plese Flats–Nine Mile Dam: 5 miles of flatwater, exiting on river left before the dam.

Consolidate 20 overlapping endpoint combinations to their exact trip cards on `/rivers/by-river/spokane-river-washington/`. Keep all 31 route records available to the site; 26 are public choices, while five Riverside State Park combinations remain withheld because the current water-entry point does not match the route access chain. The 20 redirects preserve the chosen route in the hub query string, and the hub retains each card's endpoints, distance, access notes, and hazards.

## Why the routes need separate treatment

The upper river, lower whitewater corridor, and Nine Mile pool are materially different trips. The Water Trail describes Harvard–Barker as Class I for less experienced paddlers, Barker–Mirabeau as Class II for more experienced paddlers, the Mirabeau and Plante's Ferry sections as mostly flatwater, and TJ Meenach–Plese as expert-only whitewater. The pool above Nine Mile Dam is flatwater affected by dam operations. A single river-wide score would hide these differences.

The hub now directs paddlers to the right section first. It explains that USGS 12419000 near Post Falls is direct telemetry for the short Harvard–Barker section but only upstream context for downstream reaches. A 2025 Spokane Aquifer Joint Board report documents an approximately one-mile dry reach between Barker and Sullivan Roads during late August; routes crossing that area are planning-only and do not receive a live flow score based on the upstream station. USGS 12422500 at Spokane is shown as lower-river context. The Plese–Nine Mile pool has no numeric flow threshold because the river gauges do not establish local impoundment levels.

The TJ Meenach–Plese trip and every longer itinerary that includes that reach are planning-only. The Water Trail identifies this approximately seven-mile section as Class III–IV and says it requires appropriate whitewater equipment and expertise. Its broad popular-flow figures are retained as source context, not turned into a go/no-go score. The hub also calls out the City rule prohibiting boating between the west lines of the Division Street and Monroe Street bridges.

## Search and indexability findings

- The July 5–October 4, 2026 Search Console performance view filtered to `/rivers/spokane-river-` showed zero clicks and zero impressions; the river hub also showed zero in that period. This does not identify a crawler block or establish that page consolidation alone will recover traffic.
- No site-level sitemap defect was found in this route family. The build includes all six focused guide URLs in the sitemap and omits the 20 consolidated destination URLs.
- The six guide pages have self-canonicals and `index, follow` robots directives. Their route H1s and descriptions are unique.
- Each consolidated URL has a generated immediate hub redirect with a canonical to the hub. The redirect page is absent from the sitemap.

## Route geometry limitation

The canonical geometry generator timed out while requesting hydrography data. The existing reviewed route traces were preserved, and the geometry coverage manifest was refreshed using the repository's existing-asset workflow. The two new section pages—Mirabeau–Plante's Ferry and Plante's Ferry–Boulder Beach—are explicitly listed as unmatched geometry; their pages remain indexable, but a canonical route line is not yet available for their maps. Add reviewed route traces when the hydrography source is reachable. No existing route-scoped geometry asset was discarded. Alternate endpoint-pair distances are labeled approximate planning estimates unless the Water Trail publishes the exact section distance.

## Verification

- `npm run build` passed. Astro built 2,745 pages and generated 569 route-consolidation redirects.
- The route-data audit counted 2,806 public-indexed route options. The canonical geometry audit passed with 2,772 matched routes and 34 explicitly unmatched routes.
- `npm run seo:indexability:audit` passed with no errors or warnings. It checked 2,733 pages and 2,673 route links; it found no orphaned public pages, missing hub/state inlinks, duplicate route headings, or duplicate route descriptions.
- A focused built-output check confirmed all six Spokane guide pages are indexable, self-canonical, and in `sitemap-0.xml`. It confirmed a consolidated Spokane URL selects its matching hub card and is not in the sitemap.
- No automated tests were run.

## Sources

- [Spokane River Water Trail: Stateline to Upriver Dam](https://www.spokaneriver.net/watertrail/paddling-stateline-to-upriver-dam/)
- [Spokane River Water Trail: Water Street to Plese Flats](https://www.spokaneriver.net/watertrail/paddling-water-street-to-plese-flats/)
- [Spokane River Water Trail: Plese Flats to Little Falls Dam](https://www.spokaneriver.net/watertrail/paddling-plese-flats-to-little-falls-dam/)
- [Spokane River Water Trail: access and launch list](https://www.spokaneriver.net/watertrail/launches/)
- [City of Spokane: Rules of the River](https://my.spokanecity.org/rulesoftheriver/)
- [USGS 12419000: Spokane River near Post Falls](https://waterdata.usgs.gov/monitoring-location/USGS-12419000/)
- [USGS 12422500: Spokane River at Spokane](https://waterdata.usgs.gov/monitoring-location/USGS-12422500/)
- [Spokane Aquifer Joint Board: 2025 Groundwater Flow Model Development report](https://www.spokaneaquifer.org/wp-content/uploads/2025/12/FINAL_GSI_TM_SAJB-Model-Development_20251212.pdf)
