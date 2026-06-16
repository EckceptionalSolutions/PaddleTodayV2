# Apple App Store Release Plan

Status as of 2026-05-22.

## Version 3 Prep

Local release metadata for the next store build is prepared as:

- App version: `1.0.3`
- Next iOS build number: `15`
- Next Android versionCode: `7`
- Release notes: use the current `docs/mobile-store-listing-draft.md` notes for the new Today page, route search, Explore filters, supported-river browser, Mississippi River coverage, and usability fixes.

Before App Review or Play production submission, capture fresh screenshots from this build because the old store screenshots predate the redesigned Today and Explore flows.

## Current Release State

- App name: PaddleToday
- Platform: iOS, Expo / React Native / EAS
- Bundle identifier: `com.paddletoday.mobile`
- App version: `1.0.0`
- Current successful iOS build number: `8`
- EAS project: `@eckceptionalsolutions/paddletoday-mobile`
- EAS project ID: `f9349f7d-e977-4210-b6b4-e95029226ede`
- Apple signing: EAS remote iOS distribution credentials are configured for Apple Team `F73XS8FMPL`.
- iPad support: enabled with `ios.supportsTablet: true`; keep this only if iPad QA and iPad screenshots are completed.
- Privacy policy: `https://paddletoday.com/privacy/`
- Support/contact email: `hello@paddletoday.com`
- App Store Connect app ID: `6769542734`
- App Store Connect operations runbook: `docs/app-store-connect-ops.md`

## Completed Local Checks

- `npm run mobile:typecheck` passes.
- `npm run mobile:release-check` passes all 49 checks.
- EAS login is active as `eckceptionalsolutions`.
- Firebase native config files exist for iOS and Android.
- Firebase config disables ad personalization signals, ad storage, ad user data, Android ad ID collection, and ad network registration.
- iOS Firebase Analytics is configured without Ad ID support through `apps/mobile/plugins/with-rnfirebase-ios-privacy.js`.
- Local source search found no IDFA/AppTrackingTransparency usage or ad SDK packages.
- `ITSAppUsesNonExemptEncryption` is set to `false`; verify no custom/non-exempt encryption is added before final submission.

## Build And TestFlight

Successful build:

- EAS build ID: `5719a01c-db13-458a-88c4-a574f23e5669`
- Build URL: `https://expo.dev/accounts/eckceptionalsolutions/projects/paddletoday-mobile/builds/5719a01c-db13-458a-88c4-a574f23e5669`
- IPA artifact: `https://expo.dev/artifacts/eas/bKPttDVJbAzFcBKfH5JQM8.ipa`
- Platform/profile: iOS production
- App version/build: `1.0.0 (8)`
- Status: finished

The production EAS submit profile is configured with App Store Connect app ID `6769542734`.

Build `8` is uploaded to App Store Connect/TestFlight.

TestFlight status observed in App Store Connect:

- Build `1.0.0 (8)` is validated and available for testing.
- Internal group attached: `Team (Expo)`, 3 testers.
- TestFlight "What to Test" saved:

```text
Please test the main paddling planning flow: Today recommendations, Explore map marker taps, route detail tabs, Weekend planning, Saved routes, route request, route report/photo permission, optional location permission, alerts/notifications, and privacy/terms/support links. No login is required.
```

```sh
cd apps/mobile
npx eas-cli submit --platform ios --profile production --latest
```

Do not submit for App Review until TestFlight QA passes, screenshots are uploaded, App Review contact information is complete, and the user explicitly confirms final submission.

Build failure history resolved before build `8`:

- Build `5` failed during `pod install` because Firebase Swift pods required framework/static framework configuration.
- Build `6` passed pod install but failed with RNFirebase non-modular React header errors.
- Build `7` proved disabling iOS New Architecture is not viable because `react-native-reanimated` requires it.
- Build `8` succeeded after adding `expo-build-properties`, `ios.useFrameworks: "static"`, `ios.forceStaticLinking` for RNFirebase pods, and the Firebase Analytics no-Ad-ID Podfile setting.

## App Store Connect App Record

Use these values unless App Store Connect forces a naming conflict:

- Name: PaddleToday
- Bundle ID: `com.paddletoday.mobile`
- SKU: `paddletoday-ios`
- Primary category: Sports
- Availability: United States first, unless broader launch is intentional.
- Price: Free
- Login required: No
- Ads: No

- App Store Connect record: created.
- Numeric App Store Connect app ID: `6769542734`.
- Bundle ID: `com.paddletoday.mobile`.
- SKU shown in App Store Connect: `paddletoday-mobile-ios`.
- Primary category: Sports.
- Content rights: set to third-party content present with necessary rights.
- Age rating: configured. Current result is `9+` in most countries/regions, `15+` in Australia and Brazil, and `All` in Korea. For operating systems earlier than version 26, App Store Connect shows global rating `4+` with regional exceptions.

Account-side confirmation still needed:

