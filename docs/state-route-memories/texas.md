# Texas Route Memory

Last summarized: 2026-06-26 09:55 America/Chicago / 2026-06-26 14:55 UTC.

## Current Inventory

- Live routes: 7.
- Implemented routes: `village-creek-fm418-sh327`, `village-creek-sh327-baby-galvez`, `village-creek-baby-galvez-us-96`, `village-creek-us-96-state-park`, `guadalupe-river-fm766-sh72`, `south-llano-river-state-park-junction-city-park`, and `south-llano-river-cupgrass-junction-city-park`.
- Ledger candidates: 11 Texas-specific records, all marked `added`.

## Status

Texas still has two solid TPWD-first source families in V2, but South Llano no longer needs six overlapping slugs from the same four-access chain. The family now keeps only the two canonical continuations that matter for users: the full official state-park-to-town trail and the longer Cupgrass continuation through the same bridge-portage corridor. Village Creek remains the second clean family: TPWD plus Big Thicket NPS provide the public access chain, exact route segmentation, camping and hazard context, and direct same-day USGS `08041500` support, while the historic Texas River Flows table supplies the conservative `200 cfs` minimum-only floor.

## Current Guidance

- Keep future Texas route work TPWD-first whenever possible: paddling-trail pages, leased-access pages, state-park pages, and direct USGS gauges are still the cleanest trust-first package.
- Treat South Llano as saturated unless a future add introduces a materially different public access package, a stronger exact-route image, or a clearly new official trail segment. Do not recreate the deleted short-split permutations from the same Cupgrass / State Park / Flatrock / Junction chain.
- Village Creek is largely exhausted for adjacent public segments. Do not duplicate `fm418-sh327`, `sh327-baby-galvez`, `baby-galvez-us-96`, or `us-96-state-park` unless a materially different overnight or access package appears.
- Treat the Texas threshold story as the weak link, not access. Both South Llano and Village Creek still ship as conservative `minimum-only` routes because the numeric floor comes from legacy/community tables rather than a modern manager-published exact-route band.
- Keep Village Creek hazard messaging attached to all four trail splits: free-flowing rain response, snags/logjams, shallow sandbars near the floor, private-bank limits, and flood-sensitive access. Keep the alligator note on the lower `us-96-state-park` segment.
- Keep South Llano hazard messaging attached to the two surviving canonical slugs: low-water scraping, strainers, quick post-rain rises, private-bank limits, and the mandatory portage around the damaged bridge inside South Llano River State Park. The canonical trip-detail entries now carry intermediate access points for State Park, Flatrock, and Junction so the shorter deleted splits are still discoverable as legal bailout or shuttle options.
- Keep image expectations tight. The Texas families were reviewed through bounded TPWD / NPS or TPWD / TRPA / Commons / USGS searches, and no clearly rights-clean exact-route paddling image was selected for the South Llano slugs.

## Latest Run

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
