# History storage recovery — October 17, 2026

History capture recovered after replacing the GitHub Actions `RIVER_HISTORY_CONTAINER_SAS_URL` secret. No application code or workflow changes were needed.

## Evidence and repair

- Failed run: https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/39020645610. Capture failed reading `river-history/hourly/north-fork-edisto-baughmans-orangeburg/2026-10-17.json` with HTTP 403.
- Azure storage account `paddletoday` allows shared-key access; its network default action is Allow, with no IP or virtual-network rules. The `river-history` container exists.
- GitHub does not reveal existing secret values. The previous credential's exact defect (expiry, permission, scope, or signature) remains unconfirmed.
- Replaced only the history workflow secret at 2026-10-17 12:01:48 UTC with an HTTPS-only service SAS scoped to the `river-history` container, permissions `rw`, expiring 2027-10-17 12:01:46 UTC. No account key was rotated; secret values were not written to this document or command output.
- A read probe using the replacement credential returned 404 for a missing blob, rather than an authorization failure.

## Verification

Manually dispatched the existing workflow on main: https://github.com/EckceptionalSolutions/PaddleTodayV2/actions/runs/39030929303.

The complete job passed in 3m33s. Its capture log reports: `[history] captured 1408 routes for 2026-10-17 07:00 using blob storage`.

An independent Azure blob metadata check confirmed the previously failing route's October 17 hourly blob exists, last modified 2026-10-17 12:04:51 UTC, size 488 bytes. The recovery run logs contained no HTTP 403 or HTTP 500 matches.

This confirms a successful new capture, not backfilling the missed history interval. The existing hourly schedule remains configured. Renew the credential before its expiry; no new reminder or automation was created.
