# www certificate renewal repair

Checked September 21, 2026, approximately 17:00 UTC.

## Current evidence

- Azure Static Web App: `PaddleToday`, resource group `paddletoday`.
- Apex binding: Ready; HTTPS homepage returns 200.
- `www.paddletoday.com`: Unhealthy, unknown error renewing custom domain.
- Public CNAME points directly to `jolly-river-0d74c2110.1.azurestaticapps.net`, the app's actual default hostname. No proxied Cloudflare address is returned for www.
- Public CAA lookup returned no restrictive CAA record at the apex or www resolution chain.
- TLS validation succeeds today. Served certificate serial `094CD7633D09F807928CE8705569663A`, issued April 1, expires October 1, 2026 at 23:59:59 UTC.
- HTTPS www `/about/` returns 301 to `https://paddletoday.com/about/`.
- Existing binding snapshot saved in `www-certificate-before-2026-09-21.json`.

## Attempt already performed

Reapplied the existing www binding using CNAME validation:

```powershell
az staticwebapp hostname set -n PaddleToday -g paddletoday --hostname www.paddletoday.com --validation-method cname-delegation --no-wait
```

Azure accepted the command, but subsequent checks still showed Unhealthy and the same certificate. This is not a completed renewal.

## Authorized repair: recreate only www binding

The user explicitly approved recreation. The existing www binding was deleted successfully and recreated at September 21, 17:04:01 UTC using CNAME validation. Azure progressed through RetrievingValidationToken, Validating, Adding, and Ready. During validation www temporarily served Azure's default certificate, causing hostname validation to fail as expected. The apex remained Ready/default and returned HTTP 200. DNS records and site deployment were unchanged by this repair.

## Successful verification, September 21 approximately 17:12 UTC

- Azure www binding: **Ready**, no error.
- Actual served certificate: TLS validation successful; issued September 21, 2026; expires **March 21, 2027 at 23:59:59 UTC**.
- New serial: `0DE5167D57E57751B8A8562E35E04211`.
- www root redirects 301 to apex root.
- www `/about/?certificate-check=1` redirects 301 to the same apex path and query string.
- Apex remains Ready/default and returns HTTP 200.
- Azure after-state saved in `www-certificate-after-2026-09-21.json`.

All acceptance criteria below passed. The current renewal failure is resolved. Future automatic renewal still depends on Azure and valid public DNS; the successful replacement does not establish the precise cause of the prior failed renewal.

Execute deletion and recreation sequentially, checking each result. Do not delete the apex binding.

```powershell
az staticwebapp hostname delete -n PaddleToday -g paddletoday --hostname www.paddletoday.com --yes
az staticwebapp hostname set -n PaddleToday -g paddletoday --hostname www.paddletoday.com --validation-method cname-delegation --no-wait
az staticwebapp hostname show -n PaddleToday -g paddletoday --hostname www.paddletoday.com
```

Before deletion, recheck the apex is Ready/default, DNS still points directly to the same app, and no conflicting operation is pending. If deletion fails, inspect before attempting recreation. If recreation remains validating, preserve the correct CNAME and inspect Azure status; do not repeatedly delete/re-add.

Acceptance criteria:

1. Azure www binding Ready without renewal error.
2. Actual www TLS handshake succeeds with a newly issued certificate and expiry later than October 1, 2026.
3. www root and representative path redirect 301 to corresponding apex URL.
4. Apex remains Ready and serves 200 on valid pages.

## Alternative: Azure support escalation without disrupting www

Subject: Static Web Apps managed certificate renewal stuck Unhealthy despite direct valid CNAME

Please investigate managed certificate renewal for `PaddleToday` in resource group `paddletoday`, hostname `www.paddletoday.com`. Certificate expiry is October 1, 2026, 23:59:59 UTC. Azure reports: “An unknown error has occurred while attempting to renew your custom domain. Please ensure your domain is directing traffic to the static web app, and check again later.”

Public DNS directly targets the app default hostname `jolly-river-0d74c2110.1.azurestaticapps.net`. No restrictive CAA was observed. HTTPS currently succeeds and redirects to the configured apex default hostname. Reapplying the existing binding with CNAME validation at approximately September 21, 17:00 UTC did not clear the error. Please inspect the underlying validation/issuance error and retrigger managed renewal without removing the live binding, if supported.

No support message has been sent.

References: [Azure custom-domain renewal requirements](https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain), [custom-domain create/update API](https://learn.microsoft.com/en-us/rest/api/appservice/static-sites/create-or-update-static-site-custom-domain?view=rest-appservice-2025-05-01). Community guidance also describes removing/re-adding stuck bindings, but it does not guarantee provisioning time.
