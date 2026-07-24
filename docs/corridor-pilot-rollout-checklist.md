# Corridor-first pilot rollout checklist

Use this checklist for each MN/WI/IA rollout wave. A checked item must have a link to the supporting audit, source review, or analytics export.

## Before enabling a family

- [ ] Corridor has a unique registry ID and a review-ledger row.
- [ ] Continuity is explicitly `verified`, `partial`, or `condition-family`.
- [ ] Every grouped route remains available as a trip option with a stable URL.
- [ ] Public access, parking, hazards, closures, and gauge boundaries are source-reviewed.
- [ ] Canonical route and segment edges are present when continuity is claimed.
- [ ] `npm run routes:audit:corridors` passes.
- [ ] `npm run routes:audit:deprecations` passes.

## Measurement window

Run a two-week observation window after enabling a family. Export `corridor_selected`, `corridor_trip_selected`, and route-detail-open events from Umami/Firebase, then run:

```text
npm run routes:report:corridor-funnel -- path/to/export.json
```

Record by state and family:

- corridor selections;
- trip-option selections;
- selection rate;
- route-detail opens;
- backtracking or zero-result interactions;
- safety/access reports attributable to the family.

## Migration gate

Move a family from `review` to `approved` only when continuity copy is accurate, the source review is current, and the pilot shows no material increase in backtracking or safety/access complaints. Keep `condition-family` when the grouping reduces choice overload but continuity is not proven.

## Deprecation gate

Keep route records in `observe` until a baseline and pilot conversion rate exist. Move to `recommend` only when the canonical corridor is clearly preferred and all underlying trip options remain linked. `deprecate` and `archive` require the policy and audit gates in [route-deprecation-policy.md](route-deprecation-policy.md); archiving without conversion evidence must fail the audit.
