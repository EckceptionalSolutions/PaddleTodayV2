# Woonasquatucket River route-family review

Date: 2026-10-07

## Finding

The route source contains 28 endpoint combinations across Georgiaville, Whipple, Esmond, Cricket/Greystone, Manton, Riverside, Waterplace and South Water Street. The public catalog previously exposed 27 of them; Cricket-to-Waterplace was already withheld during access-coordinate review.

The [Woonasquatucket River Watershed Council paddling guide](https://wrwc.org/wp/wp-content/uploads/2020/05/completePaddlingGuide.pdf) describes separate upper, pond and lower paddling areas. It says the Allendale and Lymans Mill Ponds corridor below Greystone has no public access points and four dam portages that are not well established (guide pages 2 and 14–15). The guide also describes the lower urban reach from Manton toward downtown Providence as a separate paddle with bridge debris, mill remnants, water-quality concerns and tidal influence.

## Decision

- Keep 12 route choices in the hub: six within the Georgiaville-to-Greystone upper zone and six within the Manton-to-Providence lower zone.
- Retain seven standalone route pages: the source-described Georgiaville-to-Cricket upper reach and all six lower route choices, whose endpoints span different urban and tidal conditions.
- Consolidate the five remaining upper endpoint variants into their selected trip cards on the hub. Their route-specific distances, gauge context, access details and hazards remain available in the picker.
- Keep the 16 combinations that cross the Allendale/Lymans Mill Ponds access gap out of the public route catalog until lawful access and the portage chain are verified. Redirect their old URLs to the hub’s access-zone explanation. This includes the Cricket-to-Waterplace URL that was already withheld for a separate coordinate review.

This leaves the hub plus seven standalone route pages, down from the hub plus 27 public route pages. The catalog still offers 12 supported zone-specific trip choices; no condition average or continuous upper-to-lower route is claimed.

## Implementation

- Added a Woonasquatucket access-review hold to the 15 additional cross-gap route records and regenerated the withheld-route list.
- Added exact redirect pages for 16 cross-gap URLs to the access-zone explanation and five overlapping upper variants to their selected hub cards. They are generated at build time and omitted from the sitemap; see the [redirect delivery audit](route-consolidation-redirect-delivery-2026-10-07.md).
- Added a source-linked hub section that explains the separate zones, lists the 12 trip choices, and states why the pond corridor is not presented as a through-route.
- Registered the river as a condition family with no segment edges, preserving the fact that the upper and lower zones do not form one verified route or condition profile.

## Rollout limits

These are source and candidate-build changes. The sitemap and Google’s selected URLs change only after deployment and recrawl. The guide documents a meaningful access gap, but this review does not establish the present status of every individual portage; routes across the gap remain withheld until current public access and carries are verified.
