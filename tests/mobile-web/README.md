# Mobile web flow checks

Run `npm run test:mobile:web` from the repository root. This uses the existing
Playwright dependency and starts the Expo web app on port 8082, or reuses a local
server already running there. Chromium must be installed for Playwright.

For a self-contained production-export check, run:

```powershell
npm run test:mobile:web:export
# Optional focused pass or another phone width:
$env:MOBILE_WEB_WIDTH = '320'
npm run test:mobile:web:export -- tests/mobile-web/route-comparison.spec.ts
```

This builds Expo web into `apps/mobile/.expo/mobile-web-check`, starts a temporary
loopback server on an available port, runs Playwright, and closes the server.
It leaves your existing review servers running. API traffic is local and must be
mocked by each test; the host does not proxy production or accept submissions.
The export remains available for debugging. A lock prevents concurrent builds
from changing the same test output; after a forcibly terminated run, remove
`apps/mobile/.expo/mobile-web-check.lock` only once that run has stopped.

To test an already running preview without starting Expo, set its origin. Set
`MOBILE_WEB_WIDTH` to run the same checks at another phone width (default 390):

```powershell
$env:MOBILE_WEB_BASE_URL = 'http://127.0.0.1:4391'
$env:MOBILE_WEB_WIDTH = '320'
npm run test:mobile:web
Remove-Item Env:MOBILE_WEB_BASE_URL, Env:MOBILE_WEB_WIDTH
```

The preview must serve the mobile app and support its route URLs. These settings
only control the test browser; they do not change the app's API configuration.

The suite uses isolated browser storage and intercepts API requests. Photo tests
use a generated one-pixel fixture; no submissions or notifications are sent.
The route-report fixture is a stored local route snapshot with its decision
explicitly withheld, so it does not represent current paddling conditions.
Failure traces are retained in the usual Playwright test output.

These checks cover the Expo web rendering of mobile flows, including keyboard
interaction, pending state, failed submissions, and retry. Native permission
prompts, cameras, and device layouts still need device testing.
