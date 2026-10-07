# Lower Saluda River route-family review — 2026-10-07

## Decision

Replace six near-duplicate Lower Saluda trip options with one 3.5-mile upper-reach guide. The paddler chooses either Saluda Shoals Park or Hope Ferry Landing as the launch, then takes out at Gardendale. Both launch ramps lead into the same section and have the same downstream access and flow context.

Consolidate all six previous route URLs to the river hub. The two launch-specific URLs select the combined trip card; the cross-bank and I-26 combinations lead to the access notes. The river hub is intentionally generated even though this family now has only one route card.

## Source and route-data corrections

- SCDNR identifies Hope Ferry Landing and Saluda Shoals Park as the only public ramps for trailered boats. It describes Gardendale as a carry-in access 3.5 river miles below Hope Ferry and the upstream Saluda Shoals ramp.
- The existing Hope Ferry–Gardendale entry said 2.3 miles; update it to the SCDNR-published 3.5 miles.
- The Saluda Shoals–Hope Ferry entry represented two nearby ramps on opposite banks as a 0.35-mile trip. That is an access choice, not a useful separate route.
- Three options ended at the I-26 bridge without a verified public boat landing. SCDNR places the beginning of major rapids downstream of the bridge, so the hub describes I-26 as a hazard boundary and does not advertise it as a take-out.
- SCDNR’s current overview says daily flows may range from 400 to 20,000 cfs and warns that releases can change rapidly. This broad daily range is not a route-specific paddling target, so the trip remains planning-only and shows USGS 02168504 as context instead of a live score.

## Search and indexability findings

- The prior Search Console Performance view for July 5–October 4, 2026 showed zero clicks and impressions for both the Saluda route path and river hub. This is a lack of observed search demand in that window; it does not identify a Google crawl or sitemap failure.
- The current build includes the canonical `/rivers/by-river/saluda-river/` hub in the sitemap. None of the six consolidated route URLs is in the sitemap.
- All six prior route URLs have generated redirects to the combined trip card or its access explanation. The trip hub has `index, follow` and a self-canonical.
- The retained Saluda Shoals geometry trace is about 3.0 miles and the former Hope Ferry trace is about 2.72 miles, while SCDNR publishes the access-to-access distance as 3.5 miles. The traces pass the repository’s existing geometry-distance tolerance, but the map line remains an approximation and could be refined with more precise access anchors.

## Verification

- `npm run build` passed: 2,739 Astro pages built and 575 route-consolidation redirects generated. The route-data audit passed with 2,801 public-indexed options. Canonical geometry coverage passed at 2,767 matched of 2,801 routes; existing reviewed traces were retained.
- `npm run seo:indexability:audit` passed with no errors or warnings. It checked 2,727 public pages, found zero unlinked public pages, zero route options without inlinks, and no duplicate route H1s or descriptions.
- A focused built-output check confirmed the indexable self-canonical hub is in `sitemap-0.xml`, contains exactly one trip card with both launch choices, and all six previous URLs are redirects excluded from the sitemap.
- No automated tests were run.

## Sources

- [SCDNR Lower Saluda access and safety overview](https://www.dnr.sc.gov/water/river/scenic/saluda.html)
- [SCDNR Lower Saluda public-access map](https://www.dnr.sc.gov/water/river/pdf/LowerSaludaAccess.pdf)
- [USGS 02168504 below Lake Murray Dam](https://waterdata.usgs.gov/monitoring-location/USGS-02168504/)
