# Willimantic route-family consolidation pilot — October 6, 2026

## Decision

Consolidate the 34 Willimantic endpoint-combination pages into the existing Willimantic River hub at `/rivers/by-river/willimantic-river-connecticut/`. Keep all 34 mapped trip records, condition scores, access notes, distances, and safety guidance available as selectable trip options on the hub. Permanently redirect each former route URL to its matching option anchor, and point state and hub links directly at those anchors.

This is a pilot for route families where many pages are combinations of the same access chain. It reduces the Willimantic indexable route pages from 34 to one while retaining all 34 route choices and their API records.

## Why these routes fit one family

The route catalog contains 34 public Willimantic trips from nine access points. The combinations overlap on a single, ordered water-trail chain. The source guide and Connecticut Trail Finder describe three materially different stretches: upper quickwater, flatwater at the Eagleville Lake impoundment, and lower river below the dam. Crossing the dam boundary requires a land portage. The Willimantic source guide also distinguishes Route 66 as an earlier take-out from Air Line Trail, the last public landing before dangerous falls and current.

This justifies one guide with trip choices, but not one averaged condition profile. The route options retain their own reach, gauge, threshold, difficulty, distance, bailout, and hazard details. The 34 route records remain in the application data and API; only their standalone HTML pages are retired.

## Search Console evidence

In the Web Performance report, filtering the Pages table to URLs containing `willimantic-river` returned zero clicks and zero impressions. The 16-month selector showed available chart dates of April 28–October 4, 2026. This suggests little observed search demand for the family in the available report, but it does not prove every URL was indexed or that the routes have no future query value.

## Source basis

- Connecticut Trail Finder: <https://www.cttrailfinder.com/trails/trail/willimantic-river-water-trail>
- The Last Green Valley, 2016 Willimantic River Water Trail guide: <https://thelastgreenvalley.org/wp-content/uploads/2024/08/PaddleGuide2016xweb.pdf>
- The Last Green Valley, Air Line Trail landing and downstream caution: <https://thelastgreenvalley.org/member-directory/willimantic-river-nrt-air-line-trail-landing-launch/>
- The official town-hosted water-trail guide describes the separate upstream and downstream Eagleville accesses and the preferred dam portage: <https://www.willingtonct.gov/DocumentCenter/View/299/Willimantic-River-Water-Trail-or-Paddle-Guide-PDF>

## Rollout details

- The Willimantic river hub now serves as the sole canonical HTML destination for this family and presents the 34 choices as anchored trip options.
- The route page generator omits the 34 retired standalone pages, which removes them from the generated sitemap.
- Azure Static Web Apps returns permanent redirects from each former route URL to the corresponding hub option.
- State and river-hub links point directly to the consolidated guide anchors.
- Route data and API trip endpoints remain available, including live route scoring and trip planning.

## Follow-up

After deployment, confirm the 34 old paths return a single 301 to the correct hub anchor, the hub returns 200 with self-canonical, and no retired route appears in the sitemap. Recheck route-family clicks and impressions in Search Console after Google has refreshed the URLs. Use this pilot to refine the review checklist before applying the same treatment to Black Creek, Lamoille, or other dense families.
