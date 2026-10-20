# Route-guide publication pilot — October 19, 2026

## Purpose and publication decisions

Apply the [route publication policy](../seo-route-publication-policy.md) to a bounded mixture of planning-only access records and scored endpoint combinations. Keep the full trip catalog and its scoring/hazard boundaries separate from the decision to publish an independent search guide.

| Family | Existing standalone guides | Retained guides | Options brought into hub | Product role |
|---|---:|---:|---:|---|
| Aroostook, Maine | 9 | 0 | 9 | Access research with Washburn station context |
| Piscataquis, Maine | 3 | 0 | 3 | Access research with a clearly identified Penobscot proxy |
| Lower Snoqualmie, Washington | 6 | 3 | 3 | Focused reach guides plus extended and alternate-start plans |
| Contoocook, New Hampshire | 6 | 2 | 4 | Separate public-landing and conditional outfitter-shuttle guides |
| Total | 24 | 5 | 19 | All 24 trip choices remain selectable |

The explicit decision register is `src/data/route-guide-publication-reviews.ts`. The 19 old paths use the existing generated immediate-refresh redirect delivery to their exact hub trip anchors, with canonicals to the corresponding hub. They are removed from the sitemap. These are not HTTP 301 responses; the existing Azure delivery design is documented in [redirect delivery notes](route-consolidation-redirect-delivery-2026-10-07.md).

The proposed sitemap has 2,490 URLs, including 2,046 standalone route guides, compared with the October 19 live baseline of 2,509 and 2,065 respectively. River-hub and state counts are unchanged. No trip choice, access restriction, gauge, numeric threshold, scoring eligibility or hazard has been removed or changed. The shared Maine builder's confidence and evidence wording now says proxy context rather than incorrectly assuming every proxy is on the same river; this corrects the Piscataquis/Penobscot contradiction without changing any telemetry assignment.

Browser testing exposed an existing normalization defect: API logistics, safety, profile and gauge-source fields were discarded before rendering refreshed hub notes. The normalizer now preserves those fields, and the detail API includes an optional station name for accurate identification. This fixes existing hub notes as well as the pilot. Pilot cards keep expandable notes and links to retained guides after hydration. Old cached API responses remain compatible; station names arrive when data is refreshed.

## Why these decisions

Aroostook and Piscataquis descriptions largely repeat launch-inventory and contextual-gauge guidance. Their new hub introductions explicitly distinguish access research from a confirmed continuous itinerary, identify estimated mileage/time, and direct readers to check flow direction, passage, obstructions and legal exits. The Piscataquis guide identifies West Enfield as a Penobscot station instead of implying it measures the selected river. Neither family receives a live paddle score. The picker retains maps, saved-plan actions, sources, shuttle terms and hazards. Its default ordering is not labeled a recommendation.

