# Farmington River route-family review — Connecticut — 2026-10-07

## Search Console and catalog evidence

The Search Console Web Performance report filtered to `farmington-river` shows 0 clicks and 0 impressions for April 28–October 4, 2026. That is no observed search demand in the available window, not a per-page indexing diagnosis. The current catalog has six endpoint combinations and the overlap queue groups them as a high-priority route-family review with 30 geometry findings.

## Source mismatch requiring correction before consolidation

The current route file assigns `farmington-river-peoples-forest-181-318` a Route 181/318 take-out at `41.878549, -72.958845`. The Farmington River Coordinating Committee's current access map identifies the Route 181/318 Bridge (Access Point 8) at `41.9129, -72.986908`, roughly 2.8 miles away. The existing access-point quality audit matches the stored coordinate to the East Branch Farmington River, while the official access map places the bridge on the West Branch access chain.

The same route file assigns Lake McDonough at `41.867099, -72.954567`; the official map identifies Lake McDonough (Access Point 9) at `41.904718, -72.956449`, roughly 2.6 miles away. The FRCC map treats Lake McDonough as a separate reservoir access with a day-boat permit. The 2020 upper water-trail guide describes the Route 181/318 bridge as a West Branch access and the downriver class I–II route continuing toward New Hartford, while listing Lake McDonough separately as a lake launch.

Three current options use Lake McDonough as a route endpoint: `farmington-river-181-318-lake-mcdonough`, `farmington-river-peoples-forest-lake-mcdonough`, and `farmington-river-riverton-lake-mcdonough`. Each currently inherits the Riverton West Branch gauge and score. The source maps do not establish a continuous downriver connection from the West Branch access chain to the Lake McDonough reservoir; any road transfer, portage, or separate lake outing needs to be stated and verified before those options are presented as scored river trips.

There is also a mileage conflict to resolve after the endpoints are corrected. The FRCC Recreation Area #2 map describes the broader Access Point 5–10 section as 8 miles. The catalog currently assigns 11.0 miles to Riverton (AP6)–Route 181/318 (AP8), a subset of that mapped corridor. The exact access numbering and route trace need to be reconciled before changing the number; this review does not guess a replacement distance.

## Next correction sequence

1. Replace the Route 181/318 and Lake McDonough coordinates with the official access anchors, then verify the actual water-entry points and river connectivity.
2. Reconcile distance and route geometry against a source-matched trace. Keep reservoir access, mandatory portages, day-boat permits, and any vehicle transfer explicit.
3. Reassess whether Lake McDonough combinations are valid public river trips and whether the Riverton gauge can support any score for them.
4. Once the route model is correct, keep useful documented reaches as focused pages and consolidate only the overlapping combinations. Preserve valid choices on the hub.

This is a route-data quality finding, not proof of a Google indexing cause. No Farmington pages or route options were changed in this review.

## Sources

- Farmington River Coordinating Committee, [Hartland to New Hartford recreation map](https://farmingtonriver.org/wp-content/uploads/2026/03/619c00c50fd8f88b63cc717e_FRCC_RecArea2.pdf) and [full access-point map](https://farmingtonriver.org/wp-content/uploads/2026/03/619c00ea775fd35dd36e0877_FRCC_RecFull.pdf)
- Farmington River Coordinating Committee, [2020 Upper Farmington water-trail access guide](https://uploads-ssl.webflow.com/60be5c583edf8d9a6066a398/60d4eb52a81056715b382435_FarmRivMapInsidePRINT2020.pdf)
- Town of Riverton, [Canoeing and kayaking access and flow guidance](https://www.rivertonct.com/product/canoeing-kayaking)
- Connecticut State Parks, [People's State Forest boating information](https://ctparks.com/parks/peoples-state-forest)
- USGS, [West Branch Farmington River at Riverton](https://waterdata.usgs.gov/monitoring-location/USGS-01186000/)
