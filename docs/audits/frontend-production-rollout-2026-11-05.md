# Frontend production migration — November 5, 2026

The Cloudflare canary at `paddletoday-frontend-canary.paddletoday-c8681e05.workers.dev` passed 19 remote HTTP checks at source `a395b700ccd97117cab84b65668db3a5345fe160`. A 100-request burst at concurrency 10 had zero failures, median 77 ms and p95 210 ms from one client. These timings are a short sample, not a capacity or global latency guarantee. Static responses retain canonical production URLs; the canary adds a noindex header.

The first publishing attempt authenticated but found an unregistered Workers account subdomain. The onboarding helper now preserves any existing subdomain, initializes only Cloudflare's explicit missing-subdomain response, and verifies readback. The second publish succeeded. No paid Workers plan was enabled.

Anonymous Firebase sign-up returned `ADMIN_ONLY_OPERATION`, so no temporary user was created. Remote tests cover missing/invalid-token rejection and private no-store responses, while proxy unit tests cover credential/cookie/body forwarding. An existing-account sign-in remains a separate end-to-end check; anonymous registration is not being enabled for this migration.

## Initial cutover and routine publishing

`cloudflare-frontend-cutover.yml` takes an exact source SHA already published on the canary. It repeats the canary checks, builds production assets without the canary indexing exclusion, and snapshots every DNS record and current Worker domain before changing routing. The initial state must match the existing Azure CNAMEs: apex proxied, www DNS-only, both targeting `jolly-river-0d74c2110.1.azurestaticapps.net`.

Production uses a separate `paddletoday-frontend` Worker and two Custom Domains. Pinned Wrangler 4.158.0 supports replacing conflicting CNAME records in its noninteractive custom-domain publisher; its installed implementation was inspected before selecting this path. No separate manual DNS deletion is performed. After publishing, both bindings must belong to this Worker and zone, all non-web DNS fingerprints must match, and both HTTPS hosts must serve the exact release marker. HTTP smoke and search-serving checks cover both hosts before cutover is accepted. The workflow automatically attempts Azure restoration after an initial publication or verification failure.

The existing frontend workflow retains Azure by default. After successful cutover, set repository variable `FRONTEND_HOSTING_PROVIDER=cloudflare`. Routine releases continue publishing deduplicated Blob assets, then deploy Workers Static Assets and verify both hosts. A preflight ownership guard prevents a routine deploy from claiming domains that were removed or reassigned. No hosting or DNS change occurs merely by merging this preparation.

Workers retains incoming query strings on static redirects. The search verifier ignores only its own cache-busting probe parameter when comparing destinations; canonical paths, fragments, and all other query parameters remain checked. Original page-level robots metadata remains intact, including deliberately nonindexable detail pages.

## Recovery and retirement requirements

Keep Azure Standard until production verification, routine Cloudflare publishing, deployment-availability verification, and recovery checks pass. The existing API stays on B1. Before retirement, record a safe recreation configuration for the Azure frontend and keep exact Cloudflare version IDs and source revisions.

For Azure recovery while that resource exists, dispatch the cutover workflow with `operation=rollback-azure` and `backup_run_id` from the initial cutover. Backup identity must match this repository's main-branch cutover workflow. Recovery verifies that the Azure origin still serves the frontend, checks both custom-domain owners before detaching either, restores only the two web CNAME records with their original proxy flags, and verifies non-web DNS preservation. Partial rollback is resumable. Restore the provider repository variable to `azure` before subsequent ordinary releases. DNS-only www clients may retain cached addresses until TTL expiry.

For recovery after Azure retirement, dispatch `operation=rollback-worker`, the verified Worker version UUID, and its matching `source_revision`. The operation checks production ownership, rolls back the Worker and its associated assets, and verifies the exact revision and HTTP behavior on both hosts. It does not move DNS back to a deleted Azure resource. A real Worker version recovery exercise remains required before retiring Azure.

Local validation: 54 focused hosting/proxy/capacity/publication tests passed, including DNS ownership, mail/TXT preservation, exact Azure baseline checks, and resumable rollback. Wrangler's local production runtime passed 19 HTTP checks and 16 search-serving cases, with production indexability preserved. Remote production evidence will be recorded after cutover.
