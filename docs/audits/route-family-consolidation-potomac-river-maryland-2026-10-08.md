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

The production route and hub returned HTTP 200 before the change; the hub contained the target trip anchor and both access names. The built-page indexability audit and deployed redirect checks will be recorded after CI deployment. No Search Console sitemap submission, validation action, or URL indexing request was made.

## Sources

- [NPS Boating and Paddling guidance](https://www.nps.gov/choh/planyourvisit/boating.htm)
- [NPS current park conditions](https://www.nps.gov/choh/planyourvisit/conditions.htm)
- [NPS Taylors Landing Boat Ramp](https://www.nps.gov/places/taylors-landing-boat-ramp.htm)
- [NPS Snyders Landing Boat Ramp](https://www.nps.gov/places/snyders-landing-boat-ramp.htm)
- [C&O Canal Trust Taylors Landing](https://www.canaltrust.org/pyv/taylors-landing-boat-ramp/)
- [American Whitewater Dam 4 to Shepherdstown route](https://www.americanwhitewater.org/content/River/view/river-detail/11071/main)
