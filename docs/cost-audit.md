# Paddle Today Cost Audit

Last reviewed: 2026-09-04

The figures below are planning estimates. They are not a bill or a forecast. The repository can verify deployment shape and snapshot capacity, but it does not have access to the Azure, GitHub, Expo, Maps, or email invoices needed to establish actual monthly spend.

| Name | Function | Cost estimate | Link |
| --- | --- | --- | --- |
| Domain name | Owns `paddletoday.com` and any related DNS records. | Usually about $10-$25/year, depending on registrar and TLD. | Registrar account |
| Azure Static Web Apps | Hosts the static Astro frontend. | Free tier may work only if backend-linking needs are removed; Standard is commonly about $9/month. | [Azure Static Web Apps pricing](https://azure.microsoft.com/en-us/pricing/details/app-service/static/) |
| Azure App Service | Runs the Node API backend for `/api/*`. | Depends on SKU; a small Linux production plan is commonly about $13-$75/month. | [Azure App Service pricing](https://azure.microsoft.com/en-us/pricing/details/app-service/linux/) |
| Azure Blob Storage | Stores route requests, photos, snapshots, history, alerts, and audits. | Usage-based; likely low at MVP scale, but photo uploads can increase storage/bandwidth. | [Azure Blob Storage pricing](https://azure.microsoft.com/en-us/pricing/details/storage/blobs/) |
| Azure Communication Services Email | Sends river alert emails. | Usage-based per email; likely low unless alert volume grows. | [Azure Communication Services pricing](https://azure.microsoft.com/en-us/pricing/details/communication-services/) |
| Google Maps Platform | Powers native Android maps in the mobile app. | Usage-based after Google's included monthly credit/allowance. | [Google Maps Platform pricing](https://mapsplatform.google.com/pricing/) |
| Apple Developer Program | Required for iOS App Store/TestFlight distribution. | $99/year. | [Apple Developer Program](https://developer.apple.com/programs/) |
| Google Play Console | Required for Android Play Store distribution. | One-time $25 registration fee. | [Google Play Console registration](https://support.google.com/googleplay/android-developer/answer/6112435) |
| Expo EAS | Builds mobile app binaries for internal testing and store release. | Free tier may work early; paid plans start around $19/month if more build capacity/team features are needed. | [Expo pricing](https://expo.dev/pricing) |
| GitHub Actions | Runs deployments, snapshots, history captures, and alert checks. | Often included up to account limits; billable if private repo usage exceeds included minutes/storage. | [GitHub Actions billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions) |
| Firebase Analytics / Crashlytics | Preferred optional mobile analytics and crash reporting. | No-cost Firebase products at MVP scale; review if paid Firebase services are added later. | [Firebase pricing](https://firebase.google.com/pricing) |
| Umami Cloud | Optional privacy-friendly web analytics. | Free Hobby plan for low-traffic sites; paid plans apply if usage grows. | [Umami Cloud](https://umami.is/docs/cloud) |
| Open-Meteo Geocoding | Location search and reverse geocoding on the web app. | Free/fair-use for low volume; paid plans are available if usage grows. | [Open-Meteo pricing](https://open-meteo.com/en/pricing) |
| OpenFreeMap tiles | Web map tiles for MapLibre maps. | No app API key today; confirm production terms or budget for a paid tile provider if usage grows. | [OpenFreeMap](https://openfreemap.org/) |

## 2026-09 verification checklist

Record these values from the billing owners before changing the estimates above:

| Provider | Evidence to capture | Owner action |
| --- | --- | --- |
| Azure | Subscription cost by resource group for Static Web Apps, App Service, Container Apps Job, storage, registry, logs, and Communication Services; month-to-date and trailing 90 days. | Export the Cost Management view and attach the export to the operations record. |
| GitHub Actions | Minutes and artifact/storage usage by workflow, including snapshot and alert jobs. | Export the billing usage report and identify the highest-cost workflows. |
| Expo EAS | Build/update counts and plan usage for the current billing period. | Export the project usage page and record whether the free tier is sufficient. |
| Google Maps | Android Maps SDK request count and monthly credit consumption. | Export the billing report and set a budget alert before the credit is exceeded. |
| Email delivery | Messages sent, failures, and provider charges for the same period. | Compare provider usage with alert-evaluation counts in the weekly product report. |

Use the repository checks as supporting evidence: `npm run operations:verify` validates deployment and snapshot controls, and `npm run snapshots:capacity` records the current snapshot storage budget. A read-only Azure Consumption query for 2026-08-01 through 2026-09-04 returned the expected Paddle Today resources but no priced usage totals (`pretaxCost` was unavailable), so it cannot replace the billing export. Neither repository checks nor the CLI query replaces provider billing evidence.
