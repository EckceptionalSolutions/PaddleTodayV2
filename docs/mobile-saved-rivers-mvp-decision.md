# Mobile My Routes and Alerts Product Decision

Decision: use **My Routes** as the user-facing destination, use **Save route** and **Saved** for the device-local route collection, and treat condition alerts as a separate durable subscription.

## Why

The current implementation stores saved routes in React Native `AsyncStorage` under `paddletoday:saved-rivers`. That means the feature works without an account system, without authentication support, and without collecting extra personal data.

For MVP, a device-local saved-route list is enough because the core user need is quick repeat checks on the same phone:

- open the app,
- check today's board,
- save familiar routes,
- return to those routes quickly later.

Adding account sync before launch would expand the release surface into authentication, passwordless login or OAuth, account deletion, support tooling, privacy disclosures, recovery flows, backend sync conflicts, and cross-device QA. That is not required for a credible first release.

## UX Contract

Web and mobile use the same user-facing vocabulary:

- **Save route** adds a route to the local repeat-check list.
- **Saved** confirms that the route is in that list.
- **My Routes** is the destination for Saved Routes and Alerts.
- Removing a saved route does not silently delete an independently configured server-side alert.
- The UI explains that saved routes stay on this browser or device and does not imply account backup, cloud sync, or cross-device restore.

Condition alerts are different from saved routes. Alert subscriptions are stored by the API so scheduled evaluation can deliver email or push even when the app is closed. Their delivery identity and evaluation state must not depend on the local saved-route list.

## Outlook Contract

Tomorrow and weekend reads appear in the route decision path before trip logistics. They are planning guidance, not a launch decision, and always tell users to recheck live conditions.

“Weekend” means the next useful Saturday and Sunday in the route’s local timezone. After 6:00 PM on Sunday, it rolls forward to the following weekend instead of presenting a weekend that has effectively ended.

## Store and Privacy Impact

Device-local saved routes should not require account/data collection disclosures beyond local app storage. The app still needs to disclose:

- optional location use,
- optional route report/contact information,
- optional route-report photos,
- alert signup contact details,
- Firebase Analytics and Crashlytics in preview/production builds.

Saved routes become a bigger privacy item only if they are synced to PaddleToday servers or associated with a user identity.

## Future Work

Revisit account sync after the first release if users ask for:

- saved routes across devices,
- synchronized alert preferences,
- trip history,
- personalized recommendations,
- paid features,
- route report attribution.

If account sync is added later, add:

- sign in/sign out,
- account deletion,
- data export or clear-saved-data behavior,
- sync conflict handling,
- updated privacy policy and store data disclosures,
- support playbook updates.
