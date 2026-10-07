# Lamoille River route-family consolidation

Date: 2026-10-07

## Finding and decision

The public catalog has 28 Lamoille endpoint combinations across eight access points. Most are longer combinations of the same Paddlers’ Trail reaches, and every route repeats the same river overview and Johnson gauge background. The official trail guide names separate day trips with their own water type, falls, and portage context.

Keep these five route pages as distinct search landings:

- Upper Lamoille Access to Morrisville Oxbow Park (8 miles)
- Cadyville Falls to Waterman Brook (5 miles)
- The Johnson area to Dorothy Smith Access (about 12 miles)
- Dorothy Smith Access to Fairfax Falls (13 miles)
- Fairfax Falls to Arrowhead Mountain Lake (8 miles)

Consolidate the other 23 endpoint-combination URLs into the Lamoille River hub. The trip records remain in the hub picker with their own access points, distances, portage notes, and hazards. The hub now introduces the named day reaches and distinguishes quiet sections, rock gardens and falls, portage boundaries, and Arrowhead Lake wind exposure. The corridor metadata describes this as a condition family and adds no continuous-route edges.

## Source basis

The [Lamoille River Paddlers’ Trail recommended trips](https://www.lamoilleriverpaddlerstrail.org/recommended-trips/) lists the Upper Lamoille-to-Oxbow 8-mile reach, Cadyville-to-Waterman Brook 5-mile reach, Johnson-to-Jeffersonville 12-mile reach, Jeffersonville-to-Fairfax 13-mile reach, and Fairfax-to-Arrowhead Lake 8-mile reach. It separately describes flatwater, quickwater, Class II features, mandatory falls or dam portages, and a reservoir paddle. The Trail’s [maps and access-guide page](https://www.lamoilleriverpaddlerstrail.org/maps/) links its current interactive access and portage map.

## Changes in this worktree

- Retained five route pages for the documented day-trip reaches above.
- Added exact redirect pages for the other 23 route paths. Each page selects that trip on the Lamoille hub; they are generated after the static build and omitted from the sitemap. See the [redirect delivery audit](route-consolidation-redirect-delivery-2026-10-07.md).
- Updated hub title description, introductory copy, FAQ answer, and a short source-backed list of the trail’s day reaches.
- Registered the Lamoille routes as a condition family without asserting that one score or a single route represents all sections.
- Kept all 28 route records and their trip-planning data intact.

## Rollout and limits

The 23 page URLs leave the generated sitemap after deployment and build. The live sitemap and Google index will change only after deployment and recrawl. This reduces the route-family page count from 28 to five while preserving all trip choices; it does not show that overlapping content caused the wider traffic decline.
