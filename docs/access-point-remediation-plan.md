# Access point remediation plan

Prepared 2026-09-17 from `access-point-quality-audit.json` and the current local publication/withholding rules. This is the execution plan; no access corrections or rejection decisions have been made by this document.

Execution update: [the first ten-site batch](access-remediation/2026-09-17-batch-01/README.md) is complete: three site corrections and seven publication rejections. Continue with the [step-by-step operator runbook](access-point-remediation-runbook.md). The figures below are the original planning baseline, not current post-remediation totals.

## Baseline and priority

- 279 distinct coordinate locations in the research queue; 55 exceed 800 feet from returned mapped water.
- 239 locations affect at least one locally public, non-withheld route; 35 of these exceed 800 feet.
- 96 access occurrences have unknown water proximity. They are a separate evidence-recovery backlog, not confirmed bad locations.
- 297 cached queries are truncated and 3 are missing. Repeating a truncated request without pagination will not solve its coverage problem.

These counts describe the local catalog, not a verified production deployment. Recompute them as decisions change route eligibility.

Review public terminal accesses first, prioritizing property centroids, strong evidence of wrong location, offsets over 800 feet, and the number of public routes sharing an access. Then review remaining public access flags, followed by locations used only by withheld/unpublished routes. Work in batches of five distinct sites, grouping nearby sites under the same managing agency when practical.

## 1. Prepare evidence and a durable work queue

Create a machine-readable remediation ledger keyed by a stable access/source ID where available. Preserve the original coordinates and every affected route, endpoint role, and display name. Exact-coordinate groups are research clusters, not automatic proof that all their route occurrences refer to the same access. Also search the registry for different-coordinate variants of the verified site.

For each entry record: priority, publication exposure, original coordinates, source URLs and retrieval dates, source coordinate role (parking/property/water entry), candidate coordinates, public-access findings, decision and rationale, affected files/routes, validation results, and any reopening condition. Suggested workflow states are queued, researching, decided, applied, and validated; the decision itself is kept separately.

Before judging sites with incomplete hydrography, add complete-response retrieval (pagination or bounded spatial queries), test truncated-response handling, and rerun the affected audit queries. Existing complete evidence can support research while this work proceeds. Missing or incomplete hydrography alone never establishes that a site is unsuitable.

## 2. Research each site and make a decision

Start with the managing agency's current launch map, GIS record, park plan, or official water-trail guide. Check map imagery and physical shoreline context. Use other credible paddling sources to corroborate or resolve gaps, retaining their provenance. Existing labels such as “official” or “water-entry edge” are claims to verify.

Establish all of the following before accepting a water-entry coordinate:

1. It is the intended named facility on the correct river/reach.
2. The mapped point identifies an actual launch/landing, with a plausible approach from the access area.
3. The source supports public or explicitly permitted paddling access, including relevant restrictions.
4. The coordinate precision is supported by the source or visible feature; a property centroid or nearest flowline point does not qualify.

Use three decisions:

| Decision | Evidence | Result |
| --- | --- | --- |
| Keep / verified | Existing coordinate is a defensible launch or landing; the flag reflects incomplete/generalized mapping | Retain coordinates and record the site-specific evidence explaining the audit flag |
| Fix | Correct launch/landing and access identity are established | Apply the verified coordinate to all confirmed occurrences, retaining source evidence |
| Reject for publication | Site is unsuitable, or a focused research pass cannot establish a defensible usable entry | Exclude the access from published use; distinguish confirmed-invalid from unable-to-verify |

A focused first pass should check available official facility/trail information, map/imagery context, and relevant corroborating evidence. If those cannot establish a usable point, record exactly what was searched and reject for publication as unable-to-verify. Do not spend repeated batches searching the same exhausted leads. Reopen only for a concrete new source or corrected evidence. Conflicting primary evidence also remains rejected pending resolution.

Never move a pin merely to make a distance threshold pass. Never silently substitute a different launch: a replacement that changes the reach requires review of the route name, mileage, direction, hazards, portages, shuttle, restrictions, and gauge relevance.

## 3. Apply decisions consistently

For fixes, prepare an explicit correction file using the existing correction format. Confirm access identity before propagation. Update route and trip-detail copies and, for put-ins, the route's primary map anchor. Check every affected occurrence before and after applying the correction; same-name matching alone is insufficient. Retain old/new values in the ledger.

For rejected put-ins or take-outs, add a reasoned hold for every dependent route in `src/data/route-access-review-holds.ts`, then regenerate withholding. Keep route source records and research history so a later verified replacement can be evaluated. Withholding one endpoint affects every route that depends on it.

For rejected optional intermediate accesses, remove the unsupported access option and related logistics only if the remaining route is independently usable. Withhold the route when that access is essential to a portage, emergency exit, camping plan, or other required route function, or when that dependency cannot be resolved.

Do not let subsequent hydrography proximity checks clear a human access hold. Remove holds only after the exact access is verified and every other outstanding hold reason is resolved. Keep other publication gates intact.

## 4. Validate each batch before continuing

- Re-audit changed access coordinates and all confirmed shared occurrences. Check access-registry identity/conflicts and route/trip-detail consistency.
- Inspect the corrected pins and route trace visually. Rebuild/review affected canonical geometry and recompute reach distance and logistics where necessary.
- Run relevant route-data, geometry, and type checks. Add targeted regression tests when a correction exposes a reusable audit/propagation bug.
- Verify rejected terminal accesses actually remove all dependent routes from the public catalog; verify intermediate removals leave no stale navigation or logistics references.
- Regenerate dependent reports/registry/withholding artifacts deliberately. Do not run the omnibus coordinate workflow blindly: it includes automatic application of unrelated suggestions.
- Record outcomes as kept, fixed, rejected-confirmed-invalid, or rejected-unable-to-verify, plus route exposure affected and validation status. A smaller queue alone is not proof of improved quality.

Finish the five-site batch, report decisions and remaining uncertainties, then continue with the next batch. Routine evidence-backed fixes and publication holds do not require repeated confirmation; surface a user question only for a material route/product choice that the available instructions do not resolve. Deployment is a separate action.

## Proposed first batch

These are research candidates, not conclusions that the pins are wrong. Distances are from cached hydrography and public-route counts use the current local withholding list.

| Site | State | Distance to mapped water | Public routes affected |
| --- | --- | ---: | ---: |
| Poche's Bridge dock behind Poche's Market | Louisiana | 1,101 ft | 8 |
| Central Falls Landing river ramp | Rhode Island | 1,383 ft | 7 |
| Riverside State Park public boat launch | Washington | 1,204 ft | 5 |
| Baldwin Charenton Road Park dock | Louisiana | 896 ft | 4 |
| Quaker Village Road access, Middlebury | Vermont | 2,078 ft | 3 |

Research the two Louisiana sites together where they share official water-trail sources. Across the batch, these are 27 route-site dependencies, rather than 27 independently researched launches.

## Completion criterion

Every queued site has an evidence-backed keep/fix decision or an explicit publication rejection, all affected occurrences and route dependencies are handled, and validation is recorded. Unknown-evidence cases receive the same disposition after evidence recovery/research; they are never counted as successful coordinate fixes. Preserve both the original baseline and the final ledger so every removal and move remains explainable.
