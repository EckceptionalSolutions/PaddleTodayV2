# Verified mobile route links

HTTPS links under `https://paddletoday.com/rivers/` are registered for Android App Links and iOS Universal Links. Expo Router's `+native-intent.tsx` maps the public plural route path to `/river/<slug>`, preserving query selections on cold and warm opens. Existing custom-scheme links remain supported. The website handoff panel remains available as a fallback.

## Website association

- `public/.well-known/apple-app-site-association`: Apple Team F73XS8FMPL (existing release configuration), bundle com.paddletoday.mobile.
- `public/.well-known/assetlinks.json`: package com.paddletoday.mobile; SHA-256 certificate recovered from the v2 signing block of the successful preview APK in GitHub Actions run 34305966299. This is public certificate metadata, not a private key.
- Play Store app-signing SHA-256 supplied by the owner: `89:27:EE:95:F5:5F:30:E3:26:7E:24:3C:2A:5A:56:6B:D3:59:89:A0:CE:5B:C0:37:F5:76:AD:F8:F6:6F:95:72`. Included alongside the preview certificate.
- Azure Static Web Apps serves these paths as application/json and excludes them from SPA fallback. Only the canonical paddletoday.com domain is registered.

## Release steps still required

1. Deploy the website association files and confirm both HTTPS URLs return 200 JSON without redirects.
2. Build/install updated native apps; existing builds lack the link entitlement/intent filter.
3. From SMS, test a route link with putin/takeout on cold and warm launches. Confirm the intended route/access choices. Test without an installed app for website fallback.
4. On Android, inspect `adb shell pm get-app-links com.paddletoday.mobile` and confirm paddletoday.com is verified. If necessary request re-verification after deploying the files.

Validation: mobile typecheck and 163 unit tests pass, including incoming link regressions. Astro build succeeds and includes both association files. Native exports do not prove OS domain verification; device SMS checks remain pending. No deployment or remote build triggered for this change.

References: https://docs.expo.dev/linking/android-app-links/ , https://docs.expo.dev/linking/ios-universal-links/ , https://docs.expo.dev/router/advanced/native-intent/
