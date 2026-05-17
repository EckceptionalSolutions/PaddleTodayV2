# Paddle Today Cost Audit

Last reviewed: 2026-05-12

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
| Plausible Analytics | Optional privacy-friendly web analytics. | Paid hosted plans start around $9/month; only applies if enabled. | [Plausible pricing](https://plausible.io/pricing) |
| Open-Meteo Geocoding | Location search and reverse geocoding on the web app. | Free/fair-use for low volume; paid plans are available if usage grows. | [Open-Meteo pricing](https://open-meteo.com/en/pricing) |
| OpenFreeMap tiles | Web map tiles for MapLibre maps. | No app API key today; confirm production terms or budget for a paid tile provider if usage grows. | [OpenFreeMap](https://openfreemap.org/) |
