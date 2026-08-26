# West Virginia Route Saturation Plan

Updated 2026-08-26. This is the follow-on plan to the gauge-first research plan in [`west-virginia-route-research-plan.md`](./west-virginia-route-research-plan.md).

## Baseline

The current catalog has 43 West Virginia route cards:

- New River: 5
- Greenbrier River: 5
- Cheat River: 4
- Tygart Valley River: 1
- Cacapon River: 1
- Elk River: 3
- Big Coal River: 5
- Coal River: 3
- Little Coal River: 3
- West Fork River: 4
- Gauley River: 1
- Guyandotte River: 8

The research ledger has decisions for 28 priority gauges and 46 bounded route candidates across 11 corridors; all 46 have numeric threshold decisions and 41 currently advance. The next saturation step is therefore not to add arbitrary mileage; it is to turn the remaining route-capable gauges into public-access pairs with an auditable threshold, a safety profile, and complete logistics.

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

The two strategic cards already researched (Tygart Valley Falls and upper Cacapon) are now in the public route order. **Wave 1A and 1C are implemented** as `wv-elk-webster-springs-clifton-ford` and `wv-elk-king-shoals-queen-shoals`; both have distinct public endpoint coordinates, canonical geometry, safety/camping notes, and route-specific images. Wave 1B remains gated on confirming a distinct Sandy Beach endpoint and avoiding duplicate coverage. **Wave 2 B-1 through B-5, L-1/L-2/L-3/L-4, and Coal C-2/C-3 are implemented** as `wv-big-coal-whitesville-orgas`, `wv-big-coal-orgas-john-slack`, `wv-big-coal-john-slack-dartmont`, `wv-big-coal-dartmont-sproul`, `wv-big-coal-sproul-lions-park`, `wv-little-coal-madison-donald-kuhn`, `wv-little-coal-donald-kuhn-waterways`, `wv-little-coal-waterways-corridor-g`, `wv-coal-meadowood-lower-falls`, `wv-coal-lower-falls-st-albans`, and `wv-coal-forks-lions-park`; B-1/B-2/B-4/B-5 use the Ashford gauge as an upstream/downstream proxy as labeled, B-3 uses the near-reach Ashford reading, L-1/L-2/L-3 use the Danville gauge (direct for L-1, upstream proxy for L-2/L-3), and C-2/C-3/L-4 use the Tornado gauge (same-reach near C-2, upstream proxy for C-3/L-4). The route-family screens are conservative USGS-statistics inferences where no official range is published. All eleven have Coal River Water Trail access, safety/camping notes, geometry, and image coverage. B-5 preserves the brochure's 4-mile Lock 4 option as a documented decision point while publishing the full 6-mile Alum Creek Lions Club Park variant; C-2/C-3 retain the Upper Falls/Lower Falls boundary and do not imply a dam portage. L-3/L-4 use the WVDNR-listed The Forks of Coal access because the brochure's printed Corridor G longitude lands off-channel near Fuquay Creek; the brochure's distance and Lock 4 decision points remain visible. **Wave 3 Good Hope–West Milford and Worthington–Monongah are now implemented** as `wv-west-fork-good-hope-west-milford` and `wv-west-fork-worthington-monongah`, with Guardians-documented public floats, proxy gauges, safety/camping notes, geometry, and route imagery.

