# Willimantic route-family consolidation pilot — October 6, 2026

## Decision

Consolidate the 34 Willimantic endpoint-combination pages into the existing Willimantic River hub at `/rivers/by-river/willimantic-river-connecticut/`. The initial pilot retained all 34 mapped trip records as hub choices. A follow-up catalog-curation change reduced that set to five distinct trip options; see **Curated catalog follow-up** below. The five retained trips preserve different water-trail stretches, access situations, gauge references, and hazards rather than treating their conditions as interchangeable.

This is a pilot for route families where many pages are combinations of the same access chain. The final public catalog has one Willimantic hub and five selected trip options, rather than 34 standalone route pages and 34 near-combinatorial choices.

## Why these routes fit one family

At the initial review, the route catalog contained 34 public Willimantic trips from nine access points. The combinations overlapped on a single, ordered water-trail chain. The source guide and Connecticut Trail Finder describe three materially different stretches: upper quickwater, flatwater at the Eagleville Lake impoundment, and lower river below the dam. Crossing the dam boundary requires a land portage. The Willimantic source guide also distinguishes Route 66 as an earlier take-out from Air Line Trail, the last public landing before dangerous falls and current.

This justifies one guide with trip choices, but not one averaged condition profile. The retained route options keep their own reach, gauge, threshold, difficulty, distance, bailout, and hazard details. The original 34-combination set was subsequently curated to five active route records; historical slugs remain covered by redirects.

## Search Console evidence

In the Web Performance report, filtering the Pages table to URLs containing `willimantic-river` returned zero clicks and zero impressions. The 16-month selector showed available chart dates of April 28–October 4, 2026. This suggests little observed search demand for the family in the available report, but it does not prove every URL was indexed or that the routes have no future query value.

## Source basis

- Connecticut Trail Finder: <https://www.cttrailfinder.com/trails/trail/willimantic-river-water-trail>
- The Last Green Valley, 2016 Willimantic River Water Trail guide: <https://thelastgreenvalley.org/wp-content/uploads/2024/08/PaddleGuide2016xweb.pdf>
- The Last Green Valley, Air Line Trail landing and downstream caution: <https://thelastgreenvalley.org/member-directory/willimantic-river-nrt-air-line-trail-landing-launch/>
- The official town-hosted water-trail guide describes the separate upstream and downstream Eagleville accesses and the preferred dam portage: <https://www.willingtonct.gov/DocumentCenter/View/299/Willimantic-River-Water-Trail-or-Paddle-Guide-PDF>

## Rollout details

- The Willimantic river hub is the sole canonical HTML destination for this family and presents five selected trips with live route scoring and trip planning.
- All 34 historical route slugs are omitted as standalone pages from the sitemap. The five selected trip slugs redirect to their matching hub-card anchors; the other 29 route combinations redirect to the clean hub so paddlers can choose from the current catalog.
- State and river-hub links point to the current hub or selected-trip anchors.

## Curated catalog follow-up

Commit `d643d8feb` removed 29 endpoint-combination records from the active Willimantic route array and retained these five source-backed options: Route 32 to Nye-Holman, Heron Cove to Peck's Mill, River Park to Eagleville Lake, the downstream Eagleville Preserve portage access to Route 66, and the longer Route 32 to Route 66 itinerary. This preserves an upper quickwater option, a distinct Class II reach, the impoundment, a post-dam-portage reach, and one full-day route while removing many intermediate endpoint permutations.

On October 8, production confirmed the hub returns HTTP 200, the river-group API returns five routes with `snapshotStatus=fresh`, and the selected-trip interface displays five options rather than the original 34. All five selected legacy route paths return HTTP 301 to their matching hub anchors; a non-selected combination returns HTTP 301 to the clean hub. The live sitemap contains 2,542 URLs and none of the 34 historical route slugs. This is the current deployed structure; the initial rollout description of 34 selectable choices is superseded.

Search Console's URL Inspection report still labels the hub `Discovered - currently not indexed`, with the sitemap index listed as its discovery source, no referring page detected, and no recorded crawl. A live URL test on October 8 at 3:19 AM reported that the URL is available to Google: smartphone fetch successful, crawl allowed, indexing allowed, and user-declared canonical matches the hub URL. The hub also had zero clicks and impressions in the April 28–October 5 Performance window. This points away from a sitemap, robots, fetch, or canonical defect for this page; the live test does not guarantee Google will select it for indexing.

## Follow-up

Recheck route-family clicks and impressions in Search Console after Google has refreshed the URLs. Use this pilot to refine the review checklist before applying the same treatment to Black Creek, Lamoille, or other dense families.
