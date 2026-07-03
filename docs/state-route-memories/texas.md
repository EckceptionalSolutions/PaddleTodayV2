# Texas Route Memory

Last summarized: 2026-07-03 09:30 America/Chicago / 2026-07-03 14:30 UTC.

## Current Inventory

- Live routes: 10.
- Implemented routes: `village-creek-fm418-sh327`, `village-creek-sh327-baby-galvez`, `village-creek-baby-galvez-us-96`, `village-creek-us-96-state-park`, `village-creek-fm418-state-park`, `guadalupe-river-fm766-sh72`, `guadalupe-river-sh72-fm236`, `guadalupe-river-fm766-fm236`, `south-llano-river-state-park-junction-city-park`, and `south-llano-river-cupgrass-junction-city-park`.
- Ledger candidates: 11 Texas-specific records, all marked `added`.

## Status

Texas still has three strong TPWD-first source families in V2, but the same overlap warning remains: South Llano no longer needs six near-duplicate slugs from the same four-access chain, and Village Creek or Guadalupe should only grow when a materially different day or overnight package appears. Village Creek now includes both the adjacent short splits and one long official full-trail option because TPWD explicitly says the 20.9-mile run is too long for one day and supports free preserve overnight permits plus state-park camping at the finish. Guadalupe now has the full official Cuero trail and its lower continuation because TPWD publishes all three access points, a real hazard package, and a direct same-river gauge story.

## Current Guidance

- Keep future Texas route work TPWD-first whenever possible: paddling-trail pages, leased-access pages, state-park pages, and direct USGS gauges are still the cleanest trust-first package.
- Treat South Llano as saturated unless a future add introduces a materially different public access package, a stronger exact-route image, or a clearly new official trail segment. Do not recreate the deleted short-split permutations from the same Cupgrass / State Park / Flatrock / Junction chain.
- Village Creek is largely exhausted for adjacent public segments. Do not duplicate `fm418-sh327`, `sh327-baby-galvez`, `baby-galvez-us-96`, `us-96-state-park`, or `fm418-state-park` unless a materially different overnight or access package appears.
- Guadalupe is now close to saturated too. Do not mint more Cuero permutations unless they add a materially different public endpoint, camping package, or manager-backed threshold story beyond `fm766-sh72`, `sh72-fm236`, and `fm766-fm236`.
- Treat the Texas threshold story as the weak link, not access. Both South Llano and Village Creek still ship as conservative `minimum-only` routes because the numeric floor comes from legacy/community tables rather than a modern manager-published exact-route band.
- Keep the Guadalupe hazard split explicit: `fm766-sh72` and `fm766-fm236` retain the remnant-dam / mandatory-portage warning and should stay `advanced`, while `sh72-fm236` is the calmer lower continuation but still carries rainfall, wood, and private-bank cautions.
- Keep Village Creek hazard messaging attached to all four trail splits: free-flowing rain response, snags/logjams, shallow sandbars near the floor, private-bank limits, and flood-sensitive access. Keep the alligator note on the lower `us-96-state-park` segment.
- Keep Village Creek hazard messaging attached to the new full-trail slug too: free-flowing rain response, snags/logjams, shallow sandbars near the floor, preserve/private-bank limits, flood-sensitive access, and a strong warning that the full route is usually an overnight rather than a casual day float.
- Keep South Llano hazard messaging attached to the two surviving canonical slugs: low-water scraping, strainers, quick post-rain rises, private-bank limits, and the mandatory portage around the damaged bridge inside South Llano River State Park. The canonical trip-detail entries now carry intermediate access points for State Park, Flatrock, and Junction so the shorter deleted splits are still discoverable as legal bailout or shuttle options.
- Keep image expectations tight. The Texas families were reviewed through bounded TPWD / NPS or TPWD / TRPA / Commons / USGS searches, and no clearly rights-clean exact-route paddling image was selected for the new Guadalupe or Village Creek full-route slugs.

## Latest Run

