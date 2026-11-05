# Frontend hosting consolidation — November 5, 2026

The next goal is to remove approximately $8.88 per 30 days in Static Web Apps fees, then batch remaining history storage writes (approximately $2.27 per 30 days at recent capture frequency). Consumption API hosting remains an assessment: replacing B1 removes at most about $12.96 in gross monthly cost before replacement charges, and its observed 93% peak memory does not justify downsizing.

## Hosting decision and measured limits

App Service already serves a complete frontend, but moving the public site there would tie every page to API restarts. Keeping static pages separate preserves their availability. A fresh build produced 291,291,123 frontend bytes, above Static Web Apps Free's 250 MB limit, so a simple Free-tier migration is unsuitable.

The prepared alternative is Workers Static Assets with a fixed-origin `/api` proxy. The complete packaged site fits the conservative Workers Free gate: about 5,972 files, less than 2 MB for the largest file, against 20,000 files and 25 MB per file. Static-asset requests and storage are free; only API or other Worker invocations consume the Workers allowance. The existing zone recorded 6,514 total requests over the sampled previous 24 hours, below the 100,000/day Workers Free ceiling even before excluding static hits. This is a sample, not a growth forecast. No paid Cloudflare plan is enabled by this preparation.

Sources: [Workers asset billing](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/), [platform limits](https://developers.cloudflare.com/workers/platform/limits/), [asset routing](https://developers.cloudflare.com/workers/static-assets/binding/).

## Prepared safeguards

- `infra/cloudflare/wrangler.canary.json` publishes only `paddletoday-frontend-canary.<account-subdomain>.workers.dev`; it declares no production route or custom domain.
- Assets use filesystem HTML routing and the real 404 page. There is no SPA homepage fallback. Existing canonical redirects, fragments, trailing-slash aliases, mobile association MIME headers, and security headers are translated with strict validation. Legacy gallery/map URLs retain their existing Blob destinations.
- `/api` and `/api/*` always invoke the proxy, avoiding accidental static HTML responses for private APIs. The upstream is fixed to the current App Service; clients cannot select another destination.
- Authorization, cookies, origins, request bodies, methods, and response cookies are preserved. Mutations are not retried, redirects are not followed, and private/credentialed responses are marked `private, no-store`. Errors return one bounded public message without upstream diagnostics.
- A public source-revision marker and exact-revision check prevent accepting an old canary as publication proof. A remote smoke script checks static pages, 404s, redirects, mobile associations, API health, public snapshots, private-route rejection, OPTIONS, and HEAD.
- Existing Azure frontend deployments now check their configured SKU's package-size limit. The default remains Standard. Production routing and Azure resources are unchanged by the canary workflow.

## Access and rollout

The existing Cloudflare credential reads the zone, DNS, routes, scripts, and traffic, but the Workers account-subdomain request returned HTTP 403. The repository has no dedicated Workers publishing secret. No write was attempted with the analytics credential, and plugin discovery found no Cloudflare integration.

Configure GitHub Actions secret `CLOUDFLARE_WORKERS_API_TOKEN` using a separate scoped credential. Cloudflare's current role model requires Workers product-level Admin for initial creation of a new Worker; after setup, reduce it to Editor on the deployment Workers. Legacy Workers Scripts Edit labels map to Editor and should not be assumed sufficient for initial creation. Production routing additionally needs Zone Workers Routes Edit/Write and Zone Read. Initial DNS migration needs narrowly scoped DNS Read/Edit for `paddletoday.com`; remove DNS Edit from the routine publishing credential after cutover if it is granted there. Keep the analytics token separate. The nonsecret `CLOUDFLARE_ACCOUNT_ID` repository variable has been configured. See [current Workers roles and creation requirements](https://developers.cloudflare.com/workers/authorization/workers/).

After upload and remote verification, retain SWA while proving production DNS/TLS, both apex/www hosts, redirects, authenticated API behavior, mobile links, availability during an API restart, and rollback. `www` is currently DNS-only and must be included in the migration. Custom Domain creation conflicts with existing CNAMEs, so DNS changes require an ordered migration with saved records and a tested restoration path. Keep mail and verification records untouched. Retire the paid Azure frontend only after the replacement serves both hostnames and routine deployment is switched to the new provider.

## Local evidence

Eighteen focused unit tests passed. Wrangler's real local runtime then passed 19 end-to-end checks on the complete site and proxied production API, including fresh snapshots for 1,392 routes. A separate static-page load check completed 100 requests at concurrency 10 without errors; its timing is local evidence, not a production latency forecast. Local runtime testing caught an unsupported named-export shape before any Cloudflare deployment; the deployable entry now exports only its handler. Local generated packages and redacted evidence remain under `.local/frontend-hosting/`, `.local/frontend-capacity-review.json`, and `.local/frontend-canary-*.log`. A canary deploy is still required; no hosting fee reduction is claimed yet.
