# Indiana Route Memory

Created 2026-06-08 for the `indiana-route-additions` automation.

## Recent Runs

- 2026-06-09 13:25 America/Chicago / 2026-06-09 18:25 UTC: No route added. Re-read all required startup files and rebuilt the live Indiana inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`; Indiana remains at 0 live routes, with only incidental Wisconsin-route text hits for "Indiana". Reviewed the existing 21 Indiana ledger rows before discovery and rechecked Wabash Vera Cruz-to-White-Bridge, Blue River White Cloud-to-Blue-River-Chapel, Sugar Creek Shades/Turkey Run, Wildcat Creek Knop-Lake-to-Mis-So-La, Cedar Creek Tonkel-to-State-Road-1, and Big Pine Creek Rainsville-to-Twin-Bridges. Workspace product-style USGS Water Services IV fetches failed with `Unable to connect to the remote server` for `03323000`, `03303000`, `03339500`, `03334000`, and `033356848`; Wabash also opened as official WDFN static station context without accessible current values. No candidate cleared the full implementation bar: Wabash stays `no_live_gauge`; Blue, Sugar, Wildcat, and Cedar stay `threshold_weak`; Big Pine stays future `routeType: 'whitewater'` only with unresolved threshold/access-coordinate gates.

- 2026-06-09 08:42 America/Chicago / 2026-06-09 13:42 UTC: No route added. Rebuilt the live Indiana inventory from `src/data/rivers.ts` and `src/data/river-trip-details.ts`; Indiana remains at 0 live routes, and the only literal "Indiana" app-data hits were Wisconsin route text mentioning Indiana Avenue. Reviewed the existing 21 Indiana ledger rows before discovery, then rechecked only the strongest existing leads: Wabash Vera Cruz-to-White-Bridge, Blue River White Cloud-to-Blue-River-Chapel, Sugar Creek Shades/Turkey Run family, Kankakee National Water Trail Kingsbury-to-Route-8, and Big Pine Creek Rainsville-to-Twin-Bridges. Wabash remains `no_live_gauge` because USGS `03323000` did not expose same-day product-current official data; Blue River remains `threshold_weak` because USGS `03303000` was source-visible only through 2026-05-31 and thresholds/endpoints/dam context are still below grade; Sugar Creek remains `threshold_weak` because the older DNR/IndianaOutfitters-derived cfs/stage guidance is not an accepted route-specific threshold model; Kankakee remains `threshold_weak` because access evidence is strong but no numeric gauge-tied paddling model surfaced; Big Pine remains `needs_manual_coordinates` and future `routeType: 'whitewater'` only because AW current-looking context did not expose a clean numeric range and the endpoint package is unresolved.

## Current Inventory

- Current live Indiana routes in `src/data/rivers.ts`: 0 as of setup.
- Current Indiana candidate ledger rows: 21.
- Automation posture: existing-candidate blocker refresh first, not broad discovery.

## Source Priorities

- Indiana DNR State Parks Water Trails and current DNR pages.
- Indiana DNR Natural, Scenic, and Recreational Rivers material.
- County and city park/access pages.
- Northeast Indiana Water Trails and Northwest Indiana/Kankakee water-trail managers.
- USGS official live data and current-condition pages.
- American Whitewater for swiftwater/whitewater reaches.

## Known Quirks

- Do not rely on outdated Indiana Canoe Guide text without current access confirmation.
- Many candidates have route/access context but weak numeric thresholds. Keep `threshold_weak` until a numeric gauge relationship is source-backed.
- Low-head dams, dam tailwaters, bridge-access legitimacy, private banks, and urban water quality need explicit route caveats.
- Use `routeType: 'whitewater'` for Big Pine Creek, Whitewater Gorge/East Fork Whitewater, or similar swiftwater routes when implemented.

## Initial Focus

- Re-audit existing ledger rows before searching for new candidates.
- Best first leads to refresh: Sugar Creek, Blue River White Cloud to Blue River Chapel, Cedar Creek Tonkel Road to State Road 1, Big Pine Creek Rainsville to Twin Bridges, Kankakee National Water Trail, Wabash Vera Cruz to White Bridge, and White River Indianapolis/Noblesville family.
- Preserve blockers unless a gate clears in the current run: `threshold_weak`, `no_live_gauge`, `needs_manual_coordinates`, `blocked_until_date`, and `research_later`.
