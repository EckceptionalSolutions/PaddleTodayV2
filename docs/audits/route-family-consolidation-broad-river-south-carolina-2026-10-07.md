# Broad River, South Carolina route-family review — 2026-10-07

## Decision

Keep eight standalone route guides matching Paddle SC's named South Carolina trips: Peak–Harbison, Ninety-Nine Islands–Daltons, Daltons–Lockhart, Lockhart–Broad River Landing, Broad River Landing–Neal Shoals, Neal Shoals–Sandy, Sandy–Shelton, and Shelton–Strother.

Consolidate the other 17 endpoint combinations to their exact selectable trip cards on `/rivers/by-river/broad-river/`. Preserve all 25 route choices and their access details in the hub picker. Add a source-backed list of the eight named sections above the picker so users can start from established trip names.

The single Georgia Broad River route is a different river. Its U.S. 281–U.S. 172 reach uses USGS 02191300 above Carlton, Georgia; keep it in its own `broad-river-georgia` group. The South Carolina hub continues to use the existing `broad-river` path, now containing only South Carolina routes.

The corridor registry uses `condition-family`: it groups routes for discovery and does not assert one uninterrupted trip or one river-wide flow threshold. The upstream Ninety-Nine Islands reach, the lower Carlisle reaches, and Peak–Harbison use different gauge contexts.

## Source and condition review

- [Paddle SC Broad River guide](https://www.gopaddlesc.com/waterways/trail/broad-river) lists 12 suggested trips and links seven Broad River gauges. Eight of its named endpoint pairs are represented in this South Carolina route family.
- Paddle SC names the local route lengths and public access details on its individual trip pages: [Peak–Harbison](https://www.gopaddlesc.com/trips/trail/broad-river-peak-to-harbison-state-forest), [Ninety-Nine Islands–Daltons](https://www.gopaddlesc.com/trips/trail/broad-river-ninety-nine-islands-river-access-to-worth-mountain-wma), [Daltons–Lockhart](https://www.gopaddlesc.com/trips/trail/broad-river-worth-mountain-wma-to-lockhart-sc), [Lockhart–Broad River Landing](https://www.gopaddlesc.com/trips/trail/broad-river-lockhart-sc-to-broad-river-landing), [Broad River Landing–Neal Shoals](https://www.gopaddlesc.com/trips/trail/broad-river-broad-river-landing-to-neal-shoals-dam), [Neal Shoals–Sandy](https://www.gopaddlesc.com/trips/trail/broad-river-neal-shoals-dam-to-sandy-river-landing), [Sandy–Shelton](https://www.gopaddlesc.com/trips/trail/broad-river-sandy-river-landing-to-shelton-ferry-landing), and [Shelton–Strother](https://www.gopaddlesc.com/trips/trail/broad-river-shelton-ferry-landing-to-strother-landing).
- [SCDNR's Broad Scenic River guide](https://www.dnr.sc.gov/water/river/scenic/broad.html) describes the 15-mile scenic segment from Ninety-Nine Islands Dam to the Pacolet confluence, identifies its public access points, and puts Ninety-Nine Islands–Daltons at about eight river miles. It also warns that steep banks limit access at Worth Mountain outside the named landing.
- Paddle SC attaches a 2.5–5.6 ft range at USGS 02153551 to Ninety-Nine Islands–Daltons. Its lower named trips use discharge ranges and their own route gauge references. The guide should be read by exact trip; stage in feet and discharge in cfs are different measures, and no one gauge describes all 25 endpoint combinations.
- USGS identifies [02191300](https://waterdata.usgs.gov/monitoring-location/USGS-02191300/) as Broad River above Carlton, Georgia, while South Carolina's scenic reach is documented by SCDNR between Ninety-Nine Islands Dam and the Pacolet River. These are separate river systems that had been incorrectly combined under one `riverId`.

## Retired standalone pages

Each path below now points to `?route=<same-slug>#trip-<same-slug>` on the South Carolina hub:

- `broad-river-lockhart-neal-shoals`
- `broad-river-lockhart-sandy`
- `broad-river-lockhart-shelton`
- `broad-river-lockhart-strother`
- `broad-river-broad-river-landing-sandy`
- `broad-river-broad-river-landing-shelton`
- `broad-river-broad-river-landing-strother`
- `broad-river-daltons-broad-river-landing`
- `broad-river-daltons-neal-shoals`
- `broad-river-daltons-sandy`
- `broad-river-neal-shoals-shelton`
- `broad-river-neal-shoals-strother`
- `broad-river-sandy-strother`
- `broad-river-ninety-nine-islands-lockhart`
- `broad-river-ninety-nine-islands-broad-river-landing`
- `broad-river-daltons-shelton`
- `broad-river-daltons-strother`

## Candidate verification

- Candidate build: `.local/seo-candidate-2026-10-07-broad-river`; Astro built 2,921 static pages and the sitemap contains 2,909 URLs, 17 fewer than the immediately preceding Verde candidate.
- The built-page audit checked 2,848 route links and found zero orphaned public pages, zero routes missing state or river-hub inlinks, duplicate route H1s/descriptions, errors, or warnings. It verified all 391 generated consolidation redirects, including the 17 new exact Broad River targets.
- The candidate has 2,469 standalone route pages, down from 2,486, and retains all 25 South Carolina Broad River route choices. The South Carolina hub renders only South Carolina routes; the Georgia group contains only `broad-river-us281-us172`.
- Route-data, corridor, deprecation, and route TypeScript checks passed. The initial full typecheck exposed a stale canonical-geometry manifest (2,831 versus 2,807 public routes); see the deployment follow-up below. No automated tests were run locally.

This is candidate-build evidence. Production deployment and Google's recrawl have not yet been confirmed.

## October 7 deployment follow-up

The first GitHub frontend deployment stopped at its `npm test` typecheck because the canonical-geometry inventory still described an older public route catalog. Refreshed the root manifest and state bundles using the reviewed existing route assets, preserving the original geometry-generation fingerprint. The geometry audit now passes for 2,775 matched of 2,807 public routes, with 32 explicitly unmatched.

That audit also exposed a stale Blackfoot access-anchor requirement left under the retired reverse-direction slug. Updated the required route ID and added the current Johnsrud–Marco Flats route asset by reversing its existing reviewed network trace. The resulting trace follows route direction, lands within 157 ft of Johnsrud and 165 ft of Marco Flats, and measures 9.3 miles. The geometry audit and full `npm run typecheck` now pass. This follow-up is pushed with the Broad River change; production and Search Console verification remain pending until the deployment workflow succeeds.
