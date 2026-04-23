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
- Astro build and typecheck now pass locally
- still needs visual device-level validation against the screenshot issues

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
- Repo-local validation status: `npm run typecheck` ✅ and `npm run build` ✅ on 2026-04-23 AM
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
