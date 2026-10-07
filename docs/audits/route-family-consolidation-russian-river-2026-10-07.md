# Russian River route-family consolidation review

Reviewed October 7, 2026. This is a source and candidate-build review; production and Search Console were not changed.

## Findings and changes

- The catalog has 37 endpoint combinations across upper, middle, and lower Russian River stretches. Their access conditions and useful gauge references differ, so the hub presents three planning zones rather than one uniform corridor.
- Keep six source-backed pages: Asti–Alexander, Alexander Valley–Healdsburg, Healdsburg–Wohler, Healdsburg–Mirabel, Steelhead–Sunset, and Healdsburg–Guerneville. Redirect the other 31 old route URLs to their exact selectable trip cards on the Russian River hub. The trip records remain available with their own endpoints, mileage, access, shuttle, and hazard notes.
- The six lower trips ending at Guerneville now use Dreamflows’ 500–2,500 cfs triggers for the Healdsburg-to-Guerneville reach at Hacienda Bridge (USGS 11467000). This replaces the previous internal 200 / 300–1,200 / 3,000 cfs thresholds. The trigger levels are community indicators, not safe operating limits.
- Four short/downstream pairs—Forestville–Steelhead, Steelhead–Sunset, Forestville–Sunset, and Healdsburg–Sunset—are planning-only because the California Creeks 300–1,500 cfs band is scoped to Healdsburg-to-near-Forestville. They retain the Healdsburg gauge as context without carrying that score range. Asti–Alexander and other upper combinations with mismatched flow references also remain planning-only.
- The hub separates Asti–Healdsburg, Healdsburg–Forestville, and Forestville–Guerneville, links to the relevant route guides, distinguishes the Healdsburg and Hacienda gauges, and points to Sonoma County access and current dam notices. Section headings use the hub’s level-three heading style.

## Candidate verification

- Candidate build: `.local/seo-candidate-2026-10-07i`; 3,055 static pages generated and 3,043 URLs in the sitemap.
- Built-page audit: 2,603 standalone route pages and 205 consolidated trip options across reviewed families; 2,981 route links checked; zero orphaned public pages, zero routes missing an inlink from a state page or river hub, no duplicate route H1s or descriptions, and no errors or warnings.
- Russian River checks: 37 options, six standalone pages, 31 consolidated options, 20 scored and 17 planning-only. All 31 consolidated paths resolve to valid selected trip cards on the hub; all six retained pages appear in the sitemap. The six Hacienda-gauge trips carry 500–2,500 cfs, and planning-only records have no numeric threshold. See the [redirect delivery audit](route-consolidation-redirect-delivery-2026-10-07.md) for the current build mechanism.

## Source discrepancy to resolve

The Healdsburg–Guerneville catalog trip is 19.5 miles. Dreamflows’ reach map lists a 16-mile guidebook trip, while an independent route listing gives 19 miles. These may use different launch or take-out points; confirm the exact endpoint pair against an authoritative route trace before changing the catalog distance.

Sources: [California Creeks Asti reach](https://www.cacreeks.com/russn-as.htm), [California Creeks Alexander–Healdsburg reach](https://www.cacreeks.com/russn-he.htm), [California Creeks Healdsburg reach](https://www.cacreeks.com/russn-hl.htm), [Dreamflows Healdsburg–Guerneville reach map](https://www.dreamflows.com/reachMap/index.php?num=1&rid=026), [Dreamflows trigger levels](https://www.dreamflows.com/triggerLevels.php), [USGS Healdsburg gauge](https://waterdata.usgs.gov/monitoring-location/USGS-11464000/), [USGS Hacienda Bridge gauge](https://waterdata.usgs.gov/monitoring-location/USGS-11467000/), [Sonoma County Wohler access](https://www.sonomacounty.com/outdoor-activities/wohler-bridge-fishing-access/), [Russian Riverkeeper kayaking guide](https://russianriverkeeper.org/resources/kayaking-on-the-russian-river/), and [Russian River Recreation & Park District dam notices](https://www.russianriverrecpark.org/vacation-beach-dam-information).