- App Store Connect Agreements, Tax, and Banking do not block release.
- Internal testers are configured for TestFlight and have installed build `8`.

## Listing Metadata

Subtitle, 30 characters max:

```text
River routes and live scores
```

Promotional text:

```text
Map-first paddling planning with live scores, route facts, weekend picks, and saved local rivers.
```

Description:

```text
PaddleToday helps paddlers decide where to go today, this weekend, or when exploring nearby rivers.

The app combines river condition scores, confidence, route facts, map search, and practical planning notes so you can compare paddling options quickly. It is built for repeat local use: open the app, scan the best routes, check the map, review the river detail, and save the routes you care about most.

Key features:

- Today board with recommended routes based on score, confidence, and location when enabled.
- Map-first Explore screen for browsing rivers, filtering routes, and opening route details.
- Weekend planner for narrowing trips by forecast support, route commitment, and camping notes.
- River detail pages with structured summaries, route facts, logistics, access notes, hazards, and recent condition context.
- Saved rivers kept on your device for quick repeat checks.
- Optional location support for nearby recommendations and distance-aware filters.
- Route request and support links for missing routes, corrections, and feedback.

PaddleToday is a planning aid, not a substitute for field judgment. River conditions, weather, access, hazards, and closures can change quickly. Always check official sources, local rules, current weather, route access, group ability, and safety equipment before launching.
```

Keywords, 100 characters max:

```text
paddling,canoe,kayak,river,routes,water levels,conditions,map,weather,camping,Midwest
```

What's New:

```text
New Today page, faster route search, improved Explore filters, supported-river browsing, additional Mississippi River coverage, and smaller usability fixes for planning from current river conditions.
```

URLs:

- Support URL: `https://paddletoday.com/contact/`
- Marketing URL: `https://paddletoday.com/`
- Privacy Policy URL: `https://paddletoday.com/privacy/`

App Store Connect metadata entered and saved:

- Subtitle: `River routes and live scores`
- Promotional text: `Map-first paddling planning with live scores, route facts, weekend picks, and saved local rivers.`
- Description: entered from the draft above.
- Keywords: entered from the draft above.
- Support URL: `https://paddletoday.com/contact/`
- Marketing URL: `https://paddletoday.com/`
- Copyright: `© 2026 Eckceptional Solutions`
- Build: `1.0.0 (8)` attached.
- Release option: manual release.
- Pricing: set to free (`$0.00`) across countries/regions in App Store Connect.
- App Review: version `iOS 1.0` added to a draft submission. The draft status is `Ready for Review`.

## App Privacy Labels Draft

Tracking:

- Answer: No.
- Rationale: no ads, no tracking permission string, no IDFA/AppTrackingTransparency usage found, Firebase ad personalization/ad storage/ad user data disabled, Android ad ID collection disabled, and iOS Firebase Analytics configured without Ad ID support.

Data linked to the user:

- Contact Info -> Email Address: alerts, route request follow-up, route report follow-up. Purpose entered: App Functionality.
- Contact Info -> Name: route report contributor name or paddling handle. Purpose entered: App Functionality.
- User Content -> Photos or Videos: optional route report photos. Purpose: App Functionality.
- User Content -> Other User Content: route reports, route requests, corrections, access notes, hazard notes. Purpose entered: App Functionality.

Data not linked to the user:

- Location -> Precise Location and Coarse Location: optional nearby recommendations/distance sorting. Purposes entered: App Functionality and Product Personalization. Current app behavior should be treated as not linked if coordinates are only used on device and not uploaded.
- Identifiers -> Device ID: Firebase app-instance/installation identifiers for analytics/diagnostics, without IDFA tracking. Purposes entered: App Functionality and Analytics.
- Usage Data -> Product Interaction: Firebase Analytics events. Purpose: Analytics.
- Diagnostics -> Crash Data: Firebase Crashlytics. Purpose: App Functionality / Analytics.
- Diagnostics -> Other Diagnostic Data: Firebase diagnostics if surfaced by the SDK. Purpose: App Functionality / Analytics.

Data not collected:

- Financial Info, Contacts, Browsing History, Search History, Health and Fitness, Sensitive Info, and Purchases are not intentionally collected by PaddleToday for this release.

App Store Connect status:

- Privacy policy URL: published as `https://paddletoday.com/privacy/`.
- User privacy choices URL: published as `https://paddletoday.com/privacy/`.
- App Privacy labels: published with 10 data types and no tracking.

## Age Rating Draft

- App Store Connect age rating questionnaire is complete.
- User-generated content was marked present because route reports/photos can be submitted and reviewed.
- Ads, unrestricted web access, messaging/chat, mature themes, medical/wellness content, sexuality/nudity, violence, gambling, simulated gambling, contests, and loot boxes were marked absent/none.
- Calculated result: `9+` in most countries/regions, with regional exceptions shown in App Store Connect.

## Screenshot Requirements

Because `ios.supportsTablet` is currently true, upload both:

- iPhone 6.5-inch portrait screenshots: `1242 x 2688`.
- iPhone 6.9-inch portrait screenshots: `1290 x 2796`, `1260 x 2736`, or `1320 x 2868`. These were generated but App Store Connect currently asks for the 6.5-inch class for this version.
- iPad 13-inch portrait screenshots: `2048 x 2732` or `2064 x 2752`.

Generated screenshot paths:

- `docs/store-screenshots/app-store/ios-iphone-65-01-today.png`
- `docs/store-screenshots/app-store/ios-iphone-65-02-explore-map.png`
- `docs/store-screenshots/app-store/ios-iphone-65-03-river-today.png`
- `docs/store-screenshots/app-store/ios-iphone-65-04-access-logistics.png`
- `docs/store-screenshots/app-store/ios-iphone-65-05-weekend.png`
- `docs/store-screenshots/app-store/ios-iphone-65-06-saved.png`
- `docs/store-screenshots/app-store/ios-iphone-01-today.png`
- `docs/store-screenshots/app-store/ios-iphone-02-explore-map.png`
- `docs/store-screenshots/app-store/ios-iphone-03-river-today.png`
- `docs/store-screenshots/app-store/ios-iphone-04-access-logistics.png`
- `docs/store-screenshots/app-store/ios-iphone-05-weekend.png`
- `docs/store-screenshots/app-store/ios-iphone-06-saved.png`
- `docs/store-screenshots/app-store/ios-ipad-01-today.png`
- `docs/store-screenshots/app-store/ios-ipad-02-explore-map.png`
- `docs/store-screenshots/app-store/ios-ipad-03-river-today.png`
- `docs/store-screenshots/app-store/ios-ipad-04-access-logistics.png`
- `docs/store-screenshots/app-store/ios-ipad-05-weekend.png`
- `docs/store-screenshots/app-store/ios-ipad-06-saved.png`

These were captured from the Expo Web rendering on Windows with production API data at Apple-required output sizes:

- iPhone set: `1290 x 2796`.
- iPhone 6.5-inch set: `1242 x 2688`.
- iPad set: `2048 x 2732`.

QA contact sheets:

- `docs/store-screenshots/app-store/qa-contact-iphone.png`
- `docs/store-screenshots/app-store/qa-contact-iphone-65.png`
- `docs/store-screenshots/app-store/qa-contact-ipad.png`

If time permits before final submission, prefer replacing these with TestFlight screenshots from real iOS/iPadOS hardware or a macOS simulator. Do not upload the Android screenshots as final Apple screenshots.

App Store Connect upload status:

- 6 screenshots uploaded for the iPhone 6.5-inch display class.
- 6 screenshots uploaded for the iPad 13-inch display class.

## TestFlight QA Script

Run from a clean install:

- App opens and Today loads production data.
- Explore map loads, pans/zooms, marker taps open the drawer, and drawer route links work.
- River detail opens from Today, Explore, Weekend, and Saved.
- Weekend loads and filter/section states are usable.
- Saved empty state works; saving and unsaving routes persist locally.
- Route request flow submits or clearly handles validation/network errors.
- Route report/photo flow requests photo permission only when adding photos.
- Location permission is optional; deny and allow paths both work.
- Notification prompt copy aligns with route alerts.
- Privacy, terms, support/contact, and safety links open correctly.
- More/API diagnostic shows production API and production environment.
- No login is required.
- No debug overlays, loading states, or private data appear in screenshots.
- iPad layout is acceptable if tablet support remains enabled.

## Review Notes Draft

App Review Information is drafted below. The reviewer contact phone number has been provided, but this section still needs to be saved in App Store Connect.

Draft contact:

- Sign-in required: unchecked
- First name: Jeffrey
- Last name: Eckerson
- Phone: `6127150501`
- Email: `hello@paddletoday.com`

Prefilled notes:

```text
No login is required to test PaddleToday.

Suggested test path:
1. Open the app on Today and select a recommended route.
2. Use Explore to pan the map, tap a route marker, and open route details.
3. Open Weekend to review weekend paddling options.
4. Save a route and confirm it appears in Saved.
5. Open a route detail page and review Today, Access/logistics, route report, alert, privacy, terms, and support links.

PaddleToday is a paddling planning aid, not a substitute for field judgment. River conditions, weather, access, hazards, and closures can change quickly.

Location permission is optional and used for nearby route recommendations and distance-aware sorting. Photo permission is optional and only used when the tester chooses to attach route photos to a route report. Native notifications are optional and used for requested route alerts.
```

## Remaining Manual Steps

- Save App Review Information in App Store Connect.
- Install TestFlight build internally and complete the QA script.
- Complete any desired TestFlight QA pass before final submission.
- Confirm with the user before clicking final Submit for Review on the draft submission.

## References

- Apple screenshot specifications: `https://developer.apple.com/help/app-store-connect/reference/screenshot-specifications`
- Apple app privacy details: `https://developer.apple.com/app-store/app-privacy-details/`