- 2026-07-03 09:30 America/Chicago / 2026-07-03 14:30 UTC three-route add pass
  - Added `guadalupe-river-sh72-fm236`, `guadalupe-river-fm766-fm236`, and `village-creek-fm418-state-park`.
  - Qualification path: current TPWD pages still document the full Guadalupe Valley trail at `13.8` miles, its lower `SH 72 to FM 236` segment at `7.2` miles, and all three Cuero access coordinates; same-day USGS Water Services returned `408 cfs / 7.33 ft` for direct gauge `08175800` at `2026-07-03 07:30 CDT`; and the Texas River Flows Cuero row still supplies the conservative `200 cfs` minimum-only floor for the Gonzales-to-Victoria corridor. TPWD still warns about the remnant-dam portage above SH 72 and identifies Hwy 183 as an emergency take-out below SH 72, which is why the full route and upstream split stay `advanced` while the lower continuation stays `caution`.
  - Qualification path: current TPWD Village Creek pages still document the full trail at about `20.9` miles, say it is too long to paddle in one day, publish all five access coordinates, and note that free overnight camping permits are available at the Big Thicket visitor center; TPWD Village Creek State Park still publishes the canoe-launch coordinate plus campground and cabin support at the take-out; and same-day USGS Water Services returned `219 cfs / 3.65 ft` for direct gauge `08041500` at `2026-07-03 07:30 CDT`, just above the legacy `200 cfs` minimum-only floor.
  - No route-gallery image was added. `docs/river-image-source-audit.csv` records bounded TPWD / NPS / Commons / USGS review with no approved exact-route asset for the three new Texas slugs.

- 2026-06-26 09:55 America/Chicago / 2026-06-26 14:55 UTC cleanup pass
  - Consolidated the South Llano family from six slugs to two live canonicals: `south-llano-river-state-park-junction-city-park` and `south-llano-river-cupgrass-junction-city-park`.
  - Removed redundant short and chained variants `south-llano-river-cupgrass-state-park`, `south-llano-river-state-park-flatrock-lane`, `south-llano-river-flatrock-lane-junction-city-park`, and `south-llano-river-cupgrass-flatrock-lane` because they reused the same public corridor, gauge, threshold model, and hazard package without adding a materially different trip story.
  - Added intermediate `accessPoints` to the surviving trip-detail entries so State Park, Flatrock Lane Crossing, and Junction City Park remain explicit public bailout or shuttle anchors inside the canonical routes.
  - Removed stale South Llano image-audit rows for the deleted slugs.

- 2026-06-26 08:59 America/Chicago / 2026-06-26 13:59 UTC three-route add pass
  - Added `south-llano-river-cupgrass-flatrock-lane`, `south-llano-river-state-park-junction-city-park`, and `south-llano-river-cupgrass-junction-city-park`.
  - Qualification path: current TPWD pages still document Cupgrass to South Llano River State Park as about `9.3` miles, South Llano River State Park to Junction City Park as `6.3` miles, and South Llano River State Park to Flatrock Lane as `4.7` miles, while publishing exact coordinates for Cupgrass, South Llano River State Park, Flatrock Lane Crossing, and Junction City Park plus the required bridge portage inside the park. Same-day USGS Water Services returned `75.8 cfs / 2.25 ft` for direct gauge `08149900` at `2026-06-26 08:40 CDT`.
  - Threshold posture stays conservative `minimum-only` because the numeric floor still comes from Texas paddling-community guidance at `65 cfs` with broader `100-500 cfs` ideal context, while TPWD supplies the route-shape, access, and safety package.
  - No route-gallery image was added. `docs/river-image-source-audit.csv` records bounded TPWD / TRPA / Commons / USGS review with no approved exact-route asset.

- 2026-06-25 13:52 America/Chicago / 2026-06-25 18:52 UTC three-route add pass
  - Added `village-creek-sh327-baby-galvez`, `village-creek-baby-galvez-us-96`, and `village-creek-us-96-state-park`.
  - Qualification path: current TPWD and Big Thicket NPS pages still document the public Village Creek access chain and segment mileages of `3.37`, `7.1`, and `3.2` miles; NPS launch pages publish exact TX 327, Baby Galvez Road, and US 96 coordinates; TPWD Village Creek State Park pages publish the canoe-launch coordinate plus campground logistics; and same-day USGS Water Services returned `774 cfs / 6.89 ft` for direct gauge `08041500` at `2026-06-25 13:30 CDT`.
  - Threshold posture: conservative `minimum-only` using the historic Texas River Flows Village Creek / Kountze ladder at `200 / 400 / 700 / 1000 / 2000 cfs`, with current TPWD and NPS pages supplying route-shape, camping, and hazard context instead of a modern route-specific band.
  - No route-gallery image was added. `docs/river-image-source-audit.csv` records bounded TPWD / NPS / Commons / USGS review with no approved exact-route asset.
