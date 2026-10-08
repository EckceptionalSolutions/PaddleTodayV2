# Turkey River route-family review — October 8, 2026

## Finding

Two low-performing, crawled-but-not-indexed section pages describe consecutive legs of the same Elkader–Garber corridor: Elkader–Motor Mill and Motor Mill–Garber. Both remain available as separate route choices on the Turkey River hub, where the route-specific access details, gauge guidance, cautions, and sources are retained. Their standalone URLs now select the corresponding hub cards.

The full Elkader–Garber corridor remains a standalone page. It has recorded search clicks and is a meaningful longer trip with its own route identity. Big Spring–Elkader also remains a standalone page; Search Console reports that it is indexed and it covers a distinct upstream section. Downstream Garber–Millville and Millville–Ferry Landing pages remain separate because they cover different reaches and take-outs, including the Turkey River's Mississippi confluence.

This is a narrow catalog cleanup based on observed indexing and performance, not an assumption that overlapping trips are interchangeable. Route-specific gauge rules remain distinct: the Elkader–Motor Mill card uses Elkader station 05412020, while Motor Mill–Garber uses Garber station 05412500 and its conservative, minimum-only recommendation. The Elkader–Garber corridor retains its own Garber-gauge guidance.

## Search Console

The July 6–October 5, 2026 Performance report showed 127 impressions and 3 clicks across the `/rivers/turkey-river-` route URLs (2.4% CTR, average position 11.8). Elkader–Motor Mill and Motor Mill–Garber had no clicks and were among the route URLs classified as “Crawled — currently not indexed.” URL inspection showed successful fetches, crawling and indexing allowed, self-canonical declarations, and referring pages. This points away from a robots, fetch, or canonical defect for these examples.

The Elkader–Garber corridor recorded one click from 42 impressions; Big Spring–Elkader is indexed. Those routes are retained. The performance totals are small and do not establish a cause for site-wide traffic changes.

## Source-backed route notes

- The Turkey River Water Trail identifies the consecutive Elkader–Motor Mill and Motor Mill–Garber sections, supporting the corridor relationship while preserving their separate endpoints.
- USGS station 05412020 is the Elkader gauge used for the Elkader–Motor Mill route. Station 05412500 is the Garber gauge used for Motor Mill–Garber and the longer Elkader–Garber corridor.
- The route cards remain separate so river conditions and safety guidance are not generalized across the full corridor. The hub's server-rendered trip cards retain each route's summary, put-in and take-out, gauge threshold, access and safety notes, evidence notes, and source links.

## Sources

- Turkey River Water Trail, [2025 guide](https://turkeyriver.org/wp-content/uploads/2025/05/TRWT-Guide_2025_Online.pdf)
- USGS, [Turkey River above French Hollow Creek at Elkader, station 05412020](https://waterdata.usgs.gov/monitoring-location/USGS-05412020/)
- USGS, [Turkey River at Garber, station 05412500](https://waterdata.usgs.gov/monitoring-location/USGS-05412500/)
- Search Console Page indexing, URL inspection, and Performance reports reviewed October 8, 2026.