The Wave 3 cohort now also includes the implemented Weston–Jackson’s Mill route (`wv-west-fork-weston-jacksons-mill`) and the Jackson’s Mill–Good Hope route (`wv-west-fork-jacksons-mill-good-hope`). Weston–Jackson’s Mill is a 5.5-mile Guardians-documented float with a no-ramp public-parking carry and direct Weston stage gauge; Jackson’s Mill–Good Hope is 10.6 miles derived from published river-mile references and retains a verify-before-launch mileage note. **The natural-flow Gauley Curtin Bridge–Persinger Creek route is now implemented** as `wv-gauley-curtin-persinger`, with exact WVU access coordinates, direct Craigsville stage/discharge telemetry, high-water Class IV escalation, and NPS imagery; scheduled Upper/Lower Gauley releases remain deferred. **The New River Thurmond–Cunard route is also implemented** as `wv-new-thurmond-cunard`, with geometry resolving the published 7.2-mile reach and an explicit NPS advanced/expert safety boundary. **The lower Greenbrier Willowwood–Bellepoint route is now implemented** as `wv-greenbrier-willowwood-bellepoint`, using WVDNR's official Willowwood Greenbrier and Bellepoint New River access assignments to resolve the confluence ambiguity and AW's 5.4-mile geometry for the route line. **The Elk River Frametown–Duck route is now implemented** as `wv-elk-frametown-duck`, using the direct near-put-in Frametown gauge, WVDNR/Elk River Water Trail endpoints, and a conservative local stage screen that does not transfer the Down Elk whitewater band.

**The Guyandotte Pineville–Baileysville route is now implemented** as `wv-guyandotte-pineville-baileysville`, using the 13-mile WVDNR float listing, the new Willow Street/SR 97 Pineville ramp, a direct Pineville USGS discharge gauge, a conservative local screen, and a regional Guyandotte paddling image. The Baileysville inventory coordinate is an access anchor roughly 600 feet from the generalized NHD centerline, so the card keeps a local visual/carry verification gate rather than silently moving the official coordinate. **The downstream Baileysville–Guyandotte Campground route is also implemented** as `wv-guyandotte-baileysville-rd-bailey-campground`, using WVDNR’s 5.5-mile float listing, the USGS Baileysville station, USACE developed-camping/boat-launch context, and an explicit stop before R.D. Bailey lake/tailwater hazards.

**The upper Guyandotte Mullens–Pineville route is now implemented** as `wv-guyandotte-mullens-pineville`, using WVDNR’s 11-mile float listing, both public pull-off/access anchors, a downstream Pineville gauge proxy, Class 2+ water-trail context, and the same explicit downstream boundary.

### Wave 1 — Elk River Water Trail (highest information density)

The Elk River has an approved water trail, a public-access chain, and four route-capable gauge decisions. The state-park page describes the trail as a 73-mile paddling corridor, while the regional water-trail map publishes public access coordinates. American Whitewater supplies a two-sided stage screen for the technical upper reach.

| Priority | Candidate | Gauge | Evidence gate before data entry |
| --- | --- | --- | --- |
| 1A | Webster Springs Park to Sandy Beach / CR 7 | USGS 03197000, Elk River below Webster Springs | Confirm the exact Sandy Beach/CR 7 public endpoint coordinate and whether the route should use the shorter low-water “Way Down Elk” variant. AW documents 4.5–8.0 ft for Down Elk. |
| 1B | Sandy Beach to Clifton Ford / CR 7 bridge | USGS 03197000 | Confirm that the endpoint is distinct from 1A, publish the route mileage, and retain the AW low-water shortened-run caveat. |
| 1C | King Shoals to Queen Shoals | USGS 03197000, Elk River at Queen Shoals | **Implemented.** WVDNR supplies the 3.5-mile float listing; the product uses a conservative 4.5–8.0 ft inferred screen and keeps the source caveat visible. |
| 1D | Queen Shoals to Clendenin public access | USGS 03197000 | Confirm the intended Clendenin access (exclude closed Mink Shoals), endpoint parking hours, and a conservative flatwater threshold from USGS history plus trail guidance. |
| 1E | **Implemented:** Frametown Bridge to Duck (`wv-elk-frametown-duck`) | USGS 03196600, Elk River near Frametown | Direct near-put-in stage gauge; WVDNR lists the nine-mile section and the public endpoint pair. Numeric screen is a conservative local inference, not an official runnable range; do not reuse the Down Elk band. |

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
12. **Implemented in Wave 3:** West Fork River: Weston to Jackson’s Mill (`wv-west-fork-weston-jacksons-mill`), Good Hope to West Milford (`wv-west-fork-good-hope-west-milford`), Worthington to Monongah (`wv-west-fork-worthington-monongah`), and Jackson’s Mill to Good Hope (`wv-west-fork-jacksons-mill-good-hope`).
13. **Implemented in Wave 4:** Natural-flow Gauley River: Curtin Bridge to DNR Persinger Creek (`wv-gauley-curtin-persinger`), with a strict boundary excluding scheduled-release products.
14. **Implemented in Wave 5:** New River: Thurmond to Cunard (`wv-new-thurmond-cunard`), with generated geometry resolving the 7.2-mile route length and NPS advanced/expert framing.
15. **Implemented in Wave 6:** Lower Greenbrier: Willowwood to Bellepoint (`wv-greenbrier-willowwood-bellepoint`), with WVDNR endpoint-river reconciliation, AW reach geometry, and a confluence/terminal-New safety boundary.

