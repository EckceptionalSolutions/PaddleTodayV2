# Local development

Run `npm run doctor` to check the Node minimum, installed tools against the lockfile,
Windows native bindings, configuration-file presence, default ports, and GitHub CLI
authentication. Missing GitHub access is a warning because local browsing does not
need it. Missing or mismatched build dependencies produce a nonzero exit. The doctor
does not install anything or print environment values. It verifies configuration
presence, not the validity of cloud credentials or the availability of live providers.

Run `npm run dev:all` to start the frontend and API together. By default it uses API
port 4322 and considers frontend ports 4321, 4323, then 4324. It prefers a matching
healthy Astro frontend over starting a second one on a free port. A matching frontend
must serve the Vite client and proxy the selected PaddleToday API's health identity.
Unrelated occupied ports are left alone. Explicit ports never fall back silently.

```powershell
npm.cmd run dev:all
npm.cmd run dev:all -- --check
npm.cmd run dev:all -- --api-port 4432 --web-port 4431
npm.cmd run dev:all -- --api-port 4432 --web-port 4431 --smoke
```

`--check` only inspects dependencies and ports. `--smoke` starts any needed services,
verifies the frontend-to-API health request, and stops the services it started. Normal
startup runs until Ctrl+C. An owned service failure stops its owned companion and
returns a failure; reused processes are never stopped. Logs for newly started
services are written to `.local/dev/session-<timestamp>-<pid>.log`. Existing services
retain their original logs. The preparation scripts print to the current terminal.

The launcher loads `.env`, then `.env.local`, with existing shell variables taking
precedence. Its child services use loopback hosts and a local API proxy. Optional
Azure storage, telemetry, and notification settings are needed only for those
features; the command does not provision them. The API does not automatically restart
after server-code edits; restart the launcher for those changes. Astro handles
frontend updates while running.

Astro is started through its installed programmatic API so the launcher owns the
process even in environments where the Astro CLI defaults to a background daemon.
Each started frontend uses separate caches under `.local/dev/`.

## Windows dependencies

Stop this project's dev servers before reinstalling dependencies: a running native
module can prevent npm from replacing its files. Use `npm ci` to retain locked
versions. Some cross-platform lockfiles omit Windows optional binaries; if the
doctor reports one missing, restore the exact version listed by its parent package,
then rerun the doctor. Do not solve a missing binding by upgrading the build tools.
Native-load checks run in a subprocess so a faulty binding cannot crash the doctor.

## Task board

Run `npm run operations:tasks:check` to validate the board without changing it.
The planner and full operations gatekeeper also enforce the schema. Schedulable
records need an ID, title, kind, summary, lane, owner, priority, and evidence references.
Duplicate IDs and contradictory statuses fail validation. Historical `done` lanes
remain supported.

`npm run operations:tasks:check -- --normalize-terminal-lanes` copies an explicit
legacy `completed` or `done` status into a missing terminal lane. It does not infer
completion from prose or create ready work. Backups are saved under `.local/task-board/`.
Future dates remain visible as warnings. An ambiguous ready/completed record can be
held in `blocked` with its original status, reconciliation reason, and exact retry
condition preserved. See `docs/operations/workflow-follow-up-2026-09-06.md` for this
cleanup's evidence.
