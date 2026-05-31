# Utah Route Additions Automation Memory

Use this file to avoid retrying the same blocked Utah routes unless new evidence directly fixes the prior blocker.

## Setup Notes

- Created for the Utah-focused route-addition automation.
- Start each run by reconciling the current PaddleTodayV2 inventory, `docs/midwest-route-automation-memory.md`, `docs/route-candidate-ledger.json`, `docs/route-addition-requirements.md`, and this memory.
- Existing PaddleTodayV2 coverage had no Utah routes during bootstrap. The current live Utah route inventory has one route: `green-river-flaming-gorge-dam-little-hole`.
- Utah route work needs stricter access scrutiny than most Midwest states. Read current Utah DWR stream-access guidance before relying on bed/bank access, and prefer routes with explicit public boat ramps, state/federal land, official access areas, concessionaire-supported public access, BLM/Forest Service facilities, or American Whitewater access notes.
- Prefer USGS live gauges that the current product can fetch through Water Services. Many Utah paddling reaches have AW or local live-flow pages, but do not ship a route if the chosen gauge is stale or outside the app's current live-data path.

## Source Stack

- Live gauge: USGS Water Services / Water Data current observations.
- Access/manager authority: BLM Utah, Ashley National Forest / Forest Service, Utah DWR access pages, Utah State Parks, county/city parks, National Park Service, Recreation.gov permit pages, and official water-trail or recreation maps.
- Threshold support: American Whitewater when the reach/gauge match is direct; official manager flow guidance if available; strong route-specific local guidance only when tied to the selected gauge.
- Supplemental only: outfitters, tourism pages, RiverScout/Snoflo, forums, blogs, and fishing-condition pages. Use these for seeds and caveats, not as sole shipping evidence.

## Run Notes

- 2026-05-30 23:10 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, still last updated March 10, 2026. Weber remains sensitive around lawful access points, floating without stopping, private beds/banks, public access points, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the exact 5-mile Class II(III) reach, Echo gauge relationship, Henefer put-in, Taggarts take-out, Croyden bridge/portage, Taggarts Falls, private-property/low-bridge/high-flow caveats, and a 360 cfs medium-runnable reading.
  - Utah WRI still describes the Taggarts take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking and unclear unified rules. Utah Commerce Advisory Opinion 286 still documents county/private boundary and right-of-way dispute context around the Taggart takeout.
  - Workspace USGS Water Services IV fetches for `10132000` and the already-live Green River `09234500` gauge again failed unable to connect from this runtime.
  - No route was added. Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates`. Do not ship from inferred river-line coordinates, the supplemental Outbound coordinate, or a generic Taggarts locality.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because no app route code changed.

- 2026-05-30 22:40 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, still last updated March 10, 2026. Weber remains sensitive around lawful access points, floating without stopping, private beds/banks, public access points, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the exact 5-mile Class II(III) reach, Echo gauge relationship, Henefer put-in, Taggarts take-out, Croyden bridge/portage, Taggarts Falls, and private-property/low-bridge/high-flow caveats.
  - Utah WRI still describes the Taggarts take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking and unclear unified rules. Utah Commerce Advisory Opinion 286 still documents county/private boundary and right-of-way dispute context around the Taggart takeout.
  - Workspace USGS Water Services IV fetches for `10132000` and the already-live Green River `09234500` gauge again failed unable to connect from this runtime.
  - No route was added. Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates`. Do not ship from inferred river-line coordinates, the supplemental Outbound coordinate, or a generic Taggarts locality.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because no app route code changed.

- 2026-05-30 22:10 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, still last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, public access points, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the exact 5-mile Class II(III) reach, Echo gauge, Henefer put-in, Taggarts take-out, Croyden bridge/portage, Taggarts Falls, private-property caveats, and 360 cfs medium-runnable context.
  - Utah WRI still describes the Taggarts take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking and unclear unified rules. Utah Commerce Advisory Opinion 286 adds caution by documenting county/private boundary and right-of-way dispute context around the Taggart takeout.
  - Shell USGS Water Services IV fetches for `10132000` and the already-live Green River `09234500` gauge again failed unable to connect from this runtime.
  - No route was added. Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates`. Do not ship from inferred river-line coordinates, the supplemental Outbound coordinate, or a generic Taggarts locality.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because no app route code changed.

- 2026-05-30 21:40 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, still last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, public access points, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the exact 5-mile Class II(III) reach, Echo gauge, Henefer put-in, Taggarts take-out, Croyden bridge/portage, Taggarts Falls, private-property caveats, and current 360 cfs medium-runnable context.
  - Utah WRI still describes the Taggarts take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking and unclear unified rules. Utah Commerce Advisory Opinion 286 adds caution by documenting county/private boundary and right-of-way dispute context around the Taggart takeout.
  - No route was added. Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates`. Do not ship from inferred river-line coordinates, the supplemental Outbound coordinate, or a generic Taggarts locality.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because no app route code changed.

