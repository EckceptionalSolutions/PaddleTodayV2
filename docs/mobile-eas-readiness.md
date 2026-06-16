# Mobile EAS Readiness

Run this before creating preview or production EAS builds:

```sh
npm run mobile:release-check
npm run mobile:typecheck
```

The release check validates the repo-side configuration that can be checked without App Store, Play Console, or EAS account access:

- `apps/mobile/app.config.base.json` and `apps/mobile/eas.json` parse.
- Bundle/package identifiers and native version fields are present.
- Production API URL is configured for EAS build profiles.
- Metro config is present.
- Firebase Analytics and Crashlytics dependencies/config are present.
- Location and photo permission copy exists.
- Required app assets exist.
- Required release docs exist.
- Privacy and terms pages exist and mention report/photo flows.

The check does not replace real native QA. It cannot verify:

- Apple Developer or Google Play Console access.
- EAS project ownership.
- Signing credentials.
- TestFlight or Google internal testing install.
- Firebase project/native config files exist in the Firebase Console and local build input.
- Actual production alert email delivery.
- Real device safe-area and gesture behavior.

If the script fails, fix the reported item before starting a store build.

For the full internal-build sequence, use `docs/mobile-eas-internal-build-runbook.md`.
