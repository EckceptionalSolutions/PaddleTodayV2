# Mobile Observability

PaddleToday mobile uses `@sentry/react-native` for release crash and error reporting. The integration is safe by default: it does nothing until a Sentry DSN is provided.

## Runtime Configuration

Set these for preview and production builds:

- `EXPO_PUBLIC_SENTRY_DSN`: public Sentry DSN for the mobile project.
- `EXPO_PUBLIC_APP_ENV`: `preview` or `production`.
- `EXPO_PUBLIC_SENTRY_TRACES_SAMPLE_RATE`: keep at `0` for MVP unless performance tracing is explicitly enabled.

Set this as an EAS secret so source maps can be uploaded during builds:

- `SENTRY_AUTH_TOKEN`

The Expo/Sentry docs also require a Sentry organization slug and project name during project setup. Do not commit auth tokens or private project credentials.

## Captured Signals

Automatic:

- Native crashes when Sentry is configured in a native build.
- Unhandled JavaScript errors through `Sentry.wrap`.
- React Query query errors.
- React Query mutation errors.

Handled app errors:

- API diagnostic failures.
- Route report submission failures.

Breadcrumbs:

- Route opened.
- Saved river toggled.
- Directions opened.
- Route report started.
- Route report submitted.
- App opened.
- Alert create started, succeeded, or failed.
- API diagnostic started, succeeded, or failed.
- Support links opened.

## Privacy Notes

The integration avoids intentionally sending user email, contributor name, report text, or photo contents to Sentry. Route slugs, route IDs, status codes, counts, and non-identifying app state may be included as tags, extras, or breadcrumbs.

Before store submission, make sure the privacy policy and store data safety forms reflect whether Sentry is enabled in the submitted build.
