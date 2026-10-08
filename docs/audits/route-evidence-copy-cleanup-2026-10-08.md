# Route evidence-note copy cleanup - 2026-10-08

## Finding

Public route pages and river hubs render `evidenceNotes` in the trip-planning section. A review found repeated notes written around the site's implementation decisions, such as why a threshold was stored or why a route was split, alongside notes with dated review snapshots. Some entries made useful source evidence harder to scan as paddler guidance.

## Changes

- Rewrote 53 evidence notes across 10 state route catalogs in Arkansas, Indiana, Iowa, Minnesota, Missouri, Nebraska, Ohio, Pennsylvania, Texas, and Wisconsin.
- Changed internal product descriptions into direct explanations of source evidence, access references, distance differences, or conditions paddlers should check.
- Kept the route-specific flow observations, thresholds, distance measurements, endpoint distinctions, source links, and uncertainty qualifications.
- Clarified that the Loup River's 350 cfs and 1,600 cfs observations apply to different stretches, and retained the published-versus-mapped Yellow Breeches distance differences.

## Indexing relevance and limits

This reduces implementation-centric phrasing and makes visible route evidence more useful to visitors. It is a content-quality improvement; it does not establish why Google has left pages unindexed or predict ranking recovery. Reassess after Google recrawls the affected pages. No Search Console state was changed.

No local test suite or build was run. `git diff --check` passed.
