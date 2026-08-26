# West Virginia Route Saturation Plan

Updated 2026-08-26. This is the follow-on plan to the gauge-first research plan in [`west-virginia-route-research-plan.md`](./west-virginia-route-research-plan.md).

## Baseline

The current catalog has 27 West Virginia route cards:

- New River: 4
- Greenbrier River: 4
- Cheat River: 4
- Tygart Valley River: 1
- Cacapon River: 1
- Elk River: 2
- Big Coal River: 5
- Coal River: 3
- Little Coal River: 3

The research ledger has decisions for 24 priority gauges and 31 bounded route candidates across 7 corridors. The next saturation step is therefore not to add arbitrary mileage; it is to turn the remaining route-capable gauges into public-access pairs with an auditable threshold, a safety profile, and complete logistics.

## Saturation definition

A corridor counts as saturated only when it has:

1. at least one public put-in/take-out pair with coordinates and a closure/access check;
2. a live same-river USGS gauge, explicitly labeled direct or proxy;
3. a two-sided planning threshold with a source and a conservative watch-for note;
4. route-specific hazards, shuttle, camping/basecamp, and seasonal guidance;
5. a gallery image or an explicit documented image gap; and
6. canonical geometry plus route-data, safety, and gallery checks passing.

## Next implementation waves

### Current progress — 2026-08-26

The two strategic cards already researched (Tygart Valley Falls and upper Cacapon) are now in the public route order. **Wave 1A and 1C are implemented** as `wv-elk-webster-springs-clifton-ford` and `wv-elk-king-shoals-queen-shoals`; both have distinct public endpoint coordinates, canonical geometry, safety/camping notes, and route-specific images. Wave 1B remains gated on confirming a distinct Sandy Beach endpoint and avoiding duplicate coverage. **Wave 2 B-1 through B-5, L-1/L-2/L-3/L-4, and Coal C-2/C-3 are now implemented** as `wv-big-coal-whitesville-orgas`, `wv-big-coal-orgas-john-slack`, `wv-big-coal-john-slack-dartmont`, `wv-big-coal-dartmont-sproul`, `wv-big-coal-sproul-lions-park`, `wv-little-coal-madison-donald-kuhn`, `wv-little-coal-donald-kuhn-waterways`, `wv-little-coal-waterways-corridor-g`, `wv-coal-meadowood-lower-falls`, `wv-coal-lower-falls-st-albans`, and `wv-coal-forks-lions-park`; B-1/B-2/B-4/B-5 use the Ashford gauge as an upstream/downstream proxy as labeled, B-3 uses the near-reach Ashford reading, L-1/L-2/L-3 use the Danville gauge (direct for L-1, upstream proxy for L-2/L-3), and C-2/C-3/L-4 use the Tornado gauge (same-reach near C-2, upstream proxy for C-3/L-4). The route-family screens are conservative USGS-statistics inferences where no official range is published. All eleven have Coal River Water Trail access, safety/camping notes, geometry, and image coverage. B-5 preserves the brochure's 4-mile Lock 4 option as a documented decision point while publishing the full 6-mile Alum Creek Lions Club Park variant; C-2/C-3 retain the Upper Falls/Lower Falls boundary and do not imply a dam portage. L-3/L-4 use the WVDNR-listed The Forks of Coal access because the brochure's printed Corridor G longitude lands off-channel near Fuquay Creek; the brochure's distance and Lock 4 decision points remain visible.

### Wave 1 — Elk River Water Trail (highest information density)

The Elk River has an approved water trail, a public-access chain, and four route-capable gauge decisions. The state-park page describes the trail as a 73-mile paddling corridor, while the regional water-trail map publishes public access coordinates. American Whitewater supplies a two-sided stage screen for the technical upper reach.

| Priority | Candidate | Gauge | Evidence gate before data entry |
| --- | --- | --- | --- |
| 1A | Webster Springs Park to Sandy Beach / CR 7 | USGS 03197000, Elk River below Webster Springs | Confirm the exact Sandy Beach/CR 7 public endpoint coordinate and whether the route should use the shorter low-water “Way Down Elk” variant. AW documents 4.5–8.0 ft for Down Elk. |
| 1B | Sandy Beach to Clifton Ford / CR 7 bridge | USGS 03197000 | Confirm that the endpoint is distinct from 1A, publish the route mileage, and retain the AW low-water shortened-run caveat. |
| 1C | King Shoals to Queen Shoals | USGS 03197000, Elk River at Queen Shoals | **Implemented.** WVDNR supplies the 3.5-mile float listing; the product uses a conservative 4.5–8.0 ft inferred screen and keeps the source caveat visible. |
| 1D | Queen Shoals to Clendenin public access | USGS 03197000 | Confirm the intended Clendenin access (exclude closed Mink Shoals), endpoint parking hours, and a conservative flatwater threshold from USGS history plus trail guidance. |

