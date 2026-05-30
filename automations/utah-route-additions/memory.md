# Utah Route Additions Automation Memory

Use this file to avoid retrying the same blocked Utah routes unless new evidence directly fixes the prior blocker.

## Setup Notes

- Created for the Utah-focused route-addition automation.
- Start each run by reconciling the current PaddleTodayV2 inventory, `docs/midwest-route-automation-memory.md`, `docs/route-candidate-ledger.json`, `docs/route-addition-requirements.md`, and this memory.
- Existing PaddleTodayV2 coverage has no Utah routes as of 2026-05-30.
- Utah route work needs stricter access scrutiny than most Midwest states. Read current Utah DWR stream-access guidance before relying on bed/bank access, and prefer routes with explicit public boat ramps, state/federal land, official access areas, concessionaire-supported public access, BLM/Forest Service facilities, or American Whitewater access notes.
- Prefer USGS live gauges that the current product can fetch through Water Services. Many Utah paddling reaches have AW or local live-flow pages, but do not ship a route if the chosen gauge is stale or outside the app's current live-data path.

## Source Stack

- Live gauge: USGS Water Services / Water Data current observations.
- Access/manager authority: BLM Utah, Ashley National Forest / Forest Service, Utah DWR access pages, Utah State Parks, county/city parks, National Park Service, Recreation.gov permit pages, and official water-trail or recreation maps.
- Threshold support: American Whitewater when the reach/gauge match is direct; official manager flow guidance if available; strong route-specific local guidance only when tied to the selected gauge.
- Supplemental only: outfitters, tourism pages, RiverScout/Snoflo, forums, blogs, and fishing-condition pages. Use these for seeds and caveats, not as sole shipping evidence.

## Run Notes

- 2026-05-30 11:55 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and found one existing Utah route already live: `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. For the Weber corridor, lawful access points and no-assumption private-bank handling remain first-class constraints.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater and Weber State still support the 5-mile Class II(III) Henefer-to-Taggarts route, the Henefer/Exit 112 put-in context, the Taggarts/Exit 108 take-out context, and the USGS `10132000` Weber River at Echo gauge relationship. DWR confirms the Henefer-Echo Angler Access WMA as a managed public access/tubing parking area.
  - No route was added because exact source-backed endpoint coordinates were not captured for both implementation points, especially the Taggarts river-right take-out below Taggarts Falls.
  - Updated the ledger status for `ut-weber-river-henefer-taggarts` from `likely_addable` to `needs_manual_coordinates`. Retry only after official GIS/map data, AW map feature coordinates, DWR Fish Utah/WMA data, county access data, or similarly strong source-backed coordinates resolve both endpoints.

- 2026-05-30 11:26 America/Chicago: First Utah route implementation.
  - Reconciled live inventory and still found no existing Utah routes or duplicate Green River Section A slug before adding.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. The implemented Green River route relies on Ashley National Forest public launch facilities and the managed federal river corridor, not assumed private-bank access.
  - Added `Green River - Flaming Gorge Dam / Spillway Boat Launch to Little Hole` as `green-river-flaming-gorge-dam-little-hole`, Section A only.
  - Gauge: direct USGS `09234500` Green River near Greendale, UT. Official USGS legacy current conditions showed 1,520 cfs / 9.01 ft at 2026-05-30 07:30 MDT. Shell Water Services requests were blocked by the runtime network, but the official USGS page exposed same-day current observations and the app uses the standard USGS provider.
  - Threshold: conservative `minimum-only` at 1,000 cfs from American Whitewater runnable-flow context on the Greendale gauge. No ideal range or high-water cutoff was claimed.
  - Endpoints: Ashley National Forest coordinates for Spillway Boat Launch Area `40.90885, -109.422256` and Little Hole Boat Launch Area `40.910719, -109.315144`.
  - Route posture: `routeType: 'whitewater'` because the route uses AW threshold context and is cold, swift dam-release tailwater with Class I-II features, required safety gear, release fluctuation, commercial dory traffic, busy ramps, no-camping Section A rules, and fee/pass requirements.
  - Image pass: USGS has a public-domain Spillway Boat Launch image lead, but no gallery asset was added because the shell could not fetch remote assets. The route uses fallback imagery for now and the image audit records the lead.
  - Next Utah lead remains `ut-weber-river-henefer-taggarts`; recheck DWR/private-bank-sensitive access and exact public endpoint coordinates before any future add.

- 2026-05-30 10:55 America/Chicago: Utah orientation and automation bootstrap.
  - Reconciled current inventory and found no `state: 'Utah'` / `state: 'UT'` routes in `src/data/rivers.ts` or the existing candidate ledger.
  - Queried USGS Water Services IV for active Utah discharge gauges. Product-fetchable same-day gauge leads include Weber River at Echo `10132000` at 360 cfs / 2.71 ft at 2026-05-30 09:00 MDT, Weber River near Coalville `10130500` at 264 cfs / 2.55 ft at 09:30 MDT, Green River near Greendale `09234500` at 1000 cfs / 8.39 ft at 09:30 MDT, San Juan River near Bluff `09379500` at 1080 cfs / 6.84 ft at 09:45 MDT, and North Fork Virgin River near Springdale `09405500` at 38.3 cfs / 7.18 ft at 09:35 MDT.
  - Promoted `ut-weber-river-henefer-taggarts` to `likely_addable`. American Whitewater has a direct Henefer-to-Taggarts route page, same-route Echo gauge support, 5-mile II(III) route shape, current medium-runnable reading, endpoint/access notes, fee and crowding notes, low-bridge/portage/high-flow caveats, and recent trip reports indicating 205 cfs low/scrapy and 250 cfs better for packrafts. Utah DWR's March 2026 stream-access guidance makes Weber access unusually important to recheck before implementation.
  - Promoted `ut-green-river-flaming-gorge-dam-little-hole` to `likely_addable`. American Whitewater and Ashley National Forest support the Flaming Gorge Dam / Spillway Boat Launch to Little Hole Section A route shape, USGS `09234500` is direct and product-fetchable, the route is a 7-mile Class I-II day float, and Forest Service pages document recreation/facility restrictions. Implementation should decide whether to score Section A only or broader A/B/C, and keep dam-release, cold-water, commercial-traffic, pass/fee, required-safety-gear, and no-camping caveats visible.
  - Logged `ut-provo-river-deer-creek-vivian-park` as `no_live_gauge`. The route/access story is real and AW documents the 4.4-mile Class II route, but AW's Deer Creek Dam gauge data is stale and USGS `10159500` returned only a 2003 IV observation through Water Services. Do not ship until a product-supported current live source is integrated or a different direct current USGS path is verified.
  - Logged `ut-san-juan-river-sand-island-mexican-hat` as `research_later`. BLM strongly supports the permitted Sand Island / Mexican Hat / Clay Hills route network and USGS `09379500` is product-fetchable, but the upper San Juan is a 26.9-mile permit-managed desert float, not a normal same-day route for the current app. Revisit only if PaddleToday adds permitted multi-day route handling or a conservative day-use model.
  - No app route was added. Only automation/ledger/memory files changed. Ledger JSON parse and `git diff --check` were run.
