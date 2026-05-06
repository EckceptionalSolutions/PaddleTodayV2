# Mobile Store Metadata Decisions

## Public App Name

Decision: use `PaddleToday` for the MVP native app name and store listing.

Reasoning:

- It matches the existing Expo `name` in `apps/mobile/app.json`.
- It matches the production domain, `paddletoday.com`.
- It is compact enough for app icons, home screen labels, and store search.
- It avoids a split identity between `PaddleToday` and `Paddle Today` during launch.

Use `Paddle Today` only in natural-language sentences when it reads better, such as "Contact Paddle Today." Keep metadata, screenshots, listing title, and native app name as `PaddleToday`.

## Support URL

Decision: use `https://paddletoday.com/contact/`.

Reasoning:

- The page already exists.
- It includes `hello@paddletoday.com`.
- It explicitly handles questions, route requests, corrections, feature ideas, and bug feedback.
- It asks users to include river/page context, which is useful for support triage.

## Marketing URL

Decision: use `https://paddletoday.com/`.

Reasoning:

- It is the canonical public product URL.
- It aligns with the production API/site origin used by release builds.
- It keeps the store listing simple until a dedicated mobile landing page exists.

## Privacy Policy URL

Decision: use `https://paddletoday.com/privacy/`.

## Terms URL

Decision: use `https://paddletoday.com/terms/`.

## Metadata Still Needing Owner Review

- Final subtitle/tagline if App Store Connect asks for one.
- Final promotional text after screenshots are captured.
- Final keyword order after checking competing paddling and river-condition apps.
- Any legal wording requested for safety disclaimers.
