# Juniata legacy route URL repair — 2026-10-08

## Search Console evidence

The Performance report filtered to Juniata River pages covers July 6–October 5, 2026, and contains 33 URL rows: 25 clicks, 673 impressions, 3.7% CTR, and average position 7.0. The current public route catalog has four trip guides plus the river hub. Four older Juniata aliases already redirect to a current destination; the remaining 24 URLs returned HTTP 404 on production.

Those 24 404s account for 7 clicks and 403 impressions in the report. The clicks came from:

| Retired URL slug | Clicks | Impressions |
| --- | ---: | ---: |
| `juniata-river-walker-muskrat-springs` | 2 | 33 |
| `juniata-river-portstown-park-riverside-park` | 1 | 115 |
| `juniata-river-portstown-park-newton-hamilton` | 1 | 35 |
| `juniata-river-portstown-park-juniata-point` | 1 | 20 |
| `juniata-river-lewistown-narrows-walker` | 1 | 13 |
| `juniata-river-mt-union-newton-hamilton` | 1 | 7 |

The other 18 404s had no clicks and between 1 and 15 impressions each. Full set:

- `juniata-river-mifflintown-walker`
- `juniata-river-granville-lewistown-narrows`
- `juniata-river-riverside-park-newton-hamilton`
- `juniata-river-victory-park-lewistown-narrows`
- `juniata-river-riverside-park-mt-union`
- `juniata-river-newport-amity-hall`
- `juniata-river-green-valley-amity-hall`
- `juniata-river-newport-howe-township`
- `juniata-river-juniata-point-newton-hamilton`
- `juniata-river-granville-victory-park`
- `juniata-river-shawmut-newton-hamilton`
- `juniata-river-howe-township-amity-hall`
- `juniata-river-juniata-point-riverside-park`
- `juniata-river-lewistown-narrows-mifflin`
- `juniata-river-riverside-park-shawmut`
- `juniata-river-victory-park-mifflintown`
- `juniata-river-granville-mifflin`
- `juniata-river-juniata-point-mt-union`

The current guide inventory is Greenwood–Amity Hall, Millerstown–Amity Hall, Lewistown Narrows–Newport, and Mifflintown–Muskrat Springs. These historical endpoint combinations do not all map cleanly to one current guide's exact access pair. Sending them to one guessed guide could imply a different trip than the URL describes. The river hub preserves the context and lets a visitor choose among the four maintained trips.

## Change

Added 24 exact permanent redirects in `staticwebapp.config.json` from the retired route paths to `/rivers/by-river/juniata-river/`. Existing Juniata redirects are unchanged. These paths are historical aliases, not current route pages, so the redirect does not add them back to the sitemap or create thin replacement pages. The destination hub is already the canonical indexable Juniata landing page.

## Verification

Before deployment, each of the 24 paths was confirmed to return HTTP 404. Deployment run [37763987749](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37763987749) completed successfully. After deployment, all 27 Juniata-to-hub redirect rules (the 24 new repairs plus three existing aliases) returned HTTP 301 to the canonical hub in both slash forms (54 variants checked). The hub returns HTTP 200, and none of these retired paths appears in the live sitemap. No Search Console sitemap submission, validation, or URL indexing request was made.
