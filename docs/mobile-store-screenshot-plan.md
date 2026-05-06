# Mobile Store Screenshot Plan

Use this when preview builds are ready and store screenshots need to be captured.

Primary references:

- Apple screenshot specifications: `https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/`
- Google Play preview assets: `https://support.google.com/googleplay/android-developer/answer/9866151`

## Capture Principles

- Use real in-app screens, not marketing-only mockups.
- Use production API data.
- Avoid showing personal email addresses, private report text, or private location labels.
- Prefer routes with strong visuals and clear facts. Rice Creek is a good home/detail example because route imagery exists.
- Keep overlays out of the screenshots unless they are part of the app UI. Google warns that extra text can be cut off on some Play surfaces.
- Capture the same route/order across platforms when possible so App Store and Play listings tell one coherent story.

## Required Store Sets

### Apple App Store

Because the app supports iPhone and iPad, plan for:

- iPhone 6.9-inch screenshots, portrait.
  - Accepted sizes include `1290 x 2796`, `1260 x 2736`, or `1320 x 2868`.
- iPad 13-inch screenshots, portrait.
  - Accepted sizes include `2048 x 2732` or `2064 x 2752`.

Apple allows scaling from the required larger display classes to smaller display classes. Recheck App Store Connect at upload time.

### Google Play

Plan for:

- Phone screenshots: at least 4, portrait 9:16, minimum `1080 x 1920`.
- 7-inch tablet screenshots: at least 4 if tablet distribution is enabled.
- 10-inch tablet screenshots: at least 4 if tablet distribution is enabled.

Google Play allows up to 8 screenshots per supported device type. Screenshots must be JPEG or 24-bit PNG without alpha, with each dimension between 320 and 3840 px, and the long side no more than 2x the short side.

## Recommended Screenshot Story

Capture 6 screenshots for phone, then reuse/adapt the same story for tablet.

### 1. Today: Recommended Board

Goal: first impression and product promise.

State:

- Open Today.
- Use production data.
- Hero route should have a real river image if possible.
- Recommended/board filters visible enough to communicate the core experience.

Message conveyed by screen:

- The app answers "where should I paddle today?"
- Scores, confidence, and trip facts are immediately visible.

### 2. Explore: Map-First Search

Goal: show the Google Maps-like browsing mode.

State:

- Open Explore in map mode.
- Show several route dots.
- Keep the drawer at a clean partial snap with one selected route visible.
- Avoid a crowded filter sheet unless needed for a separate screenshot.

Message conveyed by screen:

- Routes can be explored spatially.
- Users can tap routes and open details from the map.

### 3. River Detail: Structured Today Call

Goal: show trust and decision support.

State:

- Open a route detail page with good route facts.
- Use the Today section.
- Show score, title, compact summary, and route facts.

Message conveyed by screen:

- The app explains the score in structured, paddler-friendly terms.

### 4. River Detail: Access And Logistics

Goal: show real trip planning value beyond a score.

State:

- Same route detail.
- Switch to Access.
- Show put-in/take-out map, distance, paddle time, shuttle, permits, camping, or access notes.

Message conveyed by screen:

- The app helps answer practical trip questions.

### 5. Weekend: Trip Planning

Goal: show a second planning mode.

State:

- Open Weekend.
- Show weekend hero and at least one route section.
- Prefer a state where Best weekend/Lower commitment/Camping possible are visible.

Message conveyed by screen:

- The app is useful beyond same-day paddling.

### 6. Saved Or More

Pick one depending on the final store story:

- Saved: if emphasizing repeat local use.
- More: if emphasizing safety, support, and diagnostics.

Recommended for MVP: Saved, after saving 2-3 routes.

Message conveyed by screen:

- Repeat routes are easy to revisit.

## Optional Additional Screenshots

If using 8 screenshots:

7. Explore filters: show filtering by difficulty, route type, state, score, or distance.
8. Route reports: show reviewed-before-publishing language and optional photo flow without displaying private submissions.

## Device Checklist

### iPhone

- Capture on the largest required display class available in simulator or physical device.
- Confirm safe areas do not cut off the top status bar or bottom tab bar.
- Confirm text fits and map drawer does not cover key actions.

### iPad

- Capture Today, Explore, River detail, and Weekend at minimum.
- Confirm layouts do not look like oversized phone screens if `supportsTablet` remains true.
- If tablet layouts are weak, consider setting `supportsTablet` to false before submission or improving tablet-specific layout.

### Android Phone

- Capture on a modern Pixel-style 9:16 device at or above 1080px resolution.
- Verify gesture navigation and three-button navigation do not collide with bottom tabs.

### Android Tablet

- Capture 7-inch and 10-inch screenshots if distributing to tablets.
- Confirm map and drawer controls are usable at tablet sizes.

## Pre-Capture Data Setup

1. Use production API.
2. Save 2-3 representative routes.
3. Allow location only if the screenshot story needs nearby/drive-aware behavior.
4. Do not show a personal home location label.
5. Pick a route with image support for Today/River detail if available.
6. Use routes with complete logistics for Access screenshots.

## File Naming

Use predictable names:

- `ios-iphone-01-today.png`
- `ios-iphone-02-explore-map.png`
- `ios-iphone-03-river-today.png`
- `ios-iphone-04-access-logistics.png`
- `ios-iphone-05-weekend.png`
- `ios-iphone-06-saved.png`
- `android-phone-01-today.png`
- `android-phone-02-explore-map.png`

Store final assets outside the app source until selected, for example:

- `docs/store-screenshots/final/`
- `docs/store-screenshots/raw/`

## Capture QA

Before upload:

1. Open every screenshot at full size.
2. Confirm no private data is visible.
3. Confirm no loading spinners or stale error states are visible.
4. Confirm screenshots match current app UI.
5. Confirm required dimensions and file formats.
6. Confirm first screenshot communicates the product immediately.
7. Confirm safety-sensitive screenshots do not imply the app guarantees conditions.
