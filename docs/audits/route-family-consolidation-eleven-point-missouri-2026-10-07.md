# Eleven Point River route-family review — 2026-10-07

## Decision

Consolidate the 19 public Eleven Point route articles into the existing river hub and keep all 19 endpoint choices available there. These trips use a shared public access corridor, but they cover different distances, access pairs, and water sections. Removing the separate articles reduces thin overlap pages while preserving trip selection and route-specific details.

Each former public route URL selects its matching card on the canonical Eleven Point hub. The hub now organizes route context around the upper river, the Greer Spring transition, and the lower corridor to Highway 142 / The Narrows.

## Source and content changes

- Missouri Department of Conservation describes about 17 miles from Thomasville to Greer Spring, a 5.5-mile Blue Ribbon Trout Area below Greer Spring to Turner Mill, and a 14-mile White Ribbon Trout Area from Turner Mill to Riverton. Its access guide names Thomasville, Cane Bluff, Greer, Turner Mill North and South, Whitten, Riverton, and Highway 142 / The Narrows.
- The Forest Service travel guide calls Greer-to-Whitten its most popular day float and describes the longer trip distances and access points. The hub links this guide and the current MDC access and reach information.
- Official Forest Service mileage sources disagree around Turner Mill: the North and South access pages place those landings 4.9 miles below Greer Crossing, while the Scenic River travel guide lists Greer to Turner Mill South as 7 miles. MDC's 5.5-mile management reach starts at Greer Spring. The hub explains these different reference points and advises paddlers to confirm the landing and plan time conservatively; it does not silently replace the route-record distances.
- The hub explains that USGS 07071500 near Bardley is downstream of Greer Spring and is only conservative same-river context for the smaller upper section. Route cards keep their individual mileage, access pair, and safety notes.
- The U.S. Fish and Wildlife Service overview warns that public entry onto private scenic-easement land is prohibited. The hub points users to that guidance and to Forest Service public-access and float-camp rules.

## Search and indexability behavior

- `/rivers/by-river/eleven-point-river/` is self-canonical, indexable, and included in the sitemap.
- All 19 former public route URLs redirect to their matching hub trip cards and are absent from the sitemap.
- All 19 trip choices remain on the hub with their route-specific access, mileage, gauge, and safety notes.

## Verification

- `npm run build` passed. Astro built 2,708 pages and generated 606 route-consolidation redirects, 19 more redirects and 19 fewer static pages than the preceding build.
- `npm run seo:indexability:audit` passed with zero errors and warnings. It checked 2,696 public pages, 2,801 public route options, 2,636 route links, and 606 consolidated redirect pages. It found no route orphans, missing state or river-hub inlinks, duplicate route H1s, or duplicate route descriptions.
- A built-output check confirmed the hub is in the sitemap, the 19 legacy route URLs are absent from it, every redirect selects a matching card anchor, and the page contains the river-section guide.
- No automated tests were run.

## Sources

- [Missouri Department of Conservation Eleven Point River prospects and access](https://mdc.mo.gov/fishing/fishing-prospects/areas/eleven-point-river)
- [Missouri Department of Conservation Eleven Point River special management rules](https://mdc.mo.gov/fishing/regulations/special-waterbody-regulations/eleven-point-river)
- [Mark Twain National Forest Eleven Point Scenic River travel guide](https://www.fs.usda.gov/Internet/FSE_DOCUMENTS/stelprdb5200703.pdf)
- [Forest Service Turner Mill North access](https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-north-river-access)
- [Forest Service Turner Mill South access](https://www.fs.usda.gov/r09/marktwain/recreation/turner-mill-south-river-access)
- [U.S. Fish and Wildlife Service Eleven Point River overview](https://www.fws.gov/rivers/river/eleven-point)
- [USGS 07071500 near Bardley](https://waterdata.usgs.gov/monitoring-location/USGS-07071500/)
