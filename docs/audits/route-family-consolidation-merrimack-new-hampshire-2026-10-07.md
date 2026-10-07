# Merrimack River, New Hampshire route-family audit

**Date:** 2026-10-07  
**Scope:** Merrimack River route pages and trip hub, overlapping endpoints, Search Console evidence, access restrictions, sitemap output.

## Evidence reviewed

- The overlap audit flagged 114 high-priority route-pair overlaps involving 19 Merrimack route slugs. The public hub contains 20 endpoint combinations: five source-backed, scored Franklin–Concord options and 15 lower-valley planning options.
- The July 5–October 4, 2026 Search Console Performance view filtered to `/rivers/merrimack-river-` showed zero clicks, impressions, and reported URLs. That path filter covers route-detail URLs, not the `/rivers/by-river/` hub, so it is not evidence that the hub has no search demand.
- The 100-row “Discovered—currently not indexed” sample included Merrimack Intervale–Sewalls Falls. The October 5 review found that URL returned 200, used a self-canonical, allowed indexing, appeared in the sitemap, and had internal hub/state links; Search Console reported no last-crawl date. The 450-row “Crawled—currently not indexed” sample had no Merrimack URLs. This points to low discovery priority or weak page value as a plausible issue, not a crawl block.
- How’s Your River documents the 24-mile Franklin–Concord run, names Franklin, Boscawen, Sewalls Falls, and Everett Arena access choices, and separates its 400 cfs runnable floor from its 1,500–2,000 cfs preferred range. USGS 01081500 is the direct station at Franklin Junction. Those figures belong to the documented upper run; they are not a verified threshold for the lower-valley trip cards.
- New Hampshire’s public boat-access regulations list Merrimack access sites in Boscawen and Concord. Bow’s current municipal page documents its River Road ramp. Allenstown’s 2024 Pelissier Boat Launch ordinance limits launch access to town residents with a current vehicle sticker.

## Page-family decision

Keep six standalone pages:

- The five source-backed Franklin–Concord trips, which retain the published route-specific flow guidance and their direct USGS gauge.
- The short 2.5-mile Sewalls Falls–Everett Arena trip, a distinct compact Concord option between two named landings.

Consolidate 14 overlapping lower-valley endpoint pages into their exact trip cards on the Merrimack hub. These are alternate pairings across the same Boscawen, Canterbury, Concord, Bow, and Hooksett access chain. The route records remain selectable with their own mileage, endpoints, access caveats, gauge context, and hazards; the consolidation removes duplicate landing pages while preserving trip choices.

The hub now explains the Franklin–Concord and lower-valley planning zones separately. Its trip cards expose each consolidated option’s access, gauge, and safety notes. The upper 400 cfs and 1,500–2,000 cfs guidance is limited to the named Franklin–Concord routes.

## Access correction

Three trip records previously called the Ferry Street endpoint a public launch. Allenstown’s ordinance says Pelissier Boat Launch is open to town residents with a current sticker. The endpoint name now signals the resident restriction, and route notes tell out-of-town paddlers to use another take-out. The ordinance is linked from the trip data and hub guide.

## Site changes

- Added 14 trip-card consolidation targets. Each old route URL selects the corresponding card on `/rivers/by-river/merrimack-river-new-hampshire/`.
- Added a Merrimack reach guide, route-specific title and description, gauge-scope explanation, and links to current local/state access rules and USGS data.
- Kept all 20 trip records and all six chosen standalone pages.
- No Search Console indexing request or sitemap submission was made.

## Verification

- `npm run build` passed, including type checks and route data audit. It built 2,763 pages and generated 549 total route-consolidation redirect pages.
- `npm run seo:indexability:audit` passed with `errors: []` and `warnings: []`. The full-site audit found no public route options without internal links and no duplicate route headings or descriptions.
- The built Merrimack hub has 20 trip anchors and 20 access/gauge/safety disclosures. All 14 consolidated URLs have generated destinations selecting their exact trip cards and are absent from the sitemap. All six retained route pages exist and remain in the sitemap.

## Source links

- [How’s Your River: Franklin to Concord](https://www.howsyourriver.com/runs/1-franklin-to-concord-merrimack-nh)
- [New Hampshire public boat-access rules](https://gc.nh.gov/rules/state_agencies/fis1600.html)
- [Town of Bow: Water Access](https://bownh.gov/668/Water-Access)
- [Town of Allenstown: Pelissier Boat Launch ordinance](https://www.allenstownnh.gov/DocumentCenter/View/482/pelissier_boat_launch_ordinance_approved_and_signed_march_2024)
- [USGS 01081500: Merrimack River at Franklin Junction](https://waterdata.usgs.gov/monitoring-location/USGS-01081500/)
- [Earlier Search Console route-page review](search-console-root-cause-followup-2026-10-05.md)
