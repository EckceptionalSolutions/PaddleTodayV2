# Mobile improvement review

September 8, 2026. Start with the local mobile preview at
http://127.0.0.1:4391/. The main website remains at http://127.0.0.1:4323/.
The mobile preview uses recorded reference responses and a web map fallback;
it is not a source of current paddling conditions or native-map performance evidence.

## Changes to try

- **Planning location:** search an ambiguous city such as Springfield, choose
  the intended state, and revisit Today, Explore, Weekend and Notifications.
  Failed device saves have an explicit local retry.
- **Explore:** switch Map/List, expand the route drawer, change filters and
  recover from an empty call filter. Short layouts retain reachable actions.
- **Route decisions:** old conditions and hourly forecasts are marked as saved
  reference information. Refresh restores current presentation only when the
  response supports it. Planning-only routes remain unscored.
- **Access and preparation:** choose a shorter segment, reverse shuttle driving
  directions, prepare a trip, close it and resume the exact draft from Saved.
  Date/time errors appear beside the affected field and clear when corrected.
  Calendar/GPX availability checks cancel immediately on Close, including while
  a local draft save is pending.
- **Compare routes:** use Compare saved routes to select up to three across
  different rivers, or compare reaches from a river’s page. Review access
  logistics, duration and current-call confidence before opening a route.
- **Saved:** recent routes and trip drafts provide shortcuts. Notes distinguish
  reaches, protect unsaved edits and survive failed writes. Removal has Undo;
  delayed storage shows pending feedback. Search names, areas or personal notes
  without losing comparison selections.
- **Search and directories:** Today search keeps Close visible on narrow screens,
  wraps long route names and finds accented names without accents. More's river
  directory shows route counts without implying one score covers a whole river.
  Postal state aliases work in Today, Saved, Explore and the state picker.
- **Alerts and reports:** nearby switches explicitly show On/Off, report dates
  have a calendar/manual choice, and sheets support short layouts and reduced
  motion. Good/Strong saved-route alert thresholds are independent.
- **Submission forms:** required labels remain visible after typing. Route requests
  and photo contributions show field errors in context and retain entries after
  failed submission; corrected photo entries clear obsolete validation feedback.
  Back protects edited requests and photo contributions with Keep editing/Discard
  choices, including attached photos. Sending forms wait for confirmation before leaving.
  Reports offer Continue after closing an unsent draft; leaving the route protects it.
  Missing report choices scroll into view. Character limits and optional date errors
  appear in context. A failed photo encode retains the other selected images, and
  uncertain submission confirmations keep entries available for deliberate retry.
- **Feedback:** opening choices and store links remain reachable in short
  layouts. Typed feedback has Keep editing/Discard controls and survives a
  failed submission.

## Verification and remaining work

The batch-by-batch evidence is in [MOBILE_POLISH_LOG.md](MOBILE_POLISH_LOG.md).
The mobile typecheck now rejects unused locals/parameters. Unit tests and
production-export browser checks cover recovery, persistence and navigation.

Native exports are available, but native gestures, device keyboard behavior,
screen readers and platform date pickers still require device QA. Automatic
approval review blocked the local Expo development-server command. Offline trip
packets remain deferred until the native baseline and freshness boundaries are
verified, as required by the [implementation plan](audits/mobile-improvement-plan-2026-09-08.md).
