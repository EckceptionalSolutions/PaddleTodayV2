# Route guides and access plans

Paddle Today helps people choose a paddling trip and interpret dependable current conditions. Public access records, flow-score eligibility and independent search guides are separate decisions.

## What earns a standalone guide

Keep an independent, indexable guide when its exact reach has a clear trip purpose and substantial information that helps someone choose or execute that trip. Evidence should establish the actual launch and finish, intervening river or documented itinerary, material obstruction boundaries, applicable gauge context, access terms and shuttle commitment. Explain important uncertainties. A source-named trip, materially different hazard/condition zone, restricted take-out, or independently documented alternative can justify a separate guide. Evidence of established search demand or independent references strengthens the case for retaining an existing page, but demand alone does not establish accurate guidance.

A gauge, unique title, coordinate pair, route length or rewritten summary alone does not earn an independently indexable guide. Every supported public trip still has a detail page for navigation and trip tools; longer endpoint combinations can remain useful without independent search publication. Do not manufacture distinct prose to justify every database record.

Planning-only guides can qualify: a well-documented itinerary without a calibrated score can be valuable. Conversely, a score does not automatically justify six pages that reuse the same information.

Scoring needs evidence for the recreational boundary being applied. One successful outing at a recorded gauge level is a reference observation, not a demonstrated minimum or calibrated range. Keep a useful guide available for planning when no defensible scoring boundary is established. Where sources distinguish recreational floating from low-flow or higher-water whitewater, name the activity the rating evaluates and keep the ranges separate. A current dam reading does not establish future release duration.

Stored recommendations must still belong to a currently score-eligible trip and carry the matching current condition-zone key. A recent timestamp alone does not establish that the current gauge and threshold model produced a result. Reject missing or mismatched keys and let a current calculation or snapshot replace them; do not label an older score with today's model. Deploy and verify the scheduled snapshot producer when scoring inputs or eligibility change.

## Access-planning role

Where the evidence primarily establishes access sites and contextual telemetry, group the records in a river access-planning hub. Explain what the evidence does establish and what still needs a local check. Show observations as station context, with no inferred paddle score or borrowed cutoff. Label estimated mileage and duration as estimates. Do not present a pair of launch listings as confirmation of continuous downstream passage.

Retain useful maps, endpoint choices, saved-plan links, access restrictions, sources, hazards and shuttle details. Keep these records available to the product; changing their search presentation must not silently change scoring eligibility or hide condition/hazard boundaries. Use the existing withholding process for an actual accuracy or access failure rather than conceal it by consolidation.

Keep planning-guide evidence and original source links visible without a live API response. A stored threshold-model label does not establish a calibrated low-water floor for a planning trip. Planning pages must not inherit score explanations, calibration claims or range-confidence panels from scored guides. The built indexability audit checks this distinction on every standalone planning guide; browser checks cover source access after hydration and during an API failure. Scored minimum-only guidance keeps the finite floor used by its scoring model.

## Page responsibilities

- State pages help discover and compare rivers and link directly to trip detail pages.
- River hubs explain condition zones and tradeoffs, offer the same “View trip details” link for every supported trip, and retain useful alternate endpoint choices.
- Trip pages use the same detail template and tools for scored and planning trips. Authored river and reach guidance adds substance where available; indexing decisions do not create a different navigation pattern.

Every supported trip renders at `/rivers/<slug>/`, with the same core maps, navigation, saving, planning and sharing tools; coordinate and export availability follow the evidence. Facts and source links are server rendered and remain available without JavaScript or a live conditions response. River cards stay compact and link directly to that page. Saved links, on-site search, state cards, planner links and exports use the same URL. Older shared hub `?details=<slug>` links open the corresponding supported trip page and retain explicit planner context.

Separate search publication from page availability. Previously consolidated public options render HTTP 200 detail pages with `noindex, follow`, self canonicals and no sitemap entry. The indexable guide set and sitemap membership remain unchanged. Keep these pages crawlable so search engines can read the noindex instruction, as described in [Google’s noindex documentation](https://developers.google.com/search/docs/crawling-indexing/block-indexing). The legacy `hasStandaloneRoutePage` helper remains an alias for the explicit `isIndexableRoutePage` policy; it no longer describes product page availability.

Only withdrawn source records and legacy aliases retain consolidation redirects. The redirect emitter must exclude every currently public trip, and static redirect rules must not intercept those pages. Use `routePageHref` for trip navigation and retain `routePageConsolidationTarget` for historical search decisions, redirect targets and review notices. Do not canonicalize unrelated trips together or block trip pages in robots.txt.

## Review process

The October 19 pilot in `src/data/route-guide-publication-reviews.ts` explicitly records every retained guide and hub option for four families. It is an editorial decision register, not a blanket rule for all planning routes. Unreviewed families remain unchanged pending review. Publication decisions must enumerate a family completely and preserve the five curated pilot guides and the original nine recovery-cohort guides unless new evidence warrants a separately documented change.

The built indexability audit, already run by frontend CI, rejects new standalone guide slugs unless the register explicitly retains them with a substantive rationale and a source-linked decision for that exact reach. Existing live guide slugs are grandfathered by the immutable October 19 baseline in `docs/audits/route-guide-publication-baseline-2026-10-19.json`; do not regenerate that historical list to approve new content. A passing guard establishes that a review is recorded, not that a machine has verified the evidence. Reviewers must apply the criteria above, including to new planning-only guides.

Use `npm run seo:guides:review` to regenerate the remaining similarity queue. Phrase overlap is a screening aid, not a Google quality score. Review substantial overlap, identical conditions and endpoint proliferation together with actual trip differences; no numeric similarity threshold automatically removes a page.

The same built indexability audit also checks new indexable river hubs. Grouping new endpoint records must not bypass editorial review. A new hub needs one explicit family decision in the existing register, classifying every public trip exactly once as a retained guide or a hub option, with a substantive introduction, rationale and source-linked trip decision. This applies to planning-only, scored and mixed families. The guard checks that usable guidance and a complete decision are recorded; it cannot validate river continuity, current access, hazards or source accuracy for the reviewer.

The 382 live hubs captured from the production sitemap on October 20 are grandfathered in `docs/audits/river-hub-publication-baseline-2026-10-20.json`. This separate immutable baseline does not alter the October 19 standalone-guide baseline. Do not regenerate either baseline to approve new publications. Existing hubs remain subject to editorial and accuracy review; historical publication is not evidence of guide quality.

## Measurement and rollout

Start with the four-family pilot and four unchanged comparison families described in `docs/audits/route-guide-publication-pilot-2026-10-19.md`. Record live baseline URL membership, route roles and available Search Console rows before deployment. Treat absent performance rows as unobserved, not verified zero demand.

After deployment verify old-URL delivery, exact selected trip, retained maps and notes, indexability, canonical targets and sitemap changes. Record deployment time and request no expansion on the assumption that a build or an unmerged PR is live. Track confirmed Google recrawls, indexing/canonical selection and river-family impressions/clicks including hubs and retired paths. Use the unchanged families as context, not as randomized controls; low traffic, seasonality and other changes limit attribution. A lower URL count is not evidence of recovery.
