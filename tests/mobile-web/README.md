# Mobile web flow checks

Run `npm run test:mobile:web` from the repository root. This uses the existing
Playwright dependency and starts the Expo web app on port 8082, or reuses a local
server already running there. Chromium must be installed for Playwright.

The suite uses isolated browser storage and intercepts API requests. Photo tests
use a generated one-pixel fixture; no submissions or notifications are sent.
The route-report fixture is a stored local route snapshot with its decision
explicitly withheld, so it does not represent current paddling conditions.
Failure traces are retained in the usual Playwright test output.

These checks cover the Expo web rendering of mobile flows, including keyboard
interaction, pending state, failed submissions, and retry. Native permission
prompts, cameras, and device layouts still need device testing.
