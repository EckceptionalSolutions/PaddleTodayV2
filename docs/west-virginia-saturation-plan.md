# West Virginia Route Saturation Plan

Updated 2026-08-26. This is the follow-on plan to the gauge-first research plan in [`west-virginia-route-research-plan.md`](./west-virginia-route-research-plan.md).

## Baseline

The current catalog has 16 West Virginia route cards:

- New River: 4
- Greenbrier River: 4
- Cheat River: 4
- Tygart Valley River: 1
- Cacapon River: 1
- Elk River: 2

The research ledger has decisions for 24 priority gauges and 20 bounded route candidates. The next saturation step is therefore not to add arbitrary mileage; it is to turn the remaining route-capable gauges into public-access pairs with an auditable threshold, a safety profile, and complete logistics.

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

The two strategic cards already researched (Tygart Valley Falls and upper Cacapon) are now in the public route order. **Wave 1A and 1C are implemented** as `wv-elk-webster-springs-clifton-ford` and `wv-elk-king-shoals-queen-shoals`; both have a direct 03197000 gauge relationship, distinct public endpoint coordinates, canonical geometry, safety/camping notes, and route-specific images. Wave 1B remains gated on confirming a distinct Sandy Beach endpoint and avoiding duplicate coverage.

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

1. Big Coal: Whitesville to Orgas.
2. Big Coal: Orgas to John Slack Park.
3. Little Coal: Madison City Park to Danville.
4. Coal mainstem: Meadowood Park to Lower Falls, only after the portage boundary is mapped.

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

The next concrete batch is **Wave 1B (Sandy Beach to Clifton Ford)**. Do not implement 1B or 1D until the endpoint identity and closure checks are distinct enough to prevent duplicate or closed-access cards.
