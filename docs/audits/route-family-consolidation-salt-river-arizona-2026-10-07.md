# Lower Salt River route-family consolidation — Arizona — 2026-10-07

## Decision

Keep four adjacent Lower Salt sections as standalone guides and consolidate the six longer overlapping endpoint combinations into their exact trip cards on the Lower Salt hub. All ten endpoint combinations remain available in the picker, with their own distance, access, shuttle, and safety details.

Retained guides:

- Water Users–Blue Point (2.5 mi)
- Blue Point–Goldfield (4.0 mi)
- Goldfield–Phon D. Sutton (2.4 mi)
- Phon D. Sutton–Granite Reef (3.1 mi)

Consolidated combinations:

- Water Users–Goldfield
- Water Users–Phon D. Sutton
- Water Users–Granite Reef
- Blue Point–Phon D. Sutton
- Blue Point–Granite Reef
- Goldfield–Granite Reef

Each retired route URL points to its matching card on `/rivers/by-river/salt-river-arizona/`. The source generator emits a zero-second meta refresh, canonical link to the hub, and a direct hub link for browsers that do not follow the refresh.

## Search Console evidence

The user-authorized Search Console reports for July 5–October 4, 2026 showed no clicks or impressions for the Lower Salt route URL pattern or the exact Lower Salt hub URL. There was no observed search traffic in that period to preserve, though this does not rule out future demand or traffic outside the selected range.

The consolidation is based on the ten combinations sharing five sequential endpoints across one 12-mile reach, and on the absence of observed traffic in the reviewed period. It is not evidence that these pages caused a ranking decline.

## Route structure and source corrections

The hub now presents four adjacent sections as the primary guides while retaining all ten choices in the trip picker. The route notes distinguish the popular upper corridor from the shallower lower reaches and the slower final approach to Granite Reef. Pebble Beach and Coon Bluff remain source-listed intermediate access points, but are not among the five endpoints currently modeled in the picker.

The HikeArizona contributor guide dates to 2016. It places Water Users at mile 0, Pebble Beach at about mile 2.0, Blue Point at about mile 2.5, Goldfield at mile 6.5, Coon Bluff at about mile 8.1, Phon D. Sutton at about mile 8.9, and Granite Reef at mile 12. It describes an early sharp Class II riffle, shallow alternate channels, heavy seasonal use in the upper seven miles, and slower current toward Granite Reef. Route labels now keep Pebble Beach distinct from Blue Point, and the short Water Users–Blue Point section no longer calls itself beginner-friendly.

The same source describes 500 cfs as a minimum and 1,000 cfs as desired, without defining an upper limit. The route score profile now uses a 500 cfs minimum-only model; the hub and route notes explain the limits of that community guidance and direct paddlers to live USGS telemetry and local conditions.

The previous Tonto National Forest map PDF returned 404, so the route links now use the Forest Service Interactive Visitor Map. The hub and route cards also link current Tonto alerts and pass information, and tell users to verify current parking, day-use, and closure rules instead of asserting that a pass is required for every shuttle.

## Sitemap and indexability

- `/rivers/by-river/salt-river-arizona/` is self-canonical and present in the sitemap.
- The six consolidated route URLs are omitted from the sitemap and their generated pages point to the matching hub cards.
- The four retained adjacent guides are self-canonical pages in the sitemap.
- All ten trip cards remain available on the hub with exact-card anchors.

## Verification

- `npm run build` passed: 2,679 Astro pages and 635 generated route-consolidation pages.
- `npm run seo:indexability:audit` passed: 2,667 public pages, 2,801 public route options, 2,607 checked route links, and 635 consolidated route pages; zero warnings, errors, or orphan routes.
- Built-output inspection confirmed the hub canonical and sitemap entry, all ten card anchors, four retained self-canonical route pages in the sitemap, and six consolidated URLs outside the sitemap targeting their exact hub cards.
- `git diff --check` passed.
- No automated tests were run.

## Sources

- [HikeArizona Lower Salt River access and flow guide](https://hikearizona.com/decoder.php?ZTN=20324) (contributor entry dated 2016-09-23)
- [USGS 09502000 below Stewart Mountain Dam](https://waterdata.usgs.gov/monitoring-location/USGS-09502000/)
- [US Forest Service Interactive Visitor Map](https://www.fs.usda.gov/ivm/)
- [Tonto National Forest alerts and closures](https://www.fs.usda.gov/r03/tonto/alerts)
- [Tonto National Forest passes and permits](https://www.fs.usda.gov/r03/tonto/passes)
- [Saguaro Lake Guest Ranch Lower Salt tubing and access](https://www.saguarolakeranch.com/tubing)