- 2026-05-30 21:10 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, still last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, public access points, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still provides strong route-shape and threshold support for the exact 5-mile Class II(III) reach, with Echo gauge context and current 360 cfs medium-runnable context.
  - No new official/manager/GIS source-backed endpoint coordinates or current access legitimacy surfaced for the Taggarts river-right take-out below Taggarts Falls. Utah WRI still describes the take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking and unclear unified rules.
  - Shell USGS Water Services IV fetches for `10132000` and the already-live Green River `09234500` gauge again failed unable to connect from this runtime.
  - No route was added. Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates`. Do not ship from inferred river-line coordinates, the supplemental Outbound coordinate, or a generic Taggarts locality.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because no app route code changed.

- 2026-05-30 20:40 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, public access points, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still provides strong route-shape and threshold support for the exact 5-mile Class II(III) reach, but no new official/manager/GIS source-backed endpoint coordinates or current access legitimacy surfaced for the Taggarts river-right take-out below Taggarts Falls.
  - Shell USGS Water Services IV fetches for `10132000` and the already-live Green River `09234500` gauge again failed unable to connect from this runtime.
  - No route was added. Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates`. Do not ship from inferred river-line coordinates, the supplemental Outbound coordinate, or a generic Taggarts locality.
  - Utah WRI's prior access context still describes the Taggarts take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking and unclear unified rules.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because no app route code changed.

- 2026-05-30 20:39 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the exact 5-mile Class II(III) reach, Echo gauge, Henefer put-in, Taggarts take-out, Croyden bridge/portage, Taggarts Falls, private-property caveats, and current 360 cfs medium-runnable context.
  - Official USGS WDFN graph context for `10132000` still exposed the monitoring-location graph shell and data-in-last-7-days framing, but this pass did not obtain a direct Water Services JSON confirmation.
  - No route was added. Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates` because source-backed endpoint coordinates and current access legitimacy remain unresolved for the Taggarts river-right take-out below Taggarts Falls. Do not ship from inferred river-line coordinates, the supplemental Outbound coordinate, or a generic Taggarts locality.
  - Utah WRI's prior access context still describes the Taggarts take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because no app route code changed.

- 2026-05-30 20:09 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the exact 5-mile Class II(III) reach, Echo gauge, Henefer put-in, Taggarts take-out, Croyden bridge/portage, Taggarts Falls, private-property caveats, and current 308 cfs medium-runnable context.
  - Official USGS WDFN graph context for `10132000` still exposed the monitoring-location graph shell, but the automation shell Water Services IV fetch again failed unable to connect.
  - No route was added. Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates` because source-backed endpoint coordinates and current access legitimacy remain unresolved for the Taggarts river-right take-out below Taggarts Falls. Do not ship from inferred river-line coordinates, the supplemental Outbound coordinate, or a generic Taggarts locality.
  - Utah WRI still describes the Taggarts take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because no app route code changed.

- 2026-05-30 19:39 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the exact 5-mile Class II(III) reach, Echo gauge, Henefer put-in, Taggarts take-out, Croyden bridge/portage, Taggarts Falls, private-property caveats, and current 360 cfs medium-runnable context.
  - Official USGS legacy current conditions for `10132000` still showed same-day May 30, 2026 observations of 360 cfs and 2.71 ft at 12:00 MDT, but the automation shell Water Services IV fetch again failed unable to connect.
  - No route was added. Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates` because source-backed endpoint coordinates and current access legitimacy remain unresolved for the Taggarts river-right take-out below Taggarts Falls. Do not ship from inferred river-line coordinates, the supplemental Outbound coordinate, or a generic Taggarts locality.
  - Utah WRI still describes the Taggarts take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because no app route code changed.

- 2026-05-30 19:09 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the exact 5-mile Class II(III) reach, Echo gauge, Henefer put-in, Taggarts take-out, rock garden, Croyden bridge/portage, Taggarts Falls, private-property caveats, and current 360 cfs medium-runnable context.
  - Official USGS WDFN graph context for `10132000` still exposes the monitoring-location graph shell, but the automation shell Water Services IV fetch again failed unable to connect. Future implementation should still confirm the product Water Services path from the app runtime.
  - No route was added. Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates` because source-backed endpoint coordinates and current access legitimacy remain unresolved for the Taggarts river-right take-out below Taggarts Falls. Do not ship from inferred river-line coordinates or a generic Taggarts locality.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because this pass changed only docs/ledger/memory.

