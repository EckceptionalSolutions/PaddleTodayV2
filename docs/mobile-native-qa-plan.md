# Mobile Native QA Plan

Use this before TestFlight, Google internal testing, and final MVP release.

## Devices

- iOS simulator: recent iPhone size.
- Android emulator: recent Pixel size with gesture navigation.
- Physical iPhone.
- Physical Android with gesture navigation.
- Physical Android with three-button navigation if available.

## Install Checks

1. Install a clean production or preview build.
2. Open the app without a local dev server running.
3. Confirm Today loads data from the production API.
4. Force close and reopen the app.
5. Background and resume the app from Today, Explore, and River detail.

## Today

1. Confirm the hero image loads and the first recommendation opens a river page.
2. Switch filters: Recommended, Closest, Score, Most certain.
3. With location denied, confirm Closest does not break the page.
4. With location allowed, confirm Closest uses drive-aware ordering.
5. Pull to refresh and confirm the page remains usable.
6. Save and unsave a river.

## Explore

1. Confirm the default view is the map.
2. Pan and zoom the map.
3. Tap several route dots and confirm the selected route updates.
4. Drag the bottom drawer between snap points.
5. Open a route from the drawer.
6. Switch to list view and back to map view.
7. Search by river, route, town, and state.
8. Apply and clear filters.
9. Use nearest sorting with location allowed and denied.
10. Confirm map controls are not blocked by top status bars or bottom system navigation.

## Weekend

1. Confirm the weekend board loads.
2. Open a top weekend pick.
3. Review Lower commitment, Camping possible, and Watch list sections.
4. Save and unsave a weekend route.
5. Pull to refresh.

## River Detail

1. Open river details from Today, Explore, Weekend, and Saved.
2. Confirm hero summary is concise and structured.
3. Confirm route facts, logistics, hazards, access notes, and history sections render.
4. Use Save river.
5. Use Directions if present.
6. Navigate back without losing the previous tab state.

## Saved

1. Start with no saved rivers and confirm the empty state is clear.
2. Save a river from Today and confirm it appears in Saved.
3. Save a river from River detail and confirm it appears in Saved.
4. Remove a saved river and confirm the screen updates.
5. Kill and reopen the app and confirm saved rivers remain.

## More

1. Open the More tab.
2. Confirm safety guidance is readable.
3. Tap Email support and confirm the mail client opens.
4. Tap Privacy and Terms links and confirm they open.
5. Run the API diagnostic and confirm success against production.

## Failure Checks

1. Disable network and launch the app.
2. Confirm Today, Explore, and Weekend show retryable error states.
3. Re-enable network and retry.
4. Deny location permission and confirm the app still works.
5. If photo/report submission is enabled, deny photo access and confirm the flow is graceful.
