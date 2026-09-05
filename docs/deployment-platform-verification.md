# Azure deployment perimeter verification

Status: required platform-side release evidence

The application and deployment package are ready for verification, but these controls depend on the Azure subscription and are not provable from the repository alone. The platform owner should run the checks below against the production resource group and attach the redacted output to the deployment run record.

## App Service origin and TLS

1. Confirm the Static Web App, Front Door, or App Gateway is the only intended public ingress.
2. Confirm App Service access restrictions allow the intended ingress addresses/service tag and deny direct Internet access. Record the rule priority, action, and source service tag/IP range.
3. Confirm the production hostname has a valid certificate, TLS 1.2 or newer, and HTTP-to-HTTPS redirect. Record the certificate hostname and expiry without exporting private material.
4. Request `/api/health/ready` through the public origin and the direct App Service hostname. The direct request must be denied or otherwise inaccessible when the architecture requires a private origin.
5. Run `DEPLOYMENT_BASE_URL=https://paddletoday.com npm run deployment:smoke` and record the HSTS header (`max-age=31536000; includeSubDomains`) from the public response.

Useful read-only commands (fill in the named resource values):

```sh
az webapp config access-restriction show --resource-group <rg> --name <api-app>
az webapp config appsettings list --resource-group <rg> --name <api-app> --query "[?name=='WEBSITE_HTTPLOGGING_ENABLED']"
az webapp config ssl show --resource-group <rg> --name <api-app>
az webapp config ssl binding list --resource-group <rg> --name <api-app>
```

## Storage IAM and SAS scope

- The API and snapshot worker identities must have only the blob data permissions required for their containers and operations.
- SAS tokens must be short-lived, HTTPS-only, scoped to the required container/blob paths, and limited to the required permissions. Do not place account keys or unrestricted SAS tokens in application settings or logs.
- Record the role assignment principal, scope, expiry, protocol, permissions, and the container/path covered by each production credential. Redact token values.

Useful read-only commands:

```sh
az role assignment list --scope <storage-resource-id> --include-inherited --all
az storage container show-permission --account-name <account> --name <container> --auth-mode login
az storage account show --resource-group <rg> --name <account> --query "{httpsOnly:enableHttpsTrafficOnly,minTlsVersion:minTlsVersion,allowSharedKeyAccess:allowSharedKeyAccess}"
```

Record any exception with an owner, reason, expiry, and compensating control. Re-run this verification after changing ingress, identity, storage, or certificate configuration.

## Read-only evidence captured 2026-09-04

## Repeatable preflight

The repository includes a redacted, read-only preflight that checks the live
App Service restrictions, HTTPS posture, storage security settings, and custom
hostname status without printing app-setting values or SAS tokens:

```sh
npm run deployment:azure:verify
```

Override the resource names with `AZURE_RESOURCE_GROUP`, `AZURE_API_APP`,
`AZURE_STORAGE_ACCOUNT`, `AZURE_STATIC_WEB_APP`, and `AZURE_CUSTOM_HOSTNAME`
when verifying a different environment. The command exits non-zero while an
unrestricted SCM rule, shared-key storage access, public storage network access,
or unhealthy custom hostname remains. A linked App Service backend is reported
as an architectural exception because Static Web Apps requires public backend
reachability for this integration. The App Service `publicNetworkAccess` field
is informational until the ingress architecture changes.

The signed-in Azure subscription was queried without changing resources. The `paddletoday` resource group currently contains the Standard `PaddleToday` Static Web App, the running `paddletodayapi` Linux App Service, the `paddletoday-river-snapshots` Container Apps Job, and the `paddletoday` storage account. The Static Web App is linked to the App Service backend and has `paddletoday.com` ready; `www.paddletoday.com` is currently reported as **Unhealthy** by Azure and needs domain-renewal repair.

The App Service is HTTPS-only with TLS 1.2, FTPS-only, and remote debugging disabled. Its main and SCM access restrictions are currently **Allow all**, with public network access enabled. This does not satisfy the direct-origin restriction requirement. Do not add an allow rule until the actual Static Web Apps egress path is confirmed; a mistaken rule can take the public `/api/*` proxy offline. Azure documents service-tag and header-based restrictions for known front doors, which is the pattern to use when the ingress path is fronted by a supported gateway. ([Microsoft Learn: App Service access restrictions](https://learn.microsoft.com/en-us/azure/app-service/app-service-ip-restrictions))

The Static Web App currently has a linked App Service backend. Microsoft documents
that network-isolated backends are not supported for this bring-your-own API
integration, so the App Service origin cannot safely be changed to private or
deny-all while this topology remains in place. Full origin isolation requires a
different ingress architecture, such as a supported gateway/API-management
layer, or an application-level authentication boundary. ([Static Web Apps API overview](https://learn.microsoft.com/en-us/azure/static-web-apps/apis-overview))

The SCM endpoint is also currently open because the GitHub deployment workflow
uses an App Service publish profile through Kudu/SCM. Restrict SCM only after
moving deployment to an identity-based method (for example, GitHub OIDC through
Azure Resource Manager) or after defining a stable runner egress range; an
unplanned deny rule would stop releases.

The storage account reports HTTPS-only and TLS 1.2, but shared-key access and public network access are enabled. The storage-scope role query showed no storage-scoped Blob Data role for the deployment service principal; the App Service currently relies on container SAS settings. The configured container SAS grants `racwdl` permissions and expires in July 2027, so it is longer-lived and broader than the short-lived, least-privilege target in this runbook. Rotate those credentials through the platform secret process, then record the new expiry, protocol, permissions, and container scope without recording token values.

Do not disable shared-key or public network access while the API, scheduled
worker, and GitHub maintenance jobs still use direct container SAS URLs. First
give the App Service and worker managed identities container-scoped `Storage
Blob Data Contributor` access, add managed-identity storage support with a
temporary SAS fallback, migrate each job, and verify read/write/delete paths.
Then remove the fallback secrets and disable shared-key/public access in a
single rehearsed change window.

These observations are evidence for the release owner, not a declaration that the public site is currently broken. The remaining platform actions are to confirm the Static Web Apps egress/allow-list design, repair the unhealthy `www` domain, restrict the App Service and SCM origins, disable shared-key/public storage access where the workload permits, and replace the long-lived container SAS credentials.

## Verification update 2026-09-05

`npm run deployment:azure:verify` now records the live posture without exposing
app-setting values or credential query strings. It currently fails the expected
release checks for the unrestricted App Service and SCM rules, shared-key and
public storage access, and the `www.paddletoday.com` custom-domain status. It
passes App Service HTTPS-only, storage HTTPS-only, and TLS 1.2.

The static-site configuration now declares the required browser security headers,
including one-year HSTS, and `npm run deployment:smoke` verifies the HSTS
max-age and `includeSubDomains` directive after the next frontend deployment.
The current live site still serves a shorter HSTS lifetime until that deployment
is published.

The DNS lookup for `www.paddletoday.com` resolves to the Static Web App hostname,
and the public site responds successfully through Cloudflare. Re-running
`az staticwebapp hostname set` with CNAME validation did not clear Azure's
`Unhealthy` status, so the remaining domain action is to inspect the Cloudflare
proxy/SSL mode and Azure custom-domain renewal record with the DNS owner. The
Azure resource reports a certificate expiry of 2026-10-01, so repair or
re-provision the binding before that date. Do not delete and recreate the
hostname until the DNS and certificate impact is understood.
