# Wells County Wabash River route-family review — 2026-10-07

## Decision

Keep the four useful Wells County itineraries and their different endpoints, but consolidate their four route articles into one Wabash River hub. Each former route URL selects its matching trip card on the hub. This reduces duplicate article pages without hiding meaningful choices about distance, launch, take-out, and shuttle.

The routes share one verified access chain and the same nearby Bluffton stage reference. Their routes overlap, but they are not interchangeable: the four choices span about 6 to 11.9 river miles and end at different public accesses.

## Source and page changes

- Wells County Trails lists public access at Linn Grove Park, Vera Cruz Paddlesports Launch, White Bridge Picnic Area, Crosby/Main Street Bridge, and Hale Street. It describes the successive legs as 5.3, 4.2, 2.1, and 0.3 miles. Rose Road downstream is listed as private.
- Northeast Indiana Water Trails documents Vera Cruz to Kehoe Park as a six-mile event route. The four selectable options are Linn Grove–White Bridge (9.5 mi), Vera Cruz–Kehoe Park (6 mi), Vera Cruz–Hale Street (6.6 mi), and Linn Grove–Hale Street (11.9 mi).
- Wells County Trails calls 1.5–3 feet the ideal kayaking height, warns that low water may require dragging and high water adds flow and debris, and says never to enter during Action or Flood Stage. USGS 03323000 at Bluffton is the gauge reference; its reading is presented with these local qualifications, not as a safety guarantee.
- The hub now explains the access chain and stage guidance, provides direct links to each trip choice, and expands route-specific access, gauge, and safety notes in the trip cards.

## Search and indexability behavior

- The canonical `/rivers/by-river/wabash-river/` hub is self-canonical, indexable, and present in `sitemap-0.xml`.
- The four former route URLs are generated redirects to their corresponding hub trip cards and are absent from the sitemap.
- The individual itineraries remain available to users and internal search as selectable hub options; the route records and their route-specific notes remain intact.

## Verification

- `npm run build` passed. Astro built 2,735 pages and generated 579 route-consolidation redirects, four more than the preceding build.
- `npm run seo:indexability:audit` passed with zero errors and warnings. It checked 2,723 public pages, 2,801 route options, 2,663 route links, and 579 consolidated redirect pages; it found no route orphaning, missing hub/state inlinks, duplicate route H1s, or duplicate route descriptions.
- A built-output check confirmed the Wabash hub title, description, canonical and access section; all four trip cards are present; all four old URLs redirect to the matching card; and only the hub is in the sitemap.
- No automated tests were run.

## Sources

- [Wells County Trails kayaking access and stage guidance](https://www.wellscountytrails.org/kayaking)
- [Northeast Indiana Water Trails Wabash River Challenge](https://neiwatertrails.com/get-involved/event-calendar/wabash-river-challenge)
- [USGS 03323000 at Bluffton](https://waterdata.usgs.gov/monitoring-location/USGS-03323000/)
