# App polish review guide

The polishing work is local and uncommitted. The detailed evidence and batch history
are in [POLISH_LOG.md](POLISH_LOG.md). This guide groups the changes by what a user
will notice, rather than by the order they were made.

## Main improvements

| Area | Result | Review starting points |
| --- | --- | --- |
| Forms and feedback | Pending actions resist duplicate submission; failed requests retain drafts and offer recovery; success requires confirmation. | `src/scripts/request-page.js`, `src/scripts/contribute-page.js`, `apps/mobile/src/components/feedback-sheet.tsx` |
| Saved routes | Notes survive failure and undo; unreadable storage is preserved; retry distinguishes an unreadable list from an empty one; mobile save controls identify the route. | `src/scripts/favorites-store.js`, `src/scripts/favorites-page.js`, `apps/mobile/src/providers/saved-rivers-provider.tsx` |
| Finding routes | Search tolerates accents and spacing; location, filters, map loading, and cached results recover more clearly. | `packages/api-contract/src/search-text.ts`, `src/scripts/site-shell.js`, `apps/mobile/src/screens/explore-screen.tsx` |
| Trip planning | Selected access points carry through directions and exports; sharing offers copyable fallbacks; duration parsing retains units and ranges. | `packages/api-contract/src/paddle-duration.ts`, `packages/trip-pack/src/index.ts`, `apps/mobile/src/components/prepare-trip-sheet.tsx` |
| Weather and freshness | Missing measurements stay unknown; incomplete or severe-weather hours are excluded from website best-window highlights; storm warnings remain visible. | `packages/api-contract/src/hourly-weather-view-model.ts`, `src/scripts/river-detail-page.js`, `apps/mobile/src/screens/river-detail-screen.tsx` |
| Keyboard and display | Tabs retain focus through layout changes; dialogs and recovery controls are easier to operate; failed photos keep usable fallbacks. | `apps/mobile/src/lib/selection-keyboard.ts`, `src/scripts/action-feedback.js`, `tests/visual/keyboard-layout.spec.ts` |
| Server and client reliability | Malformed submissions and URLs return recoverable errors; static streams close correctly; headers, compression, and request deadlines behave consistently. | `src/server/http.ts`, `src/server/static-route.ts`, `packages/api-client/src/index.ts` |
| Development checks | Standard typechecking includes runtime TypeScript; workspace dependency analysis follows shared package aliases; README documents browser verification. | `scripts/typecheck.mjs`, `tsconfig.runtime.json`, `scripts/dependency-aliases.cjs`, `README.md` |

## Quick manual review

1. Search for a route, save it, add a note, remove it, and use Undo.
2. Change put-in or take-out, then inspect directions and the trip sharing text.
3. Navigate search, tabs, and dialogs using only the keyboard.
4. Inspect route weather and freshness alongside missing-data examples in the tests.
5. Review form recovery with the mocked browser suites before testing real submissions.

## Verification scope

Latest combined checks on September 7, 2026:

| Check | Result |
| --- | --- |
| Workspace tests | 1,178 passed |
| Mobile Chromium interactions | 86 passed |
| Added website interaction suites, desktop and iPhone Chromium | 131 passed; one intentional mobile skip for desktop modifier-click behavior |
| Integrated typechecking | Passed after correcting the public request-header options type |
| Production build | Passed; 2,429 pages |
| Real local HTTP responses | Gzip refusal, gzip decoding, cache variation, content length, and HEAD parity passed |
| Whitespace check | Passed |

The website suite preceded the last API-client changes; its request-form suite was
rerun afterward with 14 passes. The full mobile suite includes those client changes.
After that checkpoint, the invalid-duration display fix passed all 87 mobile unit
tests and mobile typechecking; valid duration labels remain covered.

Run `npm run test:workspaces` and `npm run typecheck` for code and data checks.
Run `npm run test:mobile:web` for mobile interactions in Chromium. Website browser
commands and local preview setup are documented in the README. Build with
`npm run build:app` after the checks pass.

Browser submission tests intercept API writes and sharing; they do not establish
that real email, push delivery, or native device integrations work. Native camera,
calendar, permission prompts, and sharing still need device verification. The older
critical-page screenshot baselines were not updated during this work; their known
differences are recorded in the polish log. The dependency graph retains the
documented script-only resolver warnings.