- 2026-05-30 18:38 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the exact 5-mile Class II(III) reach, Echo gauge, Henefer put-in, Taggarts take-out, rock garden, Croyden bridge/portage, Taggarts Falls, and current runnable context.
  - Official USGS WDFN graph context for `10132000` exposes data types with data in the last 7 days, but the automation shell Water Services fetch again failed unable to connect. Future implementation should still confirm the product Water Services path from the app runtime.
  - No route was added. Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates` because source-backed endpoint coordinates and current access legitimacy remain unresolved for the Taggarts river-right take-out below Taggarts Falls. Do not ship from inferred river-line coordinates or a generic Taggarts locality.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because this pass changed only docs/ledger/memory.

- 2026-05-30 18:08 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the exact 5-mile Class II(III) reach, Echo gauge, Henefer put-in, Taggarts take-out, rock garden, Croyden bridge/portage, Taggarts Falls, and showed 360 cfs medium runnable.
  - Official USGS legacy current conditions for `10132000` showed same-day May 30, 2026 observations of 360 cfs and 2.71 ft at 12:00 MDT. Future implementation should still confirm the product Water Services path from the app runtime because prior shell Water Services fetches failed.
  - No route was added. Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates` because source-backed endpoint coordinates and current access legitimacy remain unresolved for the Taggarts river-right take-out below Taggarts Falls. Do not ship from inferred river-line coordinates or a generic Taggarts locality.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because this pass changed only docs/ledger/memory.

- 2026-05-30 17:39 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater remains useful route-shape and threshold support for the 5-mile Class II(III) Henefer-to-Taggarts reach, but no new official/manager/GIS source-backed endpoint coordinates surfaced for both endpoints, especially the Taggarts river-right take-out below Taggarts Falls.
  - No route was added. Shell USGS Water Services fetches for `10132000` and the already-live Green River `09234500` gauge still failed from this runtime, and opened official USGS context did not provide a fresh product-fetchable IV confirmation.
  - Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates`. Retry only after source-backed coordinates and current access/parking legitimacy are resolved for both endpoints, plus a successful product-fetchable gauge recheck.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because this pass changed only docs/ledger/memory.

- 2026-05-30 17:08 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the 5-mile Class II(III) reach, the Echo gauge relationship, Henefer put-in, Taggarts take-out, Croyden bridge/portage, Taggarts Falls, and search-visible 308 cfs medium-runnable context.
  - No route was added. Shell USGS Water Services fetches for `10132000` and the already-live Green River `09234500` gauge still failed from this runtime, and no new official/manager/GIS source-backed coordinate evidence surfaced for both endpoints.
  - Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates`. Utah WRI still describes the Taggarts take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking.
  - Validation: ledger JSON parse passed and git diff --check passed with line-ending warnings only. No npm validation was run because this pass changed only docs/ledger/memory.

- 2026-05-30 16:39 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the 5-mile Class II(III) reach, the Echo gauge relationship, Henefer put-in, Taggarts take-out, rock garden, Croyden bridge/portage, Taggarts Falls, and a 360 cfs medium-runnable reading.
  - No route was added. Shell USGS Water Services fetch for `10132000` still failed from this runtime, and no new official/manager/GIS source-backed coordinate evidence surfaced for both endpoints.
  - Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates`. Utah WRI still describes the Taggarts take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because this pass changed only docs/ledger/memory.

- 2026-05-30 16:09 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the 5-mile Class II(III) reach, the Echo gauge relationship, Henefer put-in, Taggarts take-out, rock garden, Croyden bridge/portage, Taggarts Falls, and search-visible 308 cfs medium-runnable context.
  - No route was added. Shell USGS Water Services fetch for `10132000` still failed from this runtime, and no new official/manager/GIS source-backed coordinate evidence surfaced for both endpoints.
  - Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates`. Utah WRI still describes the Taggarts take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because no app route code changed.

