# Upper Delaware access-choice review — October 8, 2026

## Decision

Consolidate the standalone Hancock–Callicoon page to its exact trip card on the Upper Delaware hub. Keep the 27-mile option selectable with its endpoints, intermediate Lordville and Long Eddy access, NPS planning time, shuttle and multi-day cautions. The NPS distance table describes 27 miles and about 13.5 hours at its 2 mph planning speed; it is a long corridor choice rather than a separate named day trip.

Keep the Hancock–Lordville and Lordville–Long Eddy pages. They are shorter access-to-access day options with separate endpoint pairs. NPS lists them at about 9 and 6 miles, respectively. The Lordville–Long Eddy record previously showed 9.5 miles; it now matches NPS's 6-mile figure and approximately 3-hour planning time.

## Search Console and production evidence

For April 28–October 5, 2026, the inspected Hancock–Callicoon, Hancock–Lordville, Lordville–Long Eddy, and Delaware hub page filters each showed zero clicks and impressions. URL Inspection for Hancock–Callicoon reported “Discovered — currently not indexed,” with the sitemap index listed but no recorded referring page or prior crawl. Its October 8 live test said the URL was available to Google.

Before the change, the production Hancock–Callicoon page returned HTTP 200 with `index, follow` and a matching self-canonical. It appeared in the live child sitemap and had a direct link from the Delaware hub; the hub contained the exact trip-card anchor. This sample does not show a current fetch, canonical, sitemap, or internal-link defect.

## Sources

- NPS [Paddling Times & Distances](https://home.nps.gov/upde/planyourvisit/paddling-times.htm) lists the access-to-access distances and estimates times at 2 miles per hour. It cautions that times vary with river conditions, wind, paddler skill, and vessel.
- NPS [Public River Access Points](https://home.nps.gov/upde/planyourvisit/public-river-access-points.htm) says vessels may launch and retrieve only at designated public access ramps managed by NYSDEC or PFBC.
- NPS [River Safety](https://www.nps.gov/upde/planyourvisit/river-safety.htm) provides the route-family safety guidance.

No Search Console sitemap submission, URL indexing request, or validation request was made.

## Production verification (2026-10-08)

- Commit `4bbd619bf` deployed successfully. Frontend workflow [37804096626](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37804096626), API workflow [37804096699](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37804096699), and Snapshot Worker workflow [37804096596](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37804096596) all succeeded.
- The old Hancock–Callicoon URL now returns HTTP 301 to `/rivers/by-river/delaware-river/#trip-delaware-river-hancock-callicoon`. The Delaware hub returns HTTP 200 and contains the matching trip-card anchor and 27-mile option.
- Lordville–Long Eddy returns HTTP 200 with approximately 6 river miles and a 3-hour NPS planning time; the page shows the corrected Long Eddy river-mile location near mile 315.
- The sitemap index and child sitemap return HTTP 200. The child contains 2,521 URLs, includes the Delaware hub, and omits the retired Hancock–Callicoon standalone route.

Google Search Console was not submitted or asked to validate the change; Google must recrawl the updated sitemap and redirect.
