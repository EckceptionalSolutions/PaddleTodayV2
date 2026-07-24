# Corridor proposal review workflow

Every new corridor definition or continuity change requires a source-backed review before it affects discovery grouping.

## Required review

1. **Scope and overlap** — identify the route records being grouped, their overlap, and any independent branches.
2. **Access legality** — verify every put-in, take-out, and intermediate stop is public or explicitly permitted; record parking and carry details.
3. **Hazards and continuity** — inspect dams, portages, private-bank stretches, closures, strainers, and known gaps. Mark each adjacent edge `verified`, `blocked`, or `unknown`.
4. **Gauge boundary** — confirm the condition zone and gauge apply to the whole proposed corridor; split the corridor when they do not.
5. **Canonical trip option** — select the representative route, preserve all underlying trip options, and attach source URLs/notes to the review record.

## Approval states

- `draft`: proposal is being researched and does not change grouping.
- `review`: evidence is complete enough for a second reviewer.
- `approved`: continuity status and edge list are accepted for production grouping.
- `rejected`: grouping is unsafe, misleading, or not access-valid.

The audit command must fail when an approved corridor has missing canonical access IDs, duplicate route assignment, or an edge that is not explicitly classified.