Gate: recover exact brochure coordinates, confirm current public parking/land manager, and establish route-specific numeric screens for USGS 03198500, 03199000, and 03200500.

### Wave 3 — West Fork River Water Trail

The West Fork has five route-capable gauges and WVDNR-listed access points, but Stonewall Jackson tailwater regulation must be visible in every card. Start with lower-consequence public pairs and leave the regulated tailwater as a separately labeled product.

1. **Implemented:** Weston public parking below Weston Dam to Jackson’s Mill (`wv-west-fork-weston-jacksons-mill`), with a no-ramp carry and direct stage gauge.
2. **Implemented:** Good Hope to West Milford (`wv-west-fork-good-hope-west-milford`).
3. **Implemented:** Worthington City Park to Monongah (`wv-west-fork-worthington-monongah`).
4. **Implemented:** Jackson’s Mill Public Stream Access to Good Hope (`wv-west-fork-jacksons-mill-good-hope`), with river-mile-derived distance and incomplete-ramp caveat.
5. Stonewall tailwater to Bendale Bridge, with WVDNR-resolved endpoints; implementation remains gated on a public release/warning rule.

Gate: document the USACE/American Water release and warning procedure, check dams and portages, and avoid assuming natural-flow behavior below Stonewall Jackson Dam. WVDNR now resolves the public endpoints as Stonewall Tail Waters and Bendale Bridge.

### Wave 4 — Natural-flow Gauley River

The Curtin Bridge–Persinger Creek corridor is the first Gauley card because it is above Summersville Lake, has exact public-access coordinates from WVU, and uses the natural-flow Craigsville gauge. Keep its Class II–III(IV) escalation visible and do not conflate it with the scheduled-release Upper or Lower Gauley products.

1. **Implemented:** Curtin Bridge to DNR Persinger Creek (`wv-gauley-curtin-persinger`).
2. Scheduled-release Upper/Lower Gauley routes remain deferred until a current-year primary release schedule and release-window adapter are available.

### Wave 5 — New River Thurmond-to-Cunard transition

The Thurmond–Cunard gap is now publishable because the public endpoint pair is documented by American Whitewater/NPS and the generated NHD network trace measures approximately 7.24 miles, matching AW’s 7.2-mile reach length. Preserve the NPS advanced/expert framing below Thurmond, Surprise as the standout Class III hazard, and Cunard Road’s seasonal/one-lane access caveat.

1. **Implemented:** Thurmond River Access to Cunard River Access (`wv-new-thurmond-cunard`).

### Wave 7 — Guyandotte River Water Trail

The Guyandotte is the next information-rich southern West Virginia corridor: WVDNR recognizes an approved water trail, publishes a 13-mile Pineville–Baileysville float, and opened a new Pineville gravel ramp in 2024. The Pineville USGS station supplies a direct live discharge screen. The first card uses the public Pineville and Baileysville access anchors and keeps the downstream R.D. Bailey lake/tailwater boundary explicit.

