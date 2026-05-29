# Outlook Support Operations

Use this runbook for `hello@paddletoday.com` and any shared PaddleToday support mailbox.

## Goal

Turn support mail into a small, reliable intake queue for:

- safety-critical route reports
- app/API outages
- route requests and coverage gaps
- confusing river calls
- store review follow-up
- general feedback

## Mailbox Setup

Recommended mailbox:

- Primary address: `hello@paddletoday.com`
- Reply-to for app support links: `hello@paddletoday.com`
- Shared mailbox name: `PaddleToday Support` if Outlook shared mailbox access is enabled

Recommended folders:

- `PaddleToday/P0 Safety`
- `PaddleToday/P1 App or API`
- `PaddleToday/P2 Route Decision`
- `PaddleToday/P3 Route Request`
- `PaddleToday/P4 Feedback`
- `PaddleToday/Waiting`
- `PaddleToday/Done`

Recommended categories:

- `PT P0 Safety`
- `PT P1 Outage`
- `PT P2 Route Call`
- `PT P3 Route Request`
- `PT P4 Feedback`
- `PT Waiting`
- `PT Store Review`
- `PT Needs GitHub Issue`

## Triage Rules

Process new mail in this order:

1. Safety-critical route issue.
2. App or API outage.
3. Store review or TestFlight/Play testing blocker.
4. Route decision disagreement.
5. Missing route or route update.
6. General feedback.

Use the severity definitions in `docs/mobile-support-triage.md` as the source of truth.

## Search Patterns

Useful Outlook searches:

- `from:(@paddletoday.com) OR to:(hello@paddletoday.com)`
- `"PaddleToday app issue"`
- `"route request" OR "missing route" OR "add this river"`
- `"crash" OR "does not load" OR "blank" OR "error"`
- `"unsafe" OR "closed" OR "hazard" OR "strainer" OR "dam"`
- `"TestFlight" OR "Google Play" OR "review"`

## Plugin Workflow

When the Outlook connector is available in Codex:

1. List unread messages for `hello@paddletoday.com` or the shared support mailbox.
2. Group by severity and whether a reply is needed.
3. Fetch full message bodies only for messages that need action.
4. Draft replies first; send only after explicit approval.
5. Create or update GitHub issues for confirmed bugs, route data work, or release blockers.
6. Move completed threads to `PaddleToday/Done` and mark unresolved dependencies as `PT Waiting`.

Do not paste private user contact details into public route notes, Firebase issue comments, GitHub issues, or store-review responses.

## Draft Templates

### Safety or Access Report

Subject: `Re: [original subject]`

Body:

```text
Thanks for the report. I’m going to review this before treating the route recommendation as current.

Could you send the route name, approximate time you saw the issue, and any official source, photo, or access note you have? If this involves a closure, hazard, private-property concern, or dangerous launch/takeout condition, I’ll prioritize it ahead of normal route requests.
```

### App Issue

Subject: `Re: [original subject]`

Body:

```text
Thanks for flagging this. Could you send the app version, device model, iOS/Android version, and the screen where it happened?

If the app still opens, More -> Email app diagnostics includes the build and API details that help narrow it down.
```

### Route Request

Subject: `Re: [original subject]`

Body:

```text
Thanks for the route suggestion. The most useful details are river name, state, put-in, take-out, approximate mileage, source links, and any gauge or local flow guidance.

I’ll add it to the route candidate queue if there is enough public access and level evidence to review.
```

## Daily Launch Check

During launch week:

1. Check unread support mail.
2. Check store reviews and testing feedback.
3. Check Firebase Crashlytics for new issues.
4. Escalate any P0/P1 item before route expansion work.
5. Convert confirmed bugs or route-data fixes into tracked issues.

