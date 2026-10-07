# Yellow Breeches Creek route-family consolidation — Pennsylvania — 2026-10-07

## Decision

Keep seven of the ten public route pages and consolidate three low-traffic composite pages into their matching cards on the Yellow Breeches hub. All ten start/end choices remain selectable. The hub now explains the B2–B6 access chain, county gauge guidance, current B6 finish advisory, and route-specific shuttle and access notes.

Keep all six pages that received clicks in Search Console. Keep Simpson Park–McCormick Park as a dedicated short-trip page even without clicks because it is the county-listed 1.1-mile adjacent leg. Consolidate only these overlapping combinations:

- Simpson Park–Lower Allen Community Park
- McCormick Park–Liberty Forge
- Lower Allen Community Park–Yellow Breeches Park

Each legacy URL selects the exact route card on `/rivers/by-river/yellow-breeches-creek/`. The other seven routes remain self-canonical guides and sitemap entries.

## Search Console evidence

The user-authorized Search Console page report was filtered to Yellow Breeches Creek route URLs for July 5–October 4, 2026. It showed 9 clicks, 210 impressions, 4.3% CTR, and average position 7.8. These six pages accounted for all nine clicks:

| Route | Clicks | Impressions |
| --- | ---: | ---: |
| McCormick Park–Lower Allen Community Park | 4 | 24 |
| Liberty Forge–Yellow Breeches Park | 1 | 59 |
| McCormick Park–Yellow Breeches Park | 1 | 36 |
| Lower Allen Community Park–Liberty Forge | 1 | 24 |
| Simpson Park–Yellow Breeches Park | 1 | 13 |
| Simpson Park–Liberty Forge | 1 | 9 |

The consolidated routes had no clicks: Simpson Park–Lower Allen Community Park had 5 impressions, Lower Allen Community Park–Yellow Breeches Park had 14, and McCormick Park–Liberty Forge had no impressions row in the report. This is a small sample; the consolidation is based on overlapping endpoints and lack of observed clicks, not a claim that the pages caused a ranking decline.

## Route structure and access

The county water-trail guide organizes the lower creek through access points B2–B6: Simpson Park, McCormick Park, Lower Allen Community Park, Liberty Forge, and Yellow Breeches Park. All ten pairwise downstream combinations remain in the picker. A new hub section groups the four adjacent legs, links the B6-finish options, and gives each trip its own access, gauge, shuttle, camping, and safety notes.

Cumberland County currently reports a large fallen tree and logjam between B6 and B7, posted July 23, 2024, and recommends taking out at B6. All options in this family finish at or above B6. Cumberland County recommends checking USGS 01571500 at Camp Hill and lists a 1.4–2.0 ft boating range, 6 ft action stage, and 7 ft flood stage. The hub presents that downstream station as context rather than a route-wide condition score.

The county’s version 3 guide is dated 2015. It says water-trail use is limited to daylight hours, lists camping only at Lower Allen Community Park by reservation, and describes Liberty Forge boating access at the Old Forge Road bridge with posted rules. The hub labels these as guide-based terms and links the current county advisories and interactive map for a final check.

## Distance-source reconciliation

The county guide lists Lower Allen–Liberty Forge (B4–B5) as 0.5 miles, while Paddle Today’s mapped creek trace estimates about 0.8 miles. Several longer trip labels previously added the county’s 0.5-mile segment without showing the difference. Route cards now show both estimates as ranges:

- Lower Allen–Liberty Forge: 0.5–0.8 mi
- McCormick–Liberty Forge: 4.1–4.4 mi
- Simpson Park–Liberty Forge: 5.2–5.5 mi
- Lower Allen–Yellow Breeches Park: 2.4–2.7 mi
- McCormick–Yellow Breeches Park: 6.0–6.3 mi
- Simpson Park–Yellow Breeches Park: 7.1–7.4 mi

The county’s other adjacent-leg mileages remain unchanged. The range makes the single B4–B5 discrepancy explicit instead of mixing county access spacing with the mapped trace in adjacent cards.

## Sitemap and indexability

- `/rivers/by-river/yellow-breeches-creek/` is self-canonical and present in the sitemap.
- The three consolidated route URLs select their matching hub cards and are absent from the sitemap.
- The seven retained route pages have self-canonicals and remain in the sitemap.
- All ten route cards have in-page anchors; none of the endpoint choices were removed.

## Verification

- `npm run build` passed: 2,685 static pages and 629 route-consolidation redirects.
- `npm run seo:indexability:audit` passed with zero errors and warnings. It checked 2,673 public pages, 2,801 public route options, 2,613 route links, and 629 consolidated redirect pages; it found no route orphans, missing state/hub inlinks, or duplicate route H1s/descriptions.
- A built-output check confirmed the hub canonical and sitemap entry, all three exact-card redirects outside the sitemap, the seven retained self-canonical pages in the sitemap, and all ten card anchors.
- No automated tests were run.

## Sources

- [Cumberland County Water Trails and current advisories](https://www.cumberlandcountypa.gov/4907/Cumberland-County-Water-Trails)
- [Cumberland County Yellow Breeches Creek Water Trail guide (version 3, 2015)](https://www.cumberlandcountypa.gov/DocumentCenter/View/23587/YellowBreechesGuide_2015Version)
- [Cumberland County Yellow Breeches interactive map](https://gis.ccpa.net/storymaps/yellowbreeches/)
- [USGS 01571500 near Camp Hill](https://waterdata.usgs.gov/monitoring-location/USGS-01571500/)
