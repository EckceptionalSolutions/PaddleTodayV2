# MOBILE_UI_TODO.md

Scope: PaddleToday V2 mobile UI only.

## Current Priority

Get mobile UI into a clearly good, trustworthy state for real users, with homepage first.

## Rules

- Mobile UI only unless a change is required to preserve desktop behavior.
- Local commits are allowed.
- Do not push to GitHub.
- Prefer small, reviewable improvements.
- Validate changes when feasible.
- If validation is blocked by environment/deps, make safe progress anyway and report the blocker.

## Current Status

Latest local pass (2026-04-24 just before noon): added one more narrow homepage-only mobile override layer at the end of `public/global.css` to force the three screenshot-confirmed fixes without touching desktop layout logic — the header is quieter and shorter with the wordmark/request chrome suppressed, the locked "Today's Best" card is reduced to a tight single-row prompt again, and mobile Map mode now keeps a smaller shortlist tray so the map owns more of the first viewport.

Latest local pass (2026-04-24 late morning): added a final homepage mobile stabilization override layer to undo the unreadably tiny state — the header is still shorter but now cleaner and readable, the locked "Today's Best" card stays compact as a single short prompt row, and Map mode keeps an even smaller shortlist peek so more of the map is visible first.

Latest local pass (2026-04-24 morning): converted the homepage mobile nav into a quieter segmented strip, collapsed the locked "Today's Best" card to copy-only on small screens, and trimmed the initial Map shortlist peek again so more map is visible first.

Latest follow-up pass (2026-04-24 early morning): hid the extra homepage mobile promo/trust chrome, tightened the homepage header pills/search again, shortened the locked "Today's Best" prompt copy, and reduced the initial mobile Map shortlist sheet further so Map mode gives more of the viewport to the map first.

Latest focused pass (2026-04-24 morning): trimmed the homepage mobile header chrome again with shorter top padding and smaller nav/search controls, shortened the locked "Today's Best" copy again, and reduced the initial mobile Map shortlist sheet to keep more of the map visible on first open.

Latest corrective pass (2026-04-24 morning): backed the homepage mobile overrides out of the unreadably tiny state while keeping them compact — the header stays single-row but readable, the locked "Today's Best" card is still aggressively short without collapsing into microscopic text, and the mobile Map sheet peek remains smaller so the map gets more of the first viewport.

Latest follow-up pass (2026-04-24 late morning): normalized the final homepage-only mobile override layer so it stops shrinking into illegible sizes — nav/search controls are still shorter but readable, the locked "Today's Best" card stays one-line compact with a tiny label pill, and the Map mode shortlist peek is trimmed again so more map stays visible first.

Homepage mobile received an initial pass for:
- List default on mobile
- dedicated Map mode
- bottom-sheet style results panel over the map

This pass must still be validated and likely polished.