Snoqualmie retains Plum Landing–Fall City, Fall City–Richter/Neal Road and Fall City–Tolt. The [Mountaineers lower-river guide](https://www.mountaineers.org/activities/routes-places/snoqualmie-river-plum-landing-to-fall-city) describes the broader itinerary, while [Fall City Park](https://www.fallcityparks.org/fall-city-community-park.html) and [WDFW Richter](https://wdfw.wa.gov/places-to-go/water-access-sites/richter-628) document the individual landing commitments. The longer Plum combinations and alternate Neal start remain in the picker. No flow range is transferred from the different station named in the Mountaineers guide.

Contoocook retains Riverway Park–Canoe Company because the [Forest Society guide](https://www.forestsociety.org/document/contoocook-river-paddleedited2023pdf.pdf) documents this nine-mile, reserved paid-shuttle trip. River Road–Riverway Park remains a public-landing alternative. Other starts and long combinations move to their selected cards with all private-landing terms intact. The nine-mile shuttle source does not establish service for longer Henniker starts; users must confirm those arrangements with the operator.

The Maine source is the [Maine DACF launch inventory](https://www.maine.gov/dacf/parks/water_activities/boating/public_boat_launches/boat_sites.shtml). This is a published-source comparison, not an on-water inspection or a new verification of route continuity, direction, mileage or current access. Source-file history places the selected expansions in September, after the original August search collapse. The pilot evaluates continuing differentiation and product quality; it cannot establish the original cause.

## Baseline and comparison families

Before deployment, the local `output/seo-structure-2026-10-19/pilot-baseline.json` records cached live sitemap membership, available Search Console rows, and route/profile/access/safety data for all pilot and comparison families. It uses the full October 19 live audit and the authenticated export for September 20–October 17 versus August 23–September 19. Private Search Console exports remain local and are not included in this PR.

Unchanged comparison families:

- Maine St. Croix: five planning guides, context for Aroostook.
- Maine Pleasant River: three planning guides, context for Piscataquis.
- Washington Yakima: six scored guides, context for Snoqualmie.
- New Hampshire Pemigewasset: six scored guides, context for Contoocook.

No pilot or comparison URL appears as a row in that performance export. This means demand is unobserved in the available rows, not that historical demand is proven zero. These are approximate contextual comparisons, not randomized or perfectly matched controls. Earlier guide improvements on this draft branch also limit attribution for any eventual sitewide change.

## Remaining review work

`npm run seo:guides:review` generates `route-guide-publication-review-queue.json`. After the explicit pilot decisions, 376 remaining standalone pages cross the five-word phrase-similarity screening threshold: 134 planning and 242 scored pages. The queue compares route-specific descriptive and planning fields rather than the HTML template. Similarity does not determine publication automatically. Review independent itinerary evidence, real trip differences, access/hazard boundaries and historical demand before changing a family.

The original nine recovery-cohort guides and all comparison-family guides remain standalone. Planning-only publication remains permitted for substantial, independently useful trip guides; this pilot is not a sitewide removal of planning routes.

The existing CI indexability audit now rejects a new standalone guide unless it has an explicit, source-backed approval in the publication register. The historical live baseline grandfathers the current catalog while reviews proceed. This prevents a new batch of route records from automatically expanding the search inventory without review.

## Validation and rollout record

- Focused unit checks cover complete family decisions, preservation of scoring roles and access evidence, the nine-mile outfitter restrictions, original recovery guides and unchanged comparison families.
- Full repository typecheck passes.
- The production build succeeds; it emits 813 total consolidation redirects, including the 19 pilot additions.
- The whole-site indexability audit reports no errors or warnings.
- `npm run seo:guides:verify` checks the four built hubs, five retained self-canonical guides, 19 redirect targets/sitemap exclusions and all 24 selected-trip cards.
- Eight desktop/mobile browser cases pass with deterministic API and map fixtures. They follow emitted old-URL targets on the local preview, verify selection after hydration, preserve expanded shuttle/station/safety/flow notes, keep retained-guide links, switch selected plans, and check horizontal overflow. The maps use the existing harness; this is not a live telemetry or geographic-accuracy check. Desktop and mobile screenshots were inspected.
- The combined browser run passes 35 cases, including 27 existing hub regressions; one mobile-only scenario is skipped on desktop. Fourteen focused publication/API unit checks pass, including rejection of unreviewed new guide URLs and accurate Piscataquis proxy wording. The audit scripts pass a focused TypeScript check.

## Production release — October 20, 2026

The approved pilot merged in [PR #82](https://github.com/EckceptionalSolutions/PaddleTodayV2/pull/82), revision `45c75c6c0e186712b39f74f04d19db499c00811a`, at 11:07:17 UTC. The [frontend deployment](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/39412767021) published at 11:16:02 UTC (6:16 AM Central) and passed its origin search-response checks. The automated merge did not create production workflow runs; the existing production workflows were dispatched explicitly against the merged revision.

The public delivery check verifies all four new hub guides, all 19 exact old-path trip targets and sitemap exclusions, five retained self-canonical/indexable guides, and all 24 selected-trip cards with their shuttle and safety notes. The public sitemap contains 2,490 URLs. Live browser checks in all four families follow an old path to the correct selected trip after hydration and retain expanded planning/access/safety notes and links to the retained guides. All 24 public API trip records retain their catalog scoring parameters, shuttle terms and safety data.

Release verification also found that the stored-summary-to-detail response omitted station names even after the main serializer was updated. [PR #83](https://github.com/EckceptionalSolutions/PaddleTodayV2/pull/83), revision `976913ea702ffb6e8649a159942b5fca674a9033`, preserves that field. Its regression reproduced the omission before the fix; all seven snapshot tests and the full typecheck pass afterward. The [corrected API deployment](https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/39413884165) passed readiness and smoke checks at 11:26:05 UTC. Although the deployed server file contained the correction, the running process initially returned the old response. An explicit App Service restart at 11:30 UTC activated the corrected response; the direct-origin twelve-check smoke suite passes. Check both the running response and ordinary public cached responses after API releases; health/readiness alone did not distinguish these package versions. No station assignment, numeric threshold or score eligibility changed.

Google's authenticated live smartphone inspection fetched the new Aroostook hub successfully at 11:17:09 UTC and reported crawl/indexing allowed with the correct declared canonical. Its tested HTML contains the new planning title and description. This is a live eligibility diagnostic, not a stored indexing recrawl, Google-selected canonical or recovery result. Private Search Console observations and exports remain local.

Google follow-up remains open. On confirmed post-release stored recrawls, record selected canonicals and indexing, and compare family-level visibility including hubs, retained guides and old paths. Compare unchanged families for context while acknowledging seasonality, unobserved demand in the available export and earlier guide improvements in the same release. Do not infer recovery from fewer URLs or successful delivery. Broader consolidation awaits this pilot's evaluation.

## Stored Google follow-up — October 20

A fresh stored URL inspection during the Kennebec review now reports the Aroostook hub as indexed, with the inspected URL selected as Google's canonical. The displayed last crawl is October 20 at 7:10:42 AM, using Googlebot smartphone; Search Console does not explicitly show the timezone. The stored crawled HTML contains the new access-and-trip-planning title, the nine-plan description and the explicit absence of a live paddle score. This is stronger evidence than the earlier live eligibility test or indexing-request acceptance. It establishes processing of this hub, not impressions, clicks, ranking recovery or processing of the other pilot URLs. See [the focused follow-up record](route-guide-google-followup-2026-10-20.json). Authenticated screenshots and inspection retrieval identifiers remain local.

A separate [Kennebec itinerary review](kennebec-itinerary-review-2026-10-20.json) places six upper-river combinations on access-review hold after finding direction and dam-boundary problems. It preserves nine other Kennebec choices and both station contexts. Its five removed standalone guides change the sitemap from 2,490 to 2,485 URLs when deployed. Record that accuracy intervention separately from the four-family pilot; it neither changes the original pilot membership nor proves that reducing URL quantity improves search results.
