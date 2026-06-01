# Tennessee Route Additions Automation Memory

- 2026-06-01 11:11 America/Chicago / 2026-06-01 16:11 UTC: No route added.
  - Rebuilt Tennessee inventory and confirmed four current live V2 routes: `big-south-fork-burnt-mill-leatherwood`, `pigeon-river-waterville-hartford`, `pigeon-river-hartford-denton`, and `south-chickamauga-creek-shallowford-sterchi`.
  - Fresh checks kept Harpeth and Sequatchie at `threshold_weak`: public paddling/access context and same-river gauge leads remain real, but no source-backed numeric low-water floor, preferred band, or high-water cutoff surfaced.
  - Duck River Halls Mill / Hopkins Bridge remains `threshold_weak`: USGS `03598185` visible official evidence is stale to `2026-04-28/29`, endpoint authority is incomplete, and the only numeric float evidence remains supplemental trip-report context.
  - Wolf/Ghost River remains `no_live_gauge` with high-water-only threshold support: TDEC and Wolf River Conservancy support the marked route and over-8-ft danger rule, but search-visible official USGS `07030392` evidence is stale to `2026-05-10` and no low-water floor or preferred range surfaced.
  - Little River / Elbow to the Y remains `research_later`: AW threshold/gauge context exists, but accessible USGS `03497300` evidence shows no continuous data types and primary-source public endpoint/access coordinates were not clean enough for a V2 whitewater route.
  - No app data or image-audit rows changed; ledger JSON validation and `git diff --check` were run after doc updates.

- 2026-06-01 10:51 America/Chicago / 2026-06-01 15:51 UTC: No route added.
  - Rebuilt Tennessee inventory and confirmed four current live V2 routes: `big-south-fork-burnt-mill-leatherwood`, `pigeon-river-waterville-hartford`, `pigeon-river-hartford-denton`, and `south-chickamauga-creek-shallowford-sterchi`.
  - Fresh checks kept Harpeth and Sequatchie at `threshold_weak`: public paddling/access context and same-river gauge leads remain real, but no source-backed numeric low-water floor, preferred band, or high-water cutoff surfaced.
  - Duck River Halls Mill / Hopkins Bridge remains `threshold_weak` from the prior stale Halls Mill official data and supplemental-threshold blocker.
  - Wolf/Ghost River remains `no_live_gauge` with high-water-only threshold support: Wolf River Conservancy supports the Ghost River timing/safety story and over-8-ft danger rule, but no low-water floor or preferred range surfaced.
  - Workspace USGS Water Services still failed with `Unable to connect to the remote server`. No app data or image-audit rows changed.

- 2026-06-01 10:32 America/Chicago / 2026-06-01 15:32 UTC: No route added.
  - Rebuilt Tennessee inventory and confirmed four current live V2 routes: `big-south-fork-burnt-mill-leatherwood`, `pigeon-river-waterville-hartford`, `pigeon-river-hartford-denton`, and `south-chickamauga-creek-shallowford-sterchi`.
  - Targeted recheck kept Harpeth and Sequatchie at `threshold_weak`: official/blueway sources support paddling context and public access stories, but still do not publish source-backed numeric route thresholds tied to the selected gauges.
  - Duck River Halls Mill / Hopkins Bridge remains `threshold_weak` and not addable: USGS `03598185` is a strong direct gauge lead, but the official legacy page currently shows discharge ending `2026-04-28` and gage height ending `2026-04-29`, and the only numeric float evidence remains a supplemental trip report.
  - Little River / Elbow to the Y was logged only as `research_later`: AW threshold/gauge context exists, but primary-source public endpoint/access coordinates were not clean enough for a V2 whitewater route.
  - Workspace USGS Water Services still failed with `Unable to connect to the remote server`.
  - No app data or image-audit rows changed; ledger JSON validation and `git diff --check` were run after doc updates.

