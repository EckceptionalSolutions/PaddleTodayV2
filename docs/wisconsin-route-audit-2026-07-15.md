# Wisconsin Route Audit - 2026-07-15

## Scope

Audit and metadata backfill of the current Wisconsin route inventory after the July 14-15 expansion. The live runtime inventory contains 110 Wisconsin routes. `npm.cmd run routes:audit` passed for 665 total routes before the backfill.

## Summary

The Wisconsin data is not failing the route-quality audit: gauges, threshold models, source links, and trip details are present. The risk is product shape. Several new route families are now represented as many adjacent same-gauge cards where a single route card with `accessPoints` would be easier to understand, closer to the Rice Creek pattern, and less noisy in Explore.

The highest-priority consolidation target is the Lower Wisconsin around Muscoda and Boscobel. `wisconsin-river-muscoda-woodman` overlaps a corridor now already represented by `wisconsin-river-muscoda-blue-river`, `wisconsin-river-blue-river-boscobel`, and the consolidated `wisconsin-river-boscobel-bridgeport` card, which already carries Woodman as an alternate access point.

## Consolidation Recommendations

### Strong Candidates

- `wisconsin-river-muscoda-woodman`: remove as a standalone card or fold into the existing Lower Wisconsin access-planner chain. This is the clearest redundancy because the same practical corridor is already split into Muscoda-to-Blue-River, Blue-River-to-Boscobel, and Boscobel-to-Bridgeport with Woodman inside the access planner.
- `turtle-creek-east-creek-road-highway-140` + `turtle-creek-highway-140-sweet-allyn`: combine into an East-Creek-to-Sweet-Allyn card with Highway 140 as an intermediate access point. Same river, same gauge, direct adjacent endpoint, and short total distance.
- `fox-river-princeton-locks-city-landing` + `fox-river-princeton-white-river-locks`: combine into a Princeton-Lock-to-White-River-Lock card with Princeton Jefferson Street / Hiestand Park as the alternate access. Keep `fox-river-swan-lake-portage` separate because it is a different upstream/lake-marsh route shape and uses a weaker proxy posture.
- `platte-river-airport-platte-road` + `platte-river-platte-road-big-platte` + `platte-river-big-platte-banfield-bridge`: combine into an Airport-to-Banfield card with Platte Road and Big Platte Road as access planner points. The three cards share gauge, source family, route character, and access pattern.
- `eau-claire-river-clubhouse-ross` + `eau-claire-river-ross-drott`: combine into a Clubhouse-to-Drott card with Ross Avenue as an intermediate access. Keep `eau-claire-river-dells-park-clubhouse` separate because its Dells / whitewater-light risk and threshold posture differ.

### Consider, But Do Not Rush

- Namekagon Hayward-to-Trego chain: `namekagon-river-hayward-stinnett`, `namekagon-river-stinnett-springbrook`, `namekagon-river-springbrook-big-bend`, and `namekagon-river-big-bend-trego` are same-gauge NPS water-trail segments. They could become one or two multi-access cards, but the full 28.8-mile corridor may be too long for the app's normal day-route framing.
- Wisconsin River Pine-Island-to-Camp-Rest chain: `wisconsin-river-pine-island-portage`, `wisconsin-river-portage-dekorra`, and `wisconsin-river-dekorra-camp-rest` share the same Dells gauge and form a clean 18.9-mile access chain. Consolidation is plausible if the final card clearly preserves Pine Island no-camping and Portage/Dekorra operational caveats.
- Milwaukee Goeden-to-Waubedonia chain: `milwaukee-river-goeden-newburg` and `milwaukee-river-newburg-fredonia` can probably become one Goeden-to-Waubedonia card with Newburg as an alternate. Keep the downstream Waubedonia-to-Grafton card separate unless broader Milwaukee River cleanup is planned.

### Keep Separate

- Peshtigo, Pine, South Fork Flambeau, Brule, Popple, Wolf, and most St. Croix split cards are adjacent same-gauge chains, but they are whitewater, remote, rapid-specific, or official-section-specific enough that separate cards still carry real decision value. These should get better access planner metadata before they are collapsed.
- Sugar River should be reviewed after the higher-priority consolidations. There is adjacency, but Brodhead-to-Avon uses a different gauge and the upper/lower route families are not as cleanly redundant as Turtle, Platte, or Fox.

## Metadata Backfill

No Wisconsin route is missing a gauge site, threshold model, threshold source URL, evidence notes, source links, trip details, or endpoint coordinates.

Initial automated completeness scan found:

- 77 Wisconsin routes without `safetyProfile`.
- 77 Wisconsin routes without `riverTripDetails[slug].accessPoints`.
- 68 Wisconsin routes without `logistics.campingClassification`.
- 10 Wisconsin routes without an image-audit row:
  - `milwaukee-river-lime-kiln-village-park`
  - `menomonee-river-hoyt-park-bluemound`
  - `wisconsin-river-muscoda-blue-river`
  - `wisconsin-river-blue-river-boscobel`
  - `wisconsin-river-portage-dekorra`
  - `baraboo-river-wayside-kalepp`
  - `wisconsin-river-sauk-city-arena`
  - `wisconsin-river-arena-spring-green`
  - `wisconsin-river-spring-green-muscoda`
  - `wisconsin-river-dekorra-camp-rest`

The `accessPoints` gap is the most important product issue because it directly determines whether a route can act like Rice Creek instead of becoming multiple nearly adjacent cards.

Backfill completed in this pass:

- Added runtime Wisconsin trip-detail backfill for missing `accessPoints` arrays and `campingClassification` values, derived from existing put-in/take-out coordinates and camping copy.
- Added runtime Wisconsin safety-profile backfill for routes missing `safetyProfile`, derived from existing route summaries, threshold notes, caveats, and watch-for text.
- Added the 10 missing Wisconsin image-audit rows as explicit no-selected-image outcomes.
- Post-backfill scan: 0 Wisconsin routes missing `safetyProfile`, `accessPoints`, `campingClassification`, or image-audit coverage.

## Route-Type Review

An automated text scan flagged 17 Wisconsin cards with whitewater-like source language but no `routeType: 'whitewater'`. Many are false positives because they mention Class I riffles or use American Whitewater only as corroboration. The highest-confidence manual review item is `turtle-creek-highway-140-sweet-allyn`, because its threshold source is American Whitewater and current project guidance says AW-primary routes should be marked whitewater unless deliberately excepted.

## Recommended Order

1. Consolidate `wisconsin-river-muscoda-woodman` first; it is the clearest overlapping route-card redundancy.
2. Consolidate Turtle Creek, Platte River, lower Eau Claire, and Princeton Fox into access-planner cards.
3. Backfill `accessPoints`, `campingClassification`, and `safetyProfile` for high-count Wisconsin families before adding more Wisconsin routes.
4. Add the 10 missing image-audit rows or explicitly record no-image outcomes.
5. Review `routeType` on AW-primary or whitewater-like cards, starting with Turtle Creek Highway 140-to-Sweet-Allyn.
