# Potomac River route-family review — October 8, 2026

## Decision

Consolidate the standalone Taylors Landing–Snyders Landing page into its existing Potomac hub card. Keep the 4.3-mile option and both access points selectable on the hub. Preserve the longer Dam 4–Shepherdstown page and other Potomac sections because they cover different reaches, hazards, and access choices.

## Why this pair

The route-overlap audit reports that `potomac-river-taylors-snyders` is contained within the access chain for `potomac-river-dam-four-shepherdstown`: Taylors Landing and Snyders Landing are intermediate access points on that longer reach. This is a nested shorter trip, unlike the neighboring Brunswick–Point of Rocks and Point of Rocks–Monocacy legs, which are distinct adjacent sections.

Search Console's April 28–October 5, 2026 performance report shows zero clicks and zero impressions for the `potomac-river-` route-page prefix and zero for the Potomac hub. The report was updated about 24 hours before review. That is no observed search demand in the current six-month window; it does not establish future demand or prove why Google chose not to rank the page.

The current Potomac hub already contains the exact `#trip-potomac-river-taylors-snyders` card. The National Park Service identifies Taylors Landing at C&O milepost 80.9 and Snyders Landing at milepost 76.6, and its boating guidance documents the Dam 4 portage and Potomac safety context. This shorter reach also has its own Point of Rocks gauge context, shuttle logistics, and endpoint caveats, so those details and the route's source links must remain available on the hub card.

## Implementation

- Map the old route slug to its matching hub card so route links, state listings, and search results use the consolidated destination.
- Add a server-side HTTP 301 from `/rivers/potomac-river-taylors-snyders` to `/rivers/by-river/potomac-river-maryland/#trip-potomac-river-taylors-snyders`.
- Keep the route data in the public hub collection and render the consolidated route's access, gauge, shuttle, camping, safety, and source notes inside its server-rendered hub card. The interactive selected-trip panel exposes the same information when the route is selected.
- The change removes one standalone sitemap page while retaining the user-facing trip choice and the route's distinct planning details.

## Verification

Commit `e328e769a` deployed on October 8. Frontend workflow [37745539713](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37745539713), API workflow [37745539718](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37745539718), and Snapshot Worker workflow [37745539798](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37745539798) succeeded. The frontend completed its tests, production build, both built-page indexability audits, and live-origin checks.

Production checks confirmed that both `/rivers/potomac-river-taylors-snyders` and its trailing-slash spelling return HTTP 301 to the matching Potomac hub card. The hub returns HTTP 200; the target card is in its server-rendered HTML with trip summary, access, gauge context, shuttle/camping notes, safety notes, and planning-source links. The sitemap index returns HTTP 200 and points to one child sitemap. Its URL count fell from 2,543 to 2,542; the standalone route is absent while the hub and gauge guide remain. `/sitemap.xml` redirects to `/sitemap-index.xml`.

The first deployed interactive panel would have omitted evidence notes and source links after hydration because the general detail API intentionally leaves out those fields. Follow-up commit `c74f88aca` adds those fields to river-group responses only, preserving the lighter generic detail response. Frontend workflow [37746931831](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37746931831), API workflow [37746931854](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37746931854), and Snapshot Worker workflow [37746931819](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/37746931819) succeeded. The production group endpoint returns HTTP 200 with 11 source links, six evidence notes, and shuttle/camping details for this trip; the hub HTML contains the matching evidence and source sections.

Search Console's indexing and sitemap snapshots have not refreshed since this deployment. No sitemap submission, validation action, or URL indexing request was made.

## Sources

- [NPS Boating and Paddling guidance](https://www.nps.gov/choh/planyourvisit/boating.htm)
- [NPS current park conditions](https://www.nps.gov/choh/planyourvisit/conditions.htm)
- [NPS Taylors Landing Boat Ramp](https://www.nps.gov/places/taylors-landing-boat-ramp.htm)
- [NPS Snyders Landing Boat Ramp](https://www.nps.gov/places/snyders-landing-boat-ramp.htm)
- [C&O Canal Trust Taylors Landing](https://www.canaltrust.org/pyv/taylors-landing-boat-ramp/)
- [American Whitewater Dam 4 to Shepherdstown route](https://www.americanwhitewater.org/content/River/view/river-detail/11071/main)