1. **Implemented:** Pineville public access to Baileysville public access (`wv-guyandotte-pineville-baileysville`).
2. **Implemented:** Baileysville public access to Guyandotte Campground (`wv-guyandotte-baileysville-rd-bailey-campground`).
3. **Implemented:** Mullens public pull-off to Pineville public access (`wv-guyandotte-mullens-pineville`).
4. **Implemented:** Branchland public access to West Hamlin public concrete ramp (`wv-guyandotte-branchland-west-hamlin`). Map 5 identifies this as Trip 18, a 5.7-mile low-gradient float; USGS 03204000 is a direct stage gauge at the Branchland start. The coordinate audit places the endpoints within the mapped waterbody but 180–219 feet from the generalized NHD flowline, so the physical carries remain a day-of verification item.
5. **Implemented:** West Hamlin public access to Salt Rock public access (`wv-guyandotte-west-hamlin-salt-rock`). Map 5 identifies this as Trip 19, a 2.8-mile float suitable for most boats; USGS 03204000 is retained as an upstream same-river stage proxy.
6. **Implemented:** Salt Rock public access to Barboursville Park public access (`wv-guyandotte-salt-rock-barboursville`). Map 5 identifies this as Trip 20, a 16.8-mile hard-paddling day with a steep, slippery Barboursville carry; USGS 03204000 remains an upstream stage proxy.
7. **Implemented:** Barboursville Park public access to Farmdale Bridge public access (`wv-guyandotte-barboursville-farmdale`). Map 5 identifies this as Trip 21, a 2.7-mile float ending at a boat-slide access; USGS 03204000 remains an upstream stage proxy.
8. **Implemented:** Farmdale Bridge public access to the Guyandotte–Ohio confluence ramp (`wv-guyandotte-farmdale-ohio`). Map 5 identifies this as Trip 22, a 7.5-mile mostly urban float; the card ends at the Guyandotte ramp and does not authorize entering the Ohio River navigation channel.

Gate for the next Guyandotte batch: verify the Baileysville carry/parking against the generalized NHD offset, then research the next lower-water-trail pairs toward West Hamlin, Salt Rock, Barboursville, and the Ohio confluence with their own endpoint, gauge, water-quality, and dam-boundary evidence. Do not transfer the upper-river screens or the American Whitewater Simon–lake Class III warning without reach-specific calibration.

## Deliberate deferrals

- **Gauley release-dependent routes:** do not score until a supported live release/CWMS source and an explicit release-window adapter exist.
- **Bluestone Pipestem to Bluestone State Park:** the State Parks replacement-tram article now confirms a dedicated freight car capable of carrying kayaks, but the route remains blocked until current public booking, size, fee, weather-shutdown, and river-access rules are explicit.
- **Upper Greenbrier Durbin to Hosterman:** proxy-only at the available gauge and not ready for a route card.
- **Greenbrier Willowwood to Bellepoint:** resolved and implemented as a confluence route; the card keeps the terminal New River boundary explicit.
- **Cheat Hannahsville to Riverview and Riverview to Rowlesburg:** blocked until the endpoint/ownership and scope caveats are closed.

## Working order and review gates

For each wave, work in this order: (1) endpoint and land-manager verification, (2) gauge-to-reach relationship, (3) numeric threshold, (4) hazards and closures, (5) camping and shuttle, (6) imagery, (7) geometry and generated access registry, and (8) focused route/safety/gallery/TypeScript checks. A candidate that fails an access or threshold gate remains in the ledger as blocked rather than becoming an inferred route.

The next concrete batch is **Guyandotte lower water-trail saturation**, beginning with Barboursville–Farmdale and the Logan/Man access chain after reach-specific endpoint and flow evidence is complete. The implemented Pineville–Baileysville card deliberately stops before the regulated R.D. Bailey lake/tailwater context and does not transfer the nearby Simon–lake Class III warning or its gauge band. Stonewall tailwater remains blocked until a stable public release/warning procedure and release-aware threshold adapter are documented. Keep the Upper Falls portage boundary explicit for any Coal mainstem card. Keep Wave 1B (Sandy Beach to Clifton Ford) gated until the informal Sandy Beach endpoint is proven distinct and publicly usable; do not implement Wave 1D until the intended Clendenin access is verified and not the closed Mink Shoals site.
