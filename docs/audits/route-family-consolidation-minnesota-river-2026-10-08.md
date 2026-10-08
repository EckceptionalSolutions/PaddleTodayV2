# Minnesota River route-family review — 2026-10-08

## Search Console signal

In the April 28–October 5 Search Console Performance view, the Belle Plaine–Carver route page had 20 impressions and no clicks. The larger Minnesota River cohort had 15 clicks and 560 impressions across 18 page rows. Search volume is only one input to consolidation; source-backed trip distinctions and paddler safety remain the deciding factors.

## Decision

Keep the 18.6-mile Belle Plaine–Carver trip selectable on the Minnesota River hub, and consolidate its standalone route page to that exact trip card. It is a longer continuation made from the Belle Plaine–Thompson Ferry and Thompson Ferry–Carver reaches, rather than a separately documented DNR day trip. The two shorter endpoint choices remain available, so paddlers can select the commitment that fits their day.

This change retires one standalone page while preserving the trip's individual endpoints, 18.6-mile distance, estimated duration, shuttle and access guidance, wind and high-water cautions, and Jordan gauge context. The downstream Thompson Ferry–Carver option retains its own direct-gauge classification. Other Minnesota River route pages are unchanged; the source-backed trips and the pages with clicks in the reviewed report remain standalone.

## Implementation

Added the Belle Plaine–Carver slug to the route-page consolidation map, targeting `#trip-minnesota-river-belle-plaine-carver` on `/rivers/by-river/minnesota-river/`. Route data and trip details stay in the planner catalog, while the route-page generator omits this URL from the sitemap and emits its generated redirect page.

## Production verification

Frontend workflow [37758822590](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37758822590), including tests, production build, both search-indexability audits, and deployed-origin checks, succeeded. API workflow [37758822611](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37758822611) and Snapshot Worker workflow [37758822614](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37758822614) also succeeded.

The live retired route returns HTTP 200 with a zero-second meta refresh and visible fallback link to the exact selected trip card. The Minnesota River hub returns HTTP 200 and contains the matching trip anchor, endpoints, and distance. The production sitemap index and child sitemap return HTTP 200; the child contains 2,537 URLs, includes the river hub, and excludes the retired Belle Plaine–Carver route page. Search Console was not changed; its indexing report predates this deployment.

## Sources reviewed

- Search Console Performance report for Minnesota River, April 28–October 5, 2026.
- Minnesota DNR, [Minnesota River Map 6](https://files.dnr.state.mn.us/maps/canoe_routes/minnesota6.pdf), and [segments and maps](https://www.dnr.state.mn.us/watertrails/minnesotariver/segments-maps.html).
- Minnesota route catalog entries for Belle Plaine–Thompson Ferry, Belle Plaine–Carver, and Thompson Ferry–Carver, including keyed hub trip details and access guidance.
