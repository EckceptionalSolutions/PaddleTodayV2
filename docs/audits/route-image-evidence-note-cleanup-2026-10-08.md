# Route image-note cleanup — 2026-10-08

## Finding

The public route page renders `evidenceNotes` in its “What to know before you go” section, and consolidated river pages render the same notes beside route options. The route catalogs contained 247 cards across 18 state files labeled “Image decision,” “Rights-clean image decision,” or equivalent. Of those, 244 described photo search/licensing decisions or fallback imagery rather than trip planning. Three cards describe the context of selected gallery photos and remain with paddler-facing wording.

The route gallery already presents the selected photo’s caption and credit/license details, or tells visitors when approved route photos are not available. Repeating image production notes in trip-planning guidance added boilerplate across unrelated routes and obscured access, flow, hazard, and logistics details.

## Changes

- Removed 244 image-decision evidence cards from route catalogs.
- Kept three photo-context notes for catalogs whose routes have selected river or watershed imagery; the wording describes what the image shows rather than how it was licensed or selected.
- Left route gallery captions, image credits, license metadata, source links, and all other access, flow, hazard, and logistics notes unchanged.

## Indexing relevance and limits

This removes repeated internal process text from route-page content and makes the public planning notes more focused. It is a content-quality improvement, not evidence that these notes caused the indexing or traffic decline. Measure any search impact only after Google recrawls the affected pages; no Search Console state was changed for this cleanup.

No local test suite or build was run. Push-triggered API CI found that Georgia and Idaho route-coverage checks require their photo-context evidence cards, and Wyoming requires its image card; those three cards are retained in the source.