- 2026-06-01 09:52 America/Chicago / 2026-06-01 14:52 UTC: Added two Pigeon River routes.
  - Rebuilt Tennessee inventory and confirmed four current live V2 routes after this pass: `big-south-fork-burnt-mill-leatherwood`, `south-chickamauga-creek-shallowford-sterchi`, `pigeon-river-waterville-hartford`, and `pigeon-river-hartford-denton`.
  - USGS Water Services returned same-day product-live data for `03460795` Pigeon River below Power Plant near Waterville: `1450 cfs / 9.04 ft` at `2026-06-01 10:30 EDT`.
  - Added upper Pigeon / Pigeon Gorge as `pigeon-river-waterville-hartford` using American Whitewater exact route, Class II-III+ difficulty, `300-4500 cfs` runnable range, same-day USGS data, and Forest Service upper-section context. Preserve strong post-Helene caveats: 2026 bridge put-in, roadwork through possible 2027/2028, changed rapids, construction access, debris, strainers, and release schedule.
  - Added lower Pigeon as `pigeon-river-hartford-denton` using American Whitewater exact route, Class II(III) difficulty, `1200-2500 cfs` runnable range, same-day USGS data, and Forest Service lower-section context. Preserve release-arrival timing, parking-permission, Greasy Cove take-out, Maytag/ledge, commercial-traffic, and high-water-hole caveats.
  - No route-gallery images were selected for either Pigeon add.
  - Validation: `npm.cmd run typecheck:routes`, ledger JSON parse, `git diff --check`, `npm.cmd run routes:audit` at 240 routes, full `npm.cmd run typecheck`, and `npm.cmd run build` at 315 pages all passed. `git diff --check` reported line-ending warnings only.

- 2026-06-01 09:32 America/Chicago / 2026-06-01 14:32 UTC: No route added.
  - Rebuilt Tennessee inventory and confirmed two current live V2 routes: `big-south-fork-burnt-mill-leatherwood` and `south-chickamauga-creek-shallowford-sterchi`.
  - Rechecked Harpeth, Duck, Elk, Sequatchie, and Obed/Emory Nemo context. Harpeth remains `threshold_weak` despite official USGS `03434500` showing `984 cfs / 3.45 ft` at `2026-05-31 20:00 CDT`; Duck `03598000` remains stale to `2026-05-28`; Elk `03582000` remains stale to `2026-05-29`; Sequatchie `03571000` remains `threshold_weak` despite `1060 cfs / 4.31 ft` at `2026-05-31 08:15 CDT`; Obed/Emory was not promoted because USGS `03539800` is stale to `2026-05-30` and the gauge/threshold story remains messy.
  - Workspace USGS Water Services was unable to connect.
  - No app data or image-audit rows changed; ledger JSON validation and `git diff --check` were run after memory edits.

- 2026-06-01 09:11 America/Chicago / 2026-06-01 14:11 UTC: No new route added; reconciled inventory.
  - Rebuilt the Tennessee inventory and confirmed two current live V2 routes: `big-south-fork-burnt-mill-leatherwood` and `south-chickamauga-creek-shallowford-sterchi`.
  - South Chickamauga Creek was already implemented in the workspace and ledger by the 08:56 add pass after USGS `03567500` exposed same-day product-live data.
  - Updated stale state and Midwest memory text that still counted only one Tennessee route or listed South Chickamauga as `likely_addable`.
  - No app data or image-audit rows changed in this reconciliation pass.

- 2026-06-01 08:56 America/Chicago / 2026-06-01 13:56 UTC: Added `south-chickamauga-creek-shallowford-sterchi`.
  - Rechecked the strongest Tennessee lead after the user asked to retry it. USGS Water Services and the official legacy page now expose same-day product data for `03567500`: `385 cfs / 5.20 ft` at `2026-06-01 09:15 EDT`, with the legacy page modified `2026-06-01 09:56 EDT`.
  - Implemented South Chickamauga Creek, Shallowford Road to Sterchi Farm Park, using Outdoor Chattanooga exact route/access support, Chattanooga Audubon gauge and rapid-change cautions, guidebook endpoint coordinates, and a conservative `minimum-only` 180 cfs threshold.
  - Added route data and trip logistics. No route-gallery image was selected.

- 2026-06-01 06:11 America/Chicago / 2026-06-01 11:11 UTC: No route added.
  - Re-read the required automation memory, Tennessee state memory, live route inventory, trip details, Midwest memory, ledger, route requirements, and image audit.
  - Current Tennessee inventory remains one route: `big-south-fork-burnt-mill-leatherwood`.
  - South Chickamauga Creek Shallowford-to-Sterchi remains `likely_addable`, but official USGS `03567500` still exposed only `475 cfs / 5.46 ft` at `2026-05-31 07:15 EDT`, page last modified `2026-05-31 08:22 EDT`; do not ship until same-day product-supported current data is visible.
  - Harpeth remains `threshold_weak` despite recent official `03434500` values because no durable route-specific numeric paddling band surfaced.
  - Duck, Elk, and Wolf/Ghost River remain blocked by stale official gauge visibility and/or weak threshold support.
  - No app data or image audit rows changed; only documentation/ledger memory was updated.
