# Android welcome and trip-intent proposal

## Recommendation

Add a short, dismissable first-run welcome flow that explains PaddleToday in plain language, then offer an optional one-tap trip preference prompt. The welcome flow should be educational and non-blocking. The preference prompt should improve the first recommendation, but users must be able to skip it and reach Today immediately.

This is a better fit than a traditional onboarding funnel because the app already has a useful default experience: Today ranks current route calls, while Explore already supports intents such as best nearby, clean routes, watch routes, quick floats, full-day routes, and camping routes.

## User problem

Someone opening the app for the first time may not know:

- whether a score is a river rating, a safety guarantee, or a recommendation;
- why water level and weather can change a route's score;
- how much of the result is based on access, route characteristics, and data confidence;
- whether they need to grant location permission immediately;
- what to do when a route is marked Fair, Watch, or Skip.

The first session should answer those questions quickly enough that the user understands the result on Today without feeling lectured.

## Proposed first-run flow

### Card 1: Find a better river day

**Headline:** Find a route that fits today

**Body:** PaddleToday checks public river routes and combines current water levels, recent trends, weather, route characteristics, access information, and data confidence to produce a practical call for today.

**Visual:** A route card with a score, rating, and a small “today” condition summary.

### Card 2: Scores are decision support

**Headline:** A score is a starting point, not a promise

**Body:** Strong and Good mean the available data lines up well. Fair means there are tradeoffs or uncertainty. Watch and Skip calls tell you when to recheck conditions before committing.

**Visual:** A simple Strong / Good / Fair / Watch / Skip scale, using the existing rating colors and language.

### Card 3: Open the details before you launch

**Headline:** See what shaped the call

**Body:** Open any route to review the score breakdown, gauge and weather details, access logistics, hazards, freshness, and official sources. Conditions can change after the app refreshes, so confirm the final call before launching.

**Visual:** A route-detail preview highlighting “Why this score?”, gauge/weather, and access sections.

**Actions on every card:** `Next`, `Skip`, and a progress indicator. The final card uses `See today’s routes`.

The flow should be a modal or full-screen presentation over the existing tab shell, shown once per install. `Skip` and the close control should have equal visual weight to `Next` so the user never feels trapped.

## Optional trip preference prompt

After the final welcome card, show one lightweight prompt:

**Headline:** What kind of paddle are you looking for?

**Subtext:** We’ll tune Explore and your first set of suggestions. You can change this anytime.

Offer five large, single-tap choices:

- **Best option near me** — drive-aware recommendations;
- **A clean call today** — Strong and Good route calls;
- **A quick float** — easy-to-moderate routes up to three hours;
- **A full-day outing** — longer single-day routes;
- **Camping or base camp** — routes with camping support.

Include `Skip for now`. Selecting a choice should open Today or Explore with the corresponding existing intent applied. Do not ask for a location permission inside this prompt. If the user chooses a nearby option, explain location only when the app needs it and preserve the no-location fallback.

For the first release, do not ask a multi-question survey about skill, group size, boat type, exact mileage, or ambitions. Those questions add friction before the user has seen the product and may imply a level of personalization the scoring model does not yet support.

## Why this approach

The welcome cards build trust by explaining the score and its limits. The optional prompt gives us useful direction without inventing a separate recommendation model. It can write the selected intent into the same local Explore preference state already used by the app, so the behavior remains predictable and reversible.

The prompt should be treated as a preference, not a profile. Store it locally on the device; do not require sign-in, email, or precise location. If analytics are enabled in a native preview or production build, record only aggregate interaction events such as welcome completed/skipped and intent selected. Do not attach precise location or route history to the event.

## Re-entry and discoverability

Add `How PaddleToday works` and `Change trip preference` to the existing More tab. This makes the education available after dismissal and lets users undo a choice without clearing app data. A small `Why this score?` link on route detail remains the deeper, contextual explanation for users who want more detail.

## Suggested storage

Use versioned AsyncStorage keys, for example:

- `paddletoday:welcome-completed:v1`
- `paddletoday:trip-intent:v1`

If the copy or interaction model changes materially, increment the welcome version so a future release can show the revised explanation once. Do not reset the flow for every app update.

## Measurement and success criteria

Measure the flow with privacy-light events:

- welcome shown;
- welcome completed or skipped, including the card reached;
- trip intent selected or skipped;
- first route opened after welcome;
- location permission accepted or declined after a nearby choice;
- first-session return to Today or Explore.

The first test should answer:

1. Do users understand why the score changes?
2. Does the prompt increase route opens or useful Explore interaction?
3. Does it increase early exits or location-permission abandonment?
4. Do users later return to change or clear the preference?

Success should be defined as better first-session route engagement without a meaningful increase in onboarding abandonment. The prompt is not successful if it merely collects answers.

## Rollout plan

1. Ship the welcome cards and re-entry links first, with the trip prompt behind a remotely changeable or easily removable flag if available.
2. Test on Android gesture navigation and three-button navigation, including small phones and a clean install.
3. Compare prompt shown versus prompt skipped for first route opens and Explore usage.
4. Keep the prompt if it improves useful actions without increasing early exits; otherwise retain the education and remove or simplify the preference step.

## Scope for an initial implementation

- one new welcome screen or modal flow;
- one optional trip-intent selection screen;
- local persistence and a reset/replay entry in More;
- mapping to existing Explore intents;
- accessible labels, back handling, Android system-inset support, and screen-reader order;
- a small set of analytics events using the existing observability wrapper;
- Android QA for cold start, relaunch, skip, back, rotation/layout changes, denied location, offline data, and re-entry from More.

## Bottom line

Teach the product first, then ask one useful question. PaddleToday should say: “Here is how today’s call is made, here is what it does and does not mean, and what kind of day are you planning?” That is enough to make the app feel intentional without making new users complete a survey before they can paddle.