- 2026-05-30 15:39 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the 5-mile Class II(III) reach, the Echo gauge relationship, Henefer put-in, Taggarts take-out, rock garden, Croyden bridge/portage, and Taggarts Falls.
  - No route was added. Shell USGS Water Services fetch for `10132000` still failed from this runtime, the opened USGS daily-values page did not provide a fresh product-fetchable IV confirmation, and no new official/manager/GIS source-backed coordinate evidence surfaced for both endpoints.
  - Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates`. Utah WRI still describes the Taggarts take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking.
  - Validation: ledger JSON parse passed and `git diff --check` passed with line-ending warnings only. No npm validation was run because no app route code changed.

- 2026-05-30 15:08 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater still documents the 5-mile Class II(III) reach, the Echo gauge relationship, and a 360 cfs medium-runnable reading, with recent trip-report context around 205 cfs low/scrapy and 250+ cfs better for packrafts.
  - No route was added. Shell USGS Water Services fetch for `10132000` still failed from this runtime, and no new official/manager/GIS source-backed coordinate evidence surfaced for both endpoints.
  - Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates`. The Taggarts river-right take-out below Taggarts Falls remains the blocker; do not infer a coordinate from the river line or a generic Taggarts locality.

- 2026-05-30 14:39 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. American Whitewater again documents the 5-mile Class II(III) reach, the Echo gauge relationship, and a 360 cfs medium-runnable reading, with recent trip-report context around 205 cfs low/scrapy and 250+ cfs better for packrafts.
  - No route was added. Shell USGS Water Services fetch for `10132000` still failed from this runtime, and the source-backed coordinate/access blocker remains unresolved, especially the Taggarts river-right take-out below Taggarts Falls.
  - Kept the ledger status for `ut-weber-river-henefer-taggarts` as `needs_manual_coordinates`. Utah WRI still describes the take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking. Retry only after exact manager/AW/GIS coordinates and current access/parking legitimacy are resolved for both endpoints, plus a fresh product-fetchable gauge check.

- 2026-05-30 14:09 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. Official USGS legacy current conditions for `10132000` Weber River at Echo now show same-day values of 360 cfs / 2.71 ft at 2026-05-30 12:00 MDT, and American Whitewater shows the same Echo-gauge flow as medium runnable.
  - No route was added because exact source-backed endpoint coordinates remain unresolved, especially the Taggarts river-right take-out below Taggarts Falls. Utah WRI describes the take-out as county-owned old highway off the Taggart Exit, not an officially established boat ramp, with limited/congested parking.
  - Updated the ledger status for `ut-weber-river-henefer-taggarts` from `no_live_gauge` back to `needs_manual_coordinates`. Retry only after official GIS/map data, AW map feature coordinates, DWR Fish Utah/WMA data, county access data, or similarly strong source-backed evidence resolves both endpoints and confirms current access/parking legitimacy.

- 2026-05-30 13:39 America/Chicago: Conservative no-add pass.
  - Reconciled live inventory and confirmed the only Utah route remains `green-river-flaming-gorge-dam-little-hole`. No duplicate was added.
  - Rechecked Utah DWR stream-access guidance, last updated March 10, 2026. Weber access remains sensitive around lawful access points, floating without stopping, private beds/banks, and the upper Weber special case.
  - Rechecked `ut-weber-river-henefer-taggarts`. AW still supports the 5-mile Class II(III) route shape, Echo gauge relationship, Henefer/Exit 112 put-in context, Taggarts/Exit 108 take-out context, Croyden bridge/portage, Taggarts Falls, and recent low/scrapy-to-better flow reports.
  - No route was added because the live-gauge gate no longer clears. Search-visible official USGS `10132000` metadata shows discharge and gage-height records ending April 17, 2026; the WDFN page exposed only monitoring-location/legacy-page context during maintenance; and shell Water Services requests could not connect from this runtime.
  - The prior coordinate blocker also remains, especially the Taggarts river-right take-out below Taggarts Falls. Updated the ledger status for `ut-weber-river-henefer-taggarts` from `needs_manual_coordinates` to `no_live_gauge`; retry only with a product-fetchable current gauge or approved AW/local live-data adapter plus source-backed endpoint coordinates.

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
