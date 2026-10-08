# Route image-note cleanup — 2026-10-08

## Finding

The public route page renders `evidenceNotes` in its “What to know before you go” section, and consolidated river pages render the same notes beside route options. The route catalogs contained 247 cards across 18 state files labeled “Image decision,” “Rights-clean image decision,” or equivalent. They described photo search/licensing decisions, fallback imagery, or photo-context caveats rather than trip planning.

The route gallery already presents the selected photo’s caption and credit/license details, or tells visitors when approved route photos are not available. Repeating image production notes in trip-planning guidance added boilerplate across unrelated routes and obscured access, flow, hazard, and logistics details.

## Changes

- Removed the 247 image-decision evidence cards from route catalogs.
- Preserved the three cards that also contained route distinction or camping guidance, rewriting those cards to retain only the paddler-relevant information.
- Left route gallery captions, image credits, license metadata, source links, and all other access, flow, hazard, and logistics notes unchanged.

## Indexing relevance and limits

This removes repeated internal process text from route-page content and makes the public planning notes more focused. It is a content-quality improvement, not evidence that these notes caused the indexing or traffic decline. Measure any search impact only after Google recrawls the affected pages; no Search Console state was changed for this cleanup.

No test suite or build was run for this content-only edit.
