# Edisto River, South Carolina route-family review — 2026-10-08

## Search Console signal

For April 28–October 5, the Edisto URL-filtered Performance report showed 0 clicks and 0 impressions. URL Inspection for the 9.5-mile Mars Oldfield–Messervy itinerary showed “Discovered — currently not indexed,” listed the sitemap index, and had no crawl or referring page recorded. These signals support reducing redundant standalone pages; they do not show a sitemap failure.

The broader Page indexing report was last updated October 3. Among submitted URLs it showed about 728 indexed and 2.52K not indexed, including 2,171 discovered and 324 crawled pages. Production now serves a smaller sitemap after later route consolidations, so those totals are a lagging snapshot rather than a current count.

## Route review and decision

ERCK documents three consecutive named sections in this corridor: Mars Oldfield–Givhans Ferry (6.5 miles), Givhans Ferry–Messervy (3 miles), and Messervy–Good Hope (4 miles). It does not identify the 9.5-mile Mars Oldfield–Messervy or 13.5-mile Mars Oldfield–Good Hope itineraries as separate named trail sections.

Keep the 4-mile Messervy–Good Hope official section as a standalone route page. Keep the useful 9.5- and 13.5-mile composite trips selectable on the river hub, with their distances, durations, shuttles, hazards, and access guidance, but consolidate their standalone pages to their matching trip cards. Givhans-connected routes remain withheld from publication while the park access review is unresolved; the current park notice says the cabin-area river stairs remain closed.

## Implementation

Commit `f145f9a71` added `edisto-river-mars-oldfield-messervy` and `edisto-river-mars-oldfield-good-hope` to the route-page consolidation map. It also changed the shared route evidence so only named ERCK sections are described as distinct official sections; composite itineraries are labeled as combined routes.

## Production verification

Frontend workflow [37789707576](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37789707576), including tests, build, both search-indexability audits, and deployed-origin checks, succeeded. API workflow [37789707589](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37789707589) and Snapshot Worker workflow [37789707605](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37789707605) also succeeded.

Both consolidated URLs return HTTP 200 redirect pages with zero-second refresh targets and canonicals to the Edisto hub; each exact trip anchor is present. The live sitemap index and child sitemap return HTTP 200, the child contains 2,522 URLs, and neither consolidated route URL is listed. Search Console was inspected read-only; no indexing request, validation action, or sitemap submission was made.

## Sources reviewed

- ERCK, [Trail Sections](https://ercktrail.org/trail-sections-2/)
- ERCK, [Access Sites](https://ercktrail.org/access-sites-2/)
- South Carolina Parks, [Givhans Ferry State Park access notice](https://southcarolinaparks.com/givhans-ferry/things-to-do)
- SCDNR, [Edisto River Basin Boating Guide](https://www.dnr.sc.gov/water/river/pdf/edistoboatingguide.pdf)
- USGS, [Edisto River near Givhans, station 02175000](https://waterdata.usgs.gov/monitoring-location/USGS-02175000/)
- Search Console Performance and URL Inspection reports, read-only views accessed October 8, 2026.
