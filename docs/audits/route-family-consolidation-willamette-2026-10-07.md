# Upper Willamette route-family review

Date: 2026-10-07

## Finding

The catalog has 50 start/end combinations from Alton Baker Park in Eugene through Harrisburg and Corvallis to Hyak Park. Most options reuse the same Willamette Water Trail access chain and differ by which of its launches or paddle-in sites become the start and finish. The route records contain distinct distances and access cautions, but the generated pages share a common template and much of the same trip-planning context.

The review found a separate water-level scoring issue. Willamette Kayak and Canoe Club's river descriptions list the 21-mile Alton Baker Park–Harrisburg reach, identify USGS 14166000 at Harrisburg, and give 2,000 cfs low, 6,000 cfs optimal, and 20,000 cfs high references for that reach. The catalog had copied this numeric profile to every route combination, including sections below Harrisburg that continue toward Corvallis. The Water Trail's Harrisburg–Peoria itinerary describes a 19.5-mile trip with strong current, wood, and changing channels but does not publish those numeric thresholds.

## Decision

Keep five source-backed routes as standalone pages:

- Alton Baker Park to Harrisburg Park
- Marshall Island to Harrisburg Park
- Harrisburg Park to Peoria Park
- Peoria Park to Crystal Lake
- Michael's Landing to Hyak Park

Consolidate the other 45 route URLs to their matching hub trip cards. Keep every one of the 50 choices selectable on the Willamette hub, with its individual endpoints, distance, access, camping and hazard information.

Keep live scores only for Alton Baker–Harrisburg and its two shorter subreaches, Alton Baker–Marshall Island and Marshall Island–Harrisburg. These three lie within the source's documented flow-guidance reach. The other 47 routes are planning-only. Each retains its nearest Harrisburg or Corvallis USGS gauge as river context, without borrowing the Alton Baker–Harrisburg numeric band. The Corvallis station supplies active discharge and stage data, but the reviewed sources do not establish a numeric recreational cutoff for the Corvallis trips.

The Willamette hub explains which trips have source-backed flow guidance, which are planning-only, and why their gauge readings should not be treated as a score. The corridor is registered as a condition family with no generalized continuous-route edges.

## Validation

- Source catalog: 50 Willamette choices; 3 scored and 47 planning-only after the threshold correction.
- Consolidation mapping: 45 old route URLs map to matching hub cards; five source-backed route pages remain standalone.
- Route corridor audit: 222 definitions, 735 covered routes.
- Route deprecation audit: 19 ledger rows, no premature archives.
- Candidate production-mode build: `.local/seo-candidate-2026-10-07g`, 3,086 generated pages.
- Built-page indexability audit: 3,074 sitemap URLs, 2,634 standalone route pages, and 174 active consolidated trip options across reviewed families. It checked 3,012 route links and found no orphaned routes, missing inlinks, duplicate standalone route headings or descriptions, errors, or warnings.
- Redirect spot-check: all 45 Willamette consolidated paths resolve to their catalog destination, and all 45 selected trip anchors exist in the built hub HTML. The current delivery uses generated exact redirect pages; see the [redirect delivery audit](route-consolidation-redirect-delivery-2026-10-07.md).
- Rendered hub check: the candidate explains the 50 combinations, identifies five standalone source-backed trips, and states that three trips have flow scores while the rest are planning-only.

These results verify the local candidate only. No production deployment, Search Console change, or indexing request was made.

Sources: [WKCC river descriptions for the Willamette](https://levels.wkcc.org/?D=wr1), [Willamette Water Trail map](https://willamettewatertrail.org/map/), [Marshall Island to Harrisburg itinerary](https://willamettewatertrail.org/itineraries/marshall-island-access-to-harrisburg/), [Harrisburg to Peoria itinerary](https://willamettewatertrail.org/itineraries/harrisburg-to-peoria/), [Peoria to Corvallis itinerary](https://willamettewatertrail.org/itineraries/peoria-to-corvallis/), [Michael's Landing to Hyak itinerary](https://willamettewatertrail.org/itineraries/michaels-landing-to-hyak-park/), [Oregon State Parks Willamette River Water Trail](https://stateparks.oregon.gov/index.cfm?do=park.profile&parkId=194), [USGS 14166000 at Harrisburg](https://waterdata.usgs.gov/monitoring-location/USGS-14166000/), and [USGS 14171600 at Corvallis](https://waterdata.usgs.gov/monitoring-location/USGS-14171600/).
