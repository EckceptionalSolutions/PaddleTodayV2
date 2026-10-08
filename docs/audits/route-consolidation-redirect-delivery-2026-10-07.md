# Consolidated route redirect delivery

**Reviewed:** October 7, 2026
**Status:** deployed and production-verified on October 8, 2026

## Deployment constraint

The exact Azure Static Web Apps redirect table for the consolidated route families grew to 153,084 bytes. Azure documents a 20 KB maximum for `staticwebapp.config.json`, so that config could not be deployed. This was a blocker in the uncommitted candidate, not evidence of a production sitemap or crawling failure.

## Current candidate behavior

The build now emits one small HTML redirect page for each retired route URL. Each page sends visitors immediately to the exact hub trip option or access-notice section already selected for that route, includes a canonical link to its river hub, and provides a normal link as a fallback. These generated pages are not added to the sitemap. The remaining unrelated legacy aliases continue to use direct 301 rules in Azure configuration.

Google Search Central documents a zero-second meta refresh as a permanent redirect when a server-side redirect is unavailable. An HTTP 301 remains the preferred mechanism when the host can support it. Azure Static Web Apps does not support reusing a wildcard match in its redirect destination, and its config-size limit prevents keeping all per-route 301 destinations in this file.

## Candidate validation

- Candidate: `.local/seo-candidate-2026-10-07m`.
- Sitemap: 2,988 URLs; 2,548 standalone route pages.
- Redirect pages: all 303 slugs in the consolidation map are present and point to their exact configured destination.
- Internal-link audit: 2,926 route links checked; zero orphaned public pages or missing state/hub links.
- Duplicate route headings/descriptions: none. Audit errors and warnings: none.
- `staticwebapp.config.json`: 5,395 bytes, below the documented 20 KB cap.

The build workflow emits these redirect pages after Astro completes, then runs the normal indexability audit against the packaged output. At the time of this candidate review, production and Search Console were unchanged; production deployment status is recorded below.

## Production verification — October 8, 2026

The implementation was included in the frontend deployment for `9e46e68b1` (workflow run [37739264058](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37739264058)), which completed successfully. The built search-indexability audits and deployed-origin response check passed. Live GET checks returned `200` for the Winooski and Saco hubs and representative consolidated and access-review route URLs. These retired-route responses are the generated zero-second meta-refresh pages described above, with a visible fallback link; they are not HTTP `301` responses. No sitemap submission or Search Console validation request was made.

## References

- [Azure Static Web Apps configuration, route rules, and file-size limit](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration)
- [Google Search Central guidance on redirects and instant meta refresh](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
