# Search indexability checks

After building the static site, run:

```sh
npm run build:app
cp staticwebapp.config.json dist/staticwebapp.config.json
node --import tsx scripts/audit-search-indexability.ts
```

The frontend workflow runs this audit on both the build and final deployment package. It checks the generated sitemap against actual HTML files, one self-referencing canonical per sitemap URL, indexable metadata, every published route/hub, internal route destinations, utility-page exclusions and the packaged Azure 404 configuration. Duplicate titles are reported as warnings. An optional first argument selects a different build directory; `SITE_URL` or `PUBLIC_SITE_URL` selects the expected canonical origin. The selected directory must contain `staticwebapp.config.json`.

The asset packager preserves routing configuration rather than introducing a homepage fallback. After deployment, `node scripts/search-serving-smoke.mjs` checks actual HTTP status and canonical behavior for valid pages, withheld paths, and a unique missing path. It uses unique query strings to avoid a previously cached response masking the new deployment. Old cached URLs may still need a targeted CDN purge.

The deployment workflow supplies `DEPLOYMENT_ORIGIN_HOST` to resolve the Azure Static Web App directly because public requests from its GitHub-hosted runner receive CDN 403 responses. This retains the public Host header, SNI and certificate verification; it does not relax CDN rules or disable TLS validation. Run the script without that variable to verify the public CDN path separately. An origin check alone does not establish public CDN availability.

Route and hub titles distinguish reach/location. Named Bartram itineraries retain their trail names even when they share endpoints. Route introductions use existing route-specific summaries. Evidence labels that are not HTTP(S) sources are not rendered as links.

Request-form prefill now uses URL fragments, so the server receives one utility URL rather than one query URL per route. Existing query links remain supported. The initial form mode is retained when a skip link changes the fragment. Request forms and other noindex utility pages are excluded from the sitemap; links on those pages remain followable.

Azure serves `/404.html` with status 404 for missing paths instead of rewriting them to the homepage. Deliberately unpublished or withheld routes remain unpublished. The audit classifies the sampled missing routes against the current catalog; it does not restore or redirect them without an equivalent replacement.

## Verification on September 20, 2026

- Isolated branch build: 3,219 generated pages; 3,213 sitemap URLs; 2,780 published routes; 3,153 unique route-link destinations checked; no errors or duplicate-title warnings.
- Negative check: an injected homepage canonical and noindex on a published route both cause the audit to fail; original build restored and clean audit rerun.
- Existing not-found tests: 12 passed.
- Browser: route title/summary, actual correction link, fragment prefills, old query prefills, noindex and canonical verified in the local build.
- Route and runtime TypeScript checks and route-data audit passed after removing an unsupported duplicate endpoint note. The same warning remains in access caveats and the route-access note.
- Canonical geometry audit passes after restoring the coordinate corrections that were missing from the prior geometry commit. The 2,780 published routes exactly reproduce the existing manifest fingerprint: `6f7ad4bfefc85718b59aaa3fe1b0afde3ddf2f3883798b24b2f3b98c85eadaf7`. All 2,767 reviewed route geometries and 48 state bundles remain unchanged.
- Corrections were isolated from the existing access-review work in the main workspace: existing coordinate fields and corresponding access labels, plus the small Paces Mill, Tolt, and Man access corrections. Unrelated route additions are excluded. No publication holds are removed.
- Regression tests now distinguish inventory routes from public routes: Poplar remains withheld for unverified launch access, and Tyler Bend–Gilbert remains withheld for its separate take-out issue. Syas assertions reflect the reviewed NGPC shore launch while preserving the historical centroid-rejection checks.

Final validation after restoring the missing coordinates: full typecheck, route-data and geometry audits, scoring sensitivity, all 1,416 root/workspace tests, production build, and the search indexability audit pass. The build still contains 3,219 pages and the sitemap contains 3,213 URLs, with no audit errors or warnings.

These checks prevent technical indexing regressions. They do not guarantee indexing, ranking or recovery from an algorithmic update.

After integrating the current main branch's asset-hosting workflow, all 1,428 tests pass. The production build with versioned asset URLs, search audit, and frontend packaging also pass. The search audit runs only when the workflow builds the site, preserving the asset-verification-only mode.
