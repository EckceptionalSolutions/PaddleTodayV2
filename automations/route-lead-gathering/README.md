# Route Lead Gathering Automation

This automation builds a route-lead inbox without changing app route data.

Its default job is now internet-first lead discovery, not conservative blocker cleanup.

Run:

```powershell
npm run routes:leads:gather
```

Outputs:

- `docs/route-lead-inbox.json`: machine-readable lead queue.
- `docs/route-lead-inbox.md`: human-readable lead queue.

Use this before any route implementation pass. The implementation automation should only add routes from the `implementation_ready` lane. If that lane is empty, do internet lead research instead of forcing a route add, with a deliberate bias toward generating new leads through bounded official-source searches rather than rechecking the same blocked candidates.

If repeated runs have not increased the implementation-ready pool, treat that as a signal that the queue is stale. Spend the next runs on new internet discovery and ledger seeding, even if old coordinate or access blockers remain technically close.

## Lanes

- `implementation_ready`: candidate is already marked `likely_addable` and should be handed to a one-route implementation pass.
- `coordinate_cleanup`: route/gauge/threshold story is promising, but source-backed endpoint coordinates are missing.
- `access_legitimacy`: coordinates or route shape may exist, but public launch/take-out legitimacy is not proven strongly enough.
- `threshold_discovery`: route and gauge are promising, but numeric water-level or flow bands are not defensible yet.
- `live_provider_recheck`: route may be real, but the live-data path is not currently product-supported or needs current USGS/MN DNR verification.
- `fresh_source_discovery`: route is parked until genuinely new official route, access, threshold, or gauge evidence appears. This is now a primary lane, not a back-burner lane.
- `blocked_recheck`: revisit only when a retry condition is satisfied.

## Operating Rules

- Do not add or edit `src/data/rivers.ts` from this automation.
- Do not promote a candidate because it is interesting; promote only when live gauge, numeric threshold, endpoints, and access legitimacy all clear.
- Reject or block routes where missing a take-out could send paddlers into a dam, low-head dam, diversion, or similar high-consequence hazard.
- Do not use warning copy to ship dam-adjacent mandatory take-outs, unresolved access legitimacy, active closures, or private-bank conflicts.
- Do not recheck stale candidates unless the generated lane and retry condition point to one specific missing fact and the candidate is still near-ready.
- Default to source-family discovery over blocker cleanup. Cleanup lanes are secondary unless they are one-step-away promotions.
- Reserve a large discovery quota every non-implementation run: spend most of the run on bounded internet research aimed at creating or materially advancing leads.
- Favor targeted discovery over repetitive stale rechecks. If several top blocker candidates did not move recently, stop looping on them and shift into threshold-discovery or fresh-source internet research.
- Keep discovery bounded and source-first: official water-trail managers, park systems, USGS gauge clusters on known paddling rivers, MN DNR, American Whitewater, NPS/USFS/DCNR/KDFWR-style route pages, and local public-access managers.
- Use the generated Internet Discovery Search Briefs in `docs/route-lead-inbox.md` as active work orders. They are there to push the automation toward source-family searches, not just to describe old ledger candidates.
- Prefer creating or materially improving several ledger leads in a run over spending the whole run on one stale blocker that has failed multiple recent rechecks.
- Keep the candidate ledger as the source of truth. If research changes a candidate, update `docs/route-candidate-ledger.json`, then regenerate the inbox.

## Discovery Priority

Any state is eligible, but use this order by default when `implementation_ready` is empty:

1. Undercovered Midwest states already supported in V2.
2. Other Midwest states already supported in V2 that still have obvious route-family gaps.
3. Adjacent expansion states already touched by the repo or ledger.
4. Frontier expansion states with strong public route/access/gauge source families, especially `WV`, `VA`, `NC`, `OK`, `TX`, and `CO`.
5. Any other state only when a bounded official source family produces a strong route/gauge/access lead.

Treat the undercovered supported Midwest states as the first fan-out ring. In practice this usually means starting with low-count states such as `IN`, `NE`, `IL`, `ND`, `SD`, and `OH` before spending more time on stale rechecks elsewhere.

Treat the adjacent expansion ring as the next frontier. In practice this usually means `PA`, `KY`, `TN`, and `AR` before broad national sweeps.

When those rings are not producing enough implementable leads, deliberately open new states. Favor states with strong official water-trail programs, public access datasets, American Whitewater coverage, NPS/USFS river pages, or reliable USGS gauge density. Do not keep the search artificially Midwest-only if the current Midwest queue is mostly stale blockers.

## Discovery Tactics

- Search the internet for new official route families before deepening old blocker notes.
- Prefer public water trails, DNR/state park paddling pages, USGS gauge clusters on known paddling rivers, NPS/USFS river guides, American Whitewater reaches, and county/city river access systems.
- Seed new ledger candidates as soon as a route family has a real public route, plausible live gauge path, and enough source trail to justify later threshold/access work.
- Each no-add discovery run should try to seed or materially advance at least 3-5 candidates unless the sources are genuinely barren.
- Rotate source families: after a state parks/DNR pass, try AW/USGS clusters, then county/city blueways, then NPS/USFS or state scenic-river programs.
- Use `docs/midwest-route-candidate-seeds.md` only as a bounded secondary seed list. Do not mine the old repo broadly.
- Avoid random blog-list discovery unless it clearly points back to official route, gauge, or access sources.

## Recommended Cadence

1. Run `npm run routes:leads:gather`.
2. If `implementation_ready` has candidates, hand off at most one route for implementation.
3. If `implementation_ready` is empty, start from the Internet Discovery Search Briefs and only spend a small amount of time on stale cleanup/access lanes.
4. Research roughly 8-14 leads or source clusters total, with at least 6-10 touches devoted to bounded internet discovery and at most 1-2 touches spent on old blocker rechecks.
5. Prefer new candidate creation, promotions, and materially stronger source trails over repeated no-change notes.
6. Update `docs/route-candidate-ledger.json` with new evidence and statuses.
7. Regenerate the inbox.