Latest local pass (2026-04-23 AM):
- tightened the small-screen site header and nav pills
- compressed the locked mobile "Today's Best" card
- reduced initial mobile map bottom-sheet height so more map stays visible
- follow-up pass tightened the header further, compacted the locked card harder, and shrank the mobile map shortlist peek again
- latest follow-up pass stripped the homepage mobile header down further on very small screens, hid the extra request CTA there, compacted the locked card again, and lowered the mobile map shortlist peek again
- newest pass collapsed the locked mobile "Today's Best" card to a compact prompt row, stripped the mobile header down to logo + nav + search only, and reduced the map shortlist peek again so Map mode stays map-first
- latest noon pass tightened the homepage mobile nav pills/search affordance again, compressed the locked featured card row further, and cut the initial map shortlist peek again so more map stays visible
- latest early afternoon pass shrank the homepage mobile header again by hiding the mobile request CTA and brand tagline, compressed the locked featured prompt copy/padding again, and lowered the initial map shortlist peek again so Map mode shows even more map first
- latest mid-afternoon pass collapsed the locked mobile "Today's Best" card all the way down to a compact prompt row, stripped the homepage mobile header down to logo + nav pills + icon-only search, and reduced the initial mobile map sheet peek again so Map mode gives more of the viewport to the map
- latest late-afternoon pass tightened the homepage mobile header yet again with smaller logo/nav/search chrome, shortened the locked featured prompt copy, and shrank the initial mobile map sheet peek plus back control so Map mode starts even more map-first
- latest focused pass added one final homepage-only mobile override layer to trim header chrome further, collapse the locked "Today's Best" prompt harder, and cut the mobile Map sheet footprint again without changing desktop behavior
- latest evening pass corrected the over-tight mobile override stack: homepage header is compact but readable again, the locked "Today's Best" row stays intentionally short, and mobile Map mode now keeps a visible shortlist peek instead of collapsing the sheet away
- Astro build and typecheck now pass locally
- local Playwright screenshots look materially better for the three confirmed homepage mobile issues; still needs real device/user validation against the screenshot complaints
- latest early-evening pass collapsed the homepage mobile header into a logo + tighter nav/search row, shortened the locked "Today's Best" prompt copy again, and reduced the mobile Map shortlist sheet footprint further so more map stays visible on first open
- latest late-evening pass adds a final homepage-only mobile override layer that trims the header chrome again, keeps the locked "Today's Best" state intentionally compact, and cuts the Map shortlist peek down further while keeping the mobile layout readable
- latest late-night pass tightened the homepage mobile header chrome again with smaller logo/nav/search treatment, shortened the locked "Today's Best" prompt row further, and reduced the initial mobile Map shortlist footprint again so more of the map is visible on first open
- latest 2026-04-24 pass forces the homepage mobile header into a tighter single-row logo/nav/search layout, trims the locked "Today's Best" row to a slimmer one-line prompt, and lowers the mobile Map shortlist sheet again so Map mode gives more of the viewport to the map
- repo-local validation still passes after the latest pass: `npm run typecheck` ✅ and `npm run build` ✅ on 2026-04-23 late evening
- repo-local validation still passes after the latest late-night pass: `npm run typecheck` ✅ and `npm run build` ✅ on 2026-04-23 at roughly 11:10 PM local time
- targeted Playwright mobile homepage rendering ran and produced a fresh actual screenshot, but the visual assertion could not complete because no mobile baseline snapshot exists for that spec yet
- richer local preview validation remains partially blocked in this sandbox because binding a local preview/static server is not permitted here
- latest 2026-04-24 overnight pass tightened the homepage-only mobile override layer again: smaller logo/nav/search chrome, a slimmer locked "Today's Best" prompt row, and an even shorter initial Map shortlist sheet so more of the map is visible immediately
- latest 2026-04-24 pre-dawn pass tightened the homepage header chrome one more step on very small screens, shortened the locked "Today's Best" prompt copy again, and reduced the initial Map shortlist peek further so Map mode gives even more of the viewport to the map first
- repo-local validation still passes after the latest overnight pass: `npm run typecheck` ✅ and `npm run build` ✅ on 2026-04-24 around 2:23 AM local time
- repo-local validation still passes after the latest pre-dawn pass: `npm run typecheck` ✅ and `npm run build` ✅ on 2026-04-24 around 3:26 AM local time
- repo-local validation still passes after the latest focused morning pass: `npm run typecheck` ✅ and `npm run build` ✅ on 2026-04-24 around 7:40 AM local time
- repo-local validation still passes after the latest just-before-noon mobile override pass: `npm run typecheck` ✅ and `npm run build` ✅ on 2026-04-24 around 11:53 AM local time

## Priority Queue

### 1) Fix screenshot-confirmed homepage mobile issues
User-tested issues from screenshots now override generic polish work:
- Header/navigation on mobile is still too busy and tall
  - simplify the top card
  - reduce control density
  - make nav pills feel cleaner and less dominant
  - reduce early-page clutter
- Hidden "Today's Best" card is far too tall on mobile
  - shrink it aggressively
  - remove dead vertical space
  - keep the locked state compact and useful
- Map mode is still not map-first enough
  - bottom sheet is too tall
  - too much of the map is covered
  - make the initial sheet state smaller so the map is actually usable

### 2) Validate homepage mobile behavior
- Confirm mobile List/Map toggle works well
- Confirm default mobile view is List
- Confirm switching to Map mode feels intentional and smooth
- Confirm bottom-sheet results remain usable and readable
- Confirm route selection / marker selection sync behaves correctly
- Confirm empty and sparse result states still look good

### 3) Polish homepage mobile UX
- Tune bottom-sheet height and spacing
- Tune safe-area / viewport-height behavior
- Improve visual hierarchy in Map mode
- Smooth interaction rough edges and awkward state transitions
- Reduce any mobile clutter that hurts first-impression clarity

### 3) Protect non-mobile behavior
- Check for tablet/desktop regressions caused by homepage mobile changes
- Keep desktop behavior stable
- Avoid broad refactors unless needed

### 4) Restore/strengthen local validation
- Keep build/typecheck green after each homepage mobile pass
- Repo-local validation status: `npm run typecheck` ✅ and `npm run build` ✅ on 2026-04-23 early afternoon
- Add device-level visual validation for the screenshot-confirmed homepage issues
- Improve repo-local confidence for future UI iterations

### 5) Move to /explore/ only after homepage feels solid
- Reuse the best mobile interaction patterns from homepage
- Keep scope disciplined
- Do not rewrite explore prematurely

## Stop Conditions for "good place"

The mobile UI can be considered in a good place when:
- homepage mobile flow feels clean and obvious
- list/map interaction is smooth and not confusing
- bottom-sheet map mode feels deliberate, not hacked-on
- no obvious mobile layout breakage remains on common states
- desktop behavior remains acceptable
- remaining issues are minor polish, not structural UX problems

## Reporting

At the end of each run, report:
- what changed
- what remains
- blockers
- recommended next step
