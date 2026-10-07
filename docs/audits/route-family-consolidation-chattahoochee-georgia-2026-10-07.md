# Chattahoochee River route-family review — Georgia — 2026-10-07

## Findings

- The river hub has 79 trip options: 76 in the Chattahoochee River National Recreation Area, plus separate Upper Chattahoochee, Powers Island–Paces Mill, and Columbus trips.
- Search Console’s performance report filtered to `chattahoochee-river-` showed 0 clicks and 0 impressions for the available Apr 28–Oct 4, 2026 window. That supports reducing the number of low-value standalone pages, but does not establish that duplicate content alone caused the wider traffic decline.
- The NPS flow-rate table tells paddlers to select a gauge using the trip’s put-in. The route generator instead selected the gauge from the take-out index. An audit of the 76 NRA options found 42 gauge mismatches for put-ins explicitly listed in the NPS table. Those records now use the NPS-mapped station and matching station label.
- The NPS table names five distinct gauges across the recreation area and warns that Buford Dam and Morgan Falls Dam releases can change flow rapidly. It recommends canoe and kayak trips below 4,000 cfs and says water-based activities are not recommended above 8,000 cfs. The hub now gives paddlers the put-in groups, direct station links, and release context before the trip picker.
- The NPS gauge table does not name Bowmans Island, Lower Pool Park, Chattahoochee Pointe, or Morgan Falls Park as put-ins. Those records retain their previous gauge references pending a separate source-backed mapping review. The hub calls out that limitation. The Powers Island–Paces Mill route retains its independent American Whitewater gauge and threshold rather than being overwritten with an NPS station.

## Route-page decision

Keep eight focused recreation-area guide pages:

- Lower Pool Park–Abbotts Bridge
- Abbotts Bridge–Medlock Bridge
- Medlock Bridge–Jones Bridge
- Medlock Bridge–Garrard Landing
- Island Ford–Don White Park
- Jones Bridge–Chattahoochee River Park
- Morgan Falls Park–Johnson Ferry
- Johnson Ferry–Powers Island

Consolidate the other 68 NRA standalone route pages to their matching selected trip cards on `/rivers/by-river/chattahoochee-river/`. Keep all 76 NRA trip choices on the hub. The Upper Chattahoochee, Powers Island–Paces Mill, and Columbus guides remain separate because they cover materially different paddling and condition contexts.

## Sources

- NPS, [River Flow Rate](https://home.nps.gov/chat/planyourvisit/river-flow-rate.htm): five put-in-to-USGS station groups, dam-release warnings, and craft-specific flow recommendations.
- NPS, [Float Times](https://www.nps.gov/chat/planyourvisit/floattimes.htm): seven named recreation-area floats and the Jones Bridge / Paces Mill take-out boundaries.
- NPS, [Boating](https://home.nps.gov/chat/planyourvisit/boating.htm): managed boating access points.

## Rollout verification

## Production verification

Commit `c2395a6a5ece9d34e6564f8e60277107cfe032e9` deployed successfully. Frontend workflow [37680424449](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37680424449), API workflow [37680425031](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37680425031), and Snapshot Worker workflow [37680424540](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37680424540) all passed.

Production checks confirmed the Chattahoochee hub returns HTTP 200 and contains all 79 trip-card links. Each of the 68 consolidated NRA route paths serves its exact hub selection, preserving the route query and fragment; all eight retained NRA guides and the three separate Upper Chattahoochee, Powers Island–Paces Mill, and Columbus guides remain. The sitemap index and child sitemap return HTTP 200; the child contains 2,819 URLs, includes the hub and all 11 retained guides, and excludes the 68 consolidated pages. The put-in gauge assignments were included in the deployed hub and route records.

Search Console settings remain unchanged; no sitemap submission or indexing request was made. These production checks confirm the release and catalog behavior, not a Google recrawl or ranking recovery.
