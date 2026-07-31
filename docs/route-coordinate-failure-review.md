# Route coordinate failure review

Regenerate the coordinate audit and visual review dashboard with:

```powershell
npm run routes:audit:coordinates -- --concurrency=8
npm run routes:audit:coordinates:visual
```

Then open [`route-coordinate-failure-review.html`](./route-coordinate-failure-review.html). The queue contains only endpoints currently classified as `failure`. Select an item to see:

- the canonical NHD route geometry;
- the endpoint coordinate (red);
- the app's current put-in and take-out coordinates (purple and teal);
- the active reach clipped between those current endpoints (dark green), with the full source geometry remaining faint in the background;
- the nearest matched flowline (orange);
- the nearest named waterway (blue);
- the nearest NHD waterbody or area polygon (green, when available);
- links to Google Maps and an access-source search.
- editable latitude/longitude fields; clicking the map updates the selected endpoint;
- a copy button for the selected endpoint's proposed coordinate correction.
- persistent local triage status (`accepted`, `needs research`, or `skipped`);
- keyboard shortcuts: `J/K` next/previous, `A` accept, `R` research, `S` skip;
- an accepted-corrections JSON export.

Use the search box to group repeated/shared access points. After correcting coordinates, rerun both commands so the queue and embedded geometry reflect the current data.

Map edits are intentionally review-only. They change the dashboard's in-memory draft and copyable correction text, but never write route source files automatically.

The generator also writes [`route-coordinate-needs-research.json`](./route-coordinate-needs-research.json), a handoff ledger for every unresolved failure. These entries are deliberately not treated as coordinate corrections until an authoritative source confirms them.

Review state is saved in the browser's local storage. Use **Export accepted corrections** when you are ready to apply the selected coordinates to the route data.

The coordinate audit also recognizes documented alternate waterways and official access anchors for branch, tributary, confluence, and generalized-polygon cases, including South Branch Root River, Lynn Camp Creek, Bass Point Creek at E-26, Crow River at Lake Rebecca, Spring Valley Creek at Round Spring, Chemung River at Sayre, the Mississippi River at Longfellow Lagoon, Otter Tail River at Hwy 210, and Shell Rock River at Renning Landing. These remain visible as review items but are no longer counted as coordinate failures.