Primary sources: [WVDNR water trails](https://wvdnr.gov/lands-waters/boating/), [West Virginia State Parks Elk River Trail](https://wvstateparks.com/park/elk-river-trail/), [Elk River Trail access map](https://braxtonwv.org/things-to-do/elk-river-water-trail/map/), [WVDNR District 3 access guide](https://wvdnr.gov/wp-content/uploads/2021/06/DNR_Wildlife_District3_FishingGuide_WEB.pdf), and [American Whitewater Down Elk](https://www.americanwhitewater.org/content/River/view/river-detail/2372/main).

### Wave 2 — Coal/Walhonde Water Trail

This is the best next multi-corridor expansion after Elk: the 2026 Coal River Water Trail brochure identifies a connected Big Coal, Little Coal, and Coal access chain, and the gauge ledger marks Ashford, Danville, and Tornado as route-capable. Prioritize two short, lower-consequence pairs first, then add the dam/portage boundary to every route card.

1. **Implemented:** Big Coal: Whitesville to Orgas (`wv-big-coal-whitesville-orgas`).
2. **Implemented:** Big Coal: Orgas to John Slack Park (`wv-big-coal-orgas-john-slack`).
3. **Implemented:** Big Coal: John Slack Park to Dartmont Park (`wv-big-coal-john-slack-dartmont`).
4. **Implemented:** Big Coal: Dartmont Park to Sproul Road (`wv-big-coal-dartmont-sproul`), with the Brier Creek trestle portage boundary.
5. **Implemented:** Little Coal: Madison City Park to Donald Kuhn (`wv-little-coal-madison-donald-kuhn`).
6. **Implemented:** Little Coal: Donald Kuhn to Upper Waterways Park (`wv-little-coal-donald-kuhn-waterways`).
7. **Implemented:** Big Coal: Sproul to Alum Creek Lions Club Park (`wv-big-coal-sproul-lions-park`), using the brochure's full 6-mile B-5 variant and retaining Lock 4 as the short option.
8. **Implemented:** Coal mainstem: Meadowood Park to Lower Falls (`wv-coal-meadowood-lower-falls`), with the Upper Falls Dam hard boundary and direct Tornado gauge.
9. **Implemented:** Coal mainstem: Lower Falls to St. Albans (`wv-coal-lower-falls-st-albans`), with the lower-river water-quality, traffic, and proxy-gauge caveats.
10. **Implemented:** Little Coal: Boone County Water Park to The Forks of Coal public access (`wv-little-coal-waterways-corridor-g`), correcting the brochure's off-channel bridge coordinate and retaining the upstream Danville proxy.
11. **Implemented:** Little Coal/Coal confluence: The Forks of Coal to Alum Creek Lions Club Park (`wv-coal-forks-lions-park`), with Lock 4 as an intermediate hazard/decision point.
12. Coal system: evaluate a West Fork River pair after confirming access and threshold evidence.

Gate: recover exact brochure coordinates, confirm current public parking/land manager, and establish route-specific numeric screens for USGS 03198500, 03199000, and 03200500.

### Wave 3 — West Fork River Water Trail

The West Fork has four route-capable gauges and WVDNR-listed access points, but Stonewall Jackson tailwater regulation must be visible in every card. Start with lower-consequence public pairs and leave the regulated tailwater as a separately labeled product.

1. Good Hope to West Milford.
2. Worthington City Park to Monongah.
3. Stonewall tailwater to the next verified public access, only with a regulation/release note.

Gate: join the WVDNR coordinates to current water-trail access names, check dams and portages, and avoid assuming natural-flow behavior below Stonewall Jackson Dam.

## Deliberate deferrals

- **Gauley release-dependent routes:** do not score until a supported live release/CWMS source and an explicit release-window adapter exist.
- **Bluestone Pipestem to Bluestone State Park:** blocked until the private-boat carriage policy for the Pipestem tram is explicit.
- **Upper Greenbrier Durbin to Hosterman:** proxy-only at the available gauge and not ready for a route card.
- **Greenbrier Willowwood to Bellepoint:** blocked until the confluence/backwater boundary and endpoint access are resolved.
- **Cheat Hannahsville to Riverview and Riverview to Rowlesburg:** blocked until the endpoint/ownership and scope caveats are closed.

## Working order and review gates

For each wave, work in this order: (1) endpoint and land-manager verification, (2) gauge-to-reach relationship, (3) numeric threshold, (4) hazards and closures, (5) camping and shuttle, (6) imagery, (7) geometry and generated access registry, and (8) focused route/safety/gallery/TypeScript checks. A candidate that fails an access or threshold gate remains in the ledger as blocked rather than becoming an inferred route.

The next concrete batch is **a West Fork River pair**, selected after confirming the Good Hope/West Milford or Worthington/Monongah endpoints and a defensible gauge relationship. Keep the Upper Falls portage boundary explicit for any mainstem card. Keep Wave 1B (Sandy Beach to Clifton Ford) gated until the informal Sandy Beach endpoint is proven distinct and publicly usable; do not implement Wave 1D until the intended Clendenin access is verified and not the closed Mink Shoals site.
